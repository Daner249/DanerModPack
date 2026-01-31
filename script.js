// Инициализация сайта
document.addEventListener('DOMContentLoaded', function() {
    console.log('DanerPack 249 сайт загружен');
    
    // Анимация чисел в статистике
    animateNumbers();
    
    // Инициализация навигации
    initNavigation();
    
    // Инициализация модального окна
    initModal();
    
    // Инициализация переключения изображений
    initImageSwitch();
    
    // Показ анимаций при скролле
    initScrollAnimations();
    
    // Хранение структуры для будущих вкладок
    window.siteData = {
        owner: 'Daner',
        favoriteNumber: 249,
        pages: ['home', 'games', 'modpacks', 'community', 'upload', 'profile'],
        currentGame: {
            name: 'R.E.P.O.',
            steamId: 3241660,
            steamUrl: 'https://store.steampowered.com/app/3241660/REPO/',
            modpackUrl: '#',
            images: [
                'https://cdn.cloudflare.steamstatic.com/steam/apps/3241660/header.jpg',
                'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
                'https://images.unsplash.com/photo-1511512578047-dfb367046420'
            ]
        },
        otherGames: [
            { name: 'Phasmophobia', steamId: 739630 },
            { name: 'Lethal Company', steamId: 1966720 },
            { name: 'Valheim', steamId: 892970 },
            { name: 'Pacific Drive', steamId: 1458140 }
        ]
    };
    
    console.log('Структура сайта:', window.siteData);
});

// Анимация чисел
function animateNumbers() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 16);
            } else {
                counter.textContent = target;
            }
        };
        
        // Запуск анимации при появлении в поле зрения
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Навигация
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const navLinksContainer = document.querySelector('.nav-links');
            navLinksContainer.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinksContainer.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.dataset.page !== 'home') {
                e.preventDefault();
                alert('Страница "' + link.dataset.page + '" будет добавлена в ближайшее время!');
                return;
            }
            
            // Обновление активного состояния
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Закрытие мобильного меню
            if (window.innerWidth <= 992) {
                document.querySelector('.nav-links').classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            document.querySelector('.nav-links').classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Модальное окно
function initModal() {
    const downloadTriggers = document.querySelectorAll('.download-trigger');
    const downloadModal = document.getElementById('downloadModal');
    const modalClose = document.getElementById('modalClose');
    
    downloadTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            if (downloadModal) {
                downloadModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            downloadModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Закрытие при клике вне модального окна
    if (downloadModal) {
        downloadModal.addEventListener('click', (e) => {
            if (e.target === downloadModal) {
                downloadModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Закрытие на Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && downloadModal.style.display === 'flex') {
            downloadModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Переключение изображений
function initImageSwitch() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.game-image');
    
    if (thumbnails.length && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const newSrc = thumb.getAttribute('data-image');
                if (newSrc && newSrc !== mainImage.src) {
                    // Добавление эффекта перехода
                    mainImage.style.opacity = '0';
                    
                    setTimeout(() => {
                        mainImage.src = newSrc;
                        mainImage.style.opacity = '1';
                    }, 200);
                    
                    // Обновление активного состояния
                    thumbnails.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                }
            });
        });
    }
}

// Анимации при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.slide-down-animation');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.style.animationDelay || '0s';
                entry.target.style.animationDelay = delay;
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Отслеживание событий для аналитики
function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label, timestamp: new Date().toISOString() });
}

// Добавление задержки для последовательной анимации
function staggerAnimation(elements, delay = 100) {
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * delay);
    });
}
// Добавьте эти функции в конец script.js

// Оптимизация для мобильных устройств
function optimizeForMobile() {
    // Определение мобильного устройства
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouchDevice) {
        console.log('Мобильное устройство обнаружено, применяем оптимизации');
        
        // Отключаем сложные анимации на медленных устройствах
        if (isLowEndDevice()) {
            disableComplexAnimations();
        }
        
        // Оптимизация сенсорных взаимодействий
        optimizeTouchInteractions();
        
        // Предотвращение масштабирования при фокусе
        preventZoomOnFocus();
    }
}

// Проверка на слабое устройство
function isLowEndDevice() {
    const memory = navigator.deviceMemory || 4; // в GB
    const cores = navigator.hardwareConcurrency || 4;
    const isSlow = memory < 4 || cores < 4;
    
    return isSlow;
}

// Отключение сложных анимаций
function disableComplexAnimations() {
    const animatedElements = document.querySelectorAll('.animated-bg, .particle, .hexagon');
    animatedElements.forEach(el => {
        el.style.display = 'none';
    });
    
    // Упрощаем остальные анимации
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    document.documentElement.style.setProperty('--transition-slow', 'all 0.3s ease');
}

// Оптимизация сенсорных взаимодействий
function optimizeTouchInteractions() {
    // Увеличиваем зоны клика
    const touchElements = document.querySelectorAll('.nav-link, .action-btn, .btn-small, .thumbnail');
    touchElements.forEach(el => {
        if (!el.classList.contains('mobile-optimized')) {
            const style = window.getComputedStyle(el);
            const minHeight = parseInt(style.minHeight) || 0;
            
            if (minHeight < 44) {
                el.style.minHeight = '44px';
                el.style.minWidth = '44px';
            }
            
            el.classList.add('mobile-optimized');
        }
    });
    
    // Улучшаем feedback при касании
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// Предотвращение масштабирования при фокусе
function preventZoomOnFocus() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            setTimeout(() => {
                this.style.fontSize = '16px';
            }, 100);
        });
        
        input.addEventListener('blur', function() {
            this.style.fontSize = '';
        });
    });
}

// Добавьте вызов функции в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код ...
    
    // Оптимизация для мобильных
    optimizeForMobile();
    
    // Обработчик изменения ориентации
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            location.reload();
        }, 100);
    });
    
    // Предотвращение bounce-эффекта на iOS
    document.body.addEventListener('touchmove', function(e) {
        if (e.target.closest('.modal-content')) {
            e.stopPropagation();
        }
    }, { passive: false });
});