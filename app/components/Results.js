import React from "react";
import { battle } from "../utils/api";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser
} from "react-icons/fa";

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

    battle([playerOne, playerTwo])
      .then(players => {
        //console.logging gives my players[0] a null
        // console.log("data: player0 ", player[0]);
        // console.log("data: player1", player[1]);
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        });
      });
  }

  render() {
    const { winner, loser, error, loading } = this.state;
    console.log("winner", winner);
    console.log("loser", loser);

    if (loading === true) {
      return <p>Loading</p>;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <div className="grid space-around container-sm">
        <div className="card bg-light">
          <h4 className="header-lg center-text">
            {winner.score === loser.score ? "Tie" : "Winner"}
          </h4>
          <img
            className="avatar"
            src={winner.profile.avatar_url}
            alt={`Avatar for ${winner.profile.login}`}
          />
          <h4 className="center-text">
            Score: {winner.score.toLocaleString()}
          </h4>
          <h2 className="center-text">
            <a className="link" href={winner.profile.html_url}>
              {winner.profile.login}
            </a>
          </h2>
          <ul className="card-list">
            <li>
              <FaUser color="rgb(239, 115, 115)" size={22} />
              {winner.profile.name}
            </li>
            {/* location and company are optional*/}
            {winner.profile.location && (
              <li>
                <FaCompass color="rgb(144, 115, 255)" size={22} />
                {winner.profile.location}
              </li>
            )}
            {winner.profile.company && (
              <li>
                <FaBriefcase color="#795548" size={22} />
                {winner.profile.location}
              </li>
            )}
            <li>
              <FaUsers color="rgb(129, 195, 245)" size={22} />
              {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color="rgb(64, 183, 95)" size={22} />
              {winner.profile.followers.toLocaleString()} following
            </li>
          </ul>
        </div>
        <div className="card bg-light">
          <h4 className="header-lg center-text">
            {winner.score === loser.score ? "Tie" : "Loser"}
          </h4>

          <img
            className="avatar"
            src={loser.profile.avatar_url}
            alt={`Avatar for ${loser.profile.login}`}
          />
          <h4 className="center-text">Score: {loser.score.toLocaleString()}</h4>
          <h2 className="center-text">
            <a className="link" href={loser.profile.html_url}>
              {loser.profile.login}
            </a>
          </h2>
          <ul className="card-list">
            <li>
              <FaUser color="rgb(239, 115, 115)" size={22} />
              {loser.profile.name}
            </li>
            {/* location and company are optional*/}
            {loser.profile.location && (
              <li>
                <FaCompass color="rgb(144, 115, 255)" size={22} />
                {loser.profile.location}
              </li>
            )}
            {loser.profile.company && (
              <li>
                <FaBriefcase color="#795548" size={22} />
                {loser.profile.location}
              </li>
            )}
            <li>
              <FaUsers color="rgb(129, 195, 245)" size={22} />
              {loser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color="rgb(64, 183, 95)" size={22} />
              {loser.profile.followers.toLocaleString()} following
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
