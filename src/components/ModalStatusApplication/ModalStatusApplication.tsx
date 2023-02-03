import { Modal, Button } from 'juicyfront';
import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as JackdawSuccessSVG } from '../../assets/images/jackdawSuccess.svg';
import { ReactComponent as CrossSVG } from '../../assets/images/cross.svg';
import history from '../../store/history';
import './styles.sass';
import { setStatusApplication, STATUS_APPLICATION } from '../../store/globalStateSlice';
import {
  Center, Stack, Heading
} from '../styledComponents';
import { RootState } from '../../store';
import { Text } from './styledComponents';

const HeadingValues = {
  [STATUS_APPLICATION.Error]: 'Заявка не была исполнена',
  [STATUS_APPLICATION.Success]: 'Заявка успешно исполнена',
};

const TextValues = {
  [STATUS_APPLICATION.Error]: 'Произошла техническая проблема.',
  [STATUS_APPLICATION.Success]: 'Созданные заявки будут отображаться в раздел «Мои заявки»',
};

const Images = {
  [STATUS_APPLICATION.Error]: <CrossSVG />,
  [STATUS_APPLICATION.Success]: <JackdawSuccessSVG />,
};

const ModalCreateApplication: FC = () => {
  const statusApplication = useSelector((state: RootState) => state.globalState.statusApplication);
  const dispatch = useDispatch();
  const handlerClick = useCallback(() => {
    if (statusApplication === STATUS_APPLICATION.Success) {
      dispatch(setStatusApplication(undefined));
      history.push('/listApplications');
    }

    dispatch(setStatusApplication(undefined));
  }, [statusApplication]);
  return (
    <>
      {statusApplication && (
        <Modal size='s' header onClose={handlerClick}>
          <Center as={Stack} gutter={'lg'} centerChildren>
            {Images[statusApplication]}
            <Center as={Stack} centerChildren gutter={'sm'}>
              <Heading size={'18px'} level={'h6'}>
                {HeadingValues[statusApplication]}
              </Heading>
              <Text isError={statusApplication === STATUS_APPLICATION.Error}>
                {TextValues[statusApplication]}
              </Text>
            </Center>
            <Button fullWidth onClick={handlerClick}>
              Продолжить
            </Button>
          </Center>
        </Modal>
      )}
    </>
  );
};

export default ModalCreateApplication;
