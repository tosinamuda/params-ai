import { AppConfig } from '@/app/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { PromptInput } from './types'



// Define a service using a base URL and expected endpoints
export const promptManagementApi = createApi({
  reducerPath: 'promptApi',
  baseQuery: fetchBaseQuery({ baseUrl: AppConfig.apiBaseUrl }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({

    previewPromptCompletion: builder.mutation<string, PromptInput>({
      query: (prompt) => ({
        url: 'prompt/test',
        method: 'POST',
        body: prompt
      }),
      transformResponse: (response: { data: string }) => response.data,
    })

  }),
})


export const {
  usePreviewPromptCompletionMutation
} = promptManagementApi
