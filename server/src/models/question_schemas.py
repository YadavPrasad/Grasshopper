from typing import List
from pydantic import BaseModel, Field, validator

class MCQs(BaseModel) :

    question: str = Field(description="The question text")
    options : List[str] = Field(descriptiom="List of 4 options")
    correct_answer: str = Field(description="The correct answer from the options")

    @validator('question', pre = True)
    def clean_question(cls, v) : 
        if isinstance(v, dict):
            return v.get("description ", str(v))
        return str(v)

