import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { CombinedRQGQLProvider } from "rq-gql";
import type { ComponentProps, ComponentType, PropsWithChildren } from "react";
import { SyncAuth } from "../components/Auth";
import { MainLayout } from "../components/MainLayout";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { ErrorToast, queryClient, rqGQLClient } from "../rqClient";
import "../app.css";

const theme = extendTheme({});
const CombinedRQGQLProviderCompat = CombinedRQGQLProvider as ComponentType<
  PropsWithChildren<ComponentProps<typeof CombinedRQGQLProvider>>
>;
const DndProviderCompat = DndProvider as ComponentType<
  PropsWithChildren<ComponentProps<typeof DndProvider>>
>;

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = false;
  return (
    <>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
        redirectUri={typeof window !== "undefined" ? window.location.origin : undefined}
      >
        <CombinedRQGQLProviderCompat client={queryClient} rqGQLClient={rqGQLClient}>
          <ChakraProvider theme={theme}>
            <DndProviderCompat backend={isMobile ? TouchBackend : HTML5Backend}>
              <SyncAuth />
              <ErrorToast />
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </DndProviderCompat>
          </ChakraProvider>
        </CombinedRQGQLProviderCompat>
      </Auth0Provider>
    </>
  );
}
