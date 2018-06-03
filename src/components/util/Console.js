import React from 'react';
import { CodePane } from 'spectacle';
import { stripIndent } from 'common-tags';
import { renderProps } from 'react-powerplug';

import { isA } from '../../proxies';

const update = propName => updater => state => (
    { [ propName ]: updater( state[ propName ], state ) }
);

const push = new Proxy( {}, {
    get: ( _, propName ) =>
        ( ...newItems ) =>
            update( propName )( arr => [ ...arr, ...newItems ] )
} );

export default class Console extends React.Component
{
    state =  {
        logs: []
    };

    log = ( ...args ) =>
    {
        const stringifiedArgs = args.map( arg => isA.string( arg ) ? arg : JSON.stringify( arg, null, 4 ) ).join( ', ' );
        this.setState( push.logs( stringifiedArgs ) );
    };

    clear = () =>
    {
        this.setState( { logs: [] } );
    }

    render ()
    {
        return (
            <React.Fragment>
                {
                    renderProps( this.props, {
                        log: this.log,
                        clear: this.clear
                    } )
                }
                <CodePane theme='dark'
                    lang='javascript'
                    source={ stripIndent( this.state.logs.join( '\n\n' ) ) }
                    editorStyle={ {
                        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                        borderRadius: 6
                    } }
                />
            </React.Fragment>
        );
    }
};
