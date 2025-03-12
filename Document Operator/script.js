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

// Convert regular equation to LaTeX
document.getElementById('convert-equation').addEventListener('click', () => {
    const equation = document.getElementById('equation-input').value;
    
    if (!equation.trim()) {
        alert('Please enter an equation first.');
        return;
    }
    
    // Improved equation conversion logic
    let latex = equation;
    
    // Handle square roots
    latex = latex.replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}');
    latex = latex.replace(/√\(([^)]+)\)/g, '\\sqrt{$1}');
    latex = latex.replace(/√([a-zA-Z0-9]+)/g, '\\sqrt{$1}');
    
    // Handle fractions
    latex = latex.replace(/(\w+)\/(\w+)/g, '\\frac{$1}{$2}');
    
    // Handle exponents
    latex = latex.replace(/\^(\d+)/g, '^{$1}');
    latex = latex.replace(/(\w+)\^{(\w+)}/g, '{$1}^{$2}');
    
    // Handle trigonometric functions
    latex = latex.replace(/sin\(/g, '\\sin(');
    latex = latex.replace(/cos\(/g, '\\cos(');
    latex = latex.replace(/tan\(/g, '\\tan(');
    
    // Handle logarithms
    latex = latex.replace(/log/g, '\\log');
    latex = latex.replace(/ln/g, '\\ln');
    
    // Handle special symbols
    latex = latex.replace(/infinity/g, '\\infty');
    latex = latex.replace(/inf/g, '\\infty');
    
    latexInput.value = latex;
    updateLatexPreview();
});

// Document Analysis & Citation Counter
document.getElementById('analyze-document').addEventListener('click', () => {
    const text = document.getElementById('document-text').value;
    const includeEquations = document.getElementById('include-equations').checked;
    const includeCitations = document.getElementById('include-citations').checked;
    
    if (!text.trim()) {
        alert('Please enter or upload a document first.');
        return;
    }
    
    // Find equations (assuming they're inside $ $ or $$ $$ delimiters)
    const inlineEquationRegex = /\$([^$]+)\$/g;
    const displayEquationRegex = /\$\$([^$]+)\$\$/g;
    
    const inlineEquations = [...text.matchAll(inlineEquationRegex)].map(match => match[1]);
    const displayEquations = [...text.matchAll(displayEquationRegex)].map(match => match[1]);
    const allEquations = [...inlineEquations, ...displayEquations];
    
    // Find citations (assuming APA format - (Author, Year))
    const citationRegex = /\([A-Za-z]+(?:\s*&\s*[A-Za-z]+)?,\s*\d{4}\)/g;
    const citations = [...text.matchAll(citationRegex)].map(match => match[0]);
    
    // Calculate word count (excluding equations and citations if specified)
    let processedText = text;
    
    if (!includeEquations) {
        processedText = processedText.replace(inlineEquationRegex, ' ').replace(displayEquationRegex, ' ');
    }
    
    if (!includeCitations) {
        processedText = processedText.replace(citationRegex, ' ');
    }
    
    // Count words, sentences, and punctuation
    const words = processedText.match(/\b\w+\b/g) || [];
    const sentences = processedText.match(/[^.!?]+[.!?]+/g) || [];
    const punctuation = processedText.match(/[.,;:!?]/g) || [];
    
    // Display results
    const resultsDiv = document.getElementById('analysis-results');
    resultsDiv.innerHTML = `
        <h3>Document Analysis Results</h3>
        <p><strong>Word Count:</strong> ${words.length}</p>
        <p><strong>Sentence Count:</strong> ${sentences.length}</p>
        <p><strong>Equation Count:</strong> ${allEquations.length}</p>
        <p><strong>Citation Count:</strong> ${citations.length}</p>
        <p><strong>Punctuation Count:</strong> ${punctuation.length}</p>
    `;
    
    // Display equations found
    const equationsDiv = document.getElementById('equations-content');
    if (allEquations.length > 0) {
        let equationsHtml = '';
        allEquations.forEach((eq, index) => {
            equationsHtml += `
                <div class="equation-item">
                    <p><strong>Equation ${index + 1}:</strong></p>
                    <p>$${eq}$</p>
                </div>
            `;
        });
        equationsDiv.innerHTML = equationsHtml;
        MathJax.typeset([equationsDiv]);
    } else {
        equationsDiv.innerHTML = '<p>No equations found in the document.</p>';
    }
    
    // Create a table instead of a chart
    const chartDiv = document.getElementById('analysis-chart');
    chartDiv.innerHTML = `
        <h3>Document Analysis Table</h3>
        <table class="analysis-table">
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Count</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Words</td>
                    <td>${words.length}</td>
                    <td>100%</td>
                </tr>
                <tr>
                    <td>Sentences</td>
                    <td>${sentences.length}</td>
                    <td>${((sentences.length / Math.max(words.length, 1)) * 100).toFixed(2)}%</td>
                </tr>
                <tr>
                    <td>Equations</td>
                    <td>${allEquations.length}</td>
                    <td>${((allEquations.length / Math.max(words.length, 1)) * 100).toFixed(2)}%</td>
                </tr>
                <tr>
                    <td>Citations</td>
                    <td>${citations.length}</td>
                    <td>${((citations.length / Math.max(words.length, 1)) * 100).toFixed(2)}%</td>
                </tr>
                <tr>
                    <td>Punctuation</td>
                    <td>${punctuation.length}</td>
                    <td>${((punctuation.length / Math.max(words.length, 1)) * 100).toFixed(2)}%</td>
                </tr>
            </tbody>
        </table>
    `;
});

// Handle file upload for document analysis
document.getElementById('document-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    if (file.type === 'application/pdf') {
        const pdfData = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({data: pdfData});
        
        try {
            const pdf = await loadingTask.promise;
            let fullText = '';
            
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n';
            }
            
            document.getElementById('document-text').value = fullText;
        } catch (error) {
            console.error('Error loading PDF:', error);
            alert('Error loading PDF. Please try a different file.');
        }
    } else {
        // For text files
        reader.onload = (event) => {
            document.getElementById('document-text').value = event.target.result;
        };
        reader.readAsText(file);
    }
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
    const files = e.target.files;
    const preview = document.getElementById('image-to-pdf-preview');
    
    if (files.length > 0) {
        preview.innerHTML = '';
        
        for (let i = 0; i < Math.min(files.length, 3); i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100px';
                img.style.margin = '5px';
                preview.appendChild(img);
            }
        }
        
        if (files.length > 3) {
            const p = document.createElement('p');
            p.textContent = `...and ${files.length - 3} more images`;
            preview.appendChild(p);
        }
    } else {
        preview.innerHTML = '<p>Select images to preview</p>';
    }
});

// Convert images to PDF
document.getElementById('convert-image-to-pdf').addEventListener('click', async () => {
    const files = document.getElementById('image-to-pdf-input').files;
    
    if (files.length === 0) {
        alert('Please select at least one image to convert.');
        return;
    }
    
    try {
        // Create a new jsPDF instance
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        let processedImages = 0;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) continue;
            
            // Create a new page for each image after the first
            if (processedImages > 0) {
                doc.addPage();
            }
            
            // Convert image to data URL
            const imgData = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
            
            // Add image to PDF
            const img = new Image();
            await new Promise((resolve) => {
                img.onload = resolve;
                img.src = imgData;
            });
            
            // Calculate dimensions to fit the page
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            
            const imgWidth = img.width;
            const imgHeight = img.height;
            
            let finalWidth, finalHeight;
            
            if (imgWidth / imgHeight > pageWidth / pageHeight) {
                // Image is wider than the page ratio
                finalWidth = pageWidth - 20; // 10px margin on each side
                finalHeight = (imgHeight * finalWidth) / imgWidth;
            } else {
                // Image is taller than the page ratio
                finalHeight = pageHeight - 20; // 10px margin on each side
                finalWidth = (imgWidth * finalHeight) / imgHeight;
            }
            
            doc.addImage(
                imgData,
                'JPEG',
                10, // x position
                10, // y position
                finalWidth,
                finalHeight
            );
            
            processedImages++;
        }
        
        // Save the PDF
        if (processedImages > 0) {
            doc.save('converted_images.pdf');
        } else {
            alert('No valid images found to convert.');
        }
    } catch (error) {
        console.error('Error creating PDF:', error);
        alert('Error creating PDF. Please try again.');
    }
});

// Append Image to PDF
document.getElementById('pdf-input').addEventListener('change', (e) => {
    updateAppendPreview();
});

document.getElementById('append-image-input').addEventListener('change', (e) => {
    updateAppendPreview();
});

function updateAppendPreview() {
    const pdfFile = document.getElementById('pdf-input').files[0];
    const imageFiles = document.getElementById('append-image-input').files;
    const preview = document.getElementById('append-preview');
    
    preview.innerHTML = '';
    
    if (pdfFile) {
        const pdfInfo = document.createElement('p');
        pdfInfo.textContent = `PDF: ${pdfFile.name}`;
        preview.appendChild(pdfInfo);
    }
    
    if (imageFiles.length > 0) {
        const imagesInfo = document.createElement('p');
        imagesInfo.textContent = `Images: ${imageFiles.length} selected`;
        preview.appendChild(imagesInfo);
        
        for (let i = 0; i < Math.min(imageFiles.length, 2); i++) {
            const file = imageFiles[i];
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.style.maxWidth = '100%';
                img.style.maxHeight = '80px';
                img.style.margin = '5px';
                preview.appendChild(img);
            }
        }
        
        if (imageFiles.length > 2) {
            const p = document.createElement('p');
            p.textContent = `...and ${imageFiles.length - 2} more images`;
            preview.appendChild(p);
        }
    }
    
    if (!pdfFile && imageFiles.length === 0) {
        preview.innerHTML = '<p>Select files to preview</p>';
    }
}

// Append images to PDF
document.getElementById('append-image-to-pdf').addEventListener('click', async () => {
    const pdfFile = document.getElementById('pdf-input').files[0];
    const imageFiles = document.getElementById('append-image-input').files;
    
    if (!pdfFile) {
        alert('Please select a PDF file.');
        return;
    }
    
    if (imageFiles.length === 0) {
        alert('Please select at least one image to append.');
        return;
    }
    
    try {
        // Load the existing PDF
        const pdfData = await pdfFile.arrayBuffer();
        const { PDFDocument } = PDFLib;
        const pdfDoc = await PDFDocument.load(pdfData);
        
        // Process each image
        for (let i = 0; i < imageFiles.length; i++) {
            const file = imageFiles[i];
            if (!file.type.startsWith('image/')) continue;
            
            // Read image data
            const imageData = await file.arrayBuffer();
            
            // Determine image type and embed accordingly
            let image;
            if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                image = await pdfDoc.embedJpg(imageData);
            } else if (file.type === 'image/png') {
                image = await pdfDoc.embedPng(imageData);
            } else {
                continue; // Skip unsupported image types
            }
            
            // Add a new page for the image
            const page = pdfDoc.addPage();
            const { width, height } = page.getSize();
            
            // Calculate dimensions to fit the page
            const imgWidth = image.width;
            const imgHeight = image.height;
            
            let finalWidth, finalHeight;
            
            if (imgWidth / imgHeight > width / height) {
                // Image is wider than the page ratio
                finalWidth = width - 50; // 25 margin on each side
                finalHeight = (imgHeight * finalWidth) / imgWidth;
            } else {
                // Image is taller than the page ratio
                finalHeight = height - 50; // 25 margin on each side
                finalWidth = (imgWidth * finalHeight) / imgHeight;
            }
            
            // Draw the image on the page
            page.drawImage(image, {
                x: (width - finalWidth) / 2,
                y: (height - finalHeight) / 2,
                width: finalWidth,
                height: finalHeight,
            });
        }
        
        // Save the PDF
        const modifiedPdfData = await pdfDoc.save();
        const blob = new Blob([modifiedPdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'pdf_with_images.pdf';
        downloadLink.click();
        
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error appending images to PDF:', error);
        alert('Error appending images to PDF. Please try again.');
    }
});

// Split PDF
document.getElementById('split-pdf-input').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const preview = document.getElementById('split-preview');
    
    if (file) {
        try {
            const pdfData = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({data: pdfData});
            const pdf = await loadingTask.promise;
            
            preview.innerHTML = `
                <p>PDF: ${file.name}</p>
                <p>Total pages: ${pdf.numPages}</p>
                <p>Enter page ranges to split (e.g., 1-3,5,7-9)</p>
            `;
        } catch (error) {
            console.error('Error loading PDF:', error);
            preview.innerHTML = '<p>Error loading PDF. Please try a different file.</p>';
        }
    } else {
        preview.innerHTML = '<p>Select a PDF to preview</p>';
    }
});

// Split PDF functionality
document.getElementById('split-pdf').addEventListener('click', async () => {
    const file = document.getElementById('split-pdf-input').files[0];
    const pagesInput = document.getElementById('split-pages').value.trim();
    
    if (!file) {
        alert('Please select a PDF file to split.');
        return;
    }
    
    if (!pagesInput) {
        alert('Please enter page ranges to split the PDF.');
        return;
    }
    
    try {
        // Parse page ranges (e.g., "1-3,5,7-9")
        const pageRanges = [];
        const parts = pagesInput.split(',');
        
        for (const part of parts) {
            if (part.includes('-')) {
                const [start, end] = part.split('-').map(num => parseInt(num.trim(), 10));
                if (isNaN(start) || isNaN(end) || start < 1 || end < start) {
                    throw new Error(`Invalid page range: ${part}`);
                }
                pageRanges.push({ start, end });
            } else {
                const page = parseInt(part.trim(), 10);
                if (isNaN(page) || page < 1) {
                    throw new Error(`Invalid page number: ${part}`);
                }
                pageRanges.push({ start: page, end: page });
            }
        }
        
        // Load the PDF
        const pdfData = await file.arrayBuffer();
        const { PDFDocument } = PDFLib;
        const pdfDoc = await PDFDocument.load(pdfData);
        
        // Create a new PDF for each range
        for (let i = 0; i < pageRanges.length; i++) {
            const { start, end } = pageRanges[i];
            
            // Check if range is valid
            if (end > pdfDoc.getPageCount()) {
                alert(`Warning: Page range ${start}-${end} exceeds the document's page count (${pdfDoc.getPageCount()}).`);
                continue;
            }
            
            // Create a new document
            const newPdfDoc = await PDFDocument.create();
            
            // Copy pages from the original document (PDFLib uses 0-based indexing)
            const pagesToCopy = [];
            for (let j = start - 1; j <= end - 1; j++) {
                pagesToCopy.push(j);
            }
            
            const copiedPages = await newPdfDoc.copyPages(pdfDoc, pagesToCopy);
            copiedPages.forEach(page => newPdfDoc.addPage(page));
            
            // Save the new PDF
            const newPdfBytes = await newPdfDoc.save();
            const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            // Create download link
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `split_${start}-${end}.pdf`;
            downloadLink.click();
            
            URL.revokeObjectURL(url);
        }
    } catch (error) {
        console.error('Error splitting PDF:', error);
        alert(`Error splitting PDF: ${error.message}`);
    }
});

// Merge PDFs
document.getElementById('merge-pdf-input').addEventListener('change', (e) => {
    const files = e.target.files;
    const preview = document.getElementById('merge-preview');
    
    if (files.length > 0) {
        preview.innerHTML = `<p>Selected ${files.length} PDF files:</p>`;
        
        for (let i = 0; i < Math.min(files.length, 5); i++) {
            const p = document.createElement('p');
            p.textContent = `${i+1}. ${files[i].name}`;
            preview.appendChild(p);
        }
        
        if (files.length > 5) {
            const p = document.createElement('p');
            p.textContent = `...and ${files.length - 5} more PDFs`;
            preview.appendChild(p);
        }
    } else {
        preview.innerHTML = '<p>Select PDFs to preview</p>';
    }
});

// Merge PDFs functionality
document.getElementById('merge-pdfs').addEventListener('click', async () => {
    const files = document.getElementById('merge-pdf-input').files;
    
    if (files.length < 2) {
        alert('Please select at least two PDF files to merge.');
        return;
    }
    
    try {
        // Create a new PDF document
        const { PDFDocument } = PDFLib;
        const mergedPdf = await PDFDocument.create();
        
        // Process each PDF file
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Read PDF data
            const pdfData = await file.arrayBuffer();
            
            // Load PDF document
            const pdfDoc = await PDFDocument.load(pdfData);
            
            // Copy all pages from the current PDF
            const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            
            // Add each copied page to the merged PDF
            pages.forEach(page => mergedPdf.addPage(page));
        }
        
        // Save the merged PDF
        const mergedPdfData = await mergedPdf.save();
        const blob = new Blob([mergedPdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'merged.pdf';
        downloadLink.click();
        
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error merging PDFs:', error);
        alert('Error merging PDFs. Please try again.');
    }
});

// Sign PDF - Canvas setup
const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
let isDrawing = false;

// Set canvas size
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Drawing functions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch support
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrawing(e.touches[0]);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e.touches[0]);
});

canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(e) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    
    ctx.lineTo(x, y);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

// Clear signature
document.getElementById('clear-signature').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Sign PDF functionality
document.getElementById('sign-pdf').addEventListener('click', async () => {
    const file = document.getElementById('sign-pdf-input').files[0];
    const preview = document.getElementById('sign-preview');
    
    if (!file) {
        alert('Please select a PDF file to sign.');
        return;
    }
    
    // Get signature as data URL
    const signatureImage = canvas.toDataURL('image/png');
    
    // Check if signature is empty
    const emptyCanvas = document.createElement('canvas');
    emptyCanvas.width = canvas.width;
    emptyCanvas.height = canvas.height;
    if (signatureImage === emptyCanvas.toDataURL('image/png')) {
        alert('Please draw a signature first.');
        return;
    }
    
    try {
        // Load the PDF
        const pdfData = await file.arrayBuffer();
        const { PDFDocument } = PDFLib;
        const pdfDoc = await PDFDocument.load(pdfData);
        
        // Convert signature to bytes and embed it
        const signatureBytes = await fetch(signatureImage).then(res => res.arrayBuffer());
        const signature = await pdfDoc.embedPng(signatureBytes);
        
        // Add signature to the last page
        const pages = pdfDoc.getPages();
        const lastPage = pages[pages.length - 1];
        const { width, height } = lastPage.getSize();
        
        // Calculate signature size and position
        const signatureWidth = 150;
        const signatureHeight = (signature.height * signatureWidth) / signature.width;
        const signatureX = width - signatureWidth - 50;
        const signatureY = 50;
        
        // Draw the signature
        lastPage.drawImage(signature, {
            x: signatureX,
            y: signatureY,
            width: signatureWidth,
            height: signatureHeight,
        });
        
        // Save the signed PDF
        const signedPdfData = await pdfDoc.save();
        const blob = new Blob([signedPdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        // Update preview
        preview.innerHTML = `
            <p>PDF successfully signed!</p>
            <p><a href="${url}" download="signed_${file.name}" class="file-label">Download Signed PDF</a></p>
            <iframe src="${url}" style="width: 100%; height: 200px; border: none;"></iframe>
        `;
    } catch (error) {
        console.error('Error signing PDF:', error);
        alert('Error signing PDF. Please try again.');
    }
});

// Extract Text from PDF
document.getElementById('extract-pdf-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const preview = document.getElementById('extract-preview');
    
    if (file) {
        preview.innerHTML = `<p>PDF: ${file.name}</p><p>Click Extract to process the PDF.</p>`;
    } else {
        preview.innerHTML = '<p>Select a PDF to extract text</p>';
    }
});

// Extract text from PDF
document.getElementById('extract-text').addEventListener('click', async () => {
    const file = document.getElementById('extract-pdf-input').files[0];
    const preview = document.getElementById('extract-preview');
    
    if (!file) {
        alert('Please select a PDF file to extract text from.');
        return;
    }
    
    try {
        // Show loading indicator
        preview.innerHTML = '<p>Extracting text from PDF...</p>';
        
        // Load the PDF
        const pdfData = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({data: pdfData});
        const pdf = await loadingTask.promise;
        
        let fullText = '';
        let equationCount = 0;
        const potentialEquations = [];
        
        // Process each page
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            
            let pageText = '';
            let lastY;
            let textBlock = '';
            
            // Process text items
            textContent.items.forEach(item => {
                // Check if this is a new line
                if (lastY !== undefined && Math.abs(lastY - item.transform[5]) > 5) {
                    // New line detected
                    pageText += textBlock + '\n';
                    textBlock = '';
                }
                
                textBlock += item.str + ' ';
                lastY = item.transform[5];
                
                // Check for potential equations (simplified detection)
                if (item.str.match(/[=+\-*\/^]/) && item.str.match(/[0-9]/)) {
                    if (item.str.length > 3) {
                        potentialEquations.push(item.str);
                        equationCount++;
                    }
                }
            });
            
            pageText += textBlock; // Add the last block
            fullText += pageText + '\n\n';
        }
        
        // Display extracted text and equations
        let equationsHtml = '<h4>Identified Potential Equations:</h4>';
        
        if (potentialEquations.length > 0) {
            potentialEquations.slice(0, 10).forEach((eq, i) => {
                // Clean up equation for better display
                let cleanEq = eq.trim().replace(/\s+/g, ' ');
                equationsHtml += `
                    <p style="font-family: monospace; background-color: var(--bg-color); padding: 5px; border: 1px solid var(--border-color); margin-top: 5px;">
                        ${cleanEq}
                    </p>
                `;
            });
            
            if (potentialEquations.length > 10) {
                equationsHtml += `<p>...and ${potentialEquations.length - 10} more equations</p>`;
            }
        } else {
            equationsHtml += '<p>No equations detected in the document.</p>';
        }
        
        preview.innerHTML = `
            <p><strong>Extracted text from ${file.name}:</strong></p>
            <div style="max-height: 200px; overflow-y: auto; margin-top: 10px; padding: 10px; background-color: var(--bg-color); border: 1px solid var(--border-color);">
                ${fullText.substring(0, 1000).replace(/\n/g, '<br>')}
                ${fullText.length > 1000 ? '...' : ''}
            </div>
            <div style="margin-top: 15px;">
                ${equationsHtml}
            </div>
            <p style="margin-top: 10px;">
                <a href="#" id="download-text" class="file-label">Download Full Text</a>
            </p>
        `;
        
        // Set up download link for the extracted text
        document.getElementById('download-text').addEventListener('click', (e) => {
            e.preventDefault();
            const blob = new Blob([fullText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `${file.name.replace('.pdf', '')}_extracted.txt`;
            downloadLink.click();
            URL.revokeObjectURL(url);
        });
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        preview.innerHTML = `<p>Error extracting text from PDF: ${error.message}</p>`;
    }
});

// Initial MathJax typesetting
MathJax.typeset(); 