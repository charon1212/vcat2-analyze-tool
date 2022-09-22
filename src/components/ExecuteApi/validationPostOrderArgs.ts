import { Vcat2ApiPostOrderArgs } from "../../lib/vcat2Api/Vcat2ApiPostOrder";

export const validationPostOrderArgs = (args: Vcat2ApiPostOrderArgs) => {
  const result = [] as string[];
  const { pair, side, type, amount, amountMarketBuy, rate } = args;

  // side
  if (!['buy', 'sell'].includes(side)) result.push('sideの値が不正');

  // type
  if (!['limit', 'market'].includes(type)) result.push('typeの値が不正');

  // amount
  if (side === 'sell' || type === 'limit') {
    if (amount === undefined) {
      result.push('amountは必須です');
    } else if (isNaN(amount)) {
      result.push('amountが数値ではない');
    }
  }

  // amountMarketBuy
  if (side === 'buy' && type === 'market') {
    if (amountMarketBuy === undefined) {
      result.push('amountMarketBuyは必須です');
    } else if (isNaN(amountMarketBuy)) {
      result.push('amountMarketBuyが数値ではない');
    }
  }

  // rate
  if (type === 'limit') {
    if (rate === undefined) {
      result.push('rateは必須です');
    } else if (isNaN(rate)) {
      result.push('rateが数値ではない');
    }
  }

  return result.join('\n');
};
