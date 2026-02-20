import { Spinner } from '@alfalab/core-components/spinner';
import { useTimeout } from '../hooks/useTimeout';
import { LS, LSKeys } from '../ls';
import { thxSt } from './style.css';

const LINK_FIRST_GO =
  'alfabank://sdui_screen?screenName=InvestmentLongread&fromCurrent=true&shouldUseBottomSafeArea=true&endpoint=v1/invest-main-screen-view/investment-longread/98955%3flocation=AM%26campaignCode=GH';
const LINK_NEXT_GO = 'alfabank://investments';

export const ThxLayout = () => {
  useTimeout(() => {
    const link = LS.getItem(LSKeys.ShowThx, false) ? LINK_NEXT_GO : LINK_FIRST_GO;
    LS.setItem(LSKeys.ShowThx, true);
    window.location.replace(link);
  }, 2500);
  return (
    <>
      <div className={thxSt.container}>
        <Spinner style={{ margin: 'auto', color: '#fff' }} visible preset={48} />
      </div>
    </>
  );
};
