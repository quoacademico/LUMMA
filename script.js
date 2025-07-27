// LUMMA - Script principal
document.addEventListener('DOMContentLoaded', function() {
    console.log('LUMMA página cargada correctamente');
    
    // Añadir efectos interactivos adicionales
    initializePageEffects();
    setupResponsiveAnimations();
    addAccessibilityFeatures();
});

/**
 * Inicializa efectos de página
 */
function initializePageEffects() {
    const messageContainer = document.querySelector('.message-container');
    const logoContainer = document.querySelector('.logo-container');
    
    // Efecto de aparición suave
    setTimeout(() => {
        if (messageContainer) {
            messageContainer.style.opacity = '0';
            messageContainer.style.transform = 'translateY(50px) perspective(1000px) rotateX(5deg)';
            messageContainer.style.transition = 'all 1s ease-out';
            
            setTimeout(() => {
                messageContainer.style.opacity = '1';
                messageContainer.style.transform = 'translateY(0) perspective(1000px) rotateX(5deg)';
            }, 100);
        }
        
        if (logoContainer) {
            logoContainer.style.opacity = '0';
            logoContainer.style.transform = 'translateY(-30px)';
            logoContainer.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                logoContainer.style.opacity = '1';
                logoContainer.style.transform = 'translateY(0)';
            }, 300);
        }
    }, 100);
}

/**
 * Configura animaciones responsivas
 */
function setupResponsiveAnimations() {
    const book = document.querySelector('.book');
    
    // Ajustar velocidad de animación según el tamaño de pantalla
    function adjustAnimationSpeed() {
        if (!book) return;
        
        const screenWidth = window.innerWidth;
        let animationDuration = '4s';
        
        if (screenWidth < 480) {
            animationDuration = '6s'; // Más lento en móviles
        } else if (screenWidth < 768) {
            animationDuration = '5s';
        }
        
        const pages = document.querySelectorAll('.page');
        pages.forEach((page, index) => {
            page.style.animationDuration = animationDuration;
            page.style.animationDelay = `${index}s`;
        });
    }
    
    // Ajustar al cargar y al redimensionar
    adjustAnimationSpeed();
    window.addEventListener('resize', adjustAnimationSpeed);
}

/**
 * Añade características de accesibilidad
 */
function addAccessibilityFeatures() {
    // Pausar animaciones si el usuario prefiere movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleMotionPreference() {
        const bookAnimation = document.querySelector('.book-animation');
        const pages = document.querySelectorAll('.page');
        
        if (prefersReducedMotion.matches && bookAnimation) {
            // Reducir o pausar animaciones
            pages.forEach(page => {
                page.style.animationPlayState = 'paused';
            });
            bookAnimation.style.opacity = '0.1';
        } else if (bookAnimation) {
            // Restaurar animaciones
            pages.forEach(page => {
                page.style.animationPlayState = 'running';
            });
            bookAnimation.style.opacity = '0.3';
        }
    }
    
    handleMotionPreference();
    prefersReducedMotion.addEventListener('change', handleMotionPreference);
    
    // Añadir navegación por teclado mejorada
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Funcionalidad futura - cerrar modales, etc.
            console.log('Escape presionado');
        }
    });
}

/**
 * Añade partículas flotantes opcional (se puede activar más tarde)
 */
function addFloatingParticles() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        container.appendChild(particle);
    }
    
    // Añadir estilos de animación de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
                opacity: 0.6;
            }
            50% { 
                transform: translateY(-20px) rotate(180deg); 
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Exportar funciones para uso futuro
window.LUMMA = {
    initializePageEffects,
    setupResponsiveAnimations,
    addAccessibilityFeatures,
    addFloatingParticles
};