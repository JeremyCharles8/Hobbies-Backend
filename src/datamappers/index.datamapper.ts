import client from '../config/pg.client.ts';
import UserDatamapper from './User.datamapper.ts';

export const userDatamapper = new UserDatamapper(client);
