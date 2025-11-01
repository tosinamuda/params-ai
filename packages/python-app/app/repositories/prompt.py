from app.helpers import create_unique_slug
from app.models import PromptBase
from app.schemas import Prompt
from sqlalchemy.orm import Session


def get_all_prompts(db: Session, skip: int = 0, limit: int = 10):
    return (
        db.query(Prompt)
        .order_by(Prompt.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_prompt_by_id(db: Session, prompt_id: int) -> Prompt | None:
    return db.Query(Prompt).filter(Prompt.id == prompt_id).first()


def create_new_prompt(db: Session, prompt: PromptBase):
    db_prompt = Prompt(
        title=prompt.title,
        slug=create_unique_slug(prompt.title),
        content=prompt.content,
    )
    db.add(db_prompt)
    db.commit()
    db.refresh(db_prompt)
    return db_prompt
