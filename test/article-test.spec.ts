const chai = require('chai');
import 'mocha';
import TestUtil from "./test-util";
import DatabaseService from "../src/db/database-service";
import QueryType from "../src/db/enums/query-type";
const chaiHttp = require('chai-http')
import App from '../src/app'
import {Response} from 'express';
let should = chai.should();
import {expect} from 'chai';

chai.use(chaiHttp);

async function databaseSetup() {
  const userSetup: string = TestUtil.getSqlString('articles_setup');
  await DatabaseService.getInstance().executeQuery(userSetup, QueryType.SELECT);
}

//Our parent block
describe('Articles', () => {
  beforeEach(databaseSetup);
});

/*
    API - /api/v1/articles/:articleId
 */
describe('Articles Service - GET', () => {
  it('Get Article', (done) => {
    chai.request(App.getServer())
    .get('/book')
    .end((err: Error, res: Response) => {
      expect(res).is.not.null;
      expect(res.status).is.eq(200)
      done();
    });
  });
});