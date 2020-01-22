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
export default {
  name: "LiveChart",
  components: { Chart },
  // eslint-disable-next-line
  props: { id: Number },
  data: function() {
    return {
      aasd: ""
    };
  }
};
</script>
