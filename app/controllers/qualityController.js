
const { checkPosition } = require("../helpers/checkPosition");
const logger = require("../logger/index");
const qualificationDAO = require("../services/qualificationDAO");
const userDAO = require("../services/userDAO");
const weetDAO = require("../services/weetDAO");


exports.qualityController = {
    create: async (req, res) => {

        try {
            const { score } = req.body;
            const { id} = req.params;
            const { id: idUser } = req.user.dataValues;
            const idWeet = Number(id)
            console.log(score);
            
            console.log(idWeet);
            console.log(idUser);
            const qualityExist = await qualificationDAO.getOne(idUser, idWeet);

            
            const qualifyCreate =
            qualityExist === null
            ? await qualificationDAO.create({ idUser, idWeet, score })
            : qualityExist
            
             
            const compareScore = 
                score === qualifyCreate.score
                    ? qualityExist
                    : await qualificationDAO.update( idWeet, score );

            const scoreSum = await qualificationDAO.scoreSum(compareScore.weetId)

            const weetUser = await weetDAO.getById(idWeet)
            const userPosition  = await userDAO.getById(weetUser.user_id)
           
            const comparePosition =
                checkPosition(scoreSum) === userPosition.dataValues.position 
                    ? userPosition
                    : await userDAO.updatePosition(weetUser.user_id, checkPosition(scoreSum))
            logger.info('Qualify Successfully')
            res.status(200).json({
                message: "Qualify Successfully",
                data: {
                    scoreSum,   
                    position:comparePosition.dataValues.position
                }
            });

        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: "Error al crear la calificacion",
                error
            });

        }

    }
}