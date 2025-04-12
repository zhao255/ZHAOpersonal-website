// Theme Switching
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Check if user has a theme preference saved
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }
});

// Navigation
const sections = ['latex-editor', 'document-analysis', 'pdf-tools'];
const navButtons = ['latex-editor-btn', 'document-analysis-btn', 'pdf-tools-btn'];

navButtons.forEach((btnId, index) => {
    document.getElementById(btnId).addEventListener('click', () => {
        // Hide all sections
        sections.forEach(section => {
            document.getElementById(section).classList.remove('active');
        });
        
        // Show the selected section
        document.getElementById(sections[index]).classList.add('active');
        
        // Save the active section to localStorage
        localStorage.setItem('activeSection', sections[index]);
    });
});

// Restore last active section
document.addEventListener('DOMContentLoaded', () => {
    const activeSection = localStorage.getItem('activeSection');
    if (activeSection && sections.includes(activeSection)) {
        sections.forEach(section => {
            document.getElementById(section).classList.remove('active');
        });
        document.getElementById(activeSection).classList.add('active');
    }
});

// LaTeX Editor
const latexInput = document.getElementById('latex-input');
const latexPreview = document.getElementById('latex-preview');

// Function to update the LaTeX preview
function updateLatexPreview() {
    const latex = latexInput.value;
    latexPreview.innerHTML = '$$' + latex + '$$';
    MathJax.typeset([latexPreview]);
}

latexInput.addEventListener('input', updateLatexPreview);

// Clear LaTeX editor inputs
document.getElementById('clear-latex').addEventListener('click', () => {
    latexInput.value = '';
    document.getElementById('equation-input').value = '';
    updateLatexPreview();
});

// LaTeX shortcuts
const shortcutButtons = document.querySelectorAll('.shortcut-btn');
shortcutButtons.forEach(button => {
    button.addEventListener('click', () => {
        const latex = button.getAttribute('data-latex');
        const start = latexInput.selectionStart;
        const end = latexInput.selectionEnd;
        const text = latexInput.value;
        
        latexInput.value = text.substring(0, start) + latex + text.substring(end);
        latexInput.focus();
        latexInput.selectionStart = latexInput.selectionEnd = start + latex.length;
        
        updateLatexPreview();
    });
});

// ... existing code ...

// Document Analysis & Citation Counter
document.getElementById('analyze-document').addEventListener('click', () => {
    const text = document.getElementById('document-text').value;
    const includeEquations = document.getElementById('include-equations').checked;
    const includeCitations = document.getElementById('include-citations').checked;
    
    if (!text.trim()) {
        alert('Please enter or upload a document first.');
        return;
    }
    
    // ... existing code ...
});

// Clear document analysis inputs
document.getElementById('clear-document').addEventListener('click', () => {
    document.getElementById('document-text').value = '';
    document.getElementById('include-equations').checked = false;
    document.getElementById('include-citations').checked = false;
    document.getElementById('analysis-results').innerHTML = '<p>Analysis results will appear here...</p>';
    document.getElementById('analysis-chart').innerHTML = '<p>Analysis chart will appear here...</p>';
    document.getElementById('equations-content').innerHTML = '<p>No equations found yet.</p>';
});

// Handle file upload for document analysis
document.getElementById('document-file').addEventListener('change', async (e) => {
    // ... existing code ...
});

// Simple Calculator
const calculatorInput = document.getElementById('calculator-input');
const calculatorButtons = document.querySelectorAll('.calculator-btn');

let currentValue = '';

calculatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        if (value === 'C') {
            currentValue = '';
            calculatorInput.value = '0';
        } else if (value === '=') {
            try {
                currentValue = eval(currentValue).toString();
            } catch (e) {
                currentValue = 'Error';
            }
        } else {
            currentValue += value;
        }
        
        if (currentValue) {
            calculatorInput.value = currentValue;
        }
    });
});

// PDF Tools - Enhanced functionality

// PDF.js initialization
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.worker.min.js';

// Image to PDF
document.getElementById('image-to-pdf-input').addEventListener('change', (e) => {
    // ... existing code ...
});

// Clear image to PDF inputs
document.getElementById('clear-image-to-pdf').addEventListener('click', () => {
    document.getElementById('image-to-pdf-input').value = '';
    document.getElementById('image-to-pdf-preview').innerHTML = '<p>Select images to preview</p>';
});

// Convert images to PDF
document.getElementById('convert-image-to-pdf').addEventListener('click', async () => {
    // ... existing code ...
});

// Append Image to PDF
document.getElementById('pdf-input').addEventListener('change', (e) => {
    updateAppendPreview();
});

document.getElementById('append-image-input').addEventListener('change', (e) => {
    updateAppendPreview();
});

// Clear append PDF inputs
document.getElementById('clear-append-pdf').addEventListener('click', () => {
    document.getElementById('pdf-input').value = '';
    document.getElementById('append-image-input').value = '';
    document.getElementById('append-preview').innerHTML = '<p>Select files to preview</p>';
});

function updateAppendPreview() {
    // ... existing code ...
}

// ... existing code ...

// Split PDF
document.getElementById('split-pdf-input').addEventListener('change', async (e) => {
    // ... existing code ...
});

// Clear split PDF inputs
document.getElementById('clear-split-pdf').addEventListener('click', () => {
    document.getElementById('split-pdf-input').value = '';
    document.getElementById('split-pages').value = '';
    document.getElementById('split-preview').innerHTML = '<p>Select a PDF to preview</p>';
});

// Split PDF functionality
document.getElementById('split-pdf').addEventListener('click', async () => {
    // ... existing code ...
});

// Merge PDFs
document.getElementById('merge-pdf-input').addEventListener('change', (e) => {
    // ... existing code ...
});

// Clear merge PDFs inputs
document.getElementById('clear-merge-pdf').addEventListener('click', () => {
    document.getElementById('merge-pdf-input').value = '';
    document.getElementById('merge-preview').innerHTML = '<p>Select PDFs to preview</p>';
});

// Merge PDFs functionality
document.getElementById('merge-pdfs').addEventListener('click', async () => {
    // ... existing code ...
});

// Sign PDF - Canvas setup
const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
let isDrawing = false;

// ... existing code ...

// Extract Text from PDF
document.getElementById('extract-pdf-input').addEventListener('change', (e) => {
    // ... existing code ...
});

// Clear extract PDF inputs
document.getElementById('clear-extract-pdf').addEventListener('click', () => {
    document.getElementById('extract-pdf-input').value = '';
    document.getElementById('extract-preview').innerHTML = '<p>Select a PDF to extract text</p>';
});

// Extract text from PDF
document.getElementById('extract-text').addEventListener('click', async () => {
    // ... existing code ...
});

// Initial MathJax typesetting
MathJax.typeset();
