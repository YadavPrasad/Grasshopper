from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.utils.helpers import QuizManager
from src.generator.question_generator import QuestionGenerator

app = FastAPI(title="Grasshopper", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

quiz_manager = QuizManager()
generator = QuestionGenerator()


class QuizRequest(BaseModel):
    topic: str
    difficulty: str
    num_questions: int


@app.post("/generate-quiz")
def generate_quiz(req: QuizRequest):
    print("Received request:", req)  
    try:

        success = quiz_manager.generate_questions(
            generator,
            topic=req.topic,
            difficulty=req.difficulty,
            num_questions=req.num_questions
        )

        print("Questions generated:", quiz_manager.questions) 

        if not success:
            raise HTTPException(status_code=500, detail="Failed to generate questions")

        return {"message": "Quiz generated successfully", "questions": quiz_manager.questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class QuizSubmission(BaseModel):
    answers: list[str]


@app.post("/submit-quiz")
def submit_quiz(submission: QuizSubmission):
    try:
        quiz_manager.user_answers = submission.answers
        quiz_manager.evaluate_quiz()
        results_df = quiz_manager.generate_result_dataframe()

        score = results_df["is_correct"].sum()
        total = len(results_df)
        percentage = (score / total) * 100 if total else 0

        results = results_df.to_dict(orient="records")

        return {
            "score": score,
            "total": total,
            "percentage": percentage,
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("application:app", host="0.0.0.0", port=8000, reload=True)