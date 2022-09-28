import { Vcat2ApiTool } from "./Vcat2ApiTool";

export type Vcat2ApiGetPriceHistoryArgs = {
  startTimestamp?: number,
  lastTimestamp?: number,
};
export type Vcat2ApiGetPriceHistoryResponse = { priceList: { timestamp: number, price: number }[], };

export const Vcat2ApiGetPriceHistory = new Vcat2ApiTool<Vcat2ApiGetPriceHistoryArgs, Vcat2ApiGetPriceHistoryResponse>({
  method: 'GET',
  createRequest: ({ startTimestamp, lastTimestamp }) => ({
    uri: `/vcat2/v2/price-history`,
    requestParam: {
      pair: 'btc_jpy',
      'start-timestamp': `${startTimestamp || ''}`,
      'last-timestamp': `${lastTimestamp || ''}`,
    },
  }),
});
