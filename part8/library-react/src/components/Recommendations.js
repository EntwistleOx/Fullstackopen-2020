import { Fragment, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
//import { ALL_BOOKS } from "../queries";

const Recommendations = ({ books, genre }) => {
  //const books = useQuery(ALL_BOOKS, {
  //variables: { genre: me.favoriteGenre },
  //});

  //const filters = () => {
  //return books.filter((b) => b.genres.includes(me.favoriteGenre));
  //};
  if (!books) {
    return <div>loading...</div>;
  }

  return (
    <Fragment>
      <h2>recommendations</h2>
      <p>books in your favorite genre: {genre}</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Recommendations;
