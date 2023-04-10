import { Modal, Button } from 'juicyfront';
import React, { FC, ReactNode, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as JackdawSuccessSVG } from '../../assets/images/jackdawSuccess.svg';
import { ReactComponent as CrossSVG } from '../../assets/images/cross.svg';
import history from '../../store/history';
import './styles.sass';
import { setStatusApplication, STATUS, STATUS_APPLICATION } from '../../store/globalStateSlice';
import { Center, Stack, Heading } from '../styledComponents';
import { RootState } from '../../store';
import { Text } from './styledComponents';

type PartialStatus = Partial<Record<STATUS, string | ReactNode>>;

const HeadingValues: PartialStatus = {
  [STATUS.Error]: 'Заявка не была исполнена',
  [STATUS.Success]: 'Заявка успешно исполнена',
};

const TextValues: PartialStatus = {
  [STATUS.Error]: 'Произошла техническая проблема.',
  [STATUS.Success]: 'Созданные заявки будут отображаться в раздел «Мои заявки»',
};

const Images: PartialStatus = {
  [STATUS.Error]: <CrossSVG />,
  [STATUS.Success]: <JackdawSuccessSVG />,
};

const ModalCreateApplication: FC = () => {
  const { status } = useSelector((state: RootState) => state.globalState.statusApplication);
  const dispatch = useDispatch();
  const handlerClick = useCallback(() => {
    if (status === STATUS.Success) {
      dispatch(setStatusApplication({ status: STATUS.Success }));
      history.push('/listApplications');
    }
  }, [status]);
  return (
    <>
      {status && (
        <Modal size="s" header onClose={handlerClick}>
          <Center as={Stack} gutter={'lg'} centerChildren>
            {Images[status]}
            <Center as={Stack} centerChildren gutter={'sm'}>
              <Heading size={'18px'} level={'h6'}>
                {HeadingValues[status]}
              </Heading>
              <Text isError={status === STATUS.Error}>{TextValues[status]}</Text>
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
