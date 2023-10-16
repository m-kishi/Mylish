<!-- ==================================================
// ©2023 https://github.com/m-kishi
// ================================================ -->
<template>
  <div class="row">
    {{ id }}
  </div>
</template>
<style></style>
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
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  },
};
</script>