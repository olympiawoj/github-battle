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

import Card from "./Card";
import Loading from "./Loading";
import PropTypes from "prop-types";

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

class ProfileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveringLocation: false,
      hoveringCompany: false
    };

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver(id) {
    this.setState({
      [id]: true
    });
  }

  mouseOut(id) {
    this.setState({
      [id]: false
    });
  }

  render() {
    const { profile } = this.props;
    const { hoveringCompany, hoveringLocation } = this.state;

    return (
      <ul className="card-list">
        <li>
          <FaUser color="rgb(239, 115, 115)" size={22} />
          {profile.name}
        </li>
        {/* location and company are optional*/}
        {profile.location && (
          <li
            onMouseOver={() => this.mouseOver("hoveringLocation")}
            onMouseOut={() => this.mouseOut("hoveringLocation")}
            style={styles.container}
          >
            {/*wherever we want to show the tooltip, we say*/}
            {hoveringLocation === true && (
              <div style={styles.tooltip}> User's Location</div>
            )}
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </li>
        )}
        {profile.company && (
          <li
            onMouseOver={() => this.mouseOver("hoveringCompany")}
            onMouseOut={() => this.mouseOut("hoveringCompany")}
            style={styles.container}
          >
            {hoveringCompany === true && (
              <div style={styles.tooltip}> User's Company</div>
            )}
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </li>
        )}
        <li>
          <FaUsers color="rgb(129, 195, 245)" size={22} />
          {profile.followers.toLocaleString()} followers
        </li>
        <li>
          <FaUserFriends color="rgb(64, 183, 95)" size={22} />
          {profile.followers.toLocaleString()} following
        </li>
      </ul>
    );
  }
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
};

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
    const { playerOne, playerTwo, onReset } = this.props;

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
      return <Loading text="Battling" />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? "Tie" : "Winner"}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile}></ProfileList>
          </Card>

          <Card
            header={winner.score === loser.score ? "Tie" : "Loser"}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            href={loser.profile.html_url}
            name={loser.profile.login}
          >
            <ProfileList profile={loser.profile}></ProfileList>
          </Card>
        </div>
        <button onClick={this.props.onReset} className="btn dark-btn btn-space">
          Reset
        </button>
      </>
    );
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};
