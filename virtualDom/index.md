
template -> ast -> render
数据变更 -> Wathcer.update -> this.get() -> vm.render() -> 拿到最新的虚拟dom树(这是个完整的真实dom映射树) -> patch -> 更新dom 

data -> observe -> mount -> new Watcher -> this.getter.call(vm) -> vm.render() -> vm._update -> patch -> 没有oldVdomTree -> 执行insert -> 初始化dom