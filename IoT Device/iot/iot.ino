#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include "ThingSpeak.h"
#include <Adafruit_Sensor.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

const char* ssid = "Galaxy";
const char* password = "sahan1234";

SoftwareSerial mySerial(5, 4);  // RX, TX

String server = "https://api.thingspeak.com";
unsigned long myChannelNumber = 1234567;
String myWriteAPIKey = "FHFGHFGHFGHFG";

int RX_LED = 12;
int TX_LED = 13;
long sensorQueryDelay = 100;

void setup() {
  pinMode(RX_LED, OUTPUT);
  pinMode(TX_LED, OUTPUT);
  Serial.begin(9600);
  mySerial.begin(4800);

  connectToWifi();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    byte queryData[] = { 0x01, 0x03, 0x00, 0x00, 0x00, 0x07, 0x04, 0x08 };
    byte receivedData[19];

    digitalWrite(TX_LED, HIGH);
    mySerial.write(queryData, sizeof(queryData));  // Send the query data to the NPK sensor
    delay(sensorQueryDelay);
    digitalWrite(TX_LED, LOW);

    if (mySerial.available() >= sizeof(receivedData)) {
      digitalWrite(RX_LED, HIGH);
      mySerial.readBytes(receivedData, sizeof(receivedData));  // Read the received data into the receivedData array

      // Parse and print the received data in decimal format
      unsigned int nitrogen = (receivedData[11] << 8) | receivedData[12];
      unsigned int phosphorus = (receivedData[13] << 8) | receivedData[14];
      unsigned int potassium = (receivedData[15] << 8) | receivedData[16];
      unsigned int soilTemperature = (receivedData[5] << 8) | receivedData[6];
      unsigned int soilHumidity = (receivedData[3] << 8) | receivedData[4];
      unsigned int soilPH = (receivedData[9] << 8) | receivedData[10];

      float nitrogenResult = (float)soilHumidity / 10.0;
      float temperatureResult = (float)soilTemperature / 10.0;
      float humidityResult = (float)soilHumidity / 10.0;
      float phResult = (float)soilPH / 10.0;

      updateThingSpeak(String(nitrogenResult), String(phosphorus), String(potassium), String(temperatureResult), String(humidityResult), String(phResult));

      delay(sensorQueryDelay);
      digitalWrite(RX_LED, LOW);
    }
  } else {
    connectToWifi();
  }
}

void connectToWifi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    digitalWrite(TX_LED, !digitalRead(TX_LED));
    digitalWrite(RX_LED, !digitalRead(RX_LED));
  }

  digitalWrite(TX_LED, LOW);
  digitalWrite(RX_LED, LOW);

  Serial.println("Connected to WiFi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void updateThingSpeak(String nitrogenResult, String phosphorus, String potassium, String temperatureResult, String humidityResult, String phResult) {
  WiFiClientSecure client;
  HTTPClient http;

  client.setInsecure();
  http.begin(client, server + "/update?api_key=" + myWriteAPIKey + "&field1=" + nitrogenResult + "&field2=" + phosphorus + "&field3=" + potassium + "&field4=" + temperatureResult + "&field5=" + humidityResult + "&field6=" + phosphorus);

  int httpCode = http.GET();  //Make the request

  if (httpCode == 200) {  //Check for the returning code
    Serial.println("Data updated successfully");
    Serial.println("N:" + nitrogenResult + " | " + "P:" + phosphorus + " | " + "K:" + potassium + " | " + "Temperature:" + temperatureResult + " | " + "Humidity:" + humidityResult + " | " + "Ph:" + phosphorus);
  } else {
    Serial.println("Error on HTTP request");
  }

  http.end();  //Free the resources
}
