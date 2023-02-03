import React, { FC } from 'react';
import { Notification, Preloader } from 'juicyfront';
import { useSelector } from 'react-redux';
import { Center } from '../styledComponents';
import { RootState } from '../../store';

const EntryPoint: FC = ({ children }) => {
  const { loading, error } = useSelector((state: RootState) => state.user);
  if (error) {
    const errors = error.map((item: string, index: number) => {
      /**  We do not collaborate with a notification so use a key=index */
      return <Notification key={index} item={{ variant: 'red', title: 'Ошибка', message: item }} />
    });
    return <Center centerChildren>{errors}</Center>;
  }
  return <>{!error && loading ? <Preloader /> : children}</>;
};

export default EntryPoint;
