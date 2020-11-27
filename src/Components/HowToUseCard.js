import Card from "react-bootstrap/Card";

const HowToUseCard = (props) => {
  return (
    <Card
      style={{
        backgroundColor: "#F5F5FA",
        padding: "20px",
      }}
    >
      <h2>How to use background</h2>
      <p>1. Download the js file and the dependencies</p>
      <p>2. Add to the html header</p>
      <p>3. Rename div to background</p>
    </Card>
  );
};

export default HowToUseCard;
