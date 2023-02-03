import styled from 'styled-components';
import StickyButton from "../StickyButton";

interface IText {
  size?: string;
  fontWeight?: string;
  fontStyle?: string;
  color?: string;
  align?: string;
  isActive?: boolean;
  disable?: boolean;
}

const Text = styled.p`
  font-size: ${(props: IText) => (props.size ? props.size : '1rem')};
  color: ${(props: IText) => props.color && props.color};
  font-weight: ${(props: IText) => (props.fontWeight ? props.fontWeight : 'normal')};
  line-height: 20px;
  text-align: ${(props: IText) => (props.align ? props.align : 'left')};
`;

export default Text;
