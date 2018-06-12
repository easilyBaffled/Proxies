# Proxy Talk

## About Me
-  Danny Michaelis
-  Front End Dev at Lab49
-  easilyBaffled everywhere online
    
going to run through a bunch of code snippes because well ⚡️ and I'm pretty nervous up here and want to get through it but all of this is available in a repo so you can pull it down and play with later, even these slides

We're going to start with a real example from my previous work

We were building a backend and frontend in parallel. The spec for the API was changing on a daily basis.
We wanted to isolate our fetch calls from the rest of the app with a fetch utility. But it had to be exceptionally flexible given what was happening with the API

So we had this       

## Slight of Hand

```javascript
const urlBuilder = {
    url: [],
    addParam ( str )
    {
        this.url.push( str );
    },
    getUrl ()
    {
        return '/' + this.url.join( '/' );
    }
};
```
It's  a simplified version, but this the url builder, we could pass in any parameters and build what ever the endpoint was, for that day.

And it was, fine

```javascript
builder.addParam( 'a' );
builder.addParam( 'b' );
console.log( builder.getUrl() );
// -> /a/b
```
It worked, but it was verbose and as a recovering part-time amature code golfer I fixed it. by adding this

```javascript
const builder = trick( urlBuilder );
// {
//     url: [],
//     addParam ( str )
//     {
//         this.url.push( str );
//     },
//     getUrl ()
//     {
//         return '/' + this.url.join( '/' );
//     }
// }
```
Now if you look at the resulting builder, you're just going to see the regular urlBuilder

```javascript
console.log( Object.keys( builder ) );
// -> [ 'url', 'addParam', 'getUrl' ]
```
same properties, same functions, nothing new. Expect...

## Things get weird
```javascript
console.log( builder.c );  // -> undefined ?
// -> () => (
//      target.addParam( name ),
//      p
// );
```

```javascript
console.log( JSON.stringify( builder, null, 4 ) )
```

Yeah, c doesn't exist, and yet here it is.

```javascript
console.log( builder.d().e().f().getUrl() ); // -> ?
// -> /d/e/f
```
We're going to be taking a new look at what undefined means to day

## It's a ghost!
```javascript
console.log( 'd' in builder, 'e' in builder );
// -> false, false
```
because d, e, and f don't exist either but that's not gonna stop em

In fact there is nothing in the urlBuilder 

```javascript
console.log( 'addParam' in builder );
console.log( Object.getOwnPropertyDescriptor( builder, 'url' ) );
// -> undefined
// -> undefined
```

We had to stop using the URL builder at work, because I had essentially resorted to witchcraft and failed to write good documentation for it. 
You see this is what can happen when you start using Proxies

## It's a Proxy
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

you end up writing weird functions, that completely flip what is supposed to happen and then your coworkers get mad because you're calling functions on an empty object 
and has 100% test coverage even though there aren't any tests for it. And you sure as hell didn't take the time to write documentation explainging how any of it works. 
Well it works with traps...  

##Traps
[Traps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

I put this talk together because it seems like no body knows proxies exist and its easier to teach everyone at my company once and for all

## Back to the Builder
```javascript
const urlBuilder = {
    url: [],
    addParam ( str )
    {
        // this.url.push( str );
    },
    getUrl ()
    {
        return '/' + this.url.join( '/' );
    }
};
```

## The Trick
```javascript
const defaultBuilder = new Proxy( urlBuilder, { // object of traps
    get ( target, name, proxy )
    {
        const res = target[ name ];
        if ( res )
            return res;
        return () => (               
            target.addParam( name ),
            proxy                   
        );
    }
} );
```

```javascript
const defaultBuilder = new Proxy( urlBuilder, {  // object of traps
```

```javascript
get ( target, name, proxy )
{
    return target[ name ] || ( () => (
        target.addParam( name ),
        proxy                   
    ) );
}
```

##Type Detect - gif of slow scroll through docs
[typeDetect](https://www.npmjs.com/package/type-detect)

##Why I hate it
```javascript
type('hello world') === 'string';
type(new String('hello')) === 'String'; // note - the object version has a capital S
```

##isA
```javascript
const isA = new Proxy( {}, {
    get( _, name )
    {
        return target =>
            typeDetect( target ).toLowerCase() === name.toLowerCase()            
    }
} );
```
####Setup
```javascript
const isA = new Proxy( {}, {
```
####Focus
```javascript
get ( _, name )
    {
        return target =>
            typeDetect( target ).toLowerCase() === name.toLowerCase()            
    }
```
####Usage
```javascript
isA.number( 0 );
isA.array( [] );
isA.object( {} );
isA.Object( [] );
isA.RegExp( /a-z/gi );
isA.Map( new Map() );
```

####But remember
```javascript
isA.Proxy( isA );
isA.Proxy( new Proxy( {}, {} ) );
```

## Proxy Default case
summarize what we have learned here

```javascript
const AddDefaultToObject = defaultHandler => obj => 
    new Proxy( obj, {
        get: ( target, name, proxy ) =>
            target[name] || defaultHandler( name, target, proxy )
    } );
```

##Fenagle
```javascript
const isEven = num => !( parseInt( num ) % 2 );

function finagleSomeNumbers ( target ) 
{
    return target
        .map( JSON.parse )
        .filter( isEven )
        .join( ' | ' );
}
```
####A delicate process
```javascript
finagleSomeNumbers( [ '1', '2', '3', '4' ] );
// -> 2 | 4
finagleSomeNumbers( [] );
// -> Uncaught ReferenceError: isEven is not defined
finagleSomeNumbers( [ 1, 2, 3 ] );
// -> Uncaught SyntaxError: Unexpected number
finagleSomeNumbers( [ 'a', 'b' ] );
// -> VM323:1 Uncaught SyntaxError: Unexpected token a in JSON at position 0
```

####U-G-L-Y
```javascript
const isEven = num => !( parseInt( num ) % 2 );

function finagleSomeNumbers ( target )
{
    if ( !isA.array( target ) || !target.every( isA.string ) ) // 😑
        return '';

    const parsed = target.map( JSON.parse );

    return parsed.every( isA.number ) // 🤢
        ? parsed.filter( isEven ).join( ' | ' )
        : '';
}
```
##Undefined
```javascript
const Undefined = ( ...stack ) => new Proxy(
    () => '',
    {
        stack,
        get ( _, name, proxy ) 
        {
            return name === 'stack'
                    ? this.stack
                    : (
                        this.stack.push( name ), // Update the source
                        proxy                   // Return what we will use
                    );
        },
        apply ( target, thisArg, argumentsList ) 
        {
            return Undefined( ...this.stack, argumentsList ); //
        }
    }
);
```

####Get
```javascript
 get ( _, name, proxy ) 
{
    return isA.symbol( name )
        ? 'Proxy:Undefined' // Only time name isn't a string
        : name === 'stack'
            ? this.stack
            : (
                this.stack.push( name ), // Update the source
                proxy                   // Return what we will use
            );
}
```

####Apply
```javascript
apply ( target, thisArg, argumentsList ) 
{
    return Undefined( ...this.stack, argumentsList ); //
}
```

####Safe
```javascript
const safe = obj =>
    new Proxy( obj, {
        get ( target, name ) 
        {
            try 
            {
                const res = Reflect.get( target, name );
                return !res
                    ? Undefined( name )
                    : ( isA.primitive( res ) || name === 'prototype' )
                        ? res // Can't wrap a primative, don't want to wrap prototype ...for now 😈
                        : safe( res );

            }
            catch ( e ) 
            {
                return Undefined( e );
            }
        },
        apply ( ...args ) 
        {
            try 
            {
                return Reflect.apply( ...args );
            }
            catch ( e ) 
            {
                return Undefined( e );
            }
        }
    } );
```
If you do anything you'll get undefined

####Undefined in use
```javascript
function finagleSomeNumbers ( target ) 
{
    const result = safe( target )
        .map( JSON.parse )
        .filter( isEven )
        .join( ' | ' );

    return result === Undefined
        ? ( console.log( result.stack ), '' )
        : result;
}
```
####SAAAAAAFE
```javascript
finagleSomeNumbers( [ '1', '2', '3', '4' ] );
finagleSomeNumbers( {} );
finagleSomeNumbers( [] );
finagleSomeNumbers( [ 1, 2, 3 ] );
finagleSomeNumbers( [ 'a', 'b' ] );

```

##Summary
You can stay inside the proxy for as long as you like?


##Private Var
going to work backwards because the set up is a little intimidating 
####How to use
```javascript
const hidden = protectProps(
    {
        a: 1,
        _b: 2,
        c: {
            _d: 1,
            e: 2
        },
        _e: {
            f: 1
        }
    },
    '_'
);
```
####Stuff aint there
```javascript
Object.keys( hidden );
// -> [ "a", "c" ]
Object.values( hidden );
// -> [ "1", { "e": 2 } ]
hidden.hasOwnProperty( '_b' );
// -> false
hidden._b;
// -> undefined
hidden.c._d;
// -> undefined
```
####Now it is
```javascript
const unlocked = hidden.unlock( '🔑' );
console.log( unlocked );
// {
//    a: 1,
//    _b: 2,
//    c: {
//        _d: 1,
//        e: 2
//    },
//    _e: {
//        f: 1
//    }
// },
```

####How it works
```javascript
export const protectProps = ( obj, lockString ) => 
{
    const isLocked = str => isA.string( str ) ? str.startsWith( lockString ) : false;

    const wrap = child =>
        typeof child === 'object' || typeof child === 'function'
            ? protectProps( child, lockString )
            : child;

    const { proxy, revoke } =  Proxy.revocable( obj, {
        unlock: str =>
            str === '🔑'
                ? ( revoke(), obj )
                : '🔒',
        get ( target, name )
        {
            return name === 'unlock'
                ? this.unlock
                : isLocked( name )
                    ? undefined
                    : wrap( Reflect.get( target, name ) );
        },
        set ( target, name, value )
        {
            return isLocked( name )
                ? true
                : wrap( Reflect.set( target, name, value ) );
        },
        has ( target, name )
        {
            return isLocked( name )
                ? false
                : wrap( Reflect.has( target, name ) );
        },
        ownKeys ( target )
        {
            return Reflect.ownKeys( target )
                .filter( key => !isLocked( key ) );
        },
        getOwnPropertyDescriptor ( target, name )
        {
            return isLocked( name )
                ? undefined
                : wrap( Reflect.getOwnPropertyDescriptor( target, name ) );
        }
    } );

    return proxy;
};
```
####Focus
```javascript
set ( target, name, value )
{
    return isLocked( name )
        ? true
        : wrap( Reflect.set( target, name, value ) );
}
// obj.a = 1
```

####Focus 2
```javascript
ownKeys ( target )
{
    return Reflect.ownKeys( target )
        .filter( key => !isLocked( key ) );
}
// Object.keys( obj )
```

```javascript
 const { proxy, revoke } =  Proxy.revocable( obj, {
    unlock: str =>
        str === '🔑'
            ? ( revoke(), obj )
            : '🔒',
```

##One More Proxy
it's ugly but useful, I won't go through the set up but
```javascript
export const proxyProxyTrapLogger = ( obj = {} ) => new Proxy( obj, {
    get ( target, trapName, receiver ) {
        return ( ...args ) => { // args[0] is the targetObj
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
```

####traps everywhere
```javascript
const myObj = new Proxy({a: 1, b: 2}, logProxy);
myObj.a = 3;      // set(a,3), getOwnPropertyDescriptor(a), defineProperty(a,3)
delete myObj.b;   // deleteProperty(b)
console.log(myObj)
```

