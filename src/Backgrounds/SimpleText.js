import ReactDOMServer from "react-dom/server";

export default (title = "Title", subtitle = "Subtitle") => {
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
        backgroundColor: "tomato",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            color: "white",
            fontFamily: "Syne Mono",
          }}
        >
          {title}
        </h2>
        <h2 style={{ color: "white", fontFamily: "Syne Mono" }}>{subtitle}</h2>
      </div>
    </div>
  );
};
