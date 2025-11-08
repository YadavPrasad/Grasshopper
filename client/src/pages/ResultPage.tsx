import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/result-page.css";

type Question = {
  question: string;
  options: string[];
  correct_answer: string;
};

type ResultPageState = {
  score: number;
  totalQuestions: number;
  answers: string[];
  questions: Question[];
};

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultPageState | undefined;

  useEffect(() => {
    if (!state || !state.questions) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state || !state.questions) {
    return null;
  }

  const { score, totalQuestions, answers, questions } = state;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Not Bad! 📚";
    return "Keep Practicing! 💪";
  };

  const handleRetakeQuiz = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="result-page-container">
      <div className="result-content">
        <div className="result-header">
          <h1>Quiz Complete!</h1>
          <p className="result-performance-message">
            {getPerformanceMessage()}
          </p>
          <div className="result-score-display">
            <div className="result-score-number">
              {score} / {totalQuestions}
            </div>
            <div className="result-percentage">
              {percentage}% Correct
            </div>
          </div>
        </div>

        <div className="result-review-section">
          <h2 className="result-review-title">Review Your Answers</h2>
          
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correct_answer;
            
            return (
              <div 
                key={index} 
                className={`result-question-card ${isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="result-question-header">
                  <span className="result-question-icon">
                    {isCorrect ? "✅" : "❌"}
                  </span>
                  <h3 className="result-question-number">
                    Question {index + 1}
                  </h3>
                </div>
                
                <p className="result-question-text">
                  {question.question}
                </p>
                
                <div className="result-answer-section">
                  <div className={`result-answer-box user-answer ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <span className="result-answer-label">Your answer:</span>
                    <span className="result-answer-text">{userAnswer}</span>
                  </div>
                  
                  {!isCorrect && (
                    <div className="result-answer-box correct-answer">
                      <span className="result-answer-label">Correct answer:</span>
                      <span className="result-answer-text">{question.correct_answer}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRetakeQuiz}
          className="result-retake-button"
        >
          Take Another Quiz
        </button>
      </div>
    </div>
  );
}

export default ResultPage;