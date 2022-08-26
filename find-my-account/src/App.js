import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./Components/Main";
import NavBar from "./Components/NavBar";

function App() {
  const [darkModeToggle, setDarkModeToggle] = React.useState(false);
  function handleDarkModeChange() {
    console.log("changed");
    setDarkModeToggle((prevState) => !prevState);
  }
  return (
    <div className="App">
      <NavBar change={handleDarkModeChange} />
      <Main darkMode={darkModeToggle} />
    </div>
  );
}

export default App;
