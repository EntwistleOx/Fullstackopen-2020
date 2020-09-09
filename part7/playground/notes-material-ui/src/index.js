import {
  AppBar,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  ThemeProvider,
  Toolbar,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </div>
);

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? 'tärkeä' : ''}</strong>
      </div>
    </div>
  );
};

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table striped>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell key={note.id}>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>{note.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
);

const Login = (props) => {
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin('mluukkai');
    history.push('/');
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <TextField label='username' />

        <TextField label='password' type='password' />

        <Button variant='contained' color='primary' type='submit'>
          Login
        </Button>
      </form>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen',
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
    },
  ]);

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const login = (user) => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const padding = {
    padding: 5,
  };

  const match = useRouteMatch('/notes/:id');
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  const theme = createMuiTheme({
    props: {
      MuiTypography: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar position='static'>
          <Toolbar>
            <Button color='inherit' component={Link} to='/'>
              home
            </Button>
            <Button color='inherit' component={Link} to='/notes'>
              notes
            </Button>
            <Button color='inherit' component={Link} to='/users'>
              users
            </Button>
            {user ? (
              <em>{user} logged in</em>
            ) : (
              <Button color='inherit' component={Link} to='/login'>
                login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {message && <Alert severity='success'>{message}</Alert>}
        <Switch>
          <Route path='/notes/:id'>
            <Note note={note} />
          </Route>
          <Route path='/notes'>
            <Notes notes={notes} />
          </Route>
          <Route path='/users'>
            {user ? <Users /> : <Redirect to='/login' />}
          </Route>
          <Route path='/login'>
            <Login onLogin={login} />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>

        <div>
          <br />
          <em>Note app, Department of Computer Science 2020</em>
        </div>
      </Container>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
