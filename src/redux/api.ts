import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getQuestions: builder.query<GetQuestionsApiResponse, void>({
      query: () => `/questions`,
    }),
  }),
});

export interface MultipleChoiceOption {
  id: number;
  title: string;
  score: number;
}

export interface Question {
  title: string;
  options: MultipleChoiceOption[];
}

export type GetQuestionsApiResponse = Question[];

export const { useGetQuestionsQuery } = api;
