from flask import Flask, jsonify, request
import pickle
import pandas as pd

app = Flask(__name__)

try:
  with open('model.pkl', 'rb') as file:
    loaded_model = pickle.load(file)
except:
  print("Failed to open model")

@app.get("/")
def get():
    return "Plantation flask backend running successfully..."    

@app.post("/prediction")
def prediction():
    data = request.get_json()
    new_data = {
        'N': [data['N']],
        'P': [data['P']],
        'K': [data['K']],
        'temperature': [data['temperature']],
        'humidity': [data['humidity']],
        'ph': [data['ph']],
        'rainfall': [data['rainfall']]
    }

    new_data_df = pd.DataFrame(new_data)
    predicted_label = loaded_model.predict(new_data_df)
    return predicted_label[0]
    # return "API called"