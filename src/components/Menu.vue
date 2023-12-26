<script>
import Context from '../Context'

export default {
    components: {
    },
    data: () => ({
    }),
    async mounted() {
        document.querySelector("#refresh").addEventListener("click", () => {
            this.$router.go(0)
        });
    },
}
</script>


<template>
    <nav class="menu">
        <router-link to="/">Home</router-link>
        <router-link to="/ChallengesList">Challenges List</router-link>
        <router-link to="/ChampionSelect">Champion Select</router-link>
        <router-link to="/ChallengesChampions">Challenges Champions</router-link>
        <router-link to="/Ethernals">Ethernals</router-link>
        <router-link to="/InGame">In Game</router-link>
        <a href="#" id="refresh" class="right-align">Refresh</a>
    </nav>
</template>

<style scoped>
.menu {
    margin-bottom: 10px;
}

.background {
    position: fixed;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    filter: blur(5px);
    transform: scale(1.05);
    opacity: 0.8;
    z-index: -1;
}

nav {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    padding-bottom: 5px;
    border-bottom: 2px solid white;
}

nav>* {
    padding: 10px 20px;
}

.router-link-active {
    background-color: rgba(0, 255, 255, 0.3);
}

.right-align {
    margin-left: auto;
}
</style>