/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { QueryClient, QueryClientProvider as QueryInit } from "react-query";

const queryClient = new QueryClient();

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryInit client={queryClient}>{children}</QueryInit>;
}
