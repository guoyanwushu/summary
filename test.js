a = 100;
function demo(e) {
    function e() {}
    arguments[0] = 2;
    console.log(e); //?
    if (a) {
        var b = 123;//var b执行了，即无论条件是否正确，声明都会执行
        function c() {}//此处c不能被直接获取，需要进入条件块才行
    }
    var c;
    a = 10;
    var a;
    console.log(b); //?
    f = 123;
    console.log(c); //?
    console.log(a); //?
}
var a;
demo(1);
console.log(a); //?
console.log(f); //?


// 2 undefined undefined 10 100 123，画下GO和AO