// ===============================================
// EXPOSICIÓN CSS - JAVASCRIPT INTERACTIVO
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Exposición CSS cargada correctamente');
    
    // Inicializar funcionalidades
    initThemeToggle();
    initScrollAnimations();
    initInteractiveExamples();
    initCodeHighlighting();
    initResponsiveFeatures();
    
    // Mensaje de bienvenida
    showWelcomeMessage();
});

// ===============================================
// FUNCIONALIDADES RESPONSIVE
// ===============================================
function initResponsiveFeatures() {
    // Detectar tipo de dispositivo
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth <= 768;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        initTouchOptimizations();
    }
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        initMobileOptimizations();
    }
    
    // Listener para cambios de orientación y redimensionamiento
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Inicializar observador de viewport
    initViewportObserver();
    
    // Inicializar demostración responsive
    initResponsiveDemo();
}

function initResponsiveDemo() {
    // Actualizar información del dispositivo
    updateDeviceInfo();
    
    // Actualizar cuando cambie el tamaño
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', () => {
        setTimeout(updateDeviceInfo, 100);
    });
    
    // Actualizar características activas
    updateActiveFeatures();
    window.addEventListener('resize', updateActiveFeatures);
}

function updateDeviceInfo() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isLandscape = width > height;
    
    // Actualizar valores en la interfaz
    const elements = {
        'screen-width': `${width}px`,
        'screen-height': `${height}px`,
        'device-type': getDeviceTypeName(width),
        'orientation': isLandscape ? '🔄 Paisaje' : '📱 Retrato',
        'touch-support': isTouchDevice ? '👆 Sí' : '🖱️ No',
        'current-breakpoint': getCurrentBreakpoint(width)
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
    
    // Animar cambios
    document.querySelectorAll('.info-card').forEach(card => {
        card.style.transform = 'scale(1.05)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
}

function getDeviceTypeName(width) {
    if (width >= 1200) return '🖥️ Desktop XL';
    if (width >= 992) return '💻 Desktop';
    if (width >= 768) return '📋 Tablet';
    if (width >= 576) return '📱 Móvil Grande';
    return '📱 Móvil Pequeño';
}

function getCurrentBreakpoint(width) {
    if (width >= 1200) return 'XL (≥1200px)';
    if (width >= 992) return 'LG (≥992px)';
    if (width >= 768) return 'MD (≥768px)';
    if (width >= 576) return 'SM (≥576px)';
    return 'XS (<576px)';
}

function updateActiveFeatures() {
    const width = window.innerWidth;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Resetear todas las características
    document.querySelectorAll('.feature-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Activar características según el dispositivo actual
    const features = document.querySelectorAll('.feature-item');
    
    if (width <= 768) {
        const mobileFeature = document.querySelector('[data-breakpoint="mobile"]');
        if (mobileFeature) mobileFeature.classList.add('active');
    }
    
    if (width >= 768 && width < 1200) {
        const tabletFeature = document.querySelector('[data-breakpoint="tablet"]');
        if (tabletFeature) tabletFeature.classList.add('active');
    }
    
    if (width >= 1200) {
        const desktopFeature = document.querySelector('[data-breakpoint="desktop"]');
        if (desktopFeature) desktopFeature.classList.add('active');
    }
    
    if (isTouchDevice) {
        const touchFeature = document.querySelector('[data-breakpoint="touch"]');
        if (touchFeature) touchFeature.classList.add('active');
    }
}

function initTouchOptimizations() {
    // Reemplazar eventos hover con touch en dispositivos táctiles
    document.querySelectorAll('.hover-box').forEach(box => {
        box.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('touched');
        });
        
        box.addEventListener('touchend', function(e) {
            e.preventDefault();
            setTimeout(() => {
                this.classList.remove('touched');
            }, 300);
        });
    });
    
    // Mejorar interacciones táctiles en tarjetas
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

function initMobileOptimizations() {
    // Optimizar animaciones para móviles
    const animationBoxes = document.querySelectorAll('.animation-box');
    animationBoxes.forEach(box => {
        // Reducir duración de animaciones en móvil
        const currentAnimation = getComputedStyle(box).animation;
        if (currentAnimation && currentAnimation !== 'none') {
            box.style.animationDuration = '1s'; // Más rápido en móvil
        }
    });
    
    // Simplificar efectos 3D en móviles
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

function handleResize() {
    const currentWidth = window.innerWidth;
    const isMobileNow = currentWidth <= 768;
    
    // Actualizar clases según el tamaño
    if (isMobileNow && !document.body.classList.contains('mobile-device')) {
        document.body.classList.add('mobile-device');
        initMobileOptimizations();
    } else if (!isMobileNow && document.body.classList.contains('mobile-device')) {
        document.body.classList.remove('mobile-device');
    }
    
    // Reajustar animaciones si es necesario
    adjustAnimationsForSize();
}

function handleOrientationChange() {
    // Dar tiempo para que se complete el cambio de orientación
    setTimeout(() => {
        // Reajustar layout después del cambio de orientación
        document.querySelectorAll('.slide').forEach(slide => {
            slide.style.opacity = '0.8';
            setTimeout(() => {
                slide.style.opacity = '1';
            }, 100);
        });
        
        // Notificar sobre el cambio de orientación
        if (window.innerWidth > window.innerHeight) {
            showNotification('Modo paisaje activado', 'info');
        } else {
            showNotification('Modo retrato activado', 'info');
        }
    }, 100);
}

function adjustAnimationsForSize() {
    const isMobile = window.innerWidth <= 768;
    const animatedElements = document.querySelectorAll('.animation-box, .bounce-box');
    
    animatedElements.forEach(element => {
        if (isMobile) {
            // Animaciones más suaves en móvil
            element.style.animationDuration = '1.5s';
            element.style.animationTimingFunction = 'ease-out';
        } else {
            // Animaciones completas en desktop
            element.style.animationDuration = '';
            element.style.animationTimingFunction = '';
        }
    });
}

function initViewportObserver() {
    // Lazy loading mejorado para mejor performance en móviles
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Cargar contenido pesado solo cuando sea visible
                    if (element.classList.contains('animation-box')) {
                        element.style.opacity = '1';
                        element.style.animation = element.dataset.animation || '';
                    }
                    
                    lazyObserver.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        // Observar elementos que necesitan lazy loading
        document.querySelectorAll('.animation-box, .grid-item').forEach(el => {
            lazyObserver.observe(el);
        });
    }
}

// ===============================================
// TOGGLE TEMA OSCURO/CLARO
// ===============================================
function toggleTheme() {
    const body = document.body;
    const isCurrentlyDark = body.classList.contains('dark-theme');
    
    if (isCurrentlyDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        updateThemeButton('🌙');
        showNotification('Tema claro activado', 'info');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeButton('☀️');
        showNotification('Tema oscuro activado', 'info');
    }
}

function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme');
    const button = document.querySelector('.nav-toggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeButton('☀️');
    }
    
    // Agregar efecto de click
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
}

function updateThemeButton(icon) {
    const button = document.querySelector('.nav-toggle');
    button.textContent = icon;
}

// ===============================================
// ANIMACIONES DE SCROLL
// ===============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animación especial para diferentes elementos
                if (entry.target.classList.contains('method-card')) {
                    entry.target.style.animationDelay = Math.random() * 0.3 + 's';
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos
    document.querySelectorAll('.slide, .method-card, .selector-demo').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ===============================================
// EJEMPLOS INTERACTIVOS
// ===============================================
function initInteractiveExamples() {
    // Contador de clicks en botones
    let clickCount = 0;
    
    // Botón principal interactivo
    const mainButton = document.querySelector('.btn-primary');
    if (mainButton) {
        mainButton.addEventListener('click', function() {
            clickCount++;
            this.textContent = `¡Clicked ${clickCount} veces!`;
            
            // Efecto de partículas
            createParticles(this);
            
            // Cambiar color después de 5 clicks
            if (clickCount >= 5) {
                this.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                this.textContent = '¡Increíble! 🎉';
                setTimeout(() => {
                    this.textContent = 'Botón Interactivo';
                    this.style.background = '';
                    clickCount = 0;
                }, 2000);
            }
        });
    }
    
    // Efecto hover en tarjetas
    document.querySelectorAll('.method-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = getRandomGradient();
            this.style.color = 'white';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.color = '';
        });
    });
    
    // Efecto click en elementos de grid
    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', function() {
            const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
            this.style.background = colors[Math.floor(Math.random() * colors.length)];
            this.style.transform = 'rotate(360deg) scale(1.1)';
            
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) scale(1)';
            }, 600);
        });
    });
    
    // Efecto en elementos flexbox
    document.querySelectorAll('.flex-item').forEach(item => {
        item.addEventListener('click', function() {
            this.style.animation = 'bounce 1s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 1000);
        });
    });
}

// ===============================================
// FUNCIONES AUXILIARES
// ===============================================
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: #fff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${centerX}px;
                top: ${centerY}px;
                animation: particle-explosion 0.8s ease-out forwards;
            `;
            
            const angle = (i * 60) * Math.PI / 180;
            const distance = 50 + Math.random() * 30;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.style.setProperty('--end-x', endX + 'px');
            particle.style.setProperty('--end-y', endY + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 800);
        }, i * 50);
    }
}

function getRandomGradient() {
    const gradients = [
        'linear-gradient(45deg, #667eea, #764ba2)',
        'linear-gradient(45deg, #f093fb, #f5576c)',
        'linear-gradient(45deg, #4facfe, #00f2fe)',
        'linear-gradient(45deg, #a8edea, #fed6e3)',
        'linear-gradient(45deg, #ffecd2, #fcb69f)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'info' ? '#3498db' : '#2ecc71'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

function showWelcomeMessage() {
    // Ocultar pantalla de carga
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 800);
    }
    
    setTimeout(() => {
        const deviceInfo = getDeviceInfo();
        showNotification(`¡Bienvenido! ${deviceInfo} 🎨`, 'info');
        
        setTimeout(() => {
            showNotification('Explora todos los ejemplos interactivos', 'info');
        }, 2500);
        
        // Mostrar consejos específicos para el dispositivo
        setTimeout(() => {
            if (window.innerWidth <= 768) {
                showNotification('💡 Prueba girar tu dispositivo para ver más contenido', 'info');
            } else {
                showNotification('💡 Usa Ctrl+D para cambiar el tema', 'info');
            }
        }, 5000);
    }, 1000);
}

function getDeviceInfo() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isLandscape = width > height;
    
    let deviceType = '';
    let orientation = isLandscape ? 'paisaje' : 'retrato';
    
    if (width >= 1200) {
        deviceType = 'Desktop grande';
    } else if (width >= 992) {
        deviceType = 'Desktop';
    } else if (width >= 768) {
        deviceType = 'Tablet';
    } else if (width >= 576) {
        deviceType = 'Móvil grande';
    } else {
        deviceType = 'Móvil pequeño';
    }
    
    return `${deviceType} (${width}x${height}) ${isTouchDevice ? '👆' : '🖱️'} ${orientation}`;
}

// ===============================================
// RESALTADO DE CÓDIGO
// ===============================================
function initCodeHighlighting() {
    // Agregar números de línea a los bloques de código
    document.querySelectorAll('pre code').forEach((block, index) => {
        const lines = block.textContent.split('\\n');
        if (lines.length > 1) {
            block.style.position = 'relative';
            block.style.paddingLeft = '3em';
            
            // Crear números de línea
            const lineNumbers = document.createElement('div');
            lineNumbers.style.cssText = `
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 2.5em;
                background: rgba(255,255,255,0.1);
                color: rgba(255,255,255,0.6);
                font-size: 0.8em;
                line-height: 1.5;
                padding: 1rem 0.5rem;
                border-right: 1px solid rgba(255,255,255,0.1);
            `;
            
            lines.forEach((_, i) => {
                if (i < lines.length - 1) { // Excluir línea vacía final
                    lineNumbers.innerHTML += `${i + 1}<br>`;
                }
            });
            
            block.style.position = 'relative';
            block.appendChild(lineNumbers);
        }
    });
    
    // Efecto hover en bloques de código
    document.querySelectorAll('pre').forEach(pre => {
        pre.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        pre.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// ===============================================
// EVENTOS DE TECLADO
// ===============================================
document.addEventListener('keydown', function(e) {
    // Atajo para cambiar tema (Ctrl + D)
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Efecto especial con la tecla Espacio
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        createRandomAnimation();
    }
});

function createRandomAnimation() {
    const elements = document.querySelectorAll('.grid-item, .flex-item, .transform-box');
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    
    if (randomElement) {
        randomElement.style.animation = 'none';
        setTimeout(() => {
            randomElement.style.animation = 'bounce 1s ease-in-out';
        }, 10);
    }
}

// ===============================================
// ANIMACIONES CSS ADICIONALES
// ===============================================
const additionalStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes particle-explosion {
    0% {
        transform: translateX(0) translateY(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateX(var(--end-x, 0)) translateY(var(--end-y, 0)) scale(0);
        opacity: 0;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.interactive-element {
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.interactive-element:hover {
    transform: translateY(-2px);
}
`;

// Inyectar estilos adicionales
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement);

// ===============================================
// UTILIDADES DE CONSOLA
// ===============================================
console.log(`
🎨 Exposición CSS - Modo Desarrollador Activado
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Comandos disponibles:
• toggleTheme() - Cambiar tema
• Ctrl + D - Atajo para tema
• Spacebar - Animación aleatoria

Variables CSS disponibles:
• --primary-color: #3498db
• --secondary-color: #2ecc71
• --accent-color: #e74c3c

¡Explora y aprende CSS! 🚀
`);

// Exponer funciones globalmente para depuración
window.cssExposition = {
    toggleTheme,
    createParticles,
    showNotification,
    createRandomAnimation
};
