const db = require('../models');

// create a new cake in db
exports.createCake = async(req, res) => {
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
exports.getAllCakes = async(req, res) => {
    console.log("getAllCakes");
    console.log(req.query);

    try {
        console.log(req.query.isGlutenFree !== undefined);

        let cakes;
        if (req.query.isGlutenFree !== undefined) {
            cakes = await db.Stock.find(req.query);
        } else if (req.query.baker !== undefined) {
            cakes = await db.Stock
                .find(req.query)
                .sort('expirationDate')
                .select('name baker expirationDate')
        } else {
            cakes = await db.Cake.find();
        }

        // let cakes = req.query
        //     ? await db.Cake
        //         .find(req.query)
        //         .sort('expirationDate')
        //         .select('name baker expirationDate')
        return res.status(200).json(cakes);
    } catch (err) {
        return res.status(400).json({
            message: 'Oh no! Could find all your cakes :/',
            error: err,
        });
    }
}

// display one cake with his ID
exports.getOneCake = async(req, res) => {
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
// exports.getOneBaker = async(req, res) => {
//     try {
//         console.log(req.query);
//         let cakesBaker = await db.Stock
//             .find(req.query)
//             .sort({ expirationDate: 1}) // ordre : 1= croissant, -1=decroissant
//             .select({name: 1, baker:1, expirationDate: 1 });
//             // .sort('expirationDate')
//             // .select('name baker expirationDate');
//         return res.status(200).json(cakesBaker);
//     } catch (err) {
//         return res.status(400).json({
//             message: 'Oh no! Could not find your baker and his cakes :/',
//             error: err,
//         });
//     }
// }

// display all cake with gluten
// exports.getAllGluten = async(req, res) => {
//     try {
//         console.log("getAllGluten");
//         console.log(req.query);
//         let cakesGluten = await db.Stock.find(req.query);
//         return res.status(200).json(cakesGluten);
//     } catch (err) {
//         return res.status(400).json({
//             message: 'Oh no! Could not create your cake :/',
//             error: err,
//         });
//     }
// }

// Update One cake with his ID
exports.updateOneCake = async(req, res) => {
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
exports.deleteOneCake = async(req, res) => {
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
