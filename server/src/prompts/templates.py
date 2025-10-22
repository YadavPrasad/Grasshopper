from langchain_core.prompts import PromptTemplate
mcq_prompt_template = PromptTemplate(
template=(
"Generate a {difficulty} multiple-choice question about {topic}.\n\n"
"Return ONLY a JSON object with these exact fields:\n"
"- 'question': A clear, specific question\n"
"- 'options': An array of exactly 4 possible answers\n"
"- 'correct_answer': One of the options that is the correct answer\n\n"
"Example format:\n"
'{{\n'
' "question": "What is the capital of France?",\n'
' "options": ["London", "Berlin", "Paris", "Madrid"],\n'
' "correct_answer": "Paris"\n'
'}}\n\n'
"Your response:"
 ),
input_variables=["topic", "difficulty"]
)