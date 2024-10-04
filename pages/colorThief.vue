<template>
  <div><img src="/images/xiaohui.jpg" id="img" /></div>
  <div>
    图片的主颜色是:{{ color }}
    <p :style="'background: rgb(' + color + ')'"></p>
  </div>
</template>
  
<script  setup>
import ColorThief from "~/public/js/colorThief";

let color = ref("");

let get_color = (dom) => {
  const colorThief = new ColorThief();
  if (dom.complete) {
    return colorThief.getColor(dom).join(",");
  } else {
    dom.addEventListener("load", function () {
      return colorThief.getColor(dom).join(",");
    });
  }
};

onMounted(() => {
  color.value = get_color(document.getElementById("img"));
});
</script>
  
  <style lang="less">
div {
  margin-bottom: 50px;
}
p {
  margin-top: 50px;
  width: 200px;
  height: 50px;
}
</style>