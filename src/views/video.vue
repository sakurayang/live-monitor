<template>
  <div>
    <div class="chart_contain">
      <Chart :id="id" />
    </div>
  </div>
</template>

<script>
import Chart from "@/components/Chart.vue";
import Axios from "axios";
import config from "@/utils/config";
import "../utils/idConver";
export default {
  name: "VideoChart",
  components: { Chart },
  // eslint-disable-next-line
  props: { id:String },
  data: function() {
    window.id = this.id;
    const id = this.id;
    const axios = Axios.create({
      baseURL: config.api,
      timeout: 1500 /*,
      headers: {
        "Access-Control-Request-Headers": "access-control-allow-origin",
        "Access-Control-Request-Method": "GET"
      }*/
    });
    let g_view_data = [];
    (async () => {
      g_view_data = await getInfo(window.id, true);
    })();
    //console.info(this.id, this);
    let chart_options = {
      title: { text: `房间号：${id}` },
      legend: {
        data: ["播放", "弹幕", "硬币", "点赞", "收藏", "评论", "分享"]
      },
      tooltip: {
        show: true,
        tigger: "axis",
        axisPointer: { type: "cross" },
        snap: true
      },
      axisPointer: {
        link: [{ yAxisIndex: "all", xAxisName: "all" }],
        snap: true
      },
      toolbox: {
        feature: {
          saveAsImage: { show: true },
          restore: { show: true },
          dataView: { show: true, readOnly: true },
          dataZoom: { show: true, yAxisIndex: false },
          magicType: { show: false },
          brush: { show: false }
        }
      },
      grid: {
        containLabel: true,
        height: "80%",
        left: 0
      },
      dataZoom: [
        {
          xAxisIndex: [0],
          type: "slider",
          start: 0,
          end: 100,
          bottom: "5%"
        },
        {
          xAxisIndex: [0],
          type: "inside",
          start: 0,
          end: 100
        }
      ],
      xAxis: {
        type: "time",
        interval: 5 * 1000 //5second * 1000ms
      },
      yAxis: [{ type: "value" }],
      series: [
        {
          name: "播放",
          type: "line",
          smooth: false,
          connectNulls: true,
          encode: {
            x: "update_time",
            y: "view"
          }
        },
        {
          name: "弹幕",
          type: "line",
          smooth: false,
          connectNulls: true,
          encode: {
            x: "update_time",
            y: "danma"
          }
        },
        {
          name: "硬币",
          type: "line",
          smooth: false,
          connectNulls: true,
          encode: {
            x: "update_time",
            y: "coin"
          }
        },
        {
          name: "点赞",
          type: "line",
          smooth: false,
          connectNulls: true,
          encode: {
            x: "update_time",
            y: "heart_like"
          }
        },
        {
          name: "收藏",
          type: "line",
          smooth: false,
          connectNulls: true,
          encode: {
            x: "update_time",
            y: "favorite"
          }
        },
        {
          name: "评论",
          type: "line",
          smooth: false,
          connectNulls: true,
          encode: {
            x: "update_time",
            y: "reply"
          }
        },
        {
          name: "分享",
          type: "line",
          smooth: false,
          connectNulls: true,
          encode: {
            x: "update_time",
            y: "share"
          }
        }
      ],
      dataset: {
        source: g_view_data
      }
    };

    // 尝试添加入追踪
    axios.get(`/video/add/?id=${id}`).then(res => console.log(res.data));
    // 获取信息
    /**
     * @param {Number|String} id
     * @param {Boolean} init
     * @returns {{{
     * "code":Number,
     * "msg":String,
     * "result":{
     *   "id":Number,
     *   "aid":Number,
     *   "title":String,
     *   "view":Number,
     *   "coin":Number,
     *   "danma":Number,
     *   "favorite":Number,
     *   "reply":Number,
     *   "share":Number,
     *   "heart_like":Number,
     *   "public_time":Number,
     *   "update_time":Number
     * }[]}}
     */
    async function getInfo(init = false) {
      let info = (
        await axios.get(`/video/get?id=${id}${init ? "&init=true" : ""}`)
      ).data;
      if (info.code != 0) throw info.msg;
      return info.result;
    }
    //计时器
    async function timer() {
      let info = await getInfo();
      g_view_data.push(info[0]);
      window.chart.setOption({
        dataset: { source: g_view_data }
      });
    }
    return {
      getInfo,
      chart_options,
      innertimer: timer
    };
  },
  mounted: function() {
    this.$nextTick(async function() {
      clearInterval(window.timer);
      window.chart.setOption(this.chart_options);
      window.timer = setInterval(this.innertimer, 5000);
    });
  }
};
</script>

<style scoped>
.chart_contain {
  margin: 0;
  padding: 0;
  position: relative;
  left: 80px;
  top: 0;
  width: 80vw;
  min-width: 800px;
  height: 100vh;
  min-height: 600px;
}
</style>
