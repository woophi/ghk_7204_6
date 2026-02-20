import { style } from '@vanilla-extract/css';

const root = style({
  width: '100%',
  height: '52px',
});

const track = style({
  position: 'relative',
  width: '100%',
  height: '8px',
  borderRadius: '100px',
  backgroundColor: '#0CC44D',
});

const dangerZone = style({
  position: 'absolute',
  top: 0,
  left: '0',
  width: '50%',
  height: '8px',
  borderRadius: '100px',
  backgroundColor: '#EF3124',
});
const dangerZoneLabel = style({
  position: 'absolute',
  top: '16px',
  left: '0',
});
const positiveZoneLabel = style({
  position: 'absolute',
  top: '16px',
  right: '0',
  textAlign: 'right',
});

const thumb = style({
  position: 'absolute',
  top: '-2px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: '#FFFFFF',
});
const thumbLabel = style({
  position: 'absolute',
  top: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  textAlign: 'center',
});

export const sliderSt = {
  root,
  track,
  dangerZone,
  thumb,
  thumbLabel,
  dangerZoneLabel,
  positiveZoneLabel,
};
