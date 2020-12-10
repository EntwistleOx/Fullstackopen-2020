import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const BornForm = ({ authors }) => {
  const [name, setName] = useState("");
  const [setBornTo, setSetBornTo] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name, setBornTo } });
    setName("");
    setSetBornTo("");
  };

  return (
    <div>
      <h2>set birthyear</h2>

      <form onSubmit={handleSubmit}>
        <div>
          name{" "}
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value={0}>select author...</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born{" "}
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BornForm;
