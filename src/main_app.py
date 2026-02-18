# main_app.py
import streamlit as st
import sys
import os

# Add the project root to sys.path to ensure imports work correctly
# This is a common workaround if the script is run from within a subdirectory
# and the top-level 'src' directory needs to be importable.
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

try:
    # Import the quiz UI module assuming src is treated as a package root
    # Adjust the import path if 'quiz_ui.py' is located elsewhere or if 'src' is not a package.
    from src.ui import quiz_ui
except ImportError as e:
    st.error(f"Error importing quiz_ui: {e}")
    st.error("Please ensure 'src' is a Python package and 'ui/quiz_ui.py' exists and is accessible.")
    st.stop()

# --- Page Configuration ---
st.set_page_config(
    page_title="Geography Review Hub",
    page_icon="🌍",
    layout="wide"
)

# --- Sidebar Navigation ---
st.sidebar.title("Navigation")
menu_options = ["Quiz", "Map", "Progress", "Settings"] # Example options
selected_option = st.sidebar.radio("Explore", menu_options)

# --- Main Content Area ---
st.title("國中地理複習網站") # Junior High Geography Review Website

if selected_option == "Quiz":
    st.header("測驗區") # Quiz Area
    st.write("透過地理測驗挑戰你的知識！")
    
    try:
        # 呼叫實體產出的測驗介面
        quiz_ui.quiz_interface()
        
    except Exception as e:
        st.error(f"加載測驗時出錯：{e}")

elif selected_option == "Map":
    st.header("地圖展示區") # Map Display Area
    st.write("This section will feature interactive maps for geographical exploration.")
    # Placeholder for map integration.
    # Example: st.map() or use a specific map component if available.

elif selected_option == "Progress":
    st.header("學習進度") # Learning Progress
    st.write("Track your learning journey and review your performance.")
    # Placeholder for progress tracking implementation.

elif selected_option == "Settings":
    st.header("設定") # Settings
    st.write("Customize your learning experience here.")
    # Placeholder for settings

# --- Footer ---
st.markdown("---")
st.markdown("© 2026 國中地理複習網站. All rights reserved.")