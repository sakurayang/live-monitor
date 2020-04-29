<template>
  <div>
    <Background />
    <div class="setting">
      <div v-for="setting in setting_list" :key="setting.id" class="input">
        <label
          >{{ setting.label }}
          <input
            :type="setting.type"
            :placeholder="setting.placeholder"
            :value="setting.default"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import Background from "@/components/Background.vue";
import config from "@/utils/config";
export default {
  name: "Setting",
  components: { Background },
  data: function() {
    let setting_list = [
      {
        id: "api",
        label: "API地址: ",
        default: config.api,
        placeholder: "",
        type: "url"
      }
    ];
    return { setting_list };
  }
};
</script>

<style scoped>
.setting {
  position: relative;
  z-index: 999;
  display: grid;
}

.input > label > input {
  border: white 1px solid;
  width: 400px;
  height: 1.5rem;
  font-size: 1.2rem;
  color: white;
  background-color: #00000000;
}

.input > label > input:focus,
.input > label > input:hover {
  color: white;
}

.input > label > input {
  color: #c0c0c0;
  box-shadow: white 0px 0px 2px 1px;
}

.input > label > input:invalid,
.input > label > input:invalid:focus {
  box-shadow: none;
  box-shadow: red 0px 0px 2px 1px;
}

/* .input > label > input:valid, */
.input > label > input:valid:focus {
  box-shadow: none;
  box-shadow: #01d101 0px 0px 2px 1px;
}

.input > label > input,
.input > label > input:focus,
.input > label > input:hover,
.input > label > input:invalid,
.input > label > input:invalid:focus,
.input > label > input:valid:focus {
  transition-duration: 250ms;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

.input > label {
  font-size: 1.2rem;
  margin-left: 2px;
  color: white;
}
</style>
