const m = require('../../../message_constants');
const dogsApiConsumerHelper = require('./dogsApiConsumerHelper')
const dogApiByPassService = {
   /**
   * Retrieves all the dog breeds information
   * @param {Object} resp - server response
   */
      breedList: async(resp) => {
        const breeds = await dogsApiConsumerHelper.breedList();

        // Check if has any error on the api consumption
        if (breeds.status === 'error')
            return resp.status(400).json({
                status: 1003,
                error: breeds.message,
                clientMessage: m.DOG_API_ERR_CLIENT_MSJ
            });

        return resp.status(200).json({
            status: 1000,
            breeds: breeds.message,
            clientMessage: m.DOG_API_SCSS_CLIENT_MSJ
        });
      },
    /**
   * Retrieves all the dog sub-breed list from breed.
   * @param {Object} resp - server response.
   * @param {Object} resp - http client request.
   */
      subBreedListByBreed: async(resp, req) =>{
        if (!req.params.bread) 
        return resp.status(400).send(m.MLFRMD_ERR_MSJ);

        const pathParamBreed = req.params.bread;
        const subreadList = await dogsApiConsumerHelper.subBreedList(pathParamBreed);

        // Check if has any error on the api consumption
        if (subreadList.status === 'error')
            return resp.status(400).json({
                status: 1003,
                error: subreadList.message,
                clientMessage: m.DOG_API_ERR_CLIENT_MSJ
            });

        return resp.status(200).json({
            status: 1000,
            subreads: subreadList.message,
            clientMessage: m.DOG_API_SCSS_CLIENT_MSJ
        });
      },
    /**
     * Retrieves one random image url from a dog sub-breed
     * @param {Object} resp - server response.
     * @param {Object} resp - http client request.
     */
      imageUrlFromSubBread: async(resp, req) =>{
        if (!req.params.subbread) 
        return resp.status(400).send(m.MLFRMD_ERR_MSJ);

        const pathParamSubBreed = req.params.subbread;
        const imageUrl = await dogsApiConsumerHelper.imageUrl(pathParamSubBreed);

        // Check if has any error on the api consumption
        if (imageUrl.status === 'error')
            return resp.status(400).json({
                status: 1003,
                error: imageUrl.message,
                clientMessage: m.DOG_API_ERR_CLIENT_MSJ
            });

        return resp.status(200).json({
            status: 1000,
            url: imageUrl.message,
            clientMessage: m.DOG_API_SCSS_CLIENT_MSJ
        });
      }
}
module.exports = dogApiByPassService