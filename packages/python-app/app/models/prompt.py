from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, constr


class PromptBase(BaseModel):
    title: constr(max_length=100)
    content: str


class Prompt(PromptBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    created_at: datetime
    updated_at: datetime


class PromptInput(BaseModel):
    prompt: str
