import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import exp from 'constants';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can say hello', async () => {
      const response = await controller.sayHello('Theodorus','Danang');    
      expect(response).toBe('Hello Theodorus Danang');
  });

  it('should can view template', async() =>{
    const response = httpMock.createResponse();
    controller.viewHello('Theo', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'Theo',
      title: 'Template Engine',
    });
  });
});
