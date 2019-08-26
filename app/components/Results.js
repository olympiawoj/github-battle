import React from "react";
import { battle } from "../utils/api";

//Inside results, we want to fetch info about our two users
export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo]).then(players => {
      console.log("data: ", players);
      // this.setState({
      //   winners: players[0],
      //   loser: players[1],
      //   error: null,
      //   loading: false
      // });
    });
    //   .catch(({ message }) => {
    //     this.setState({ error: "message", loading: false });
    //   });
  }
  render() {
    return (
      <div>
        Results
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
