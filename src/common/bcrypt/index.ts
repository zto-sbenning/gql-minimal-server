import bcrypt from 'bcrypt';

export const hash = (thingToHash: any) => bcrypt.hash(thingToHash, 10);
export const compare = (thingToCompare: any, encrypted: string) => bcrypt.compare(thingToCompare, encrypted);

export const hashSync = (thingToHash: any) => bcrypt.hashSync(thingToHash, 10);
export const compareSync = (thingToCompare: any, encrypted: string) => bcrypt.compareSync(thingToCompare, encrypted);
