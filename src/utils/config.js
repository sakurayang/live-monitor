let value = {
  api: "https://server.bkwhentai.top:8083"
};
let default_value = { ...value };
Object.freeze(default_value);

// put default config in localstorage
localStorage.setItem("default_config", JSON.stringify(default_value));
// put config in localstorage
localStorage.setItem("config", JSON.stringify(value));

/**
 * search key in config.
 * return true if has, overwise false.
 * @param {String} key
 * @param {JSON} search_object
 * @return {Boolean}
 */
function has(key, search_object = value) {
  if (typeof search_object !== "object") return false;
  return search_object.hasOwnProperty(key);
}

/**
 * set config.
 * return true if succsed, overwise false.
 * @param {String} key
 * @param {*} value
 * @return {Boolean}
 */
function set(key, insert_value) {
  value[key] = insert_value;
  localStorage.setItem("config", JSON.stringify(value));
  return (
    value[key] === insert_value &&
    JSON.parse(localStorage.getItem("config"))[key] === insert_value
  );
}

/**
 * get value form config.
 * return value if has, overwise null.
 * @param {String} key
 * @return {*}
 */
function get(key) {
  return has(key, value) ? value[key] : null;
}

/**
 * delete item
 * @param {String} key
 * @return {Boolean} true if succsed, false if key not found or faild
 */
function _delete(key) {
  if (has(key, value)) {
    localStorage.removeItem("config");
    let result = delete value[key];
    localStorage.setItem("config", JSON.stringify(value));
    return result;
  } else {
    return false;
  }
}

/**
 * restore config
 * @return {Void}
 */
function restore() {
  value = {};
  localStorage.removeItem("config");
  value = { ...default_value };
  localStorage.setItem("config", JSON.stringify(default_value));
}

export let config = { get, set, has, delete: _delete, restore };
export default value;
