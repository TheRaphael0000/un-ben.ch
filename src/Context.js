class PrivateContext {
    constructor() {
    }

    async updateOnce() {
        try {
            this.summoner = await window.lcu.fetch("GET", "json", `/lol-summoner/v1/current-summoner`)
            this.challenges = Object.values(await window.lcu.fetch("GET", "json", `/lol-challenges/v1/challenges/local-player`))
            this.masteries = await window.lcu.fetch("GET", "json", `/lol-collections/v1/inventories/${this.summoner['summonerId']}/champion-mastery`)
            this.champions = await window.lcu.fetch("GET", "json", `/lol-champions/v1/inventories/${this.summoner['summonerId']}/champions-minimal`)

            this.champions = this.champions.filter(c => c.id > 0).sort((a, b) => a.name.localeCompare(b.name))

            for (let champion of this.champions) {
                champion.mastery = this.masteries.find(x => x.championId == champion.id)
            }
        }
        catch {
            return false
        }

    }

    async update() {
        try {
            this.champSelect = await window.lcu.fetch("GET", "json", `/lol-champ-select/v1/session`)
            // this.champSelect = await (await fetch("src/simulation/aramChampSelect.json")).json()
        }
        catch {
            return false
        }
    }

}


class Context {
    constructor() {
        throw new Error('Use Singleton.getInstance()');
    }

    static getInstance() {
        if (!Context.instance) {
            Context.instance = new PrivateContext();
        }
        return Context.instance;
    }

}

export default Context