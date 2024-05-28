import type { Metadata } from "next";
import "./globals.css";
import { TrpcProvider } from "@/providers/trpc-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import StripeProvider from "@/providers/stripe-provider";
import { SessionProvider } from "@/providers/session-provider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import ToastProvider from "@/providers/toast-provider";

export const metadata: Metadata = {
  title: "Blue Store",
  description: "Shop online in th comform of your home",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="h-lvh">
        <SessionProvider session={session}>
          <TrpcProvider>
            <AppRouterCacheProvider options={{ key: "css" }}>
              <ThemeProvider theme={theme}>
                <StripeProvider>
                  <ToastProvider>{children}</ToastProvider>
                </StripeProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </TrpcProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
