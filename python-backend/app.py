from flask import Flask, jsonify, request
import pickle
import pandas as pd
import requests

app = Flask(__name__)


def load_modal():
    model_url = ''
    # model_url = ''
    print(model_url)
    response = requests.get(model_url)
    print(response)
    if response.status_code == 200:
        return pickle.loads(response.content)


@app.get("/")
def get():
    return "Plantation flask backend running successfully..."


@app.post("/prediction")
def prediction():
    try:
        loaded_model = load_modal()
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
        return jsonify({
            "status": 200,
            "data": predicted_label[0],
            "message": 'Operation Successful'
        })
    except:
        return jsonify({
            "status": 400,
            "data": "",
            "message": 'Something went wrong'
        })
