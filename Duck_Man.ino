#define sendInfoSound 2     // הגדרת פין שליחת סאונד
#define responsInfoSound 4  // הגדרת פין קבלת סאונד

float time, lengthDistance, firstChek, num;  //  משתנה טיים הוא לזמן,משתה דיסטאנס למרחק,משתנה נאם לחישובים

void setup() {
  Serial.begin(9600);
  pinMode(sendInfoSound, OUTPUT);    // הגדרת המשתנה ששולח קול לאאוטפוט
  pinMode(responsInfoSound, INPUT);  // הגדרת המשתנה ששולח קול לאינפוט
  firstChek = chek();
  Serial.print("The initial distance of the Duckman is  =");  // הדפסת תבנית המרחק
  Serial.println(firstChek);                                  // הדפסת המרחק
}

void loop() {
  /*num = chek();
  if (num > firstChek +10){
    Serial.println("up"); 
  }
  if (num < firstChek -10){
    Serial.println("down");
    
  }*/
  //  אופציה ראשונית של זיהוי קפיצה והתכופפות בלבד

  num = chek();
  float sum = 100 * (num - firstChek) / firstChek;
  Serial.print(String(num) + " this is now chek, ");
  if (sum > 1 && sum < 20) {
    Serial.print(" small down ");
  }
  if (sum > 20 && sum < 40) {
    Serial.print(" down ");
  }
  if (sum > 40 && sum < 60) {
    Serial.print(" big down ");
  }
  if (sum < -1 && sum > -20) {
    Serial.print(" small jump ");
  }
  if (sum < -20 && sum > -40) {
    Serial.print(" jump ");
  }
  if (sum < -40 && sum > -60) {
    Serial.print(" big jump ");
  }

  Serial.println(String(sum) + "% this is the precent change");
}

int chek() {
  digitalWrite(sendInfoSound, LOW);  // איפוס פרמטרים של שליחה
  delayMicroseconds(2);
  digitalWrite(sendInfoSound, HIGH);  // שליחת פולס סאונד למדידה
  delayMicroseconds(10);
  digitalWrite(sendInfoSound, LOW);        // סיום שליחת הפולס
  time = pulseIn(responsInfoSound, HIGH);  // הגדרת המשתנה טיים לשווי מדידת הפולס
  lengthDistance = time / 29 / 2;          // חישוב המרחק ע"י נוסחה קבועה מראש

  delay(1000);  // דיליי בין בדיקות
  return lengthDistance;
}
