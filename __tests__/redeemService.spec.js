const redeemService = require('../redeemService');
const constants = require('../constants');

describe('redeemService', () => {
  const INVALID = 'INVALID_CHANNEL';
  const mockEligibileCustomer = () => constants.CUSTOMER_ELIGIBLE;
  const mockIneligibileCustomer = () => constants.CUSTOMER_INELIGIBLE;
  const mockTechnicalError = () => {
    throw new Error(constants.TECHNICAL_FAILURE);
  };
  const mockInvalidAccountError = () => {
    throw new Error(constants.INVALID_ACCOUNT_NUMBER);
  };

  const technicalErrorParams = () => ({
    customerAccountNumber: 1234567880,
    portfolio: {
      customerSubscriptions: [],
    },
    eligibilityService: mockTechnicalError,
  });

  const invalidAccountNumberErrorParams = () => ({
    customerAccountNumber: 1234567880,
    portfolio: {
      customerSubscriptions: [],
    },
    eligibilityService: mockInvalidAccountError,
  });

  const eligibileCustomerAndSubscriptionInfo = (customerSubscriptions) => ({
    customerAccountNumber: 1234567880,
    portfolio: {
      customerSubscriptions,
    },
    eligibilityService: mockEligibileCustomer,
  });

  it('should not return any customerRewards for an ineligible customer', () => {
    const params = {
      customerAccountNumber: 1234567880,
      portfolio: {
        customerSubscriptions: [],
      },
      eligibilityService: mockIneligibileCustomer,
    };
    const customerRewards = redeemService(params);
    expect(customerRewards.data.length).toBe(0);
    expect(customerRewards.data).toEqual([]);
  });

  it('should not return any results if an invalid channel name is provided', () => {
    const customerRewards = redeemService(
      eligibileCustomerAndSubscriptionInfo(INVALID)
    );
    expect(customerRewards.data.length).toBe(0);
    expect(customerRewards.data).toEqual([]);
  });

  it('should throw a suitable error for a technical failure', () => {
    const params = {
      customerAccountNumber: 1234567880,
      portfolio: {
        customerSubscriptions: [],
      },
      eligibilityService: mockTechnicalError,
    };
    expect(params.eligibilityService).toThrow(constants.TECHNICAL_FAILURE);
  });

  it('should return no customerRewards results for a technical failure', () => {
    const customerRewards = redeemService(technicalErrorParams());
    expect(customerRewards.data.length).toBe(0);
    expect(customerRewards.data).toEqual([]);
  });

  it('should throw a suitable error for an invalid account number', () => {
    const params = {
      customerAccountNumber: 1234567880,
      portfolio: {
        customerSubscriptions: [],
      },
      eligibilityService: mockInvalidAccountError,
    };
    expect(params.eligibilityService).toThrow(constants.INVALID_ACCOUNT_NUMBER);
  });

  it('should set invalidAccountNumber flag to true for an invalid account number', () => {
    const customerRewards = redeemService(invalidAccountNumberErrorParams());
    expect(customerRewards.invalidAccountNumber).toBeTruthy();
  });

  it('should return no customerRewards results for an invalid account number', () => {
    const customerRewards = redeemService(invalidAccountNumberErrorParams());
    expect(customerRewards.data.length).toBe(0);
    expect(customerRewards.data).toEqual([]);
  });

  it('should return no rewards for a valid customer subscribed only to "KIDS" channel', () => {
    const customerRewards = redeemService(
      eligibileCustomerAndSubscriptionInfo(constants.KIDS_CHANNEL)
    );
    expect(customerRewards.data.length).toBe(0);
    expect(customerRewards.data).toEqual([]);
  });

  it('should return no rewards for a valid customer subscribed only to "NEWS" channel', () => {
    const customerRewards = redeemService(
      eligibileCustomerAndSubscriptionInfo(constants.NEWS_CHANNEL)
    );
    expect(customerRewards.data.length).toBe(0);
    expect(customerRewards.data).toEqual([]);
  });

  it('should return "Champions League Final Ticket" reward for a valid customer subscribed ONLY to "SPORTS" channel', () => {
    const customerRewards = redeemService(
      eligibileCustomerAndSubscriptionInfo([constants.SPORTS_CHANNEL])
    );
    expect(customerRewards.data.length).toBe(1);
    expect(customerRewards.data).toContain(
      constants.CHAMPIONS_LEAGUE_FINAL_TICKET
    );
  });

  it('should return "Karaoke Pro Microphone" reward for a valid customer subscribed ONLY to "MUSIC" channel', () => {
    const customerRewards = redeemService(
      eligibileCustomerAndSubscriptionInfo([constants.MUSIC_CHANNEL])
    );
    expect(customerRewards.data.length).toBe(1);
    expect(customerRewards.data).toContain(constants.KARAOKE_PRO_MICROPHONE);
  });

  it('should return "Champions League Final Ticket" reward for a valid customer subscribed ONLY to "MOVIES" channel', () => {
    const customerRewards = redeemService(
      eligibileCustomerAndSubscriptionInfo([constants.MOVIES_CHANNEL])
    );
    expect(customerRewards.data.length).toBe(1);
    expect(customerRewards.data).toContain(
      constants.PIRATES_OF_THE_CARRIBEAN_COLLECTION
    );
  });

  it('should return "Champions League Final Ticket" and "Karaoke Pro Microphone" rewards for a valid customer subscribed to "SPORTS" and "MUSIC" channels', () => {
    const customerRewards = redeemService(
      eligibileCustomerAndSubscriptionInfo([
        constants.SPORTS_CHANNEL,
        constants.MUSIC_CHANNEL,
      ])
    );
    expect(customerRewards.data.length).toBe(2);
    expect(customerRewards.data).toContain(
      constants.CHAMPIONS_LEAGUE_FINAL_TICKET,
      constants.KARAOKE_PRO_MICROPHONE
    );
  });

  it('should return "Pirates of the Carribean Collection" and "Karaoke Pro Microphone" rewards for a valid customer subscribed to "MOVIES" and "MUSIC" channels', () => {
    const customerRewards = redeemService(
      eligibileCustomerAndSubscriptionInfo([
        constants.MOVIES_CHANNEL,
        constants.MUSIC_CHANNEL,
      ])
    );
    expect(customerRewards.data.length).toBe(2);
    expect(customerRewards.data).toContain(
      constants.PIRATES_OF_THE_CARRIBEAN_COLLECTION,
      constants.KARAOKE_PRO_MICROPHONE
    );
  });

  it('should return ALL rewards for a valid customer subscribed to ALL channels', () => {
    const customerRewards = redeemService(
      eligibileCustomerAndSubscriptionInfo([
        constants.SPORTS_CHANNEL,
        constants.MUSIC_CHANNEL,
        constants.MOVIES_CHANNEL,
      ])
    );
    expect(customerRewards.data.length).toBe(3);
    expect(customerRewards.data).toContain(
      constants.CHAMPIONS_LEAGUE_FINAL_TICKET,
      constants.KARAOKE_PRO_MICROPHONE,
      constants.PIRATES_OF_THE_CARRIBEAN_COLLECTION
    );
  });
});
