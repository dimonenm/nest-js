import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { Types, disconnect, connection } from 'mongoose';

const productId = new Types.ObjectId().toHexString()

const testDto: CreateReviewDto = {
  name: 'Тест',
  title: 'Заголовок',
  description: 'Описание тестовое',
  rating: 5,
  productId
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST)', async (done) => {
    const res = await request(app.getHttpServer()).post('/review/create').send(testDto).then(({ body }: request.Response) => {
      console.log('body: ', body);
      createdId = body._id;
      console.log('createdId: ', createdId);
      return createdId
      // expect(createdId).toBeDefined();
    })
    console.log('res: ', res);
    expect(res).toBeDefined();
    // done()
    // expect(res).toBe()
    // return request(app.getHttpServer())
    //   .post('/review/create')
    //   .send(testDto)
    //   .expect(201)
    //   .then(({ body }: request.Response) => {
    //     createdId = body._id;
    //     console.log('createdId: ', createdId);
    //     expect(createdId).toBeDefined();
    //   })
  });

  afterAll(async () => {
    disconnect()
  })

});
