import datetime

from app.services.database import Base
from sqlalchemy import Column, DateTime, Integer, String


class Prompt(Base):
    """SQLAlchemy Schema Class for prompts table"""

    __tablename__ = "prompts"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now())
    updated_at = Column(DateTime, default=datetime.datetime.now())
