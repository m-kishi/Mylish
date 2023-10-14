<!-- ==================================================
// ©2023 https://github.com/m-kishi
// ================================================ -->
<template>
  <div class="row margin">
    No.{{ sentence.no }}
  </div>
  <div class="row margin">
    {{ sentence.ja }}
  </div>
  <div class="row margin" style="position:relative;">
    <input type="text" style="width:100%;">
    <img v-if="show_answer && is_correct" alt="OK" :src="require(`@/assets/OK.svg`)" class="answer">
    <img v-if="show_answer && !is_correct" alt="NG" :src="require(`@/assets/NG.svg`)" class="answer">
  </div>
  <div class="row" v-if="!show_answer">
    <div class="col s2 offset-s5">
      <a v-on:click.preven="submit" class="btn-large waves-effect btn-mylish">OK</a>
    </div>
  </div>
  <div class="row margin" v-if="show_answer">
    <input type="text" v-model="sentence.en" readonly style="width:100%;" >
  </div>
  <div class="row" v-if="show_answer">
    <div class="col s2 offset-s4">
      <a v-on:click.prevent="exit" class="btn-large waves-effect btn-mylish">終了</a>
    </div>
    <div class="col s2">
      <a v-on:click.prevent="next" class="btn-large waves-effect btn-mylish">次へ</a>
    </div>
  </div>
</template>
<style>
.margin {
  margin-left: 2.0rem;
  margin-right: 1.0rem;
}
img.answer {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-145%, -75%);
  width: 1.0rem;
  height: 1.0rem;
}
</style>
<script>
import axios from 'axios';

export default {
  name: 'ExamView',
  // --------------------------------------------------
  // バインドデータ
  // --------------------------------------------------
  data() {
    return {
      id: null,
      is_voice: null,
      is_random: null,
      is_correct: false,
      is_continue: false,
      show_answer: false,
      sentence: { no: null, en: null, ja: null, },
    };
  },
  // --------------------------------------------------
  // マウントイベント
  // --------------------------------------------------
  mounted() {
    this.id = this.$route.query.id;
    this.is_voice = this.$route.query.is_voice;
    this.is_random = this.$route.query.is_random;
    this.get_sentence();
  },
  methods: {
    // --------------------------------------------------
    // 文章を取得
    // --------------------------------------------------
    get_sentence() {
      this.is_correct = false;
      this.show_answer = false;
      axios.get('/get_sentence', {
        params: {
          id: this.id,
          is_random: this.is_random,
        },
      })
        .then(res => {
          this.is_continue = !res.data.endflg;
          if (this.is_continue) {
            this.sentence = res.data.sentence;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // --------------------------------------------------
    // 解答
    // --------------------------------------------------
    submit() {
      this.show_answer = true;
    },
    next() {
      console.log('next');
    },
    exit() {
      console.log('exit');
    },
  },
  computed: {
    
  },
}
</script>