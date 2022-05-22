const router = require('express').Router();
const dogByPassApiService = require('../../api/dog-api-bypass/dog-api-bypassService');
const aMW = require('./../../../middelwares/auth-mw');

router.get('/breed/list', aMW.authToken, async(req, resp, done)=> {
    try {
        await dogByPassApiService.breedList(resp);
    } catch (e) {
        return resp.status(500).json({ status: 'Error', message: e.message });
    }
});

router.get('/sub-bread/:bread/list', aMW.authToken, async(req, resp, done)=> {
    try {
        await dogByPassApiService.subBreedListByBreed(resp, req);
    } catch (e) {
        return resp.status(500).json({ status: 'Error', message: e.message });
    }
});

router.get('/sub-bread/:subbread/radom-image', aMW.authToken, async(req, resp, done)=> {
    try {
        await dogByPassApiService.imageUrlFromSubBread(resp, req);
    } catch (e) {
        return resp.status(500).json({ status: 'Error', message: e.message });
    }
});
module.exports = router;