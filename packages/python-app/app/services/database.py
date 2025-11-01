from app.config import Config
from sqlalchemy.engine import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

config = Config()
username = config.db_username
password = config.db_password
hostname = config.db_hostname
port = config.db_port
database_name = config.db_database_name
schema = config.db_schema_name


SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg://{username}:{password}@{hostname}:{port}/{database_name}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"options": f"-csearch_path={schema}"},
    echo=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
