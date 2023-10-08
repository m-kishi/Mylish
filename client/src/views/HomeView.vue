<!-- ==================================================
// ©2023 https://github.com/m-kishi
// ================================================ -->
<template>
  <div class="row menu">
    <div class="menu-item">
      <a class="btn-large waves-effect teal start">スタート</a>
    </div>
    <div class="menu-item">
      <label>
        <input type="checkbox" />
        <span>音声</span>
      </label>
    </div>
    <div class="menu-item">
      <label>
        <input type="checkbox" />
        <span>ランダム</span>
      </label>
    </div>
  </div>
  <div class="row">
    <ul v-for="s in pagination" class="collection">
      <li class="collection-item">
        <div class="row" style="margin-bottom: auto;">
          <div class="col s4"><span>{{ s.started_at }}</span></div>
          <div class="col s1 right-align"><span>{{ s.corrected }}</span></div>
          <div class="col s1 right-align"><span>/</span></div>
          <div class="col s1 right-align"><span>{{ s.answerd }}</span></div>
          <div class="col s2 right-align"><span>{{ s.rate }} &#37;</span></div>
          <span class="badge">
            <a href="#"><i class="material-icons icon-enable">delete</i></a>
          </span>
        </div>
      </li>
    </ul>
  </div>
  <div class="row">
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

.menu-item>a {
  font-size: 20px;
  font-weight: bold;
}

.menu-item>label {
  color: #009688;
  font-weight: bold;
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
</style>

<script>
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
    };
  },
  // --------------------------------------------------
  // マウントイベント
  // --------------------------------------------------
  mounted() {
    this.page_no = 1;
    this.scores.push({ id: 1, started_at: '2023/10/01 12:00:00', answerd: 1, corrected: 20, rate: '50' })
    this.scores.push({ id: 2, started_at: '2023/10/01 12:30:00', answerd: 11, corrected: 120, rate: '55' })
    this.scores.push({ id: 3, started_at: '2023/10/01 13:45:00', answerd: 12, corrected: 20, rate: '60' })
    this.scores.push({ id: 4, started_at: '2023/10/02 09:00:00', answerd: 13, corrected: 20, rate: '65' })
    this.scores.push({ id: 5, started_at: '2023/10/03 11:00:00', answerd: 14, corrected: 20, rate: '70' })
    this.scores.push({ id: 6, started_at: '2023/10/04 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 7, started_at: '2023/10/05 12:30:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 8, started_at: '2023/10/06 13:45:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 9, started_at: '2023/10/07 09:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 10, started_at: '2023/10/08 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 11, started_at: '2023/10/09 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 12, started_at: '2023/10/10 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 13, started_at: '2023/10/11 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 14, started_at: '2023/10/12 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 15, started_at: '2023/10/13 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 16, started_at: '2023/10/14 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 17, started_at: '2023/10/15 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 18, started_at: '2023/10/16 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 19, started_at: '2023/10/17 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 20, started_at: '2023/10/18 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 21, started_at: '2023/10/19 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 22, started_at: '2023/10/20 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 23, started_at: '2023/10/21 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 24, started_at: '2023/10/22 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 25, started_at: '2023/10/23 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 26, started_at: '2023/10/24 12:00:00', answerd: 100, corrected: 100, rate: '100' })
    this.scores.push({ id: 27, started_at: '2023/10/25 12:00:00', answerd: 100, corrected: 100, rate: '100' })
  },
  methods: {
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
