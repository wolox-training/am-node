
const logger = require("../logger/index");
const { paginateResults } = require("../helpers/paginateResults");
const weetDAO = require("../services/weetDAO");
const { apiJokeService } = require("../services/apiJokeService");

exports.weetController = {

    createWeet: async (req, res) => {

        try {

            const { id } = req.user;
            const content = await apiJokeService();

            let newWeet = { content, user_id: id };

            await weetDAO.create(newWeet);
            logger.info(`Weet created successfully`);

            res.status(201).json({ newWeet })

        } catch (error) {
            logger.error(`Error creating weet: ${error}`);
            return res.status(500).json({ errors: error });
        }
    },
    allWeets: async (req, res, next) => {

        try {

            const weets = await weetDAO.getAllWeets();
            logger.info(`Weets retrieved successfully`);
            const paginatedResults = paginateResults(req, weets);
            res.status(200).json({ paginatedResults });

        } catch (error) {
            logger.error(`Error getting all weets: ${error}`);
            return res.status(500).json({ errors: error });
        }

    }

}


