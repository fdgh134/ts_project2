function greet(name: string): string {
  return `안녕, ${name}!`;
}

const myname = "유민";
const greeting = greet(myname);
console.log(greeting);

// 유틸리티 타입

// Partial<T>
// T의 모든 속성을 선택적으로 만듬
// 기존 타입의 일부 속성만 제공하는 객체를 쉽게 생성할 수 있음
interface Person {
  name: string;
  age: number;
}
const updatePerson = (person: Person, fields: Partial<Person>): Person => {
  return { ...person, ...fields };
};
const person: Person = { name: "Spartan", age: 30 };
const changedPerson = updatePerson(person, { age: 31 });

// Person은 name, age 속성으로 구성
// updatePerson 함수의 2번째 인자로 Partial<Person> 타입의 fields를 받고 있음
// 이 field라는 인자가 구성될 수 있는 경우는 다음과 같다.
// - name이라는 속성만 있어도 됨
// - age라는 속성만 있어도 됨
// - name, age 둘 다 있어도 됨
// - 이 밖의 상황은 허용되지 않음
// 이렇게 Partial<T> 타입으로 유연하게 타입의 속성을 선택해서 객체를 만들 수 있음

// Required<T>
// Partial<T>와 반대로 타입 T의 모든 속성을 필수적으로 만듬
// T 타입 객체에 정의된 모든 속성이 전부 제공되는 객체를 생성할 때 사용

interface Person2 {
  name: string;
  age: number;
  address?: string; // 뒤에 붙은 ?는?
}
// ?는 선택적 속성
// 있어도 되고 없어도 되는 속성이라는 뜻
// 하지만, address를 필수적으로 받아야 하는 제약사항이 있다고 할 때 아래와 같이 할 수 있음
type RequiredPerson = Required<Person2>;

// Readonly<T>
// 타입 T의 모든 속성을 읽기 전용으로 만듦
// 완전 불변 객체로 취급 가능

interface DatabaseConfig {
  host: string;
  readonly port: number; // 인터페이스에서도 readonly 타입 사용 가능
}
const mutableConfig: DatabaseConfig = {
  host: "localhost",
  port: 3306,
};
const immutableConfig: Readonly<DatabaseConfig> = {
  host: "localhost",
  port: 3306,
};
mutableConfig.host = "somewhere";
immutableConfig.host = "somewhere"; // 오류

// DatabaseConfig는 불변 객체라 할 수 없음. 왜냐, host가 readonly가 아니기 때문
// 하지만 Readonly<T> 타입으로 불변 객체로 만들 수 있다.


// Pick<T,K>
// 타입 T에서 K속성들만 선택하여 새로운 타입을 만듬
// 일부 속성만을 포함한 객체를 쉽게 생성
interface Person3 { 
  name: string; 
  age: number; 
  address: string; 
  } 
  type SubsetPerson = Pick<Person3, "name" | "age">; 
  const person3: SubsetPerson = { name: "Spartan", age: 30 };

  // subsetperson은 Person3 인터페이스에서 name, age 속성만 선택해서 구성된 새로운 타입


  // Omit<T,K>
  // 타입 T에서 K속성들만 제외한 새로운 타입 생성
  // 특정 속성을 제거한 새로운 타입 생성
  interface Person4 { 
    name: string; 
    age: number; 
    address: string; 
    } 
    type SubsetPerson2 = Omit<Person, "address">; 
    const person4: SubsetPerson2 = { name: "Alice", age: 30 };