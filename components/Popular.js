import React from "react";

export default class Popular extends React.Component {
  render() {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
    //class is a reserved word in Javascript so must use className instead
    return (
      <ul className="flex-center">
        {languages.map((language, index) => (
          <li key={index}>
            <button className="btn-clear nav-link">{language}</button>
          </li>
        ))}
      </ul>
    );
  }
}
