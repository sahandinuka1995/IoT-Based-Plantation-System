#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include "ThingSpeak.h"
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

const char* ssid = "Galaxy S22";
const char* password = "sahan826076";

SoftwareSerial mySerial(5, 4);  // RX, TX

String server = "http://192.168.8.138:5000/api/v1/data/save";

String nitrogen;
String phosphorus;
String potassium;
String temperature;
String humidity;
String ph;
String rainfall;

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  WiFiClient client;
  HTTPClient http;

  if (WiFi.status() == WL_CONNECTED) {
    byte queryData[] = { 0x01, 0x03, 0x00, 0x00, 0x00, 0x07, 0x04, 0x08 };
    byte receivedData[19];

    mySerial.write(queryData, sizeof(queryData));  // Send the query data to the NPK sensor
    delay(1000);

    if (mySerial.available() >= sizeof(receivedData)) {
      mySerial.readBytes(receivedData, sizeof(receivedData));  // Read the received data into the receivedData array

      unsigned int nitrogen = (float)((receivedData[11] << 8) | receivedData[12]);
      unsigned int phosphorus = (float)((receivedData[13] << 8) | receivedData[14]);
      unsigned int potassium = (float)((receivedData[15] << 8) | receivedData[16]);
      unsigned int soilTemperature = (float)((receivedData[5] << 8) | receivedData[6]);
      unsigned int soilHumidity = (float)((receivedData[3] << 8) | receivedData[4]);
      unsigned int soilPH = (float)((receivedData[9] << 8) | receivedData[10]);

      float nitrogenResult = calculateUsableData(nitrogen);
      float phosphorusResult = calculateUsableData(phosphorus);
      float potassiumResult = calculateUsableData(potassium);
      float temperatureResult = soilTemperature / 10.0;
      float humidityResult = soilHumidity / 10.0;
      float phResult = calculateUsableData(soilPH);

      updateThingSpeak(String(nitrogenResult), String(phosphorusResult), String(potassiumResult), String(temperatureResult), String(humidityResult), String(phResult));

      delay(5000);
    }
  } else {
    Serial.println("WiFi Disconnected");
  }
}

float calculateUsableData(float value) {
  return value > 99 ? value / 100 : value > 999  ? 1000
                                  : value > 9999 ? 10000
                                                 : value;
}

void updateThingSpeak(String nitrogenResult, String phosphorus, String potassium, String temperatureResult, String humidityResult, String phResult) {
  WiFiClientSecure client;
  HTTPClient http;

  client.setInsecure();

  //Data to send with HTTP POST
  String httpRequestData = "n=" + nitrogen + "&p=" + phosphorus + "&k=" + potassium + "&temperature=" + temperature + "&humidity=" + humidity + "&ph=" + ph + "&rainfall=" + rainfall;
  http.begin(client, server);

  //header content type
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  int httpCode = http.POST(httpRequestData);

  if (httpCode == 200) {  //Check for the returning code
    Serial.println("Data updated successfully");
    Serial.println("N:" + nitrogenResult + " | " + "P:" + phosphorus + " | " + "K:" + potassium + " | " + "Temperature:" + temperatureResult + " | " + "Humidity:" + humidityResult + " | " + "Ph:" + phResult);
  } else {
    Serial.println("Error on HTTP request");
  }

  http.end();  //Free the resources
}