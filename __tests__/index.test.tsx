// __tests__/index.test.jsx

import Home from '../pages/index';
import { getTotalAmount, pricesRequstValidator, usageRequstValidator } from '../utils';
import { UsageMeteringPoints } from '../enums';

describe('test priceRequestalidator', () => {
  it('Data should be valid', () => {
    const result = pricesRequstValidator({
      date: {
        year: '2022',
        month: '04',
        day: '01',
      }
    })

    expect(result).toBeTruthy();
  });

  it('Data should be invalid', () => {
    const noDay = pricesRequstValidator({
      date: {
        year: '2022',
        month: '04',
        day: undefined,
      } as any
    });

    const noMonth = pricesRequstValidator({
      date: {
        year: '2022',
        month: undefined,
        day: '01',
      } as any
    });

    const noYear = pricesRequstValidator({
      date: {
        year: undefined,
        month: '01',
        day: '01',
      } as any
    });

    expect(noDay).toEqual(false);
    expect(noMonth).toEqual(false);
    expect(noYear).toEqual(false);
  });
});

describe('test usageRequestValidator', () => {
  it('Data should be invalid if any field is missing', () => {
    const noMeteringPointId = usageRequstValidator({
      date: {
        year: '2022',
        month: '04',
        day: '01',
      }
    });

    const noDay = usageRequstValidator({
      meteringPoinId: UsageMeteringPoints.first,
      date: {
        year: '2022',
        month: '04',
        day: undefined,
      } as any
    });

    const noMonth = usageRequstValidator({
      meteringPoinId: UsageMeteringPoints.first,
      date: {
        year: '2022',
        month: undefined,
        day: '01',
      } as any
    });

    const noYear = usageRequstValidator({
      meteringPoinId: UsageMeteringPoints.first,
      date: {
        year: undefined,
        month: '01',
        day: '01',
      } as any
    });

    expect(noMeteringPointId).toEqual(false);
    expect(noDay).toEqual(false);
    expect(noMonth).toEqual(false);
    expect(noYear).toEqual(false);
  });

  it('Data should be valid when all field are filled', () => {
    const result = usageRequstValidator({
      meteringPoinId: UsageMeteringPoints.first,
      date: {
        year: '2022',
        month: '04',
        day: '01',
      }
    });

    expect(result).toBeTruthy();
  });
});

describe('test getDailyAmount', () => {
  it('should get total amount for prices category for day', () => {
    const dummyData = [
      { "timestamp": 1649732400, "price": 0.12, "currency": "BGN"},
      { "timestamp": 1649736000, "price": 0.13, "currency": "BGN"},
      { "timestamp": 1649736600, "price": 0.14, "currency": "BGN"}
    ];

    const result = getTotalAmount(dummyData, 'price');
    expect(result).toEqual(0.39);
  });

  it('should get total amount for usage category for day', () => {
    const dummyData = [
      { "timestamp": 1649732400, "kwh": 0.5},
      { "timestamp": 1649736000, "kwh": 0.6},
      { "timestamp": 1649736600, "kwh": 0.7}

    ];

    const result = getTotalAmount(dummyData, 'kwh');
    expect(result).toEqual(1.8);
  });
});