function testDecorator<T extends new (...args: any[]) => any> (constructor: T) {
  return 
}

@testDecorator

class Test {}

const test = new Test()