import { Fragment, useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_BOOKS, ALL_AUTHORS, CREATE_BOOK } from "../queries";

const BooksForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors);
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS });
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [...dataInStore.allBooks, response.data.addBook],
        },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    createBook({
      variables: { title, author, published, genres },
    });

    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres([]);
  };

  return (
    <Fragment>
      <h2>add a book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setGenres([...genres, genre]);
              setGenre("");
            }}
          >
            add genre
          </button>
          <br />
          genres: {genres.join(", ")}
        </div>
        <button type="submit">create book</button>
      </form>
    </Fragment>
  );
};

export default BooksForm;
