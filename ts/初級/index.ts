// 1-1
type hw = 'hello world';
const message: hw = 'hello world';
console.log(message);


// 1-2
interface Todo {
  title: string;
  description: string;
}

// 型を引数に型を作る型関数
type MyReadOnly<T> = {
  readonly [k in keyof T]: T[k]
}

// 組み込みユーティリティー型を使えばこのように書ける
type MyReadonlyUtil = Readonly<Todo>;

const todo: MyReadOnly<Todo> = {
title: 'hello',
  description: 'world',
};


//1-3
// TypeScriptのタプルは、1つの変数に異なる型の要素を固定数で格納したものです。タプルは配列と似ていますが、タプル内の各要素は特定の型を持っています。
// https://note.affi-sapo-sv.com/typescript-tuple-types.php#:~:text=TypeScript%E3%81%AB%E3%81%AF%E3%82%BF%E3%83%97%E3%83%AB%E5%9E%8B,%E3%81%8C%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8%E3%81%A8%E3%81%97%E3%81%A6%E8%BF%91%E3%81%84%E3%81%A7%E3%81%99%E3%80%82
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type Length<T extends any[]> = T['length']

type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5


// 1-4
// T['tesla']ってやると、teslaの型が取れる
// T[number]はTを展開した全ての型をとって、union型が帰ってくると思われ(string | number | ...)
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
type List = [string, number, boolean];
const tuple2: List = ['tesla', 23, true];

type TupleToObject <T extends readonly any[]> = {
  // T[number]で'tesla' | 'model 3' | 'model X' | 'model Y'のUnion型になる。
  [K in T[number]]: K
}
type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
type result2 = TupleToObject<typeof tuple2>


// 1-7
interface Todo2 {
  title: string
  description: string
  completed: boolean
}

/* _____________ ここにコードを記入 _____________ */

type MyPick<T, K extends string> = {
  [k in K]: k extends keyof T ? T[k] : never;
}

type TodoPreview = MyPick<Todo2, 'title' | 'completed'>
type TodPreviewUtil = Pick<Todo2, 'title' | 'completed'>

const todo2: TodoPreview = {
  title: 'Clean room',
  completed: false,
}



//  1-9, infer
// Promise<T>のTを取り出したい。
// type MyAwaited<T extends Promise<any>> = T extends Promise<infer U> ? U : never
type MyAwaited<T> = T extends Promise<infer U> ? U : never

type ExampleType = Promise<string>

type result3 = MyAwaited<ExampleType> // string



// 1-11, include
// SがT[number]に含まれているかで判定、T[number]とすることで、タプルTをUnionに変換できるので、extendsによるjudgeが可能になる。
type Includes<T extends any[], S> = S extends T[number] ? true : false
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`


// 1-12, Parameters
const foo = (arg1: string, arg2: number): void => {}
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
// この型は、Tが関数の場合は、関数の引数の型を返します。
// ...argsを使うことで、関数の可変長引数を配列として受け取ることができます。



 46 changes: 46 additions & 0 deletions46  
ts/中級/index.ts
@@ -0,0 +1,46 @@
// 2-1
// https://zenn.dev/nbr41to/articles/7d2e7c4e31c54c#conditional-type%E3%81%A8%E3%81%97%E3%81%A6%E3%81%AEextends
// LookUpを実装してください

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type LookUp<T, U> = T extends { type: U} ? T : never;
type LookUp2<T, U> = T extends { type: infer U} ? U :never;

type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
type MyDog2 = LookUp2<Cat | Dog, 'dog'> // expected to be `Dog`


// 2-2、再起的な肩作り
// あくまでshallow参照なので、再起的に自身の型を参照してもよき
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}


type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}

type Todo = DeepReadonly<X> // should be same as `Expected`
