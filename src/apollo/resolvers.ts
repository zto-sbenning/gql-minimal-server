import { users, SelectApiEntity, UpdateApiUser, CreateApiUser, User, roles, UpdateApiUserRoles, ApiUser } from './data';
import { hash, uuid } from '../common';

function selectEntity(idRef: string) {
    return ({ _id }: any) => _id.toString() === idRef.toString();
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves users from the "users" array above.
export const resolvers = {

    User: {
        roles: (user: ApiUser) => user.roles.map(roleId => roles.find(role => role._id === roleId)),
    },
    
    Query: {

        roles: () => roles,

        role: (_: any, { payload }: { payload: SelectApiEntity }) => roles.find(selectEntity(payload._id)),
        
        users: () => users,
        
        user: (_: any, { payload }: { payload: SelectApiEntity }) => users.find(selectEntity(payload._id)),
    
    },
    Mutation: {
        
        createUser: async (_: any, { payload }: { payload: CreateApiUser }) => {
            const newUser = {
                _id: uuid(),
                email: payload.email,
                password: await hash(payload.password),
                roles: ['user']
            };
            users.push(newUser);
            return newUser;
        },
        
        updateUser: async (_: any, { payload }: { payload: UpdateApiUser }) => {
            const idx = users.findIndex(selectEntity(payload._id));
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

        updateUserRoles: (_: any, { payload }: { payload: UpdateApiUserRoles }) => {
            console.log(_, payload);
            const idx = users.findIndex(selectEntity(payload._id));
            users[idx].roles = payload.roleIds.filter(role => roles.some(roleRef => roleRef._id === role));
            return users[idx];
        },
        
        deleteUser: (_: any, { payload }: { payload: SelectApiEntity }) => {
            const idx = users.findIndex(selectEntity(payload._id));
            const userToDelete = users[idx];
            users.splice(idx, 1);
            return userToDelete;
        },
    }
};
