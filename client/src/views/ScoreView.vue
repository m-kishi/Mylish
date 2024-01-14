<!-- ==================================================
// ©2023 https://github.com/m-kishi
// ================================================ -->
<template>
  <div class="row header">
    <div class="col s2">
      <a v-on:click.prevent="back" class="btn-large waves-effect btn-mylish">戻る</a>
    </div>
    <div class="col s4">
      {{ score.started_at }}
    </div>
    <div class="col s2 offset-s2 right-align">
      {{ score.corrected }} / {{ score.answered }}
    </div>
    <div class="col s2 right-align">
      {{ score.rate }} &#37;
    </div>
  </div>
  <div class="row">
    <ul class="collection">
      <li v-for="g in grades" class="collection-item">
        <div class="row grade-row">
          <div class="col s1">
            No. {{ g.seq }}
          </div>
          <div class="col s11">
            <div v-html="g.ja"></div>
          </div>
        </div>
        <div class="row grade-row">
          <div class="col s1 center-align">
            <template v-if="g.result == 1">
              <img alt="OK" :src="require(`@/assets/OK.svg`)" class="result">
            </template>
            <template v-else>
              <img alt="NG" :src="require(`@/assets/NG.svg`)" class="result">
            </template>
          </div>
          <div class="col s11">
            <div v-html="g.answer"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="row">
    <div class="col s2">
      <a v-on:click.prevent="back" class="btn-large waves-effect btn-mylish">戻る</a>
    </div>
  </div>
</template>

<style>
div.header {
  display: flex;
  align-items: center;
}

.grade-row {
  margin-bottom: 0 !important;
}

img.result {
  width: 1.2rem;
  height: 1.2rem;
  margin: auto;
  margin-top: 0.2rem;
}
</style>

<script>
import axios from 'axios';

export default {
  name: 'ScoreView',
  // --------------------------------------------------
  // バインドデータ
  // --------------------------------------------------
  data() {
    return {
      id: null,
      score: {
        id: null,
        started_at: null,
        answered: null,
        corrected: null,
        rate: null,
      },
      grades: [],
    };
  },
  // --------------------------------------------------
  // マウントイベント
  // --------------------------------------------------
  mounted() {
    this.id = this.$route.query.id;
    axios.get('/get_score', {
      params: {
        id: this.id,
      },
    })
      .then(res => {
        this.score = res.data.score;
        this.grades = res.data.grades;
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    // --------------------------------------------------
    // 戻る
    // --------------------------------------------------
    back() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>