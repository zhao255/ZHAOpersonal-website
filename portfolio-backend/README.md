# Portfolio Chat Backend

This is a local Flask server that acts as a secure proxy between your portfolio website and the OpenRouter AI API. 

## Setup Instructions

1.  **Install Python**: Ensure you have Python installed.
2.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Configure API Key**:
    - The `start_server.bat` file already contains your provided API key.
    - Alternatively, you can create a `.env` file in this folder and add:
      `OPENROUTER_API_KEY=your_key_here`
4.  **Start the Server**:
    - Run `start_server.bat`. 
    - This will start the Flask server on `http://localhost:5000`.
    - If `ngrok` is installed, it will also attempt to open a tunnel.

## Using with Ngrok

Once `ngrok` is running, it will provide you with a public URL (e.g., `https://a1b2-c3d4.ngrok-free.app`). 

1.  Copy that URL.
2.  Open `script.js` in the root folder.
3.  Set the `BACKEND_URL` variable to your ngrok URL:
    ```javascript
    const BACKEND_URL = 'https://your-ngrok-url.ngrok-free.app';
    ```

## Security Note

**NEVER** commit your `.env` file or any file containing your API key to GitHub. The `.gitignore` file is set up to help prevent this, but please double-check before pushing.
