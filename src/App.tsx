import React, { Suspense } from 'react';
import { Preloader } from 'juicyfront';
import { Route, Switch } from 'react-router-dom';
import useAuthorization from './hooks/useAuthorization';
import useSuccessRunApp from './hooks/useSuccessRunApp';
import './index.scss';
import EntryPoint from './components/EntryPoint/EntryPoint';
import ModalStatusApplication from './components/ModalStatusApplication/ModalStatusApplication';
import { Box, Stack } from './components/styledComponents';
import AccessibleSection from './components/AccessibleSection';
import NavigationTabs from './components/NavigationTab';
import ErrorBoundaryHandler from './components/ErrorBoundaryHandler';

const CreateApplication = React.lazy(() => import('./pages/CreateApplication'));
const ViewApplication = React.lazy(() => import('./pages/ViewApplication'));
const ListApplications = React.lazy(() => import('./pages/ListApplications'));


export enum IRoutes {
    createApplication = '/createApplication',
    listApplications = '/listApplications',
    viewApplication = '/viewApplications',
}


const App = () => {
  useSuccessRunApp();
  useAuthorization();
  return (
    <>
      <Box width={'880px'}>
        <ErrorBoundaryHandler>
          <EntryPoint>
            <Stack>
              <AccessibleSection blackList={[IRoutes.viewApplication]}>
                <Box>
                  <NavigationTabs/>
                </Box>
              </AccessibleSection>
            </Stack>
            <Switch>
              <Suspense fallback={<Preloader/>}>
                <Route path={IRoutes.createApplication} component={CreateApplication}/>
                <Route path={IRoutes.listApplications} component={ListApplications}/>
                <Route path={IRoutes.viewApplication} component={ViewApplication}/>
              </Suspense>
            </Switch>
            <ModalStatusApplication/>
          </EntryPoint>
        </ErrorBoundaryHandler>
      </Box>
    </>
  );
};

export default App;
