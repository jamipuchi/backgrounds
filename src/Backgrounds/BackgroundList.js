import pizza from "./pizza";
import SimpleText from "./SimpleText";

export default [
  {
    name: "Background1",
    func: SimpleText,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    parameters: { title: "Title", subtitle: "Subtitle" },
  },
  {
    name: "Pizza",
    func: pizza,
    image: "pizzaThumbnail.png",
    parameters: {
      parallaxMovement: 5,
      cameraStartingPosition: { x: 10, y: 5, z: 4 },
      generateImage: false,
    },
  },
  {
    name: "Bg3",
    func: pizza,
    image: "pizzaThumbnail.png",
    parameters: {
      parallaxMovement: 5,
      cameraStartingPosition: { x: 10, y: 5, z: 4 },
      generateImage: false,
    },
  },
];
