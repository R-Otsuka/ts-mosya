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
