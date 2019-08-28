import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from "react-icons/fa";

function LanguagesNav({ selectedLanguage, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  //class is a reserved word in Javascript so must use className instead
  return (
    <ul className="flex-center">
      {languages.map((language, index) => (
        <li key={index}>
          <button
            className="btn-clear nav-link"
            onClick={() => onUpdateLanguage(language)}
            style={
              language === selectedLanguage
                ? { color: "rgb(187, 46, 31)" }
                : null
            }
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues
        } = repo;

        const { login, avatar_url } = owner;

        return (
          <li className="card bg-light" key={html_url}>
            <h4 className="header-lg center-text">#{index + 1}</h4>
            <img
              className="avatar"
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />
            <h2 className="center-text">
              {" "}
              <a className="link" href={html_url}>
                {login}
              </a>
            </h2>
            <ul className="card-list">
              <li>
                <FaUser color="rgb(255, 191, 116" size={22} />
                <a href={`https://github.com/${login}`}>{login}</a>
              </li>
              <li>
                <FaStar color="rgb(255, 215, 0)" size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                {open_issues.toLocaleString()} open
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      //we're going to make repos an object, each lang will be a key on object which will help us with caching
      repos: {},
      error: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage: selectedLanguage,
      error: null
    });

    //We only want to fetchPopularRepos IF this.state.repos @ the selectedLanguage is falsey or undefined
    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          //set data as property on repos object, update state of component based on prev state
          //b/c we're updating the new repos based on the current repos, we pass a function to setState
          //what we return from function is going to be merged w/ current state
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }));
        })
        .catch(() => {
          console.warn("Error fetching repos", error);
          this.setState({ error: "There was an error fetching the repos" });
        });
    }
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;
    //if repos at selectedLanguage is falsey, (we haven't fetched repos yet ) our component will be loading & error is null
    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <>
        <LanguagesNav
          selectedLanguage={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}
        {error && <p className="center-text error">{error}</p>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </>
    );
  }
}
