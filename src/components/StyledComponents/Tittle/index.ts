import styled from 'styled-components';

import { IStyles } from '../constants';

interface IPropsTittle extends IStyles {
  color?: string;
  size?: string;
  weight?: string;
}

export const Tittle = styled.div`
  font-weight: ${(props: IPropsTittle) => (props.weight ? props.weight : '400')};
  font-size: ${(props: IPropsTittle) => (props.size ? props.size : '1rem')};
  line-height: 24px;
  color: ${(props: IPropsTittle) => (props.color ? props.color : 'black')};
`;

export default Tittle;
