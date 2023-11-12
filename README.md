# My Own ChatGPT

A full-stack chat application using Flask as the backend, React as the frontend, and OpenAI's GPT-3 for conversational capabilities.

## Prerequisites

- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/)

## Setup

### Backend (Flask)

1. **Environment Setup**

    Navigate to the backend directory:
    ```bash
    cd path_to_backend_directory
    ```

    Create a virtual environment:
    ```bash
    python3 -m venv venv
    ```

    Activate the virtual environment:
    ```bash
    source venv/bin/activate
    ```

2. **Install Dependencies**

    Install the required packages:
    ```bash
    pip install flask flask-cors python-dotenv openai
    ```

3. **Environment Variables**

    Create a `.env` file in the backend directory with the following content:
    ```
    OPENAI_API_KEY=your_openai_api_key
    ```
    Replace `your_openai_api_key` with your actual OpenAI API key.

4. **Run the Server**

    Start the Flask server:
    ```bash
    python app.py
    ```

### Frontend (React)

1. **Install Dependencies**

    Navigate to the frontend directory:
    ```bash
    cd chatgpt-frontend
    ```

    Install the required packages using npm (or Yarn if you prefer):
    ```bash
    npm i
    ```

2. **Run the React App**

    Start the React development server:
    ```bash
    npm start
    ```

Your browser should automatically open and navigate to `http://localhost:3000/`. If not, you can manually open it.

Now you can interact with the chat application!
