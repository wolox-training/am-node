const { default: axios } = require("axios");


exports.apiJokeService = async () => {

    try {
        const { data } = await axios('https://geek-jokes.sameerkumar.website/api?format=json');
        
        finalJoke = data.joke.length > 140 ? data.joke.substring(0, 140) : data.joke;
        
        return finalJoke;

    } catch (error) {
       throw new Error(error);  
       
    }
}

