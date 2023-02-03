import React, { FC } from 'react';
import { Preloader } from 'juicyfront';

interface IProps {
  loader: boolean;
  error?: string;
}

const PagePreloader: FC<IProps> = ({ loader, children, error }) => {
  if (error) {
    return <>{error}</>;
  }
  return <>{!error && loader ? <Preloader /> : children}</>;
};

export default PagePreloader;
