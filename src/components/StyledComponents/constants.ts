type TypeSpacingMap = Record<KEY_SPACING, string>;

export type KEY_SPACING = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const spacingMap: TypeSpacingMap = {
  ['0']: '0',
  xs: '0.250rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '2rem',
  xxl: '2.5rem',
};

export type KEY_FRACTION = '1/4' | '1/3' | '1/2' | '2/3' | '3/4' | 'auto-start' | 'auto-end';

export type TypeFractionsMap = Record<KEY_FRACTION, string>;

export const fractions: TypeFractionsMap = {
  '1/4': '1fr 3fr',
  '1/3': '1fr 2fr',
  '1/2': '1fr 1fr',
  '2/3': '2fr 1fr',
  '3/4': '3fr 1fr',
  'auto-start': 'auto 1fr',
  'auto-end': '1fr auto',
};

export type KEY_JUSTIFYING = 'start' | 'end' | 'center';

type JUSTIFY_VALUE = 'flex-start' | 'flex-end' | 'center';

export type TypeJustifyMap = Record<KEY_JUSTIFYING, JUSTIFY_VALUE>;

export const justifyAlignMap: TypeJustifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
};

export type WRAP_VALUE = 'wrap' | 'nowrap';

export interface IStyles {
  gutter?: KEY_SPACING;
  padding?: KEY_SPACING[];
}

export type STRETCH_KEY = 'all' | 'start' | 'end';

export const stretchMap: Record<STRETCH_KEY, string> = {
  all: `> *  { flex: 1 }`,
  start: `> :first-child { flex: 1 }`,
  end: `> :last-child { flex: 1 }`,
};
