import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router';
import { IRoutes } from '../../App';

interface IProps {
  blackList: IRoutes[];
}

const AccessibleSection: FC<IProps> = ({ blackList, children }) => {
  const location = useLocation();
  const match = matchPath(location.pathname, {
    path: blackList,
  });
  if (match?.isExact) {
    return null;
  }
  return <>{children}</>;
};

export default AccessibleSection;
