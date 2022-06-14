


const paginateResults = (req,model) => {


    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    let results = {
        next: {},
        previous: {},
        results: []
    };

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if(endIndex < model.length) {
        results.next = {
            page : page + 1,
            limit
        };
    }

    if(startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit
        };
    }

    results.results = model.slice(startIndex, endIndex);
    return results;

}

module.exports = {
    paginateResults
}