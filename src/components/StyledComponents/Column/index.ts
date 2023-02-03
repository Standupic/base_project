import styled from 'styled-components';

interface IColumn {
  span?: number;
}

const Column = styled.div`
  grid-column: span ${(props: IColumn) => props.span ?? 1};
`;

export default Column;
