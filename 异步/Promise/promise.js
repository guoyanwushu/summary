const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function Promise(fn) {
    this.status = PENDING
    this.result = ''
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    var that = this
    function resolve(value) {
        if (that.status === PENDING) {
          that.status = RESOLVED
          that.result = value
          that.rejectCallbacks.forEach(function (func) {
            func(value);
          })
        }
    }
    function reject(reason) {
        if (that.status === PENDING) {
          that.status = REJECTED
          that.result = reason
          that.rejectCallbacks.forEach(function (func) {
            func(reason)
          })
        }
    }
    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
}

function handelValue(promise, val, resolve, reject) {
    if (promise === val) {
        return reject(new TypeError('循环引用'));
    }
    if (val instanceof Promise) {
        val.then(function (value) {
            resolve(value)
        }, function (reason) {
            reject(reason)
        })
    } else if (typeof val === 'object' && typeof val.then === 'function') {
        let 

    } else {
        resolve(val)
    }
}

Promise.prototype.then = function (resolveFn, rejectFn) {
    resolveFn = typeof resolveFn === 'function'? resolveFn : function (value) {return value}
    rejectFn = typeof rejectFn === 'function' ? rejectFn : function (error) {throw error}
    let _promise
    const that = this
    if (that.status === PENDING) {
      _promise = new Promise(function (resolve, reject) {
        that.resolveCallbacks.push(function () {
          setTimeout(function () {
            try {
              let value = resolveFn(that.result)
              handelValue(_promise, value, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        that.rejectCallbacks.push(function () {
          setTimeout(function () {
            try {
              let value = rejectFn(that.result);
              resolve(value)
            } catch (error) {
              reject(error)
            }
          })
        })
      })

    }
    if (that.status === RESOLVED) {
      _promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            let value = resolveFn(that.result)
            handelValue(_promise, value, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
    }
    if (that.status === REJECTED) {
      _promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            let value = rejectFn(that.result);
            resolve(value)
          } catch (error) {
            reject(error)
          }
        })
      })
    }
}


// 针对代码部分 高效、健壮