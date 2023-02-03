import React, { FC, useEffect } from 'react';
import ErrorBoundaryFallBack from '../ErrorBoundaryFallBack';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorBoundaryHandler:FC = ({ children }) => {
  const [explode, setExplode] = React.useState(false);
  useEffect(() => {
    if (explode) {
      window.location.reload();
    }
  }, [explode]);
  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallBack}
      onReset={() => setExplode(true)}
      resetKeys={[explode]}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryHandler;
