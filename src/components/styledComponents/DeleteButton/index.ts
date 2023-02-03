import styled from 'styled-components';
import PadBox from '../PadBox';

export const DeleteButton = styled(PadBox as any).attrs(() => ({
  as: 'button',
  padding: ['sm'],
}))`
  background: #ffefef;
  border-radius: 8px;
`;

export default DeleteButton;
