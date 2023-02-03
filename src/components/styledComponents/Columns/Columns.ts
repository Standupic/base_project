import styled from 'styled-components';
import { KEY_SPACING, spacingMap } from '../constants';

interface IColumns {
  gutter?: KEY_SPACING;
  columns?: number;
}

interface IColumn {
  span?: number;
}

const Columns = styled.div`
  display: grid;
  gap: ${(props: IColumns) => (props.gutter ? spacingMap[props.gutter] : spacingMap.lg)};
  grid-template-columns: repeat(${(props) => props.columns ?? 1}, 1fr);
`;

const Column = styled.div`
  grid-column: span ${(props: IColumn) => props.span ?? 1};
`;
