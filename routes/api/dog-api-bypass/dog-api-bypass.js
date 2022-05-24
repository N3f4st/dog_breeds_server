const router = require('express').Router();
const dogByPassApiService = require('../../api/dog-api-bypass/dog-api-bypassService');
const authService = require('../../auth/authService');
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

router.get('/:breed/sub-bread/:subbread/random-image', aMW.authToken, async(req, resp, done)=> {
    try {
        await dogByPassApiService.imageUrlFromSubBread(resp, req);
    } catch (e) {
        return resp.status(500).json({ status: 'Error', message: e.message });
    }
});

router.put('/set-as-favorite-breed', aMW.authToken, async(req, resp, done)=> {
    try {
        await authService.setBreedAsFavorite(req.body, resp);
    } catch (e) {
        return resp.status(500).json({ status: 'Error', message: e.message });
    }
});
module.exports = router;