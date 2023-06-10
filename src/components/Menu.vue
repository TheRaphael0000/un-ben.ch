<template>
    <nav>
        <div><router-link to="/">Home</router-link></div>
        <div><router-link to="/ChallengesList">Challenges List</router-link></div>
        <div><router-link to="/ChampionSelect">Champion Select</router-link></div>
        <div><a href="#" id="refresh">Refresh</a></div>
    </nav>
</template>

<script>
export default {
    mounted() {
        document.querySelector("#refresh").addEventListener("click", () => { this.$router.go(0) });
    },
}
</script>

<style scoped>
nav {
    display: flex;
    margin-top: 10px;
    margin-bottom: 40px;
    padding-bottom: 10px;
    border-bottom: 2px solid white;
}

nav div {
    width: auto;
    padding: 10px 20px;
}

.router-link-active {
    color: greenyellow;
}
</style>