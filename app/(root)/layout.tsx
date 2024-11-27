import Navbar from "@/components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-full font-work-sans">
      <Navbar />

      {children}
    </main>
  );
}
