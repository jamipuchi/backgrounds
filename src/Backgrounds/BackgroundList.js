import pizza from "./pizza";
import SimpleText from "./SimpleText";

export default [
  {
    name: "",
    func: SimpleText,
    image:
      "https://lh3.googleusercontent.com/proxy/uoFamBpteiAJ4W_spTCNjXGFKOyjx5JTEQD36W72rp7L4jO6an9QXvrtz7v_240okv7hnv-o4AQ_Lvnmpx9iXk0363u8ZSt-xsdugPJbXzfLnSXEA8O-q0DBjkF5aD2axvgyvUbH_MSg5Jd7RycEOlBi-KS0gBAHlFyxNMBiGhb0WUDhLMlmsLaZC0JgWepy6KiUJQQ99YwRPW0c6ag",
    parameters: { title: "Title", subtitle: "Subtitle" },
  },
  {
    name: "",
    func: pizza,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    parameters: {
      parallaxMovement: 5,
      cameraStartingPosition: { x: 10, y: 5, z: 4 },
      generateImage: false,
    },
  },
];
