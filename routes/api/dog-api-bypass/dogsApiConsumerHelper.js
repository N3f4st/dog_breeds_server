const https = require('https');

const dogApiHostName = 'dog.ceo';
const dogsApiConsumerHelper = {
   /**
   * Retrieves all the dog breeds information from the api
   */
    breedList: async() => {
        const breedListReqOptions = {
            host: dogApiHostName,
            path: '/api/breeds/list/all',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          };
        return await requestify(breedListReqOptions);
    },
    /**
   * Retrieves all the dog sub-breeds information from the api
   */
    subBreedList: async(breed) => {
        const subBreedListReqOptions = {
            host: dogApiHostName,
            path: `/api/breed/${breed}/list`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          };
        return await requestify(subBreedListReqOptions);
    },
   /**
   * Retrieve a random image link from sub-breed
   */
    imageUrl: async(subBread) => {
        const subBreedListReqOptions = {
            host: dogApiHostName,
            path: `/api/breed/${subBread}/images/random`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          };
        return await requestify(subBreedListReqOptions);
    }
}
const requestify = async(requestOptions)=> {
    return await new Promise((resolve, reject)=> {
        https.request(requestOptions, (apiResponse)=> {
            let chunkData = '';
            apiResponse.on('data', (chunk)=> {
                chunkData += chunk;
            });
            
            apiResponse.on('end', ()=> {
                httpResponse = JSON.parse(chunkData);
                resolve(httpResponse);
            });
        
            apiResponse.on('error', error => {
                reject(error)
              });
        }).end();
    })
}
module.exports = dogsApiConsumerHelper;