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
# Choose API provider: 'groq', 'huggingface', 'cohere', or 'ollama'
# Set via environment variable: API_PROVIDER=cohere
API_PROVIDER = os.environ.get('API_PROVIDER', 'cohere').lower()

# Groq API Configuration (Free & Fast - Recommended)
GROQ_API_KEY = os.environ.get('GROQ_API_KEY', '')
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
# Available Groq models:
# - deepseek-r1-distill-llama-3-8b (recommended, fast, free)
# - llama-3.1-8b-instant (very fast)
# - llama-3.1-70b-versatile (more capable, slower)
# - mixtral-8x7b-32768 (good for long context)
GROQ_MODEL = os.environ.get('GROQ_MODEL', 'deepseek-r1-distill-llama-3-8b')

# Hugging Face API Configuration
HF_API_TOKEN = os.environ.get('HF_API_TOKEN', '')
HF_API_URL = "https://api-inference.huggingface.co/models/"
# Available Hugging Face models that work with Inference API:
# - microsoft/Phi-3-mini-4k-instruct (recommended - fast, reliable)
# - mistralai/Mistral-7B-Instruct-v0.2 (good quality)
# - google/flan-t5-large (instruction-tuned, reliable)
# - microsoft/DialoGPT-medium (conversational)
# Note: Some models like meta-llama may not be available via public inference API
HF_MODEL = os.environ.get('HF_MODEL', 'microsoft/Phi-3-mini-4k-instruct')

# Cohere API Configuration
COHERE_API_KEY = os.environ.get('COHERE_API_KEY', '')
COHERE_API_URL = "https://api.cohere.ai/v1/chat"
# Available Cohere models (as of 2025):
# - command-r (recommended - fast, reliable)
# - command-r-plus (more capable, slower)
# - command-r7b-12-2024 (newer version)
# - command-a-03-2025 (latest version)
# Note: 'command' model was removed on September 15, 2025
COHERE_MODEL = os.environ.get('COHERE_MODEL', 'command-r')

# Ollama Configuration (for local use)
OLLAMA_BASE_URL = "http://localhost:11434"
OLLAMA_MODEL = os.environ.get('OLLAMA_MODEL', 'deepseek:8b')

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
1. Self-employed STEM Tutor (2022-2023) - Part-Time via ZOOM
   - Taught secondary students physics and mathematics via Zoom
   - Developed customized lesson plans to address individual learning gaps

2. VineUp Company Internship (April 2019) - Digital Engineering Intern, Gloucester UK
   - Collaborated with cross-functional teams to digitize project documentation
   - Research and report of the user experience with their current interface

PROJECTS:
1. Robot Basketball Competition (First semester 2024) - Team Leader
   - Led an 8-member team to design and build a functional robot
   - Used SolidWorks (3D modeling) and Python (sensor programming)
   - Resolved mechanical stability and sensor integration challenges
   - Managed timelines, budgets, and technical troubleshooting under a 6-month deadline
   - Improved shooting accuracy by 65% through design iterations
   - Robot successfully completed 7 out of 8 shooting challenges
   - Technologies: SolidWorks, Python, Arduino, Ultrasonic sensors, OpenCV

2. Fuel Cell Powered Robot Car (2024)
   - Designed and built an innovative robot car powered by Vanadium fuel cells
   - Integrated fuel cell system with motor control and power management circuits
   - Achieved 45 minutes of continuous operation using a single Vanadium cartridge
   - 12W output capacity with custom-designed power management circuit

3. Smart Navigational Cane (2025) - Project Leader
   - Developed a proposal for an innovative smart cane incorporating GPS navigation, ultrasonic sensors and haptic feedback
   - Designed a user-friendly interface with voice commands and smartphone integration
   - Features: Hands-free navigation, automatic fall detection, real-time location sharing, obstacle alerts, voice assistant
   - Created detailed technical specifications and cost analysis for potential implementation

4. AI-Powered Automation Program Plugin (2025) - Personal Project
   - Developed a Python-based tool to automate tasks on Excel and computer tasks
   - Integrated open source machine learning algorithms to assist user experience through learning user preferred patterns
   - Uses scikit-learn for pattern recognition and PyAutoGUI for task automation
   - Improved pattern recognition accuracy from 40% to over 75%

SKILLS:
Technical Skills:
- CAD: SolidWorks (Advanced), Revit, AutoCAD
- Coding: Python (3+ years), MATLAB, Java, HTML, SQL (Basic)
- Other Tools: Microsoft Office Suite, BIM Basics

Soft Skills:
- Agile Project Management
- Cross-functional Collaboration
- Problem-Solving
- Technical Tutoring

Languages: Cantonese, English, Putonghua

INTERESTS:
- AI applications in construction (e.g., predictive maintenance, generative design)
- Sustainable materials and prefabrication techniques
- BIM innovation and automation

WEBSITES CREATED:
1. Document Operator - A local web tool that analyzes LaTeX source code to count words and complex equations
   - URL: https://zhao255.github.io/ZHAOpersonal-website/Document%20Operator/

2. Order Management System - A website for managing restaurant orders
   - Features: Set menu, manage orders, generate customer-only links, export orders data, customize UI
   - URL: https://zhao255.github.io/ZHAOpersonal-website/order2.html

3. QR Code Generator - A website for creating custom QR codes with logo
   - Features: Generate QR codes for links, add logos, set size, download as JPG
   - URL: https://zhao255.github.io/ZHAOpersonal-website/QR.html

4. Numerical Method Calculator - A website for calculating numerical method problems
   - Features: Gauss-Seidel method, Gauss Elimination, LU decomposition, Newton-Raphson & Bisection method
   - URL: https://zhao255.github.io/ZHAOpersonal-website/num1.html

ABOUT HIM:
Zhao Xuecen is a mechanical engineering student at The Hong Kong Polytechnic University with expertise in CAD design, programming, and automation. He has experience in project leadership, technical problem-solving, and cross-functional collaboration. He is particularly interested in AI applications, sustainable materials, and BIM innovation.

When answering questions:
- keep the response short and concise, do not use too many words.
- Be conversational and friendly
- Provide accurate information based on the details above
- If asked about something not covered, politely say you don't have that information
- Always refer to him as "Zhao Xuecen" or "Jack" when mentioning him
- Mention the website sections (About, Education, Experience, Projects, Skills, Contact) when relevant
"""

# ============================================
# API Functions
# ============================================

def generate_response_groq(prompt, max_tokens=1024, temperature=0.7):
    """Generate response using Groq API"""
    if not GROQ_API_KEY:
        return "Error: GROQ_API_KEY not set. Please set it as an environment variable."
    
    try:
        headers = {
            "Authorization": "Bearer {}".format(GROQ_API_KEY),
            "Content-Type": "application/json"
        }
        
        data = {
            "model": GROQ_MODEL,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        response = requests.post(GROQ_API_URL, json=data, headers=headers, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            return result['choices'][0]['message']['content'].strip()
        else:
            error_text = response.text if response.text else "Unknown error"
            return "Error: Groq API returned status {} - {}".format(response.status_code, error_text)
    
    except requests.exceptions.Timeout:
        return "Error: Request to Groq API timed out. Please try again."
    except requests.exceptions.RequestException as e:
        return "Error: Could not connect to Groq API - {}".format(str(e))
    except Exception as e:
        return "Error: An error occurred with Groq API - {}".format(str(e))

def generate_response_huggingface(prompt, max_tokens=512, temperature=0.7):
    """Generate response using Hugging Face Inference API"""
    if not HF_API_TOKEN:
        return "Error: HF_API_TOKEN not set. Please set it as an environment variable."
    
    try:
        headers = {
            "Authorization": "Bearer {}".format(HF_API_TOKEN),
            "Content-Type": "application/json"
        }
        
        # Format the prompt based on model type
        # Flan-T5 models work better with instruction-style prompts
        if "flan" in HF_MODEL.lower() or "t5" in HF_MODEL.lower():
            # Flan-T5 uses instruction format
            formatted_prompt = "Given the context: {}\n\nQuestion: {}\n\nAnswer:".format(SYSTEM_PROMPT[:500], prompt)
        else:
            # Standard chat format for other models
            formatted_prompt = "{}\n\nUser: {}\n\nAssistant:".format(SYSTEM_PROMPT, prompt)
        
        # Hugging Face Inference API format
        payload = {
            "inputs": formatted_prompt,
            "parameters": {
                "max_new_tokens": max_tokens,
                "temperature": temperature,
                "return_full_text": False,
                "do_sample": True,
                "top_p": 0.95
            }
        }
        
        api_url = "{}{}".format(HF_API_URL, HF_MODEL)
        response = requests.post(api_url, json=payload, headers=headers, timeout=90)
        
        # Handle authentication error (401 status)
        if response.status_code == 401:
            error_detail = "Invalid token or insufficient permissions"
            try:
                error_json = response.json()
                error_detail = error_json.get('error', error_detail)
            except:
                pass
            return "Error 401: Authentication failed - {}\n\nPossible issues:\n1. Token is invalid or expired\n2. Token doesn't have access to model '{}'\n3. Model requires special permissions/gating\n\nTry:\n- Generate a new token at https://huggingface.co/settings/tokens\n- Use a publicly available model like 'gpt2' or 'google/flan-t5-base'\n- Accept model terms if it's a gated model".format(error_detail, HF_MODEL)
        
        # Handle model not found (404 status)
        if response.status_code == 404:
            error_suggestions = [
                "google/flan-t5-large",
                "google/flan-t5-base", 
                "microsoft/DialoGPT-medium",
                "gpt2",
                "distilgpt2"
            ]
            suggestions_str = ", ".join(error_suggestions)
            return "Error: Model '{}' not found or not available via Inference API.\n\nTry setting HF_MODEL to one of these working models:\n{}\n\nCurrent model: {}\nCheck available models: https://huggingface.co/models?pipeline_tag=text-generation".format(HF_MODEL, suggestions_str, HF_MODEL)
        
        # Handle model loading (503 status)
        if response.status_code == 503:
            error_data = response.json() if response.headers.get('content-type', '').startswith('application/json') else {}
            estimated_time = error_data.get('estimated_time', 'unknown')
            return "Error: Model is currently loading. Please wait {} seconds and try again.".format(estimated_time)
        
        if response.status_code == 200:
            result = response.json()
            # Handle different response formats from HF API
            if isinstance(result, list) and len(result) > 0:
                # Standard format: [{"generated_text": "..."}]
                if 'generated_text' in result[0]:
                    text = result[0]['generated_text'].strip()
                    # Remove the prompt part if it's included
                    if formatted_prompt in text:
                        text = text.replace(formatted_prompt, "").strip()
                    return text
                elif 'text' in result[0]:
                    return result[0]['text'].strip()
            elif isinstance(result, dict):
                # Alternative format: {"generated_text": "..."}
                if 'generated_text' in result:
                    text = result['generated_text'].strip()
                    if formatted_prompt in text:
                        text = text.replace(formatted_prompt, "").strip()
                    return text
            # Fallback: return string representation
            return str(result)
        else:
            error_text = response.text if response.text else "Unknown error"
            try:
                error_json = response.json()
                error_msg = error_json.get('error', error_text)
                return "Error: Hugging Face API returned status {} - {}".format(response.status_code, error_msg)
            except:
                return "Error: Hugging Face API returned status {} - {}".format(response.status_code, error_text)
    
    except requests.exceptions.Timeout:
        return "Error: Request to Hugging Face API timed out. Please try again."
    except requests.exceptions.RequestException as e:
        return "Error: Could not connect to Hugging Face API - {}".format(str(e))
    except Exception as e:
        return "Error: An error occurred with Hugging Face API - {}".format(str(e))

def generate_response_cohere(prompt, max_tokens=1024, temperature=0.7):
    """Generate response using Cohere API"""
    if not COHERE_API_KEY:
        return "Error: COHERE_API_KEY not set. Please set it as an environment variable."
    
    try:
        headers = {
            "Authorization": "Bearer {}".format(COHERE_API_KEY),
            "Content-Type": "application/json",
            "accept": "application/json"
        }
        
        # Cohere chat API format with system prompt
        data = {
            "message": prompt,
            "model": COHERE_MODEL,
            "chat_history": [],
            "preamble": SYSTEM_PROMPT,  # System prompt as preamble
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        response = requests.post(COHERE_API_URL, json=data, headers=headers, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            # Cohere returns text in 'text' field
            if 'text' in result:
                return result['text'].strip()
            elif 'message' in result:
                return result['message'].strip()
            else:
                return str(result)
        else:
            error_text = response.text if response.text else "Unknown error"
            try:
                error_json = response.json()
                error_msg = error_json.get('message', error_json.get('error', error_text))
                return "Error: Cohere API returned status {} - {}".format(response.status_code, error_msg)
            except:
                return "Error: Cohere API returned status {} - {}".format(response.status_code, error_text)
    
    except requests.exceptions.Timeout:
        return "Error: Request to Cohere API timed out. Please try again."
    except requests.exceptions.RequestException as e:
        return "Error: Could not connect to Cohere API - {}".format(str(e))
    except Exception as e:
        return "Error: An error occurred with Cohere API - {}".format(str(e))

def generate_response_ollama(prompt, max_tokens=2048, temperature=0.7):
    """Generate response using Ollama (local)"""
    try:
        # Check if Ollama is running
        check_response = requests.get("{}/api/tags".format(OLLAMA_BASE_URL), timeout=5)
        if check_response.status_code != 200:
            return "Error: Ollama server is not running. Please start it with: ollama serve"
        
        # Prepare the request
        full_prompt = "{}\n\nUser Question: {}\n\nAssistant Response:".format(SYSTEM_PROMPT, prompt)
        
        ollama_request = {
            "model": OLLAMA_MODEL,
            "prompt": full_prompt,
            "stream": False,
            "options": {
                "temperature": temperature,
                "num_predict": max_tokens,
            }
        }
        
        response = requests.post(
            "{}/api/generate".format(OLLAMA_BASE_URL),
            json=ollama_request,
            timeout=120
        )
        
        if response.status_code == 200:
            data = response.json()
            return data.get("response", "").strip()
        else:
            return "Error: Ollama API error - {}".format(response.status_code)
    
    except requests.exceptions.ConnectionError:
        return "Error: Could not connect to Ollama. Please make sure Ollama is running."
    except Exception as e:
        return "Error: An error occurred with Ollama - {}".format(str(e))

def generate_response(prompt, max_tokens=1024, temperature=0.7):
    """Main function to generate response using the configured API provider"""
    if API_PROVIDER == 'groq':
        return generate_response_groq(prompt, max_tokens, temperature)
    elif API_PROVIDER == 'huggingface' or API_PROVIDER == 'hf':
        return generate_response_huggingface(prompt, max_tokens, temperature)
    elif API_PROVIDER == 'cohere':
        return generate_response_cohere(prompt, max_tokens, temperature)
    elif API_PROVIDER == 'ollama':
        return generate_response_ollama(prompt, max_tokens, temperature)
    else:
        return "Error: Unknown API provider '{}'. Please set API_PROVIDER to 'groq', 'huggingface', 'cohere', or 'ollama'.".format(API_PROVIDER)

# ============================================
# Flask Routes
# ============================================

@app.route('/', methods=['GET'])
def health_check():
    """Health check endpoint"""
    # Determine model based on provider
    if API_PROVIDER == 'groq':
        model = GROQ_MODEL
    elif API_PROVIDER in ['huggingface', 'hf']:
        model = HF_MODEL
    elif API_PROVIDER == 'cohere':
        model = COHERE_MODEL
    else:
        model = OLLAMA_MODEL
    
    return jsonify({
        'status': 'ok',
        'message': 'Chat API Server is running',
        'provider': API_PROVIDER,
        'model': model
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
    print("Chat API Server Starting...")
    print("=" * 60)
    print("API Provider: {}".format(API_PROVIDER.upper()))
    
    if API_PROVIDER == 'groq':
        print("Using Groq API")
        print("Model: {}".format(GROQ_MODEL))
        if not GROQ_API_KEY:
            print("⚠️  WARNING: GROQ_API_KEY not set!")
            print("   Get your free API key at: https://console.groq.com/")
            print("   Set it with: export GROQ_API_KEY=your-key-here")
        else:
            print("✅ API Key configured")
    
    elif API_PROVIDER == 'cohere':
        print("Using Cohere API")
        print("Model: {}".format(COHERE_MODEL))
        if not COHERE_API_KEY:
            print("⚠️  WARNING: COHERE_API_KEY not set!")
            print("   Get your API key at: https://dashboard.cohere.com/api-keys")
            print("   Set it with: export COHERE_API_KEY=your-key-here")
        else:
            print("✅ API Key configured")
    
    elif API_PROVIDER in ['huggingface', 'hf']:
        print("Using Hugging Face API")
        print("Model: {}".format(HF_MODEL))
        if not HF_API_TOKEN:
            print("⚠️  WARNING: HF_API_TOKEN not set!")
            print("   Get your free API token at: https://huggingface.co/settings/tokens")
            print("   Set it with: export HF_API_TOKEN=your-token-here")
        else:
            print("✅ API Token configured")
    
    elif API_PROVIDER == 'ollama':
        print("Using Ollama (Local)")
        print("Model: {}".format(OLLAMA_MODEL))
        print("Ollama URL: {}".format(OLLAMA_BASE_URL))
        try:
            check_response = requests.get("{}/api/tags".format(OLLAMA_BASE_URL), timeout=5)
            if check_response.status_code == 200:
                print("✅ Ollama server is running")
            else:
                print("⚠️  WARNING: Cannot connect to Ollama server")
        except:
            print("⚠️  WARNING: Cannot connect to Ollama server")
            print("   Make sure Ollama is running: ollama serve")
    
    print("=" * 60)
    print("Server ready!")
    print("Server running on: http://0.0.0.0:5000")
    print("Chat endpoint: http://localhost:5000/chat")
    print("=" * 60)
    print()
    
    app.run(port=5000, host='0.0.0.0', debug=False)

