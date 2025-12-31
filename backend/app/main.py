import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from .database import Base, engine
from .routers import projects

# إنشاء الجداول في قاعدة البيانات
Base.metadata.create_all(bind=engine)

# تهيئة التطبيق
app = FastAPI(
    title="IOT Bot Team API",
    description="Backend لموقع فريق إوت بوت",
    version="1.0.0"
)

# تسجيل الراوترات
app.include_router(projects.router)

# تحديد المسار النسبي للملفات الثابتة والقوالب
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ربط ملفات static (CSS, JS, images)
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")

# إعداد قوالب Jinja2
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))
# صفحات الموقع
@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/about", response_class=HTMLResponse)
def about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})

@app.get("/join", response_class=HTMLResponse)
def join(request: Request):
    return templates.TemplateResponse("join.html", {"request": request})

@app.get("/projects", response_class=HTMLResponse)
def projects_page(request: Request):
    return templates.TemplateResponse("projects.html", {"request": request})

@app.get("/services", response_class=HTMLResponse)
def services_page(request: Request):
    return templates.TemplateResponse("services.html", {"request": request})

@app.get("/admin", response_class=HTMLResponse)
def admin_page(request: Request):
    return templates.TemplateResponse("admin.html", {"request": request})

# إضافة توجيهات للروابط القديمة (.html) للتأكد من التوافق
@app.get("/index.html", response_class=HTMLResponse)
def home_html(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/projects.html", response_class=HTMLResponse)
def projects_html(request: Request):
    return templates.TemplateResponse("projects.html", {"request": request})

@app.get("/join.html", response_class=HTMLResponse)
def join_html(request: Request):
    return templates.TemplateResponse("join.html", {"request": request})