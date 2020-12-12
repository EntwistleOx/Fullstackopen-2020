import { Fragment, useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_PERSONS, CREATE_PERSON } from "../queries";

const PersonForm = ({ setError, updateCacheWith }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      updateCacheWith(response.data.addPerson);
    },
    //update: (store, response) => {
    //const dataInStore = store.readQuery({ query: ALL_PERSONS });
    //store.writeQuery({
    //query: ALL_PERSONS,
    //data: {
    //...dataInStore,
    //allPersons: [...dataInStore.allPersons, response.data.allPersons],
    //},
    //});
    //},
  });

  const submit = (e) => {
    e.preventDefault();

    createPerson({
      variables: {
        name,
        phone: phone.length > 0 ? phone : null,
        street,
        city,
      },
    });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <Fragment>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone{" "}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street{" "}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city{" "}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </Fragment>
  );
};

export default PersonForm;
