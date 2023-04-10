import React, { FC, ReactNode } from 'react';
import { StyledComponent } from 'styled-components';
import { ReactComponent as PermissionSVG } from '../../assets/images/permission.svg';
import { Cover, Center, Box, Stack, Heading } from '../styledComponents';

interface ISomethingWrongProps {
  heading?: string;
  text?: ReactNode | StyledComponent<any, any, any>;
  svg?: ReactNode;
  minHeight?: string;
}

const SomethingWrong: FC<ISomethingWrongProps> = ({
  minHeight,
  heading,
  text,
  svg = <PermissionSVG />,
}) => {
  return (
    <Cover heightTop="0px" minHeight={minHeight}>
      <Center as={Stack} gutter={'lg'} centerChildren centerText>
        <Box>{svg}</Box>
        <Stack gutter={'sm'}>
          {heading && (
            <Heading level={'h5'} size={'20px'}>
              {heading}
            </Heading>
          )}
          {text && text}
        </Stack>
      </Center>
    </Cover>
  );
};

export default SomethingWrong;
