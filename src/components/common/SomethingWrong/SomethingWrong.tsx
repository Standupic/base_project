import React, { FC, ReactNode } from 'react';
import { ReactComponent as PermissionSVG } from '../../../assets/images/permission.svg';
import {
  Cover, Center, Box, Stack, Heading
} from '../../styledComponents';
import { StyledComponent } from 'styled-components';

interface ISomethingWrongProps {
  heading?: string;
  text?: ReactNode | StyledComponent<any, any, any>;
  svg?: ReactNode;
}

const SomethingWrong: FC<ISomethingWrongProps> = ({ heading, text, svg = <PermissionSVG /> }) => {
  return (
    <Cover heightTop='236px'>
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
