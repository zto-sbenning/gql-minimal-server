/**
 * An user in this application code
 */

export interface Role {
    _id: string;
    name: string;
}

export interface User {
    _id: string;
    email: string;
    password: string;
    roles: string[];
}

export const roles: Role[] = [
    {
        _id: 'user',
        name: 'user',
    },
    {
        _id: 'admin',
        name: 'admin',
    }
];

export const users: User[] = [
    {
        _id: 'sample',
        email: 'sample@sample.sample',
        password: 'sample',
        roles: ['user']
    },
    {
        _id: 'test',
        email: 'test@test.test',
        password: 'test',
        roles: ['user', 'admin']
    },
];


/**
 * An user for the api consumer
 */
export interface ApiUser {
    _id: string;
    email: string;
    roles: string[];
}

/**
 * Payload to select an entity
 */
export interface SelectApiEntity {
    _id: string;
}

/**
 * Payload to create an user
 */
export interface CreateApiUser {
    email: string;
    password: string;
}

/**
 * Payload to update an user
 */
export interface UpdateApiUser {
    _id: string;
    email?: string;
    password?: string;
}

/**
 * Payload to update an user's roles
 */
export interface UpdateApiUserRoles {
    _id: string;
    roleIds: string[];
}
