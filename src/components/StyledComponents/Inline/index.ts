import styled, { css } from 'styled-components';
import InlineCluster from '../InlineCluster';
import { STRETCH_KEY, stretchMap } from '../constants';

interface InlineProps extends IResponsive {
  stretch: STRETCH_KEY | number;
  index?: number;
  height?: string;
  position?: string;
}

const responsive = css`
  --switchAt: ${(props: IResponsive) => props.width};
  flex-wrap: wrap;
  & > * {
    min-width: fit-content;
    flex-basis: calc((var(--switchAt) - (100% - var(--gutter))) * 999);
  }
`;

const Inline = styled(InlineCluster as any)`
  flex-wrap: nowrap;
  ${(props: InlineProps) => {
    if (typeof props.stretch === 'number') {
      return `> :nth-child(${props.stretch + 1}) { flex: 1 }`;
    }
    return stretchMap[props.stretch] ?? '';
  }}
  height: ${(props: InlineProps) => props.height && props.height};
  ${(props: InlineProps) => props.width && responsive};
  position: ${(props: InlineProps) => props.position && props.position};
`;

interface IResponsive {
  width: string;
}

export default Inline;
