import styled from 'styled-components';
import PadBox from '../PadBox';

export const StickyButton = styled(PadBox as any).attrs(() => ({
  as: 'div',
  padding: ['sm'],
}))`
  background: white;
  position: sticky;
  left: 0px;
  bottom: 0px;
  width: fit-content;
  border-radius: 8px;
`;

export default StickyButton;
