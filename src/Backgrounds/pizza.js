import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ReactDOMServer from "react-dom/server";

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  parallaxMovement = 5,
  cameraStartingPosition = { x: 10, y: 5, z: 4 },
  generateImage = false
) => {
  const backgroundContainer = document.getElementById("backgroundContainer");
  backgroundContainer.innerHTML = ReactDOMServer.renderToString(
    <div
      id="background"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          id="pizzaContainer"
          style={{
            width: "600px",
            height: "600px",
            backgroundImage: "url(./pizza.png)",
            marginRight: "70px",
          }}
        ></div>
        <div style={{ width: "600px" }}>
          <img
            src="https://sabriona.com/wp-content/uploads/2018/09/logo-sabriona-final-2-marro.png"
            alt=""
          />
          <h2 style={{ color: "white", fontFamily: "Syne Mono" }}>
            Pizzes artesanals amb productes de proximitat a domicili i per
            recollir.
          </h2>
        </div>
      </div>
    </div>
  );

  const background = document.getElementById("background");

  const pizzaContainer = document.getElementById("pizzaContainer");
  const width = pizzaContainer.getBoundingClientRect().width;
  const height = pizzaContainer.getBoundingClientRect().height;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });

  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;

  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;

  renderer.setSize(width, height);

  document.getElementById("pizzaContainer").appendChild(renderer.domElement);

  // camera
  const camera = new THREE.OrthographicCamera(
    7 / -2,
    7 / 2,
    9 / 2,
    5 / -2,
    1,
    1000
  );
  camera.position.set(
    cameraStartingPosition.x,
    cameraStartingPosition.y,
    cameraStartingPosition.z
  ); // settings in `sceneList` "Monster"
  camera.lookAt(0, 0, 0);

  // scene and lights
  const scene = new THREE.Scene();

  const light = new THREE.PointLight(0xffffff, 100, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  const light2 = new THREE.PointLight(0xffffff, 40, 100);
  light2.position.set(0, 0, 5);
  scene.add(light2);

  const light3 = new THREE.PointLight(0xffffff, 20, 100);
  light3.position.set(0, 0, -5);
  scene.add(light3);

  const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
  scene.add(ambientLight);

  // load gltf model and texture
  const objs = [];
  const loader = new GLTFLoader();
  var pizzamovingTimer = 0;
  loader.load("./pizza.gltf", (gltf) => {
    // model is a THREE.Group (THREE.Object3D)
    const mixer = new THREE.AnimationMixer(gltf.scene);
    // animations is a list of THREE.AnimationClip
    for (const anim of gltf.animations) {
      const action = mixer.clipAction(anim);
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      setTimeout(() => {
        pizzamovingTimer = 0;
        pizzaContainer.style.background = "none";

        if (generateImage) {
          const canvas = document.getElementsByTagName("canvas")[0];
          const image = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = image.replace(
            /^data:image\/[^;]/,
            "data:application/octet-stream"
          );
          a.download = "pizza.png";
          a.click();
          console.log("Image downloaded");
        }

        action.play();
        document.addEventListener("mousemove", onMouseMove, false);
      }, 2000);
    }
    // settings in `sceneList` "Monster"
    gltf.scene.scale.set(0.05, 0.05, 0.05);
    gltf.scene.rotation.copy(new THREE.Euler(0, (-3 * Math.PI) / 4, 0));
    gltf.scene.position.set(0, -0.5, -0.8);

    scene.add(gltf.scene);
    objs.push({ gltf, mixer });
  });

  // animation rendering
  const clock = new THREE.Clock();
  let requestAnimationFrameId = "";
  (function animate() {
    // animation with THREE.AnimationMixer.update(timedelta)
    objs.forEach(({ mixer }) => {
      mixer.update(clock.getDelta());
    });
    pizzamovingTimer =
      pizzamovingTimer >= parallaxMovement ? 5 : pizzamovingTimer + 0.05;
    renderer.render(scene, camera);
    requestAnimationFrameId = requestAnimationFrame(animate);
  })();

  return [
    (pM, cSP, gI) => {
      parallaxMovement = pM;
      cameraStartingPosition = cSP;
      generateImage = gI;
    },
    () => {
      cancelAnimationFrame(requestAnimationFrameId);
    },
  ];

  // Follows the mouse event
  function onMouseMove(event) {
    var mouse = {};
    // Update the mouse variable
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Make the sphere follow the mouse
    camera.position.set(
      cameraStartingPosition.x + mouse.x * pizzamovingTimer,
      cameraStartingPosition.y + mouse.y * pizzamovingTimer,
      cameraStartingPosition.z
    );
    camera.lookAt(0, 0, 0);
  }
};
