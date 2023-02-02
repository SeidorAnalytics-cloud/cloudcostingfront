
// const apiBaseUrl = window.location.origin;
const apiBaseUrl = 'http://localhost:5000/api';
// const apiBaseUrl = 'https://fbacqas.seidoranalytics.com/api';


const fetchBackend = ( endpoint, data, method = 'GET' ) => {
    
    const url = `${ apiBaseUrl }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}



export {
    fetchBackend,
    apiBaseUrl
}