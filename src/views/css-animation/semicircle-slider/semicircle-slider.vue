<template>
  <div class="hello">
    <div class="c1" id="touchBox">
      <div
        v-for="(item, index) in avatarList"
        class="c2"
        :key="item.id"
        :style="{
          backgroundImage: `url(${item.avatar})`,
          transform: `rotate(${index * 60 + initRotate}deg)`,
        }"
        @click="choiceAvatar(item)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";

const state = reactive({
  startx: 0,
  starty: 0,
});

const avatarList = reactive([
  {
    id: "1",
    name: "1",
    avatar: require("@/assets/avatar/avatar1.jpg"),
  },
  {
    id: "2",
    name: "2",
    avatar: require("@/assets/avatar/avatar2.jpg"),
  },
  {
    id: "3",
    name: "3",
    avatar: require("@/assets/avatar/avatar3.jpg"),
  },
  {
    id: "4",
    name: "4",
    avatar: require("@/assets/avatar/avatar4.jpg"),
  },
  {
    id: "5",
    name: "5",
    avatar: require("@/assets/avatar/avatar5.jpg"),
  },
  {
    id: "6",
    name: "6",
    avatar: require("@/assets/avatar/avatar6.jpg"),
  },
]);

let initRotate = ref(30);

const choiceAvatar = (item) => {
  console.log(item.id);
};

const getDirection = (startx, starty, endx, endy) => {
  let angx = endx - startx;
  let angy = endy - starty;
  let result = 0;

  //如果滑动距离太短
  if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
    console.log("==>点击了一下");
    return result;
  }
  let angle = getAngle(angx, angy);
  console.log("角度", angle);

  console.log("角度", angle);
  if (angle < 0 && -90 < angle) {
    console.log("往【右上】滑动1", angle);
    initRotate.value += 60;
  } else if (angle < -90 && -180 < angle) {
    console.log("往【左上】滑动2", angle);
    initRotate.value += 60;
  } else if (angle < 90 && 0 < angle) {
    console.log("往【右下】滑动0", angle);
    initRotate.value -= 60;
  } else {
    console.log("往【左下】滑动0", angle);
    initRotate.value -= 60;
  }
  console.log();
  return result;
};

//获得角度
const getAngle = (angx, angy) => {
  return (Math.atan2(angy, angx) * 180) / Math.PI;
};
// let angle = getAngle(angx, angy);

onMounted(() => {
  //手指接触屏幕
  document.getElementById("touchBox").addEventListener(
    "touchstart",
    function (e) {
      state.startx = `${e.touches[0].pageX}`;
      state.starty = `${e.touches[0].pageY}`;
      // console.log(state.startx, state.starty);
      e.stopPropagation();
    },
    false
  );

  document.getElementById("touchBox").addEventListener(
    "touchend",
    function (e) {
      console.log(e);
      let endx, endy;
      endx = e.changedTouches[0].pageX;
      endy = e.changedTouches[0].pageY;
      let direction = getDirection(state.startx, state.starty, endx, endy);
      e.stopPropagation();
      console.log("direction", direction);
    },
    false
  );
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.c1 {
  box-sizing: border-box;
  width: 300px;
  height: 600px;
  position: relative;
  margin: 0;
  background: url("../../../assets/avatar/bg.png");
  overflow: hidden;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 90px;
  margin: 30px auto 0;
}
.c2 {
  box-sizing: border-box;
  width: 150px;
  height: 150px;
  background-color: skyblue;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  margin-left: 78px;
  margin-top: 0;
  transform-origin: center 300px; /* 大圆半径 + 小圆半径 - 大圆border */
  transition-duration: 0.3s;
  background-size: 100% 100%;
}
</style>
