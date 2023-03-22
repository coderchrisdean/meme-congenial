const { gql } = require('apollo-server-express');

// User: represents user 
// Book: Represents the Book
// Auth: Represents the authentication object containing the JWT token and the authenticated user
const typeDefs = gql`
    type User {
       _id: ID!
       username: String!
       email: String!
       bookCount: Int 
       savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput!): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;
