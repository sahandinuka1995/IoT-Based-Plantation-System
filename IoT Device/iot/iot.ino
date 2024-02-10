#include "ESP8266WiFi.h"
#include "ThingSpeak.h"

const char* ssid = "Galaxy S22";          //Wifi SSID
const char* password = "sahan826076";     //Wifi Password
const char* host = "api.thingspeak.com";  //host

unsigned long chanelId = 2412416;  // Enter Write Channel key from ThingSpeak

const char* writeAPIkey = "S32HREE9BCOPNARZ";  // Enter Write API key from ThingSpeak
const char* readAPIkey = "NLO6SZDQ1ATF602Y";   // Enter Read API key from ThingSpeak

WiFiClient client;
long nitrogen;
long phosphorus;
long potassium;
long temperature;
long humidity;
long ph;
long rainfall;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("*");
  }

  Serial.println("");
  Serial.println("WiFi connection Successful");
  Serial.print("The IP Address of ESP8266 Module is: ");
  Serial.print(WiFi.localIP());  // Print the IP address

  ThingSpeak.begin(client);
  Serial.println("Thingspeak Connected");
  Serial.println("");
}

void loop() {
  nitrogen = random(10, 15);
  phosphorus = random(10, 15);
  potassium = random(12, 16);
  temperature = random(30, 35);
  humidity = random(26, 30);
  ph = random(5, 8);
  rainfall = random(100, 120);

  ThingSpeak.setField(1, nitrogen);
  ThingSpeak.setField(2, phosphorus);
  ThingSpeak.setField(3, potassium);
  ThingSpeak.setField(4, temperature);
  ThingSpeak.setField(5, humidity);
  ThingSpeak.setField(6, ph);
  ThingSpeak.setField(7, rainfall);

  int respons = ThingSpeak.writeFields(chanelId, writeAPIkey);

  if (respons == 200) {
    Serial.println("Data upload sucessful");
  } else {
    Serial.println("Data upload unsucessful");
  }
  Serial.println("======================================");
  delay(15000);
}
