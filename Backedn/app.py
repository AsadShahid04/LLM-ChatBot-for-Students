from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)


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
    return jsonify({"assistant_message": image_url})
@app.route("/txt", methods=["POST"])
def message():
    user_prompt = request.json.get("prompt")
    messages.append({"role": "user", "content": user_prompt})

    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)

    assistant_message = response.choices[0].message.content
    messages.append({"role": "assistant", "content": assistant_message})

    return jsonify({"assistant_message": assistant_message})
@app.route('/tts', methods = ['POST'])
def tts():
    global whichOne
    user_prompt = request.json.get('prompt')
    messages.append({"role": "user", "content": user_prompt})
    CHUNK_SIZE = 1024
    url = "https://api.elevenlabs.io/v1/text-to-speech/onwK4e9ZLuTAKqWW03F9"

    headers = {
    "Accept": "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": "0feca70bb146483045a53598987f2559"
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
    with open(f'./chatgpt-frontend/tts/{whichOne}output.mp3', 'wb') as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            if chunk:
                f.write(chunk)

if __name__ == "__main__":
    app.run(debug=True, host = "localhost", port = "5000")
