# LLM-Student-Resources

A comprehensive platform integrating AI tools such as ChatGPT, Midjourney, and more, designed to empower students in their academic journey. This project addresses the challenge of students lacking AI-driven resources to aid in learning and improving their academic performance.

## Problem / Opportunity

Students do not have AI tools to help them learn and improve their academics.

This problem signifies that many students face difficulties in their academic journey, whether understanding complex concepts, solving problems, or preparing for exams. The opportunity lies in leveraging AI technology to provide students with educational tools and resources to enhance their learning experience and academic performance. Many children have trouble learning, and AI can act as a replacement if they cannot access services like tutoring or office hours. If we add AI tools to the AI-Camp Website, they can access it from there on a device, and the AI can help them learn without encouraging cheating by telling them how to do it without giving answers directly.

## **What is the goal for this product?**

To provide AI programs (ChatGPT, Midjourney, etc.) to students who could use tools like that in their school to improve themselves academically by giving the means to figure out how to solve problems (while not giving the answer directly, thereby not encouraging cheating)

It will enable students to use the AI Camp website to solve school problems with the help of an AI program.

### **Be specific about how this problem impacts real-world people/businesses.**

Students have a hard time learning and being taught sometimes, causing them to fall behind in grades and schooling. That is why our AI programs can help students learn.

## Who Has This Problem?

A lot of middle schools and high schools have blocked various AI-learning resources (such as chatGPT, etc.) from their campuses. Although this helps prevent any kind of cheating with these AI resources, it also limits students to being unable to utilize them for educational learning/help.

This problem primarily affects students in middle schools and high schools who are looking for additional support and guidance in their studies. It also impacts educators who want to provide innovative learning tools but are concerned about potential cheating. AI Camp will serve as a solution for both students and teachers by offering a controlled environment for AI-powered learning.

## Prerequisites

- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/)

## Setup

### Backend (Flask)

1. **Environment Setup (OPTIONAL DO NOT NEED)**

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
   # Windows
   venv\Scripts\activate

   # MacOS/Linux
   source venv/bin/activate
   ```

2. **Install Dependencies**

   Install the required packages:

   ```bash
   pip install flask flask-cors python-dotenv openai requests
   pip install -r requirements.txt
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
   python app.py
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
