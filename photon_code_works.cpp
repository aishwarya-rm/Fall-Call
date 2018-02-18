// This #include statement was automatically added by the Particle IDE.
#include <HttpClient.h>

// Once you import this library into an app on the web based IDE, modify the code to look something like the following.
// This code is a heavily modified version of the MPU6050_raw.ino example found elsewhere in this repo.
// This code has been tested against the MPU-9150 breakout board from Sparkfun.

// This #include statement was automatically added by the Particle IDE.
#include "MPU6050.h"
#include <math.h>

int ledPin = D7;

// MPU variables:
MPU6050 accelgyro;
int16_t ax, ay, az;
int16_t gx, gy, gz;

HttpClient http;
http_header_t headers[] = {
    //  { "Content-Type", "application/json" },
    //  { "Accept" , "application/json" },
    { "Accept" , "*/*"},
    { NULL, NULL } // NOTE: Always terminate headers will NULL
};
http_request_t request;
http_response_t response;


bool ledState = false;
void toggleLed() {
    ledState = !ledState;
    digitalWrite(ledPin, ledState);
}

void setup() {
    pinMode(ledPin, OUTPUT);

    Wire.begin();
    Serial.begin(9600);
    
    Serial.println("Initializing I2C devices...");
    accelgyro.initialize();

    // Cerify the connection:
    Serial.println("Testing device connections...");
    Serial.println(accelgyro.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");
    
}

int fallMagnitudeThreshold = 15000;
int fallSessionsThreshold = 25;
int sessionsFallen = 0;

void loop() {
    // read raw accel/gyro measurements from device
    accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
    
    float magnitude = sqrt(ax * ax + ay * ay + az * az);
    if (magnitude >= fallMagnitudeThreshold && az < 0) {
        sessionsFallen++;
        if (sessionsFallen >= fallSessionsThreshold) {
            Serial.println("FALLEN");
            
            request.hostname = "taisei.lib.id";
              request.port = 80;
              request.path = "/fallcall@0.0.2/level1/";
        
        
              // Get request
              http.get(request, response, headers);
              //Serial.print("Application>\tResponse status: ");
              //Serial.println(response.status);
        
              // UNCOMMENT TO CHECK WHEN WE FALL
              Serial.print("Application>\tHTTP Response Body: ");
              Serial.println(response.body);
              
        }
    } else {
        sessionsFallen = 0;
    }
    
    Serial.print("magnitude: ");
    Serial.println(magnitude);
    
   
    // DO NOT UNCOMMENT
    // Serial.print("a/g:\t");
    // Serial.print(ax); Serial.print("\t");
    // Serial.print(ay); Serial.print("\t");
    // Serial.print(az); Serial.print("\t");
    // Serial.print(gx); Serial.print("\t");
    // Serial.print(gy); Serial.print("\t");
    // Serial.println(gz);
    
    toggleLed();
    
}
