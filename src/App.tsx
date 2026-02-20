import { Button } from '@alfalab/core-components/button/cssm';
import { Collapse } from '@alfalab/core-components/collapse/cssm';
import { Gap } from '@alfalab/core-components/gap/cssm';
import { List } from '@alfalab/core-components/list/cssm';
import { PureCell } from '@alfalab/core-components/pure-cell/cssm';
import { Radio } from '@alfalab/core-components/radio/cssm';
import { Status } from '@alfalab/core-components/status/cssm';
import { Typography } from '@alfalab/core-components/typography/cssm';
import { CategoryCommisionMIcon } from '@alfalab/icons-glyph/CategoryCommisionMIcon';
import { CheckmarkCompactMIcon } from '@alfalab/icons-glyph/CheckmarkCompactMIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronUpMIcon } from '@alfalab/icons-glyph/ChevronUpMIcon';
import { CrossCompactMIcon } from '@alfalab/icons-glyph/CrossCompactMIcon';
import { useEffect, useState } from 'react';
import hb from './assets/hb.png';
import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
import { SelectionSlider } from './components/SelectionSlider';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';

const forWhom = [
  {
    title: 'Опытным трейдерам',
    subtitle: 'Хочешь торговать крупнее без рисков',
    img: img1,
  },
  {
    title: 'Уверенным новичкам',
    subtitle: 'Готов проверить себя в профессиональных условиях',
    img: img2,
  },
  {
    title: 'Тем, кто ищет альтернативу',
    subtitle: 'Устал от давления собственных денег и нестабильной торговли',
    img: img3,
  },
];

const faqs = [
  {
    question: 'Как и когда я получу выплату?',
    answers: [
      'После успешного прохождения Challenge вы получаете Funded-аккаунт. Прибыль, заработанная на нём, выплачивается по итогам торгового периода. Вы подаёте запрос на вывод в личном кабинете, и средства поступают на вашу карту или банковский счёт в течение 14 дней. Все условия выплат зафиксированы в договоре-оферте.',
    ],
  },
  {
    question: 'Сколько я могу заработать?',
    answers: [
      'Вы получаете до 70% прибыли (до 90% на старших тарифах), заработанной на Funded-аккаунте. Например, на счёте 100 000 ₽ при достижении +10% прибыли ваш доход составит 7 000 ₽ при вложении всего 2 000 ₽ за участие. На счёте 5 000 000 ₽ при тех же +10% — ваша доля составит 350 000 ₽',
    ],
  },
  {
    question: 'Есть ли скрытые комиссии?',
    answers: [
      'Нет. Вы оплачиваете только стоимость участия в Challenge — это фиксированная сумма, указанная в тарифе. При торговле на счёте взимаются только биржевые комиссии (как при обычной торговле). Брокерская комиссия не взимается. Никаких подписок, ежемесячных платежей или дополнительных сборов.',
    ],
  },
  {
    question: 'Что такое Challenge и как он проходит?',
    answers: [
      'Challenge — это оценочный этап, на котором вы торгуете на виртуальном счёте с реальными рыночными котировками. Ваша цель — достичь прибыли +10% от баланса, не превысив максимальную просадку 5%, за минимум 5 торговых дней. Если условия выполнены — вы получаете Funded-аккаунт и начинаете зарабатывать.',
    ],
  },
  {
    question: 'Что будет, если я не пройду Challenge?',
    answers: [
      'Если баланс вашего счёта снизится на 1% и более от стартового — Challenge останавливается. Вы теряете только стоимость участия (от 2 000 ₽), а не весь виртуальный счёт. Вы можете попробовать снова — оплатив повторный Challenge со скидкой. По статистике, 30-40% успешных трейдеров проходят не с первой попытки.',
    ],
  },
  {
    question: 'Рискую ли я своими деньгами?',
    answers: [
      'Нет. Торговля ведётся на виртуальном счёте с реальными котировками. Ваш максимальный риск — это стоимость участия в Challenge (от 2 000 ₽). Вы не можете потерять больше этой суммы. В отличие от торговли на собственном счёте, где убытки не ограничены.',
    ],
  },
  {
    question: 'Почему нельзя совершать сделки короче 1 минуты?',
    answers: [
      'Это ограничение защищает от манипулятивных стратегий (арбитраж задержек, эксплуатация спредов на новостях), которые не работают в реальной торговле. Мы оцениваем навык устойчивой прибыльной торговли, а не умение использовать технические уязвимости. Все крупные проп-компании имеют аналогичное ограничение.',
    ],
  },
];

const YOUR_PART = 90;
const SUM_HUNDLE = 5_000_000;

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [collapsedItems, setCollapsedItem] = useState<string[]>(['special']);
  const [selectedTab, setSelectedTab] = useState('5%');
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [steps, setSteps] = useState<'init' | 'tariff'>('init');
  const [selectedTariff, setSelectedTariff] = useState<string>('');

  const income = ((selectedTab.replace('%', '') as unknown as number) / 100) * SUM_HUNDLE;
  const netIncome = income * (YOUR_PART / 100);

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const submit = () => {
    window.gtag('event', '7204_tariff_select', { var: 'var4' });
    setLoading(true);

    sendDataToGA({ tariff_name: selectedTariff }).then(() => {
      setLoading(false);
      setThx(true);
    });
  };

  const onTabClick = (tab: string) => {
    window.gtag('event', '7204_calc_click', { var: 'var4' });
    setSelectedTab(tab);
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  if (steps === 'tariff') {
    return (
      <>
        <div className={appSt.container}>
          <Typography.TitleResponsive
            style={{ marginTop: '12px' }}
            tag="h1"
            view="large"
            font="system"
            weight="medium"
            color="primary-inverted"
          >
            Выберите тариф
          </Typography.TitleResponsive>
          <div
            className={appSt.glassBanner4({ selected: selectedTariff === 'Trader' })}
            onClick={() => setSelectedTariff('Trader')}
          >
            <div className={appSt.rowSb}>
              <Typography.Text view="primary-small" color="primary-inverted" weight="medium">
                Trader
              </Typography.Text>
              <Radio checked={selectedTariff === 'Trader'} onChange={() => setSelectedTariff('Trader')} />
            </div>

            <div>
              <Typography.Text tag="p" defaultMargins={false} view="secondary-large" color="secondary-inverted">
                Счёт Challenge:
              </Typography.Text>

              <Typography.TitleResponsive tag="h2" view="small" font="system" weight="medium" color="primary-inverted">
                100 000 ₽
              </Typography.TitleResponsive>
            </div>

            <div>
              <Gap size={8} />

              <div className={appSt.rowSb}>
                <Typography.Text view="secondary-large" color="secondary-inverted">
                  Участие в отборе
                </Typography.Text>
                <Typography.Text view="primary-small" color="primary-inverted">
                  2 000 ₽
                </Typography.Text>
              </div>
              <Gap size={4} />
              <div className={appSt.rowSb}>
                <Typography.Text view="secondary-large" color="secondary-inverted">
                  Доплата после отбора
                </Typography.Text>
                <Typography.Text view="primary-small" color="primary-inverted">
                  Не требуется
                </Typography.Text>
              </div>
              <Gap size={4} />
              <div className={appSt.rowSb}>
                <Typography.Text view="secondary-large" color="secondary-inverted">
                  Доля результата
                </Typography.Text>
                <Typography.Text view="primary-small" color="primary-inverted">
                  70%
                </Typography.Text>
              </div>
            </div>
          </div>

          <div
            className={appSt.glassBanner4({ selected: selectedTariff === 'Pro Trader' })}
            onClick={() => setSelectedTariff('Pro Trader')}
          >
            <div className={appSt.rowSb}>
              <Typography.Text view="primary-small" color="primary-inverted" weight="medium">
                Pro Trader
              </Typography.Text>
              <Radio checked={selectedTariff === 'Pro Trader'} onChange={() => setSelectedTariff('Pro Trader')} />
            </div>

            <div>
              <Typography.Text tag="p" defaultMargins={false} view="secondary-large" color="secondary-inverted">
                Счёт Challenge:
              </Typography.Text>

              <Typography.TitleResponsive tag="h2" view="small" font="system" weight="medium" color="primary-inverted">
                1 000 000 ₽
              </Typography.TitleResponsive>
            </div>

            <div>
              <Gap size={8} />

              <div className={appSt.rowSb}>
                <Typography.Text view="secondary-large" color="secondary-inverted">
                  Участие в отборе
                </Typography.Text>
                <Typography.Text view="primary-small" color="primary-inverted">
                  2 000 ₽
                </Typography.Text>
              </div>
              <Gap size={4} />
              <div className={appSt.rowSb}>
                <Typography.Text view="secondary-large" color="secondary-inverted">
                  Доплата после отбора
                </Typography.Text>
                <Typography.Text view="primary-small" color="primary-inverted">
                  18 000 ₽
                </Typography.Text>
              </div>
              <Gap size={4} />
              <div className={appSt.rowSb}>
                <Typography.Text view="secondary-large" color="secondary-inverted">
                  Доля результата
                </Typography.Text>
                <Typography.Text view="primary-small" color="primary-inverted">
                  80%
                </Typography.Text>
              </div>
            </div>
          </div>
          <div
            className={appSt.glassBanner4({ selected: selectedTariff === 'Alfa Trader' })}
            onClick={() => setSelectedTariff('Alfa Trader')}
          >
            <div className={appSt.rowSb}>
              <Typography.Text view="primary-small" color="primary-inverted" weight="medium">
                Alfa Trader
              </Typography.Text>
              <Radio checked={selectedTariff === 'Alfa Trader'} onChange={() => setSelectedTariff('Alfa Trader')} />
            </div>

            <div>
              <Typography.Text tag="p" defaultMargins={false} view="secondary-large" color="secondary-inverted">
                Счёт Challenge:
              </Typography.Text>

              <Typography.TitleResponsive tag="h2" view="small" font="system" weight="medium" color="primary-inverted">
                5 000 000 ₽
              </Typography.TitleResponsive>
            </div>

            <div>
              <Gap size={8} />

              <div className={appSt.rowSb}>
                <Typography.Text view="secondary-large" color="secondary-inverted">
                  Участие в отборе
                </Typography.Text>
                <Typography.Text view="primary-small" color="primary-inverted">
                  2 000 ₽
                </Typography.Text>
              </div>
              <Gap size={4} />
              <div className={appSt.rowSb}>
                <Typography.Text view="secondary-large" color="secondary-inverted">
                  Доплата после отбора
                </Typography.Text>
                <Typography.Text view="primary-small" color="primary-inverted">
                  98 000 ₽
                </Typography.Text>
              </div>
              <Gap size={4} />
              <div className={appSt.rowSb}>
                <Typography.Text view="secondary-large" color="secondary-inverted">
                  Доля результата
                </Typography.Text>
                <Typography.Text view="primary-small" color="primary-inverted">
                  90%
                </Typography.Text>
              </div>
            </div>
          </div>

          <Typography.Text view="secondary-large" color="secondary-inverted">
            Тариф можно сменить после прохождения этапа отбора
          </Typography.Text>
        </div>

        <Gap size={96} />

        <div className={appSt.bottomBtn}>
          <Button
            style={{ backgroundColor: '#F2F3F5', color: '#030306E0' }}
            loading={loading}
            block
            view="primary"
            onClick={submit}
            disabled={!selectedTariff}
          >
            Выбрать
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.glass}>
          <img src={hb} width="100%" height={156} alt="hb" style={{ objectFit: 'contain', margin: '0 auto' }} />
          <Typography.TitleResponsive
            style={{ maxWidth: '235px' }}
            tag="h1"
            view="large"
            font="system"
            weight="medium"
            color="primary-inverted"
          >
            Получите счёт до 5 000 000 ₽
          </Typography.TitleResponsive>
          <Typography.Text view="primary-small" color="primary-inverted">
            Начните с этапа отбора
            <br /> на счёте 100 000 ₽ — участие <b>2 000 ₽</b>
          </Typography.Text>
        </div>

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary-inverted"
        >
          Как проходит отбор
        </Typography.TitleResponsive>

        <Typography.Text view="primary-small" color="secondary-inverted">
          Отбор проходит на счёте 100 000 ₽ для всех участников.
        </Typography.Text>
        <Typography.Text view="primary-small" color="secondary-inverted">
          Необходимо показать <span style={{ color: '#0CC44D' }}>+2%</span> прибыли, не превышая просадку{' '}
          <span style={{ color: '#EF3124' }}>−1%</span> в течение одной недели
        </Typography.Text>

        <SelectionSlider />

        <Typography.Text view="primary-small" color="secondary-inverted">
          Если отбор не пройден, можно повторить участие за 2 000 ₽
        </Typography.Text>

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary-inverted"
        >
          После успешного прохождения
        </Typography.TitleResponsive>

        <Typography.Text view="primary-small" color="secondary-inverted">
          После успешного отбора вы можете увеличить размер счёта до 5 000 000 ₽ при доплате
        </Typography.Text>

        <PureCell className={appSt.glassBanner}>
          <PureCell.Graphics verticalAlign="top">
            <CategoryCommisionMIcon color="#fff" />
          </PureCell.Graphics>
          <PureCell.Content>
            <PureCell.Main>
              <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="medium" color="primary-inverted">
                До 90% прибыли
              </Typography.TitleResponsive>
              <Gap size={8} />
              <Typography.Text view="primary-small" color="secondary-inverted">
                Ваша доля от профита составляет до 90%. Выплаты производятся регулярно по итогам периода
              </Typography.Text>
            </PureCell.Main>
          </PureCell.Content>
        </PureCell>

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary-inverted"
        >
          Сколько вы можете заработать
        </Typography.TitleResponsive>

        <div>
          <Typography.Text view="primary-small" color="secondary-inverted">
            Рост портфеля
          </Typography.Text>
          <div className={appSt.glassTabs}>
            <div className={appSt.tab({ selected: selectedTab === '5%' })} onClick={() => onTabClick('5%')}>
              <Typography.Text view="primary-small">5%</Typography.Text>
            </div>
            <div className={appSt.tab({ selected: selectedTab === '10%' })} onClick={() => onTabClick('10%')}>
              <Typography.Text view="primary-small">10%</Typography.Text>
            </div>
            <div className={appSt.tab({ selected: selectedTab === '20%' })} onClick={() => onTabClick('20%')}>
              <Typography.Text view="primary-small">20%</Typography.Text>
            </div>
          </div>
        </div>

        <div className={appSt.glassBanner2}>
          <div>
            <Typography.TitleResponsive tag="h3" view="medium" font="system" weight="medium" color="primary-inverted">
              {netIncome.toLocaleString('ru-RU')} ₽
            </Typography.TitleResponsive>
            <Typography.Text view="primary-small" color="secondary-inverted">
              Ваша чистая прибыль
            </Typography.Text>
          </div>

          <div className={appSt.rowSb} style={{ marginTop: '12px' }}>
            <Typography.Text view="secondary-large" color="secondary-inverted">
              Управляете
            </Typography.Text>
            <Typography.Text view="primary-small" color="primary-inverted">
              {SUM_HUNDLE.toLocaleString('ru-RU')} ₽
            </Typography.Text>
          </div>
          <div className={appSt.rowSb}>
            <Typography.Text view="secondary-large" color="secondary-inverted">
              Ваша доля
            </Typography.Text>
            <Typography.Text view="primary-small" color="primary-inverted">
              {YOUR_PART}%
            </Typography.Text>
          </div>
          <div className={appSt.rowSb}>
            <Typography.Text view="secondary-large" color="secondary-inverted">
              Прибыль портфеля
            </Typography.Text>
            <Typography.Text view="primary-small" color="positive">
              +{income.toLocaleString('ru-RU')} ₽
            </Typography.Text>
          </div>
        </div>

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary-inverted"
        >
          Сравните
        </Typography.TitleResponsive>

        <div className={appSt.glassBanner3}>
          <div className={appSt.rowSb}>
            <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="medium" color="primary-inverted">
              Свой счёт
            </Typography.TitleResponsive>
            <Status view="contrast" color="red" size={20}>
              <Typography.Text view="secondary-small" weight="medium">
                РИСК
              </Typography.Text>
            </Status>
          </div>
          <Typography.Text view="primary-small" color="secondary-inverted">
            Вы рискуете своими 100 000 ₽. В случае убытка — деньги потеряны навсегда
          </Typography.Text>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <CrossCompactMIcon color="#EF3124" />
              <Typography.Text view="primary-small" color="primary-inverted">
                Биржевые и брокерские комиссии
              </Typography.Text>
            </div>
            <Gap size={8} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <CheckmarkCompactMIcon color="#0CC44D" />
              <Typography.Text view="primary-small" color="primary-inverted">
                Можно переносить позиции через ночь
              </Typography.Text>
            </div>
          </div>
        </div>
        <div className={appSt.glassBanner3}>
          <div className={appSt.rowSb}>
            <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="medium" color="primary-inverted">
              Prop-трэйдинг
            </Typography.TitleResponsive>
            <Status view="contrast" color="green" size={20}>
              <Typography.Text view="secondary-small" weight="medium">
                Комфорт
              </Typography.Text>
            </Status>
          </div>
          <Typography.Text view="primary-small" color="secondary-inverted">
            Вы управляете счётом до 5 000 000 ₽. Риск ограничен стоимостью участия
          </Typography.Text>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <CheckmarkCompactMIcon color="#0CC44D" />

              <Typography.Text view="primary-small" color="primary-inverted">
                Только биржевые комиссии
              </Typography.Text>
            </div>
            <Gap size={8} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <CrossCompactMIcon color="#EF3124" />
              <Typography.Text view="primary-small" color="primary-inverted">
                Нельзя переносить позиции через ночь
              </Typography.Text>
            </div>
          </div>
        </div>

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary-inverted"
        >
          Кому подойдёт
        </Typography.TitleResponsive>

        {forWhom.map((item, index) => (
          <PureCell className={appSt.glassBanner} key={index}>
            <PureCell.Graphics verticalAlign="top">
              <img src={item.img} width={48} height={48} alt={item.title} />
            </PureCell.Graphics>
            <PureCell.Content>
              <PureCell.Main>
                <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="medium" color="primary-inverted">
                  {item.title}
                </Typography.TitleResponsive>
                <Typography.Text view="primary-small" color="secondary-inverted">
                  {item.subtitle}
                </Typography.Text>
              </PureCell.Main>
            </PureCell.Content>
          </PureCell>
        ))}

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary-inverted"
        >
          Тарифы
        </Typography.TitleResponsive>

        <div className={appSt.glassBanner3}>
          <Typography.Text view="primary-small" color="primary-inverted" weight="medium">
            Trader
          </Typography.Text>

          <div>
            <Typography.Text tag="p" defaultMargins={false} view="secondary-large" color="secondary-inverted">
              Счёт Challenge:
            </Typography.Text>

            <Typography.TitleResponsive tag="h2" view="small" font="system" weight="medium" color="primary-inverted">
              100 000 ₽
            </Typography.TitleResponsive>
          </div>

          <div style={{ borderTop: '.5px solid #FFFFFF26' }}>
            <Gap size={8} />

            <div className={appSt.rowSb}>
              <Typography.Text view="secondary-large" color="secondary-inverted">
                Участие в отборе
              </Typography.Text>
              <Typography.Text view="primary-small" color="primary-inverted">
                2 000 ₽
              </Typography.Text>
            </div>
            <Gap size={4} />
            <div className={appSt.rowSb}>
              <Typography.Text view="secondary-large" color="secondary-inverted">
                Доплата после отбора
              </Typography.Text>
              <Typography.Text view="primary-small" color="primary-inverted">
                Не требуется
              </Typography.Text>
            </div>
            <Gap size={4} />
            <div className={appSt.rowSb}>
              <Typography.Text view="secondary-large" color="secondary-inverted">
                Доля результата
              </Typography.Text>
              <Typography.Text style={{ color: '#00D5BE' }} view="primary-small" color="primary-inverted">
                70%
              </Typography.Text>
            </div>
          </div>
        </div>

        <div className={appSt.glassBanner3}>
          <div>
            <Status view="contrast" color="teal" size={20}>
              <Typography.Text view="secondary-small" weight="medium" style={{ textTransform: 'uppercase' }}>
                Доступен после успешного отбора
              </Typography.Text>
            </Status>
          </div>
          <Typography.Text view="primary-small" color="primary-inverted" weight="medium">
            Pro Trader
          </Typography.Text>

          <div>
            <Typography.Text tag="p" defaultMargins={false} view="secondary-large" color="secondary-inverted">
              Счёт Challenge:
            </Typography.Text>

            <Typography.TitleResponsive tag="h2" view="small" font="system" weight="medium" color="primary-inverted">
              1 000 000 ₽
            </Typography.TitleResponsive>
          </div>

          <div style={{ borderTop: '.5px solid #FFFFFF26' }}>
            <Gap size={8} />

            <div className={appSt.rowSb}>
              <Typography.Text view="secondary-large" color="secondary-inverted">
                Участие в отборе
              </Typography.Text>
              <Typography.Text view="primary-small" color="primary-inverted">
                2 000 ₽
              </Typography.Text>
            </div>
            <Gap size={4} />
            <div className={appSt.rowSb}>
              <Typography.Text view="secondary-large" color="secondary-inverted">
                Доплата после отбора
              </Typography.Text>
              <Typography.Text view="primary-small" color="primary-inverted">
                18 000 ₽
              </Typography.Text>
            </div>
            <Gap size={4} />
            <div className={appSt.rowSb}>
              <Typography.Text view="secondary-large" color="secondary-inverted">
                Доля результата
              </Typography.Text>
              <Typography.Text style={{ color: '#00D5BE' }} view="primary-small" color="primary-inverted">
                80%
              </Typography.Text>
            </div>
          </div>
        </div>

        <div className={appSt.glassBanner3}>
          <div>
            <Status view="contrast" color="teal" size={20}>
              <Typography.Text view="secondary-small" weight="medium" style={{ textTransform: 'uppercase' }}>
                Доступен после успешного отбора
              </Typography.Text>
            </Status>
          </div>
          <Typography.Text view="primary-small" color="primary-inverted" weight="medium">
            Alfa Trader
          </Typography.Text>

          <div>
            <Typography.Text tag="p" defaultMargins={false} view="secondary-large" color="secondary-inverted">
              Счёт Challenge:
            </Typography.Text>

            <Typography.TitleResponsive tag="h2" view="small" font="system" weight="medium" color="primary-inverted">
              5 000 000 ₽
            </Typography.TitleResponsive>
          </div>

          <div style={{ borderTop: '.5px solid #FFFFFF26' }}>
            <Gap size={8} />

            <div className={appSt.rowSb}>
              <Typography.Text view="secondary-large" color="secondary-inverted">
                Участие в отборе
              </Typography.Text>
              <Typography.Text view="primary-small" color="primary-inverted">
                2 000 ₽
              </Typography.Text>
            </div>
            <Gap size={4} />
            <div className={appSt.rowSb}>
              <Typography.Text view="secondary-large" color="secondary-inverted">
                Доплата после отбора
              </Typography.Text>
              <Typography.Text view="primary-small" color="primary-inverted">
                98 000 ₽
              </Typography.Text>
            </div>
            <Gap size={4} />
            <div className={appSt.rowSb}>
              <Typography.Text view="secondary-large" color="secondary-inverted">
                Доля результата
              </Typography.Text>
              <Typography.Text style={{ color: '#00D5BE' }} view="primary-small" color="primary-inverted">
                90%
              </Typography.Text>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '12px' }}>
          <div
            onClick={() => {
              setCollapsedItem(items =>
                items.includes('special') ? items.filter(item => item !== 'special') : [...items, 'special'],
              );
            }}
            className={appSt.rowSb}
          >
            <Typography.TitleResponsive tag="h2" view="small" font="system" weight="medium" color="primary-inverted">
              Основные правила
            </Typography.TitleResponsive>
            {collapsedItems.includes('special') ? (
              <div style={{ flexShrink: 0 }}>
                <ChevronUpMIcon color="#fff" />
              </div>
            ) : (
              <div style={{ flexShrink: 0 }}>
                <ChevronDownMIcon color="#fff" />
              </div>
            )}
          </div>
          <Collapse expanded={collapsedItems.includes('special')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="medium" color="primary-inverted">
                Этап отбора
              </Typography.TitleResponsive>

              <div className={appSt.rowSb}>
                <Typography.Text view="primary-small" color="secondary-inverted">
                  Цель по прибыли
                </Typography.Text>
                <Typography.Text view="primary-small" weight="medium" color="primary-inverted">
                  2% за период
                </Typography.Text>
              </div>
              <div className={appSt.rowSb}>
                <Typography.Text view="primary-small" color="secondary-inverted">
                  Максимальная просадка
                </Typography.Text>
                <Typography.Text view="primary-small" weight="medium" color="primary-inverted">
                  1%
                </Typography.Text>
              </div>
              <div className={appSt.rowSb}>
                <Typography.Text view="primary-small" color="secondary-inverted">
                  Период
                </Typography.Text>
                <Typography.Text view="primary-small" weight="medium" color="primary-inverted">
                  2 недели
                </Typography.Text>
              </div>
              <div className={appSt.rowSb}>
                <Typography.Text view="primary-small" color="secondary-inverted">
                  Макс. размер позиции
                </Typography.Text>
                <Typography.Text view="primary-small" weight="medium" color="primary-inverted">
                  100% от счёта
                </Typography.Text>
              </div>

              <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="medium" color="primary-inverted">
                Этап финансирования
              </Typography.TitleResponsive>

              <div className={appSt.rowSb}>
                <Typography.Text view="primary-small" color="secondary-inverted">
                  Максимальная просадка
                </Typography.Text>
                <Typography.Text view="primary-small" weight="medium" color="primary-inverted">
                  1%
                </Typography.Text>
              </div>
              <div className={appSt.rowSb}>
                <Typography.Text view="primary-small" color="secondary-inverted">
                  Макс. размер позиции
                </Typography.Text>
                <Typography.Text view="primary-small" weight="medium" color="primary-inverted">
                  100% от счёта
                </Typography.Text>
              </div>
            </div>
          </Collapse>
        </div>

        <div className={appSt.dangerBox}>
          <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="medium" color="primary-inverted">
            Запрещено:
          </Typography.TitleResponsive>

          <List tag="ul" marker="•" colorMarker="accent">
            <List.Item>
              <Typography.Text view="primary-small" color="primary-inverted">
                Сделки короче 1 минуты
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text view="primary-small" color="primary-inverted">
                За 5 минут до новостей нельзя открывать новые позиции
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text view="primary-small" color="primary-inverted">
                Держать открытыми позиции после 23:45 по мск
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text view="primary-small" color="primary-inverted">
                Нельзя торговать в выходные дни
              </Typography.Text>
            </List.Item>
          </List>
        </div>

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary-inverted"
        >
          Правила и FAQ
        </Typography.TitleResponsive>

        {faqs.map((faq, index) => (
          <div key={index}>
            <div
              onClick={() => {
                window.gtag('event', '7204_prop_faq_click', { faq: String(index + 1), var: 'var4' });
                setCollapsedItem(items =>
                  items.includes(String(index + 1))
                    ? items.filter(item => item !== String(index + 1))
                    : [...items, String(index + 1)],
                );
              }}
              className={appSt.rowSb}
            >
              <Typography.Text view="primary-medium" weight="medium" color="primary-inverted">
                {faq.question}
              </Typography.Text>
              {collapsedItems.includes(String(index + 1)) ? (
                <div style={{ flexShrink: 0 }}>
                  <ChevronUpMIcon color="#fff" />
                </div>
              ) : (
                <div style={{ flexShrink: 0 }}>
                  <ChevronDownMIcon color="#fff" />
                </div>
              )}
            </div>
            <Collapse expanded={collapsedItems.includes(String(index + 1))}>
              {faq.answers.map((answerPart, answerIndex) => (
                <Typography.Text
                  key={answerIndex}
                  tag="p"
                  defaultMargins={false}
                  view="primary-medium"
                  color="primary-inverted"
                >
                  {answerPart}
                </Typography.Text>
              ))}
            </Collapse>
          </div>
        ))}
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <Button
          style={{ backgroundColor: '#F2F3F5', color: '#030306E0' }}
          block
          view="primary"
          onClick={() => {
            window.gtag('event', '7204_landing_next_click', { var: 'var4' });
            setSteps('tariff');
          }}
        >
          Выбрать тариф
        </Button>
      </div>
    </>
  );
};
