// :: Object -> Object -> Proxy
export default ( traps = {} ) => ( target = {} ) => new Proxy( target, traps );
