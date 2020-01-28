import { ApolloServer, gql } from 'apollo-server';

export const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "User" type defines the queryable fields for every user in our data source.
    type User {
        _id: String!
        email: String!
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "users" query returns an array of zero or more Users (defined above).
    type Query {
        users: [User]!
        user(payload: SelectUser!): User!
    }

    type Mutation {
        createUser(payload: CreateUser!): User!
        updateUser(payload: UpdateUser!): User!
        deleteUser(payload: SelectUser!): User!
    }

    # This "SelectUser" input defines the payload fields for the SelectUser query.
    input SelectUser {
        _id: String!
    }

    # This "CreateUser" input defines the payload fields for the CreateUser mutation.
    input CreateUser {
        email: String!
        password: String!
    }

    # This "UpdateUser" input defines the payload fields for the UpdateUser mutation.
    input UpdateUser {
        _id: String!
        email: String
        password: String
    }

`;