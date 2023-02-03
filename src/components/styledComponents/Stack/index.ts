import styled from 'styled-components';
import { spacingMap, KEY_SPACING, IStyles } from '../constants';

type IPropsStack = IStyles;

const Stack = styled.div`
  display: grid;
  gap: ${(props: IPropsStack) =>
    props.gutter ? spacingMap[props.gutter] : spacingMap['lg']};
`;

export default Stack;
