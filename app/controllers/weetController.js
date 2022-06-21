
const logger = require("../logger/index");
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
            const offset = Number(req.query.offset) > 0 ? Number(req.query.offset) : 0;
            const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 3;

            const weets = await weetDAO.getAllWeets({ offset, limit });
            logger.info(`Weets retrieved successfully`);
          
            res.status(200).json({ weets });

        } catch (error) {
            logger.error(`Error getting all weets: ${error}`);
            return res.status(500).json({ errors: error });
        }

    }

}


