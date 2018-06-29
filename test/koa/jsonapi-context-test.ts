import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import faker from 'faker';
import { Mock } from 'ts-mocks';

import { Context, Request } from 'koa';
import JsonApiContext from '../../src/koa/jsonapi-context';

@suite('suite name')
class JsonApiContextTest {
  createContextWithQuery(queryParams: any): Context {
    return new Mock<Context>({
      request: new Mock<Request> ({
        query: queryParams
      }).Object
    }).Object;
  }

  public before() {

  }

  @test
  testGetFilters() {
    const ctx = this.createContextWithQuery({
      'filter[first]': faker.name.firstName(),
      'filter[last]': faker.name.lastName()
    });

    const jsonapiCtx = new JsonApiContext(ctx);

    const result = jsonapiCtx.filters;

    assert.deepEqual(result, {
      first: ctx.request.query['filter[first]'],
      last: ctx.request.query['filter[last]'],
    });
  }
}
