/**
 * An user in this application code
 */
export interface User {
    _id: string;
    email: string;
    password: string;
}

export const users: User[] = [
    {
        _id: 'sample',
        email: 'sample@sample.sample',
        password: 'sample',
    },
    {
        _id: 'test',
        email: 'test@test.test',
        password: 'test',
    },
];


/**
 * An user for the api consumer
 */
export interface ApiUser {
    _id: string;
    email: string;
}

/**
 * Payload to select an user
 */
export interface SelectApiUser {
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
