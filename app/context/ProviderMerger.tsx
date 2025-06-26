import React from "react";

export interface ProviderMergerProps {
  providers: Array<React.ComponentType<{ children: React.ReactNode }>>;
  children: React.ReactNode;
}

export default function ProviderMerger({
  providers,
  children,
}: ProviderMergerProps) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}
