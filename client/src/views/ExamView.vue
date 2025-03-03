<!-- ==================================================
// ©2023 https://github.com/m-kishi
// ================================================ -->
<template>
  <div class="row margin">
    <div style="display:flex; align-items:center;">
      <div style="margin-right:1.0rem;">No.{{ sentence.no }}</div>
      <div><audio controls :src="`voices/${sentence.no}.mp3`" style="vertical-align:middle;"></audio></div>
      <div style="margin-left:1.0rem;">{{ sentence.count }}</div>
    </div>
  </div>
  <div class="row margin">
    <div v-html="sentence.ja"></div>
  </div>
  <div class="row margin" style="position:relative;">
    <textarea type="text" v-model="grades.answer" v-if="!show_answer" v-on:keydown.enter.meta.exact="submit"></textarea>
    <textarea type="text" v-model="grades.answer" v-if="show_answer" readonly></textarea>
    <img v-if="show_answer && grades.result == 1" alt="OK" :src="require(`@/assets/OK.svg`)" class="answer">
    <img v-if="show_answer && grades.result == 0" alt="NG" :src="require(`@/assets/NG.svg`)" class="answer">
  </div>
  <div class="row" v-if="!show_answer">
    <div class="col s2 offset-s5">
      <a v-on:click.prevent="submit" class="btn-large waves-effect btn-mylish">OK</a>
    </div>
  </div>
  <div class="row margin" v-if="show_answer">
    <hr>
  </div>
  <div class="row margin" v-if="show_answer">
    <div v-html="sentence.en"></div>
  </div>
  <div class="row margin" v-if="show_answer">
    <div v-html="onp.operation_rich_text"></div>
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
  <div class="row" v-if="show_answer">
    <table>
      <tbody>
        <tr v-for="idiom in idioms">
          <td>{{ idiom.en }}</td>
          <td>{{ idiom.ja }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
.margin {
  margin-left: 2.0rem;
  margin-right: 1.0rem;
}

textarea {
  width: 100%;
}

img.answer {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-145%, -70%);
  width: 1.0rem;
  height: 1.0rem;
}

span._diff_add {
  color: blue;
  font-weight: bold;
}

span._diff_del {
  color: red;
  font-weight: bold;

  text-decoration: line-through;
  text-decoration-color: maroon;
  -moz-text-decoration-color: maroon;
}

span._diff_keep {
  color: dimgray;
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
      is_random: false,
      is_continue: false,
      show_answer: false,
      sentence: {
        no: "001",
        en: null,
        ja: null,
        count: null,
      },
      grades: {
        score_id: null,
        sentence_no: null,
        seq: 0,
        result: null,
        answer: null,
        answer_fixed: null,
      },
      idioms: [
        { no: 0, seq: 0, en: "", ja: "" }
      ],
      onp: {
        sentence1: "",
        sentence2: "",
        operation_symbols: null,
        operation_rich_text: null,
        eg: null,
        eg_i_arr: [null],
        eg_j_arr: [null],
        array_best_points: [null],
      },
    };
  },
  // --------------------------------------------------
  // マウントイベント
  // --------------------------------------------------
  mounted() {
    this.id = this.$route.query.id;
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
    submit() {
      if (this.show_answer) {
        return;
      }
      this.show_answer = true;
      this.grades.answer_fixed = this.grades.answer.replace(/\n/g, "<br>");
      var ja_answer = this.grades.answer.replace(/\n/g, " ");
      var en_answer = this.sentence.en.replaceAll("<br>", " ");
      if (en_answer == ja_answer) {
        this.grades.result = 1;
      } else {
        this.grades.result = 0;
      }

      this.diff(this.grades.answer, en_answer);

      axios.post('/submit', this.grades)
        .then(res => {
          this.is_continue = !res.data.end_flg;
          this.get_idioms();
        })
        .catch(e => {
          console.log(e);
        })
    },
    // --------------------------------------------------
    // 単語・熟語を取得
    // --------------------------------------------------
    get_idioms() {
      axios.get('/get_idioms', {
        params: {
          no: this.sentence.no,
        },
      })
        .then(res => {
          this.idioms.length = 0;
          for (const idiom of res.data) {
            this.idioms.push(idiom);
          }
        })
        .catch(e => {
          console.log(e);
        });
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
    // --------------------------------------------------
    // 差分の検出
    // --------------------------------------------------
    diff(sentence1, sentence2) {

      // 初期化
      this.onp.sentence1 = sentence1;
      this.onp.sentence2 = sentence2;
      this.onp.operation_symbols = null;
      this.onp.operation_rich_text = null;
      this.onp.eg = null;
      this.onp.eg_i_arr = [null];
      this.onp.eg_j_arr = [null];

      // 差分計算
      this.calc();
    },
    // --------------------------------------------------
    // 差分計算
    // --------------------------------------------------
    calc() {

      // エディットグラフを作成
      this.init_edit_graph();

      // グラフの距離を算出
      this.calc_edit_graph();

      // バックポインタを辿って最短経路を決定
      this.trace_back_pointers();

      // 差分生成操作のシンボルを作成
      this.calc_operation_symbols();

      // 差分をグラフィカルに表示
      this.generate_rich_text();
    },
    // --------------------------------------------------
    // エディットグラフ初期化
    // --------------------------------------------------
    init_edit_graph() {

      // 横の辺
      for (var i = 0; i < this.onp.sentence1.length; i++) {
        this.onp.eg_i_arr.push(this.onp.sentence1.charAt(i));
      }

      // 縦の辺
      for (var j = 0; j < this.onp.sentence2.length; j++) {
        this.onp.eg_j_arr.push(this.onp.sentence2.charAt(j));
      }

      // 盤面
      this.onp.eg = [];
      for (var i = 0; i <= this.onp.sentence1.length; i++) {
        this.onp.eg.push([]);
        for (var j = 0; j <= this.onp.sentence2.length; j++) {
          this.onp.eg[i].push({
            i: i,
            j: j,
            char_i: this.onp.eg_i_arr[i],
            char_j: this.onp.eg_j_arr[j],
            total_cost: 0,
            prop: {
              bp_i_minus: false,
              bp_j_minus: false,
              bp_i_j_minus: false,
            }
          })
        }
      }
    },
    // --------------------------------------------------
    // グラフ上の各点の距離を算出
    // --------------------------------------------------
    calc_edit_graph() {

      // すべての点に対してそれぞれ処理
      for (var i = 0; i <= this.onp.sentence1.length; i++) {
        for (var j = 0; j <= this.onp.sentence2.length; j++) {

          // この点の前までの最小コスト
          var info = this.min_cost_before(i, j);
          var prev_min_cost = info.cost;

          var p = this.onp.eg[i][j];

          // この点が同じ文字かつ辺ではない
          if (p.char_i == p.char_j && i > 0 && j > 0) {

            // 左上の最小コストを引き継ぐ(バックポインタも左上を指す)
            this.onp.eg[i][j].total_cost = this.onp.eg[i - 1][j - 1].total_cost;
            p.prop.bp_i_minus = false;
            p.prop.bp_j_minus = false;
            p.prop.bp_i_j_minus = true;

          } else {

            // 前までの最小コストより1増える(バックポインタは前の最小コストを指す)
            this.onp.eg[i][j].total_cost = prev_min_cost + 1;

          }
        }
      }
    },
    // --------------------------------------------------
    // その点の前までの最小コスト
    // --------------------------------------------------
    min_cost_before(i, j) {
      var p = this.onp.eg[i][j];

      // 原点はコスト0
      if (i == 0 && j == 0) {
        return {
          cost: -1, i: 0, j: 0,
        }
      }

      // J方向へ
      if (i == 0) {
        p.prop.bp_i_minus = false;
        p.prop.bp_j_minus = true;
        p.prop.bp_i_j_minus = false;
        return {
          cost: this.onp.eg[i][j - 1].total_cost, i: 0, j: j - 1,
        };
      }

      // I方向へ
      if (j == 0) {
        p.prop.bp_i_minus = true;
        p.prop.bp_j_minus = false;
        p.prop.bp_i_j_minus = false;
        return {
          cost: this.onp.eg[i - 1][j].total_cost, i: i - 1, j: 0,
        };
      }

      // 盤面の場合，隣接する手前の点のうちコストが小さい方へ
      var cost1 = this.onp.eg[i][j - 1].total_cost;
      var cost2 = this.onp.eg[i - 1][j].total_cost;
      if (cost1 < cost2) {
        p.prop.bp_i_minus = false;
        p.prop.bp_j_minus = true;
        p.prop.bp_i_j_minus = false;
        return {
          cost: cost1, i: i, j: j - 1,
        }
      } else {
        p.prop.bp_i_minus = true;
        p.prop.bp_j_minus = false;
        p.prop.bp_i_j_minus = false;
        return {
          cost: cost2, i: i - 1, j: j,
        }
      }
    },
    // --------------------------------------------------
    // 末尾からバックポインタを辿る
    // --------------------------------------------------
    trace_back_pointers() {

      // 末尾
      var p = this.onp.eg[this.onp.sentence1.length][this.onp.sentence2.length];

      var flag = true;
      var bp_arr = [];
      while (flag) {

        // この座標とそのバックポインタの向きを記録
        var position = this.get_back_pointer_position(p);
        bp_arr.push({
          i: p.i,
          j: p.j,
          char_i: p.char_i,
          char_j: p.char_j,
          s: position.s,
          desc_seq: position.desc_seq,
          desc_sym: position.desc_sym,
          desc_html: position.desc_html,
        });

        if (p.i == 0 && p.j == 0) {
          // 始点まで戻ったら終了
          flag = false;
        } else {
          // 手前の点へ
          p = this.onp.eg[position.i][position.j];
        }
      }

      // 先頭からに並び替えて保存
      bp_arr.reverse();
      this.onp.array_best_points = bp_arr;
    },
    // --------------------------------------------------
    // バックポインタの情報を取得
    // --------------------------------------------------
    get_back_pointer_position(p) {

      if (p.prop.bp_i_minus) {
        return {
          i: p.i - 1,
          j: p.j,
          s: "i - 1",
          w: "↑",
          desc_seq: "旧文字「" + p.char_i + "」を削除",
          desc_sym: "-" + p.char_i,
          desc_html: '<span class="_diff_del">' + p.char_i + '</span>',
        };
      }

      if (p.prop.bp_j_minus) {
        return {
          i: p.i,
          j: p.j - 1,
          s: "j - 1",
          w: "←",
          desc_seq: "新文字「" + p.char_j + "」を追加",
          desc_sym: "+" + p.char_j,
          desc_html: '<span class="_diff_add">' + p.char_j + '</span>',
        };
      }

      if (p.prop.bp_i_j_minus) {
        return {
          i: p.i - 1,
          j: p.j - 1,
          s: "ij - 1",
          w: "＼",
          desc_seq: "同文字「" + p.char_i + "」",
          desc_sym: p.char_i,
          desc_html: '<span class="_diff_keep">' + p.char_i + '</span>',
        };
      }

      return {
        s: null,
        w: "◯",
        desc_seq: "差分をスタート",
      };

    },
    // --------------------------------------------------
    // 差分操作を表すシンボル文字列表記を取得
    // --------------------------------------------------
    calc_operation_symbols() {
      this.onp.operation_symbols = this.onp.array_best_points.map(item => {
        return item.desc_sym;
      }).filter(item => {
        return item && ("" + item).length > 0;
      }).join(",");
    },
    // --------------------------------------------------
    // 差分操作を表すシンボル文字列表記を取得
    // --------------------------------------------------
    generate_rich_text() {
      this.onp.operation_rich_text = this.onp.array_best_points.map(item => {
        return item.desc_html;
      }).join("");
    },
  },
}
</script>
