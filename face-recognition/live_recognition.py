# import cv2
# from simple_facerec import SimpleFacerec

# sfr = SimpleFacerec()
# sfr.load_encoding_images("face-recognition/images/")

# cap = cv2.VideoCapture(0)

# while True:
#     ret, frame = cap.read()

#     # Detect Faces
#     face_locations, face_names = sfr.detect_known_faces(frame)
#     for face_loc, name in zip(face_locations, face_names):
#         y1, x2, y2, x1 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]

#         cv2.putText(frame, name,(x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 0, 200), 2)
#         cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 200), 4)

#     cv2.imshow("Frame", frame)

#     key = cv2.waitKey(1)
#     if key == 27:
#         break

# cap.release()
# cv2.destroyAllWindows()

# -----------------------------------------------

# from flask import Flask, render_template, Response
# import cv2
# from simple_facerec import SimpleFacerec

# app = Flask(__name__)
# sfr = SimpleFacerec()
# sfr.load_encoding_images("face-recognition/images/")

# def generate_frames():
#     cap = cv2.VideoCapture(0)

#     while True:
#         ret, frame = cap.read()

#         # Detect Faces
#         face_locations, face_names = sfr.detect_known_faces(frame)
#         for face_loc, name in zip(face_locations, face_names):
#             y1, x2, y2, x1 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]

#             if name == "Sasi":
#                 print("Unknown!!")
#                 # client.publish(topic, "Hello, MQTT!")

#             cv2.putText(frame, name, (x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 0, 200), 2)
#             cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 200), 4)

#         ret, jpeg = cv2.imencode('.jpg', frame)
#         frame = jpeg.tobytes()

#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/face_recog')
# def video_feed():
#     return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# if __name__ == '__main__':
#     app.run(debug=True, port=5550)

# -----------------------------------------
    
from flask import Flask, render_template, Response
import cv2
from simple_facerec import SimpleFacerec
import json
import playsound
import time

with open('criminal_dataset.json', 'r') as file:
    criminal_data = json.load(file)

sfr = SimpleFacerec()
sfr.load_encoding_images("/Users/vishalchinnasamy/Desktop/Hackathons/Rajasthan Police Hackathon/RJPOLICE_HACK_989_ItsSafeTech_3/backend/face-recognition/images")

cap = cv2.VideoCapture(0)

criminal_count = {}  # Dictionary to store counts for each detected criminal

while True:
    ret, frame = cap.read()

    # Detect Faces
    face_locations, face_names = sfr.detect_known_faces(frame)
    for face_loc, name in zip(face_locations, face_names):
        y1, x2, y2, x1 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]

        cv2.putText(frame, name, (x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 0, 200), 2)
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 200), 4)

        if name in criminal_data:
            data = criminal_data[name]
            print("Name:", name)
            print("Father Name:", data['father_name'])
            print("Age:", data['age'])
            print("Cast:", data['cast'])
            print("Temporary Address:", data['temporary_address'])
            print("Police Station:", data['police_station'])
            print("Permanent Address", data['permanent_address'])
            print("Type", data['type'])

            # Check if the type is criminal and update the count
            if data['type'] == "!!!!!!!CRIMINAL!!!!!!!":
                # criminal_count[name] = criminal_count.get(name, 0) + 1

                # Trigger sound if count exceeds 20
                # if criminal_count[name] > 20:
                    print(f"Alarm! {name} detected as a criminal more than 20 times!")
                    playsound('/Users/vishalchinnasamy/Desktop/Hackathons/Rajasthan Police Hackathon/RJPOLICE_HACK_989_ItsSafeTech_3/backend/face-recognition/critical.mp3')
                    print("[Playing]")

    cv2.imshow("Frame", frame)

    key = cv2.waitKey(1)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()