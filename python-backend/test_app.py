import pytest
from app import app


class DummyModel:
    def predict(self, X):
        return ["PlantType"]  # Dummy prediction result


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_home_page(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.data == b"Plantation flask backend running successfully..."


def test_prediction(client, mocker):
    mocker.patch('app.load_modal', return_value=DummyModel())

    payload = {
        'N': 10, 'P': 10, 'K': 10,
        'temperature': 23.5, 'humidity': 80,
        'ph': 6.5, 'rainfall': 200
    }

    response = client.post("/prediction", json=payload)

    assert response.status_code == 200
    assert response.json['status'] == 200
    assert response.json['data'] == "PlantType"
    assert response.json['message'] == 'Operation Successful'


def test_prediction_failure(client, mocker):
    mocker.patch('app.load_modal', side_effect=Exception('Error'))

    payload = {
        'N': 10, 'P': 10, 'K': 10,
        'temperature': 25, 'humidity': 50,
        'ph': 6.5, 'rainfall': 200
    }

    response = client.post("/prediction", json=payload)
    assert response.status_code == 400
    assert response.json == {
        "status": 400,
        "data": "",
        "message": "Something went wrong: Error"
    }
