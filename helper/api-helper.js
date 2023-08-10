import Const from "./constant";

// Making the API call using fetch
export default function requestTdbmApi(url, { params = {}, method, body }) {
    const queryString = new URLSearchParams({ ...params,  }).toString();
    const queryParams = queryString ? `?${queryString}` : '';
    const  apiUrlWithQuery = `${Const.TMDB.API_BASE_URL}/${url}${queryParams}`;

    let fetchOptions = {
        method, // HTTP method (change as needed) api_key: Const.TMDB.API_KEY
        headers: {
            'Content-Type': 'application/json', // Request content type
            Authorization: `Bearer ${Const.TMDB.AUTH_KEY}`, // Add the authorization header
            accept: 'application/json',
            // Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDY4MmY5ZjdlODczZjlmZWZhOWM0Nzk0OWFjYTQxNCIsInN1YiI6IjYxMWNhNGJjNmMxOWVhMDAyZDhkZDI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aZvCmWx_NdBXWRrNAUnDvVqx1YXiO60sS7A_FLv0oGo'
        },
    };

    if (body) {
        fetchOptions = {
            ...fetchOptions,
            body: JSON.stringify(payload), // Add the request payload
        }
    }

    return fetch(apiUrlWithQuery, fetchOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response body as JSON
    })
    .catch(error => {
        console.error(apiUrlWithQuery, "key", Const.TMDB.API_KEY,'API Error:', error); // Handle any errors that occurred
    });
}


// const fetch = require('node-fetch');

// const url = 'https://api.themoviedb.org/3/account/10937035';
// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDY4MmY5ZjdlODczZjlmZWZhOWM0Nzk0OWFjYTQxNCIsInN1YiI6IjYxMWNhNGJjNmMxOWVhMDAyZDhkZDI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aZvCmWx_NdBXWRrNAUnDvVqx1YXiO60sS7A_FLv0oGo'
//     }
// };

// fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.error('error:' + err));