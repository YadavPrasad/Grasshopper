import os
import pandas as pd
from datetime import datetime

class QuizManager:
    def __init__(self):
        self.questions = []
        self.user_answers = []
        self.results = []

    def generate_questions(self, generator, topic: str, difficulty: str, num_questions: int):
        self.questions = []
        self.user_answers = []
        self.results = []

        try:
            for _ in range(num_questions):
                question = generator.generate_mcq(topic, difficulty.lower())
                self.questions.append({
                    'type': 'MCQ',
                    'question': question.question,
                    'options': question.options,
                    'correct_answer': question.correct_answer
                })
        except Exception as e:
            print(f"Error generating question: {e}")
            return False

        return True

    def evaluate_quiz(self):
        self.results = []

        for i, (q, user_ans) in enumerate(zip(self.questions, self.user_answers)):
            is_correct = user_ans == q["correct_answer"]
            self.results.append({
                'question_number': i + 1,
                'question': q['question'],
                'options': q['options'],
                'user_answer': user_ans,
                'correct_answer': q["correct_answer"],
                'is_correct': is_correct
            })


