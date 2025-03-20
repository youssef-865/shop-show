import React, { lazy, Suspense } from 'react';

const LazyCarts = lazy(() => import('./Carts'));

const Carts = props => (
  <Suspense fallback={null}>
    <LazyCarts {...props} />
  </Suspense>
);

export default Carts;
