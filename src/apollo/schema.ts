import { ApolloServer, gql } from 'apollo-server';

export const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.


    # This "Role" type defines the queryable fields for every role in our data source.
    type Role {
        _id: String!
        name: String!
    }

    # This "User" type defines the queryable fields for every user in our data source.
    type User {
        _id: String!
        email: String!
        roles: [Role]!
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "users" query returns an array of zero or more Users (defined above).
    type Query {
        roles: [Role]!
        role(payload: SelectEntity!): Role!
        users: [User]!
        user(payload: SelectEntity!): User!
    }

    type Mutation {
        createUser(payload: CreateUser!): User!
        updateUser(payload: UpdateUser!): User!
        updateUserRoles(payload: UpdateUserRoles!): User!
        deleteUser(payload: SelectEntity!): User!
    }

    # This "SelectEntity" input defines the payload fields for the user query and the deleteUser mutation.
    input SelectEntity {
        _id: String!
    }

    # This "CreateUser" input defines the payload fields for the createUser mutation.
    input CreateUser {
        email: String!
        password: String!
    }

    # This "UpdateUser" input defines the payload fields for the updateUser mutation.
    input UpdateUser {
        _id: String!
        email: String
        password: String
    }

    # This "UpdateUserRoles" input defines the payload fields for the updateUserRoles mutation.
    input UpdateUserRoles {
        _id: String!
        roleIds: [String]!
    }

`;