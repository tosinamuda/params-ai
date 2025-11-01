from app.config import Config
from app.routers import prompt
from app.services.database import Base, engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

Base.metadata.create_all(bind=engine)

tags_metadata = [
    {"name": "prompts", "description": "CRUD Operations with Prompt"}
]

app = FastAPI(
    title="Params AI APIs",
    description="API to support Params AI",
    version="0.0.1",
    openapi_tags=tags_metadata,
)

config = Config()
if config.is_production:
    app.add_middleware(HTTPSRedirectMiddleware)

if config.cors_allowed_origin_regex is not None:
    app.add_middleware(
        CORSMiddleware,
        allow_origin_regex=config.cors_allowed_origin_regex,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app.include_router(router=prompt.router, prefix="/api/v1", tags=["prompts"])


@app.post("/test")
async def test_route():
    """
    Test Route for this API
    """
    return {"result": "LGTM"}
