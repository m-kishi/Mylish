<!-- ==================================================
// ©2023 https://github.com/m-kishi
// ================================================ -->
<template>
  <div class="row margin">
    <div class="col s2">
      No.{{ sentence.no }}
    </div>
  </div>
  <div v-if="is_voice" class="row margin">
    <audio controls :src="`voices/${sentence.no}.mp3`"></audio>
  </div>
  <div v-else class="row margin">
    {{ sentence.ja }}
  </div>
  <div class="row margin" style="position:relative;">
    <textarea type="text" v-model="grades.answer" v-bind:readonly="show_answer" v-on:keydown.enter.meta.exact="submit" style="width:100%;"></textarea>
    <img v-if="show_answer && grades.result == 1" alt="OK" :src="require(`@/assets/OK.svg`)" class="answer">
    <img v-if="show_answer && grades.result == 0" alt="NG" :src="require(`@/assets/NG.svg`)" class="answer">
  </div>
  <div class="row" v-if="!show_answer">
    <div class="col s2 offset-s5">
      <a v-on:click.prevent="submit" class="btn-large waves-effect btn-mylish">OK</a>
    </div>
  </div>
  <div class="row margin" v-if="show_answer">
    <textarea type="text" v-model="sentence.en" readonly style="width:100%;"></textarea>
  </div>
  <div class="row" v-if="show_answer && is_continue">
    <div class="col s2 offset-s4">
      <a v-on:click.prevent="exit" class="btn-large waves-effect btn-mylish">終了</a>
    </div>
    <div class="col s2">
      <a v-on:click.prevent="get_sentence" class="btn-large waves-effect btn-mylish">次へ</a>
    </div>
  </div>
  <div class="row" v-if="show_answer && !is_continue">
    <div class="col s2 offset-s5">
      <a v-on:click.prevent="exit" class="btn-large waves-effect btn-mylish">終了</a>
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
  transform: translate(-145%, -70%);
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
      id: 1,
      is_voice: false,
      is_random: false,
      is_continue: false,
      show_answer: false,
      sentence: {
        no: 1,
        en: null,
        ja: null,
      },
      grades: {
        score_id: null,
        sentence_no: null,
        seq: 0,
        result: null,
        answer: null
      },
    };
  },
  // --------------------------------------------------
  // マウントイベント
  // --------------------------------------------------
  mounted() {
    this.id = this.$route.query.id;
    this.is_voice = JSON.parse(this.$route.query.is_voice);
    this.is_random = JSON.parse(this.$route.query.is_random);
    this.get_sentence();
  },
  methods: {
    // --------------------------------------------------
    // 文章を取得
    // --------------------------------------------------
    get_sentence() {
      this.show_answer = false;
      axios.get('/get_sentence', {
        params: {
          id: this.id,
          is_random: this.is_random,
        },
      })
        .then(res => {
          this.is_continue = !res.data.end_flg;
          if (this.is_continue) {
            this.sentence = res.data.sentence;
            this.grades.score_id = this.id;
            this.grades.sentence_no = this.sentence.no;
            this.grades.seq += 1;
            this.grades.result = 0;
            this.grades.answer = "";
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // --------------------------------------------------
    // 解答
    // --------------------------------------------------
    submit(e) {
      if (!e.ctrlKey && !e.metaKey) {
        return;
      }
      if (this.show_answer) {
        return;
      }
      this.show_answer = true;
      if (this.sentence.en == this.grades.answer) {
        this.grades.result = 1;
      } else {
        this.grades.result = 0;
      }
      axios.post('/submit', this.grades)
        .then(res => {
          this.is_continue = !res.data.end_flg;
        })
        .catch(e => {
          console.log(e);
        })
    },
    // --------------------------------------------------
    // 終了
    // --------------------------------------------------
    exit() {
      axios.post('/exit', { id: this.id })
        .then(res => {
          this.$router.push({ name: 'score', query: { id: this.id, } });
        })
        .catch(e => {
          console.log(e);
        })
    },
  },
}
</script>