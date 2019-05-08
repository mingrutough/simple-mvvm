
class Watcher { 
  constructor(vm, expr, cb) { 
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.oldValue = this.getVal(vm, expr);
    Dep.target = null;
  }
  getVal(vm, expr) { // 获取data选项中的数据
    Dep.target = this;
    let varArr = expr.split('.'); // 为了处理a.b.c的情况
    return varArr.reduce((pre, next) => { 
      return pre[next]
    }, vm.$data);
  }
  update() { 
    const newVal = this.getVal(this.vm, this.expr);

    this.cb(newVal);
  }
}



class Dep { 
  constructor() { 
    this.subs = [];
  }
  addSub(watcher) { 
    this.subs.push(watcher);
  }
  notify() { 
    this.subs.forEach(watcher => { 
      watcher.update();
    });
  }
}