import { createServer } from 'miragejs';
import mockData from './mockData.json';

export const makeServer = async ({ environment = 'production' }) => {
  return createServer({
    environment,
    routes() {
      this.namespace = 'api/v1';

      this.get('/questions', () => mockData);
    },
  });
};
