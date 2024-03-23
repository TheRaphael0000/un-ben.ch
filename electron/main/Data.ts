let opgg_ranked = "https://lol-web-api.op.gg/api/v1.0/internal/bypass/champions/euw/ranked"

class Data {

    data = undefined

    constructor() {
        this.data = (async () => {
            console.log(opgg_ranked)
            const response = await fetch(opgg_ranked);
            return await response.json();
        })();
    }

    opgg_ranked() {
        return this.data
    }
}

export default Data