# JavaScript重点笔记
## 一、基础篇

### 1.数据类型检测的方式有哪些
断数据类型的方法一般可以通过： `typeof`、`instanceof`、`constructor`、`toString`四种常用方法
1. typeof: 
    - 只能检测出除null外的基本数据类型和引用数据类型中的function
2. instanceof: 
    - 可以检测引用类型，但是不能检测基本数据类型，且不能跨iframe
3. constructor:
    - 可以检测除了null和undefined外的所有类型，constructor易被修改，也不能跨iframe
4. Object.prototype.toString.call: 
    - 可以检测所有类型，IE6以下null和undefined均为Object

### 2.判断数组的方式有哪些
- 通过Object.prototype.toString.call()做判断
- 通过ES6的Array.isArray()做判断
- 通过instanceof做判断
- 通过Array.prototype.isPrototypeOf
- 通过原型链做判断

### 3.isNaN 和 Number.isNaN 函数的区别
- 函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
```javascript
const test = 'abc';
isNaN(1) // false
isNaN(test) // true
```
- 函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，不会进行数据类型的转换，这种方法对于 NaN 的判断更为准确。
```javascript
const test = 'abc';
Number.isNaN(1) // false
Number.isNaN(test) // false
```

### 4.Object.is() 与比较操作符 “===” 的区别？
- 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。

### 5.如何判断 this 的指向
1. 第一种是函数调用模式，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。
2. 第二种是方法调用模式，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
3. 第三种是构造器调用模式，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
4. 第四种是 apply 、 call 和 bind 调用模式，这三个方法都可以显示的指定调用函数的 this 指向。其中 apply 方法接收两个参数：一个是 this 绑定的
   对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，
   其他情况下都不会改变。

### 5.Map和Object的区别
1. 键的类型	
    - Map的键可以是任意值，包括函数、对象或任意基本类型。
    - Object 的键必须是 String 或是Symbol。
2. 键的顺序
    - Map 中的 key 是有序的。因此，当迭代的时候， Map 对象以插入的顺序返回键值。
    - Object 的键是无序的。
3. Size
    - Map 的键值对个数可以轻易地通过size 属性获取. 
    - Object 的键值对个数只能手动计算。
4. 迭代
    - Map 是 iterable 的，所以可以直接被迭代. 
    - 迭代Object需要以某种方式获取它的键然后才能迭代。
5. 性能
    - Map在频繁增删键值对的场景下表现更好.
    - Object在频繁添加和删除键值对的场景下未作出优化。

### 6.String和JSON.stringify的区别
  - 当需要将一个数组和一个普通对象转换为字符串时，经常使用`JSON.stringif`。
  - 如果需要对象的`toString`方法被重写，则需要使用`String()`。
  - 在其他情况下，使用`String()`将变量转换为字符串。
```javascript
console.log(String({ key: "value" })); // [object Object]
console.log(JSON.stringify({ key: "value" })); // {"key":"value"}
​
const obj = {
    title: "devpoint",
    toString() {
        return "obj";
    },
};
console.log(String(obj)); // obj
console.log(JSON.stringify(obj)); // {"title":"devpoint"}
```

### 6.类数组转换成数组的方法有哪些
- 通过 call 调用数组的 slice 方法来实现转换
```javascript
const arrayLike= {
  0:'aaa',
  1:'bbb',
  length: 2
}
Array.prototype.slice.call(arrayLike);
```
- 通过 call 调用数组的 splice 方法来实现转换
```javascript
Array.prototype.splice.call(arrayLike, 0);
```
- 通过 apply 调用数组的 concat 方法来实现转换
```javascript
Array.prototype.concat.apply([], arrayLike);
```
- 通过 Array.from 方法来实现转换
```javascript
Array.from(arrayLike);
```

### 7.什么是尾调用，使用尾调用有什么好处
尾调用指的是函数的最后一步调用另一个函数。代码执行是基于执行栈的，所以当在一个函数里调用另一个函数时，会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话，因为已经是函数的最后一步，所以这时可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化。

### 8. for...in和for...of的区别
- for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
- for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；
**总结**： for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。推荐使用for of。

### 9.ajax、axios、fetch的区别
1. **AJAX** 它是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。
2. **Fetch** Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多。**fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象。**
3. **Axios** 是一种基于Promise封装的HTTP客户端，其特点如下：
    - 浏览器端发起XMLHttpRequests请求
    - node端发起http请求
    - 支持Promise API
    - 监听请求和返回
    - 对请求和返回进行转化
    - 取消请求
    - 自动转换json数据
    - 客户端支持抵御XSRF攻击

### 10.浅拷贝和深拷贝
常见的浅拷贝：
- Object.assign
- Object.create
- slice
- concat()
- 展开运算符

深拷贝:
- _.cloneDeep()
- jQuery.extend()
- JSON.stringify()
  缺点：
  1. 如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式，而不是对象的形式
  2. 如果obj里面有RegExp，则打印出来是空对象
  3. 如果对象中有函数或者undefined，则会直接被丢掉
  4. 如果json里有对象是由构造函数生成的，则会丢掉对象的constructon
- 手写循环递归
- structuredClone
  缺点：function和dom不行
  1.Functions (ordinary functions, arrow functions, classes, methods)
  2.DOM 节点DOM nodes

### 11. lodash常见的API
- _.cloneDeep 深度拷贝
- _.reject 根据条件去除某个元素。
- _.drop(array, [n=1] ) 作用：将 array 中的前 n 个元素去掉，然后返回剩余的部分.

### 11.includes 比 indexOf好在哪
ncludes可以检测`NaN`，indexOf不能检测`NaN`，includes内部使用了`Number.isNaN`对`NaN`进行了匹配

### 12.怎么让(a == 1 && a == 2 && a == 3) 是 true
**方案一：重写toString()或valueOf()**
```javascript
let a = {  
    i: 1,  
    toString: function () {    
        return a.i++;  
    }
}
console.log(a == 1 && a == 2 && a == 3); // true
```

**方案二：数组**
数组的toString接口默认调用数组的join方法，重写join方法。定义a为数字，每次比较时就会调用 toString()方法，我们把数组的shift方法覆盖toString即可：
```javascript
let a = [1,2,3];
a.toString = a.shift;
console.log(a == 1 && a == 2 && a == 3); // true
```

**方案三：使用Object.defineProperty()**
```javascript
var  _a = 1;
Object.defineProperty(this,'a',{  
    get:function(){    
        return _a++  
    }
})
console.log(a===1 && a===2 && a===3)//true
```

### 13.JS中的设计模式有哪些
- 创建型模式，共五种：**工厂方法模式**、抽象工厂模式、**单例模式**、建造者模式、**原型模式**。
- 结构型模式，共七种：**适配器模式**、**装饰器模式**、**代理模式**、外观模式、桥接模式、组合模式、享元模式。
- 行为型模式，共十一种：策略模式、模板方法模式、**观察者模式/发布订阅模式**、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。

**手写单例模式（创建模式）**
```javascript
let CreateSingleton = (function(){
    let instance;
    return function(name) {
        if (instance) {
            return instance;
        }
        this.name = name;
        return instance = this;
    }
})();
CreateSingleton.prototype.getName = function() {
    console.log(this.name);
}

//code test
let Winner = new CreateSingleton('Winner');
let Looser = new CreateSingleton('Looser');

console.log(Winner === Looser); // true
console.log(Winner.getName());  // 'Winner'
console.log(Looser.getName());  // 'Winner'
```

**手写观察者模式（行为模式）**
```javascript
// 定义observe
const queuedObservers = new Set();
const observe = fn => queuedObservers.add(fn);


const observable = obj => new Proxy(obj, {
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    // notify
    queuedObservers.forEach(observer => observer());
    return result;
  }
});


obj = observable({
  name:'123'
})

observe(function test(){
  console.log('触发了')
})

obj.name ="abc"
// 触发了
// abc
```

**手写发布订阅 （行为模式）**
```javascript
class Observer {
  caches = {}; // 事件中心

  // eventName事件名-独一无二, fn订阅后执行的自定义行为
  on(eventName, fn) {
    this.caches[eventName] = this.caches[eventName] || [];
    this.caches[eventName].push(fn);
  }

  // 发布 => 将订阅的事件进行统一执行
  emit(eventName, data) {
    if (this.caches[eventName]) {
      this.caches[eventName].forEach((fn) => fn(data));
    }
  }
  // 取消订阅 => 若fn不传, 直接取消该事件所有订阅信息
  off(eventName, fn) {
    if (this.caches[eventName]) {
      const newCaches = fn
        ? this.caches[eventName].filter((e) => e !== fn)
        : [];
      this.caches[eventName] = newCaches;
    }
  }
}

ob = new Observer();

l1 = (data) => console.log(`l1_${data}`)
l2 = (data) => console.log(`l2_${data}`)

ob.on('event1',l1)
ob.on('event1',l2)

//发布订阅
ob.emit('event1',789) 
// l1_789
// l2_789

// 取消，订阅l1
ob.off('event1',l1)

ob.emit('event1',567)
//l2_567
```
<!-- <iframe style="width:100%; height:80vh" src="https://stackblitz.com/edit/js-mj2ofc?file=index.js&view=editor"></iframe> -->

### 14.forEach如何跳出循环？
可以利用`try catch`
```javascript
function getItemById(arr, id) {
  var item = null;
  try {
    arr.forEach(function (curItem, i) {
      if (curItem.id == id) {
        item = curItem;
        throw Error();
      }
    });
  } catch (e) {}
  return item;
}
```

### 15.JS中如何将页面重定向到另一个页面
1. 使用 location.href：window.location.href ="url"
2. 使用 location.replace： window.location.replace("url");

### 16.移动端如何实现上拉加载，下拉刷新

## 二、闭包与作用域

### 1.什么是闭包
✅ 官方说法：闭包就是指有权访问另一个函数作用域中的变量的函数。
✅ MDN说法：闭包是一种特殊的对象。它由两部分构成：函数，以及创建该函数的环境。环境由闭包创建时在作用域中的任何局部变量组成。

### 2.闭包的作用
 - 闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。
 - 闭包的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。
简单来说：**隐藏和维持**

### 3.闭包的使用场景
 - return 回一个函数
 - 函数作为参数
 - IIFE（自执行函数）
 - 循环赋值
 - 使用回调函数就是在使用闭包
 - 节流防抖
 - 函数柯里化

### 4.如何减少垃圾回收
 - **对数组进行优化**： 在清空一个数组时，最简单的方法就是给其赋值为[ ]，但是与此同时会创建一个新的空对象，可以将数组的长度设置为0，以此来达到清空数组的目的。
 - **对`object`进行优化**： 对象尽量复用，对于不再使用的对象，就将其设置为null，尽快被回收。
 - **对函数进行优化**： 在循环中的函数表达式，如果可以复用，尽量放在函数的外面。

### 5.哪些情况会导致内存泄漏
**意外的全局变量**： 由于使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留在内存中无法被回收。
**被遗忘的计时器或回调函数**： 设置了 setInterval 定时器，而忘记取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留在内存中，而无法被回收。
**脱离 DOM 的引用**： 获取一个 DOM 元素的引用，而后面这个元素被删除，由于一直保留了对这个元素的引用，所以它也无法被回收。
**闭包**： 不合理的使用闭包，从而导致某些变量一直被留在内存当中。

## 三、函数与函数式编程

### 1.什么是函数式编程
主要的编程范式有三种：命令式编程，声明式编程和函数式编程

相比命令式编程，函数式编程更加强调程序执行的结果而非执行的过程，倡导利用若干简单的执行单元让计算结果不断渐进，逐层推导复杂的运算，而非设计一个复杂的执行过程

### 2.函数式编程的优缺点
优点:

更好的管理状态：因为它的宗旨是无状态，或者说更少的状态，能最大化的减少这些未知、优化代码、减少出错情况
更简单的复用：固定输入->固定输出，没有其他外部变量影响，并且无副作用。这样代码复用时，完全不需要考虑它的内部实现和外部影响
更优雅的组合：往大的说，网页是由各个组件组成的。往小的说，一个函数也可能是由多个小函数组成的。更强的复用性，带来更强大的组合性
隐性好处。减少代码量，提高维护性

缺点:

性能：函数式编程相对于指令式编程，性能绝对是一个短板，因为它往往会对一个方法进行过度包装，从而产生上下文切换的性能开销
资源占用：在 JS 中为了实现对象状态的不可变，往往会创建新的对象，因此，它对垃圾回收所产生的压力远远超过其他编程方式
递归陷阱：在函数式编程中，为了实现迭代，通常会采用递归操作

### 3.什么是组合函数 (compose)
组合函数，其实大致思想就是将 多个函数组合成一个函数，c(b(a(a(1)))) 这种写法简写为 compose(c, b, a, a)(x) 。但是注意这里如果一个函数都没有传入，那就是传入的是什么就返回什么，并且函数的执行顺序是和传入的顺序相反的。

```javascript
var compose = (...funcs) => {
  // funcs(数组)：记录的是所有的函数
  // 这里其实也是利用了柯里化的思想，函数执行，生成一个闭包，预先把一些信息存储，供下级上下文使用
  return (x) => {
    var len = funcs.length;
    // 如果没有函数执行，直接返回结果
    if (len === 0) return x;
    if (len === 1) funcs[0](x);
    return funcs.reduceRight((res, func) => {
      return func(res);
    }, x);
  };
};
var resFn = compose(c, b, a, a);
resFn(1);
```
组合函数的思想，在很多框架中也被使用，例如：`redux`，实现效果来说是其实和上面的代码等价。

### 4.什么是惰性函数
惰性载入表示函数执行的分支只会在函数第一次掉用的时候执行，在第一次调用过程中，该函数会被覆盖为另一个按照合适方式执行的函数，这样任何对原函数的调用就不用再经过执行的分支了。

**惰性函数相当于有记忆的功能一样，当它已经判断了一遍的话，第二遍就不会再判断了。**

比如现在要求写一个test函数，这个函数返回首次调用时的new Date().getTime()，注意是首次，而且不允许有全局变量的污染。

```javascript
//一般会这样实现
var test = (function () {
  var t = null;
  return function () {
    if (t) {
      return t;
    }
    t = new Date().getTime();
    return t;
  };
})();
// 用惰性函数实现
var test = function () {
  var t = new Date().getTime();
  test = function () {
    return t;
  };
  return test();
};
console.log(test());
console.log(test());
console.log(test());
```
### 5.什么是高阶函数
高阶函数是指使用其他函数作为参数、或者返回一个函数作为结果的函数。

### 6.说说你对函数柯里化的理解
```javascript
function mycurry(fn, beforeRoundArg = []) {
  return function () {
    let args = [...beforeRoundArg, ...arguments];
    if (args.length < fn.length) {
      return mycurry.call(this, fn, args);
    } else {
      return fn.apply(this, args);
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

let sumFn = mycurry(sum);
console.log(sumFn(1)(2)(3)); //6
```

### 7.箭头函数有什么特征
 - 箭头函数没有this, this指向定义箭头函数所处的外部环境
 - 箭头函数的this永远不会变，call、apply、bind也无法改变
 - 箭头函数只能声明成匿名函数，但可以通过表达式的方式让箭头函数具名
 - 箭头函数没有原型prototype
 - 箭头函数不能当做一个构造函数 因为 this 的指向问题
 - 箭头函数没有 arguments 在箭头函数内部访问这个变量访问的是外部环境的arguments, 可以使用 ...代替

### 8.什么是尾递归
尾递归，即在函数尾位置调用自身（或是一个尾调用本身的其他函数等等）。
在递归调用的过程当中系统为每一层的返回点、局部量等开辟了栈来存储，递归次数过多容易造成栈溢出
这时候，我们就可以使用尾递归，即一个函数中所有递归形式的调用都出现在函数的末尾，对于尾递归来说，由于只存在一个调用记录，所以永远不会发生"栈溢出"错误

ECMAScript 6 规范新增了一项内存管理优化机制，让 JavaScript 引擎在满足条件时可以重用栈帧。 具体来说，这项优化非常适合“尾调用”，即外部函数的返回值是一个内部函数的返回值。比如：
```javascript
function outerFunction() {
  return innerFunction(); // 尾调用
}
```
1. 执行到 outerFunction 函数体，第一个栈帧被推到栈上。
2. 执行 outerFunction 函数体，到 return 语句。计算返回值必须先计算 innerFunction。
3. 执行到 innerFunction 函数体，第二个栈帧被推到栈上。
4. 执行 innerFunction 函数体，计算其返回值。
5. 将返回值传回 outerFunction，然后 outerFunction 再返回值。
6. 将栈帧弹出栈外。

在 ES6 优化之后，执行这个例子会在内存中发生如下操作。

1. 执行到 outerFunction 函数体，第一个栈帧被推到栈上。
2. 执行 outerFunction 函数体，到达 return 语句。为求值返回语句，必须先求值 innerFunction。
3. 引擎发现把第一个栈帧弹出栈外也没问题，因为 innerFunction 的返回值也是 outerFunction 的返回值。
4. 弹出 outerFunction 的栈帧。
5. 执行到 innerFunction 函数体，栈帧被推到栈上。
6. 执行 innerFunction 函数体，计算其返回值。
7. 将 innerFunction 的栈帧弹出栈外。
<div><hr/></div>

案例：
```javascript
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
```
上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n)。

```javascript
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
```
如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

### 9.函数声明与函数表达式的区别
函数声明： funtion开头，有函数提升

函数表达式: 不是funtion开头，没有函数提升

### 10.什么是函数缓存，如何实现？
**概念**
函数缓存，就是将函数运算过的结果进行缓存
本质上就是用空间（缓存存储）换时间（计算过程）
常用于缓存数据计算结果和缓存对象

**如何实现**
实现函数缓存主要依靠闭包、柯里化、高阶函数

**应用场景**
对于昂贵的函数调用，执行复杂计算的函数
对于具有有限且高度重复输入范围的函数
对于具有重复输入值的递归函数
对于纯函数，即每次使用特定输入调用时返回相同输出的函数

### 11.call、apply、bind三者的异同
**共同点** :
都可以改变this指向;
三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window

**不同点**:
call 和 apply 会调用函数, 并且改变函数内部this指向.
call 和 apply传递的参数不一样,call传递参数使用逗号隔开,apply使用数组传递，且apply和call是一次性传入参数，而bind可以分为多次传入
bind是返回绑定this之后的函数

**应用场景**:
call 经常做继承.
apply经常跟数组有关系. 比如借助于数学对象实现数组最大值最小值
bind 不调用函数,但是还想改变this指向. 比如改变定时器内部的this指向

## 四、原型与继承

### 1.js中常用的内置对象
**Number 数值对象，数值常用方法**
 - Number.toFixed( ) 采用定点计数法格式化数字
 - Number.toString( ) 将—个数字转换成字符串
 - Number.valueOf( ) 返回原始数值

**String 字符串对象，字符串常用方法**
 - Length 获取字符串的长度
 - split()将一个字符串切割数组
 - concat() 连接字符串
 - indexOf()返回一个子字符串在原始字符串中的索引值。如果没有找到，则返回固定值 -1
 - lastIndexOf() 从后向前检索一个字符串
 - slice() 抽取一个子串

**Boolean 布尔对象，布尔常用方法**
 - Boolean.toString() 将布尔值转换成字符串
 - Boolean.valueOf() Boolean 对象的原始值的布尔值

**Array 数组对象，数组常用方法**
 - join() 将一个数组转成字符串。返回一个字符串
 - reverse() 将数组中各元素颠倒顺序
 - delete 运算符只能删除数组元素的值，而所占空间还在，总长度没变(arr.length)
 - shift()删除数组中第一个元素，返回删除的那个值，并将长度减 1
 - pop()删除数组中最后一个元素，返回删除的那个值，并将长度减 1
 - unshift() 往数组前面添加一个或多个数组元素，长度会改变
 - push() 往数组结尾添加一个或多个数组元素，长度会改变
 - concat() 连接数组
 - slice() 切割数组，返回数组的一部分
 - splice()插入、删除或替换数组的元素
 - toLocaleString() 把数组转换成局部字符串
 - toString()将数组转换成一个字符串
 - forEach()遍历所有元素
 - every()判断所有元素是否都符合条件
 - sort()对数组元素进行排序
 - map()对元素重新组装，生成新数组
 - filter()过滤符合条件的元素
 - find() 查找 返回满足提供的测试函数的第一个元素的值。否则返回 undefined。
 - some() 判断是否有一个满足条件 ，返回布尔值
 - fill() 填充数组
 - flat() 数组扁平化

**Function 函数对象，函数常用方法**
 - Function.arguments 传递给函数的参数
 - Function.apply() 将函数作为一个对象的方法调用
 - Function.call() 将函数作为对象的方法调用
 - Function.caller 调用当前函数的函数
 - Function.length 已声明的参数的个数
 - Function.prototype 对象类的原型
 - Function.toString() 把函数转换成字符串

**Object 基础对象，对象常用方法**
 - Object 含有所有 JavaScript 对象的特性的超类
 - Object.constructor 对象的构造函数
 - Object.hasOwnProperty( ) 检查属性是否被继承
 - Object.isPrototypeOf( ) 一个对象是否是另一个对象的原型
 - Object.propertyIsEnumerable( ) 是否可以通过 for/in 循环看到属性
 - Object.toLocaleString( ) 返回对象的本地字符串表示
 - Object.toString( ) 定义一个对象的字符串表示
 - Object.valueOf( ) 指定对象的原始值

**Date 日期时间对象，日期常用方法**
 - Date.getFullYear() 返回 Date 对象的年份字段
 - Date.getMonth() 返回 Date 对象的月份字段
 - Date.getDate() 返回一个月中的某一天
 - Date.getDay() 返回一周中的某一天
 - Date.getHours() 返回 Date 对象的小时字段
 - Date.getMinutes() 返回 Date 对象的分钟字段
 - Date.getSeconds() 返回 Date 对象的秒字段
 - Date.getMilliseconds() 返回 Date 对象的毫秒字段
 - Date.getTime() 返回 Date 对象的毫秒表示

**Math 数学对象，数学常用方法**
 - Math 对象是一个静态对象
 - Math.PI 圆周率
 - Math.abs() 绝对值
 - Math.ceil() 向上取整(整数加 1，小数去掉)
 - Math.floor() 向下取整(直接去掉小数)
 - Math.round() 四舍五入
 - Math.pow(x，y) 求 x 的 y 次方
 - Math.sqrt() 求平方根

**RegExp 正则表达式对象，正则常用方法**
 - RegExp.exec() 检索字符串中指定的值。返回找到的值，并确定其位置。
 - RegExp.test( ) 检索字符串中指定的值。返回 true 或 false。
 - RegExp.toString( ) 把正则表达式转换成字符串
 - RegExp.globa 判断是否设置了 "g" 修饰符
 - RegExp.ignoreCase 判断是否设置了 "i" 修饰符
 - RegExp.lastIndex 用于规定下次匹配的起始位置
 - RegExp.source 返回正则表达式的匹配模式

**Error 异常对象**
 - Error.message 设置或返回一个错误信息(字符串)
 - Error.name 设置或返回一个错误名
 - Error.toString( ) 把 Error 对象转换成字符串

### 2.什么是原型链
**原型链是一种查找规则**

当访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，这种链式查找过程称之为原型链。

### 3.原型链的终点是什么？
原型链的尽头是null。也就是Object.prototype.proto

### 4.Js实现继承的方法
**寄生组合继承**
**关键：原型式继承 + 构造函数继承**
**Js最佳的继承方式，只调用了一次父类构造函数**
```javascript
function Father(name) {
  this.name = name;
  this.say = function () {
    console.log("hello,world");
  };
}
Father.prototype.showName = function () {
  console.log(this.name);
};
function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}
Son.prototype = Object.create(Father.prototype); // Object.create方法返回一个对象，它的隐式原型指向传入的对象。
Son.prototype.constructor = Son;
const son = new Son("刘逍", 20);
console.log(son.prototype.name); // 原型上已经没有name属性了,所以这里会报错
```

**class继承**
**关键：class里的extends和super关键字，继承效果与寄生组合继承一样**
```javascript
class Father {
  constructor(name) {
    this.name = name;
  }
  showName() {
    console.log(this.name);
  }
}
class Son extends Father {
  // 子类通过extends继承父类
  constructor(name, age) {
    super(name); // 调用父类里的constructor函数,等同于Father.call(this,name)
    this.age = age;
  }
  showAge() {
    console.log(this.age);
  }
}
const son = new Son("刘逍", 20);
son.showName(); // '刘逍'
son.showAge(); // 20
```

## 五、异步与事件循环

### 1. 异步编程的实现方式
 - **回调函数** 的方式，使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。
 - **Promise** 的方式，使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确。
 - **generator** 的方式，它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。因此在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控制权转移回来，因此需要有一个自动执行 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。
 - **async** 函数 的方式，async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。

### 2.setTimeout、setInterval、requestAnimationFrame的区别
1. setTimeout
 - 执行该语句时，是立即把当前定时器代码推入事件队列，当定时器在事件列表中满足设置的时间值时将传入的函数加入任务队列，之后的执行就交给任务队列负责。但是如果此时任务队列不为空，则需等待，所以执行定时器内代码的时间可能会大于设置的时间。
返回值timeoutID是一个正整数，表示定时器的编号。这个值可以传递给clearTimeout()来取消该定时器。

2. setInterval
 - 重复调用一个函数或执行一个代码片段，每次都精确的隔一段时间推入一个事件（但是，事件的执行时间不一定就不准确，还有可能是这个事件还没执行完毕，下一个事件就来了）。它返回一个 interval ID，该 ID 唯一地标识时间间隔，因此你可以稍后通过调用 clearInterval() 来移除定时器。
技术上，clearTimeout() 和 clearInterval()可以互换。但是，为了避免混淆，不要混用取消定时函数。

3. requestAnimationFrame
 - 是JS实现动画的一种方式，它告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

### 3.Promise是什么
Promise是异步编程的一种解决方案，它是一个对象，可以获取异步操作的消息，他的出现大大改善了异步编程的困境，避免了地狱回调。

### 4.promise实例有哪些状态，怎么改变状态
**Promise的实例有三个状态**
 - Pending（进行中）
 - Resolved（已完成）
 - Rejected（已拒绝）

**如何改变 promise 的状态**
 - resolve(value): 如果当前是 pending 就会变为 resolved
 - reject(error): 如果当前是 pending 就会变为 rejected
 - 抛出异常: 如果当前是 pending 就会变为 rejected

### 5.Promise有哪些实例方法
then catch finally

### 6.Promise有哪些静态方法
**all**: 成功的时候返回的是**一个结果数组**，而失败的时候则返回**最先被reject失败状态的值**。
 - all方法可以完成并发任务， 它接收一个数组，数组的每一项都是一个`promise`对象，返回一个`Promise`实例。当数组中所有的`promise`的状态都达到`resolved`的时候，all方法的状态就会变成`resolved`，如果有一个状态变成了`rejected`，那么all方法的状态就会变成`rejected`。
**race**: 哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
 - race方法和all一样，接受的参数是一个每项都是`promise`的数组，但是与all不同的是，当最先执行完的事件执行完之后，就直接返回该`promise`对象的值。如果第一个`promise`对象状态变成`resolved`，那自身的状态变成了`resolved`；反之第一个`promise`变成`rejected`，那自身状态就会变成`rejected`。
**any**: 返回最快的成功结果，如果全部失败就返回失败结果。
 - 它接收一个数组，数组的每一项都是一个`promise`对象，该方法会返回一个新的 `promise`，数组内的任意一个 `promise` 变成了`resolved`状态，那么由该方法所返回的 `promise` 就会变成`resolved`状态。如果数组内的 `promise` 状态都是r`ejected`，那么该方法所返回的 `promise` 就会变成`rejected`状态。

### 7.async 函数是什么
是 Generator 函数的语法糖，也就是处理异步操作的另一种高级写法
async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

### 8.async函数的返回值
`async`函数返回一个 `Promise` 对象。
`async`函数内部return语句返回的值，会成为`then`方法回调函数的参数。
`async`函数内部抛出错误，会导致返回的 `Promise` 对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到。

### 9.await 到底在等待什么
await 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）。await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接量的。

await 表达式的运算结果取决于它等的是什么。

 - 如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。
 - 如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。

### 10.什么是顶层await
从 ES2022 开始，允许在模块的顶层独立使用`await`命令，使得上面那行代码不会报错了。它的主要目的是使用`await`**解决模块异步加载**的问题。
```javascript
import { AsyncFun } from 'module'
await AsyncFun()
console.log(123)
```
### 11.如何用await让程序停顿指定的时间(休眠效果)
```javascript
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}
​
// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}
​
one2FiveInAsync();
```
### 11.await的使用注意点
1. await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
2. 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
3. await命令只能用在async函数之中，如果用在普通函数，就会报错。
4. async 函数可以保留运行堆栈。

### 12.宏任务与微任务的概念与区别
为了协调任务有条不紊地在主线程上执行，页面进程引入了 **消息队列** 和 **事件循环机制**，渲染进程内部也会维护多个消息队列，比如延迟执行队列和普通的消息队列。然后主线程采用一个 `for` 循环，不断地从这些任务队列中取出任务并执行任务。这些消息队列中的任务就称为 **宏任务**。<br>
**微任务**是一个需要异步执行的回调函数，执行时机是在主函数执行结束之后、当前宏任务结束之前。

### 13.常见的宏任务与微任务分别有哪些
| 任务（代码）     |   宏/微 任务    |  环境        |
| -------------  | :-----------:  | ----------: |
| 事件            |    宏任务      | 浏览器       |
| 网络请求(Ajax)  |    宏任务       | 浏览器       |
| setTimeout     |    宏任务       | 浏览器/Node |
| fs.readFile()  |    宏任务       | Node       |
| Promise.then() |    微任务       | 浏览器/Node |
| async/await    |    微任务       | 浏览器/Node |

### 14. 代码题易考点
1. promise本身是一个同步的代码，只有它后面调用的then()方法里面的回调才是微任务
2. then方法需要Promise里的resolve传值才会执行
3. await右边的表达式还是会立即执行,表达式之后的代码才是微任务, await微任务可以转换成等价的promise微任务分析
4. script标签本身是一个宏任务， 当页面出现多个script标签的时候，浏览器会把script标签作为宏任务来解析

## 六、 ES6-ES2022新语法

### 1. let、const、var的区别
|     区别        |var|let| const |
| -----  | :-----:  | -----: |  ----: |
|是否有块级作用域	  |×	|✔️	 |✔️  |
|是否存在变量提升	  |✔️	 |×	 |×  |
|是否添加全局属性	  |✔️	 |×	 |×  |
|能否重复声明变量	  |✔️	 |×	 |×  |
|是否存在暂时性死区	|×	|✔️	  |✔️  |
|是否必须设置初始值	|×	|×	 |✔️  |
|能否改变指针指向	  |✔️	 |✔️	|×  |

### 2. 解构赋值
**对象解构**
 - 形式：`const { x, y } = { x: 1, y: 2 }`
 - 默认：`const { x, y = 2 } = { x: 1 }`
 - 改名：`const { x, y: z } = { x: 1, y: 2 }`

**数组解构**
 - 规则：数据结构具有Iterator接口可采用数组形式的解构赋值
 - 形式：`const [x, y] = [1, 2]`
 - 默认：`const [x, y = 2] = [1]`

**函数参数解构**

 - 数组解构：`function Func([x = 0, y = 1]) {}`
 - 对象解构：`function Func({ x = 0, y = 1 } = {}) {}`
 - 
**应用场景**:
 - 交换变量值：`[x, y] = [y, x]`
 - 返回函数多个值：`const [x, y, z] = Func()`
 - 定义函数参数：`Func([1, 2])`
 - 提取JSON数据：`const { name, version } = packageJson`
 - 定义函数参数默认值：`function Func({ x = 1, y = 2 } = {}) {}`
 - 遍历Map结构：`for (let [k, v] of Map) {}`
 - 输入模块指定属性和方法：`const { readFile, writeFile } = require("fs")`

**注意点**
 - 匹配模式：只要等号两边的模式相同，左边的变量就会被赋予对应的值
 - 解构赋值规则：只要等号右边的值不是对象或数组，就先将其转为对象
 - 解构默认值生效条件：属性值严格等于undefined
 - 解构遵循匹配模式
 - 解构不成功时变量的值等于undefined
 - undefined和null无法转为对象，因此无法进行解构

### 3.字符串的新增方法
**includes**
 - 返回布尔值，表示是否找到了参数字符串。
**startsWith**
 - 返回布尔值，表示参数字符串是否在原字符串的头部。
**endsWith**
 - 返回布尔值，表示参数字符串是否在原字符串的尾部。
**repeat**
 - `repeat`方法返回一个新字符串，表示将原字符串重复n次
  
### 4.展开运算符
数组的扩展运算符可以将一个数组转为用逗号分隔的参数序列，且每次只能展开一层数组。
```javascript
const arr = [1, 2, 3, 4, 5, 6]
const newArr = [...arr] // 复制数组
const arr1 = ['two', 'three'];
const arr2 = ['one', ...arr1] // 合并数组
console.log(Math.max.call(null, ...arr)) // 将数组中的每一项作为参数使用
```
扩展运算符被用在函数形参上时，它还**可以把一个分离的参数序列整合成一个数组**：
```javascript
function mutiple(...args) {
  let result = 1;
  for (var val of args) {
    result *= val;
  }
  return result;
}
mutiple(1, 2, 3, 4) // 24
```

### 5. 数组新增的方法
**Array.from()**

**Array.of()**
**创建一个具有可变数量参数的新数组实例**，示例代码如下：
```javascript
Array.of(1) // [1]
Array.of(true, 1, '刘逍') // [true, 1, '刘逍']
```

**findIndex**<br>
根据给定的回调函数，找到匹配的第一个元素的索引，找不到返回-1

**find**<br>
根据给定的回调函数，找到匹配的第一个元素，找不到返回undefined

**fill**<br>
将给定值填充数组，示例代码如下：
```javascript
const arr = [1, 2, 3, 4]
// 将给定值填充索引1-3
arr.fill('逍', 1, 3) // [ 1, '逍', '逍', 4 ]
```

**keys**<br>
返回一个可迭代的对象，其内容为数组的key，示例代码如下：

**values**<br>
返回一个可迭代的对象，其内容为数组的value，示例代码如下：

**entries**<br>
返回一个可迭代的对象，其内容是一个数组，索引0为原数组的元素，1为原数组该位置的值，示例代码如下：
```javascript
const arr = [1, true, '逍']
​
const iterator = arr.entries()
console.log(Array.from(iterator)) // [ [ 0, 1 ], [ 1, true ], [ 2, '逍' ] ]
```

### 6.对象新增方法
**Object.is() (用于解决NaN ≠= NaN，+0 === -0的问题)**<br>

**Object.assign()**<br>
将所有可枚举属性的值从一个或多个源对象复制到目标对象，并返回目标对象。

**Object.getPrototypeOf()**<br>
获取原型对象；

**Object.setPrototypeOf()**<br>
设置原型对象。

### 7.class类
**constructor**<br>
`constructor()`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor()`方法，如果没有显式定义，一个空的`constructor()`方法会被默认添加。

**super**<br>
`super`这个关键字，既可以当作函数使用，也可以当作对象使用。
`super`作为函数调用时，代表父类的构造函数。子类的构造函数必须执行一次`super`函数。`super`虽然代表了父类A的构造函数，**但是返回的是子类B的实例**
`super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

**getter、setter**<br>
在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

**static**<br>
如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

### 8.Iterator
Iterator 的作用有三个：

1. 为各种数据结构，提供一个统一的、简便的访问接口；
2. 使得数据结构的成员能够按某种次序排列；
3. ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
   
### 9. for...of..循环
`for...of`循环可以使用的范围包括数组、`Set` 和` Map` 结构、某些类似数组的对象（比如`arguments`对象、`DOM` `NodeList` 对象）、后文的 G`enerator` 对象，以及字符串。

### 10. Generator
Generator是ES2015中提供的一种异步编程解决方案，定义Generator函数在`function`关键字和函数名中间使用`*`星号，函数内部使用`yield`关键字定义不同的状态。

**async的底层就是Generator函数**

### 11.Proxy和Reffect
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
Proxy对象用于创建一个代理对象，从而实现基本操作的拦截和自定义，基本操作包含13种，如下表所示：
|             拦截 ⽅法                    |        触发⽅式      |
| --------------------------------------  | :----------------:  |
| get(target, propKey, receiver)          |     读取某个属性      |
| set(target, propKey, value, receiver)   |     写⼊某个属性      |
| has(target, propKey)                    |     in操作符         |
| deleteProperty(target, propKey)         |     delete操作符      |

### 12.Set、Map、WeakSet、WeakMap
`set`类似于数组，但是成员的值都是唯一的，没有重复的值。
`Set`对象在实际开发中最常见的就是实现数据去重，示例代码如下：
```javascript
const arr = [1, 2, 2, 3, 4, 3, 5]
const set = new Set(arr)
// set对象可以使用 ... 展开 所有项
console.log([...set]) // [ 1, 2, 3, 4, 5 ]
```

map类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

### ES2016
1. 指数运算符
ES2016中新增指数**，也叫幂运算符，与Math.pow()有着一样的功能，示例代码如下：
```javascript
console.log(2 ** 10 === Math.pow(2, 10)) // true
```

2. Array.prototype.includes()方法
在ES2016中在数组原型上增加了`includes()`方法，该方法用于判断一个数组中是否包含指定的值，返回一个布尔值，示例代码如下：
```javascript
const arr = [1, 2, 3, 4, 5, NaN]
console.log(arr.indexOf(NaN)) // -1
console.log(arr.includes(NaN)) // true
```
注:使用includes()时NaN与NaN、+0与-0是相等的。

### ES2017
1. 对象新增方法
 - `Object.values()`：返回一个给定对象自身的所有可枚举属性值的数组；
 - `Object.entries()`：返回一个给定对象自身可枚举属性的键值对数组；
 - `Object.getOwnPropertyDescriptors()`：返回给定对象所有自有属性的属性描述符。

2. 字符串新增方法
 - `padStart()`：在字符串开头填充空格；
 - `padEnd()`：在字符串结尾填充空格；

### ES2018
1. 异步迭代
在ES2018中新增了`for await...of`语句，该用于可以遍历异步可迭代对象

2. 对象扩展运算符
对象的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中。
```javascript
let bar = { a: 1, b: 2 };
let baz = { ...bar }; // { a: 1, b: 2 }
```
上述方法实际上等价于:
```javascript
let bar = { a: 1, b: 2 };
let baz = Object.assign({}, bar); // { a: 1, b: 2 }
```

3. Promise.prototype.finally
`finally()`方法会返回一个`Promise`对象，当promise的状态变更，不管是变成`rejected`或者`fulfilled`，最终都会执行`finally()`的回调。

### ES2019
1. `try...catch`：语句中的`catch`允许不使用参数

2. trimStart、trimLeft、trimEnd、trimRight
`String.prototype.trimStart`：用于去除字符串左边的空格；
`String.prototype.trimLeft`：它是trimStart的别名
`String.prototype.trimEnd`：用于去除字符串右边的空格；
`String.prototype.trimRight`：它是trimEnd的别名

3. Object.fromEntries
`Object.fromEntries()`方法把键值对列表转换为一个对象，是`Object.entries()`方法的反操作

### ES2020
1. 动态导入
动态导入，也就是我们需要该模块的时候才会进行加载，这可以减少开销和页面加载时间，示例代码如下：
```javascript
import('/modules/my-module.js').then(module => {
  // Do something with the module.
})
```
动态导入使用`import()`方法，它返回一个Promise。

2. BigInt数据类型
BigInt的出现时解决JavaScript中允许的最大数字是`2**53-1`的问题，`BigInt` 可以表示任意大的整数。

3. 空值合并运算符 ??
该运算符与逻辑或运算符类似。其计算规则为，只要左运算元为`null`或者`undefined`，则返回右运算元，否则返回左运算元。而逻辑或运算符只有左运算元转换为`boolean`类型后为`false`，就返回右运算元。

4. 可选链操作符 ?.
`?. `操作符的功能类似于 . 链式操作符，不同之处在于，在引用为空 (nullish ) (`null` 或者 `undefined`) 的情况下不会引起错误，该表达式短路返回值是 `undefined`。
当我们访问某个属性时，只要有一处不存在，就会返回`undefind`，不会报错。
```javascript
var A = {}
// console.log(A.a.b) // 报错
console.log(A.a?.b) // undefined
```
可选链操作符也可用于对象下方法的调用，示例代码如下：
```javascript
var obj = {}
// 如果存在 obj.fun() 这个方法，下面则会直接调用，如果不存在则会返回undefined
obj.fun?.A()
```

### ES2021
1. String.prototype.replaceAll
`replaceAll()`方法返回一个新字符串，新字符串的内容是经过替换的，实例代码如下：
```javascript
const str = '刘逍'
const newStr = str.replaceAll('逍', '小')
console.log(newStr) // 刘小
```

2. 数值分隔符 _
严格意义上讲数值分隔符(_)并不属于一个运算符，其作用就是使数字更加利于阅读，例如下面的代码
```javascript
console.log(1_0000_0000) // 100000000
```

3. Promise.any()
ES2021中新增的Promise.any()方法，它接受的参数和与promise.all()是一致的，唯一不同的是，Promise.any()方法接受的可迭代对象中没有一个promise成功（即所有的promises都失败/拒绝），就返回一个失败的promise和AggregateError类型的实例。

4. 逻辑赋值操作符 &&= 、||= 、？？=
```javascript
const [f1, f2, f3] = [true, false]
f1 &&= '逍' // 等同于 str = str && '逍'
f2 ||= '逍' // 等同于 str = str || '逍'
f3 ??= '逍' // 等同于 str = str ?? '逍'
```

### ES2022
1. class的扩展
在ES2022中允许我们并不在constructor中定义类的成员，示例代码如下：
```javascript
class C {
  myName = '刘逍'
}
/* 两者是一致的 */
class C {
  constructor() {
    myName = '刘逍'
  }
}
```

2. await在顶层使用
在ES2022中新增了允许在顶层使用await，在顶层可以不适用async函数进行包裹，示例代码如下：
```javascript
import { AsyncFun } from 'module'
await AsyncFun()
console.log(123)
```

3. Object.hasOwn()
Object.hasOwn()方法用于判断某个对象上是否具有某个属性，示例代码如下：
```javascript
const person = {
  name: '刘逍',
  age: 18,
}
console.log(Object.hasOwn(person, 'name')) // true
console.log(Object.hasOwn(person, 'sex')) // false
```

4. Array.prototype.at()
S2022中新增的`at()`方法，它的作用是获取数组中的某个成员，它的参数是数组的索引，与直接使用索引的方式不同，它允许我们传递负值，等同于从后面倒数，示例代码如下：
```javascript
const arr = [1, 2, 3, 4, 5, 6]
console.log(arr.at(-1)) // 6
// 等同于 arr[arr.length - 1]
```

## 七、 DOM

### 1.DOM 事件流
 - 事件捕获阶段（capture phase）
 - 处于⽬标阶段（target phase）
 - 事件冒泡阶段（bubbling phase）

### 2.什么是事件冒泡
事件开始由最具体的元素（⽂档中嵌套层次最深的那个节点）接收到后，开始逐级向上传播到较为不具体的节点。

### 3.什么是事件捕获
事件开始由较为不具体的节点接收后，然后开始逐级向下传播到最具体的元素上。

事件捕获的最大作用在于：事件在到达预定⽬标之前就可以捕获到它。

### 4. 什么是事件委托
事件委托，就是利用了事件冒泡的机制，在较上层位置的元素上添加一个事件监听函数，来管理该元素及其所有子孙元素上的某一类的所有事件。
适用场景：在绑定大量事件的时候，可以选择事件委托
**优点**
 - 事件委托可以减少事件注册数量，节省内存占⽤!
 - 当新增⼦元素时，⽆需再次做事件绑定，因此非常适合动态添加元素 (vue解析模板时, 会对新创建的元素, 额外进行绑定的)

### 5.DOM的常用操作
1. 创建节点
  **createElement**
  创建新元素，接受一个参数，即要创建元素的标签名
  ```javascript
  const divEl = document.createElement("div");
  ```

  **createTextNode**
  创建一个文本节点
  ```javascript
  const textEl = document.createTextNode("content");
  ```

  **createDocumentFragment**
  用来创建一个文档碎片，它表示一种轻量级的文档，主要是用来存储临时节点，然后把文档碎片的内容一次性添加到DOM中
  ```javascript
  const fragment = document.createDocumentFragment();
  ```
  当请求把一个`DocumentFragment` 节点插入文档树时，插入的不是 `DocumentFragment`自身，而是它的所有子孙节点

  **createAttribute**
  创建属性节点，可以是自定义属性
  ```javascript
  const dataAttribute = document.createAttribute('custom');
  consle.log(dataAttribute);
  ```

2. 获取节点
    **querySelector**
    传入任何有效的`css `选择器，即可选中单个 `DOM`元素（首个）：
    ```javascript
    document.querySelector('.element')
    document.querySelector('#element')
    document.querySelector('div')
    document.querySelector('[name="username"]')
    document.querySelector('div + p > span')
    ```
    如果页面上没有指定的元素时，返回 `null`

    **querySelectorAll**
    返回一个包含节点子树内所有与之相匹配的`Element`节点列表，如果没有相匹配的，则返回一个空节点列表
    ```javascript
    const notLive = document.querySelectorAll("p");
    ```
    需要注意的是，该方法返回的是一个 `NodeList`的静态实例，它是一个静态的“快照”，而非“实时”的查询
    
    关于获取`DOM`元素的方法还有如下
    ```javascript
    document.getElementById('id属性值');返回拥有指定id的对象的引用
    document.getElementsByClassName('class属性值');返回拥有指定class的对象集合
    document.getElementsByTagName('标签名');返回拥有指定标签名的对象集合
    document.getElementsByName('name属性值'); 返回拥有指定名称的对象结合
    document/element.querySelector('CSS选择器');  仅返回第一个匹配的元素
    document/element.querySelectorAll('CSS选择器');   返回所有匹配的元素
    document.documentElement;  获取页面中的HTML标签
    document.body; 获取页面中的BODY标签
    document.all[''];  获取页面中的所有元素节点的对象集合型
    ```

3. 更新节点
    **innerHTML**
    不但可以修改一个`DOM`节点的文本内容，还可以直接通过`HTML`片段修改`DOM`节点内部的子树
    ```javascript
    // 获取<p id="p">...</p >
    var p = document.getElementById('p');
    // 设置文本为abc:
    p.innerHTML = 'ABC'; // <p id="p">ABC</p >
    // 设置HTML:
    p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';
    // <p>...</p >的内部结构已修改
    ```

    **innerText、textContent**
    自动对字符串进行HTML编码，保证无法设置任何HTML标签
    ```javascript
    // 获取<p id="p-id">...</p >
    var p = document.getElementById('p-id');
    // 设置文本:
    p.innerText = '<script>alert("Hi")</script>';
    // HTML被自动编码，无法设置一个<script>节点:
    // <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p >
    ```
    两者的区别在于读取属性时，`innerText`不返回隐藏元素的文本，而`textContent`返回所有文本

    **style**
    `DOM`节点的`style`属性对应所有的`CSS`，可以直接获取或设置。遇到`-`需要转化为驼峰命名
    ```javascript
    // 获取<p id="p-id">...</p >
    const p = document.getElementById('p-id');
    // 设置CSS:
    p.style.color = '#ff0000';
    p.style.fontSize = '20px'; // 驼峰命名
    p.style.paddingTop = '2em';
    ```

4. 添加节点
    **innerHTML**
    如果这个DOM节点是空的，例如，`<div></div>`，那么，直接使用innerHTML = '`<span>child</span>`'就可以修改`DOM`节点的内容，相当于添加了新的`DOM`节点
    如果这个`DOM`节点不是空的，那就不能这么做，因为`innerHTML`会直接替换掉原来的所有子节点

    **appendChild**
    把一个子节点添加到父节点的最后一个子节点
    如果是获取`DOM`元素后再进行添加操作，这个`js`节点是已经存在当前文档树中，因此这个节点首先会从原先的位置删除，再插入到新的位置
    如果动态添加新的节点，则先创建一个新的节点，然后插入到指定的位置

    **insertBefore**
    把子节点插入到指定的位置，使用方法如下：
    ```javascript
    parentElement.insertBefore(newElement, referenceElement)
    ```
    子节点会插入到`referenceElement`之前

    **setAttribute**
    添加一个属性节点，如果元素中已有该属性改变属性值
    ```javascript
    const div = document.getElementById('id')
    div.setAttribute('class', 'white');//第一个参数属性名，第二个参数属性值。
    ```

5. 删除节点
    **removeChild**
    删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的`removeChild`把自己删掉
    ```javascript
    // 拿到待删除节点:
    const self = document.getElementById('to-be-removed');
    // 拿到父节点:
    const parent = self.parentElement;
    // 删除:
    const removed = parent.removeChild(self);
    removed === self; // true
    ```
    删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置

### 6.怎么解绑事件
  on事件方式，直接使用null覆盖就可以实现事件的解绑
  ```javascript
  btn.onclick = function(){
    alert('点击了');
  }
  btn.onclick = null;
  ```

  addEventListener方式，需要使用removeEventListener(事件类型, 事件处理函数, [获取捕获或者冒泡阶段])
  ```javascript
  function fn(){
    alert('点击了');
  }
  btn.addEventListener('click', fn);
  btn.removeEventListener('click, fn');
  ```

### 7.怎么阻止事件冒泡、阻止默认事件？
阻止事件冒泡
`e.stopPropagation**()`

阻止默认事件,3种方式
```javascript
e.preventDefault();//谷歌及IE8以上
window.event.returnValue = false; //IE8及以下
return false; //无兼容问题（但不能用于节点直接onclick绑定函数）
```

## 八、其他类型问题补充

### 1.观察者模式与发布订阅的区别 
 - 在观察者模式中，观察者是知道Subject的，Subject一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。
 - 在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。
 - 观察者模式大多数时候是同步的，比如当事件触发，Subject就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）






































<div><br/><br/>---------------------------------------------------------------------------------------------</div>
转载出处：
链接：https://juejin.cn/post/7150462512817782815
