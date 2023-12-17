<script>

import ChampionChallenges from '../components/ChampionChallenges.vue'
import ChallengeCard from '../components/ChallengeCard.vue'
import ChallengeIcon from '../components/ChallengeIcon.vue'
import Champions from '../components/Champions.vue'
import Context from '../Context'

export default {
  components: {
    ChampionChallenges,
    ChallengeCard,
    ChallengeIcon,
    Champions,
  },
  data: () => ({
    challenge: null,
  }),
  async mounted() {
    let context = Context.getInstance()
    let id = this?.$route?.params?.challenge_id
    this.challenge = context.challenges.find(c => c.id == id)
    console.log(this.challenge)
  }
}

</script>

<template>
  <div>
    <h1>Friends challenge</h1>
    <div v-if="challenge != null">
      <ChallengeCard :challenge="challenge"></ChallengeCard>
      <div v-for="level in challenge.friendsAtLevels" class="level_container">
        <h2 class="level">
          <img class="challenge_icon" :src="`${$DD}/challenges-images/${challenge.id}-${level.level}.png`" />
          <div class="title">{{ level.level }}</div>
          <div class="friends_count">{{ level.friends.length }} friends</div>
        </h2>
        <div class="friends_flex">
          <div class="friend" v-for="friend in level.friends">
            <img class="profile_icon" :src="`${$DDP}/profileicon/${friend.icon}.png`" />
            <div class="name">
              {{ friend.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.level_container {
  /* border: 1px solid white; */
  margin: 10px;
  padding: 10px;
}

.level {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}


.level .friends_count {
  float: right;
}

.challenge_icon {
  width: 80px;
}

.friends_flex {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.friend {
  width: 250px;
  height: 40px;
  border: 1px solid gray;
  padding: 5px;
  margin: 5px;
}

.friend .name {
  text-align: center;
  padding: 10px 0;

}

.friend .profile_icon {
  width: 40px;
  float: left;
}
</style>
