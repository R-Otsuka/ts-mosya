// https://qiita.com/k-penguin-sato/items/e2791d7a57e96f6144e5

// Partial
interface Person {
  firstName: string,
  lastName: string,
  age: Number,
}

const taro: Partial<Person> = {
  lastName: 'taro',
}

console.log(taro);

// Requrired
interface Person2 {
  firstName?: string,
  lastName?: string,
}

const jiro: Required<Person2> = {
  firstName: 'jiro', // 必須
  lastName: 'jiro', // 必須
}

// Readonly
interface Todo {
  title: string
}

const todo: Readonly<Todo> = {
  title: 'todo',
}
console.log(todo);


// Record

// Pick

// Omit

// Exclude

// Extract

// NonNullable

// Parameters

// ConstructorParameters

// ReturnType
