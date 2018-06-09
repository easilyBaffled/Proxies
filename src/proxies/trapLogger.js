/*******************
 Proxy a Proxy to see what the Proxy does.
 *******************/
export const proxyProxyTrapLogger = ( obj = {} ) => new Proxy( obj, {
    get ( target, trapName, receiver ) 
    {
        return ( ...args ) => 
        { // args[0] is the targetObj
            let a = args.length > 2
                ? args.slice( 1, args.length - 1 )
                : args.slice( 1 );
            console.log( trapName, a.length ? a : '' );
            const res = obj[ trapName ] ? obj[ trapName ]( ...args ) : Reflect[ trapName ]( ...args );
            console.log( '// -> ', res );
            return res;
        };
    }
} );

const trapLogger = ( obj = {} ) => new Proxy( obj, {
    get ( target, trapName, receiver ) 
    {
        return ( ...args ) => 
        { // args[0] is the targetObj
            let a = args.length > 2
                ? args.slice( 1, args.length - 1 )
                : args.slice( 1 );
            console.log( trapName, a.length ? a : '' );
            const res = Reflect[ trapName ]( ...args );
            console.log( '// -> ', res );
            return res;
        };
    }
} );

export default trapLogger;

/*
* https://github.com/gergob/jsProxy/blob/master/11-proxy-as-handler.js
* const logHandler = {
        get (obj, trap) {
            return function (...args) {
                console.log(`${trap}`, args.slice(1));
                const result = Reflect[trap](...args);
                console.log('  result:', JSON.stringify(result));
                console.log('  value:', JSON.stringify(args[0]));
            };
        }
    },
    logProxy = new Proxy({}, logHandler);


// try it out
const myObj = new Proxy({a: 1, b: 2}, logProxy);

myObj.a = 3;      // set(a,3), getOwnPropertyDescriptor(a), defineProperty(a,3)
delete myObj.b;   // deleteProperty(b)
* */
