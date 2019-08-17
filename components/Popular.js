import React from "react";

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All"
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage: selectedLanguage
    });
  }

  render() {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
    //class is a reserved word in Javascript so must use className instead
    return (
      <ul className="flex-center">
        {languages.map((language, index) => (
          <li key={index}>
            <button
              className="btn-clear nav-link"
              onClick={() => this.updateLanguage(language)}
              style={
                language === this.state.selectedLanguage
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
}
