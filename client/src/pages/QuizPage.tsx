import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import QuizQns from "./QuizQns";

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!location.state || !location.state.questions || location.state.questions.length === 0) {
      navigate("/", { replace: true });
      return;
    }

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      const confirmLeave = window.confirm(
        "Are you sure you want to leave? Your quiz progress will be lost."
      );
      if (confirmLeave) {
        navigate("/", { replace: true });
      } else {
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.state, navigate]);

  const handleAnswer = (selected: string, isCorrect: boolean) => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("Quiz complete:", newAnswers);
      window.removeEventListener("popstate", () => {});
      navigate("/results", {
        state: {
          score: newScore,
          totalQuestions: questions.length,
          answers: newAnswers,
          questions: questions
        }
      });
    }
  };

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="quiz-container">
      <QuizQns
        question={questions[currentIndex]}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        currentScore={score}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default QuizPage;