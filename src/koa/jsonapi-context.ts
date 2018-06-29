import _ from 'lodash';
import { Context } from 'koa';

export default class JsonApiContext {
  koaContext: Context;

  private get query(): object {
    return this.koaContext.request.query;
  }

  private _filters: object;

  get filters(): object {
    if (!this._filters) {
      this._filters = _.chain(this.query)
        .toPairs()
        .reduce((filters: [string, string | string[]][], [key, value]: [string, string]) => {
          const matches = key.match(/^filter\[(.*)\]$/);

          if (matches !== null) {
            const val = value.split(',');
            return [...filters, [matches[1], val.length === 1 ? value : val]];
          }

          return [...filters];
        }, [])
        .fromPairs()
        .value();
    }

    return this._filters;
  }

  constructor(ctx: Context) {
    this.koaContext = ctx;
  }
}
