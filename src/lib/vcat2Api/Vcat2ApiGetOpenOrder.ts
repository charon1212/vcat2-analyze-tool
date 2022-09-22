import { Pair } from "../../pair";
import { Vcat2ApiTool } from "./Vcat2ApiTool";

export type Vcat2ApiGetOpenOrderArgs = {};
export type Vcat2ApiGetOpenOrderResponse = { orders: OpenOrder[], };
type OpenOrder = {
  id: number,
  order_type: 'buy' | 'sell',
  rate: number | null,
  pair: Pair,
  pending_amount: string | null,
  pending_market_buy_amount: string | null,
  stop_loss_rate: string | null,
  created_at: string,
};

export const Vcat2ApiGetOpenOrder = new Vcat2ApiTool<Vcat2ApiGetOpenOrderArgs, Vcat2ApiGetOpenOrderResponse>({
  method: 'GET',
  createRequest: () => ({
    uri: `/vcat2/v2/execute-api/open-order`,
  }),
});
