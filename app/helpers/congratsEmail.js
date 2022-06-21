
const CronJob = require('cron').CronJob;
const logger = require('../logger/index');
const userDAO = require('../services/userDAO');


const job = new CronJob(
    '00 00 18 * * 0-6',
    async () => {
        logger.info('Cron job started');
        logger.info('Run at 18:00 every day');
        const users = await userDAO.getAllUser({ offset: 0, limit: 5 });
        const emailParams = {
            from: 'Team Wolox <woloxTeam@wolox>',
            to: users[1].email,
            subject: 'Congratulations to the best Weeter!',
            text: 'Congratulations to the best Weeter!',
            html: '<h1>Congratulations to the best Weeter!</h1>'
        }
        for (let i = 0; i < users.length; i++) {
            await userEmail(emailParams);
        }   
        logger.info('Cron job finished');
    },
    null,
    true,
    'America/Argentina/Buenos_Aires'
);

module.exports = {
    job
  };