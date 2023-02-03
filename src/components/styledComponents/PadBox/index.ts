import styled from 'styled-components';
import { spacingMap, KEY_SPACING } from '../constants';

interface IPropsPadBox {
  padding: KEY_SPACING[];
}

const PadBox = styled.div`
  padding: ${(props: IPropsPadBox) => {
    const arr: KEY_SPACING[] = [] as [];
    return arr
      .concat(props.padding)
      .map((padKey) => spacingMap[padKey])
      .join(' ');
  }};
`;

export default PadBox;
