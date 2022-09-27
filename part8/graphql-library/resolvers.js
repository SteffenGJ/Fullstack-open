const { UserInputError } = require('apollo-server');
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const jwt = require("jsonwebtoken");
const {SECRET} = require("./config");
const User = require("./models/user");
const Book = require("./models/book");
const Author = require("./models/author");

const resolvers = {
    Query: {
      bookCount: async () => {
        const books = await Book.find({});
        return books.length;
      },
      authorCount: async () => {
        const authors = await Author.find({});
        return authors.length;
      },
      allBooks: async (root, args) => {
        if (args.author) {
          return await Book.find({author: args.author});
        }
        if (args.genre) {
          const books = await Book.find({});
          return books.filter(book => book.genres.includes(args.genre));
        }
        return await Book.find({});
      },
      allAuthors: async () =>  {

        return await Author.find({})
      },
      me: async (root, args, context) => {
        return context.currentUser;
      }
    },
    Author: {
      bookCount: async (root) => {
          const books = await Book.find({author: root._id});
          return books.length;
      }
    },
    Book: {
      author: async (root) => {
        const author = await Author.findById(root.author);
        return {
          name: author.name,
          born: author.born
        }
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        if (!context.currentUser) {
          throw new UserInputError("To make changes, you must be logged in");
        }
  
        const author = await Author.findOne({name: args.author})
        const book = new Book({...args, author: author._id});
        try {
          await book.save();
        } catch(e) {
          throw new UserInputError(e.message, {
            invalidArgs: args
          })
        }

        pubsub.publish("BOOK ADDED", {bookAdded: book})

        return book
      },
      editAuthor: async (root, args, context) => {
        if (!context.currentUser) {
          throw new UserInputError("To make changes, you must be logged in");
        }
        const author = await Author.findOne({name: args.name});
        author.born = args.setBornTo;
        try {
          await author.save();
        } catch(e) {
          throw new UserInputError(e.message, {
            invalidArgs: args
          })
        }
        return author
      },
      createUser: async (root, args) => {
        console.log(args);
        const user = new User({username: args.username, favoriteGenre: args.favoriteGenre});
          return user.save()
            .catch(e => {
              throw new UserInputError(e.message, {
                invalidArgs: args
              })
            })
      },
      login: async (root, args) => {
        const user = await User.findOne({usename: args.username});
        if (!user || args.password !== "1234") {
          throw new UserInputError("Wrong username or password");
        };
        const userForToken = {
          username: user.usename,
          id: user._id
        };
  
        return {value: jwt.sign(userForToken, SECRET)};
      }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(["BOOK ADDED"])
        }
    }
  }

  module.exports = resolvers;