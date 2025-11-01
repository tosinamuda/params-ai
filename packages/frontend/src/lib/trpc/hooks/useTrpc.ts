import { AppConfig } from '@/app/config'
import { trpc } from '@/lib/trpc'
import { QueryClient } from '@tanstack/react-query'
import { httpLink } from '@trpc/client/links/httpLink'
import { useMemo, useState } from 'react'

export const useTrpc = (token: string | null) => {

  const [trpcQueryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  }));

  const trpcClient = useMemo(() => {
    return trpc.createClient({
      links: [
        httpLink({
          url: AppConfig.trpcServerUrl,
          async headers() {
            let authHeaders: { Authorization?: string } = {};

            if (token) {
              authHeaders = {
                Authorization: `Bearer ${token}`,
              };
            }

            return authHeaders;
          },
        }),
      ],
    });
  }, [token]);

  return {
    trpcQueryClient,
    trpcClient,
  }
}
