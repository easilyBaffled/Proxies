import React from 'react';
import { array } from 'prop-types';

import { El } from '../../proxies';

const Log = ( { output } ) => (
    <El.app>{ output.map( str => <pre>{ str }</pre> ) }</El.app>
);

Log.propTypes = {
    output: array
};

export default Log;

const logger = {
    logs: [],
    log ( ...args ) 
    {
        this.logs.push( args );
    },
    flush () 
    {
        const output = this.logs.map( log =>
            JSON.stringify( log, null, 4 ).join( '\n' )
        );
        this.logs = [];
        return output;
    }
};
