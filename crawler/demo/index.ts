// 类的装饰器
// 装饰器本身就是一个函数
// 装饰器通过@符号进行装饰 --- 使用的时候需要在tsconfig.json中把 "experimentalDecorators": true,  打开
// 装饰器是对类进行修饰，只要类一创建装饰器就会执行
// 装饰器接收的参数是构造函数
// 先收集的装饰器会被最后执行

// function testDecorator (flag: boolean) {
//   if (flag) {
//     return function (constructor: any) {      
//       constructor.prototype.getName = () => {
//         console.log('liang');
//       }
//     }
//   } else {
//     return function (constructor: any) {}
//   }

// }

// @testDecorator(true)
// class Test {}

// const test = new Test()