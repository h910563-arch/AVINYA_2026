import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/site-content";

const SiteContentContext = createContext<SiteContent>(DEFAULT_CONTENT);

export function SiteContentProvider({
  value,
  children,
}: {
  value: SiteContent;
  children: ReactNode;
}) {
  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent(): SiteContent {
  return useContext(SiteContentContext);
}
