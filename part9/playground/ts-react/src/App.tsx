import React from "react";

//interface AppProps {
//name: string;
//}

const App: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};

export default App;
