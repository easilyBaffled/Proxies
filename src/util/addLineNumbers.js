export default str => str.trim().split( '\n' ).map( ( line, lineNumber ) => `${lineNumber + 1}. ${line}` ).join( '\n' );
