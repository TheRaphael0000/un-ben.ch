import { orderBy } from "lodash"
import main from "./main"

class PrivateContext {
    constructor() {
    }

    async updateOnce() {
        try {
            this.summoner = await window.lcu.fetch("GET", "json", `/lol-summoner/v1/current-summoner`)
            this.challenges = Object.values(await window.lcu.fetch("GET", "json", `/lol-challenges/v1/challenges/local-player`))
            this.masteries = await window.lcu.fetch("GET", "json", `/lol-collections/v1/inventories/${this.summoner['summonerId']}/champion-mastery`)
            this.champions = await window.lcu.fetch("GET", "json", `/lol-champions/v1/inventories/${this.summoner['summonerId']}/champions-minimal`)
            this.friends = await window.lcu.fetch("GET", "json", `/lol-chat/v1/friends`)

            this.champions = this.champions.filter(c => c.id > 0)

            for (let champion of this.champions) {
                champion.mastery = this.masteries.find(x => x.championId == champion.id)
            }
            this.champions = orderBy(this.champions, [({ mastery }) => mastery != undefined, "mastery.championLevel", "mastery.championPoints"], ["desc", "desc", "desc"])

            for (let challenge of this.challenges) {
                // friends linking
                challenge.friendsAtLevels = orderBy(challenge.friendsAtLevels, (l) => -main.challenge_order.indexOf(l.level))

                for (let level of challenge.friendsAtLevels) {
                    let friends = []
                    for (let friend of level.friends) {
                        friends.push(this.friends.find(f => f.puuid == friend))
                    }
                    level.friends = orderBy(friends, "name")
                }

                if (challenge.idListType != "CHAMPION")
                    continue;

                // champions linking
                let champions = [];
                for (let champion of this.champions) {
                    champions.push({
                        ...champion,
                        is_available: challenge.availableIds.length <= 0 || challenge.availableIds.includes(champion.id),
                        is_completed: challenge.completedIds.includes(champion.id)
                    })
                }
                challenge["champions"] = champions
            }
            this.challenges = orderBy(this.challenges, (c) => -main.challenge_order.indexOf(c.currentLevel))
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