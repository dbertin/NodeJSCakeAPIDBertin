const express = require('express');
const router = express.Router();

const handlerCakes = require('../handlers/cakes');

router.route('/')
    .post(handlerCakes.createCake)
    .get(handlerCakes.getAllCakes);

router.route('/:id')
    .get(handlerCakes.getOneCake)
    .put(handlerCakes.updateOneCake)
    .delete(handlerCakes.deleteOneCake);

module.exports = router;