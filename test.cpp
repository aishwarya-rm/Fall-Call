#include "application.h"
#include "HttpClient/HttpClient.h"

/**
* Declaring the variables.
*/
unsigned int nextTime = 0;    // Next time to contact the server
HttpClient http;

// Headers currently need to be set at init, useful for API keys etc.
http_header_t headers[] = {
    //  { "Content-Type", "application/json" },
    //  { "Accept" , "application/json" },
    { "Accept" , "*/*"},
    { NULL, NULL } // NOTE: Always terminate headers will NULL
};

http_request_t request;
http_response_t response;

void setup() {
    Serial.begin(9600);
    pinMode(D7, INPUT);
}

void loop() {
    int val = digitalRead(D7);
    Serial.println(val);
    if (val == LOW) { // reverse input?
      // Request path and body can be set at runtime or at setup.
      request.hostname = "taisei.lib.id";
      request.port = 80;
      request.path = "/fallcall@0.0.1/?tel=2066613732/";


      // Get request
      http.get(request, response, headers);
      //Serial.print("Application>\tResponse status: ");
      //Serial.println(response.status);

      Serial.print("Application>\tHTTP Response Body: ");
      Serial.println(response.body);
    }
    delay(100);
}
