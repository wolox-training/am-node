const db = require('../models/index');
const { Op } = require('sequelize');

const qualificationDAO = {
    create: async ({ idUser, idWeet, score }) => {
        try {
            const qualification = await db.Qualification.create({
                ratingUserId: idUser,
                weetId: idWeet,
                score
            });
            return qualification;

        } catch (error) {
            return error
        }
    },
    update: async (idWeet, score) => {
        try {
            const qualification = await db.Qualification.update(
                { score: score },
                {
                    where: {
                        id: idWeet
                    },
                    returning: true,
                    plain: true
                }
            );
            return qualification;
        }
        catch (error) {
            return error
        }
    },
    getOne: async (idUser, idWeet) => {
        try {
            const qualification = await db.Qualification.findOne({
                where:
                {
                    [Op.and]: [{ ratingUserId: idUser, weetId: idWeet }]
                }
            });
            return qualification;
        }
        catch (error) {
            return error
        }
    },
    totalWeet: async ({ idUser, idWeet }) => {

        try {

            const result = await db.Qualification.count({
                where:
                {
                    [Op.and]: [{ ratingUserId: idUser, weetId: idWeet }]
                }
            })
            return result;

        } catch (error) {
            return error
        }
    },
    scoreSum: async idWeet => {
        try {
            const result = await db.Qualification.sum('score', {
                where: {
                    weetId: idWeet
                }
            })
            return result;
        }
        catch (error) {
            return error
        }
    }
}



module.exports = qualificationDAO;