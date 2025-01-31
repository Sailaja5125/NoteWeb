from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from pinecone_plugins.assistant.models.chat import Message
from pinecone import Pinecone
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

API = "9ad1cc42-327e-4ff8-b71b-2258a1716585"  # https://app.pinecone.io/organizations/-OFI7gpvtJMOvPWlx7vm/projects
pc = Pinecone(api_key="pcsk_12UNro_FEFE3UTmP8FnT1Fh7oN1qfVwYLyapT4VDSgxohHjc1mhYHSzs56bMsE5F6yQqmf")

assistant = pc.assistant.Assistant(assistant_name="sandy")

UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload_file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"status": "error", "message": "No file part"})
    file = request.files['file']
    if file.filename == '':
        return jsonify({"status": "error", "message": "No selected file"})
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    try:
        response = assistant.upload_file(file_path=file_path)
        return jsonify({"status": "success", "response": response})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        queries = data.get('queries')
        results = []
        for query in queries:
            msg = Message(content=query)
            resp = assistant.chat(messages=[msg])
            results.append(resp["message"]['content'])
        return jsonify({"status": "success", "messages": results})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)