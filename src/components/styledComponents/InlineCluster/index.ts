import styled from 'styled-components';
import { spacingMap, KEY_SPACING, justifyAlignMap, KEY_JUSTIFYING, WRAP_VALUE } from '../constants';

interface IPropsInlineCluster {
  gutter?: KEY_SPACING;
  justify?: KEY_JUSTIFYING;
  align?: KEY_JUSTIFYING;
  wrap?: WRAP_VALUE;
}

const InlineCluster = styled.div`
  --gutter: ${(props: IPropsInlineCluster) =>
    props.gutter ? spacingMap[props.gutter] : spacingMap.lg};
  display: flex;
  flex-wrap: ${(props: IPropsInlineCluster) => (props.wrap ? props.wrap : 'nowrap')};
  gap: var(--gutter);
  justify-content: ${(props: IPropsInlineCluster) =>
    props.justify ? justifyAlignMap[props.justify] : justifyAlignMap.start};
  align-items: ${(props: IPropsInlineCluster) =>
    props.align ? justifyAlignMap[props.align] : justifyAlignMap.start}; ;
`;

export default InlineCluster;
