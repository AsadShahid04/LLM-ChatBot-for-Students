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


if __name__ == "__main__":
    app.run(debug=True, host = "localhost", port = "5000")
