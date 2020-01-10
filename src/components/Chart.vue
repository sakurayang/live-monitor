<template>
  <div id="chart"></div>
</template>

<script>
import echarts from "../utils/echarts";
import config from "@/utils/config";
import axios from "axios";
export default {
  name: "Chart",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    id: Number
  },
  data: async function() {},
  created: async function() {
    let live_status = Number((await axios.get(config.api + "/living")).data);
    let live_data = live_status ? (await axios.get(config.api)).data : [];
    let start =
      live_data.length > 51 ? (1 - 50 / (live_data.length - 1)) * 100 : 0;
    this.chart_options = {
      color: [config.color[this.id]],
      title: {
        text: `【${this.id}】`
      },
      grid: {
        tooltip: {
          show: true,
          tigger: "axis",
          axisPointer: { type: "cross" },
          snap: true
        },
        axisPointer: {
          link: [{ xAxisIndex: "all" }],
          snap: true
        }
      },
      legend: { top: 10 },
      toolbox: {
        feature: {
          saveAsImage: { show: true },
          restore: { show: true },
          dataView: { show: false },
          dataZoom: { show: false },
          magicType: { show: false },
          brush: { show: false }
        }
      },
      dataZoom: [
        {
          xAxisIndex: [0],
          type: "slider",
          start,
          end: 100
        },
        {
          xAxisIndex: [0],
          type: "inside",
          start,
          end: 100
        },
        {
          yAxisIndex: [0],
          type: "slider",
          start: 0,
          end: 100
        }
      ],
      xAxis: {
        type: "time",
        interval: 5 * 1000 //5second * 1000ms
      },
      yAxis: [{ type: "value" }],
      series: [{ type: "line" }],
      dataset: {
        dimensions: ["time", "count"],
        source: []
      }
    };
  },
  mounted: async function() {
    this.$nextTick(async function() {
      let live_data = await axios.get(config.api + "/init");
      live_data = live_data.data.code == 0 ? live_data.data.result : [];
      let live_status = await Number(
        (await axios.get(config.api + "/living")).data
      );
      this.chart = echarts.init(document.getElementById("chart"));
      this.chart.init(document.getElementById("chart"));
      let start =
        live_data.length > 51 ? (1 - 50 / (live_data.length - 1)) * 100 : 0;
      this.chart_options.dataZoom[0].start = start;
      this.chart_options.dataZoom[1].start = start;
      this.chart_options.dataset.source = live_data;
      live_status ? this.chart.setOption(this.chart_options) : alert("未开播");
    });
  },
  methods: {
    updateInfo: async function() {
      let live_status = Number((await axios.get(config.api + "/living")).data);
      let live_data = live_status ? (await axios.get(config.api)).data : [];
      return {
        live_status,
        live_data
      };
    },
    updateChart: async function() {}
  }
};
</script>
<style scoped></style>
