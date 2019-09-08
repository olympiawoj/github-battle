import React from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    fontSize: "25px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center"
  }
};

//bc we're updating UI, we need to have something on state
//when we update state, it'll call re-render updating the UI
export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.text
    };
  }

  componentDidMount() {
    const { speed, text } = this.props;
    this.interval = window.setInterval(() => {
      console.log("HERE");
      this.state.content === text + "..."
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({
            content: content + "."
          }));
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return <p style={styles.content}> {this.state.content}</p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
  text: "Loading",
  speed: "300"
};
