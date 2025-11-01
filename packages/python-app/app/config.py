import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    def __init__(self) -> None:
        pass

    @property
    def is_production(self) -> bool:
        return os.getenv("APP_ENV") == "production"

    @property
    def is_development(self) -> bool:
        return os.getenv("APP_ENV") == "development"

    @property
    def cors_allowed_origin_regex(self) -> str | None:
        return os.getenv("CORS_ALLOWED_ORIGIN_REGEX")

    @property
    def port(self):
        return int(os.getenv("PORT", "8000"))

    @property
    def db_username(self) -> str:
        return os.getenv("DB_USERNAME")

    @property
    def db_password(self) -> str:
        return os.getenv("DB_PASSWORD")

    @property
    def db_hostname(self) -> str:
        return os.getenv("DB_HOSTNAME")

    @property
    def db_port(self) -> int:
        return int(os.getenv("DB_PORT", "5432"))

    @property
    def db_database_name(self) -> str:
        return os.getenv("DB_DATABASE_NAME")

    @property
    def db_schema_name(self) -> str:
        return os.getenv("DB_SCHEMA_NAME")
