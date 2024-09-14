const HeadingTitle = ({ title }) => {
  return (
    <div style={divStyles}>
      <h2 style={h2Styles}>{title}</h2>
    </div>
  );
};

const divStyles = {
  padding: "10px 30px",
  backgroundColor: "#fff",
};

const h2Styles = {
  color: "#283A22",
  fontSize: "30px",
  fontWeight: "500",
  borderBottom: "2px solid #283A22",
  width: "max-content",
  marginTop: "40px",
};

export default HeadingTitle;
