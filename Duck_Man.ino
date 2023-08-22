#include <Keyboard.h>
#define sendInfoSound 2     // הגדרת פין שליחת סאונד
#define responsInfoSound 4  // הגדרת פין קבלת סאונד

float time, lengthDistance, firstChek, num;  //  משתנה טיים הוא לזמן,משתה דיסטאנס למרחק,משתנה נאם לחישובים
int numbersOfCheck[5];

void setup() {
  Serial.begin(9600);
  pinMode(sendInfoSound, OUTPUT);    // הגדרת המשתנה ששולח קול לאאוטפוט
  pinMode(responsInfoSound, INPUT);  // הגדרת המשתנה ששולח קול לאינפוט
  firstChek = chek();
}
void loop() {
  for (int i = 0; i<5; i++) {
  numbersOfCheck[i] = chek();  
  }  
  num = correctDistance(numbersOfCheck);  
  Serial.println(num);
  Serial.println(firstChek);
  if (num < (firstChek - 10)){
      Serial.println("up"); 
      /*Serial.println(num);
      Serial.println(firstChek);
    Keyboard.print("u") ;*/
  }
  if (num > (firstChek + 10)){
    Serial.println("down");
    /*Serial.println(num);
    Serial.println(firstChek);
    Keyboard.print("d");*/ 
  }
}  
int chek() {
  digitalWrite(sendInfoSound, LOW);  // איפוס פרמטרים של שליחה
  delayMicroseconds(2);
  digitalWrite(sendInfoSound, HIGH);  // שליחת פולס סאונד למדידה
  delayMicroseconds(10);
  digitalWrite(sendInfoSound, LOW);        // סיום שליחת הפולס
  time = pulseIn(responsInfoSound, HIGH);  // הגדרת המשתנה טיים לשווי מדידת הפולס
  lengthDistance = time / 29 / 2;          // חישוב המרחק ע"י נוסחה קבועה מראש
  delay(300);  // דיליי בין בדיקות
  return lengthDistance;
}
int correctDistance( int pulsArry []){
  int best = 0; 
  int lower = 0;
  int avgResponse = 0;
  best  = pulsArry[0];
  lower = pulsArry[0];
  for (int i = 0 ; i<5  ; i++) {
    if(pulsArry [i] > best){
      best = pulsArry [i] ;
    }
     if(pulsArry [i] < lower){
      lower = pulsArry [i] ;
    }
  }  
   for (int i = 0 ; i< 5  ; i++) {  
     avgResponse += pulsArry[i];
  } 
  avgResponse-= best;
  avgResponse-= lower;
  return avgResponse /3; 
}
/*Serial.println(avgResponse);
     Serial.println("avg1");
    Serial.println(best);
    Serial.println("b");
    Serial.println(lower);
    Serial.println("luo");
    avgResponse = avgResponse /3;
    Serial.println(avgResponse);  
    Serial.println("avg");
    Serial.println("..................................");*/
