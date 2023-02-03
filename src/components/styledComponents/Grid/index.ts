import styled from 'styled-components';
import { KEY_SPACING, spacingMap } from '../constants';

interface IGridProps {
  gutter?: KEY_SPACING;
  minItemWidth?: string;
}

const Grid = styled.div`
  display: grid;
  gap: ${(props: IGridProps) => (props.gutter ? spacingMap[props.gutter] : spacingMap.lg)};
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
`;

export default Grid;
