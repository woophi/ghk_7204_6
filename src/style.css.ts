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
  padding: '20px 1rem 0px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  borderRadius: '1rem',
  textAlign: 'center',
  justifyContent: 'center',
  backgroundColor: '#F2F3F5',
});
const banner = style({
  borderRadius: '24px',
  backgroundColor: '#F2F3F5',
  padding: '1rem',
});
const calcBanner = recipe({
  base: {
    borderRadius: '24px',
    backgroundColor: '#F2F3F5',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#7F7F83',
    transition: 'background-color 0.3s ease-in-out',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: '#DFF8E5',
      },
    },
  },
});

const compareTable = style({
  borderRadius: '24px',
  border: '1px solid #F2F3F5',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

const btmContent = style({
  padding: 0,
});

const swSlide = style({
  width: 'min-content',
});

export const appSt = {
  bottomBtn,
  container,
  rowSb,
  glass,
  banner,
  calcBanner,
  compareTable,
  btmContent,
  swSlide,
};
