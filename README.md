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

    Set Flask environment variables for development:
    ```bash
    export FLASK_APP=app.py
    export FLASK_ENV=development
    ```

    Start the Flask server:
    ```bash
    flask run
    ```

### Frontend (React)

1. **Install Dependencies**

    Navigate to the frontend directory:
    ```bash
    cd path_to_frontend_directory
    ```

    Install the required packages using npm (or Yarn if you prefer):
    ```bash
    npm install
    ```

2. **Run the React App**

    Start the React development server:
    ```bash
    npm start
    ```

Your browser should automatically open and navigate to `http://localhost:3000/`. If not, you can manually open it.

Now you can interact with the chat application!

---

## Initial Prompt

I've created a project in Python. Here it is:
<project>
import streamlit as st
import openai
import os

from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.environ["OPENAI_API_KEY"]

if "model" not in st.session_state:
    st.session_state["model"] = "gpt-3.5-turbo"

st.title("My Own ChatGPT!")

# initialize messages
if "messages" not in st.session_state:
    st.session_state["messages"] = []

# display messages
for message in st.session_state["messages"]:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# create an input field
if user_prompt := st.chat_input("Your prompt"):
    st.session_state.messages.append({"role": "user", "content": user_prompt})
    with st.chat_message("user"):
        st.markdown(user_prompt)

    with st.chat_message("assistant"):
        message_placeholder = st.empty()

        response = openai.ChatCompletion.create(
            model=st.session_state.model,
            messages=[
                {"role": m["role"], "content": m["content"]}
                for m in st.session_state.messages
            ],
        )

        message_placeholder.markdown(response.choices[0].message.content)

    st.session_state.messages.append(
        {"role": "assistant", "content": response.choices[0].message.content}
    )
 </project>

I want you to convert it to a full-stack app written in Flask and React.

I want a complete, end-to-end implementation, without any omitted parts. You must include all necessary imports, functions, and configs from the original code.

The original code works correctly, so do not change any functional parts.

The functionality must remain identical, and the GUI must contain the same components.

Provide the step-by-step guide on how to create the converted application including bash commands and the entire code.

I'm using Ubuntu 20.04.
