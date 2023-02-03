import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

interface IPropsHeading extends HTMLAttributes<HTMLHeadingElement> {
  level?: keyof JSX.IntrinsicElements;
  size?: string;
}

const StyledHeading = styled.h1`
  font-style: normal;
  font-size: ${(props: { size?: string }) => (props.size ? `${props.size}` : '32px')};
  color: ${(props: { color?: string }) => (props.color ? `${props.color}` : 'black')};
`;

const Heading: FC<IPropsHeading> = ({ level, ...rest }) => {
  return (
    <>
      <StyledHeading {...rest} as={level} />
    </>
  );
};

export default Heading;
