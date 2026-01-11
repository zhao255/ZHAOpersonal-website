from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import sys

app = Flask(__name__)
CORS(app)

# ============================================
# API CONFIGURATION
# ============================================
# OpenRouter API Configuration
OPENROUTER_API_KEY = os.environ.get('OPENROUTER_API_KEY', '')
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL_ID = os.environ.get('MODEL_ID', 'deepseek/deepseek-r1-0528:free')

# ============================================
# System Prompt
# ============================================
SYSTEM_PROMPT = """You are an AI assistant helping visitors learn about ZHAO XUECEN (Jack Zhao) and his personal website. You should be friendly, informative, and helpful. Use the following information to answer questions about him and his website:

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
   - Build and optimize features for our FunMA mathematics platform.
   - Collaborate with product and engineering teams on mobile app enhancements.
   - Implement machine learning algorithms for content generation and student performance analysis.
   - Participate in agile development sprints and code reviews.

2. Part-time CAD Drawing Maker (2024 - Present) - Freelance
   - Specialize in creating detailed 2D and 3D CAD drawings for various engineering projects.
   - Utilize SolidWorks and AutoCAD to produce precise technical illustrations and models.
   - Collaborate with clients to translate conceptual designs into accurate manufacturing specifications.

3. Part-time Web Developer (2023 - Present) - Freelance
   - Design and develop custom web solutions for clients.
   - Implement responsive designs and interactive features using modern web technologies.

4. Part-Time STEM Tutor (2022-2023) - Part-Time | via ZOOM
   - Taught secondary students physics and mathematics via Zoom
   - Developed customized lesson plans to address individual learning gaps

5. Digital Engineering Intern (April 2019) - VineUp company | Gloucester UK
   - Collaborated with cross-functional teams to digitize project documentation
   - Research and report of the user experience with their current interface

PROJECTS (Newest First):
1. Interactive Math Content Generation Platform (2026) - Developer
   - Web-based app using Manim and AI to generate animated step-by-step math solution videos.
   - Features: Multi-row LaTeX steps, individual row styling, KaTeX real-time preview, synchronized audio, lesson generation with MCQ support, ZIP export.
   - Potential: Makes learning effective by making content audible, interactive, and visible, bridging static textbooks with dynamic personalized education.
   - Example Projects Created: 
     * Cone Interactive (https://zhao255.github.io/ZHAOpersonal-website/cone interactive/interactive.html)
     * Step-by-Step with Voice (https://zhao255.github.io/ZHAOpersonal-website/step by step with voice/index.html)
     * Pythagoras' Theorem Lesson (https://zhao255.github.io/ZHAOpersonal-website/pythagoras' theorem Lesson/index.html)
   - URL: https://zhao255.github.io/ZHAOpersonal-website/projects/interactive-math.html

2. Smart Navigational Cane (2025) - Project Leader
   - Proposed an innovative smart cane with GPS, ultrasonic sensors, and haptic feedback.
   - Features: Hands-free navigation, automatic fall detection, obstacle alerts, voice assistant.
   - URL: https://zhao255.github.io/ZHAOpersonal-website/projects/smart-cane.html

3. AI-Powered Automation Program Plugin (2025) - Personal Project
   - Python-based tool to automate Excel and computer tasks using scikit-learn and PyAutoGUI.
   - URL: https://zhao255.github.io/ZHAOpersonal-website/projects/ai-automation.html

4. Robot Basketball Competition (First semester 2024) - Team Leader
   - Led an 8-member team to design/build an autonomous basketball robot.
   - Technologies: SolidWorks, Python, Arduino, Ultrasonic sensors, OpenCV.
   - URL: https://zhao255.github.io/ZHAOpersonal-website/projects/robot-basketball.html

5. Fuel Cell Powered Robot Car (2024)
   - Designed/built a robot car powered by Vanadium fuel cells with custom power management.
   - URL: https://zhao255.github.io/ZHAOpersonal-website/projects/fuel-cell-car.html

SKILLS:
Technical Skills:
- CAD: SolidWorks (Advanced), Revit, AutoCAD
- Coding: Python (3+ years), MATLAB, Java, HTML, SQL (Basic)
- Other Tools: Manim (Math Animation), Microsoft Office Suite, BIM Basics

Soft Skills: Project Management, Cross-functional Collaboration, Problem-Solving, Technical Tutoring
Languages: Cantonese, English, Putonghua

SOCIAL MEDIA & CONTACT:
- Email: zhaoj6332@gmail.com
- Phone/WhatsApp: +852 56170888
- Facebook: https://www.facebook.com/jack.zhao.1654700
- Instagram: https://www.instagram.com/jackzhaoyae/
- GitHub: https://github.com/zhao255

WEBSITE STRUCTURE & LINKS:
- Base URL: https://zhao255.github.io/ZHAOpersonal-website/
- Home Page: https://zhao255.github.io/ZHAOpersonal-website/index.html
- Project Detail Pages: /projects/ folder
- Skill Detail Pages: /skills/ folder
- Other Web Tools:
  * Document Operator: https://zhao255.github.io/ZHAOpersonal-website/Document%20Operator/
  * Order Management: https://zhao255.github.io/ZHAOpersonal-website/order2.html
  * QR Generator: https://zhao255.github.io/ZHAOpersonal-website/QR.html
  * Numerical Method Calculator: https://zhao255.github.io/ZHAOpersonal-website/num1.html

INTERESTS:
- AI applications in education, sustainable materials and fuel, and IoT innovation.

When answering questions:
- keep the response short and concise, do not use too many words.
- Be conversational and friendly. Provide accurate information based on the details above.
- If asked about something not covered, politely say you don't have that information.
- Always refer to him as "Zhao Xuecen" or "Jack" when mentioning him.
- Provide the full URL when mentioning a specific project or skill page.
- Highlight the potential of the Interactive Math project: how it makes learning effective by making content audible, interactive, and visible.
- Mention website sections (About, Education, Experience, Projects, Skills, Contact) or specific detail pages when relevant."""

# ============================================
# API Functions
# ============================================

def generate_response(prompt, max_tokens=1024, temperature=0.7):
    """Generate response using OpenRouter API"""
    if not OPENROUTER_API_KEY:
        return "Error: OPENROUTER_API_KEY not set. Please set it as an environment variable."
    
    try:
        headers = {
            "Authorization": "Bearer {}".format(OPENROUTER_API_KEY),
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5000", # Can be your site URL
            "X-Title": "Zhao Xuecen Portfolio"
        }
        
        data = {
            "model": MODEL_ID,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        response = requests.post(OPENROUTER_URL, json=data, headers=headers, timeout=60)
        
        if response.status_code == 200:
            result = response.json()
            return result['choices'][0]['message']['content'].strip()
        else:
            error_text = response.text if response.text else "Unknown error"
            return "Error: API returned status {} - {}".format(response.status_code, error_text)
    
    except Exception as e:
        return "Error: An error occurred - {}".format(str(e))

# ============================================
# Flask Routes
# ============================================

@app.route('/', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'message': 'Portfolio Chat API Server is running',
        'model': MODEL_ID
    })

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        prompt = data.get('message', '')
        
        if not prompt:
            return jsonify({'error': 'No message provided'}), 400
        
        # Generate response using the configured API
        response = generate_response(prompt)
        
        return jsonify({'response': response})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================
# Main
# ============================================

if __name__ == '__main__':
    print("=" * 60)
    print("Portfolio Chat API Server Starting...")
    print("=" * 60)
    print("Model: {}".format(MODEL_ID))
    
    if not OPENROUTER_API_KEY:
        print("⚠️  WARNING: OPENROUTER_API_KEY not set!")
        print("   Set it with: export OPENROUTER_API_KEY=your-key-here")
    else:
        print("✅ API Key configured")
    
    print("=" * 60)
    print("Server ready!")
    print("Server running on: http://0.0.0.0:5000")
    print("Chat endpoint: http://localhost:5000/chat")
    print("=" * 60)
    print()
    
    app.run(port=5000, host='0.0.0.0', debug=False)
