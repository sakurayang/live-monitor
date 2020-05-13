<template>
  <div>
    <Background />
    <div class="panel">
      <div v-for="setting in setting_list" :key="setting.id" class="setting">
        <label :for="setting.id">
          {{ setting.label }}
        </label>
        <input
          :id="setting.id"
          :value="setting.default"
          :placeholder="setting.placeholder"
          @input="onChange(setting.id, $event.target.value)"
        />
        <span :class="setting.status" />
      </div>
    </div>
  </div>
</template>

<script>
import Background from "@/components/Background.vue";
import { config } from "@/utils/config";
export default {
  name: "Setting",
  components: { Background },
  data: function() {
    let setting_list = [
      {
        id: "api",
        label: "API地址: ",
        default: config.get("api"),
        placeholder: "http://example.com:8083",
        grep: /^(http(s)?:\/\/)(www\.)?[\w\.]{0,62}\.([\w]{0,62})(:[\d]{1,5})?$/i,
        status: "vaild"
      }
    ];

    return {
      setting_list
    };
  },
  methods: {
    onChange: function(key, value) {
      let setting;
      for (const settings of this.setting_list) {
        if (settings.id === key) {
          setting = settings;
          break;
        }
      }

      setting.default = value;
      if (setting.grep.test(value)) {
        config.set(key, value);
        setting.status = "vaild";
      } else {
        setting.status = "invaild";
      }
    }
  }
};
</script>

<style scoped>
.panel {
  position: relative;
  z-index: 999;
  display: grid;
  margin: 0px 300px;
  padding-top: 80px;
}
.setting {
  position: relative;
  display: grid;
  grid-template: "label . input status" 30px /1.3fr 0.2fr 5.5fr 1fr;
  background-color: #ffffff;
  border: #ffffff 2px solid;
  border-radius: 5px;
}

.setting > label {
  text-align: "left";
  font-size: 20px;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  grid-area: label;
}
.setting > input {
  border: none;
  font-size: 20px;
  grid-area: input;
}
.setting > .invaild,
.setting > .vaild {
  font-size: 20px;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  grid-area: status;
}

.invaild::after {
  color: red;
  content: "×";
}

.vaild::after {
  color: green;
  content: "✔";
}
</style>
