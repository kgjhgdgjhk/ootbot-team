from pydantic import BaseModel
from typing import Optional  # <-- أضف هذا

class ProjectBase(BaseModel):
    title: str
    description: str
    status: Optional[str] = "جاري"  # <-- استبدل str | None

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: int

    class Config:
        from_attributes = True
