import AuthProvider from "@/features/Auth/components/AuthProvider";
import TRPCProvider from "@/lib/trpc/Provider";
import { type PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store.ts";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <TRPCProvider>{children}</TRPCProvider>
      </AuthProvider>
    </ReduxProvider>
  );
};

export default Providers;
