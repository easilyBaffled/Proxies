export default log => 
{
  // #### One Hell of a Logger
  const proxyProxyTrapLogger = (obj = {}) =>
    new Proxy(obj, {
      get(target, trapName) 
{
        return (...args) => 
{
          // args[0] is the targetObj
          let a =
            args.length > 2 ? args.slice(1, args.length - 1) : args.slice(1);
          console.log(trapName, a.length ? a : "");
          const res = obj[trapName]
            ? obj[trapName](...args)
            : Reflect[trapName](...args);
          console.log("// -> ", res);
          return res;
        };
      }
    });

  // #### So much to see
  const myObj = new Proxy({ a: 1, b: { c: 2 } }, proxyProxyTrapLogger());
  // myObj.a = 3; // set(a,3), getOwnPropertyDescriptor(a), defineProperty(a,3)
  // delete myObj.b; // deleteProperty(b)
  console.log(myObj);
};
