import isPrimitive from 'is-primitive';
import typeDetect from 'type-detect';

const isA = new Proxy( {
    // Custom types
    primative: isPrimitive
}, {
    // :: ( _, String ) -> a -> bool
    get: ( types, name ) => target => (
        types[ name ]
            ? types[ name ]( target )
            : typeDetect( target ).toLowerCase() === name.toLowerCase()
    )
} );

export default isA;


/*
const conditions = [
    () => isA.number( 0 ),
    () => isA.array([]),
    () => isA.object({}),
    () => isA.object([]),
    () => isA.RegExp(/a-z/gi),
    () => isA.Map( new Map() ),
    () => isA.Proxy( isA ),
    () => isA.Proxy( new Proxy( {}, {} ) ),
];

ReactDOM.render(<Asserts conditions={conditions} />, document.getElementById("typeDetect"));
*/
