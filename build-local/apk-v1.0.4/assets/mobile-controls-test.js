// mobile-controls-test.js
// Comprehensive test suite for mobile controls functionality

class MobileControlsTest {
  constructor() {
    this.tests = [];
    this.results = [];
  }
  
  addTest(name, testFn) {
    this.tests.push({ name, testFn });
  }
  
  async runTests() {
    console.log('🧪 Starting Mobile Controls Test Suite');
    this.results = [];
    
    for (const test of this.tests) {
      try {
        const result = await test.testFn();
        this.results.push({
          name: test.name,
          passed: result.passed,
          message: result.message,
          details: result.details
        });
        console.log(`${result.passed ? '✅' : '❌'} ${test.name}: ${result.message}`);
      } catch (error) {
        this.results.push({
          name: test.name,
          passed: false,
          message: `Test failed with error: ${error.message}`,
          details: error.stack
        });
        console.error(`❌ ${test.name}: Error - ${error.message}`);
      }
    }
    
    return this.results;
  }
  
  generateReport() {
    const passed = this.results.filter(r => r.passed).length;
    const total = this.results.length;
    const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;
    
    return {
      summary: `${passed}/${total} tests passed (${passRate}%)`,
      passed,
      total,
      passRate,
      results: this.results
    };
  }
}

// Initialize test suite
const mobileControlsTest = new MobileControlsTest();

// Test 1: Check if MobileControls class exists and is properly initialized
mobileControlsTest.addTest('MobileControls Instance', () => {
  return {
    passed: window.mobileControls !== undefined && window.mobileControls instanceof MobileControls,
    message: window.mobileControls ? 'MobileControls instance available' : 'MobileControls instance missing',
    details: {
      instanceType: typeof window.mobileControls,
      isMobile: window.mobileControls?.isMobile,
      constructor: window.mobileControls?.constructor?.name
    }
  };
});

// Test 2: Check mobile detection accuracy
mobileControlsTest.addTest('Mobile Detection', () => {
  const userAgent = navigator.userAgent;
  const hasTouch = 'ontouchstart' in window;
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  
  const expectedMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || 
                        hasTouch || maxTouchPoints > 0;
  
  const detectedMobile = window.mobileControls ? window.mobileControls.detectMobile() : false;
  
  return {
    passed: detectedMobile === expectedMobile || detectedMobile === window.mobileControls?.isMobile,
    message: `Mobile detection: ${detectedMobile ? 'Mobile' : 'Desktop'} (expected: ${expectedMobile ? 'Mobile' : 'Desktop'})`,
    details: {
      userAgent: userAgent.substring(0, 100) + '...',
      hasTouch,
      maxTouchPoints,
      detectedMobile,
      expectedMobile
    }
  };
});

// Test 3: Check initialization functions
mobileControlsTest.addTest('Global Functions', () => {
  const hasInitFunction = typeof window.initMobileControls === 'function';
  const hasCleanupFunction = typeof window.cleanupMobileControls === 'function';
  
  return {
    passed: hasInitFunction && hasCleanupFunction,
    message: `Functions available: init(${hasInitFunction}), cleanup(${hasCleanupFunction})`,
    details: {
      initMobileControls: typeof window.initMobileControls,
      cleanupMobileControls: typeof window.cleanupMobileControls
    }
  };
});

// Test 4: Test game type mapping
mobileControlsTest.addTest('Game Type Mapping', () => {
  if (!window.mobileControls) {
    return { passed: false, message: 'MobileControls not available', details: {} };
  }
  
  const testMappings = [
    { input: 'arkanoid', expected: 'horizontal' },
    { input: 'laberinto', expected: 'directional' },
    { input: 'flappy', expected: 'action' },
    { input: 'quiz', expected: 'tap' },
    { input: 'unknown-game', expected: 'directional' } // fallback
  ];
  
  const results = testMappings.map(test => {
    const mapped = window.mobileControls.gameTypeMap[test.input] || 'directional';
    return {
      input: test.input,
      expected: test.expected,
      actual: mapped,
      correct: mapped === test.expected
    };
  });
  
  const allCorrect = results.every(r => r.correct);
  
  return {
    passed: allCorrect,
    message: `Game type mapping: ${results.filter(r => r.correct).length}/${results.length} correct`,
    details: results
  };
});

// Test 5: Test controls creation (without showing them)
mobileControlsTest.addTest('Controls Creation', () => {
  if (!window.mobileControls) {
    return { passed: false, message: 'MobileControls not available', details: {} };
  }
  
  // Create a temporary canvas for testing
  const testCanvas = document.createElement('canvas');
  testCanvas.id = 'test-gameCanvas';
  testCanvas.width = 400;
  testCanvas.height = 300;
  document.body.appendChild(testCanvas);
  
  try {
    // Test initialization
    window.mobileControls.init('directional', testCanvas);
    
    // Check if container was created
    const container = document.getElementById('mobileControls');
    const containerExists = container !== null;
    
    // Check if controls were created for mobile devices
    let controlsCreated = false;
    if (window.mobileControls.isMobile && container) {
      const buttons = container.querySelectorAll('button');
      controlsCreated = buttons.length > 0;
    }
    
    // Clean up
    window.mobileControls.cleanup();
    document.body.removeChild(testCanvas);
    
    return {
      passed: containerExists,
      message: containerExists ? 
        `Controls container created${controlsCreated ? ' with buttons' : ' (no buttons on desktop)'}` : 
        'Controls container not created',
      details: {
        isMobile: window.mobileControls.isMobile,
        containerExists,
        controlsCreated
      }
    };
    
  } catch (error) {
    // Clean up on error
    document.body.removeChild(testCanvas);
    throw error;
  }
});

// Test 6: Test key event generation
mobileControlsTest.addTest('Key Event Generation', () => {
  if (!window.mobileControls) {
    return { passed: false, message: 'MobileControls not available', details: {} };
  }
  
  let keyEventFired = false;
  let keyEventDetails = {};
  
  // Listen for key events
  const keyHandler = (e) => {
    keyEventFired = true;
    keyEventDetails = {
      key: e.key,
      keyCode: e.keyCode,
      type: e.type
    };
  };
  
  document.addEventListener('keydown', keyHandler);
  
  try {
    // Simulate key press
    window.mobileControls.pressKey('ArrowLeft');
    
    // Wait a bit for event to fire
    return new Promise((resolve) => {
      setTimeout(() => {
        document.removeEventListener('keydown', keyHandler);
        window.mobileControls.releaseKey('ArrowLeft');
        
        resolve({
          passed: keyEventFired,
          message: keyEventFired ? 
            `Key event generated: ${keyEventDetails.key}` : 
            'No key event generated',
          details: keyEventDetails
        });
      }, 100);
    });
    
  } catch (error) {
    document.removeEventListener('keydown', keyHandler);
    throw error;
  }
});

// Test 7: Test cleanup functionality
mobileControlsTest.addTest('Cleanup Functionality', () => {
  if (!window.mobileControls) {
    return { passed: false, message: 'MobileControls not available', details: {} };
  }
  
  // Create test setup
  const testCanvas = document.createElement('canvas');
  testCanvas.id = 'test-gameCanvas-2';
  document.body.appendChild(testCanvas);
  
  try {
    // Initialize controls
    window.mobileControls.init('directional', testCanvas);
    
    // Check container exists
    let container = document.getElementById('mobileControls');
    const containerCreated = container !== null;
    
    // Cleanup
    window.mobileControls.cleanup();
    
    // Check container is removed
    container = document.getElementById('mobileControls');
    const containerRemoved = container === null;
    
    // Clean up test canvas
    document.body.removeChild(testCanvas);
    
    return {
      passed: containerCreated && containerRemoved,
      message: containerCreated ? 
        (containerRemoved ? 'Cleanup successful' : 'Container not removed') :
        'Container was not created',
      details: {
        containerCreated,
        containerRemoved
      }
    };
    
  } catch (error) {
    document.body.removeChild(testCanvas);
    throw error;
  }
});

// Export for use in other contexts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MobileControlsTest, mobileControlsTest };
}

// Auto-run tests if this script is loaded directly
if (typeof window !== 'undefined' && window.document) {
  // Wait for mobile-controls.js to load
  window.addEventListener('load', () => {
    setTimeout(async () => {
      if (window.mobileControls) {
        console.log('🚀 Running Mobile Controls Test Suite...');
        await mobileControlsTest.runTests();
        const report = mobileControlsTest.generateReport();
        console.log(`📊 Test Summary: ${report.summary}`);
        
        // Make results available globally
        window.mobileControlsTestResults = report;
      } else {
        console.warn('⚠️ MobileControls not available for testing');
      }
    }, 500);
  });
}