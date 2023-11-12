from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Specify the allowed origin

openai.api_key = os.environ["OPENAI_API_KEY"]
messages = []
whichOne = 0

@app.route("/img", methods=["POST"])
def img():
    user_prompt = request.json.get("prompt")
    response = openai.Image.create(
        prompt=user_prompt,
        n=1,
        size="1024x1024",
    )
    image_url = response['data'][0]['url']

    # Include CORS headers
    response_headers = {
        "Access-Control-Allow-Origin": "http://localhost:3000",  # Allow requests from your frontend
        "Access-Control-Allow-Headers": "Content-Type",
    }
    
    return jsonify({"assistant_message": image_url}), 200, response_headers

@app.route("/txt", methods=["POST"])
def message():
    user_prompt = request.json.get("prompt")
    messages.append({"role": "user", "content": user_prompt})

    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)

    assistant_message = response.choices[0].message.content
    messages.append({"role": "assistant", "content": assistant_message})

    # Include CORS headers
    response_headers = {
        "Access-Control-Allow-Origin": "http://localhost:3000",  # Allow requests from your frontend
        "Access-Control-Allow-Headers": "Content-Type",
    }

    return jsonify({"assistant_message": assistant_message}), 200, response_headers

@app.route('/tts', methods=['POST'])
def tts():
    global whichOne
    user_prompt = request.json.get('prompt')
    messages.append({"role": "user", "content": user_prompt})
    CHUNK_SIZE = 1024
    url = "https://api.elevenlabs.io/v1/text-to-speech/onwK4e9ZLuTAKqWW03F9"

    headers = {
    "Accept": "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": "9aab98f40950f0238521d4e6a0685d93"
    }

    data = {
    "text": user_prompt,
    "model_id": "eleven_monolingual_v1",
    "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5
    }
    }
    response = requests.post(url, json=data, headers=headers)
    whichOne +=1
    filePath = f'../chatgpt-frontend/public/tts/{whichOne}output.mp3'
    with open(filePath, 'wb') as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            if chunk:
                f.write(chunk)
    return jsonify({'assistant_message':f"/tts/{whichOne}output.mp3"})


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)
