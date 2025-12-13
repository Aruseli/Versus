import { BottomNav } from "@/components/BottomNav";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}

