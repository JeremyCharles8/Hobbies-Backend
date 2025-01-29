import client from '../config/pg.client.ts';
import UserDatamapper from './User.datamapper.ts';

const userDatamapper = new UserDatamapper(client);

export { userDatamapper };
