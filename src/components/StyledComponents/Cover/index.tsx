import React from 'react';
import styled from 'styled-components';
import { KEY_SPACING, spacingMap } from '../constants';

interface IPropsCover {
  gutter?: KEY_SPACING;
  minHeight?: string;
  heightTop?: string;
  heightBottom?: string;
}

const Cover = styled.div`
  --heightTop: ${({ heightTop = '0px' }) => heightTop};
  --heightBottom: ${({ heightBottom = '0px' }) => heightBottom};
  --minHeight: ${({ minHeight = '100vh' }) => minHeight};
  display: grid;
  gap: ${(props: IPropsCover) => (props.gutter ? spacingMap[props.gutter] : spacingMap.lg)};
  min-block-size: calc(100vh - (var(--heightBottom) + var(--heightTop)));
  grid-template-rows: 1fr;
  align-items: center;
`;

export default Cover;
