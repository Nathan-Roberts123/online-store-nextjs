import MainLayout from "./components/main-layout";
import TotalItemsProviderProvider from "@/providers/total-items-provider";
import CartProvier from "@/providers/cart-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TotalItemsProviderProvider>
      <CartProvier>
        <MainLayout>{children}</MainLayout>
      </CartProvier>
    </TotalItemsProviderProvider>
  );
}
