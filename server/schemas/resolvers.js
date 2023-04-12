
const { AuthenticationError } = require ('apollo-server-express'); //import from apollo-server-express
const { User } = require("../models"); //import User object from models
const { signToken } = require('../utils/auth'); // import from auth.js

// resolvers function

const resolvers = {
    
  Query: {
    // fetch data from authenticated user
    me: async (parent, args, context) => {
      if (context.user) { // if user is authenticated return savedBooks results
        const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");
      
        return userData;
      }
      throw new AuthenticationError("You need to be logged in.");
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
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
        // saves book to authenticated user account
    saveBook: async (parent, { newBook },  context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id, },
          { $push: { savedBooks: newBook } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You must be logged in.");
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