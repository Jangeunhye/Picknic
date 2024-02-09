import { OptionProvider } from "@/contexts/option.context";
import Header from "./_components/Header";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <OptionProvider>
      <Header />
      {children}
    </OptionProvider>
  );
}

export default RootLayout;
