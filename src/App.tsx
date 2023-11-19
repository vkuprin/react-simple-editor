import React, { ReactElement } from "react";
import "./global.scss";
import Editor from "./components/Editor/Editor";

const App = (): ReactElement => {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Simple React Editor</h1>
      </header>
      <main className="app__main">
        <Editor />
      </main>
    </div>
  );
};

export default App;
