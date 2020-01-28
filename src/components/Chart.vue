<template>
  <div id="echart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Chart",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    id: Number
  },
  data: function() {
    return {};
  },
  mounted: function() {
    this.$nextTick(function() {
      let chart_contain = document.getElementById("echart");
      let chart_contain_w = chart_contain.getBoundingClientRect().width;
      let chart_contain_h = chart_contain.getBoundingClientRect().height;
      window.live_chart = echarts.init(chart_contain, {
        height: chart_contain_h,
        width: chart_contain_w
      });
    });
  },
  methods: {
    /**
     * @param {JSON} data
     * @returns {Null}
     */
    setData: function(data) {
      window.live_chart.setOption(data);
    }
  }
};
</script>

<style scoped>
#echart {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
