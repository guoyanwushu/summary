### 都要做什么事? 
拦截属性的get和set, 在get阶段收集依赖, 在set阶段通过watcher更新视图。

### 区别?
defineProperty 拦截的是属性，针对对象的每一个属性都需要去设置拦截。 proxy拦截(代理)的是对象, 同一级对象下面的所有属性不用去重复设定。
defineProperty 有缺陷, 不能拦截属性的新增和删除， 也不能拦截数组的 索引赋值等等。
proxy兼容性差，ie全系列不支持，代理本身的性能也没有defineProperty好