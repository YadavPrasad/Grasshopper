import { useState } from "react";
import "../styles/option-button.css";

type QuizQnsProps = {
  question: {
    question: string;
    options: string[];
    correct_answer?: string;
  };
  questionNumber: number;
  totalQuestions: number;
  currentScore: number;
  onAnswer: (selected: string, isCorrect: boolean) => void;
};

function QuizQns({
  question,
  questionNumber,
  totalQuestions,
  currentScore,
  onAnswer,
}: QuizQnsProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const buttonClasses = ["quiz-button-a", "quiz-button-b", "quiz-button-c", "quiz-button-d"];
  const letters = ["A", "B", "C", "D"];

  const handleAnswerClick = (option: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(option);
    setShowFeedback(true);

    const isCorrect = option === question.correct_answer;

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      onAnswer(option, isCorrect);
    }, 1500);
  };

  const getButtonClass = (option: string, index: number) => {
    let classes = `quiz-button ${buttonClasses[index % buttonClasses.length]}`;
    
    if (showFeedback) {
      if (option === selectedAnswer) {

        const isCorrect = option === question.correct_answer;
        classes += isCorrect ? " selected correct" : " selected incorrect";
      } else if (option === question.correct_answer) {
        classes += " selected correct";
      } else {
        classes += " disabled";
      }
    }
    
    return classes;
  };

  return (
    <div className="quiz-question">
      <div className="scoreboard">
        {currentScore} / {totalQuestions}
      </div>
      <h2>
        Question {questionNumber} / {totalQuestions}
      </h2>
      <p>{question.question}</p>
      <div className="quiz-buttons-container">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            className={getButtonClass(opt, idx)}
            data-letter={letters[idx]}
            onClick={() => handleAnswerClick(opt)}
            disabled={showFeedback}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizQns;