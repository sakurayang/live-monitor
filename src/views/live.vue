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
//import request from "request";
import config from "@/utils/config";
export default {
  name: "LiveChart",
  components: { Chart },
  // eslint-disable-next-line
  props: { id: Number },
  data: function() {
    let Noty = this.$noty;
    let live_status = 0;
    let last_status = 0;
    let request = this.$http;
    window.live_status = live_status;
    window.last_status = last_status;
    //console.info(this.id, this);
    window.id = this.id;
    const id = this.id;
    request.get(`${config.api}/${id}/living`).then(res => {
      if (!res.data) Noty.info("未开播，请等待");
    });
    let live_data = [];
    request.get(`${config.api}/${id}/add`).then(res => console.log(res.data));
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
          encode: {
            x: "update_time",
            y: "gold"
          }
        }
      ],
      dataset: {
        source: live_data
      }
    };
    function stopLiving() {
      Noty.info("下播");
    }
    async function startLiving() {
      Noty.info("开播");
      window.live_chart.setOption({
        title: {
          text: `房间号：${id}`,
          link: `https://live.bilibili.com/${id}`
        }
      });
      let info = await getInfo(true);
      live_data = [...info.view_data, ...info.gift_data];
      console.log(live_data);
      window.live_chart.setOption({
        dataset: { source: live_data }
      });
    }
    async function getInfo(init = false) {
      //console.log(this);
      let info = (
        await request.get(`${config.api}/${id}/${init ? "init" : ""}`)
      ).data;
      if (info.code != 0) throw info.msg;
      //console.log(info);
      let view_data = info.result.view;
      let gift_data = info.result.gift;

      if (!(gift_data === null) && gift_data.length > 0) {
        for (const key in gift_data) {
          if (key === 0 || !gift_data[key]) continue;
          for (const _key of ["gift_count", "silver", "gold"]) {
            gift_data[key]
              ? (gift_data[key][_key] += gift_data[key - 1][_key])
              : false;
          }
        }
      } else {
        for (const key of ["gift_count", "silver", "gold"]) {
          if (gift_data === null && view_data === null) break;
          gift_data[gift_data.length - 1]
            ? (gift_data[gift_data.length - 1][key] +=
                live_data[live_data.length - 1][key])
            : false;
        }
      }
      for (const key of ["id", "gift_id", "gift_count", "silver", "gold"]) {
        if (gift_data === null && view_data === null && gift_data.length < 1)
          break;
        view_data[view_data.length - 1][key] = gift_data[gift_data.length - 1]
          ? gift_data[gift_data.length - 1][key]
          : 0;
      }
      return {
        view_data,
        gift_data
      };
    }
    async function timer() {
      live_status = (await request.get(`${config.api}/${id}/living`)).data;
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
        for (const key of ["gift_count", "silver", "gold"]) {
          gift_data[gift_data.length - 1]
            ? (gift_data[gift_data.length - 1][key] +=
                live_data[live_data.length - 1][key])
            : false;
        }

        for (const key of ["id", "gift_id", "gift_count", "silver", "gold"]) {
          if (!gift_data.length >= 1 || !gift_data[0]) break;
          view_data[view_data.length - 1][key] = gift_data[gift_data.length - 1]
            ? gift_data[gift_data.length - 1][key]
            : 0;
        }
        live_data.push(view_data[view_data.length - 1]);
        if (gift_data.length >= 1 && gift_data[0] !== null)
          live_data.push(gift_data[gift_data.length - 1]);
        window.live_chart.setOption({
          dataset: {
            source: live_data
          }
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
      live_data,
      timer
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      window.live_chart.setOption(this.chart_options);
      window.live_timer = setInterval(this.timer, 5000);
    });
  }
};
</script>

<style scoped>
.chart_contain {
  margin: 0;
  padding: 0;
  position: relative;
  left: 0;
  top: 0;
  width: 80vw;
  min-width: 800px;
  height: 100vh;
  min-height: 600px;
}
</style>
