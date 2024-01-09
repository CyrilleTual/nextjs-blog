"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Button variant="outline" onClick={() => router.push("/login")}>
        <Eye />
        {"\u00A0 \u00A0"}
        Login
      </Button>
      <Button variant="outline" onClick={() => router.push("/categories/react")}>
        <Eye />
        {"\u00A0 \u00A0"}
        React
      </Button>
    </main>
  );
}
