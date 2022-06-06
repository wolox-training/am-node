const { default: axios } = require("axios");


exports.apiJokeService = async (req, res) => {

    try {
        const { data } = await axios('https://geek-jokes.sameerkumar.website/api?format=json');
        return data;

    } catch (error) {
       throw new Error(error);  
       
    }
}

