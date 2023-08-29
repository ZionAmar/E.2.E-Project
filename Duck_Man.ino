#include <Keyboard.h>
#define sendInfoSound_Ses1    2  
#define responsInfoSound_Ses1 3
#define sendInfoSound_Ses2    4   
#define responsInfoSound_Ses2 5 
#define btn 6
#define led 7

bool isLedOn;
int correntVal;
int lastVal;
bool controlLed;
unsigned long lastTimeMilis;
float time, lengthDistance, firstChek,num_ses1,num_ses2; 
int numbersOfCheck_ses1[4];
int numbersOfCheck_ses2[4];

void setup() { 
  Serial.begin(9600);
  pinMode(sendInfoSound_Ses1, OUTPUT);   
  pinMode(responsInfoSound_Ses1, INPUT);
  pinMode(sendInfoSound_Ses2, OUTPUT);   
  pinMode(responsInfoSound_Ses2, INPUT);
  pinMode(btn,INPUT_PULLUP);
  pinMode(led, OUTPUT);
  isLedOn = false;
  controlLed = false;
  lastTimeMilis = millis();
}

void loop() {
  /*for(int i = 0;i<4;i++){
  numbersOfCheck_ses1[i] = chekSensor_1(); 
  numbersOfCheck_ses2[i] = chekSensor_2(); 
  }
  num_ses1 = Avg_Ses1(numbersOfCheck_ses1);
  num_ses2 = Avg_Ses2(numbersOfCheck_ses2);*/
   correntVal = digitalRead(btn);
  if((correntVal == HIGH) &&( lastVal == LOW) && ( millis() - lastTimeMilis > 50)){
   lastTimeMilis = millis();
   toggle();
  }   
  lastVal = correntVal;


  num_ses1 = chekSensor_1();  
  num_ses2 = chekSensor_2(); 
  if(controlLed){
  if((num_ses1 > 50)&&(num_ses2 > 50)){
  Keyboard.print(" ") ;
  }
}
  

}
int chekSensor_1() {
  digitalWrite(sendInfoSound_Ses1, LOW); 
  delayMicroseconds(2);
  digitalWrite(sendInfoSound_Ses1, HIGH);   
  delayMicroseconds(10);
  digitalWrite(sendInfoSound_Ses1, LOW);       
  time = pulseIn(responsInfoSound_Ses1, HIGH);  
  lengthDistance = time / 29 / 2;          
  delay(3);        
  return lengthDistance;
}
int chekSensor_2() {
  digitalWrite(sendInfoSound_Ses2, LOW); 
  delayMicroseconds(2);
  digitalWrite(sendInfoSound_Ses2, HIGH);   
  delayMicroseconds(10);
  digitalWrite(sendInfoSound_Ses2, LOW);       
  time = pulseIn(responsInfoSound_Ses2, HIGH);  
  lengthDistance = time / 29 / 2;          
  delay(3);        
  return lengthDistance;
}
void toggle(){
  if(isLedOn){
    ledOff();
    isLedOn = false;
  }else{
    ledOn();
    isLedOn = true;
  }
}
void ledOn() {
  digitalWrite(led, HIGH);
  controlLed = true;
}

void ledOff() {
  digitalWrite(led, LOW);
    controlLed = false;
}
  



int Avg_Ses1( int pulsArry []){
  int best = 0; 
  int lower = 0;
  int avgResponse = 0;
  best  = pulsArry[0];
  lower = pulsArry[0];
  for (int i = 0 ; i<4 ; i++) {
    if(pulsArry [i] > best){
      best = pulsArry [i] ;
    }
     if(pulsArry [i] < lower){
      lower = pulsArry [i] ;
    }
  }  
   for (int i = 0 ; i< 4  ; i++) {  
     avgResponse += pulsArry[i];
  } 
  avgResponse-= best;
  avgResponse-= lower;
  return avgResponse / 2; 
}
int Avg_Ses2( int pulsArry []){
  int best = 0; 
  int lower = 0;
  int avgResponse = 0;
  best  = pulsArry[0];
  lower = pulsArry[0];
  for (int i = 0 ; i<4  ; i++) {
    if(pulsArry [i] > best){
      best = pulsArry [i] ;
    }
     if(pulsArry [i] < lower){
      lower = pulsArry [i] ;
    }
  }  
   for (int i = 0 ; i< 4  ; i++) {  
     avgResponse += pulsArry[i];
  } 
  avgResponse-= best;
  avgResponse-= lower;
  return avgResponse / 2; 
}


