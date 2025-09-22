// mobile-controls.js
// Sistema universal de controles táctiles para dispositivos móviles
// Autor: ChechuJA + GitHub Copilot

class MobileControls {
  constructor() {
    this.activeKeys = new Set();
    this.controlsContainer = null;
    this.gameCanvas = null;
    this.isMobile = this.detectMobile();
    this.controlsVisible = false;
    
    // Configuraciones por tipo de juego
    this.gameConfigs = {
      // Juegos con movimiento horizontal (Arkanoid, etc.)
      horizontal: {
        buttons: [
          { key: 'ArrowLeft', label: '◀', position: 'bottom-left' },
          { key: 'ArrowRight', label: '▶', position: 'bottom-right' }
        ]
      },
      
      // Juegos con movimiento 4 direcciones (Laberinto, Sokoban, etc.)
      directional: {
        buttons: [
          { key: 'ArrowLeft', label: '◀', position: 'left' },
          { key: 'ArrowRight', label: '▶', position: 'right' },
          { key: 'ArrowUp', label: '▲', position: 'top' },
          { key: 'ArrowDown', label: '▼', position: 'bottom' }
        ]
      },
      
      // Juegos con salto o acción (Flappy, Paracaidista, etc.)
      action: {
        buttons: [
          { key: 'ArrowLeft', label: '◀', position: 'bottom-left' },
          { key: 'ArrowRight', label: '▶', position: 'bottom-right' },
          { key: ' ', label: '🚀', position: 'action' }
        ]
      },
      
      // Juegos solo con tap/click (Quiz, 4enRaya, etc.)
      tap: {
        buttons: []
      },
      
      // Juegos complejos con múltiples controles
      complex: {
        buttons: [
          { key: 'ArrowLeft', label: '◀', position: 'left' },
          { key: 'ArrowRight', label: '▶', position: 'right' },
          { key: 'ArrowUp', label: '▲', position: 'top' },
          { key: 'ArrowDown', label: '▼', position: 'bottom' },
          { key: ' ', label: 'A', position: 'action' },
          { key: 'h', label: 'B', position: 'action-2' }
        ]
      }
    };
    
    // Mapeo de juegos a configuraciones
    this.gameTypeMap = {
      'arkanoid': 'horizontal',
      'paracaidista': 'action',
      'laberinto': 'directional',
      'sokoban': 'directional',
      'serpiente': 'directional',
      'nave-exploradora': 'complex',
      'flappy': 'action',
      'juego-habilidad': 'directional',
      'recoge-moras': 'directional',
      'canaveras': 'directional',
      'moto-desierto': 'action',
      'alonso-noel': 'complex',
      'alcala-canas-tapas': 'directional',
      'sonseca-camino': 'directional',
      'vega-bailarina': 'directional',
      'huerto': 'tap',
      'quiz': 'tap',
      '4enraya': 'tap',
      'ahorcado': 'tap',
      'memoria': 'tap'
    };
  }
  
  detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0);
  }
  
  init(gameType, canvas) {
    this.gameCanvas = canvas;
    
    if (!this.isMobile) {
      console.log('MobileControls: Desktop device detected, skipping mobile controls');
      return; // No crear controles en desktop
    }
    
    console.log('MobileControls: Initializing for game type:', gameType);
    
    const config = this.gameConfigs[this.gameTypeMap[gameType] || 'directional'];
    
    // Ensure cleanup of any existing controls first
    this.cleanup();
    
    // Add slight delay to ensure DOM is ready
    setTimeout(() => {
      this.createControlsContainer();
      this.createButtons(config.buttons);
      this.setupEventListeners();
      this.showControls();
      
      console.log('MobileControls: Successfully initialized with', config.buttons.length, 'buttons');
    }, 100);
  }
  
  createControlsContainer() {
    // Remover controles existentes
    this.cleanup();
    
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.id = 'mobileControls';
    this.controlsContainer.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 200px;
      pointer-events: none;
      z-index: 1000;
      display: none;
    `;
    
    document.body.appendChild(this.controlsContainer);
  }
  
  createButtons(buttons) {
    buttons.forEach(button => {
      const btn = document.createElement('div');
      btn.className = 'mobile-control-btn';
      btn.dataset.key = button.key;
      btn.textContent = button.label;
      
      // Estilos base
      btn.style.cssText = `
        position: absolute;
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.9);
        border: 2px solid #0d3d91;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        color: #0d3d91;
        user-select: none;
        pointer-events: all;
        cursor: pointer;
        transition: all 0.1s ease;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      `;
      
      // Posicionamiento
      this.positionButton(btn, button.position);
      
      // Eventos táctiles
      this.addButtonEvents(btn, button.key);
      
      this.controlsContainer.appendChild(btn);
    });
  }
  
  positionButton(btn, position) {
    const positions = {
      'bottom-left': { bottom: '20px', left: '20px' },
      'bottom-right': { bottom: '20px', right: '20px' },
      'left': { bottom: '100px', left: '20px' },
      'right': { bottom: '100px', right: '20px' },
      'top': { bottom: '180px', left: '50%', transform: 'translateX(-50%)' },
      'bottom': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' },
      'action': { bottom: '100px', right: '100px' },
      'action-2': { bottom: '40px', right: '100px' }
    };
    
    const pos = positions[position] || positions['bottom'];
    Object.assign(btn.style, pos);
  }
  
  addButtonEvents(btn, key) {
    // Prevenir scroll y zoom
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    // Touch events
    btn.addEventListener('touchstart', (e) => {
      preventDefaults(e);
      this.pressKey(key);
      btn.style.background = 'rgba(13, 61, 145, 0.9)';
      btn.style.color = 'white';
      btn.style.transform = (btn.style.transform || '') + ' scale(0.95)';
    }, { passive: false });
    
    btn.addEventListener('touchend', (e) => {
      preventDefaults(e);
      this.releaseKey(key);
      btn.style.background = 'rgba(255, 255, 255, 0.9)';
      btn.style.color = '#0d3d91';
      btn.style.transform = btn.style.transform.replace(' scale(0.95)', '');
    }, { passive: false });
    
    // Mouse events (para testing)
    btn.addEventListener('mousedown', (e) => {
      preventDefaults(e);
      this.pressKey(key);
      btn.style.background = 'rgba(13, 61, 145, 0.9)';
      btn.style.color = 'white';
    });
    
    btn.addEventListener('mouseup', (e) => {
      preventDefaults(e);
      this.releaseKey(key);
      btn.style.background = 'rgba(255, 255, 255, 0.9)';
      btn.style.color = '#0d3d91';
    });
    
    btn.addEventListener('mouseleave', (e) => {
      this.releaseKey(key);
      btn.style.background = 'rgba(255, 255, 255, 0.9)';
      btn.style.color = '#0d3d91';
    });
  }
  
  pressKey(key) {
    if (this.activeKeys.has(key)) return;
    
    this.activeKeys.add(key);
    
    // Simular evento de teclado
    const event = new KeyboardEvent('keydown', {
      key: key,
      code: this.getKeyCode(key),
      bubbles: true
    });
    
    document.dispatchEvent(event);
  }
  
  releaseKey(key) {
    if (!this.activeKeys.has(key)) return;
    
    this.activeKeys.delete(key);
    
    // Simular evento de liberación de tecla
    const event = new KeyboardEvent('keyup', {
      key: key,
      code: this.getKeyCode(key),
      bubbles: true
    });
    
    document.dispatchEvent(event);
  }
  
  getKeyCode(key) {
    const keyCodes = {
      'ArrowLeft': 'ArrowLeft',
      'ArrowRight': 'ArrowRight',
      'ArrowUp': 'ArrowUp',
      'ArrowDown': 'ArrowDown',
      ' ': 'Space',
      'h': 'KeyH',
      'r': 'KeyR'
    };
    return keyCodes[key] || key;
  }
  
  showControls() {
    if (this.controlsContainer && this.isMobile) {
      this.controlsContainer.style.display = 'block';
      this.controlsVisible = true;
      
      // Ajustar canvas para hacer espacio a los controles
      if (this.gameCanvas) {
        this.gameCanvas.style.marginBottom = '120px';
      }
      
      console.log('MobileControls: Controls now visible');
    } else {
      console.log('MobileControls: Cannot show controls -', 
        !this.controlsContainer ? 'no container' : 'not mobile device');
    }
  }
  
  hideControls() {
    if (this.controlsContainer) {
      this.controlsContainer.style.display = 'none';
      this.controlsVisible = false;
      
      // Restaurar canvas
      if (this.gameCanvas) {
        this.gameCanvas.style.marginBottom = '0';
      }
    }
  }
  
  setupEventListeners() {
    // Prevenir zoom con pellizco
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Prevenir menús contextuales
    document.addEventListener('contextmenu', (e) => {
      if (this.controlsVisible) {
        e.preventDefault();
      }
    });
  }
  
  cleanup() {
    // Limpiar todas las teclas activas
    this.activeKeys.forEach(key => {
      this.releaseKey(key);
    });
    this.activeKeys.clear();
    
    // Remover controles del DOM
    if (this.controlsContainer) {
      this.controlsContainer.remove();
      this.controlsContainer = null;
    }
    
    this.controlsVisible = false;
    
    // Restaurar canvas
    if (this.gameCanvas) {
      this.gameCanvas.style.marginBottom = '0';
    }
  }
  
  // Método para detectar automáticamente el tipo de juego basado en el script
  detectGameType() {
    const currentScript = document.querySelector('script[src*="script-"]');
    if (currentScript) {
      const src = currentScript.src;
      const match = src.match(/script-([^.]+)\.js/);
      if (match) {
        return match[1];
      }
    }
    return 'directional'; // Por defecto
  }
}

// Instancia global
window.mobileControls = new MobileControls();

// Auto-inicialización cuando se detecta un juego
window.initMobileControls = function(gameType) {
  console.log('initMobileControls called with gameType:', gameType);
  
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) {
    console.warn('initMobileControls: gameCanvas not found');
    return;
  }
  
  if (window.mobileControls) {
    window.mobileControls.init(gameType || window.mobileControls.detectGameType(), canvas);
  } else {
    console.error('initMobileControls: mobileControls instance not available');
  }
};

// Limpieza automática
window.cleanupMobileControls = function() {
  console.log('cleanupMobileControls called');
  if (window.mobileControls) {
    window.mobileControls.cleanup();
  }
};

// Auto-initialize on page load if mobile device detected
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, mobile controls available:', !!window.mobileControls);
  if (window.mobileControls && window.mobileControls.isMobile) {
    console.log('Mobile device detected on page load');
  }
});