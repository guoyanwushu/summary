### promise是什么?
promise是一个对象，用来包装异步操作的状态和回调，实现了将异步操作的状态变更和对应的事件回调进行空间上的分离，从而规避在代码写法上的回调地域。
### 特点
1. 三状态、状态变更不可逆    
pending\resolve\reject promise只有这三种状态，一旦由pending状态变更, 则后续的变更无效
2. then函数依旧返回promise实例， 以供串联操作
    2.1 如果then返回的promise的实例, 那么结果由返回的promise决定
    2.2 如果then没有明确的返回值，并且没有抛出异常，那么返回的promise状态是resolved，值是undefined
    2.3 如果在then里，抛了异常， 那么返回的promise结果就是rejected
    2.4 then两个参数都必须是函数, 并且是可选的， 如果传入的参数不是函数将会被忽略， 通常在这个两个参数没有值的时候，会用默认函数进行代替