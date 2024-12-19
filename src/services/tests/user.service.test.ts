import { jest } from '@jest/globals';

import service from '../user.service.ts';
import { userDatamapper } from '../../datamappers/index.datamapper.ts';
import argon from '../../helpers/argon.helper.ts';

jest.spyOn(argon, 'hashFunc').mockImplementation(jest.fn());
// jest.mock('../../helpers/argon.helper.ts', () => ({
//   hashFunc: jest.fn().mockResolvedValue('hashedPassword'),
// }));
jest.spyOn(userDatamapper, 'create').mockImplementation(jest.fn());
jest.spyOn(userDatamapper, 'findOne').mockImplementation(jest.fn());

// Test create()
describe('create', () => {
  //Mock user input
  const mockCreateUser = {
    nickname: 'Harley Quinn',
    email: 'h.quinn@teamjoker.got',
    password: 'AAaa00!!',
    repeatpassword: 'AAaa00!!',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  })

  // Test create() if email already exists
  describe('If email already exists', () => {
    beforeEach(() => {
      userDatamapper.findOne.mockResolvedValueOnce(true);
    });

    test('Should call findOne() with correct arguments', async() => {
      await expect(service.create(mockCreateUser)).rejects.toThrow('Email already exists');
      await service.create(mockCreateUser);

      expect(userDatamapper.findOne).toHaveBeenCalledWith('email', mockCreateUser.email);
    });
  
    test('Should throw an error object which contains expected properties', async() =>{
      await expect(service.create(mockCreateUser)).rejects.toMatchObject({
        message: 'Email already exists',
        status: 409,
      });
    });
  });

  // Test create() if nickname already exists
  describe('If nickname already exists', () => {
    beforeEach(() => {
      userDatamapper.findOne
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true);
    });

    test('Should call findOne with correct arguments', async () => {
      await expect(service.create(mockCreateUser)).rejects.toThrow('Nickname already exists');
      await service.create(mockCreateUser);
  
      expect(userDatamapper.findOne).toHaveBeenNthCalledWith(1, 'email', mockCreateUser.email);
      expect(userDatamapper.findOne).toHaveBeenNthCalledWith(2, 'nickname', mockCreateUser.nickname);
    });

    test('Should throw an error object with correct properties', async () => {
      await expect(service.create(mockCreateUser)).rejects.toMatchObject({
        message: 'Nickname already exists',
        status: 409,
      });

      expect(userDatamapper.findOne).toHaveBeenCalledTimes(2);
    });
  });

  // Test create() if nickname and email are valid
  describe('If nickname and email are valid', () => {
    beforeEach(() => {
      userDatamapper.findOne.mockResolvedValueOnce(false);
      userDatamapper.findOne.mockResolvedValueOnce(false);
    });

    test('Password should be hashed', async () => {
      await service.create(mockCreateUser);

      expect(userDatamapper.findOne).toHaveBeenCalledTimes(2);
      expect(argon.hashFunc).toHaveBeenCalledWith(mockCreateUser.password);
    });

    test('Should call create() with correct arguments', async () => {
      argon.hashFunc.mockResolvedValueOnce('hashedPassword');
      await service.create(mockCreateUser);

      expect(userDatamapper.findOne).toHaveBeenCalledTimes(2);
      expect(userDatamapper.create).toHaveBeenCalledWith({
        nickname: mockCreateUser.nickname,
        email: mockCreateUser.email,
        password: 'hashedPassword',
      });
    });
  });
});