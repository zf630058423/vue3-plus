/**
 * 手写call apply bind
 * 方法一
 */
Function.prototype.call = function(context, ...args) {
  context = (context === undefined || context === null) ? window : context
  context.__fn = this
  let result = context.__fn(...args)
  delete context.__fn
  return result
}
Function.prototype.apply = function(context, args) {
  context = (context === undefined || context === null) ? window : context
  context.__fn = this
  let result = context.__fn(...args)
  delete context.__fn
  return result
}
Function.prototype.bind = function(context, ...args1) {
  context = (context === undefined || context === null) ? window : context
  let _this = this
  return function(...args2) {
    context.__fn = _this
    let result = context.__fn(...[...args1, ...args2])
    delete context.__fn
    return result
  }
}



/**
 * 手写call apply bind
 * 方法二
 * 
 */
Function.prototype.myCall = function(context, ...args) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
}

Function.prototype.myApply = function(context, args) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
}

Function.prototype.myBind = function(context, ...args) {
  const self = this;
  return function(...args2) {
    return self.apply(context, args.concat(args2));
  }
}


/**
 * 手写call apply bind
 * 方法三
 * 
 */
Function.prototype.myCall3 = function (context, ...args) {
  context = context || window
  args = args || []
  // eslint-disable-next-line no-new-symbol
  const key = new Symbol()
  context[key] = this
  const res = context[key](...args)
  delete context[key]
  return res
}
Function.prototype.myApply3 = function (context, args) {
  context = context || window
  args = args || []
  // eslint-disable-next-line no-new-symbol
  const key = new Symbol()
  context[key] = this
  const res = context[key](...args)
  delete context[key]
  return res
}
Function.prototype.myBind3 = function (context, ...args) {
  let self = this
  args = args || []
  return function (...newargs) {
    const key = Symbol()
    context[key] = self
    const res = context[key](...args, ...newargs)
    delete context[key]
    return res
  }
}