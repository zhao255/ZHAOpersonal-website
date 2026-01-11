// Lesson Data
const lessonData = {"id": "c98fbff7", "title": "Pythagorean theorem ", "description": "Learn Pythagorean theorem with different method ", "sections": [{"id": "mk259ue7ysgmj96mzq", "options": [{"content": "", "description": "", "id": "mk259ue71", "label": "Easiest (simple geometry visual prove)", "mediaPath": "", "mediaType": "image", "projectId": "6697fab2", "type": "interactive_project"}, {"content": "", "description": "", "id": "mk259ue72", "label": "Medium difficulty (requires F2 knowledge)", "mediaPath": "", "mediaType": "image", "projectId": "f24e4b8b", "type": "interactive_project"}, {"content": "", "description": "Prove using $Trig$ and $Angles$", "id": "mk2e9fan0b5v22bl1k6", "label": "Most Advanced (Trig Prove)", "mediaPath": "/api/media/library/PythagoreanSimilarTriangles.mp4", "mediaType": "video", "projectId": "", "type": "media"}], "title": "Select a method to prove Pythagorean theorem ", "type": "choice_section"}, {"correctAnswer": 0, "correctFeedback": "Excellent! Using $c = \\sqrt{a^2 + b^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$ cm.", "id": "mjsecy3544dorwmq93d", "incorrectFeedback": "Let's review: The Pythagorean Theorem states $c^2 = a^2 + b^2$. Here, $c^2 = 6^2 + 8^2 = 36 + 64 = 100$, so $c = \\sqrt{100} = 10$ cm.", "options": ["$10$ cm", "$12$ cm", "$14$ cm", "$\\sqrt{28}$ cm"], "question": "A right triangle has legs measuring $6$ cm and $8$ cm. What is the length of the hypotenuse?", "title": "Pythagorean Theorem Applications", "type": "mcq"}, {"correctAnswer": 0, "correctFeedback": "Excellent! You correctly applied the Pythagorean theorem: $c = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$ cm.", "id": "mk0qkqxfzv61kfvnfze", "incorrectFeedback": "Remember the Pythagorean theorem: $c = \\sqrt{a^2 + b^2}$. Calculate $6^2 = 36$, $8^2 = 64$, sum = 100, then $\\sqrt{100} = 10$ cm.", "options": ["$c = 10$ cm", "$c = 14$ cm", "$c = 9$ cm", "$c = 12$ cm"], "question": "A right triangle has legs measuring $a = 6$ cm and $b = 8$ cm. What is the length of the hypotenuse $c$?", "title": "Pythagorean Theorem Applications", "type": "mcq"}], "colors": {"accent": "#667eea", "background": "#1a1a2e", "error": "#ef4444", "success": "#10b981", "text": "#ffffff"}, "createdAt": 1767087638925, "lastModified": 1767692847605};

// Projects Data
const projectsData = {"6697fab2": {"colors": {"accent": "#f59e0b", "background": "#1a1a2e", "sliderThumb": "#f59e0b", "sliderTrack": "#334155"}, "createdAt": 1767673648509, "endTime": 17, "id": "6697fab2", "lastModified": 1767691943327, "projectType": "drag", "sliderHeight": 18, "sliderOrientation": "horizontal", "sliderWidth": 90, "startTime": 3, "title": "Geometry visual proof", "videoSource": "generated/PythagoreanProof.mp4"}, "f24e4b8b": {"colors": {"accent": "#6c5ce7", "background": "#1a1a2e"}, "createdAt": 1767691163477, "finishConfig": {"buttonText": "Finish", "soundCategory": "Finish", "specificSound": "random", "useLatex": false}, "id": "f24e4b8b", "lastModified": 1767691939622, "soundEffects": {"back": [], "finish": [], "pour": [], "show": [], "simplify": []}, "steps": [{"buttonText": "Next", "endTime": 5, "expandPreview": false, "id": "t2zokboni", "label": "New Step", "loadingText": "Loading...", "soundCategory": "none", "specificSound": "random", "startTime": 0, "useLatex": true, "videoSource": "generated/BhaskaraProof.mp4", "videoSpeed": 1}, {"buttonText": "Next", "endTime": 14, "expandPreview": false, "id": "18kh05rsv", "label": "New Step", "loadingText": "Loading...", "soundCategory": "none", "specificSound": "random", "startTime": 5, "useLatex": true, "videoSource": "generated/BhaskaraProof.mp4", "videoSpeed": 1}, {"buttonText": "Next", "endTime": 22, "expandPreview": false, "id": "1oojiql8l", "label": "New Step", "loadingText": "Loading...", "soundCategory": "none", "specificSound": "random", "startTime": 14, "useLatex": true, "videoSource": "generated/BhaskaraProof.mp4", "videoSpeed": 1}, {"buttonText": "Next", "endTime": 31, "expandPreview": false, "id": "qk2llzg51", "label": "New Step", "loadingText": "Loading...", "soundCategory": "none", "specificSound": "random", "startTime": 22, "useLatex": true, "videoSource": "generated/BhaskaraProof.mp4", "videoSpeed": 1}, {"buttonText": "Next", "endTime": 34, "expandPreview": false, "id": "9urxsk4lx", "label": "New Step", "loadingText": "Loading...", "soundCategory": "none", "specificSound": "random", "startTime": 31, "useLatex": true, "videoSource": "generated/BhaskaraProof.mp4", "videoSpeed": 1}, {"buttonText": "Next", "endTime": 39, "expandPreview": false, "id": "znbz437ov", "label": "New Step", "loadingText": "Loading...", "soundCategory": "none", "specificSound": "random", "startTime": 34, "useLatex": true, "videoSource": "generated/BhaskaraProof.mp4", "videoSpeed": 1}, {"buttonText": "Next", "endTime": 46, "expandPreview": false, "id": "7p7ykoc88", "label": "New Step", "loadingText": "Loading...", "soundCategory": "none", "specificSound": "random", "startTime": 39, "useLatex": true, "videoSource": "generated/BhaskaraProof.mp4", "videoSpeed": 1}, {"buttonText": "Next", "endTime": 55, "expandPreview": false, "id": "ehqhbn8ky", "label": "New Step", "loadingText": "Loading...", "soundCategory": "none", "specificSound": "random", "startTime": 46, "useLatex": true, "videoSource": "generated/BhaskaraProof.mp4", "videoSpeed": 1}], "title": "Bhāskara's visual proof", "projectType": "step-by-step"}};

// State
const state = {
    currentSection: 0,
    completedSections: new Set(),
    projectStates: {},  // Track state for each embedded project
    audioObjects: {},
    
    // ==========================================
    // ATTEMPT TRACKING (Internal)
    // This records the number of attempts for each section.
    // ==========================================
    sectionAttempts: {}
};

// Initialize
function init() {
    renderTitle();
    renderSections();
    updateProgress();
    setupScrollListener();
    console.log("Lesson initialized. Internal state tracking active.");
}

function renderTitle() {
    const titleEl = document.getElementById('lessonTitle');
    const descEl = document.getElementById('lessonDescription');
    
    renderLatex(lessonData.title || 'Lesson', titleEl);
    renderLatex(lessonData.description || '', descEl);
}

function renderLatex(text, container) {
    if (!text) {
        container.textContent = '';
        return;
    }
    
    let processedText = text;
    if (!text.includes('$') && (text.includes('\\') || text.includes('{') || text.includes('_') || text.includes('^'))) {
        processedText = '$' + text + '$';
    }
    
    const parts = processedText.split(/(\$[^$]+\$)/g);
    container.innerHTML = '';
    
    parts.forEach(part => {
        if (part.startsWith('$') && part.endsWith('$')) {
            const math = part.slice(1, -1);
            const span = document.createElement('span');
            try {
                katex.render(math, span, { 
                    throwOnError: false, 
                    displayMode: false,
                    trust: true
                });
            } catch (e) {
                span.textContent = math;
            }
            container.appendChild(span);
        } else {
            const span = document.createElement('span');
            span.innerHTML = part.replace(/\n/g, '<br>');
            container.appendChild(span);
        }
    });
}

function renderSections() {
    const container = document.getElementById('sectionsContainer');
    container.innerHTML = '';
    
    lessonData.sections.forEach((section, index) => {
        const sectionEl = createSectionElement(section, index);
        container.appendChild(sectionEl);
        
        // Initialize attempts tracking for this section
        state.sectionAttempts[index] = 0;
    });
    
    updateSectionStates();
}

function createSectionElement(section, index) {
    const div = document.createElement('div');
    div.className = 'section';
    div.id = 'section-' + index;
    div.dataset.index = index;
    
    const header = document.createElement('div');
    header.className = 'section-header';
    header.innerHTML = '<div class="section-number">' + (index + 1) + '</div><h2 class="section-title"></h2>';
    renderLatex(section.title || 'Section ' + (index + 1), header.querySelector('.section-title'));
    div.appendChild(header);
    
    switch (section.type) {
        case 'mcq':
            div.appendChild(createMCQContent(section, index));
            break;
        case 'interactive_project':
            div.appendChild(createProjectContent(section, index));
            break;
        case 'media':
            div.appendChild(createMediaContent(section, index));
            break;
        case 'text':
            div.appendChild(createTextContent(section, index));
            break;
        case 'choice_section':
            div.appendChild(createChoiceContent(section, index));
            break;
    }
    
    return div;
}

function createMCQContent(section, sectionIndex) {
    const container = document.createElement('div');
    container.className = 'mcq-container';
    
    const question = document.createElement('div');
    question.className = 'mcq-question';
    renderLatex(section.question || '', question);
    container.appendChild(question);
    
    const options = document.createElement('div');
    options.className = 'mcq-options';
    
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    (section.options || []).forEach((opt, i) => {
        const optEl = document.createElement('div');
        optEl.className = 'mcq-option';
        optEl.dataset.index = i;
        optEl.innerHTML = '<span class="option-letter">' + letters[i] + '</span><span class="option-text"></span>';
        renderLatex(opt, optEl.querySelector('.option-text'));
        optEl.onclick = () => selectMCQOption(sectionIndex, i);
        options.appendChild(optEl);
    });
    
    container.appendChild(options);
    
    const feedback = document.createElement('div');
    feedback.className = 'mcq-feedback';
    feedback.id = 'feedback-' + sectionIndex;
    container.appendChild(feedback);
    
    return container;
}

function selectMCQOption(sectionIndex, optionIndex) {
    // Record attempt
    state.sectionAttempts[sectionIndex]++;
    console.log(`Section ${sectionIndex} attempts: ${state.sectionAttempts[sectionIndex]}`);
    
    const section = lessonData.sections[sectionIndex];
    const correctIndex = section.correctAnswer;
    const sectionEl = document.getElementById('section-' + sectionIndex);
    const options = sectionEl.querySelectorAll('.mcq-option');
    const feedback = document.getElementById('feedback-' + sectionIndex);
    
    options.forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    options[optionIndex].classList.add('selected');
    
    if (optionIndex === correctIndex) {
        options[optionIndex].classList.add('correct');
        feedback.className = 'mcq-feedback show success';
        renderLatex(section.correctFeedback || 'Correct! Well done.', feedback);
        completeSection(sectionIndex);
    } else {
        options[optionIndex].classList.add('incorrect');
        feedback.className = 'mcq-feedback show error';
        renderLatex(section.incorrectFeedback || 'Not quite. Try again!', feedback);
    }
}

function createProjectContent(section, sectionIndex) {
    const projectId = section.projectId;
    const project = projectsData[projectId];
    
    const wrapper = document.createElement('div');
    wrapper.className = 'project-wrapper';
    
    if (!project) {
        wrapper.textContent = 'Project data not found';
        return wrapper;
    }
    
    // Check if this is a drag-type project
    if (project.projectType === 'drag') {
        return createDragProjectContent(project, sectionIndex);
    }
    
    const container = document.createElement('div');
    container.className = 'project-embed';
    
    const title = document.createElement('div');
    title.className = 'project-title';
    title.textContent = project.title || 'Interactive Project';
    container.appendChild(title);
    
    const video = document.createElement('video');
    video.id = 'video-' + sectionIndex;
    video.src = 'videos/' + projectId + '.mp4';
    video.playsInline = true;
    container.appendChild(video);
    
    const nav = document.createElement('div');
    nav.className = 'project-nav';
    for (let i = 0; i <= project.steps.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'project-dot' + (i === 0 ? ' active' : '');
        dot.id = 'pdot-' + sectionIndex + '-' + i;
        nav.appendChild(dot);
    }
    container.appendChild(nav);
    
    const controls = document.createElement('div');
    controls.className = 'project-controls';
    controls.id = 'controls-' + sectionIndex;
    
    const backBtn = document.createElement('button');
    backBtn.className = 'project-btn project-btn-back';
    backBtn.id = 'backBtn-' + sectionIndex;
    backBtn.innerHTML = '← Back';
    backBtn.style.display = 'none';
    backBtn.onclick = () => goBackProjectStep(sectionIndex);
    controls.appendChild(backBtn);
    
    const loading = document.createElement('div');
    loading.className = 'project-loading';
    loading.id = 'loading-' + sectionIndex;
    loading.textContent = 'Loading...';
    controls.appendChild(loading);
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'project-btn';
    nextBtn.id = 'nextBtn-' + sectionIndex;
    renderLatex(project.steps[0]?.buttonText || 'Start', nextBtn);
    nextBtn.onclick = () => playProjectStep(sectionIndex);
    controls.appendChild(nextBtn);
    
    container.appendChild(controls);
    wrapper.appendChild(container);
    
    const continueBtn = document.createElement('button');
    continueBtn.className = 'project-btn project-btn-continue';
    continueBtn.id = 'continueBtn-' + sectionIndex;
    continueBtn.style.display = 'none';
    continueBtn.style.margin = '1rem auto';
    continueBtn.textContent = 'Continue to Next Section →';
    continueBtn.onclick = () => {
        completeSection(sectionIndex);
    };
    wrapper.appendChild(continueBtn);
    
    state.projectStates[sectionIndex] = {
        projectId: projectId,
        currentStep: 0,
        isPlaying: false,
        completed: false
    };
    
    return wrapper;
}

function createDragProjectContent(project, sectionIndex) {
    const wrapper = document.createElement('div');
    wrapper.className = 'project-wrapper drag-project';
    
    const container = document.createElement('div');
    container.className = 'project-embed';
    container.style.background = project.colors?.background || '#1a1a2e';
    container.style.position = 'relative';
    container.style.borderRadius = '20px';
    container.style.overflow = 'hidden';
    container.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
    
    const title = document.createElement('div');
    title.className = 'project-title';
    title.textContent = project.title || 'Drag Interactive';
    container.appendChild(title);
    
    const videoContainer = document.createElement('div');
    videoContainer.style.position = 'relative';
    videoContainer.style.padding = '1rem';
    videoContainer.style.display = 'flex';
    videoContainer.style.alignItems = 'center';
    videoContainer.style.justifyContent = 'center';
    
    const video = document.createElement('video');
    video.id = 'video-' + sectionIndex;
    video.src = 'videos/' + project.id + '.mp4';
    video.playsInline = true;
    video.muted = true;
    video.preload = 'auto';
    video.style.width = '100%';
    video.style.height = 'auto';
    video.style.borderRadius = '12px';
    video.style.display = 'block';
    videoContainer.appendChild(video);
    
    container.appendChild(videoContainer);
    
    // Slider wrapper for separation (only for horizontal)
    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'drag-slider-wrapper';
    sliderWrapper.style.padding = '1.5rem';
    sliderWrapper.style.background = 'rgba(0,0,0,0.4)';
    sliderWrapper.style.borderTop = '1px solid rgba(255,255,255,0.1)';
    sliderWrapper.style.marginTop = '1rem';
    sliderWrapper.style.borderRadius = '0 0 20px 20px';
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = 'slider-' + sectionIndex;
    slider.className = 'drag-slider';
    slider.step = '0.01';
    
    // Add custom styles for the slider track
    const styleId = 'slider-style-' + sectionIndex;
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        const thumbColor = project.colors?.sliderThumb || '#f59e0b';
        const trackColor = project.colors?.sliderTrack || '#334155';
        style.innerHTML = `
            #slider-${sectionIndex} {
                -webkit-appearance: none;
                background: transparent;
                cursor: grab;
            }
            #slider-${sectionIndex}::-webkit-slider-runnable-track {
                width: 100%;
                height: 12px;
                cursor: pointer;
                background: linear-gradient(to right, ${thumbColor} 0%, ${thumbColor} var(--value, 0%), ${trackColor} var(--value, 0%), ${trackColor} 100%);
                border-radius: 6px;
            }
            #slider-${sectionIndex}::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: ${thumbColor};
                cursor: grab;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                margin-top: -6px;
            }
        `;
        document.head.appendChild(style);
    }
    
    const orientation = project.sliderOrientation || 'horizontal';
    const startTime = project.startTime || 0;
    
    if (orientation === 'vertical') {
        sliderWrapper.style.display = 'none';
        slider.style.position = 'absolute';
        slider.style.right = '1.5rem';
        slider.style.top = '50%';
        slider.style.transform = 'translateY(-50%)';
        slider.style.height = '60%';
        slider.style.width = '12px';
        slider.style.writingMode = 'bt-lr';
        slider.style.appearance = 'slider-vertical';
        videoContainer.appendChild(slider);
    } else {
        slider.style.width = (project.sliderWidth || 90) + '%';
        slider.style.margin = '0 auto';
        slider.style.display = 'block';
        slider.style.height = '12px';
        sliderWrapper.appendChild(slider);
        container.appendChild(sliderWrapper);
    }
    
    slider.style.accentColor = project.colors?.sliderThumb || '#f59e0b';
    wrapper.appendChild(container);
    
    // Continue button
    const continueBtn = document.createElement('button');
    continueBtn.className = 'project-btn project-btn-continue';
    continueBtn.id = 'continue-' + sectionIndex;
    continueBtn.style.margin = '1.5rem auto';
    continueBtn.style.display = 'block';
    continueBtn.style.opacity = '0.5';
    continueBtn.style.cursor = 'not-allowed';
    continueBtn.disabled = true;
    continueBtn.textContent = 'Explore to Continue →';
    continueBtn.onclick = () => completeSection(sectionIndex);
    wrapper.appendChild(continueBtn);
    
    let hasReachedEnd = false;
    
    const updateProgress = (val) => {
        const min = parseFloat(slider.min) || 0;
        const max = parseFloat(slider.max) || 100;
        const percent = ((val - min) / (max - min) * 100) + '%';
        slider.style.setProperty('--value', percent);
    };
    
    video.addEventListener('loadedmetadata', () => {
        const actualEndTime = project.endTime || video.duration;
        slider.min = startTime;
        slider.max = actualEndTime;
        slider.value = startTime;
        video.currentTime = startTime;
        updateProgress(startTime);
    });
    
    let rafId = null;
    slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (rafId) cancelAnimationFrame(rafId);
        
        rafId = requestAnimationFrame(() => {
            video.currentTime = val;
            updateProgress(val);
            
            const actualEndTime = project.endTime || video.duration;
            if (val >= actualEndTime - 0.5 && !hasReachedEnd) {
                hasReachedEnd = true;
                continueBtn.style.opacity = '1';
                continueBtn.style.cursor = 'pointer';
                continueBtn.disabled = false;
                continueBtn.textContent = 'Continue to Next Section →';
                continueBtn.style.background = 'var(--success)';
            }
            rafId = null;
        });
    });
    
    return wrapper;
}

function formatDragTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + secs.toString().padStart(2, '0');
}

function playProjectStep(sectionIndex) {
    const ps = state.projectStates[sectionIndex];
    const project = projectsData[ps.projectId];
    if (ps.isPlaying || !project || ps.completed) return;
    
    const video = document.getElementById('video-' + sectionIndex);
    const loading = document.getElementById('loading-' + sectionIndex);
    const nextBtn = document.getElementById('nextBtn-' + sectionIndex);
    const backBtn = document.getElementById('backBtn-' + sectionIndex);
    
    const currentStep = project.steps[ps.currentStep];
    const startTime = currentStep.startTime || 0;
    const endTime = currentStep.endTime || 0;
    
    ps.isPlaying = true;
    loading.classList.add('show');
    nextBtn.style.display = 'none';
    backBtn.style.display = 'none';
    
    video.currentTime = startTime;
    
    const soundCat = currentStep.soundCategory || 'none';
    if (soundCat !== 'none') {
        const specific = currentStep.specificSound;
        let soundUrl = '';
        if (specific && specific !== 'random') {
            soundUrl = 'sounds/' + soundCat + '/' + specific.split('/').pop();
        }
        if (soundUrl) {
            const soundObj = new Audio(soundUrl);
            state.audioObjects[sectionIndex] = soundObj;
            soundObj.play().catch(e => console.log("Audio play blocked"));
        }
    }
    
    video.play();
    
    const checkEnd = setInterval(() => {
        if (video.currentTime >= endTime) {
            video.pause();
            ps.isPlaying = false;
            ps.currentStep++;
            loading.classList.remove('show');
            nextBtn.style.display = 'flex';
            
            if (ps.currentStep >= project.steps.length) {
                ps.completed = true;
            }
            
            updateProjectUI(sectionIndex);
            clearInterval(checkEnd);
        }
    }, 100);
}

function goBackProjectStep(sectionIndex) {
    const ps = state.projectStates[sectionIndex];
    if (ps.currentStep > 0 && !ps.isPlaying) {
        ps.currentStep--;
        updateProjectUI(sectionIndex);
        const project = projectsData[ps.projectId];
        const video = document.getElementById('video-' + sectionIndex);
        video.currentTime = project.steps[ps.currentStep].startTime || 0;
        video.pause();
    }
}

function updateProjectUI(sectionIndex) {
    const ps = state.projectStates[sectionIndex];
    const project = projectsData[ps.projectId];
    const totalSteps = project.steps.length;
    
    const backBtn = document.getElementById('backBtn-' + sectionIndex);
    const nextBtn = document.getElementById('nextBtn-' + sectionIndex);
    const continueBtn = document.getElementById('continueBtn-' + sectionIndex);
    
    for (let i = 0; i <= totalSteps; i++) {
        const dot = document.getElementById('pdot-' + sectionIndex + '-' + i);
        if (dot) {
            dot.classList.remove('active', 'completed');
            if (i === ps.currentStep) dot.classList.add('active');
            if (i < ps.currentStep) dot.classList.add('completed');
        }
    }
    
    backBtn.style.display = ps.currentStep > 0 ? 'flex' : 'none';
    
    if (ps.completed) {
        nextBtn.textContent = 'Completed ✓';
        nextBtn.disabled = true;
        continueBtn.style.display = 'block';
    } else {
        const step = project.steps[ps.currentStep];
        nextBtn.innerHTML = '';
        renderLatex(step?.buttonText || 'Continue', nextBtn);
        nextBtn.disabled = false;
    }
}

function createMediaContent(section, index) {
    const container = document.createElement('div');
    container.className = 'media-container';
    
    if (section.mediaType === 'image') {
        const img = document.createElement('img');
        img.src = 'media/' + section.mediaPath.split('/').pop();
        container.appendChild(img);
    } else {
        const video = document.createElement('video');
        video.src = 'media/' + section.mediaPath.split('/').pop();
        video.controls = true;
        container.appendChild(video);
    }
    
    const desc = document.createElement('div');
    desc.className = 'media-description';
    renderLatex(section.description || '', desc);
    container.appendChild(desc);
    
    const btn = document.createElement('button');
    btn.className = 'project-btn project-btn-continue';
    btn.style.margin = '1rem auto';
    btn.textContent = 'Continue';
    btn.onclick = () => completeSection(index);
    container.appendChild(btn);
    
    return container;
}

function createTextContent(section, index) {
    const container = document.createElement('div');
    container.className = 'text-content';
    renderLatex(section.content || '', container);
    
    const btn = document.createElement('button');
    btn.className = 'project-btn project-btn-continue';
    btn.style.margin = '1rem auto';
    btn.textContent = 'Continue';
    btn.onclick = () => completeSection(index);
    container.appendChild(btn);
    
    return container;
}

function createChoiceContent(section, sectionIndex) {
    const container = document.createElement('div');
    container.className = 'choice-section-container';
    container.id = 'choice-container-' + sectionIndex;
    
    renderChoiceGrid(section, sectionIndex, container);
    
    return container;
}

function renderChoiceGrid(section, sectionIndex, container) {
    container.innerHTML = '';
    
    const grid = document.createElement('div');
    grid.className = 'choice-grid';
    
    section.options.forEach((opt, optIndex) => {
        const card = document.createElement('div');
        card.className = 'choice-card';
        
        let icon = 'fa-play-circle';
        if (opt.type === 'media') icon = opt.mediaType === 'video' ? 'fa-video' : 'fa-image';
        if (opt.type === 'text') icon = 'fa-paragraph';
        
        card.innerHTML = `
            <i class="fas ${icon}"></i>
            <div class="choice-label"></div>
            <div class="choice-type">${opt.type.replace('_', ' ')}</div>
        `;
        
        renderLatex(opt.label || `Method ${optIndex + 1}`, card.querySelector('.choice-label'));
        
        card.onclick = () => selectChoice(section, sectionIndex, optIndex, container);
        grid.appendChild(card);
    });
    
    container.appendChild(grid);
}

function selectChoice(section, sectionIndex, optIndex, container) {
    const opt = section.options[optIndex];
    container.innerHTML = '';
    
    const header = document.createElement('div');
    header.className = 'choice-header';
    header.innerHTML = '<div class="choice-label"></div>';
    renderLatex(opt.label || `Method ${optIndex + 1}`, header.querySelector('.choice-label'));
    
    const changeBtn = document.createElement('button');
    changeBtn.className = 'change-choice-btn';
    changeBtn.innerHTML = '<i class="fas fa-sync"></i> Change Method';
    changeBtn.onclick = () => renderChoiceGrid(section, sectionIndex, container);
    header.appendChild(changeBtn);
    
    container.appendChild(header);
    
    const contentArea = document.createElement('div');
    contentArea.className = 'choice-option-content';
    
    if (opt.type === 'interactive_project') {
        // Logic for project - slightly different because we need to setup state
        state.projectStates[sectionIndex] = {
            projectId: opt.projectId,
            currentStep: 0,
            isPlaying: false,
            completed: false
        };
        
        const projectSection = { 
            type: 'interactive_project', 
            projectId: opt.projectId 
        };
        contentArea.appendChild(createProjectContent(projectSection, sectionIndex));
    } else if (opt.type === 'media') {
        const mediaSection = {
            type: 'media',
            mediaType: opt.mediaType,
            mediaPath: opt.mediaPath,
            description: opt.description
        };
        contentArea.appendChild(createMediaContent(mediaSection, sectionIndex));
    } else if (opt.type === 'text') {
        const textSection = {
            type: 'text',
            content: opt.content
        };
        contentArea.appendChild(createTextContent(textSection, sectionIndex));
    }
    
    container.appendChild(contentArea);
}

function completeSection(index) {
    state.completedSections.add(index);
    updateSectionStates();
    updateProgress();
    
    if (index + 1 < lessonData.sections.length) {
        const nextSection = document.getElementById('section-' + (index + 1));
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function updateSectionStates() {
    lessonData.sections.forEach((_, index) => {
        const el = document.getElementById('section-' + index);
        el.classList.remove('active', 'completed', 'locked');
        
        if (state.completedSections.has(index)) {
            el.classList.add('completed');
        } else if (isSectionLocked(index)) {
            el.classList.add('locked');
        } else {
            el.classList.add('active');
        }
    });
}

function isSectionLocked(index) {
    if (index === 0) return false;
    return !state.completedSections.has(index - 1);
}

function updateProgress() {
    const progress = (state.completedSections.size / lessonData.sections.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function setupScrollListener() {
    const scrollBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) scrollBtn.classList.add('show');
        else scrollBtn.classList.remove('show');
    });
}

window.onload = init;
