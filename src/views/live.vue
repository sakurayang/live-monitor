<template>
  <div>
    <div v-if="!isNaN(id)" class="chart_contain">
      <Chart :id="id" />
    </div>
    <div v-else class="error">请检查你输入的id</div>
  </div>
</template>

<script>
import Chart from "@/components/Chart.vue";
import Axios from "axios";
import config from "@/utils/config";
export default {
  name: "LiveChart",
  components: { Chart },
  // eslint-disable-next-line
  props: { id: Number },
  data: function() {
    let Noty = this.$noty;
    const axios = Axios.create({
      baseURL: config.api,
      timeout: 1500 /*,
      headers: {
        "Access-Control-Request-Headers": "access-control-allow-origin",
        "Access-Control-Request-Method": "GET"
      }*/
    });
    let live_status = 0;
    let last_status = 0;
    let g_view_data = [];
    let g_gift_data = [];
    window.live_status = live_status;
    window.last_status = last_status;
    //console.info(this.id, this);
    window.id = this.id;
    const id = this.id;
    let chart_options = {
      title: { text: `房间号：${id}` },
      legend: {
        data: ["人气", "礼物数量", "银瓜子数量", "金瓜子数量"]
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
          name: "人气",
          type: "line",
          step: "end",
          smooth: false,
          connectNulls: true,
          datasetIndex: 0,
          encode: {
            x: "update_time",
            y: "views"
          }
        },
        {
          name: "礼物数量",
          type: "line",
          step: "end",
          smooth: false,
          connectNulls: true,
          datasetIndex: 1,
          encode: {
            x: "update_time",
            y: "gift_count"
          }
        },
        {
          name: "银瓜子数量",
          type: "line",
          step: "end",
          smooth: false,
          connectNulls: true,
          datasetIndex: 1,
          encode: {
            x: "update_time",
            y: "silver"
          }
        },
        {
          name: "金瓜子数量",
          type: "line",
          step: "end",
          smooth: false,
          connectNulls: true,
          datasetIndex: 1,
          encode: {
            x: "update_time",
            y: "gold"
          }
        }
      ],
      dataset: [
        {
          source: g_view_data
        },
        {
          source: g_gift_data
        }
      ]
    };

    // 开始时获取一次直播状态
    /*axios
      .get(`https://api.live.bilibili.com/room/v1/Room/room_init?id=${id}`)
      .then(res => {
        if (!res.data.live_status) Noty.info("未开播，请等待");
        live_status = res.data.live_status;
        window.live_status = live_status;
      });*/
    axios.get(`/live/status?id=${id}`).then(res => {
      if (!res.data) Noty.info("未开播，请等待");
      live_status = res.data.live_status;
      window.live_status = live_status;
    });
    // 尝试添加入追踪
    axios.get(`/live/add/?id=${id}`).then(res => console.log(res.data));
    // 下播的时候调用的方法
    function stopLiving() {
      Noty.info("下播");
    }
    // 开播的时候调用的方法
    async function startLiving() {
      Noty.info("开播");
      window.chart.setOption({
        title: {
          text: `房间号：${id}`,
          link: `https://live.bilibili.com/${id}`
        }
      });
      let info = await getInfo(true);
      // console.log(live_data);
      g_view_data = info.view_data;
      for (const key in info.gift_data) {
        if (key === 0) continue;
        for (const type of ["gift_count", "silver", "gold"]) {
          // 累加
          // [1, 1, 2, 1, 3, 1] => [1, 1+1, 2+2, 4+1, 5+3, 8+1]
          info.gift_data[key - 1]
            ? (info.gift_data[key][type] += info.gift_data[key - 1][type])
            : false;
        }
      }
      g_gift_data = info.gift_data;
      window.chart.setOption({
        dataset: [{ source: g_view_data }, { source: g_gift_data }]
      });
    }
    // 获取信息
    /**
      * @param {Number|String} id
      * @param {Boolean} init
      * @returns {{
        view_data:Array<{
            count: Number,
            update_time: String,
            time: Number,
            views: Number
        }>,
        gift_data:Array<{
            id:Number,
            count: Number,
            update_time: String,
            time: Number,
            gift_name: String,
            gift_id: Number,
            gift_count: Number,
            silver: Number,
            gold: Number
        }>
    }}
     */
    async function getInfo(init = false) {
      let info = (
        await axios.get(`/live/get?id=${id}${init ? "&init=true" : ""}`)
      ).data;
      if (info.code != 0) throw info.msg;
      //console.log(info);
      let view_data = info.result.view;
      let gift_data = info.result.gift;
      // for (const type of [view_data, gift_data]) {
      //   for (const item of type) {
      //     console.log(type);
      //     item.update_time = new Date(item.update_time).toISOString();
      //   }
      // }
      return {
        view_data,
        gift_data
      };
    }
    //计时器
    async function timer() {
      live_status = (await axios.get(`/live/status?id=${id}`)).data;
      if (last_status == 0 && live_status == 1) {
        last_status = 1;
        window.live_status = live_status;
        window.last_status = last_status;
        await startLiving();
      } else if (last_status == 1 && live_status == 1) {
        let info = await getInfo();
        let view_data = info.view_data;
        let gift_data = info.gift_data;
        //console.log(info);
        let last_data = g_gift_data[g_gift_data.length - 1];
        if (g_gift_data.length > 0) {
          if (last_data.id === info.gift_data.id) gift_data = last_data;
          else
            for (const type of ["gift_count", "silver", "gold"]) {
              gift_data[type] = info.gift_data[type] + last_data[type];
            }
        } else {
          for (const type of ["gift_count", "silver", "gold"]) {
            gift_data[type] = info.gift_data[type] + last_data[type];
          }
        }
        g_view_data.push(view_data);
        g_gift_data.push(gift_data);
        window.chart.setOption({
          dataset: [{ source: g_view_data }, { source: g_gift_data }]
        });
      } else if (last_status == 1 && live_status == 0) {
        last_status = 0;
        window.live_status = live_status;
        window.last_status = last_status;
        stopLiving();
      }
    }
    return {
      getInfo,
      startLiving,
      stopLiving,
      chart_options,
      innertimer: timer
    };
  },
  mounted: function() {
    this.$nextTick(function() {
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
