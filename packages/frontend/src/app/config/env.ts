const { VITE_OPENAI_API_KEY, VITE_APP_API_BASE_URL, VITE_APP_TRPC_SERVER_URL } = import.meta.env

const AppConfig = {
  openAIKey: VITE_OPENAI_API_KEY as string,
  apiBaseUrl: VITE_APP_API_BASE_URL,
  trpcServerUrl: VITE_APP_TRPC_SERVER_URL
}
export default AppConfig;
