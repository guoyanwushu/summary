function deepClone(target) {
    let temp = target instanceof Array?[]:{}
    const keys = Object.keys(target)
    keys.forEach(key => {
        if (Object.prototype.toString.call(target[key]) == '[object Object]' || Object.prototype.toString.call(target[key]) == '[object Array]') {
            temp[key] = deepClone(target[key])
        } else {
            temp[key] = target[key]
        }
    })
    return temp
}

function faltternArray(target) {
    var temp = [];
    for (let i = 0 ; i < target.length ; i++) {
        if (target[i] instanceof Array) {
            temp = temp.concat(faltternArray(target[i]))
        } else {
            temp.push(target[i])
        }
    }
    return temp
}

// 递归，之前的执行栈一直存在未被回收，如果递归的次数太多，内存中的执行栈就会一直存在下去，可能会出现爆栈表现出来就是内存溢出，浏览器卡死。
// 避免这种情况的话，一种情况是使用尾递归，另外一种方法就是使用循环

// 怎么将递归转化为循环呢 ? 或者说尾递归优化 ?

function _deepClone(x) {
    var result = {}
    var loopList = [{
        node: result,
        data: x
    }]
    while (loopList.length) {
        var temp = loopList.pop();
        var data = temp.data
        var node =  temp.node
        for (var key in data) {
            if (typeof data[key] == 'object') {
                node[key] = {}
                loopList.push({
                    node: node[key],
                    data: data[key]
                })
            } else {
                node[key] = data[key]
            }
        }
    } 
    return result
}

function _flattern(x) {
    var result = []
    var loopList = [{
        node: result,
        data: x
    }]
    while (loopList.length) {
        var temp = loopList.pop();
        var data = temp.data
        var node =  temp.node
        for (var i=0 ; i< data.length ; i++) {
            if (data[i] instanceof Array) {
                data[i] = []
            } else {
                result.splice()
            }
        }
    } 
    return result
}
