import { users, SelectApiUser, UpdateApiUser, CreateApiUser, User } from './data';
import { hash, uuid } from '../common';

function selectUser(idRef: string) {
    return ({ _id }: User) => _id.toString() === idRef.toString();
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves users from the "users" array above.
export const resolvers = {

    Query: {
        
        users: () => users,
        
        user: (_: any, { payload }: { payload: SelectApiUser }) => users.find(selectUser(payload._id)),
    
    },
    Mutation: {
        
        createUser: async (_: any, { payload }: { payload: CreateApiUser }) => {
            const newUser = {
                _id: uuid(),
                email: payload.email,
                password: await hash(payload.password)
            };
            users.push(newUser);
            return newUser;
        },
        
        updateUser: async (_: any, { payload }: { payload: UpdateApiUser }) => {
            const idx = users.findIndex(selectUser(payload._id));
            delete payload._id;
            users[idx] = {
                /** get previous state */
                ...users[idx],
                /** apply patch */
                ...payload,
                /** ensure password is hashed if changed */
                password: payload.password
                    ? await hash(payload.password)
                    : users[idx].password
            };
            return users[idx];
        },
        
        deleteUser: (_: any, { payload }: { payload: SelectApiUser }) => {
            const idx = users.findIndex(selectUser(payload._id));
            const userToDelete = users[idx];
            users.splice(idx, 1);
            return userToDelete;
        },
    }
};
