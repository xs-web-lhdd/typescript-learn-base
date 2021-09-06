#### 初阶 TS：

1、typescript 类型是一个静态类型，而 JavaScript 是一个动态类型

静态类型：定义类型了就不能变了，像 C Java 一样，数字不能赋值给字符串
动态类型：变量类型可以改变，可以先是数字，然后再赋值成字符串

typescript 不能直接运行，需要编译成 javascript 才能运行

##### typescript 带来了什么优势：

```js
function demo(data) {
  return Math.sqrt(data.x ** 2 + data.y ** 2);
}

demo();
```

这段代码其实写错了，但是不会编译器不会报错，但如果是 ts 那么就会在编译器里报错，这样就能帮助我们更容易发现错误

```js
function tsdemo(data: { x: number, y: number }) {
  return Math.sqrt(data.x ** 2 + data.y ** 2);
}

tsdemo();
```

其次 ts 代码语义化更强，那么就会在一定程度上帮助我们阅读代码，还有就是编译器会提示，那么写代码的时候就会很爽

##### 基础环境搭建

1、下载 node.js
2、打开 vsCode 设置将 qotue 中 typescript 改为 single，tab 改为 2
3、安装自动格式化插件 Prettier Code
4、打开设置勾选 formate
5、安装 typescript

```base
npm install typescript@3.6.4 -g
```

运行：tsc xxx.ts
然后会生成一个 xxx.js 文件 然后运行 node xxx.js 即可

简化过程：
安装工具：

```base
npm install -g ts-node@8.4.1
```

运行：ts-node xxx.ts

##### 静态类型：

```js
interface Point {
  x: number;
  y: number;
}

const point: Point = {
  x: 3,
  y: 4,
};
```

##### 基本类型和对象类型：

```js
// 基础类型 number string null undefined symbol boolean void
let count: number;
const teacher: string = "Dell";
// 对象类型：数组类型、类类型、函数类型
const message: {
  name: string,
  age: number,
} = {
  name: "Dell",
  age: 18,
};
// 数组类型
const numbers: number[] = [1, 3, 4];
// 类类型
class Person {}
const Dell: Person = new Person();
// 函数类型
const getTotal: () => number = () => {
  return 123;
};
```

##### 类型推断和类型注解：

类型注解：我们来告诉 ts 变量是什么类型，如：

```js
let count: number;
count = 123;
```

类型推断：ts 会自动的去尝试分析变量的类型，如：

```js
let countInference = 123;
```

如果 TS 能够自动分析变量类型，我们就什么也不需要做，如果不能自动分析变量类型，我们就需要进行类型注解

```js
const firstNumber = 1;
const secondNumber = 2;
const total = firstNumber + secondNumber;
// 这个例子中 TS 能自动推断出total是number，那么我们就不需要写类型注解了
```

```js
function getTotal(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}
const total = getTotal(1, 2);
// 像这种鼠标放上去没显示类型就需要进行类型注解了
```

改进后代码：

```js
function getTotal(firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber;
}
const total = getTotal(1, 2);
```

##### 函数相关类型：

```js
function add(first: number, second: number): number {
  return first + second;
}

// void：该函数不能有返回值
function sayHello(): void {
  console.log("123");
}

// never：该函数永远都不能被执行完
function errorEmitter(): never {
  throw Error();
  console.log(123);
}

// 结构赋值类型注解 --- 在后面进行类型注解
function add({ first, second }: { first: number, second: number }): number {
  return first + second;
}
const total = add({ first: 1, second: 2 });
```

##### 特殊走位:

1 基本类型放两行后就没法进行类型推断了:

```js
let a = 1;
let b;
b = 1;
```

那么就需要写类型注解了:

```js
let b: number;
b = 1;
```

函数的两种写法:

```js
const func = (str: string): number => {
  return parseInt(str, 10);
};

const add: (str: string) => number = (str) => {
  return parseInt(str, 10);
};
```

在这个例子中有一个细节就是第一个函数如果 TS 能自动推断出类型那可以不写 number,但是第二种就不能不写 number,因为如果第二种不写那格式上就是错误的

```js
let tmp = 123;
tmp = "123";
```

有时候我们需要刚开始 tmp 是数字后来需要是字符串,那么上面写法就报错了,正确写法:

```js
let tmp: number | string = 123;
tmp = "123";
```

##### 数组和元组:

数组:

```js
// 存基础数据类型:
const arr: (number | string)[] = [1, "2", 3];
// 存对象类型:
const objectArr: { name: string, age: number }[] = [
  {
    name: "Dell",
    age: 19,
  },
];
```

但鉴于上面类型对象类型数组不易识别就用 type alias 类型别名

```js
type User = { name: string, age: number };
const objectArr: User[] = [
  {
    name: "Dell",
    age: 19,
  },
];
```

也可以通过类进行简易识别:

```js
class Person {
  name: string;
  age: number;
}
const objectArr: Person[] = [
  {
    name: "Dell",
    age: 19,
  },
];
```

元组:
数组只能约束数组里面元素的类型,而不能约束每一个元素的具体的类型,但是元组就可以

```js
const teacherInfo: [string, string, number] = ["dell", "male", 19];
// 这里面每一个元素与类型一一对应
```

##### interface 接口:

```js
const getPersonName = (person: { name: string }) => {
  console.log(person.name);
};
const setPersonName = (person: { name: string }, name: string) => {
  person.name = name;
};
```

像这个例子,里面 person 里面都有一个类型为 string 的 name 那么就可以提出来,用 interface 来定义

```js
interface Person {
  name: string;
}
const getPersonName = (person: Person) => {
  console.log(person.name);
};
const setPersonName = (person: Person, name: string) => {
  person.name = name;
};
```

当然也可可以用类型别名:

```js
type Person1 = {
  name: string,
};
const getPersonName = (person: Person1) => {
  console.log(person.name);
};
const setPersonName = (person: Person1, name: string) => {
  person.name = name;
};
```

两者(类型别名和 interface)有点差别,但是差别不大,如:

```js
// 类型别名可以直接是字符串,但是interface就不行,它只能代表一个对象或者函数,但是不能代表基础类型
type Person1 = string;
// 通常在 TS 中能用interface就用interface，用不了的时候才用类型别名
```

看下面代码：

```js
interface Person {
    name: string
    age: number
}
const getPersonName = (person : Person): void => {
    console.log(person.name)
}
const setPersonName = (person: Person, name: string): void => {
    person.name = name
}

const person = {
    name: 'Dell'
}
getPersonName(person)
setPersonName(person, 'lee')
```

因为 perosn 中没有 age，所以就无法通过类型校验，那么 TS 就会报错，那么可以通过?来书写可有可无的属性，如：

```js
interface Person {
    name: string
    age?: number
}
const getPersonName = (person : Person): void => {
    console.log(person.name)
}
const setPersonName = (person: Person, name: string): void => {
    person.name = name
}

const person = {
    name: 'Dell'
}
getPersonName(person)
setPersonName(person, 'lee')
```

在 age 后面加一个?即可
readonly 只读属性：

```js
interface Person {
    readonly name: string
    age?: number
}
const getPersonName = (person : Person): void => {
    console.log(person.name)
}
const setPersonName = (person: Person, name: string): void => {
    person.name = name
}

const person = {
    name: 'Dell'
}
getPersonName(person)
setPersonName(person, 'lee')
```

加上 readonly 属性后 setPersonName 就会报错，因为 readonly 限定只能读不能修改值

字面量会进行强校验

```js
interface Person {
    name: string
    age?: number
}
const getPersonName = (person : Person): void => {
    console.log(person.name)
}
const setPersonName = (person: Person, name: string): void => {
    person.name = name
}

const person = {
    name: 'Dell',
    sex: 'male'
}
getPersonName(person)
setPersonName(person, 'lee')
```

这个里面 person 里面多了个 sex，但不会报错，但是直接写入就会报错：

```js
interface Person {
    name: string
    age?: number
}
const getPersonName = (person : Person): void => {
    console.log(person.name)
}
const setPersonName = (person: Person, name: string): void => {
    person.name = name
}

const person = {
    name: 'Dell',
    sex: 'male'
}
getPersonName({
    name: 'Dell',
    sex: 'male'
})
// 这时就会报错，因为采用对象字面量的方式直接赋值的时候TS会进行强校验，因为Person中没有sex，所以会报错
setPersonName(person, 'lee')
```

```js
interface Person {
    name: string
    age?: number
    // 可以有其他属性，属性名是一个字符串，值可以是任何类型
    [propName: string]: any
}
const getPersonName = (person : Person): void => {
    console.log(person.name)
}
const setPersonName = (person: Person, name: string): void => {
    person.name = name
}

const person = {
    name: 'Dell',
    sex: 'male'
}
getPersonName({
    name: 'Dell',
    sex: 'male'
})
// 这样就不会报错了
setPersonName(person, 'lee')
```

接口中不仅可以有属性，也可以有方法：

```js
interface Person {
    name: string
    age?: number
    // 可以有其他属性，属性名是一个字符串，值可以是任何类型
    [propName: string]: any
    say(): string
}
const getPersonName = (person : Person): void => {
    console.log(person.name)
}
const setPersonName = (person: Person, name: string): void => {
    person.name = name
}

const person = {
    name: 'Dell',
    sex: 'male',
    say() {
        return 'say hello'
    }
}
getPersonName(person)
setPersonName(person, 'lee')
```

类使用接口：

```js
// 类使用接口的时候必须使用接口内属性和方法
class User implements Person {
  name: "Lee";
  say() {
    return "say";
  }
}
```

interface 之间的继承：要求要有老的属性也要有新的属性

```js
interface Person {
    name: string
    age?: number
    // 可以有其他属性，属性名是一个字符串，值可以是任何类型
    [propName: string]: any
    say(): string
}

// interface继承
interface Teacher extends Person {
    teach(): string
}
const getPersonName = (person : Person): void => {
    console.log(person.name)
}
const setPersonName = (person: Teacher, name: string): void => {
    person.name = name
}

const person = {
    name: 'Dell',
    sex: 'male',
    say() {
        return 'say hello'
    },
    teach() {
        return 'teacher'
    }
}
getPersonName(person)
// 如果person中没有teach那么就会报错
setPersonName(person, 'lee')
```

interface 应用于函数声明：

```js
// 接口代表函数类型声明 --- 函数名称叫 SayHi接收一个word的参数，返回值是一个string类型
interface SayHi {
  (word: string): string;
}
const say: SayHi = (word: string) => {
  return word;
};
```

###### 接口只是我们书写 TS 时帮助我们语法校验或提示的工具并不会变成正真的 javascript 语法

##### 类的定义与继承：

```js
class Person {
  name = "Dell";
  getName() {
    return this.name;
  }
}

class Teacher extends Person {
  getTeacherName() {
    return "Teacher";
  }
  getName() {
    return super.getName() + "lee";
  }
  // super用法：当子类的方法覆盖父类的方式然而子类又想使用父类的方法时就可以使用super这个关键字
}

const person = new Person();
const teacher = new Teacher();
console.log(person.getName());
console.log(teacher.getName());
```

##### 类中的访问类型和构造器：

1、public 允许在类内外被调用（Person 括号内的就是类内，除此之外就是类外）

```js
class Person {
  name: string;
  sayHi() {
    return "Hi";
  }
}
const person = new Person();
person.name = "Dell";
console.log(person.name);
console.log(person.sayHi());
```

像上面的那种其实就是共有属性，就相当于：

```js
// 默认前面有一个public
class Person {
    public name: string
    public sayHi() {
        return 'Hi'
    }
}
const person = new Person()
person.name = 'Dell'
console.log(person.name);
console.log(person.sayHi());
```

2、private 允许被类内被使用

```js
class Person {
    private name: string
    public sayHi() {
        return 'Hi'
    }
}
const person = new Person()
person.name = 'Dell' // name只允许在类内被使用，因此在类外赋值时会报错
console.log(person.name);
console.log(person.sayHi());
```

3、protected 允许在类内及继承的子类中使用：

```js
class Person {
    protected name: string
    public sayHi() {
        this.name = 'dell'
        return 'Hi'
    }
}
const person = new Person()

class Teacher extends Person {
    public sayBye() {
      // 如果上面是provate那么这里就会报错
        this.name
    }
}
```

构造器：

先看一段代码：

```js
// 复杂写法：
class Person {
    public name: string
    constructor(name: string) {
        this.name = name
    }
}
const person = new Person('dell')
console.log(person.name);
// 快捷写法：
class Person {
    constructor(public name: string) {
    }
}
const person = new Person('dell')
console.log(person.name);
// 这两种语法是等价的
```

当子类有构造器继承父类（父类不管有无构造器）时，需要手动调用父类的构造器，通过 super()调用，无非是当父类无构造器时需要调用空的 super()，父类有构造器时需要往里面传值

```js
class Person {
    constructor(public name: string) {}
}
class Teacher extends Person {
    constructor(age: number) {
        // super()代表在调用父类的构造函数
        super('dell')
    }
}

const teacher = new Teacher(28)
```

##### 静态属性、Setter、Getter：

```js
class Person {
  constructor(private name: string) {}
}
const person = new Person('dell')
person.name
```

###### get：

根据上面所学知识我们易知道这种写法是会报错的（name 是私有属性不能在类外被调用），但如果想调用 name 怎么办？就可以用 get 这个静态属性：

```js
class Person {
  constructor(private name: string) {}
  get getName() {
    return this.name
  }
}

const person = new Person('dell')
console.log(person.getName);
// 这样间接调用getName这个属性就可以被外部调用（getName是一个属性不是方法不需要加括号）
```

###### set：

```js
class Person {
  constructor(private _name: string) {}
  get getName() {
    return this._name + ' lee'
  }
  set setName(name: string) {
    const realName = name.split(' ')[0]
    this._name = realName
  }
}

const person = new Person('dell')
person.setName = 'dell lee'
console.log(person.getName);
// 用 set 可以保护内部私有变量，这样看似在内部设置了name为dell lee实则设置的是dell
```

###### 单例设计模式：

```js
// 单例模式
class Demo {
  private static instance: Demo
  private constructor (public name: string) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Demo('dell lee')
    }
    return this.instance
  }
}

const demo1 = Demo.getInstance()
const demo2 = Demo.getInstance()
console.log(demo1.name)
console.log(demo2.name)
```

###### readonly:

只能读不能改

```js
class Person {
  public readonly name: string
  constructor(name: string) {
    this.name = name
  }
}

const person = new Person('Dell')
console.log(person.name)
```

###### 抽象类：

#### 进阶 TS：

##### 联合类型和类型保护：

```js
interface Bird {
    fly: Boolean
    sing: () => {}
}

interface Dog {
    fly: Boolean
    bark: () => {}
}
// 像 animal: Bird | Dog 这种的就是联合类型（用或将其合起来）

// 通过类型断言---对 TS 采用类型保护
function trainA(animal: Bird | Dog) {
    if (animal.fly) {
        (animal as Bird).sing()
    } else {
        (animal as Dog).bark()
    }
}

function trainB(animal: Bird | Dog) {
    if ('sing' in animal) {
        animal.sing()
    } else {
        animal.bark()
    }
}
```

```js
// typeof 语法进行类型保护
function add(first: string | number, second: string | number) {
  if (typeof first === "string" || typeof second === "string") {
    return `${first}${second}`;
  }
  return first + second;
}

// 使用 instanceof 来进行类型保护（记得要用类，而不是interface）
// interface不能使用instanceof只有类能使用instanceof
class NumberObj {
  count: number;
}

function addOne(first: Object | NumberObj, second: Object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}
```

##### Enum 枚举类型：

```js
// 当枚举里面没有声明具体的值的时候会自动从0开始往后延顺
enum Status {
    OFFLINE,
    ONLINE,
    DELETE
}

console.log(Status.OFFLINE); // 0
console.log(Status.ONLINE);  // 1
console.log(Status.DELETE);  // 2

// 当有值时会从值开始往后延顺-1
enum Status {
    OFFLINE = 100,
    ONLINE,
    DELETE
}

console.log(Status.OFFLINE); // 100
console.log(Status.ONLINE);  // 101
console.log(Status.DELETE);  // 102
// 默认开始值是 - 0
enum Status {
    OFFLINE,
    ONLINE = 100,
    DELETE
}

console.log(Status.OFFLINE); // 0
console.log(Status.ONLINE);  // 100
console.log(Status.DELETE);  // 101
```

反向映射：

```js
enum Status {
    OFFLINE,
    ONLINE = 100,
    DELETE
}
console.log(Status[0]); // OFFLINE
console.log(Status[100]); // ONLINE
console.log(Status[101]); // DELETE
```

应用：常常用于这种固定值的场景

```js
enum Status {
    OFFLINE,
    ONLINE,
    DELETE
}

function getResult(status: number) {
    if (status === Status.OFFLINE) {
        return 'offline'
    } else if (status === Status.ONLINE) {
        return 'online'
    } else if (status === Status.DELETE) {
        return 'delete'
    } else {
        return 'error'
    }
}

const result = getResult(Status.OFFLINE)
console.log(result);
```

##### 泛型：

函数中使用泛型：

```js
// 先看一个例子：
function join(first: string | number, second: string | number) {
  return `${first}${second}`;
}

join(1, 1);

// 现要求：两者类型保持一致（要么都是字符串要么都是数字）就需要使用泛型
// 泛型 generic 泛指的类型

function joinOne<ABC>(first: ABC, second: ABC) {
  return `${first}${second}`;
}

// 像这种类型就是泛型 --- 泛型只有在用的时候才知道是什么类型
const result = joinOne < string > ("1", "1");
console.log(result);
```

泛型传数组：

```js
function map<ABC>(params: ABC[]) {
  return params;
}
map < string > ["1", "2"];

或者：

function map<ABC>(params: Array<ABC>) {
    return params
}
map<string>(['1', '2'])
```

```js
function joinOne<T, P>(first: T, second: P) {
  return `${first}${second}`;
}

// 显式指出每一个参数的类型
joinOne < string, number > ("1", 1);
// 不指出参数类型时 ts 底层也会自动推断出类型
joinOne("1", 3);
```

类中使用泛型：

```js
// 类中最基本的类型：
class DataManagerOne<T> {
    constructor(private data: T[]) {}
    getItem(index: number): T {
        return this.data[index]
    }
}
const dataOne = new DataManagerOne<string>(['1'])
const dataSecond = new DataManagerOne<number>([1])
```

类中泛型的继承：

```js
// 继承于interface
interface item {
    name: string
}

class DataManagerOne<T extends item> {
    constructor(private data: T[]) {}
    getItem(index: number): string {
        return this.data[index].name
    }
}
const dataOne = new DataManagerOne([{
    name: 'dell'
}])
```

```js
// 泛型继承于基础类型
class DataManagerOne<T extends number | string> {
    constructor(private data: T[]) {}
    getItem(index: number): T {
        return this.data[index]
    }
}
const dataOne = new DataManagerOne<number>([1])
```

##### 命名空间：
