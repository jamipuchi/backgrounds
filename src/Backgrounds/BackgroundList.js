import pizza from "./pizza";
import SimpleText from "./SimpleText";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    name: "Background 1",
    func: SimpleText,
    image:
      "https://speckyboy.com/wp-content/uploads/2019/03/free-minimal-design-font-typeface-06.jpg",
    parameters: { title: "Title", subtitle: "Subtitle", color: "#ff6347" },
  },
  {
    name: "Background 2",
    func: pizza,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    parameters: {
      parallaxMovement: 5,
      cameraStartingPosition: { x: 10, y: 5, z: 4 },
      generateImage: false,
    },
  },
];
