import { Fragment, useState } from "react";

const Books = ({ books }) => {
  const [genre, setGenre] = useState("all");

  const handleChange = (e) => {
    setGenre(e.target.value);
  };

  const filters = () => {
    if (genre === "all") {
      return books;
    } else {
      return books.filter((b) => b.genres.includes(genre));
    }
  };

  return (
    <Fragment>
      <h2>books</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {filters().map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <label>
        filter by:
        <select value={genre} onChange={handleChange}>
          <option value="all">all genres</option>
          <option value="database">database</option>
          <option value="nosql">nosql</option>
          <option value="refactoring">refactoring</option>
          <option value="agile">agile</option>
          <option value="patterns">patterns</option>
          <option value="design">design</option>
          <option value="crime">crime</option>
          <option value="classic">classic</option>
          <option value="scifi">scifi</option>
        </select>
      </label>
    </Fragment>
  );
};

export default Books;
