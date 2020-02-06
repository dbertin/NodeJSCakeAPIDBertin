const db = require('../models');

// create a new cake in db
exports.createCake = async(res, req) => {
    try {
        let newCake = await db.Cake.create(req.body);
        return res.status(200).json({
            message: `Creation of your new cake ${newCake.name} by ${newCake.baker} :)`,
            newCake,
        })
    } catch (err) {
        return res.status(400).json({
            message: 'Oh no! Could not create your cake :/',
            error: err,
        });
    }
}

// display all cakes we have
exports.getAllCakes = async(res, req) => {
    try {
        let cakes = await db.Cake.find();
        return res.status(200).json(cakes);
    } catch (err) {
        return res.status(400).json({
            message: 'Oh no! Could find all your cakes :/',
            error: err,
        });
    }
}

// display one cake with his ID
exports.getOneCake = async(res, req) => {
    try {
        let cake = await db.Cake.findById(req.params.id);
        return res.status(200).json(cake);
    } catch (err) {
        return res.status(400).json({
            message: 'Oh no! Could not find your cake :/',
            error: err,
        });
    }
}

// display all cakes for on baker
// find by date expiration date
// display only : cake name, baker, expiration date
exports.getOneBaker = async(res, req) => {
    try {
        let cakesBaker = await db.Stock.find(req.query).sort('expirationDate').select('name baker expirationDate');
        return res.status(200).json(cakesBaker);
    } catch (err) {
        return res.status(400).json({
            message: 'Oh no! Could not find your baker and his cakes :/',
            error: err,
        });
    }
}

// display all cake with gluten
exports.getAllGluten = async(res, req) => {
    try {
        let cakesGluten = await db.Stock.find(req.query);
        return res.status(200).json(cakesGluten);
    } catch (err) {
        return res.status(400).json({
            message: 'Oh no! Could not create your cake :/',
            error: err,
        });
    }
}

// Update One cake with his ID
exports.updateOneCake = async(res, req) => {
    try {
        let cakeToUpdate = await db.Cake.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true}
        );
        return res.status(200).json({
            message: 'Your cake has been modified',
            cakeToUpdate
        })
    } catch (err) {
        return res.status(400).json({
            message: 'Oh no! Could not create your cake :/',
            error: err,
        });
    }
}

// delete One cake with his id
exports.deleteOneCake = async(res, req) => {
    try {
        await db.Cake.findByIdAndRemove(req.params.id);
        return res.status(200).json('Cake deleted');
    } catch (err) {
        return res.status(400).json({
            message: 'Oh no! Could not create your cake :/',
            error: err,
        });
    }
}
