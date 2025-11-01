import { useAppSelector } from "@/app/redux/hook.ts";
import { selectCurrentToken } from "@/features/Auth/redux/slice/authSlice.ts";
import { trpc } from "@/lib/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren } from "react";
import { useTrpc } from "./hooks";

const TRPCProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const token = useAppSelector(selectCurrentToken);
  const { trpcQueryClient, trpcClient } = useTrpc(token);
  return (
    <trpc.Provider client={trpcClient} queryClient={trpcQueryClient}>
      <QueryClientProvider client={trpcQueryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default TRPCProvider;
