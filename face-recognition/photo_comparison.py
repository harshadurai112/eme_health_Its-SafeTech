from flask import Flask, request, jsonify
import cv2
import urllib.request
import numpy as np
import face_recognition
import os

app = Flask(__name__)

def get_people_data():
    people = [
        {
            'name': 'Sasi',
            'phone': '+91 9876543210',
            'gender': 'Male',
            'date_of_birth': '09/15/1990',
            'blood_group': 'A+'
        },
        {
            'name': 'Rohith',
            'phone': '+91 8765432109',
            'gender': 'Male',
            'date_of_birth': '03/25/1995',
            'blood_group': 'AB-'
        },
        {
            'name': 'Shrreya',
            'phone': '+91 7654321098',
            'gender': 'Female',
            'date_of_birth': '11/08/1987',
            'blood_group': 'O-'
        },
        {
            'name': 'Vishal',
            'phone': '+91 9498844532',
            'gender': 'Male',
            'date_of_birth': '07/12/2000',
            'blood_group': 'B-'
        },
        {
            'name': 'Shrreya',
            'phone': '+91 5432109876',
            'gender': 'Female',
            'date_of_birth': '02/03/1992',
            'blood_group': 'AB+'
        }
    ]
    return people

# Load image encodings for all images in the images folder
image_encodings = {}
image_folder = "/Users/vishalchinnasamy/Desktop/Hackathons/Eme-Medical/face-recognition/images"
for filename in os.listdir(image_folder):
    if filename.endswith(".png") or filename.endswith(".JPG"):
        image_path = os.path.join(image_folder, filename)
        img = cv2.imread(image_path)
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encoding = face_recognition.face_encodings(rgb_img)[0]
        image_encodings[filename] = encoding

@app.route('/', methods=['GET'])
def compare():
    return "Hello"

@app.route('/compare_faces', methods=['POST'])
def compare_faces():
    try:
        url = request.json['url']
        with urllib.request.urlopen(url) as response:
            image_data = response.read()

        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_encoding = face_recognition.face_encodings(rgb_img)[0]

        matched_image = None
        for filename, encoding in image_encodings.items():
            result = face_recognition.compare_faces([encoding], img_encoding)
            if result[0]:  # If a match is found
                matched_image = filename
                break

        if matched_image:
            people_data = get_people_data()
            matched_person = next((person for person in people_data if person['name'] in matched_image), None)
            if matched_person:
                return jsonify({"status": 1, "message" : matched_person})
            else:
                return jsonify({"status": 0, "message": "No matching person data found"})
        else:
            return jsonify({"status": 0,"message": "No matching face found in the images folder"})
    except:
        return jsonify({"status": 0,"message": "No matching face found in the images folder"})

if __name__ == '__main__':
    app.run(debug=True)