import styled from 'styled-components';

export const Text = styled.p`
  font-size: 16px;
  color: #74777f;
  max-width: 280px;
  text-align: center;
  inline-size: ${(props: { isError: boolean }) => (props.isError ? 'auto' : '220px')};
`;
