// مثال بسيط لإظهار رسالة ترحيبية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    console.log("مرحباً بك في موقع فريق إوت بوت!");
});
  
        document.addEventListener("DOMContentLoaded", () => {
            console.log("مرحباً بك في موقع فريق إوت بوت!");

            // العناصر التي ستحصل على أنيميشن
            const animatedElements = [
                { id: "card1", delay: 0 },
                { id: "card2", delay: 100 },
                { id: "card3", delay: 200 },
                { id: "card4", delay: 0 },
                { id: "card5", delay: 100 },
                { id: "card6", delay: 200 },
                { id: "feature1", delay: 0 },
                { id: "feature2", delay: 150 },
                { id: "feature3", delay: 300 },
                { id: "feature4", delay: 450 },
                { class: "cta", delay: 0 },
                { class: "service-card", delay: 0 },
                { class: "process-step", delay: 0 }
            ];

            // إضافة الأنيميشن للعناصر عند التمرير
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.classList.add("animated");
                            }, entry.target.dataset.delay || 0);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -50px 0px",
                }
            );

            // مراقبة العناصر
            animatedElements.forEach((item) => {
                if (item.id) {
                    const element = document.getElementById(item.id);
                    if (element) {
                        element.dataset.delay = item.delay;
                        observer.observe(element);
                    }
                } else if (item.class) {
                    const elements = document.getElementsByClassName(item.class);
                    Array.from(elements).forEach((element, index) => {
                        element.dataset.delay = item.delay + (index * 100);
                        observer.observe(element);
                    });
                }
            });

            // تأثير العد للأرقام في قسم من نحن
            const statNumbers = document.querySelectorAll(".about-stat-number");
            const statObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const element = entry.target;
                            const target = parseInt(element.getAttribute("data-target"));
                            animateCount(element, 0, target, 2000);
                            statObserver.unobserve(element);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            statNumbers.forEach((stat) => statObserver.observe(stat));

            // تأثير المكعب التفاعلي
            const cube = document.querySelector(".about-cube");
            if (cube) {
                let mouseX = 0;
                let mouseY = 0;
                let cubeX = 0;
                let cubeY = 0;

                document.addEventListener("mousemove", (e) => {
                    mouseX = e.clientX / window.innerWidth - 0.5;
                    mouseY = e.clientY / window.innerHeight - 0.5;
                });

                function animateCube() {
                    cubeX += (mouseX * 180 - cubeX) * 0.05;
                    cubeY += (mouseY * 180 - cubeY) * 0.05;

                    cube.style.transform = `rotateX(${cubeY}deg) rotateY(${cubeX}deg)`;

                    requestAnimationFrame(animateCube);
                }

                animateCube();
            }

            // تأثيرات hover للبطاقات
            const cards = document.querySelectorAll(".value-card, .service-card");
            cards.forEach((card) => {
                card.addEventListener("mouseenter", function () {
                    if (this.classList.contains('service-card')) {
                        this.style.transform = "translateY(-15px)";
                    } else {
                        this.style.transform = "translateY(-10px)";
                    }
                });

                card.addEventListener("mouseleave", function () {
                    if (!this.classList.contains("animated")) return;
                    this.style.transform = "translateY(0)";
                });
            });

            // تأثيرات hover لخطوات العمل
            const stepNumbers = document.querySelectorAll(".step-number");
            stepNumbers.forEach((step) => {
                step.addEventListener("mouseenter", function () {
                    this.style.transform = "scale(1.1) rotate(10deg)";
                });

                step.addEventListener("mouseleave", function () {
                    this.style.transform = "scale(1) rotate(0deg)";
                });
            });

            // تأثيرات hover للروابط
            const serviceLinks = document.querySelectorAll(".service-link");
            serviceLinks.forEach((link) => {
                link.addEventListener("mouseenter", function () {
                    this.style.transform = "translateX(-5px)";
                    this.querySelector("i").style.transform = "translateX(-5px)";
                });

                link.addEventListener("mouseleave", function () {
                    this.style.transform = "translateX(0)";
                    this.querySelector("i").style.transform = "translateX(0)";
                });
            });

            // تغيير الهيدر عند التمرير
            const header = document.getElementById("main-header");
            window.addEventListener("scroll", () => {
                if (window.scrollY > 50) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }
            });

            // القائمة المتحركة للجوال
            const menuToggle = document.getElementById("menu-toggle");
            const navLinks = document.getElementById("nav-links");

            menuToggle.addEventListener("click", () => {
                navLinks.classList.toggle("active");
                menuToggle.innerHTML = navLinks.classList.contains("active")
                    ? '<i class="fas fa-times"></i>'
                    : '<i class="fas fa-bars"></i>';
            });

            // إغلاق القائمة عند النقر على رابط
            document.querySelectorAll(".nav-links a").forEach((link) => {
                link.addEventListener("click", () => {
                    navLinks.classList.remove("active");
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });

            // تأثيرات إضافية للبطاقات عند التمرير عليها
            document.querySelectorAll(".card").forEach((card) => {
                card.addEventListener("mouseenter", () => {
                    card.style.transform = "translateY(-10px)";
                });

                card.addEventListener("mouseleave", () => {
                    if (!card.classList.contains("animated")) return;
                    card.style.transform = "translateY(0)";
                });
            });
        });

        // دالة تأثير العد
        function animateCount(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                element.textContent = value;

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
  