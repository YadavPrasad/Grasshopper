import { useState } from "react";
import "../styles/quizForm.css";
import "../styles/button-style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function QuizForm() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!topic || !difficulty || numQuestions === 0) {
      alert("Please fill in all fields!");
      return;
    }
    console.log({ topic, difficulty, numQuestions });
    
    setIsLoading(true);
    
    try {
      const response = await axios.post("http://localhost:8000/generate-quiz", {
        topic,
        difficulty,
        num_questions: numQuestions,
      });
      console.log(response.data.topic);
      navigate("/quiz", { state: response.data });
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="quiz-form" onSubmit={handleSubmit}>
        <h2>Quiz Settings</h2>
        <label>Topic: <span style={{color: 'red'}}>*</span></label>
        <input
          type="text"
          placeholder="Enter topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          disabled={isLoading}
        />
        <label>Difficulty: <span style={{color: 'red'}}>*</span></label>
        <div className="button-group">
          {["Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              type="button"
              className={difficulty === level ? "selected" : ""}
              onClick={() => setDifficulty(level)}
              disabled={isLoading}
            >
              {level}
            </button>
          ))}
        </div>
        <label>Number of Questions: <span style={{color: 'red'}}>*</span></label>
        <div className="button-group">
          {[5, 10].map((num) => (
            <button
              key={num}
              type="button"
              className={numQuestions === num ? "selected" : ""}
              onClick={() => setNumQuestions(num)}
              disabled={isLoading}
            >
              {num}
            </button>
          ))}
        </div>
        <button type="submit" className="grasshopper-button" disabled={isLoading}>
          {isLoading ? (
            <>
              Generating...
              <span className="spinner"></span>
            </>
          ) : (
            "Start Quiz"
          )}
        </button>
      </form>
    </div>
  );
}

export default QuizForm;