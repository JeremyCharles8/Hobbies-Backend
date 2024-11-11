import CoreDatamapper from './Core.datamapper';

import { IBoardGame, CreateBoardGame } from '../types/boardGame.type';

export default class UserDatamapper extends CoreDatamapper<IBoardGame, CreateBoardGame> {
  static tableName: string = 'board_game';
};
