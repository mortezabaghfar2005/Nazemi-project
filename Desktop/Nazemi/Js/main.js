/  -- Hamburger Menu  -- /;

const hamburgerBtn = document.getElementById("hamburger-btn");
const mainNav = document.getElementById("nav__mobile");

hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active");
    mainNav.classList.toggle("active");
});

const track = document.querySelector(".slider-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressLines = document.querySelectorAll(".progress-line");

// تغییر مقدار اولیه به 1 تا خط وسط انتخاب شود
let currentIndex = 1;

function updateClasses() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[1].classList.add("active");
}

function updateProgressBar() {
    progressLines.forEach((line) => line.classList.remove("active"));
    progressLines[currentIndex].classList.add("active");
}

nextBtn.addEventListener("click", () => {
    const slides = document.querySelectorAll(".slide");
    track.appendChild(slides[0]);
    updateClasses();

    currentIndex = (currentIndex + 1) % progressLines.length;
    updateProgressBar();
});

prevBtn.addEventListener("click", () => {
    const slides = document.querySelectorAll(".slide");
    track.prepend(slides[slides.length - 1]);
    updateClasses();

    currentIndex =
        (currentIndex - 1 + progressLines.length) % progressLines.length;
    updateProgressBar();
});

updateClasses();

let autoSlideInterval;

function handleMobileAutoSlide() {
    if (window.innerWidth <= 480) {
        if (!autoSlideInterval) {
            autoSlideInterval = setInterval(() => {
                document.getElementById("nextBtn").click();
            }, 5000);
        }
    } else {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
}

handleMobileAutoSlide();
window.addEventListener("resize", handleMobileAutoSlide);

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".comparison-slider-container");
    const prevBtn = document.getElementById("compPrevBtn");
    const nextBtn = document.getElementById("compNextBtn");
    const progressLines = document.querySelectorAll(".comp-progress-line");

    const scrollAmount = 400;

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener("click", () => {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
            updateProgress(1);
        });

        prevBtn.addEventListener("click", () => {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            updateProgress(-1);
        });
    }

    let currentIndex = 0;
    function updateProgress(direction) {
        progressLines[currentIndex].classList.remove("active");
        currentIndex += direction;

        if (currentIndex >= progressLines.length)
            currentIndex = progressLines.length - 1;
        if (currentIndex < 0) currentIndex = 0;

        progressLines[currentIndex].classList.add("active");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // مطمئن شوید کلاس و آیدی‌ها با HTML شما یکی هستند
    const track = document.querySelector(".comparison-slider-container"); // یا آیدی کانتینر اصلی اسلایدر
    const progressLines = document.querySelectorAll(".comp-progress-line");
    const prevBtn = document.getElementById("compPrevBtn");
    const nextBtn = document.getElementById("compNextBtn");

    if (!track) {
        console.error("اسلایدر پیدا نشد! لطفا کلاس یا آیدی track رو چک کنید.");
        return;
    }

    // آپدیت کردن خطوط پیشرفت بر اساس موقعیت اسکرول
    function updateProgress() {
        if (progressLines.length === 0) return;

        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        if (maxScrollLeft <= 0) return;

        let currentIndex = Math.round(
            (track.scrollLeft / maxScrollLeft) * (progressLines.length - 1),
        );

        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex >= progressLines.length)
            currentIndex = progressLines.length - 1;

        progressLines.forEach((line) => line.classList.remove("active"));
        if (progressLines[currentIndex]) {
            progressLines[currentIndex].classList.add("active");
        }
    }

    // رویداد اسکرول دستی یا لمسی
    track.addEventListener("scroll", updateProgress);

    // کلیک روی خطوط پیشرفت
    progressLines.forEach((line, index) => {
        line.addEventListener("click", () => {
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            const targetLeft =
                (index / (progressLines.length - 1)) * maxScrollLeft;

            track.scrollTo({
                left: targetLeft,
                behavior: "smooth",
            });
        });
    });

    // کلیک روی دکمه‌های چپ و راست (در صورت وجود)
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            // به اندازه عرض یک اسلاید به عقب برگردد
            track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            // به اندازه عرض یک اسلاید به جلو برود
            track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
        });
    }

    // تنظیم حالت اولیه
    updateProgress();
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".comparison-slider-container");
    const prevBtn = document.getElementById("compPrevBtn");
    const nextBtn = document.getElementById("compNextBtn");
    const progressLines = document.querySelectorAll(".comp-progress-line");

    // عرض تقریبی هر اسلاید برای اسکرول
    const scrollAmount = 400;

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener("click", () => {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
            updateProgress(1);
        });

        prevBtn.addEventListener("click", () => {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            updateProgress(-1);
        });
    }

    // آپدیت کردن نوار پیشرفت بر اساس اسکرول یا کلیک (بسیار ساده‌شده)
    let currentIndex = 0;
    function updateProgress(direction) {
        progressLines[currentIndex].classList.remove("active");
        currentIndex += direction;

        if (currentIndex >= progressLines.length)
            currentIndex = progressLines.length - 1;
        if (currentIndex < 0) currentIndex = 0;

        progressLines[currentIndex].classList.add("active");
    }

    // در حالت موبایل/تبلت که فلش‌ها نیستند، می‌توانید از رویداد اسکرول کانتینر
    // برای آپدیت نوار پیشرفت استفاده کنید (IntersectionObserver روش بهتری است).
});
