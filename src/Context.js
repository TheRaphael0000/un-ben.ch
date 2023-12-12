import { orderBy } from "lodash"

class PrivateContext {
    constructor() {
    }

    async updateOnce() {
        try {
            this.summoner = await window.lcu.fetch("GET", "json", `/lol-summoner/v1/current-summoner`)
            this.challenges = Object.values(await window.lcu.fetch("GET", "json", `/lol-challenges/v1/challenges/local-player`))
            this.masteries = await window.lcu.fetch("GET", "json", `/lol-collections/v1/inventories/${this.summoner['summonerId']}/champion-mastery`)
            this.champions = await window.lcu.fetch("GET", "json", `/lol-champions/v1/inventories/${this.summoner['summonerId']}/champions-minimal`)

            this.champions = this.champions.filter(c => c.id > 0)

            for (let champion of this.champions) {
                champion.mastery = this.masteries.find(x => x.championId == champion.id)
            }
            this.champions = orderBy(this.champions, [({ mastery }) => mastery != undefined, "mastery.championLevel", "mastery.championPoints"], ["desc", "desc", "desc"])

            for (let challenge of this.challenges) {

                if (challenge.idListType != "CHAMPION")
                    continue;

                let champs = [];
                for (let champion of this.champions) {
                    champion = { ...champion }
                    champion.is_available = challenge.availableIds.length <= 0 || challenge.availableIds.includes(champion.id)
                    champion.is_completed = challenge.completedIds.includes(champion.id)
                    champs.push(champion)
                }

                challenge["champions"] = champs
            }

            this.challenges = this.challenges.filter(c => c?.champions?.length > 0)

            this.challenges.sort((a, b) => -(a.currentValue - b.currentValue))
        }
        catch (error) {
            console.error(error);
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