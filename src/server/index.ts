import { createServer } from 'miragejs';
import mockData from './mockData.json';

export const makeServer = async ({ environment = 'production' }) => {
  return createServer({
    environment,
    routes() {
      this.namespace = 'api/v1';

      this.get('/questions', () => mockData);

      this.get('/result', (_, request) => {
        const score = Number(request.queryParams.score);
        if (score < 8) {
          return {
            title: 'You are more of an introvert',
            text: 'You feel that living alone is to live happily, and you prefer hiding in a crowd rather than standing out in one.',
          };
        }

        return {
          title: 'You are more of a public extrovert',
          text: 'In public and at work you are a ball of energy perpetually on the move. You take the initiative, encourage others, hate waiting and are endlessly anticipating what’s going on around you.',
        };
      });
    },
  });
};
