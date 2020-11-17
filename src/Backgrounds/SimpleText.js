import ReactDOMServer from "react-dom/server";

// eslint-disable-next-line import/no-anonymous-default-export
export default (title = "Title", subtitle = "Subtitle", color = "#ff6347") => {
  const backgroundContainer = document.getElementById("backgroundContainer");

  const renderInBackground = (title, subtitle, color) => {
    backgroundContainer.innerHTML = ReactDOMServer.renderToString(
      <div
        id="background"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color,
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
          <h2 style={{ color: "white", fontFamily: "Syne Mono" }}>
            {subtitle}
          </h2>
        </div>
      </div>
    );
  };

  renderInBackground(title, subtitle, color);

  return [renderInBackground, () => {}];
};
