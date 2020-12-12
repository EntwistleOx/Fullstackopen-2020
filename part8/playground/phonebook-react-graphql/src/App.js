import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import LoginForm from "./components/Login";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";
import { Fragment, useState } from "react";
import { ALL_PERSONS, PERSON_ADDED } from "./queries";

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

  const updateCacheWith = (addedPerson) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_PERSONS });
    if (!includedIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons: dataInStore.allPersons.concat(addedPerson) },
      });
    }
  };

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded;
      notify(`${addedPerson.name} added`);
      updateCacheWith(addedPerson);
    },
  });

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
      <PersonForm setError={notify} updateCacheWith={updateCacheWith} />
      <PhoneForm setError={notify} />
    </Fragment>
  );
};

export default App;
