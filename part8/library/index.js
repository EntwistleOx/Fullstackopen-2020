const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
  PubSub,
} = require("apollo-server");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const pubsub = new PubSub();

const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

const MONGODB_URI =
  "mongodb+srv://fullstack2020:fullstack2020@notes.i67jg.mongodb.net/library?retryWrites=true&w=majority";

const JWT_SECRET = "MY-SECRET-666";

//mongoose.set("debug", true);
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

//let authors = [
//{
//name: "Robert Martin",
//id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//born: 1952,
//},
//{
//name: "Martin Fowler",
//id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//born: 1963,
//},
//{
//name: "Fyodor Dostoevsky",
//id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//born: 1821,
//},
//{
//name: "Joshua Kerievsky", // birthyear not known
//id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//},
//{
//name: "Sandi Metz", // birthyear not known
//id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//},
//];

//let books = [
//{
//title: "Clean Code",
//published: 2008,
//author: "Robert Martin",
//id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//genres: ["refactoring"],
//},
//{
//title: "Agile software development",
//published: 2002,
//author: "Robert Martin",
//id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//genres: ["agile", "patterns", "design"],
//},
//{
//title: "Refactoring, edition 2",
//published: 2018,
//author: "Martin Fowler",
//id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//genres: ["refactoring"],
//},
//{
//title: "Refactoring to patterns",
//published: 2008,
//author: "Joshua Kerievsky",
//id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//genres: ["refactoring", "patterns"],
//},
//{
//title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//published: 2012,
//author: "Sandi Metz",
//id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//genres: ["refactoring", "design"],
//},
//{
//title: "Crime and punishment",
//published: 1866,
//author: "Fyodor Dostoevsky",
//id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//genres: ["classic", "crime"],
//},
//{
//title: "The Demon ",
//published: 1872,
//author: "Fyodor Dostoevsky",
//id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//genres: ["classic", "revolution"],
//},
//];

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.genre) {
        return Book.find({ genres: args.genre }).populate("author");
      } else {
        return Book.find({}).populate("author");
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const book = new Book({ ...args });

      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      try {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          const newAuthor = new Author({ name: args.author, bookCount: 1 });
          await newAuthor.save();
          book.author = newAuthor;
        } else {
          book.author = author;
          author.bookCount = author.bookCount + 1;
          await author.save();
        }
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book;
      //if (!authors.find((a) => a.name === args.author)) {
      //const author = { name: args.author, id: uuid() };
      //authors = authors.concat(author);
      //}
      //const book = { ...args, id: uuid() };
      //books = books.concat(book);
      //return book;
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name });

      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        if (!author) {
          return null;
        }
        author.born = args.setBornTo;
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
      //const author = authors.find((a) => a.name === args.name);
      //const updated = { ...args, born: args.setBornTo };
      //authors = authors.map((a) => (a.name === args.name ? updated : a));
      //return updated;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  //Author: {
  //bookCount: async (root) => await Book.countDocuments({ author: root._id }),
  //},
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
