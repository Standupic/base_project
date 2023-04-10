import { useSelector } from 'react-redux';
import React, { FC, ReactElement } from 'react';
import { Button } from 'juicyfront';
import { RootState } from '../../store';
import { STATUS } from '../../store/globalStateSlice';
import SomethingWrong from '../SomethingWrong';
import { Text } from '../ErrorBoundaryFallBack/styledComponents';
import { Center } from '../styledComponents';
import { ReactComponent as AsyncErrorSVG } from '../../assets/images/emptyState.svg';

interface IProps {
  children: ReactElement;
}

const AsyncErrorHandler: FC<IProps> = (props) => {
  const { children } = props;
  const { status, errorCode, message } = useSelector(
    (state: RootState) => state.globalState.statusApplication,
  );
  if (status === STATUS.AsyncError) {
    return (
      <Center centerChildren>
        <SomethingWrong
          svg={<AsyncErrorSVG />}
          heading={'Сервер не смог выполнить запрос'}
          text={
            <>
              <Text>Возникла ошибка {errorCode}.</Text>
              <Text>{message}</Text>
              <Text>Попробуйте обновить страницу.</Text>
              <Button onClick={() => window.location.reload()}>Обновить страницу.</Button>
            </>
          }
        />
      </Center>
    );
  }
  return children;
};

export default AsyncErrorHandler;
