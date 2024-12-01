import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="p-0 m-0 font-work-sans">
      <Navbar />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </main>
  );
}
