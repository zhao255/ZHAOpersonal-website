// Markdown parser function
function parseMarkdown(text) {
    if (!text) return '';
    
    // Escape HTML to prevent XSS attacks first
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    // Store code blocks temporarily
    const codeBlocks = [];
    html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
        const id = `CODEBLOCKPLACEHOLDER${codeBlocks.length}ID`;
        codeBlocks.push(code);
        return id;
    });
    
    // Store inline code temporarily
    const inlineCodes = [];
    html = html.replace(/`([^`\n]+)`/g, (match, code) => {
        const id = `INLINECODEPLACEHOLDER${inlineCodes.length}ID`;
        inlineCodes.push(code);
        return id;
    });
    
    // Process markdown formatting (order matters)
    // Bold (**text** or __text__)
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    
    // Italic (*text* or _text_)
    html = html.replace(/([^*]|^)\*([^*\n]+?)\*([^*]|$)/g, '$1<em>$2</em>$3');
    html = html.replace(/([^_]|^)_([^_\n]+?)_([^_]|$)/g, '$1<em>$2</em>$3');
    
    // Strikethrough (~~text~~)
    html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>');
    
    // Links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Restore inline code
    inlineCodes.forEach((code, index) => {
        html = html.replace(`INLINECODEPLACEHOLDER${index}ID`, `<code>${code}</code>`);
    });
    
    // Restore code blocks
    codeBlocks.forEach((code, index) => {
        html = html.replace(`CODEBLOCKPLACEHOLDER${index}ID`, `<pre><code>${code}</code></pre>`);
    });
    
    // Line breaks (convert \n to <br>, but not inside pre tags)
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.querySelectorAll('.dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    // Check for saved theme preference
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.forEach(toggle => {
            toggle.innerHTML = '☀️';
        });
    }
    
    darkModeToggle.forEach(toggle => {
        toggle.addEventListener('click', function() {
            let theme = document.documentElement.getAttribute('data-theme');
            
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                darkModeToggle.forEach(t => {
                    t.innerHTML = '🌙';
                });
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                darkModeToggle.forEach(t => {
                    t.innerHTML = '☀️';
                });
            }
        });
    });
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.main-menu a').forEach(link => {
        link.addEventListener('click', function() {
            mainMenu.classList.remove('active');
        });
    });
});

// Form submission handler
const emailForm = document.getElementById('email-form');
if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const company = document.getElementById('company').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create email body with all form information
        const emailBody = `Name: ${name}%0D%0ACompany: ${company}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
        
        // Create mailto link with subject and body
        const mailtoLink = `mailto:zhaoj6332@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
        
        // Open default mail client
        window.location.href = mailtoLink;
        
        // Optionally clear form after a short delay
        setTimeout(function() {
            document.getElementById('name').value = '';
            document.getElementById('company').value = '';
            document.getElementById('email').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';
            
            // Show success message
            const successMsg = document.getElementById('success-message');
            if (successMsg) {
                successMsg.style.display = 'block';
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMsg.style.display = 'none';
                }, 5000);
            }
        }, 1000);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a, .main-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Technical skills tabs navigation
document.addEventListener('DOMContentLoaded', function() {
    const techTabs = document.querySelectorAll('.tech-tab');
    
    techTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            techTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content sections
            const contentSections = document.querySelectorAll('.tech-content');
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show the corresponding content section
            const target = this.getAttribute('data-tab');
            const targetContent = document.getElementById(target + '-content');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});

// Detail page navigation with custom menu creation
document.querySelectorAll('.skill-link, .project-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const skillId = this.getAttribute('data-skill');
        const projectId = this.getAttribute('data-project');
        
        // If these link to external pages now, we should handle that.
        // But the user might want to keep the single-page behavior for now or move to separate pages.
        // The prompt says "drop all the tabs into individual html", which implies separate pages.
        // If we move to separate pages, this JS logic for detail-pages needs to be changed.
        
        // e.preventDefault();
        // ...
    });
});

// Create custom menu for detail pages
function createDetailMenu(detailPage, pageId) {
    const detailMenu = document.getElementById('detail-menu');
    if (!detailMenu) return;
    detailMenu.innerHTML = '';
    
    // If this is the technical skills page, create tabs for CAD, Coding, Other Tools
    if (pageId === 'python-detail') {
        const options = [
            { name: 'Coding', tab: 'coding' },
            { name: 'CAD', tab: 'cad' },
            { name: 'Other Tools', tab: 'other' }
        ];
        
        options.forEach(option => {
            const menuItem = document.createElement('li');
            const menuLink = document.createElement('a');
            menuLink.href = '#';
            menuLink.textContent = option.name;
            menuLink.setAttribute('data-tab', option.tab);
            menuLink.classList.add('detail-skill-tab');
            
            // Add click event to show the corresponding tab
            menuLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update tab navigation
                document.querySelectorAll('.tech-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                const targetTab = document.querySelector(`.tech-tab[data-tab="${option.tab}"]`);
                if (targetTab) targetTab.classList.add('active');
                
                // Show corresponding content
                document.querySelectorAll('.tech-content').forEach(content => {
                    content.classList.remove('active');
                });
                const targetContent = document.getElementById(`${option.tab}-content`);
                if (targetContent) targetContent.classList.add('active');
            });
            
            menuItem.appendChild(menuLink);
            detailMenu.appendChild(menuItem);
        });
        return;
    }

    // For other detail pages, create menu based on content
    const headers = detailPage.querySelectorAll('h2, h3');
    headers.forEach((header, index) => {
        if (header.tagName === 'H2' && index < 5) {
            const menuItem = document.createElement('li');
            const menuLink = document.createElement('a');
            menuLink.href = '#';
            menuLink.textContent = header.textContent;
            
            menuLink.addEventListener('click', function(e) {
                e.preventDefault();
                header.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            
            menuItem.appendChild(menuLink);
            detailMenu.appendChild(menuItem);
        }
    });
}

// Back button functionality
const backBtn = document.getElementById('detail-back-btn');
if (backBtn) {
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const pageId = this.getAttribute('data-page');
        hideDetailPage(pageId);
    });
}

// Function to hide detail page and show main content
function hideDetailPage(detailId) {
    const detailPage = document.getElementById(detailId);
    if (detailPage) detailPage.classList.remove('active');
    
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.style.display = 'block';
    
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.style.display = 'block';
    
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) mainHeader.style.display = 'block';
    
    const detailHeader = document.getElementById('detail-header');
    if (detailHeader) detailHeader.style.display = 'none';
}

// Python LaTeX Word Counter implementation
function countWordsAndEquations() {
    const textInput = document.getElementById('text-input');
    if (!textInput) return;
    const text = textInput.value;
    const output = document.getElementById('counter-output');
    const wordCountElement = document.getElementById('word-count');
    const equationCountElement = document.getElementById('equation-count');
    
    const equationPattern = /(\$\$[^$]+\$\$|\$[^$]+\$)/g;
    const equations = text.match(equationPattern) || [];
    const textWithoutEquations = text.replace(equationPattern, ' EQN_PLACEHOLDER ');
    const words = textWithoutEquations.split(/\s+/).filter(word => 
        word !== 'EQN_PLACEHOLDER' && word.length > 0
    );
    const wordCount = words.length;
    const equationCount = equations.length;
    
    if (wordCountElement) wordCountElement.textContent = wordCount;
    if (equationCountElement) equationCountElement.textContent = equationCount;
    
    if (output) {
        let outputText = `Analysis complete!\n\n`;
        outputText += `Regular words: ${wordCount}\n`;
        outputText += `LaTeX equations: ${equationCount}\n\n`;
        
        if (equationCount > 0) {
            outputText += `Equations found:\n`;
            equations.forEach((eq, index) => {
                outputText += `${index + 1}. ${eq}\n`;
            });
        }
        output.textContent = outputText;
    }
}

function clearTextInput() {
    const textInput = document.getElementById('text-input');
    if (textInput) textInput.value = '';
    const wordCount = document.getElementById('word-count');
    if (wordCount) wordCount.textContent = '0';
    const equationCount = document.getElementById('equation-count');
    if (equationCount) equationCount.textContent = '0';
    const output = document.getElementById('counter-output');
    if (output) output.textContent = 'Analysis results will appear here...';
}

// Snake Game Implementation
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('snake-game');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button');
    const resetButton = document.getElementById('reset-button');
    const scoreValue = document.getElementById('score-value');
    
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [];
    let aiSnakes = [];
    let foods = [];
    let direction = 'right';
    let gameRunning = false;
    let gamePaused = false;
    let gameLoop;
    let score = 0;
    let snakeColor = "#3498db";
    let gameSpeed = 100;
    let gameMode = "single";
    let aiCount = 1;
    let difficulty = "medium";
    let wallMode = "collision";
    
    function initGame() {
        clearInterval(gameLoop);
        snake = [
            { x: 5, y: 10 },
            { x: 4, y: 10 },
            { x: 3, y: 10 }
        ];
        direction = 'right';
        score = 0;
        if (scoreValue) scoreValue.textContent = score;
        
        const gameModeEl = document.getElementById('game-mode');
        if (gameModeEl) gameMode = gameModeEl.value;
        const aiCountEl = document.getElementById('ai-count');
        if (aiCountEl) aiCount = parseInt(aiCountEl.value);
        const difficultyEl = document.getElementById('difficulty');
        if (difficultyEl) difficulty = difficultyEl.value;
        const wallModeEl = document.getElementById('wall-mode');
        if (wallModeEl) wallMode = wallModeEl.value;
        
        if (difficulty === "easy") gameSpeed = 120;
        else if (difficulty === "medium") gameSpeed = 100;
        else gameSpeed = 80;
        
        aiSnakes = [];
        if (gameMode === "ai" || gameMode === "mixed") initAiSnakes();
        
        foods = [];
        placeFood();
        drawGame();
    }

    function initAiSnakes() {
        const aiColors = ["#e74c3c", "#2ecc71", "#9b59b6"];
        for (let i = 0; i < aiCount; i++) {
            const startX = Math.floor(Math.random() * (tileCount - 10)) + 5;
            const startY = Math.floor(Math.random() * (tileCount - 10)) + 5;
            aiSnakes.push({
                body: [{ x: startX, y: startY }, { x: startX - 1, y: startY }, { x: startX - 2, y: startY }],
                direction: 'right',
                color: aiColors[i % aiColors.length],
                score: 0
            });
        }
    }

    function placeFood() {
        const food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
            color: "#e74c3c",
            animating: false
        };
        
        let validPosition = true;
        if (gameMode !== "ai") {
            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x === food.x && snake[i].y === food.y) { validPosition = false; break; }
            }
        }
        if (validPosition && (gameMode === "ai" || gameMode === "mixed")) {
            for (let i = 0; i < aiSnakes.length; i++) {
                for (let j = 0; j < aiSnakes[i].body.length; j++) {
                    if (aiSnakes[i].body[j].x === food.x && aiSnakes[i].body[j].y === food.y) { validPosition = false; break; }
                }
                if (!validPosition) break;
            }
        }
        
        if (validPosition) foods.push(food);
        else placeFood();
    }

    function drawGame() {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        foods.forEach(food => {
            ctx.fillStyle = food.color;
            if (food.animating) {
                const size = gridSize * 1.3;
                ctx.fillRect(food.x * gridSize + gridSize/2 - size/2, food.y * gridSize + gridSize/2 - size/2, size, size);
            } else {
                ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
            }
        });
        
        if (gameMode !== "ai") {
            ctx.fillStyle = snakeColor;
            snake.forEach(part => ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2));
            ctx.fillStyle = darkenColor(snakeColor, 20);
            ctx.fillRect(snake[0].x * gridSize, snake[0].y * gridSize, gridSize - 2, gridSize - 2);
        }
        
        if (gameMode === "ai" || gameMode === "mixed") {
            aiSnakes.forEach(ai => {
                ctx.fillStyle = ai.color;
                ai.body.forEach(part => ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2));
                ctx.fillStyle = darkenColor(ai.color, 20);
                ctx.fillRect(ai.body[0].x * gridSize, ai.body[0].y * gridSize, gridSize - 2, gridSize - 2);
            });
        }
        
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 30);
        
        if (gamePaused) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
            ctx.textAlign = 'left';
        }
    }

    function updateGame() {
        if (gamePaused) return;
        if (gameMode !== "ai") updatePlayerSnake();
        if (gameMode === "ai" || gameMode === "mixed") updateAiSnakes();
        if (foods.length === 0 || (Math.random() < 0.05 && foods.length < 3)) placeFood();
        drawGame();
    }

    function updatePlayerSnake() {
        for (let i = snake.length - 1; i > 0; i--) {
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
        }
        if (direction === 'right') snake[0].x++;
        if (direction === 'left') snake[0].x--;
        if (direction === 'up') snake[0].y--;
        if (direction === 'down') snake[0].y++;
        
        if (wallMode === "collision") {
            if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) { gameOver(); return; }
        } else {
            if (snake[0].x < 0) snake[0].x = tileCount - 1;
            if (snake[0].x >= tileCount) snake[0].x = 0;
            if (snake[0].y < 0) snake[0].y = tileCount - 1;
            if (snake[0].y >= tileCount) snake[0].y = 0;
        }
        
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) { gameOver(); return; }
        }
        
        foods.forEach((food, i) => {
            if (snake[0].x === food.x && snake[0].y === food.y) {
                snake.push({ ...snake[snake.length-1] });
                food.animating = true;
                setTimeout(() => foods.splice(i, 1), 300);
                score++;
                if (scoreValue) scoreValue.textContent = score;
            }
        });
    }

    function updateAiSnakes() {
        aiSnakes.forEach(ai => {
            aiDecision(ai);
            for (let i = ai.body.length - 1; i > 0; i--) { ai.body[i].x = ai.body[i - 1].x; ai.body[i].y = ai.body[i - 1].y; }
            if (ai.direction === 'right') ai.body[0].x++;
            if (ai.direction === 'left') ai.body[0].x--;
            if (ai.direction === 'up') ai.body[0].y--;
            if (ai.direction === 'down') ai.body[0].y++;
            
            if (ai.body[0].x < 0) ai.body[0].x = tileCount - 1;
            if (ai.body[0].x >= tileCount) ai.body[0].x = 0;
            if (ai.body[0].y < 0) ai.body[0].y = tileCount - 1;
            if (ai.body[0].y >= tileCount) ai.body[0].y = 0;
            
            foods.forEach((food, i) => {
                if (ai.body[0].x === food.x && ai.body[0].y === food.y) {
                    ai.body.push({ ...ai.body[ai.body.length-1] });
                    food.animating = true;
                    setTimeout(() => foods.splice(i, 1), 300);
                }
            });
        });
    }

    function aiDecision(ai) {
        let closestFood = null;
        let minDist = Infinity;
        foods.forEach(food => {
            const dist = Math.abs(food.x - ai.body[0].x) + Math.abs(food.y - ai.body[0].y);
            if (dist < minDist) { minDist = dist; closestFood = food; }
        });
        if (!closestFood) return;
        const dx = closestFood.x - ai.body[0].x;
        const dy = closestFood.y - ai.body[0].y;
        let pref = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
        if (!isValidMove(ai, pref)) {
            pref = Math.abs(dx) <= Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
            if (!isValidMove(ai, pref)) {
                ['up', 'right', 'down', 'left'].forEach(d => { if (isValidMove(ai, d)) pref = d; });
            }
        }
        ai.direction = pref;
    }

    function isValidMove(ai, dir) {
        let h = { ...ai.body[0] };
        if (dir === 'right') h.x++; if (dir === 'left') h.x--; if (dir === 'up') h.y--; if (dir === 'down') h.y++;
        if (h.x < 0) h.x = tileCount - 1; if (h.x >= tileCount) h.x = 0; if (h.y < 0) h.y = tileCount - 1; if (h.y >= tileCount) h.y = 0;
        for (let i = 1; i < ai.body.length; i++) if (h.x === ai.body[i].x && h.y === ai.body[i].y) return false;
        return true;
    }

    function gameOver() {
        clearInterval(gameLoop);
        gameRunning = false;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 15);
        ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 25);
        ctx.textAlign = 'left';
    }

    function darkenColor(color, percent) {
        let r = parseInt(color.substring(1, 3), 16), g = parseInt(color.substring(3, 5), 16), b = parseInt(color.substring(5, 7), 16);
        r = Math.floor(r * (100 - percent) / 100); g = Math.floor(g * (100 - percent) / 100); b = Math.floor(b * (100 - percent) / 100);
        return "#" + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
    }

    if (startButton) startButton.addEventListener('click', () => { if (!gameRunning) { gameRunning = true; initGame(); gameLoop = setInterval(updateGame, gameSpeed); } });
    if (pauseButton) pauseButton.addEventListener('click', () => { if (gameRunning) { gamePaused = !gamePaused; drawGame(); } });
    if (resetButton) resetButton.addEventListener('click', () => { initGame(); });
    
    document.addEventListener('keydown', e => {
        if (!gameRunning || gamePaused) return;
        const key = e.key.toLowerCase();
        if ((key === 'w' || key === 'arrowup') && direction !== 'down') direction = 'up';
        else if ((key === 's' || key === 'arrowdown') && direction !== 'up') direction = 'down';
        else if ((key === 'a' || key === 'arrowleft') && direction !== 'right') direction = 'left';
        else if ((key === 'd' || key === 'arrowright') && direction !== 'left') direction = 'right';
    });
});

// Java Calculator Implementation
function calcAddNumber(num) {
    const input = document.getElementById('calc-input');
    if (!input) return;
    if (input.value === '0') input.value = num;
    else input.value += num;
}

function calcAddDecimal() {
    const input = document.getElementById('calc-input');
    if (input && !input.value.includes('.')) input.value += '.';
}

function calcAddOperation(op) {
    const input = document.getElementById('calc-input');
    if (input) input.value += op;
}

function calcClear() {
    const input = document.getElementById('calc-input');
    if (input) input.value = '0';
}

function calcBackspace() {
    const input = document.getElementById('calc-input');
    if (!input) return;
    if (input.value.length === 1) input.value = '0';
    else input.value = input.value.slice(0, -1);
}

function calcCalculate() {
    const input = document.getElementById('calc-input');
    const history = document.getElementById('calc-history');
    if (!input) return;
    try {
        const expression = input.value;
        const result = eval(expression);
        if (history) history.textContent += expression + ' = ' + result + '\n';
        input.value = result;
    } catch (error) {
        input.value = 'Error';
        setTimeout(calcClear, 1000);
    }
}

// HTML Color Palette Generator
function generateColorPalette() {
    const palette = document.getElementById('color-palette');
    const css = document.getElementById('palette-css');
    if (!palette) return;
    palette.innerHTML = '';
    const hue = Math.floor(Math.random() * 360);
    const colors = [hslToHex(hue, 70, 60), hslToHex((hue + 30) % 360, 70, 60), hslToHex((hue + 60) % 360, 70, 60), hslToHex((hue + 180) % 360, 70, 60), hslToHex((hue + 210) % 360, 70, 60)];
    let cssText = `:root {\n`;
    colors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.onclick = () => { copyToClipboard(color); alert('Color ' + color + ' copied to clipboard!'); };
        palette.appendChild(swatch);
        cssText += `  --color-${index + 1}: ${color};\n`;
    });
    cssText += `}`;
    if (css) css.textContent = cssText;
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// HTML Live Editor
function updateHTMLPreview() {
    const code = document.getElementById('html-editor');
    const preview = document.getElementById('html-preview');
    if (code && preview) preview.innerHTML = code.value;
}

// Scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollBtn = document.getElementById('scroll-top');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) scrollBtn.classList.add('visible');
            else scrollBtn.classList.remove('visible');
        });
        scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
});

// Image to PDF Converter
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const convertBtn = document.getElementById('convertBtn');
    if (fileInput && preview && convertBtn) {
        fileInput.addEventListener('change', e => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = e => { preview.style.display = 'block'; preview.src = e.target.result; convertBtn.disabled = false; };
                reader.readAsDataURL(file);
            }
        });
    }
});

// Scroll Position Persistence
document.addEventListener('DOMContentLoaded', function() {
    // Only apply to the main portfolio page (index.html or root)
    const isMainPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('ZHAOpersonal-website/');
    
    if (isMainPage) {
        // Restore scroll position
        const scrollPos = sessionStorage.getItem('mainPageScrollPos');
        if (scrollPos) {
            // Use setTimeout to ensure the page has rendered enough to scroll
            setTimeout(() => {
                window.scrollTo({
                    top: parseInt(scrollPos),
                    behavior: 'instant'
                });
            }, 100);
        }

        // Save scroll position before leaving the page
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('mainPageScrollPos', window.scrollY);
        });

        // Also save periodically while scrolling (more reliable than beforeunload on some browsers)
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                sessionStorage.setItem('mainPageScrollPos', window.scrollY);
            }, 250);
        });
    }
});

// Chat implementation (Final block)
document.addEventListener('DOMContentLoaded', function() {
    // BACKEND CONFIGURATION
    // If you are using the portfolio-backend with ngrok, set your ngrok URL here:
    // Example: const BACKEND_URL = 'https://your-ngrok-url.ngrok-free.app';
    const BACKEND_URL = 'https://karl-unharrowed-communally.ngrok-free.dev'; 

    const MODEL_ID = 'deepseek/deepseek-r1-0528:free';
    
    const chatBox = document.getElementById('chat-box');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const chatHeader = document.getElementById('chat-header');
    
    if (!chatBox || !chatHeader) return;
    
    let isOpen = chatBox.classList.contains('open');
    const chatBody = chatMessages ? chatMessages.parentElement : null;
    let abortController = null;

    const SYSTEM_PROMPT = `You are an AI assistant helping visitors learn about ZHAO XUECEN (Jack Zhao) and his personal website. You should be friendly, informative, and helpful. Use the following information to answer questions about him and his website:

PERSONAL INFORMATION:
- Name: ZHAO XUECEN (also known as Jack Zhao)
- Current Role: Mechanical Engineering Student
- Email: zhaoj6332@gmail.com
- Phone: +852 56170888
- Profile Initials: ZX

EDUCATION:
- The Hong Kong Polytechnic University (HK POLYU) - Bachelor of Engineering (Mechanical Engineering)
  - Expected Graduation: October 2026
  - Relevant Coursework: Structural Mechanics, Linear Systems and Control, Dynamics and Vibrations, Numerical Methods for Engineers, CAD/CAM Systems, Automation & Robotics, Fluid Dynamics, Materials Science, Programming (Python, MATLAB)
- Oxford International College (2018-2022) - British A-Levels/GCSE

WORK EXPERIENCE:
1. AI Features Developer Intern (Dec 2025) - Inspire Education Limited | Hong Kong
   - Develop and integrate AI features for personalized learning recommendations.
   - Build and optimize features for FunMA mathematics platform.
   - Implement machine learning algorithms for content generation and student performance analysis.

2. Part-time CAD Drawing Maker (2024 - Present) - Freelance
   - Create precise 2D and 3D CAD models and drawings for engineering applications.
   - Translate conceptual designs into technical specifications.

3. Freelance Web Developer (2023 - Present) - Self-employed
   - Design and develop custom web solutions for clients.
   - Implement responsive designs and interactive features using modern web technologies.

4. Part-Time Tutor (2022-2023) - Self-employed STEM Tutor | via ZOOM
   - Taught secondary students physics and mathematics via Zoom.
   - Developed customized lesson plans to address individual learning gaps.

5. Digital Engineering Intern (April 2019) - VineUp Company Internship, Gloucester UK
   - Collaborated with cross-functional teams to digitize project documentation.
   - Research and report of the user experience with their current interface.

PROJECTS (Newest First):
1. Interactive Math Content Generation Platform (2026) - Developer
   - Web-based app using Manim and AI to generate animated step-by-step math solution videos.
   - Features: Multi-row LaTeX steps, individual row styling, KaTeX real-time preview, synchronized audio, lesson generation with MCQ support, ZIP export.
   - Example Projects Created: 
     * Cone Interactive (https://zhao255.github.io/cone interactive/interactive.html)
     * Step-by-Step with Voice (https://zhao255.github.io/step by step with voice/index.html)
     * Pythagoras' Theorem Lesson (https://zhao255.github.io/pythagoras' theorem Lesson/index.html)
   - URL: https://zhao255.github.io/projects/interactive-math.html

2. Smart Navigational Cane (2025) - Project Leader
   - Proposed an innovative smart cane with GPS, ultrasonic sensors, and haptic feedback.
   - URL: https://zhao255.github.io/projects/smart-cane.html

3. AI-Powered Automation Program Plugin (2025) - Personal Project
   - Python-based tool to automate Excel and computer tasks using scikit-learn and PyAutoGUI.
   - URL: https://zhao255.github.io/projects/ai-automation.html

4. Robot Basketball Competition (First semester 2024) - Team Leader
   - Led an 8-member team to design/build an autonomous basketball robot.
   - URL: https://zhao255.github.io/projects/robot-basketball.html

5. Fuel Cell Powered Robot Car (2024)
   - Designed/built a robot car powered by Vanadium fuel cells.
   - URL: https://zhao255.github.io/projects/fuel-cell-car.html

SKILLS:
Technical Skills:
- CAD: SolidWorks (Advanced), Revit, AutoCAD
- Coding: Python (3+ years), MATLAB, Java, HTML, SQL (Basic)
- Other Tools: Manim (Math Animation), Microsoft Office Suite, BIM Basics

Soft Skills: Agile Project Management, Cross-functional Collaboration, Problem-Solving, Technical Tutoring
Languages: Cantonese, English, Putonghua

SOCIAL MEDIA & CONTACT:
- Email: zhaoj6332@gmail.com
- Phone/WhatsApp: +852 56170888
- Facebook: https://www.facebook.com/jack.zhao.1654700
- Instagram: https://www.instagram.com/jackzhaoyae/
- GitHub: https://github.com/zhao255

WEBSITE STRUCTURE & LINKS:
- Base URL: https://zhao255.github.io/
- Home Page: https://zhao255.github.io/index.html
- Project Detail Pages: /projects/ folder
- Skill Detail Pages: /skills/ folder

INTERESTS:
- AI applications in education, sustainable materials and fuel, and IoT innovation.
- Making educational content audible, interactive, and visible through AI.

When answering questions:
- keep the response short and concise, do not use too many words.
- Be conversational and friendly. Provide accurate information based on the details above.
- If asked about something not covered, politely say you don't have that information.
- Always refer to him as "Zhao Xuecen" or "Jack" when mentioning him.
- Provide the full URL when mentioning a specific project or skill page.
- Highlight the potential of the Interactive Math project: how it makes learning effective by making content audible, interactive, and visible.
- Mention website sections (About, Education, Experience, Projects, Skills, Contact) or specific detail pages when relevant.`;

    function scrollToBottom() {
        if (!chatBody) return;
        setTimeout(() => { chatBody.scrollTop = chatBody.scrollHeight; }, 50);
    }

    chatHeader.addEventListener('click', (e) => {
        isOpen = !isOpen;
        chatBox.classList.toggle('open', isOpen);
        if (isOpen) scrollToBottom();
    });

    async function sendMessage() {
        if (sendButton.textContent === '■') {
            if (abortController) {
                abortController.abort();
                abortController = null;
            }
            setLoading(false);
            return;
        }

        const input = chatInput.querySelector('input') || chatInput;
        const message = input.value.trim();
        if (!message) return;

        // Check if backend is configured
        if (!BACKEND_URL) {
            appendMessage(message, 'user');
            appendMessage('Please contact the website owner to turn on the server.', 'bot error');
            input.value = '';
            return;
        }

        input.value = '';
        appendMessage(message, 'user');
        
        setLoading(true);
        const thinkingDiv = appendThinkingMessage();
        
        abortController = new AbortController();
        
        try {
            // Call our local/ngrok backend
            const response = await fetch(`${BACKEND_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message }),
                signal: abortController.signal
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error:', errorData);
                throw new Error('Please contact the website owner to turn on the server.');
            }

            const data = await response.json();
            const botResponse = data.response;
            
            // Remove thinking message and append real response
            if (thinkingDiv && thinkingDiv.parentNode) {
                thinkingDiv.parentNode.removeChild(thinkingDiv);
            }
            appendMessage(botResponse, 'bot');
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
                if (thinkingDiv && thinkingDiv.parentNode) {
                    thinkingDiv.parentNode.removeChild(thinkingDiv);
                }
                appendMessage('Message cancelled.', 'bot error');
            } else {
                console.error('Chat error:', error);
                if (thinkingDiv && thinkingDiv.parentNode) {
                    thinkingDiv.parentNode.removeChild(thinkingDiv);
                }
                appendMessage('Please contact the website owner to turn on the server.', 'bot error');
            }
        } finally {
            setLoading(false);
            abortController = null;
        }
    }

    function setLoading(loading) {
        const input = chatInput.querySelector('input') || chatInput;
        if (loading) {
            sendButton.textContent = '■';
            sendButton.classList.add('stop-button');
            // User requested to allow typing during loading
            input.disabled = false; 
        } else {
            sendButton.textContent = 'Send';
            sendButton.classList.remove('stop-button');
            input.disabled = false;
            input.focus();
        }
    }

    function appendThinkingMessage() {
        if (!chatMessages) return null;
        const div = document.createElement('div');
        div.className = 'message bot-message thinking-message';
        div.innerHTML = 'Thinking <span class="thinking-dots"><span>.</span><span>.</span><span>.</span></span>';
        chatMessages.appendChild(div);
        scrollToBottom();
        return div;
    }

    function appendMessage(text, type) {
        if (!chatMessages) return;
        const div = document.createElement('div');
        div.className = `message ${type}-message`;
        div.innerHTML = parseMarkdown(text);
        chatMessages.appendChild(div);
        scrollToBottom();
    }

    if (sendButton) sendButton.addEventListener('click', sendMessage);
    const inputField = chatInput ? (chatInput.querySelector('input') || chatInput) : null;
    if (inputField) {
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});
