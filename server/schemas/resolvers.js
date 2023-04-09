
const { AuthenticationError } = require ('apollo-server-express'); //import from apollo-server-express
const { signToken } = require('../utils/auth'); // import from auth.js
const { User } = require("../models"); //import User object from models

// resolvers function

const resolvers = {
    
  Query: {
    // fetch data from authenticated user
    me: async (parent, args, context) => {
      if (context.user) { // if user is authenticated return savedBooks results
        return await User.findById(context.user._id).populate("savedBooks");
      }
      throw new Error("You need to be logged in.");
    },
  },
// resolver functions for modifying database
  Mutation: { 
    // authenticates user with email and password
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
        // if user is not found, return error
      if (!user) {
        throw new AuthenticationError("Incorrect email or password");
      }
      //checks if password is correct
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect email or password");
      }
      // else, generate JWT
      const token = signToken(user);
      return { token, user };
    },
        // creates a new user account
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
        // saves book to authenticated user account
    saveBook: async (parent, { authors, description, bookId, image, link, title }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedBooks: authors, description, bookId, image, link, title } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new Error("You must be logged in.");
    },
        // removes book from authenticated user list
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new Error("You must be logged in");
    },
  },
};

module.exports = resolvers;