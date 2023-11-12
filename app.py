from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

openai.api_key = os.environ["OPENAI_API_KEY"]

messages = []


@app.route("/message", methods=["POST"])
def message():
    user_prompt = request.json.get("prompt", "")

    prompt = input("What image do you want to create-> ")
    openai.api_key = os.environ['openaikey']
    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="1024x1024",
    )
    image_url = response['data'][0]['url']

    return jsonify({"assistant_message": image_url})


if __name__ == "__main__":
    app.run(debug=True, port="5000")
