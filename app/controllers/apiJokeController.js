
const { apiJokeService } = require("../services/apiJokeService");


exports.controller = {

    methodGET: async (req, res, next) => {

        try {

            const response = await apiJokeService();

            res.status(200).json(response);

        } catch (error) {
            next()
        }
    },
}
