export default animate = () => {
  return ks
    .animate(
      "#DarkStringJank",
      [
        {
          p: "opacity",
          t: [3000, 3500, 4000],
          v: [0, 1, 0],
          e: [[3, 1], [3, 1], [0]]
        }
      ],
      "#DarkString1",
      [
        {
          p: "opacity",
          t: [3000, 3500, 4000],
          v: [1, 0, 1],
          e: [[3, 1], [3, 1], [0]]
        },
        {
          p: "strokeDashoffset",
          t: [0, 3000, 4000, 7000],
          v: [3850, -1550, -1550, 3850],
          e: [[1, 0.4, 0.1, 0.6, 0.9], [0], [0], [0]]
        }
      ],
      { autoremove: false, markers: { 1: 0, "1a": 3000, 2: 4000 } }
    )
    .range(0, 7000);
};
