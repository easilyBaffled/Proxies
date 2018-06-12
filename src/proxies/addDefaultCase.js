export default defaultHandler => obj => 
{
    const def =
    typeof defaultHandler === 'function'
        ? defaultHandler
        : () => defaultHandler;

    return new Proxy( obj, {
        get ( target, name, proxy ) 
        {
            const result = Reflect.get( target, name );
            return result || def( name, target, proxy );
        }
    } );
};

/*
const safeObj = addDefault( {}, name => () => name + '!' )
console.log( safeObj.name, safeObj.name() )
logOutput( safeObj.name() )

// [ 'a', 'b', 'c', 'a' ].reduce( ( acc, val, i ) => {
//     acc[ name ].push( i )
//     return acc;
// }, addDefault( {}, [] ) )

ReactDOM.render(<Log output={output} />, document.getElementById("default"));
output = [];


//// Reverse Prototype

const flip = functionName => testVal => prototypeObj => prototypeObj[ functionName ]( testVal )
const S = addDefault( {}, flip )

const startsWithA = S.startsWith('A')
console.log(startsWithA('Abc'))

const hasSpecial = S.match( /[!#%$*]/ )
const hasUppercase = S.match( /[A-Z]/ )

const validatePassword = str =>
    isA.string( str )
    && hasSpecial( str )
    && str.length > 8
    && hasUppercase( str );

*/
