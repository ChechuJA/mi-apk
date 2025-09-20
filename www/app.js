// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Game logic
const games = {
    memory: {
        name: 'Juego de Memoria',
        cards: ['🎮', '🎯', '🏆', '⭐', '🎪', '🎨', '🎭', '🎲'],
        flipped: [],
        matched: [],
        moves: 0
    },
    snake: {
        name: 'Snake',
        direction: 'right',
        snake: [{x: 10, y: 10}],
        food: {x: 5, y: 5},
        score: 0
    },
    quiz: {
        name: 'Quiz',
        currentQuestion: 0,
        score: 0,
        questions: [
            {
                question: "¿Cuál es la capital de España?",
                options: ["Madrid", "Barcelona", "Valencia", "Sevilla"],
                correct: 0
            },
            {
                question: "¿En qué año se lanzó el primer iPhone?",
                options: ["2006", "2007", "2008", "2009"],
                correct: 1
            },
            {
                question: "¿Cuál es el planeta más grande del sistema solar?",
                options: ["Saturno", "Júpiter", "Neptuno", "Urano"],
                correct: 1
            }
        ]
    }
};

function startGame(gameType) {
    const gameGrid = document.querySelector('.game-grid');
    const gameContainer = document.getElementById('game-container');
    const gameContent = document.getElementById('game-content');
    
    gameGrid.style.display = 'none';
    gameContainer.style.display = 'block';
    
    switch(gameType) {
        case 'memory':
            startMemoryGame();
            break;
        case 'snake':
            startSnakeGame();
            break;
        case 'quiz':
            startQuizGame();
            break;
    }
}

function goBack() {
    const gameGrid = document.querySelector('.game-grid');
    const gameContainer = document.getElementById('game-container');
    
    gameContainer.style.display = 'none';
    gameGrid.style.display = 'grid';
    
    // Reset games
    games.memory.flipped = [];
    games.memory.matched = [];
    games.memory.moves = 0;
    games.quiz.currentQuestion = 0;
    games.quiz.score = 0;
    games.snake.score = 0;
}

function startMemoryGame() {
    const gameContent = document.getElementById('game-content');
    const cards = [...games.memory.cards, ...games.memory.cards];
    shuffle(cards);
    
    gameContent.innerHTML = `
        <h2>🧠 Juego de Memoria</h2>
        <div class="score">Movimientos: ${games.memory.moves}</div>
        <div class="memory-grid">
            ${cards.map((card, index) => `
                <div class="memory-card" data-index="${index}" data-card="${card}" onclick="flipCard(${index})">
                    ?
                </div>
            `).join('')}
        </div>
    `;
}

function flipCard(index) {
    const card = document.querySelector(`[data-index="${index}"]`);
    const cardValue = card.dataset.card;
    
    if (games.memory.flipped.length < 2 && !games.memory.flipped.includes(index) && !games.memory.matched.includes(index)) {
        card.textContent = cardValue;
        card.classList.add('flipped');
        games.memory.flipped.push(index);
        
        if (games.memory.flipped.length === 2) {
            games.memory.moves++;
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [first, second] = games.memory.flipped;
    const firstCard = document.querySelector(`[data-index="${first}"]`);
    const secondCard = document.querySelector(`[data-index="${second}"]`);
    
    if (firstCard.dataset.card === secondCard.dataset.card) {
        games.memory.matched.push(first, second);
        if (games.memory.matched.length === 16) {
            setTimeout(() => alert(`¡Ganaste! Completaste el juego en ${games.memory.moves} movimientos`), 100);
        }
    } else {
        firstCard.textContent = '?';
        secondCard.textContent = '?';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }
    
    games.memory.flipped = [];
    document.querySelector('.score').textContent = `Movimientos: ${games.memory.moves}`;
}

function startSnakeGame() {
    const gameContent = document.getElementById('game-content');
    
    gameContent.innerHTML = `
        <h2>🐍 Snake</h2>
        <div class="score">Puntuación: ${games.snake.score}</div>
        <canvas id="snake-canvas" width="400" height="400" style="border: 2px solid white; background: rgba(0,0,0,0.3);"></canvas>
        <p style="margin-top: 1rem;">Usa las flechas del teclado para moverte</p>
    `;
    
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    
    // Simple snake game implementation
    function drawGame() {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, 400, 400);
        
        // Draw snake
        ctx.fillStyle = '#4CAF50';
        games.snake.snake.forEach(segment => {
            ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
        });
        
        // Draw food
        ctx.fillStyle = '#FF5722';
        ctx.fillRect(games.snake.food.x * 20, games.snake.food.y * 20, 18, 18);
    }
    
    drawGame();
    
    // Add keyboard controls
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp': games.snake.direction = 'up'; break;
            case 'ArrowDown': games.snake.direction = 'down'; break;
            case 'ArrowLeft': games.snake.direction = 'left'; break;
            case 'ArrowRight': games.snake.direction = 'right'; break;
        }
    });
}

function startQuizGame() {
    const gameContent = document.getElementById('game-content');
    showQuestion();
}

function showQuestion() {
    const gameContent = document.getElementById('game-content');
    const question = games.quiz.questions[games.quiz.currentQuestion];
    
    gameContent.innerHTML = `
        <h2>❓ Quiz</h2>
        <div class="score">Puntuación: ${games.quiz.score}/${games.quiz.questions.length}</div>
        <div class="quiz-question">${question.question}</div>
        <div class="quiz-options">
            ${question.options.map((option, index) => `
                <button class="quiz-option" onclick="selectAnswer(${index})">
                    ${option}
                </button>
            `).join('')}
        </div>
    `;
}

function selectAnswer(selectedIndex) {
    const question = games.quiz.questions[games.quiz.currentQuestion];
    
    if (selectedIndex === question.correct) {
        games.quiz.score++;
    }
    
    games.quiz.currentQuestion++;
    
    if (games.quiz.currentQuestion < games.quiz.questions.length) {
        setTimeout(showQuestion, 1000);
    } else {
        setTimeout(() => {
            const gameContent = document.getElementById('game-content');
            gameContent.innerHTML = `
                <h2>¡Quiz Completado!</h2>
                <div style="font-size: 2rem; margin: 2rem 0;">
                    ${games.quiz.score}/${games.quiz.questions.length}
                </div>
                <p>¡Buen trabajo!</p>
                <button onclick="goBack()" style="margin-top: 2rem; padding: 1rem 2rem; background: #4CAF50; color: white; border: none; border-radius: 25px; cursor: pointer;">
                    Volver al menú
                </button>
            `;
        }, 1000);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// PWA Install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    const installBtn = document.createElement('button');
    installBtn.textContent = '📱 Instalar App';
    installBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
    `;
    
    installBtn.addEventListener('click', () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
        });
    });
    
    document.body.appendChild(installBtn);
});