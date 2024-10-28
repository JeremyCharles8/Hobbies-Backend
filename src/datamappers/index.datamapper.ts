import client from '../config/pg.client';
import UserDatamapper from './User.datamapper';

export const userDatamapper = new UserDatamapper(client);
