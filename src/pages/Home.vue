<script>

import Context from '../Context'

export default {
    components: {
    },
    data: () => ({
        challenges: null,
        summoner: null,
    }),
    mounted() {
        let context = Context.getInstance()
        this.summoner = context.summoner
        console.log(this.summoner)
    }
}

</script>


<template>
    <div>
        <h1>Welcome to Un-ben.ch !</h1>
        <p>
            It's only the beginning this project is still under development
        </p>
        <h2>Current account: </h2>
        <div class="account" v-if="summoner != null">
            <img class="profile_icon" :src="`${$DDP}/profileicon/${summoner.profileIconId}.png`" />
            <h4 class="name">
                {{ summoner.gameName }} #{{ summoner.tagLine }}
            </h4>
        </div>
        <p v-else>
            Un-ben.ch needs to communicate with the League of Legends client. Please start it ! Or try refreshing
        </p>
    </div>
</template>


<style scoped>
.account {
    display: flex;
    align-items: center;
    justify-content: center;
}

.profile_icon {
    width: 100px;
}
</style>