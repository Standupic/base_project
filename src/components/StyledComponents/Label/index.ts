import styled from 'styled-components';
import { IStyles } from '../constants';

interface IProps extends IStyles {
  color?: string;
  size?: string;
}

const Label = styled.div`
  font-weight: 400;
  font-size: ${(props: IProps) => (props.size ? props.size : '.8rem')};
  line-height: 24px;
  color: ${(props: IProps) => (props.color ? props.color : '#74777F')};
`;

export default Label;
