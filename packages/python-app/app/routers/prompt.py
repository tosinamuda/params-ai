from typing import Any

import chevron
from app.dependencies.database import get_db
from app.models import PromptBase, PromptInput
from app.repositories import prompt as PromptRepository
from fastapi import APIRouter, Depends, HTTPException
from llmkit import LLMKit
from sqlalchemy.orm import Session

router = APIRouter(prefix="/prompt")
llmkit = LLMKit()


@router.get("/", include_in_schema=False)
@router.get("")
def get_all_prompts(
    skip: int = 0, limit: int = 10, db: Session = Depends(get_db)
):
    """Get List of prompt"""
    return PromptRepository.get_all_prompts(db, skip=skip, limit=limit)


@router.post("/", include_in_schema=False)
@router.post("")
def create_new_prompt(prompt: PromptBase, db: Session = Depends(get_db)):
    """Create new prompt"""
    return PromptRepository.create_new_prompt(db, prompt=prompt)


# @lru_cache(maxsize=10)
@router.post("/test")
def generate_with_unsaved_prompt(prompt_input: PromptInput):
    """
    Test Generation in prompt lab
    """
    output = llmkit.generate_data(input_data=prompt_input.prompt)
    return {"data": output}


@router.post("/{prompt_id/generate")
def generate_with_saved_prompt(
    user_input: dict[str, Any], prompt_id: int, db: Session = Depends(get_db)
):
    """
    Used at end user side to generate prompt for application
    """
    prompt = PromptRepository.get_prompt_by_id(db=db, prompt_id=prompt_id)

    if prompt is not None:
        input_data = chevron.render(prompt.content, user_input)
        output = llmkit.generate_data(input_data=input_data)
        return {"data": output}
    else:
        raise HTTPException(status_code=404, detail="Prompt Not Found")
