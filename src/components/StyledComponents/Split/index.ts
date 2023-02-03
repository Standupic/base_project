import styled from 'styled-components';
import { fractions, spacingMap, KEY_SPACING, KEY_FRACTION } from '../constants';

interface IPropsSplit {
  gutter?: KEY_SPACING;
  fraction?: KEY_FRACTION;
}

const Split = styled.div`
  display: grid;
  gap: ${(props: IPropsSplit) => (props.gutter ? spacingMap[props.gutter] : spacingMap.lg)};
  grid-template-columns: ${(props: IPropsSplit) =>
    props.fraction ? fractions[props.fraction] : fractions['1/2']};
`;

export default Split;
