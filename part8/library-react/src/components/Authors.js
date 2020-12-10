import { Fragment } from "react";

const Authors = ({ authors }) => {
  return (
    <Fragment>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <strong>born</strong>
            </th>
            <th>
              <strong>books</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Authors;
