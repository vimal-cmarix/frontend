import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Cell, Grid } from 'styled-css-grid';
import PropTypes from 'prop-types';

import PaymentService from '@api/services/payment';

import { SafeArea } from '@assets/styles/wrapper';
import { sizes } from '@assets/styles/medias';
import { Grey31 } from '@assets/styles/colors';

import AppContext from '@context/appContext';
import PaymentContext from '@context/paymentContext';

import { useToast } from '@components/molecules/Notification';
import Page from '@components/templates/Page';

import errorHandle from '@utils/error';
import { cdn, formatDate, formateCurrency } from '@utils/general';

import {
  FREE,
  PREMIUM,
  PREMIUM_PLANS_E_IDS,
  STARTER,
  STARTER_PLANS_E_IDS,
} from '@modules/consts';

import Toggle from '@components/atoms/Toggle';
import StudentsApply from '@components/templates/Modals/StudentsApply';
import IconSVG from '@components/atoms/IconSVG';

import useCancelPlan from '@src/hooks/useCancelPlan';

import {
  CellHeader,
  CellPrice,
  ComparisionCell,
  ComparisionGrid,
  ComparisionRow,
  CellPriceWrapper,
  Description,
  Title,
  ToggleWrapper,
  PaymentInterval,
  HeaderContainer,
  HeaderButtonsContainer,
  HeaderIllustration,
  HeaderInfoBlock,
  CTAButton,
  ComparisionCellText,
  ComparisionCellLabel,
  MobileComparisionWrapper,
  SliderControllersWrapper,
  SliderControllerLabel,
  MobilePricingInfo,
} from './style';

const Pricing = ({ query }) => {
  const router = useRouter();
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: paymentState } = useContext(PaymentContext);
  const { student } = router.query;

  const {
    actions: cancelPlanActions,
    models: cancelPlanModels,
  } = useCancelPlan();

  const toast = useToast();
  const showError = msg => toast.add(msg, 'error');

  const { t: pricingT } = useTranslation('pricing');
  const { t: billingT } = useTranslation('billing');
  const { t: monthsT } = useTranslation('months');
  const { t: dateFormatesT } = useTranslation('dateFormates');

  const [canceled, setCanceled] = useState(true);
  const [bigLoading, setBigLoading] = useState(true);
  const [isYearPricingActive, setIsYearPricingActive] = useState(
    query.billing === 'annual',
  );

  // slider
  const [activeIndex, setActiveIndex] = useState(0);
  const numberOfPlans = 3;
  const plansTitle = ['Free', 'Professional', 'Premium'];

  const next = () => {
    if (activeIndex < numberOfPlans - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };

  const previous = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(numberOfPlans - 1);
    }
  };

  const [screenWidth, setScreenWidth] = useState(null);
  useEffect(() => setScreenWidth(appState.screenWidth), [appState.screenWidth]);

  function getGridSize() {
    // if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 10;
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return 12;
    return 12;
  }

  function getLeftSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 3;
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return 2;
    return 0;
  }

  function getCellSize() {
    if (screenWidth > parseInt(sizes.desktopmedium, 10)) return 8;
    if (screenWidth > parseInt(sizes.tabletPortrait, 10)) return 10;
    return 12;
  }

  const cellSize = getCellSize();
  const gridSize = getGridSize();
  const leftSize = getLeftSize();

  const [prices, setPrices] = useState({
    starter: {
      month: {},
      year: {},
    },
    premium: {
      month: {},
      year: {},
    },
  });

  async function handleData() {
    try {
      const subscriptionsResponse = await PaymentService.getPlans();
      const { rows } = subscriptionsResponse.data;

      const starterPlan = rows.find(
        row => row.externalId === STARTER_PLANS_E_IDS.ONE_MONTH,
      );
      const starter12Plan = rows.find(
        row => row.externalId === STARTER_PLANS_E_IDS.TWELVE_MONTHS,
      );
      const premiumPlan = rows.find(
        row => row.externalId === PREMIUM_PLANS_E_IDS.ONE_MONTH,
      );
      const premium12Plan = rows.find(
        row => row.externalId === PREMIUM_PLANS_E_IDS.TWELVE_MONTHS,
      );

      const getPrice = plan => {
        const price = plan.prices.find(p => p.currency === 'USD');
        return {
          ...price,
          amount: formateCurrency(price.amount),
          finalAmount: formateCurrency(price.finalAmount),
        };
      };

      setPrices({
        starter: {
          month: getPrice(starterPlan),
          year: getPrice(starter12Plan),
        },
        premium: {
          month: getPrice(premiumPlan),
          year: getPrice(premium12Plan),
        },
      });
    } catch (error) {
      showError(errorHandle(error));
    } finally {
      setTimeout(() => {
        setBigLoading(false);
      }, 700);
    }
  }

  function getStarterButtonLabel() {
    if (paymentState.userPlan === FREE)
      return pricingT('plans.starter.button.active');
    if (paymentState.userPlan === STARTER)
      return pricingT('plans.starter.button.current');

    return pricingT('plans.starter.button.purchased');
  }

  function openStudentsApplyModal() {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: StudentsApply,
    });
  }

  function getPremiumTooltipText() {
    if (paymentState.isStudent) {
      return billingT('plan_analytics.student_trial').replace(
        '{DATE_EXPIRE}',
        paymentState.planData &&
          formatDate(
            paymentState.planData?.nextBillingDate,
            monthsT,
            dateFormatesT('write'),
          ),
      );
    }

    return billingT('plan_analytics.canceled')
      .replace(
        '{DATE_CANCEL}',
        paymentState.planData &&
          formatDate(
            paymentState.planData?.canceledAt,
            monthsT,
            dateFormatesT('write'),
          ),
      )
      .replace(
        '{DATE_AVAILABLE}',
        paymentState.planData &&
          formatDate(
            paymentState.planData?.nextBillingDate,
            monthsT,
            dateFormatesT('ord'),
          ),
      );
  }

  const getAnnualPriceLabel = price => {
    const regularizedPrice = Number(price.replace('$ ', ''));
    const monthlyPrice = (regularizedPrice / 12).toFixed(2);
    const formattedPrice = `$ ${monthlyPrice}`;

    return formattedPrice;
  };

  useEffect(() => {
    if (
      paymentState &&
      paymentState.planData &&
      paymentState.planData.isBillingCanceled
    )
      setCanceled(false);
    else setCanceled(true);
  }, [paymentState]);

  useEffect(() => {
    handleData();
  }, [paymentState.isStudent]);

  useEffect(() => {
    handleData();
  }, []);

  const plans = useMemo(() => {
    return [
      {
        active: paymentState.userPlan === FREE,
        logo: cdn('/static/img/pricing/profile.svg'),
        subLogo: null,
        title: pricingT('plans.free.title'),
        description: pricingT('plans.free.description'),
        list: pricingT('plans.free.features', { returnObjects: true }),
        button: {
          label:
            paymentState.userPlan === FREE ||
            (paymentState.canceled && !paymentState.isStudent)
              ? pricingT('plans.free.button.disabled')
              : pricingT('plans.free.button.active'),
          scheme:
            paymentState.userPlan === FREE ||
            (paymentState.canceled && !paymentState.isStudent)
              ? 'secondary'
              : 'lightPurple',
          disabled:
            paymentState.userPlan === FREE ||
            (paymentState.canceled && !paymentState.isStudent),
        },
        // eslint-disable-next-line no-use-before-define
        onButtonClick: handleOpenDowngradeToFree,
        price: '$ 0.00',
        discountPrice: null,
        yearPrice: null,
        billing: pricingT('plans.starter.per'),
        tooltip: {
          text: '',
        },
      },
      {
        active: paymentState.userPlan === STARTER,
        logo: cdn('/static/img/pricing/profile-filled.svg'),
        subLogo: cdn('/static/img/pricing/trailblazer.svg'),
        title: pricingT('plans.starter.title'),
        description: pricingT('plans.starter.description'),
        list: pricingT('plans.starter.features', { returnObjects: true }),
        button: {
          label: getStarterButtonLabel(),
          scheme:
            paymentState.userPlan === STARTER ? 'secondary' : 'lightPurple',
          disabled: paymentState.userPlan === STARTER,
        },
        onButtonClick: () =>
          router.push({
            pathname: `/checkout/${STARTER}`,
            query: { billing: isYearPricingActive ? 'annual' : 'monthly' },
          }),
        price: prices.starter[isYearPricingActive ? 'year' : 'month'],
        billing: pricingT('plans.starter.per'),
        tooltip: {
          text: billingT('plan_analytics.canceled')
            .replace(
              '{DATE_CANCEL}',
              paymentState.planData &&
                formatDate(
                  paymentState.planData.canceledAt,
                  monthsT,
                  dateFormatesT('write'),
                ),
            )
            .replace(
              '{DATE_AVAILABLE}',
              paymentState.planData &&
                formatDate(
                  paymentState.planData.nextBillingDate,
                  monthsT,
                  dateFormatesT('ord'),
                ),
            ),
        },
      },
      {
        active: paymentState.userPlan === PREMIUM,
        logo: cdn('/static/img/pricing/profile-filled.svg'),
        subLogo: cdn('/static/img/pricing/job-seeker.svg'),
        title: pricingT('plans.premium.title'),
        description: pricingT('plans.premium.description'),
        list: pricingT('plans.premium.features', { returnObjects: true }),
        button: {
          label:
            paymentState.userPlan === PREMIUM
              ? pricingT('plans.premium.button.disabled')
              : pricingT('plans.premium.button.active'),
          scheme:
            paymentState.userPlan === PREMIUM ? 'secondary' : 'lightPurple',
          disabled: paymentState.userPlan === PREMIUM,
        },
        onButtonClick: () =>
          router.push({
            pathname: `/checkout/${PREMIUM}`,
            query: { billing: isYearPricingActive ? 'annual' : 'monthly' },
          }),
        price: prices.premium[isYearPricingActive ? 'year' : 'month'],
        billing: pricingT('plans.premium.per'),
        tooltip: {
          text: getPremiumTooltipText(),
        },
        student: true,
      },
    ];
  }, [prices, paymentState, isYearPricingActive]);

  async function handleOpenDowngradeToFree() {
    await cancelPlanActions.checkForPending({});
  }

  if (student === 'yes') {
    paymentState.isStudent = true;
    plans[1].price.hasDiscount = true;
    plans[2].price.hasDiscount = true;
  }

  const Check = () => (
    <img size="50" src={cdn('/static/img/check.svg')} alt="check" />
  );
  const GreyCheck = () => (
    <img src={cdn('/static/img/grey-check.svg')} alt="grey check" />
  );

  return (
    <Page
      title="Pricing"
      description=""
      pageLoader={bigLoading}
      // nav={{ show: navBottom }}
      isVerified
    >
      <SafeArea>
        <Grid columns={gridSize}>
          <Cell width={cellSize} left={leftSize}>
            <HeaderContainer>
              <HeaderInfoBlock>
                <div>
                  <Title>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: paymentState.isStudent
                          ? pricingT('title-student')
                          : pricingT('title'),
                      }}
                    />
                  </Title>
                  <Description className="pricingDescription">
                    {pricingT('description')}
                  </Description>
                  <HeaderButtonsContainer>
                    {!paymentState.isStudent && (
                      <CTAButton
                        variant="outlineLight"
                        label={pricingT('students-discount-button')}
                        size={
                          screenWidth <= parseInt(sizes.tabletPortrait, 10)
                            ? 'xsmall'
                            : 'small'
                        }
                        handleClick={() => openStudentsApplyModal()}
                      />
                    )}
                  </HeaderButtonsContainer>
                </div>
              </HeaderInfoBlock>
              <div>
                {paymentState.isStudent ? (
                  <HeaderIllustration
                    src={cdn(
                      '/static/img/pricing/student-pricing-ilustration.svg',
                    )}
                    alt="Pricing"
                  />
                ) : (
                  <HeaderIllustration
                    src={cdn(
                      '/static/img/pricing/default-pricing-ilustration.svg',
                    )}
                    alt="Pricing"
                  />
                )}
              </div>
            </HeaderContainer>
            <ToggleWrapper id="price-breakdown">
              <Toggle
                isPricingToggle
                onChange={() => setIsYearPricingActive(!isYearPricingActive)}
                active={isYearPricingActive}
                label1="Monthly"
                label2="Annually"
              />
            </ToggleWrapper>

            <MobileComparisionWrapper>
              <SliderControllersWrapper>
                <div
                  role="button"
                  aria-label="Previous"
                  onKeyDown={previous}
                  onClick={previous}
                  tabIndex={0}
                >
                  <IconSVG name="leftArrow" size="27" color={Grey31} />
                </div>
                <SliderControllerLabel>
                  {plansTitle[activeIndex]}
                </SliderControllerLabel>
                <div
                  role="button"
                  aria-label="Next"
                  onKeyDown={next}
                  onClick={next}
                  tabIndex={0}
                >
                  <IconSVG
                    name="rightArrow"
                    size="27"
                    color={Grey31}
                    handleClick={next}
                  />
                </div>
              </SliderControllersWrapper>

              <MobilePricingInfo>
                <CellHeader>{plansTitle[activeIndex]}</CellHeader>
                <CellPriceWrapper mobileCell>
                  <CellPrice>
                    {activeIndex > 0 &&
                      (isYearPricingActive
                        ? getAnnualPriceLabel(
                            plans[activeIndex].price.finalAmount,
                          )
                        : plans[activeIndex].price.finalAmount)}
                    {activeIndex === 0 && plans[0].price} USD/mo
                  </CellPrice>
                  {plans[2].price.hasDiscount && (
                    <CellPrice oldPrice>
                      {activeIndex > 0 &&
                        (isYearPricingActive
                          ? `${getAnnualPriceLabel(
                              plans[activeIndex].price.amount,
                            )} USD/mo`
                          : `${plans[activeIndex].price.amount} USD/mo`)}
                    </CellPrice>
                  )}
                  <PaymentInterval>
                    {activeIndex > 0 &&
                      (isYearPricingActive ? 'Paid Annually' : 'Paid Monthly')}
                  </PaymentInterval>
                </CellPriceWrapper>

                <CTAButton
                  label={plans[activeIndex].button.label}
                  size="large"
                  variant="outlineLight"
                  isMobileHeader
                  colorSchema={plans[activeIndex].button.scheme}
                  handleClick={plans[activeIndex].onButtonClick}
                  disabled={plans[activeIndex].button.disabled}
                />

                <ComparisionRow soon>
                  <ComparisionCell header mobileCell>
                    <ComparisionCellLabel soon>
                      {pricingT('comparison.job_search')}
                    </ComparisionCellLabel>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 0}>
                    {GreyCheck()}
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 1}>
                    <ComparisionCellText strong>
                      Coming soon
                    </ComparisionCellText>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 2}>
                    {GreyCheck()}
                  </ComparisionCell>
                </ComparisionRow>
                <ComparisionRow>
                  <ComparisionCell header mobileCell>
                    <ComparisionCellLabel>
                      {pricingT('comparison.public_profile')}
                    </ComparisionCellLabel>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 0}>
                    {Check()}
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 1}>
                    {Check()}
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 2}>
                    {Check()}
                  </ComparisionCell>
                </ComparisionRow>
                <ComparisionRow>
                  <ComparisionCell mobileCell header>
                    <ComparisionCellLabel>
                      {pricingT('comparison.content_library')}
                    </ComparisionCellLabel>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 0}>
                    {Check()}
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 1}>
                    {Check()}
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 2}>
                    {Check()}
                  </ComparisionCell>
                </ComparisionRow>
                <ComparisionRow>
                  <ComparisionCell mobileCell header>
                    <ComparisionCellLabel>
                      {pricingT('comparison.job_pitches')}
                    </ComparisionCellLabel>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 0}>
                    {Check()}
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 1}>
                    {Check()}
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 2}>
                    {Check()}
                  </ComparisionCell>
                </ComparisionRow>
                <ComparisionRow>
                  <ComparisionCell mobileCell header>
                    <ComparisionCellLabel>
                      {pricingT('comparison.viewership_alerts')}
                    </ComparisionCellLabel>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 0}>
                    <ComparisionCellText strong> -- </ComparisionCellText>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 1}>
                    {Check()}
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 2}>
                    {Check()}
                  </ComparisionCell>
                </ComparisionRow>
                <ComparisionRow>
                  <ComparisionCell mobileCell header>
                    <ComparisionCellLabel>
                      {pricingT('comparison.application_tracker')}
                    </ComparisionCellLabel>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 0}>
                    <ComparisionCellText strong>10</ComparisionCellText>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 1}>
                    <ComparisionCellText strong>25</ComparisionCellText>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 2}>
                    <ComparisionCellText strong>Unlimited</ComparisionCellText>
                  </ComparisionCell>
                </ComparisionRow>
                <ComparisionRow soon>
                  <ComparisionCell mobileCell header>
                    <ComparisionCellLabel soon>
                      {pricingT('comparison.analytics_dashboard')}
                    </ComparisionCellLabel>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 0}>
                    <ComparisionCellText> -- </ComparisionCellText>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 1}>
                    <ComparisionCellText strong>
                      Coming soon
                    </ComparisionCellText>
                  </ComparisionCell>
                  <ComparisionCell mobileCell mobileDisplay={activeIndex === 2}>
                    {GreyCheck()}
                  </ComparisionCell>
                </ComparisionRow>
              </MobilePricingInfo>
            </MobileComparisionWrapper>

            {/** init desktop comparision*/}
            <ComparisionGrid>
              <ComparisionRow comparisionHeader>
                <ComparisionCell />
                <ComparisionCell>
                  <CellHeader>Free</CellHeader>
                  <CellPriceWrapper>
                    <CellPrice>{plans[0].price} USD/mo</CellPrice>
                    {plans[1].price.hasDiscount && (
                      <CellPrice oldPrice>&nbsp;</CellPrice>
                    )}
                    <PaymentInterval>&nbsp;</PaymentInterval>
                  </CellPriceWrapper>
                  <CTAButton
                    label={
                      cancelPlanModels.loading
                        ? 'wait...'
                        : plans[0].button.label
                    }
                    size="large"
                    variant="outlineLight"
                    colorSchema={plans[0].button.scheme}
                    handleClick={plans[0].onButtonClick}
                    disabled={plans[0].button.disabled}
                  />
                </ComparisionCell>
                <ComparisionCell>
                  <CellHeader>{plansTitle[1]}</CellHeader>
                  <CellPriceWrapper>
                    <CellPrice>
                      {isYearPricingActive
                        ? getAnnualPriceLabel(plans[1].price.finalAmount)
                        : plans[1].price.finalAmount}{' '}
                      USD/mo
                    </CellPrice>
                    {plans[1].price.hasDiscount && (
                      <CellPrice oldPrice>
                        {isYearPricingActive
                          ? getAnnualPriceLabel(plans[1].price.amount)
                          : plans[1].price.amount}{' '}
                        USD/mo
                      </CellPrice>
                    )}
                  </CellPriceWrapper>
                  <PaymentInterval>
                    {isYearPricingActive ? 'Paid Annually' : 'Paid Monthly'}
                  </PaymentInterval>
                  <CTAButton
                    label={plans[1].button.label}
                    size="large"
                    variant="outlineLight"
                    colorSchema={plans[1].button.scheme}
                    handleClick={plans[1].onButtonClick}
                    disabled={plans[1].button.disabled}
                  />
                </ComparisionCell>
                <ComparisionCell>
                  <CellHeader>{plansTitle[2]}</CellHeader>
                  <CellPriceWrapper>
                    <CellPrice>
                      {isYearPricingActive
                        ? getAnnualPriceLabel(plans[2].price.finalAmount)
                        : plans[2].price.finalAmount}{' '}
                      USD/mo
                    </CellPrice>
                    {plans[2].price.hasDiscount && (
                      <CellPrice oldPrice>
                        {isYearPricingActive
                          ? getAnnualPriceLabel(plans[2].price.amount)
                          : plans[2].price.amount}{' '}
                        USD/mo
                      </CellPrice>
                    )}
                  </CellPriceWrapper>
                  <PaymentInterval>
                    {isYearPricingActive ? 'Paid Annually' : 'Paid Monthly'}
                  </PaymentInterval>
                  <CTAButton
                    label={plans[2].button.label}
                    size="large"
                    variant="outlineLight"
                    colorSchema={plans[2].button.scheme}
                    handleClick={plans[2].onButtonClick}
                    disabled={plans[2].button.disabled}
                  />
                </ComparisionCell>
              </ComparisionRow>
              <ComparisionRow soon>
                <ComparisionCell header>
                  <ComparisionCellLabel soon>
                    {pricingT('comparison.job_search')}
                  </ComparisionCellLabel>
                </ComparisionCell>
                <ComparisionCell>{GreyCheck()}</ComparisionCell>
                <ComparisionCell>
                  <ComparisionCellText strong>Coming soon</ComparisionCellText>
                </ComparisionCell>
                <ComparisionCell>{GreyCheck()}</ComparisionCell>
              </ComparisionRow>
              <ComparisionRow>
                <ComparisionCell header>
                  <ComparisionCellLabel>
                    {pricingT('comparison.public_profile')}
                  </ComparisionCellLabel>
                </ComparisionCell>
                <ComparisionCell>{Check()}</ComparisionCell>
                <ComparisionCell>{Check()}</ComparisionCell>
                <ComparisionCell>{Check()}</ComparisionCell>
              </ComparisionRow>
              <ComparisionRow>
                <ComparisionCell header>
                  <ComparisionCellLabel>
                    {pricingT('comparison.content_library')}
                  </ComparisionCellLabel>
                </ComparisionCell>
                <ComparisionCell>{Check()}</ComparisionCell>
                <ComparisionCell>{Check()}</ComparisionCell>
                <ComparisionCell>{Check()}</ComparisionCell>
              </ComparisionRow>
              <ComparisionRow>
                <ComparisionCell header>
                  <ComparisionCellLabel>
                    {pricingT('comparison.job_pitches')}
                  </ComparisionCellLabel>
                </ComparisionCell>
                <ComparisionCell>{Check()}</ComparisionCell>
                <ComparisionCell>{Check()}</ComparisionCell>
                <ComparisionCell>{Check()}</ComparisionCell>
              </ComparisionRow>
              <ComparisionRow>
                <ComparisionCell header>
                  <ComparisionCellLabel>
                    {pricingT('comparison.viewership_alerts')}
                  </ComparisionCellLabel>
                </ComparisionCell>
                <ComparisionCell>
                  <ComparisionCellText strong> -- </ComparisionCellText>
                </ComparisionCell>
                <ComparisionCell>{Check()}</ComparisionCell>
                <ComparisionCell>{Check()}</ComparisionCell>
              </ComparisionRow>
              <ComparisionRow soon>
                <ComparisionCell header>
                  <ComparisionCellLabel>
                    {pricingT('comparison.application_tracker')}
                  </ComparisionCellLabel>
                </ComparisionCell>
                <ComparisionCell>
                  <ComparisionCellText strong>10</ComparisionCellText>
                </ComparisionCell>
                <ComparisionCell>
                  <ComparisionCellText strong>25</ComparisionCellText>
                </ComparisionCell>
                <ComparisionCell>
                  <ComparisionCellText strong>Unlimited</ComparisionCellText>
                </ComparisionCell>
              </ComparisionRow>
              <ComparisionRow soon>
                <ComparisionCell header>
                  <ComparisionCellLabel soon>
                    {pricingT('comparison.analytics_dashboard')}
                  </ComparisionCellLabel>
                </ComparisionCell>
                <ComparisionCell>
                  <ComparisionCellText> -- </ComparisionCellText>
                </ComparisionCell>
                <ComparisionCell>
                  <ComparisionCellText strong>Coming soon</ComparisionCellText>
                </ComparisionCell>
                <ComparisionCell>{GreyCheck()}</ComparisionCell>
              </ComparisionRow>
            </ComparisionGrid>
          </Cell>
        </Grid>
      </SafeArea>
    </Page>
  );
};

Pricing.propTypes = {
  query: PropTypes.objectOf(PropTypes.any),
};

Pricing.defaultProps = {
  query: {},
};

Pricing.getInitialProps = ctx => {
  return { query: ctx.query || {} };
};

export default Pricing;
