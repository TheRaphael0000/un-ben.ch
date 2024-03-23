import { orderBy, countBy } from "lodash"
import main from "./main"


class PrivateContext {
    constructor() {
    }

    async updateCatalog() {
        this.catalog = await window.lcu.fetch("GET", "json", `/lol-catalog/v1/items/CHAMPION_SKIN`)
        this.catalog_skins = []
        this.catalog_chromas = []
        for (let item of this.catalog) {
            if (item.subInventoryType == "RECOLOR")
                this.catalog_chromas.push(item)
            else
                this.catalog_skins.push(item)
        }
    }

    async updateInventory() {
        this.inventory = await window.lcu.fetch("GET", "json", `/lol-inventory/v2/inventory/CHAMPION_SKIN`)
        this.owned_skins = []
        this.owned_chromas = []
        for (let item of this.inventory) {
            let entry = this.catalog.find(x => x.itemId == item.itemId)
            if (entry.subInventoryType == "RECOLOR")
                this.owned_chromas.push(entry)
            else
                this.owned_skins.push(entry)
        }
    }

    async updateSummoner() {
        this.summoner = await window.lcu.fetch("GET", "json", `/lol-summoner/v1/current-summoner`)
    }


    getChampFromSkin(x) {
        return parseInt(x.itemId.toString().slice(0, -3))
    }

    async updateChampions() {
        // let championFull = await window.file.fetch(`/data/en_US/championFull.json`)
        // let championFullValues = Object.values(championFull.data)
        // console.log(championFull)

        let champions = await window.lcu.fetch("GET", "json", `/lol-champions/v1/inventories/${this.summoner['summonerId']}/champions-minimal`)
        champions = champions.filter(c => c.id > 0)


        for (let champion of champions) {
            champion.mastery = this.masteries.find(x => x.championId == champion.id)
            champion.owned_skins = this.owned_skins.filter(x => this.getChampFromSkin(x) == champion.id)
            champion.catalog_skins = this.catalog_skins.filter(x => this.getChampFromSkin(x) == champion.id)
            champion.owned_chromas = this.owned_chromas.filter(x => this.getChampFromSkin(x) == champion.id)
            champion.catalog_chromas = this.catalog_chromas.filter(x => this.getChampFromSkin(x) == champion.id)
        }

        this.champions = orderBy(champions, [({ mastery }) => mastery != undefined, "mastery.championLevel", "mastery.championPoints"], ["desc", "desc", "desc"])
    }

    async updateMasteries(summoner) {
        this.masteries = await window.lcu.fetch("GET", "json", `/lol-collections/v1/inventories/${this.summoner['summonerId']}/champion-mastery`)
    }


    async updateFriends() {
        this.friends = await window.lcu.fetch("GET", "json", `/lol-chat/v1/friends`)
    }

    async updateChallenges() {
        let challenges = Object.values(await window.lcu.fetch("GET", "json", `/lol-challenges/v1/challenges/local-player`))

        for (let challenge of challenges) {
            // friends linking
            challenge.friendsAtLevels = orderBy(challenge.friendsAtLevels, (l) => -main.challenge_order.indexOf(l.level))

            for (let level of challenge.friendsAtLevels) {
                let friends_ = []
                for (let friend of level.friends) {
                    friends_.push(this.friends.find(f => f.puuid == friend))
                }
                level.friends = orderBy(friends_, "name")
            }

            if (challenge.idListType != "CHAMPION")
                continue;

            // champions linking
            let champions_ = [];
            for (let champion of this.champions) {
                champions_.push({
                    ...champion,
                    is_available: challenge.availableIds.length <= 0 || challenge.availableIds.includes(champion.id),
                    is_completed: challenge.completedIds.includes(champion.id)
                })
            }
            challenge["champions"] = champions_
        }
        this.challenges = orderBy(challenges, (c) => -main.challenge_order.indexOf(c.currentLevel))
    }

    async updateRankedData() {
        let opgg_ranked = await window.data.opgg_ranked()
        for (let c of this.champions) {
            c.ranked_data = opgg_ranked.data.find(d => d.id == c.id)
        }
    }

    async updateLobby() {
        let lobby = await window.lcu.fetch("GET", "json", `/lol-lobby/v2/lobby`)

        if (lobby?.httpStatus ?? 0 == 404) {
            this.lobby = undefined
            return
        }

        this.lobby = lobby
    }

    async updateOnce() {
        try {
            await this.updateSummoner()
            await this.updateFriends()
            await this.updateCatalog()
            await this.updateInventory()
            await this.updateMasteries()
            await this.updateChampions()
            await this.updateChallenges()
            await this.updateLobby()
            await this.updateRankedData()
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