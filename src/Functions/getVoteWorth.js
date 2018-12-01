import steem from "steem";
import store from "../store";
import delay from "../Functions/delay";
const getVoteWorth = async props => {
  if (
    store.getState().login.status &&
    store.getState().steemProfile.profile.account === undefined
  ) {
    await delay(3000);
  }
  const profile = await store.getState().steemProfile.profile;

  const votingPower =
    profile.account.voting_power * (store.getState().votePower.power / 10000);
  const vestingShares =
    parseFloat(profile.account.vesting_shares.split(" ")[0]) +
    parseFloat(profile.account.received_vesting_shares.split(" ")[0]) -
    parseFloat(profile.account.delegated_vesting_shares.split(" ")[0]);
  let globalData = [];
  let rewardFund = [];
  let price = [];
  await steem.api.getDynamicGlobalPropertiesAsync().then(result => {
    globalData.push(result);
    return globalData[0];
  });
  await steem.api.getRewardFundAsync("post").then(result => {
    rewardFund.push(result);
    return rewardFund[0];
  });
  const steemPower = steem.formatter.vestToSteem(
    vestingShares,
    parseFloat(globalData[0].total_vesting_shares),
    parseFloat(globalData[0].total_vesting_fund_steem)
  );
  await fetch("https://api.steemjs.com/get_current_median_history_price")
    .then(response => {
      return response.json();
    })
    .then(result => {
      price = result;
    });
  let m = parseInt((100 * votingPower * (100 * 100)) / 10000, 10);
  m = parseInt((m + 49) / 50, 10);
  const i =
    parseFloat(rewardFund[0].reward_balance.replace(" STEEM", "")) /
    parseFloat(rewardFund[0].recent_claims);
  const o =
    parseFloat(price.base.replace(" SBD", "")) /
    parseFloat(price.quote.replace(" STEEM", ""));
  const a =
    globalData[0].total_vesting_fund_steem.replace(" STEEM", "") /
    globalData[0].total_vesting_shares.replace(" VESTS", "");
  const r = steemPower / a;
  let vote;
  vote = parseInt(r * m * 100, 10) * i * o;
  vote = vote / 100;
  return vote.toFixed(3);
};
export default getVoteWorth;
