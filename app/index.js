//ReactDOM package is separate from React b/c React is a pretty elegant solution for building UI regardless of the environment its in. In our use case, we're building React for the DOM, but other people might want to render it in different environments. Just b/c youre jusing React doesn't mean you're rendering it to a DOM or browser environment.

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popular from "./components/Popular";

//Component
//1) State
//2) Lifecycle- fetching data from API or doing event when component is added to DOM itself
//3) UI - method we use to describe what the UI is going to look like is called render() {} so what we need to return from render is the description of what the UI is going to look like; visually, we can use HTML to describe this.
//Looks like this is a violation of separation of concerns principal, where you sholud keep your JS separate from your CSS separate from your HTML, but really what is the concern of the component? We define it earlier - a component is concerned about state, lifecycle, & UI. SO I'd argue this isn't a violation of separation of concerns b/c a component is concerned about the UI layer
//This is called JSX!
//This is why we need Babel,  before we ship this to the browser, obvi the browser wouldn't understand HTML looking syntax inside Javascript syntax. Babel's whole job is to convert or compile this JSX code into code that lookks like React.createElement

class App extends React.Component {
  render() {
    return (
      <div className={"container"}>
        <Popular />
      </div>
    );
  }
}

ReactDOM.render(
  //React Element- Whenever you use JSX, what's being created under the hood for you is an element
  //Where to render the Element to- Grab element that has an ID of app
  <App />,
  document.getElementById("app")
);

// class App extends React.Component {
//   render() {
//     return React.createElement("div", null, "Hello World!");
//   }
// }
