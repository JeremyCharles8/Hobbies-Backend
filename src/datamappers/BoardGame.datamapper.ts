import CoreDatamapper from './Core.datamapper.ts';

import { IBoardGame, CreateBoardGame } from '../types/boardGame.type.ts';

export default class UserDatamapper extends CoreDatamapper<IBoardGame, CreateBoardGame, void> {
  static tableName: string = 'board_game';
};
