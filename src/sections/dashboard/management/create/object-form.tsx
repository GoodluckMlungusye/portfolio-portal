import React, { ReactNode } from 'react';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function ObjectForm({ children }: Props) {
  return <>{children}</>;
}
