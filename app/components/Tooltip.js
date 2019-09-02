import React from "react";
import PropTypes from "prop-types";
import withHover from "./withHover";

const styles = {
  container: {
    position: "relative",
    display: "flex"
  },
  tooltip: {
    boxSizing: "border-box",
    position: "absolute",
    width: "160px",
    bottom: "100%",
    left: "50%",
    marginLeft: "-80px",
    borderRadius: "3px",
    backgroundColor: "hsla(0, 0%, 20%, 0.9)",
    padding: "7px",
    marginBottom: "5px",
    color: "#fff",
    textAlign: "center",
    fontSize: "14px"
  }
};

// export default class Tooltip extends React.Component {

//   render() {
//     const { text, children } = this.props;
//     const { hovering } = this.state;

//     return;
//   }
// }

function Tooltip({ text, children, hovering }) {
  return (
    <div style={styles.container}>
      {hovering === true && <div style={styles.tooltip}>{text}</div>}
      {children}
    </div>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  hovering: PropTypes.bool.isRequired
};

//an HOC is 1) a component that 2) takes in another component as our arg and 3) it returns a new component
//the component it returns is going to render the original component passed into it, in this case our Tooltip component

export default withHover(Tooltip);
