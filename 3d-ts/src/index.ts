import { Pie } from "./Pie";

const pieInstance = new Pie(
  document.getElementById("container") as HTMLElement,
  {
    //颜色
    colors: [
      ["#5dc6dd", "#408dad"],
      ["#f6c945", "#a16c3d"],
      ["#69ca87", "#3f874f"],
      ["#58a6e3", "#244f85"],
    ],
    //数据
    data: [
      { name: "小学", value: 4 },
      { name: "中学", value: 3 },
      { name: "大学", value: 2 },
      { name: "老学", value: 1 },
    ],
    planeImage: "/plane.png",
  },
);

window.addEventListener("resize", () => {
  pieInstance.onResize();
});
