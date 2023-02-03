import { Tabs } from 'juicyfront';
import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box } from '../styledComponents';

const NavigationTabs = () => {
  const history = useHistory();
  const location = useLocation();
  const data = useMemo(() => {
    return [
      {
        label: 'Создание заявки',
        handler: () => {
          if (location.pathname !== '/') {
            history.push('/');
          }
        },
        active: location.pathname === '/' && true,
      },
      {
        label: 'Мои заявки',
        handler: () => {
          if (location.pathname !== '/listApplications') {
            history.push('/listApplications');
          }
        },
        active: location.pathname === '/listApplications' && true,
      },
    ];
  }, [location.pathname]);
  return (
    <Box>
      <Tabs showMenu={false} list={data} />
    </Box>
  );
};

export default NavigationTabs;
