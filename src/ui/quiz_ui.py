import streamlit as st
import json
from pathlib import Path

# Assume QuizEngine is in src/services/quiz_engine.py and questions.json is in data/
# When running a Streamlit app, the current working directory is typically the project root.
try:
    from src.services.quiz_engine import QuizEngine
except ImportError:
    st.error("Could not import QuizEngine. Ensure it's available in 'src/services/quiz_engine.py'.")
    # Define a dummy QuizEngine if import fails, so the rest of the code can be parsed.
    # In a real scenario, this would prevent the app from running correctly.
    class QuizEngine:
        def __init__(self, questions):
            self.questions = questions
        def check_answer(self, question_index, answer):
            if 0 <= question_index < len(self.questions):
                return self.questions[question_index]['correct_answer'] == answer
            return False

def quiz_interface():
    """
    Streamlit component for the quiz interface.
    Integrates QuizEngine and reads questions from questions.json.
    """
    st.title("Geography Review Quiz")

    # Load questions from JSON file
    try:
        # Assuming the Streamlit app is run from the project root (pm directory)
        questions_file_path = 'data/questions.json'
        with open(questions_file_path, 'r', encoding='utf-8') as f:
            questions_data = json.load(f)
        
        if not questions_data:
            st.warning("questions.json is empty. No questions to display.")
            return

        # Instantiate the QuizEngine with loaded questions
        quiz_engine = QuizEngine(questions_data)
        
    except FileNotFoundError:
        st.error(f"Error: Questions file not found at '{questions_file_path}'. Please ensure it exists.")
        return
    except json.JSONDecodeError:
        st.error(f"Error: Could not decode '{questions_file_path}'. Please check the file format.")
        return
    except Exception as e:
        st.error(f"An unexpected error occurred while loading questions: {e}")
        return

    # Initialize session state for quiz progress
    if 'question_index' not in st.session_state:
        st.session_state['question_index'] = 0
    if 'score' not in st.session_state:
        st.session_state['score'] = 0
    if 'user_answers' not in st.session_state:
        st.session_state['user_answers'] = {} # To store user's selected answers for each question
    if 'answered_questions' not in st.session_state:
        st.session_state['answered_questions'] = set() # To track which questions have been answered

    question_index = st.session_state['question_index']
    score = st.session_state['score']

    # Display current question if quiz is not finished
    if question_index < len(quiz_engine.questions):
        current_question_data = quiz_engine.questions[question_index]
        question_text = current_question_data.get('question', 'No question text provided.')
        options = current_question_data.get('options', [])

        st.subheader(f"Question {question_index + 1}/{len(quiz_engine.questions)}")
        st.write(question_text)

        # Display options as radio buttons
        # Use a key to ensure uniqueness for each question's radio button group
        # Pre-select the option if it was previously answered
        selected_option = st.radio(
            "Choose your answer:",
            options,
            key=f"question_{question_index}_options",
            index=options.index(st.session_state['user_answers'].get(question_index)) if question_index in st.session_state['user_answers'] else None
        )
        
        # Store the selected option in session state immediately
        st.session_state['user_answers'][question_index] = selected_option

        if st.button("Submit Answer", key=f"submit_q{question_index}"):
            # Retrieve the most recent selection for this question
            current_selection = st.session_state['user_answers'].get(question_index)
            
            if current_selection is None:
                st.warning("Please select an answer before submitting.")
                return

            # Use QuizEngine to check the answer
            is_correct = quiz_engine.check_answer(question_index, current_selection)

            if is_correct:
                st.success("Correct!")
                # Increment score only if this question hasn't been answered before to avoid re-scoring
                if question_index not in st.session_state['answered_questions']:
                    st.session_state['score'] += 1
                    st.session_state['answered_questions'].add(question_index)
            else:
                st.error(f"Incorrect. The correct answer was: {current_question_data.get('correct_answer', 'N/A')}")
            
            # Move to the next question or show results
            st.session_state['question_index'] += 1
            st.rerun() # Rerun to update the UI for the next question or results

    else:
        # Display final results
        final_score = st.session_state['score']
        total_questions = len(quiz_engine.questions)
        st.success(f"Quiz Finished! Your final score: {final_score}/{total_questions}")

        if st.button("Restart Quiz", key="restart_quiz"):
            # Reset session state for a new quiz
            st.session_state['question_index'] = 0
            st.session_state['score'] = 0
            st.session_state['user_answers'] = {}
            st.session_state['answered_questions'] = set()
            st.rerun()

        # Optional: Display review of answers
        if st.checkbox("Review Answers"):
            st.subheader("Answer Review:")
            for i, q_data in enumerate(quiz_engine.questions):
                user_ans = st.session_state['user_answers'].get(i)
                correct_ans = q_data.get('correct_answer', 'N/A')
                is_correct_for_user = (user_ans == correct_ans)
                
                st.markdown(f"**Q{i+1}:** {q_data.get('question', 'No question')}")
                for opt in q_data.get('options', []):
                    style = ""
                    if opt == correct_ans:
                        style = "color: green; font-weight: bold;" # Correct answer
                    elif opt == user_ans and user_ans != correct_ans:
                        style = "color: red; font-weight: bold;" # User's incorrect answer
                    st.markdown(f"- <span style='{style}'>{opt}</span>", unsafe_allow_html=True)
                
                if user_ans is not None and not is_correct_for_user:
                    st.markdown(f"Your answer: <span style='color: red;'>{user_ans}</span>", unsafe_allow_html=True)
                st.markdown(f"Correct answer: <span style='color: green; font-weight: bold;'>{correct_ans}</span>", unsafe_allow_html=True)
                st.markdown("---")

# Example of how to integrate this component into a main Streamlit app:
# If this file is named quiz_ui.py in the src/ui/ directory:
# In your main app file (e.g., geography-review-website/main.py or geography-review-website/src/App.vue if using Vue,
# or geography-review-website/src/main.js if it's a Vue entry point):
#
# from src.ui.quiz_ui import quiz_interface
#
# # In your Streamlit app's main function or wherever you want to display the quiz:
# quiz_interface()
#
# To run this app, navigate to the 'pm' directory in your terminal and run:
# streamlit run geography-review-website/src/main_app.py  (assuming you have a main_app.py that calls quiz_interface)
# Or if this file itself is intended to be the entry point (less common for components):
# streamlit run geography-review-website/src/ui/quiz_ui.py
