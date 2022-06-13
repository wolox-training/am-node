const bcryptjs = require("bcryptjs");
const db = require('../models/index') 
const { apiJokeService } = require("../services/apiJokeService");
const userDAO = require("../services/userDAO");

exports.controller = {

    methodGET: async (req, res, next) => {

        try {

            const response = await apiJokeService();

            res.status(200).json(response);

        } catch (error) {
            next()
        }
    },

    methodPOST: async (req, res, next) => {

        try {

            let newUser = { ...req.body };

            newUser.password = bcryptjs.hashSync(req.body.password, 10);

            await userDAO.postUser(newUser);
            
            res.status(201).json({newUser})

        } catch (error) {
            console.log(error);
        }
    }
}
