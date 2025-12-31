from fastapi import FastAPI
from .database import Base, engine
from .routers import projects

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="IOT Bot Team API",
    description="Backend لموقع فريق إوت بوت",
    version="1.0.0"
)

app.include_router(projects.router)

@app.get("/")
def root():
    return {"message": "API يعمل بنجاح 🚀"}
