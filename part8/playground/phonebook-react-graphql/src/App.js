import { useQuery, useApolloClient } from "@apollo/client";
import LoginForm from "./components/Login";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";
import { Fragment, useState } from "react";
import { ALL_PERSONS } from "./queries";

const Notify = ({ errorMsg }) => {
  if (!errorMsg) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMsg}</div>;
};

const App = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [token, setToken] = useState(null);

  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg(null);
    }, 10000);
  };

  const logout = () => {
    console.log("logout");
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!token) {
    return (
      <div>
        <Notify errorMsg={errorMsg} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <Fragment>
      <button onClick={logout}>logout</button>
      <Notify errorMsg={errorMsg} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </Fragment>
  );
};

export default App;
