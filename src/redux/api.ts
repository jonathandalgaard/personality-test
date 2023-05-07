import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://teamway.local/api/v1' }),
  endpoints: (builder) => ({
    getQuestions: builder.query<GetQuestionsApiResponse, void>({
      query: () => `/questions/1`,
    }),
    getResult: builder.query<GetResultApiResponse, GetResultApiArg>({
      query: ({ score }) => `/result/1?score=${score}`,
    }),
  }),
});

export interface MultipleChoiceOption {
  id: number;
  title: string;
  score: string;
}

export interface Question {
  title: string;
  options: MultipleChoiceOption[];
}

export type GetQuestionsApiResponse = Question[];

export interface GetResultApiResponse {
  title: string;
  text: string;
}

export interface GetResultApiArg {
  score: number;
}

export const { useGetQuestionsQuery, useGetResultQuery } = api;
