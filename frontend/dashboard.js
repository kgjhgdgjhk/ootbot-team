// لوحة تحكم فريق إوت بوت
class Dashboard {
    constructor() {
        this.currentUser = null;
        this.initialize();
    }
    
    initialize() {
        this.checkAuth();
        this.loadDashboard();
        this.initializeComponents();
    }
    
    checkAuth() {
        const user = JSON.parse(localStorage.getItem('dashboard_user'));
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        this.currentUser = user;
        this.updateUserInfo();
    }
    
    updateUserInfo() {
        const userInfo = document.getElementById('userInfo');
        if (userInfo) {
            userInfo.innerHTML = `
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-details">
                    <span class="user-name">${this.currentUser.name}</span>
                    <span class="user-role">${this.getRoleName(this.currentUser.role)}</span>
                </div>
            `;
        }
    }
    
    getRoleName(role) {
        const roles = {
            'admin': 'المدير العام',
            'marketing': 'مسؤول التسويق',
            'team': 'مسؤول الفريق',
            'design': 'مسؤول التصميم'
        };
        return roles[role] || role;
    }
    
    loadDashboard() {
        this.loadStats();
        this.loadRecentActivities();
        this.loadQuickActions();
    }
    
    loadStats() {
        // تحميل الإحصائيات
        const stats = {
            projects: 12,
            members: 8,
            services: 6,
            volunteers: 25
        };
        
        const statsContainer = document.getElementById('statsContainer');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stat-card">
                    <div class="stat-icon" style="background: #3b82f6;">
                        <i class="fas fa-project-diagram"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${stats.projects}</h3>
                        <p>مشروع</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: #10b981;">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${stats.members}</h3>
                        <p>عضو</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: #f59e0b;">
                        <i class="fas fa-cogs"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${stats.services}</h3>
                        <p>خدمة</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: #8b5cf6;">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${stats.volunteers}</h3>
                        <p>متطوع</p>
                    </div>
                </div>
            `;
        }
    }
    
    loadRecentActivities() {
        // تحميل النشاطات الأخيرة
        const activities = [
            { user: 'أحمد محمد', action: 'أضاف مشروع جديد', time: 'منذ ساعتين', icon: 'fa-plus' },
            { user: 'سارة عبدالله', action: 'حدثت بيانات العضوية', time: 'منذ 4 ساعات', icon: 'fa-edit' },
            { user: 'محمد علي', action: 'نشر خبر جديد', time: 'منذ 6 ساعات', icon: 'fa-newspaper' },
            { user: 'فاطمة حسن', action: 'رد على طلب تطوع', time: 'منذ يوم', icon: 'fa-reply' }
        ];
        
        const activitiesContainer = document.getElementById('activitiesContainer');
        if (activitiesContainer) {
            activitiesContainer.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas ${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <p><strong>${activity.user}</strong> ${activity.action}</p>
                        <span class="activity-time">${activity.time}</span>
                    </div>
                </div>
            `).join('');
        }
    }
    
    loadQuickActions() {
        const actions = document.getElementById('quickActions');
        if (actions) {
            actions.innerHTML = `
                <button class="action-btn" onclick="dashboard.openModal('add-project')">
                    <i class="fas fa-plus"></i>
                    <span>إضافة مشروع</span>
                </button>
                <button class="action-btn" onclick="dashboard.openModal('add-news')">
                    <i class="fas fa-newspaper"></i>
                    <span>نشر خبر</span>
                </button>
                <button class="action-btn" onclick="dashboard.openModal('add-member')">
                    <i class="fas fa-user-plus"></i>
                    <span>إضافة عضو</span>
                </button>
                <button class="action-btn" onclick="dashboard.openModal('add-service')">
                    <i class="fas fa-cog"></i>
                    <span>إضافة خدمة</span>
                </button>
            `;
        }
    }
    
    openModal(modalType) {
        // فتح النافذة المنبثقة المناسبة حسب الصلاحيات
        if (!this.checkPermission(modalType)) {
            notifications.show('ليس لديك صلاحية لهذا الإجراء', 'error');
            return;
        }
        
        // هنا سيتم فتح النافذة المنبثقة المناسبة
        console.log(`فتح نافذة: ${modalType}`);
    }
    
    checkPermission(action) {
        const permissions = {
            'admin': ['add-project', 'add-news', 'add-member', 'add-service', 'edit-site'],
            'marketing': ['add-news'],
            'team': ['add-member'],
            'design': ['edit-site']
        };
        
        return permissions[this.currentUser.role]?.includes(action) || false;
    }
    
    initializeComponents() {
        // تهيئة المكونات الإضافية
        this.initializeDataTables();
        this.initializeEditors();
    }
    
    initializeDataTables() {
        // تهيئة جداول البيانات إذا كانت موجودة
        const tables = document.querySelectorAll('.data-table');
        tables.forEach(table => {
            // إضافة ميزات الجداول المتقدمة
            this.enhanceTable(table);
        });
    }
    
    initializeEditors() {
        // تهيئة المحرر النصي
        const textAreas = document.querySelectorAll('.rich-editor');
        textAreas.forEach(textarea => {
            this.makeEditable(textarea);
        });
    }
    
    makeEditable(element) {
        element.addEventListener('focus', function() {
            this.style.minHeight = '200px';
        });
    }
    
    logout() {
        localStorage.removeItem('dashboard_user');
        window.location.href = 'login.html';
    }
}

// تهيئة لوحة التحكم
const dashboard = new Dashboard();

// وظائف عامة للوحة التحكم
function saveSettings() {
    // حفظ إعدادات الموقع
    const settings = {
        siteName: document.getElementById('siteName')?.value,
        siteDescription: document.getElementById('siteDescription')?.value,
        primaryColor: document.getElementById('primaryColor')?.value,
        // ... إعدادات أخرى
    };
    
    localStorage.setItem('site_settings', JSON.stringify(settings));
    notifications.show('تم حفظ الإعدادات بنجاح', 'success');
}

function exportData() {
    // تصدير البيانات
    const data = {
        projects: JSON.parse(localStorage.getItem('projects') || '[]'),
        members: JSON.parse(localStorage.getItem('members') || '[]'),
        news: JSON.parse(localStorage.getItem('news') || '[]'),
        services: JSON.parse(localStorage.getItem('services') || '[]')
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ootbot-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    notifications.show('تم تصدير البيانات بنجاح', 'success');
}

function importData(event) {
    // استيراد البيانات
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            // التحقق من صحة البيانات
            if (data.projects && data.members && data.news && data.services) {
                localStorage.setItem('projects', JSON.stringify(data.projects));
                localStorage.setItem('members', JSON.stringify(data.members));
                localStorage.setItem('news', JSON.stringify(data.news));
                localStorage.setItem('services', JSON.stringify(data.services));
                
                notifications.show('تم استيراد البيانات بنجاح', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                notifications.show('تنسيق الملف غير صحيح', 'error');
            }
        } catch (error) {
            notifications.show('خطأ في قراءة الملف', 'error');
        }
    };
    reader.readAsText(file);
}

// التعامل مع رفع الملفات
function handleFileUpload(inputId, callback) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    input.addEventListener('change', function(event) {
        const files = event.target.files;
        if (files.length > 0) {
            callback(files);
        }
    });
}

// تهيئة رفع الملفات للصور
handleFileUpload('imageUpload', function(files) {
    const formData = new FormData();
    formData.append('image', files[0]);
    
    // هنا سيتم إرسال الصورة للخادم
    notifications.show('جاري رفع الصورة...', 'info');
    
    // محاكاة الرفع
    setTimeout(() => {
        notifications.show('تم رفع الصورة بنجاح', 'success');
    }, 1500);
});