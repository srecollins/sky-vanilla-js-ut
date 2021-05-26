const constants = require("./constants");

function rewardsService({
  customerAccountNumber,
  portfolio,
  eligibilityService,
}) {
  const data = { data: [] };

  const customerRewards = (customerSubscription) =>
    typeof constants.rewardsMap[customerSubscription] === "undefined"
      ? []
      : constants.rewardsMap[customerSubscription];

  try {
    const eligibility = eligibilityService(customerAccountNumber);
    if (eligibility !== constants.CUSTOMER_ELIGIBLE) {
      return data;
    }

    return Object.assign(data, {
      data: [].concat.apply(
        [],
        portfolio.customerSubscriptions.map(customerRewards)
      ),
    });
  } catch (err) {
    if (err.message === constants.INVALID_ACCOUNT_NUMBER) {
      /*  Returns a truthy value to be utilised for notifying the user and client of an invalid account number
                as a brief user feedback example,
                checking the value of invalidAccountNumber,
                and displaying an output "Please Enter a Valid Account Number" to the user if the value is true. */
      return Object.assign(data, { invalidAccountNumber: true });
    }

    return data;
  }
}

module.exports = rewardsService;
