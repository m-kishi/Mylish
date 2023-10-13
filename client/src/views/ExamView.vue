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
  <div class="row margin">
    <input type="text" style="width:100%;">
  </div>
  <div class="row">
    <div class="col s2 offset-s5">
      <a class="btn-large waves-effect center">OK</a>
    </div>
  </div>
</template>
<style>
.margin {
  margin-left: 1.0rem;
  margin-right: 1.0rem;
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
      axios.get('/get_sentence', {
        params: {
          id: this.id,
          is_random: this.is_random,
        },
      })
        .then(res => {
          if (res.data.endflg) {

          } else {
            this.sentence = res.data.sentence;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
}
</script>