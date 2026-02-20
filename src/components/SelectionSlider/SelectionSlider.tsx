import { Typography } from '@alfalab/core-components/typography/cssm';
import { sliderSt } from './style.css';

export const SelectionSlider = () => {
  return (
    <div className={sliderSt.root}>
      <div className={sliderSt.track}>
        <div className={sliderSt.dangerZone} />
        <div className={sliderSt.thumb} />

        <div className={sliderSt.dangerZoneLabel}>
          <Typography.Text tag="p" defaultMargins={false} view="primary-small" color="accent">
            -1
          </Typography.Text>
          <Typography.Text tag="p" defaultMargins={false} view="secondary-large" color="secondary-inverted">
            лимит просадки
          </Typography.Text>
        </div>
        <div className={sliderSt.thumbLabel}>
          <Typography.Text tag="p" defaultMargins={false} view="primary-small" color="primary-inverted">
            0%
          </Typography.Text>
          <Typography.Text tag="p" defaultMargins={false} view="secondary-large" color="secondary-inverted">
            старт
          </Typography.Text>
        </div>
        <div className={sliderSt.positiveZoneLabel}>
          <Typography.Text tag="p" defaultMargins={false} view="primary-small" color="positive">
            +2%
          </Typography.Text>
          <Typography.Text tag="p" defaultMargins={false} view="secondary-large" color="secondary-inverted">
            цель
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};
