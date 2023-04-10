import { useSelector } from 'react-redux';
import React, { ComponentType, FC, ReactElement, useMemo } from 'react';
import { RootState } from '../../store';
import { ACCESS } from '../../store/globalStateSlice';
import { Center } from '../styledComponents';
import SomethingWrong from '../SomethingWrong';
import { ReactComponent as HaveNotRightSVG } from '../../assets/images/haveNotRight.svg';
import { Text } from '../ErrorBoundaryFallBack/styledComponents';

interface IProps {
  children: ReactElement;
}

const AccessAppHandler: FC<IProps> = (props) => {
  const { children } = props;
  const { message, access } = useSelector(
    (state: RootState) => state.globalState.accessApplication,
  );
  const SVG: Partial<Record<ACCESS, ComponentType>> = {
    [ACCESS.NoRight]: HaveNotRightSVG,
  };

  const ActiveSVG = useMemo(() => {
    return SVG[access];
  }, [access]);

  if (access !== ACCESS.Ok) {
    return (
      <Center centerChildren>
        <SomethingWrong
          svg={<ActiveSVG />}
          heading={ACCESS.NoRight}
          text={
            <>
              <Text>{message}</Text>
            </>
          }
        />
      </Center>
    );
  }
  return children;
};
export default AccessAppHandler;
