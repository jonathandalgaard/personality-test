import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getQuestions: builder.query<GetQuestionsApiResponse, void>({
      query: () => `/questions`,
    }),
    getResult: builder.query<GetResultApiResponse, GetResultApiArg>({
      query: ({ score }) => `/result?score=${score}`,
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

export interface GetResultApiResponse {
  title: string;
  text: string;
}

export interface GetResultApiArg {
  score: number;
}

export const { useGetQuestionsQuery, useGetResultQuery } = api;
