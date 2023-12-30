import { orderBy } from "lodash"
import main from "./main"

class PrivateContext {
    constructor() {
    }

    async updateCatalogue() {
        return await window.lcu.fetch("GET", "json", `/lol-catalog/v1/items/CHAMPION_SKIN`)
    }

    async updateSkins() {
        return await window.lcu.fetch("GET", "json", `/lol-inventory/v2/inventory/CHAMPION_SKIN`)
    }

    async updateSummoner() {
        return await window.lcu.fetch("GET", "json", `/lol-summoner/v1/current-summoner`)
    }

    async updateChampions(summoner, masteries, skins) {
        let champions = await window.lcu.fetch("GET", "json", `/lol-champions/v1/inventories/${summoner['summonerId']}/champions-minimal`)
        champions = champions.filter(c => c.id > 0)

        for (let champion of champions) {
            champion.mastery = masteries.find(x => x.championId == champion.id)
            // champion.skins = skins.filter(s => s.)
        }
        return orderBy(champions, [({ mastery }) => mastery != undefined, "mastery.championLevel", "mastery.championPoints"], ["desc", "desc", "desc"])
    }

    async updateMasteries(summoner) {
        return await window.lcu.fetch("GET", "json", `/lol-collections/v1/inventories/${summoner['summonerId']}/champion-mastery`)
    }

    async updateFriends() {
        return await window.lcu.fetch("GET", "json", `/lol-chat/v1/friends`)
    }

    async updateChallenges(champions, friends) {
        let challenges = Object.values(await window.lcu.fetch("GET", "json", `/lol-challenges/v1/challenges/local-player`))

        for (let challenge of challenges) {
            // friends linking
            challenge.friendsAtLevels = orderBy(challenge.friendsAtLevels, (l) => -main.challenge_order.indexOf(l.level))

            for (let level of challenge.friendsAtLevels) {
                let friends_ = []
                for (let friend of level.friends) {
                    friends_.push(friends.find(f => f.puuid == friend))
                }
                level.friends = orderBy(friends_, "name")
            }

            if (challenge.idListType != "CHAMPION")
                continue;

            // champions linking
            let champions_ = [];
            for (let champion of champions) {
                champions_.push({
                    ...champion,
                    is_available: challenge.availableIds.length <= 0 || challenge.availableIds.includes(champion.id),
                    is_completed: challenge.completedIds.includes(champion.id)
                })
            }
            challenge["champions"] = champions_
        }
        challenges = orderBy(challenges, (c) => -main.challenge_order.indexOf(c.currentLevel))
        return challenges
    }

    async updateLobby() {
        let lobby = await window.lcu.fetch("GET", "json", `/lol-lobby/v2/lobby`)

        if (lobby?.httpStatus ?? 0 == 404) {
            return undefined
        }

        return lobby
    }

    async updateOnce() {
        try {
            this.summoner = await this.updateSummoner()
            this.friends = await this.updateFriends()
            // this.skins = await this.updateSkins()
            // this.catalogue = await this.updateCatalogue()
            // console.log(this.skins)
            // console.log(this.catalogue)
            this.masteries = await this.updateMasteries(this.summoner)
            this.champions = await this.updateChampions(this.summoner, this.masteries)
            this.challenges = await this.updateChallenges(this.champions, this.friends)
            this.lobby = await this.updateLobby()
            console.log(this)
        }
        catch (error) {
            console.error(error);
            return false
        }

    }

    async updateChampSelect() {
        try {
            this.champSelect = await window.lcu.fetch("GET", "json", `/lol-champ-select/v1/session`)
            // this.champSelect = await (await fetch("src/simulation/aramChampSelect.json")).json()
        }
        catch {
            return false
        }
    }

    async updateGameflow() {
        try {
            this.session = await window.lcu.fetch("GET", "json", `/lol-gameflow/v1/session`)
            // this.session = await (await fetch("src/simulation/sessionCustom.json")).json()

            if (this.session?.httpStatus ?? 0 == 404) {
                this.session = undefined
                throw new Error()
            }

            for (let player of this.session.gameData.teamOne.concat(this.session.gameData.teamTwo)) {
                await this.addPlayerData(player, this.session.gameData.playerChampionSelections)
            }

            this.session.gameData.teamOne = orderBy(this.session.gameData.teamOne, (c) => main.role_order.indexOf(c.selectedPosition))
            this.session.gameData.teamTwo = orderBy(this.session.gameData.teamTwo, (c) => main.role_order.indexOf(c.selectedPosition))
        }
        catch {
            return false
        }
    }

    async addPlayerData(player, selections) {
        player.profile = await window.lcu.fetch("GET", "json", `/lol-summoner/v2/summoners/puuid/${player.puuid}`)
        player.ranked = await window.lcu.fetch("GET", "json", `/lol-ranked/v1/ranked-stats/${player.puuid}`)
        player.champion = this.champions.find(c => c.id == player.championId)
        player.current = player.summonerId == this.summoner.summonerId
        player.selection = selections.find(s => s.summonerInternalName == player.summonerInternalName)
    }

    async playerMatches(player) {
        if (player?.matches == undefined) {
            player.matches = await window.lcu.fetch("GET", "json", `/lol-match-history/v1/products/lol/${player.puuid}/matches`)
        }
    }


    championById(id) {
        return this.champions.find(c => c.id == id)
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