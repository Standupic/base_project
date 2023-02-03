import { Center } from '../styledComponents';
import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import SomethingWrong from '../common/SomethingWrong';
import { Text } from './styledComponents';

const ErrorBoundaryFallBack = ( props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;
  return (
    <Center centerChildren>
      <SomethingWrong
        heading={'Что то не так!'}
        text={
          <>
            <Text>Попробуйте позже или обратитесь в службу поддержки.</Text>
            <a href='#' onClick={resetErrorBoundary}>Перезагрузить приложения.</a>
          </>
        }/>
    </Center>
  );
};

export default ErrorBoundaryFallBack;
