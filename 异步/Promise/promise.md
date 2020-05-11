### promise是什么?
promise是一个对象，用来包装异步的操作，实现了将异步操作的状态变更和对应的事件回调进行空间上的分离，从而规避在代码写法上的回调地域。
### 特点
1. 三状态、状态变更不可逆    
pending\resolve\reject promise只有这三种状态，一旦由pending状态变更为其他两种状态, 则后续的变更无效
2. then函数依旧返回promise实例， 以供串联操作
    * 如果then返回的promise的实例, 那么结果由返回的promise决定
    * 如果then没有明确的返回值，并且没有抛出异常，那么返回的promise状态是resolved，值是undefined
    * 如果在then里，抛了异常， 那么返回的promise结果就是rejected
    * then两个参数都必须是函数，如果为空或者不是函数，那么会被忽略
