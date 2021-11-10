# CH3. 객체

# 1. 구문

- **리터럴 형식**
    - 한 번에 여러 개의 key/value를 추가할 수 있다.
    
    ```jsx
    const object = {
      key: 'value',
    };
    ```
    
- **생성자 형식**
    - 한 번에 한 프로퍼티만 추가할 할 수 있다.
    - 생성자형식으로 객체를 만드는 일은 거의 없다.
    
    ```jsx
    const object = {
      key: 'value',
    };
    
    const object2 = new Object();
    object2.key = 'value';
    ```
    

# 2. 타입

- 자바스크립트의 주요 타입
    - null
    - undefined
    - boolean
    - number
    - string
    - object
    - symbol (ES6에서 추가)
- Simple Primitive
    - null, undefined, boolean, number, string
    - `typeof null` 의 반환값은 'object'이지만, 이는 언어 자체의 버그이다. null은 객체가 아니다.
        
        ```jsx
        > typeof null
        'object'
        ```
        
- Complex Primitive
    - 객체 하위 타입(Sub Type)
    - function이 객체 하위 타입이다.
    - 자바스크립트에서 `함수는 일급객체`이다.
        - 다른 함수에 인자로 전달할 수 있다.
        - 함수의 반환값이 될 수 있다.
        - 함수 자체를 변수에 할당하거나 자료구조에 저장할 수 있다.

## 2.1 내장 객체

- 객체 하위타입
- 내장 객체의 종류
    - String
    - Number
    - Boolean
    - Object
    - Function
    - Array
    - Date
    - RegExp
    - Error
- 내장 객체는 **생성자(Constructor)**로 사용되어, 하위 타입의 **새 객체**를 생성한다.
    
    `String` 을 예로 들어 보자.
    
    String을 생성자로 호출한 반환값을 저장한 stringObject의 타입은 string이 아닌 "object"임을 알 수 있다. 
    
    ```jsx
    const stringPrimitive = 'string primitive';
    const stringObject = new String('string object');
    
    console.log(typeof stringPrimitive); // string
    console.log(typeof stringObject); // object
    ```
    
    `instanceof` 연산자는 객체의 프로토타입 체인에 생성자의 prototype이 있는지를 확인해주는 연산자이다. 
    
    이 instanceof를 통해, 객체가 해당 프로토타입에 속해있는지를 확인할 수 있다.
    
    ```jsx
    console.log(stringPrimitive instanceof String); // false
    console.log(stringObject instanceof String); // true
    ```
    
    이를 통해, 리터럴 형식으로 만든 stringPrimitive는 String을 생성자로 만든 객체가 아니지만, stringObject는 String을 생성자로 하여 만든 객체임을 알 수 있다. 
    
    실제로 stringPrimitive의 프로토타입 체인은 String 생성자의 prototype과 일치한다.
    
    ```jsx
    stringPrimitive.__proto__ === String.prototype // true
    ```
    
- 자동 강제 변환
    - 리터럴 형식으로 만든 primitive value는 객체가 아니고, 불변(immutable)하다.
        
        하지만, 자바스크립트 엔진이 상황에 맞게 primitive value를 String 객체로 자동변환해주므로, String의 메서드를 사용할 수 있다. 
        
        ```jsx
        const stringPrimitive = 'string primitive';
        
        console.log(stringPrimitive.substring(6)); // primitive
        console.log(stringPrimitive.length); // 16
        ```
        
- Objects, Arrays, Function, RegExps는 리터럴/생성자와 관계없이 모두 객체이다.
    
    ```jsx
    const objectLiteral = { num: 1 };
    const object = new Object();
    
    console.log(objectLiteral instanceof Object); // true
    console.log(object instanceof Object); // true
    
    const arrayLiteral = [1, 2, 3];
    const array = new Array();
    
    console.log(arrayLiteral instanceof Object); // true
    console.log(array instanceof Object); // true
    
    const functionLiteral = function () { return 0; };
    function func() {
      return 0;
    }
    
    console.log(functionLiteral instanceof Object); // true
    console.log(func instanceof Object); // true
    
    const regexLiteral = /\d/i;
    const regex = new RegExp('\\d', 'i');
    
    console.log(regexLiteral instanceof Object); // true
    console.log(regex instanceof Object); // true
    ```