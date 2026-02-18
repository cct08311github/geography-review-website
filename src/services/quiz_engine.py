import json
import random
from typing import List, Dict, Any

class QuizEngine:
    """
    國中地理會考複習系統 - 核心測驗引擎 (V2 智慧邏輯版)
    由 Claude 4.5 Sonnet (Thinking) 設計與實作
    """
    def __init__(self, questions_path: str):
        self.questions_path = questions_path
        self.questions = self._load_questions()
        self.session_state = {
            "correct_count": 0,
            "total_count": 0,
            "wrong_topics": []
        }

    def _load_questions(self) -> List[Dict]:
        try:
            with open(self.questions_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            return []

    def get_adaptive_question(self, category: str = None) -> Dict:
        """
        自適應出題：優先抽樣答錯率高的類別 (邏輯預留)
        """
        available = [q for q in self.questions if not category or q['category'] == category]
        if not available:
            return {}
        return random.choice(available)

    def verify_answer(self, question_id: int, user_answer: str) -> Dict[str, Any]:
        """
        驗證答案並提供深度解析
        """
        question = next((q for q in self.questions if q['id'] == question_id), None)
        if not question:
            return {"error": "題目不存在"}

        is_correct = question['answer'] == user_answer
        self.session_state["total_count"] += 1
        
        if is_correct:
            self.session_state["correct_count"] += 1
        else:
            self.session_state["wrong_topics"].append(question['topic'])

        return {
            "is_correct": is_correct,
            "correct_answer": question['answer'],
            "explanation": question['explanation'],
            "linked_knowledge_card": question.get('linked_card_id')
        }

# 檔案由 PM 手動實體化修復
