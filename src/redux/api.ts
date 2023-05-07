import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://teamway.local/api/v1' }),
  endpoints: (builder) => ({
    getQuizzes: builder.query<GetQuizzesApiResponse, void>({
      query: () => '/quizzes',
    }),
    getQuestions: builder.query<GetQuestionsApiResponse, GetQuestionsApiArg>({
      query: ({ quizId }) => `/questions/${quizId}`,
    }),
    getResult: builder.query<GetResultApiResponse, GetResultApiArg>({
      query: ({ score, quizId }) => `/result/${quizId}?score=${score}`,
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
  options?: MultipleChoiceOption[];
}

export type GetQuestionsApiResponse = Question[];

export interface GetQuestionsApiArg {
  quizId: number;
}

export interface GetResultApiResponse {
  title: string;
  text: string;
}

export interface GetResultApiArg {
  quizId: number;
  score: number;
}

export interface Quiz {
  id: number;
  title: string;
}

export type GetQuizzesApiResponse = Quiz[];

export const {
  useGetQuizzesQuery,
  useGetQuestionsQuery,
  useGetResultQuery,
} = api;
