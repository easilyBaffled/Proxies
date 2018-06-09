
import findIndex from 'lodash-es/findIndex';
import last from 'lodash-es/last';
import isEmpty from 'lodash-es/isEmpty';

const includes = searchElement => arrOrStr => arrOrStr.includes( searchElement );

const calcSubsection = ( arr, [ previousIndex ] ) => 
{
    const startingIndex = findIndex( arr, includes( '####' ), previousIndex ) + 1; // if it's -1 then this will return 0, TODO: is that ok?
    const endingIndex = findIndex( arr, includes( '####' ), startingIndex );

    return [
        startingIndex,
        endingIndex < 0 ? arr.length : endingIndex
    ];
};



export default ( codeArr, slideSections ) =>
{
    return slideSections.reduce(
        ( acc, sec ) =>
            isEmpty( sec )
                ? [ ...acc, [ 1, codeArr.length ] ]
                : includes( '#' )( sec )
                    ? [ ...acc, calcSubsection( codeArr, last( acc ) || [ 0 ] ) ]
                    : [ ...acc, sec ],
        []
    );
};
