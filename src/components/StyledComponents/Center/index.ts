import styled from 'styled-components';
import { KEY_SPACING } from '../constants';

interface IPropsCenter {
  maxWidth?: string;
  centerText?: boolean;
  centerChildren?: boolean;
  gutter?: KEY_SPACING;
}

const Center = styled.div`
  box-sizing: content-box;
  margin-inline-start: auto;
  margin-inline-end: auto;
  position: relative;

  max-inline-size: ${(props: IPropsCenter) => props.maxWidth && props.maxWidth};

  ${(props: IPropsCenter) => props.centerText && 'text-align: center;'}
  ${(props: IPropsCenter) =>
    props.centerChildren &&
    `
  display: flex;
  flex-direction: column;
  align-items: center;
  `}
`;

export default Center;
