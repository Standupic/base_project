import styled from 'styled-components';
import { IStyles } from '../constants';

interface IPropsBox extends IStyles {
  width?: string;
}
const Box = styled.div`
  width: ${(props: IPropsBox) => (props.width ? props.width : 'auto')};
`;

export default Box;
