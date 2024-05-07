from flask import Flask, jsonify, request
import pickle
import pandas as pd
import requests

app = Flask(__name__)


def load_modal():
    # model_url = 'https://raw.githubusercontent.com/sahandinuka1995/iot-plantation-modal/old/model.pkl'
    model_url = 'https://firebasestorage.googleapis.com/v0/b/fir-demo-97ede.appspot.com/o/model-old.pkl?alt=media&token=e27def5a-565a-4ceb-a628-112d6a63027c'
    # model_url = 'https://firebasestorage.googleapis.com/v0/b/fir-demo-97ede.appspot.com/o/model.pkl?alt=media&token=d92ca22c-a888-4e68-89bd-10e646ddf2c4'
    print(model_url)
    response = requests.get(model_url)
    if response.status_code == 200:
        print('modal load successfully')
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
        print(new_data)
        new_data_df = pd.DataFrame(new_data)
        predicted_label = loaded_model.predict(new_data_df)
        return jsonify({
            "status": 200,
            "data": predicted_label[0],
            "message": 'Operation Successful'
        })

    except Exception as e:
        return jsonify({
            "status": 400,
            "data": "",
            "message": 'Something went wrong: ' + str(e)
        }), 400
