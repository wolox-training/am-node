

const checkPosition = (scoreSum) => {
    switch (true) {
        case scoreSum >= 50:
            return 'ceo';
        case scoreSum >= 40:
            return 'head';
        case scoreSum >= 30:
            return 'em';
        case scoreSum >= 20:
            return 'tl';
        case scoreSum >= 10:
            return 'lead';
        case scoreSum >= 0 ||  scoreSum < 0:
            return 'developer';
        default:
            return 'not found';
    }
}


module.exports = {checkPosition};