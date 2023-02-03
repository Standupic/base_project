import styled from 'styled-components';
import { PadBox } from '../../styledComponents';

export const Card = styled(PadBox as any).attrs(() => ({
  as: 'div',
  padding: ['lg'],
}))`
  width: 100%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 2px 6px 0px #193b6826;
`;

export default Card;
