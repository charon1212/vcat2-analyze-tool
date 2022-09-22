import { Pair } from "../../pair";
import { Vcat2ApiTool } from "./Vcat2ApiTool";

export type Vcat2ApiPostOrderArgs = {
  pair: Pair,
  side: 'buy' | 'sell',
  type: 'limit' | 'market',
  rate?: number,
  amount?: number,
  amountMarketBuy?: number,
};
export type Vcat2ApiPostOrderResponse = { orderId: string, };

export const Vcat2ApiPostOrder = new Vcat2ApiTool<Vcat2ApiPostOrderArgs, Vcat2ApiPostOrderResponse>({
  method: 'POST',
  createRequest: (args) => ({
    uri: `/vcat2/v2/execute-api/order`,
    body: JSON.stringify(args),
  }),
});
