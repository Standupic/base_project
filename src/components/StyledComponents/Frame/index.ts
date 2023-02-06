import styled, {css} from 'styled-components';
import {IStyles} from "../constants";

const ratioStyles = css`
  aspect-ratio: var(--n) / var(--d);
  @supports not (aspect-ratio: 1/1) {
    padding-block-end: calc(var(--d) / var(--n) * 100%);
  }
`;

interface IProps extends IStyles {
    ratio?: number[];
}

const Frame = styled.div`
  --n: ${(props: IProps) => (props.ratio ? props.ratio[0] : 1)};
  --d: ${(props: IProps) => (props.ratio ? props.ratio[1] : 1)};

  ${(props: IProps) => props.ratio && ratioStyles}

  position: relative;

  > * {
    position: absolute;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > img,
  > video {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`;

export default Frame;
