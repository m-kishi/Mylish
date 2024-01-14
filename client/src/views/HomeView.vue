<!-- ==================================================
// ©2023 https://github.com/m-kishi
// ================================================ -->
<template>
  <div class="row menu">
    <div class="menu-item">
      <a v-on:click="start" class="btn-large waves-effect teal btn-mylish">スタート</a>
    </div>
    <div class="menu-item">
      <label>
        <input type="checkbox" v-model="is_random" />
        <span>ランダム</span>
      </label>
    </div>
  </div>
  <div v-if="pagination.length > 0" class="row">
    <ul class="collection">
      <li v-for="s in pagination" class="collection-item">
        <div class="row" style="margin-bottom: auto;">
          <div class="col s4">
            <router-link :to="{
              name: 'score',
              query: { id: `${s.id}` }
            }" class="score-link">{{ s.started_at }}
            </router-link>
          </div>
          <div class="col s1 right-align"><span>{{ s.corrected }}</span></div>
          <div class="col s1 right-align"><span>/</span></div>
          <div class="col s1 right-align"><span>{{ s.answered }}</span></div>
          <div class="col s2 right-align"><span>{{ s.rate }} &#37;</span></div>
          <span class="badge">
            <a href="#" v-on:click.prevent="delete_score(s.id)">
              <i class="material-icons waves-effect icon-enable">delete</i>
            </a>
          </span>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="pagination.length > 0" class="row">
    <div class="col s12 center-align">
      <ul class="pagination">
        <li>
          <a href="#!" v-on:click.prevent="head_page">
            <i class="material-icons waves-effect" v-bind:class="prev_class">first_page</i>
          </a>
        </li>
        <li>
          <a href="#!" v-on:click.prevent="prev_page">
            <i class="material-icons waves-effect" v-bind:class="prev_class">navigate_before</i>
          </a>
        </li>
        <li class="page-label">
          <span>{{ page_no }} / {{ page_max }}</span>
        </li>
        <li>
          <a href="#!" v-on:click.prevent="next_page">
            <i class="material-icons waves-effect" v-bind:class="next_class">navigate_next</i>
          </a>
        </li>
        <li>
          <a href="#!" v-on:click.prevent="tail_page">
            <i class="material-icons waves-effect" v-bind:class="next_class">last_page</i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.menu {
  display: flex;
  align-items: center;
}

.menu-item {
  margin-right: 2.0rem;
}

.menu-item>label {
  color: #009688;
  font-weight: bold;
}

a.score-link:link {
  color: #009688;
  font-weight: bold;
}

a.score-link:visited {
  color: #009688;
  font-weight: bold;
}

a.score-link:hover {
  text-decoration: underline;
}

.icon-enable {
  color: #009688;
}

.icon-disable {
  color: #616161;
}

.page-label {
  color: #009688;
  padding-top: 3px;
  margin-left: 1.0rem;
  margin-right: 1.0rem;
}

.page-label>span {
  font-size: 22px;
  font-weight: bold;
}

a.btn-mylish {
  font-size: 20px;
  font-weight: bold;
}

input[type=text] {
  font-size: 20px !important;
}
</style>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  // --------------------------------------------------
  // バインドデータ
  // --------------------------------------------------
  data() {
    return {
      scores: [],
      page_no: 1,
      page_unit: 5,
      is_random: false,
    };
  },
  // --------------------------------------------------
  // マウントイベント
  // --------------------------------------------------
  mounted() {
    this.page_no = 1;
    this.get_scores();
  },
  methods: {
    // --------------------------------------------------
    // スコア一覧を取得
    // --------------------------------------------------
    get_scores() {
      axios.get('/get_scores')
        .then(res => {
          this.scores = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    // --------------------------------------------------
    // スタート
    // --------------------------------------------------
    start() {
      axios.post('/start')
        .then(res => {
          this.$router.push({
            name: 'exam',
            query: {
              id: res.data.id,
              is_random: this.is_random
            }
          });
        })
        .catch(e => {
          console.log(e);
        })
    },
    // --------------------------------------------------
    // スコアを削除
    // --------------------------------------------------
    delete_score(id) {
      axios.post('/delete_score', {
        id: id,
      })
        .then(res => {
          this.get_scores();
        })
        .catch(e => {
          console.log(e);
        })
    },
    // --------------------------------------------------
    // 先頭ページへ
    // --------------------------------------------------
    head_page() {
      if (this.disabled_prev) {
        return;
      }
      this.page_no = 1;
    },
    // --------------------------------------------------
    // 前ページへ
    // --------------------------------------------------
    prev_page() {
      if (this.disabled_prev) {
        return;
      }
      this.page_no -= 1;
    },
    // --------------------------------------------------
    // 次ページへ
    // --------------------------------------------------
    next_page() {
      if (this.disabled_next) {
        return;
      }
      this.page_no += 1;
    },
    // --------------------------------------------------
    // 最終ページへ
    // --------------------------------------------------
    tail_page() {
      if (this.disabled_next) {
        return;
      }
      this.page_no = this.page_max;
    }
  },
  computed: {
    // --------------------------------------------------
    // 最大ページ数
    // --------------------------------------------------
    page_max() {
      return Math.ceil(this.scores.length / this.page_unit);
    },
    // --------------------------------------------------
    // head と prev の無効化
    // --------------------------------------------------
    disabled_prev() {
      return this.page_no <= 1;
    },
    // --------------------------------------------------
    // next と tail の無効化
    // --------------------------------------------------
    disabled_next() {
      return this.page_no >= this.page_max;
    },
    // --------------------------------------------------
    // head と prev のクラス指定
    // --------------------------------------------------
    prev_class() {
      return {
        'icon-enable': !this.disabled_prev,
        'icon-disable': this.disabled_prev,
      };
    },
    // --------------------------------------------------
    // next と tail のクラス姿勢
    // --------------------------------------------------
    next_class() {
      return {
        'icon-enable': !this.disabled_next,
        'icon-disable': this.disabled_next,
      }
    },
    // --------------------------------------------------
    // ページ切り替え
    // --------------------------------------------------
    pagination() {
      if (this.scores.length == 0) {
        return [];
      }
      var str = (this.page_no - 1) * this.page_unit;
      var end = str + this.page_unit;
      if (end > this.scores.length) {
        end = this.scores.length;
      }
      return this.scores.slice(str, end);
    }
  }
}
</script>