import { orderBy, countBy } from "lodash"
import main from "./main"


class PrivateContext {
    constructor() {
    }

    async updateCatalog() {
        return await window.lcu.fetch("GET", "json", `/lol-catalog/v1/items/CHAMPION_SKIN`)
    }

    async updateSkins() {
        return await window.lcu.fetch("GET", "json", `/lol-inventory/v2/inventory/CHAMPION_SKIN`)
    }

    async updateSummoner() {
        return await window.lcu.fetch("GET", "json", `/lol-summoner/v1/current-summoner`)
    }

    async updateChampions(summoner, masteries, skins, catalog) {
        // let championFull = await window.file.fetch(`/data/en_US/championFull.json`)
        // let championFullValues = Object.values(championFull.data)
        // console.log(championFull)

        let champions = await window.lcu.fetch("GET", "json", `/lol-champions/v1/inventories/${summoner['summonerId']}/champions-minimal`)
        champions = champions.filter(c => c.id > 0)


        for (let champion of champions) {
            champion.mastery = masteries.find(x => x.championId == champion.id)
            champion.catalog = []
            champion.skins = []
            champion.chromas = []
        }

        for (let catalog_entry of catalog) {
            let champion = this.getChampFromSkin(champions, catalog_entry.itemId)
            champion.catalog.push(catalog_entry)
        }

        for (let skin of skins) {
            let champion = this.getChampFromSkin(champions, skin.itemId)
            let catalog_entry = this.catalog.find(c => c.itemId == skin.itemId)

            if (catalog_entry.subInventoryType == "RECOLOR")
                champion.chromas.push(skin)
            else
                champion.skins.push(skin)
        }

        return orderBy(champions, [({ mastery }) => mastery != undefined, "mastery.championLevel", "mastery.championPoints"], ["desc", "desc", "desc"])
    }

    getChampFromSkin(champions, skinId) {
        let id = parseInt(skinId.toString().slice(0, -3))
        return champions.find(s => s.id == id)
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
            this.skins = await this.updateSkins()
            this.catalog = await this.updateCatalog()
            this.masteries = await this.updateMasteries(this.summoner)
            this.champions = await this.updateChampions(this.summoner, this.masteries, this.skins, this.catalog)
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
            this.session.gameData.teamOne = orderBy(this.session.gameData.teamOne, (c) => main.role_order.indexOf(c.selectedPosition))
            this.session.gameData.teamTwo = orderBy(this.session.gameData.teamTwo, (c) => main.role_order.indexOf(c.selectedPosition))

            const players = this.session.gameData.teamOne.concat(this.session.gameData.teamTwo)

            for (let player of players) {
                await this.addPlayerData(player, this.session.gameData.playerChampionSelections)
            }


        }
        catch {
            return false
        }
    }

    async updateMatches() {
        const players = this.session.gameData.teamOne.concat(this.session.gameData.teamTwo)
        for (let player of players) {
            await this.addPlayerMatches(player)
            await this.addPlayerGames(player)
        }
    }

    async updateFriendGroup() {
        const players = this.session.gameData.teamOne.concat(this.session.gameData.teamTwo)
    }

    async addPlayerData(player, selections) {
        player.profile = await window.lcu.fetch("GET", "json", `/lol-summoner/v2/summoners/puuid/${player.puuid}`)
        player.ranked = await window.lcu.fetch("GET", "json", `/lol-ranked/v1/ranked-stats/${player.puuid}`)
        player.champion = this.champions.find(c => c.id == player.championId)
        player.current = player.summonerId == this.summoner.summonerId
        player.selection = selections.find(s => s.summonerInternalName == player.summonerInternalName)
    }

    async addPlayerMatches(player) {
        player.matches = await window.lcu.fetch("GET", "json", `/lol-match-history/v1/products/lol/${player.puuid}/matches`)
    }

    async addPlayerGames(player) {
        player.friends = new Set()
        for (let game of player.matches.games.games) {
            game.details = await window.lcu.fetch("GET", "json", `/lol-match-history/v1/games/${game.gameId}`)
            for (const [id, participant] of Object.entries(game.details.participantIdentities)) {
                if (participant.player.puuid != player.puuid)
                    player.friends.add(participant.player.puuid)
            }
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