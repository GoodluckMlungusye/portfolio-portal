import React, { ReactNode } from 'react';

// ----------------------------------------------------------------------

type Props = {
  currentObject?: any;
  children: ReactNode;
};

export default function ObjectForm({ currentObject, children }: Props) {
  return <>{React.cloneElement(children as React.ReactElement<any>, { currentObject })}</>;
}
