import React, { ReactNode } from 'react';

import { IProductItem } from 'src/types/product';

// ----------------------------------------------------------------------

type Props = {
  currentProduct?: IProductItem;
  children: ReactNode;
};

export default function ObjectForm({ currentProduct, children }: Props) {
  return <>{React.cloneElement(children as React.ReactElement<any>, { currentProduct })}</>;
}
