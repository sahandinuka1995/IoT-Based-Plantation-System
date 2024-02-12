#include "ESP8266WiFi.h"
#include <ESP8266HTTPClient.h>

const char* ssid = "Galaxy S22";
const char* password = "sahan826076";

String serverName = "http://192.168.8.138:5000/api/v1/data/save";

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
    nitrogen = random(10, 15);
    phosphorus = random(10, 15);
    potassium = random(12, 16);
    temperature = random(30, 35);
    humidity = random(26, 30);
    ph = random(5, 8);
    rainfall = random(100, 120);

    http.begin(client, serverName);

    //header content type
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    //Data to send with HTTP POST
    String httpRequestData = "n=" + nitrogen + "&p=" + phosphorus + "&k=" + potassium + "&temperature=" + temperature + "&humidity=" + humidity + "&ph=" + ph + "&rainfall=" + rainfall;
    // Send HTTP POST request
    int httpResponseCode = http.POST(httpRequestData);

    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    http.end();
    delay(5000);
  } else {
    Serial.println("WiFi Disconnected");
  }
}