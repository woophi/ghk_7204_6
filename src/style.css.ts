import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const rowSb = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
});

const glass = style({
  display: 'flex',
  padding: '0 1rem 24px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  borderRadius: '1rem',
  textAlign: 'center',
  justifyContent: 'center',
  border: '1px solid #717171',
  backgroundColor: '#2f2f30',
});
const glassBanner = style({
  borderRadius: '1rem',
  border: '1px solid #717171',
  backgroundColor: '#2f2f30',
  padding: '1rem',
});
const glassTabs = style({
  borderRadius: '8px',
  border: '1px solid #717171',
  backgroundColor: '#2f2f30',
  padding: '6px',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
});

const tab = recipe({
  base: {
    borderRadius: '8px',
    height: '32px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    color: '#fff',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: '#fff',
        color: '#030306E0',
      },
    },
  },
});

const glassBanner2 = style([
  glassBanner,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
]);

const glassBanner3 = style([
  glassBanner,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '1rem 1rem 20px',
  },
]);

const dangerBox = style({
  border: '1px solid #FF755E',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '20px',
  borderRadius: '1rem',
  backgroundColor: '#392523',
});

const glassBanner4 = recipe({
  base: [
    glassBanner3,
    {
      border: '1px solid transparent',
      transition: 'all 0.2s ease-in-out',
    },
  ],
  variants: {
    selected: {
      true: {
        border: '1px solid #7A63F1',
        backgroundColor: '#343159',
      },
    },
  },
});

export const appSt = {
  bottomBtn,
  container,
  rowSb,
  glass,
  glassBanner,
  glassTabs,
  tab,
  glassBanner2,
  glassBanner3,
  dangerBox,
  glassBanner4,
};
