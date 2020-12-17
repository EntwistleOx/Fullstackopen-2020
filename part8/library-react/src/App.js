import { Fragment, useState, useEffect } from "react";
import {
  useQuery,
  useLazyQuery,
  useApolloClient,
  useSubscription,
} from "@apollo/client";
import Login from "./components/Login";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BooksForm from "./components/BooksForm";
import BornForm from "./components/BornForm";
import Recommendations from "./components/Recommendations";
import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from "./queries";

const App = () => {
  const [recommended, setRecommended] = useState(null);
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showAuthors, setShowAuthors] = useState(true);
  const [showBooks, setShowBooks] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const me = useQuery(ME);
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "network-only",
  });
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (result.data) {
      setRecommended(result.data.allBooks);
    }
  }, [result.data]);

  const fetchRecommended = (genre) => {
    getBooks({ variables: { genre } });
  };

  const updateCache = (added) => {
    const booksIn = (set, obj) => set.map((b) => b.id).includes(obj.id);
    const authorsIn = (set, obj) =>
      set.map((a) => a.id).includes(obj.author.id);

    const booksInStore = client.readQuery({ query: ALL_BOOKS });
    const authorsInStore = client.readQuery({ query: ALL_AUTHORS });

    if (!booksIn(booksInStore.allBooks, added)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: booksInStore.allBooks.concat(added) },
      });
    }

    if (!authorsIn(authorsInStore.allAuthors, added)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: authorsInStore.allAuthors.concat(added.author) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const added = subscriptionData.data.bookAdded;
      alert(`${added.title} added`);
      updateCache(added);
    },
  });

  if (authors.loading) {
    return <div>loading...</div>;
  }

  if (books.loading) {
    return <div>loading...</div>;
  }

  if (me.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setShowAuthors(true);
    setShowBooks(false);
    setShowBookForm(false);
    setShowRecommendations(false);
    setShowLogin(false);
  };

  return (
    <Fragment>
      <button
        onClick={() => {
          setShowAuthors(true);
          setShowBooks(false);
          setShowBookForm(false);
          setShowRecommendations(false);
          setShowLogin(false);
        }}
      >
        authors
      </button>
      <button
        onClick={() => {
          setShowAuthors(false);
          setShowBooks(true);
          setShowBookForm(false);
          setShowRecommendations(false);
          setShowLogin(false);
        }}
      >
        books
      </button>
      {token && (
        <button
          onClick={() => {
            setShowAuthors(false);
            setShowBooks(false);
            setShowBookForm(true);
            setShowRecommendations(false);
            setShowLogin(false);
          }}
        >
          add book
        </button>
      )}
      {token && (
        <button
          onClick={() => {
            setShowAuthors(false);
            setShowBooks(false);
            setShowBookForm(false);
            setShowRecommendations(true);
            setShowLogin(false);
            fetchRecommended(me.data.me.favoriteGenre);
          }}
        >
          recommendations
        </button>
      )}
      {!token && (
        <button
          onClick={() => {
            setShowAuthors(false);
            setShowBooks(false);
            setShowBookForm(false);
            setShowRecommendations(false);
            setShowLogin(true);
          }}
        >
          login
        </button>
      )}
      {token && <button onClick={logout}>logout</button>}
      {showAuthors && (
        <Fragment>
          <Authors authors={authors.data.allAuthors} />
          {token && <BornForm authors={authors.data.allAuthors} />}
        </Fragment>
      )}
      {showBooks && <Books books={books.data.allBooks} />}
      {showBookForm && <BooksForm updateCache={updateCache} />}
      {showRecommendations && (
        <Recommendations books={recommended} genre={me.data.me.favoriteGenre} />
      )}
      {showLogin && (
        <Login
          setToken={setToken}
          setShowLogin={setShowLogin}
          setShowAuthors={setShowAuthors}
        />
      )}
    </Fragment>
  );
};

export default App;
