/**
 * Zektra Bit - Native JS Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Скролл хедера
    const header = document.querySelector('.header');
    const scrollHandler = () => {
        if (window.scrollY > 40) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    };
    window.addEventListener('scroll', scrollHandler);

    // 2. Мобильное меню (Бургер)
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;

    burgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('mobile-menu--active');
        body.style.overflow = mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : '';
        
        // Анимация иконки бургера
        const spans = burgerBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('mobile-menu--active')) {
            spans[0].style.transform = 'translateY(8px) rotate(45deg)';
            spans[1].style.transform = 'translateY(-0px) rotate(-45deg)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    });

    // Закрытие меню при клике на ссылку
    const mobileLinks = document.querySelectorAll('.mobile-menu__list a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('mobile-menu--active');
            body.style.overflow = '';
            burgerBtn.querySelectorAll('span').forEach(s => s.style.transform = 'none');
        });
    });

    // 3. Плавная навигация (Native)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Добавить в конец DOMContentLoaded
const revealElements = document.querySelectorAll('.reveal-text');

const revealOnLoad = () => {
    revealElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, 200 * index); // Каскадное появление
    });
};

// Запуск анимации после небольшой задержки
setTimeout(revealOnLoad, 300);

// Параллакс эффект для визуального элемента при движении мыши (Native)
const visual = document.querySelector('.hero__visual');
if (visual) {
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
        visual.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    }
    // Добавить в DOMContentLoaded

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Опционально: прекращаем наблюдение после активации
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // Срабатывает, когда 10% элемента видно
});

// Находим все элементы для анимации
document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    scrollObserver.observe(el);
});
    // Функция анимации цифр
const animateNumbers = (el) => {
    const target = +el.getAttribute('data-target');
    const duration = 2000; // 2 секунды
    const step = target / (duration / 16); // 16ms на кадр (60fps)
    let current = 0;

    const update = () => {
        current += step;
        if (current < target) {
            el.innerText = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            el.innerText = target;
        }
    };
    update();
};

// Расширяем наш Intersection Observer из предыдущего шага
const innovationsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Если это секция с цифрами, запускаем их
            const counters = entry.target.querySelectorAll('.stat-item__value');
            counters.forEach(counter => animateNumbers(counter));
            
            entry.target.classList.add('active');
            innovationsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Применяем к нужным элементам
document.querySelectorAll('.innovations__content, .innovations__visual').forEach(el => {
    innovationsObserver.observe(el);
});
    // Добавить в DOMContentLoaded

const contactForm = document.getElementById('contactForm');
const phoneInput = document.getElementById('phone');
const captchaQuestion = document.getElementById('captchaQuestion');
const captchaInput = document.getElementById('captchaInput');
const formSuccess = document.getElementById('formSuccess');

// 1. Генерация капчи
let captchaResult;
const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaResult = a + b;
    captchaQuestion.innerText = `${a} + ${b} = ?`;
};
generateCaptcha();

// 2. Валидация телефона (только цифры)
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// 3. Обработка отправки (AJAX imitation)
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Проверка капчи
    if (parseInt(captchaInput.value) !== captchaResult) {
        alert('Неверный ответ на защитный вопрос. Попробуйте еще раз.');
        generateCaptcha();
        captchaInput.value = '';
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = 'Отправка...';
    submitBtn.disabled = true;

    // Имитация задержки сервера
    setTimeout(() => {
        formSuccess.style.display = 'flex';
        contactForm.reset();
        generateCaptcha();
        
        // Через 5 секунд возвращаем форму (опционально)
        setTimeout(() => {
            formSuccess.style.display = 'none';
            submitBtn.innerText = 'Отправить запрос';
            submitBtn.disabled = false;
        }, 5000);
    }, 1500);
});
    // Добавить в DOMContentLoaded

const cookiePopup = document.getElementById('cookiePopup');
const acceptBtn = document.getElementById('acceptCookies');

// Проверка localStorage
if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
        cookiePopup.classList.add('cookie-popup--active');
    }, 2000);
}

acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookiePopup.classList.remove('cookie-popup--active');
});
});