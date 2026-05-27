import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="flex flex-col px-4 py-8 my-20">{children}</main>;
}
