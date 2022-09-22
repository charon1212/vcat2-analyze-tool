import { Pair } from "../../pair";
import { Vcat2ApiTool } from "./Vcat2ApiTool";

export type Vcat2ApiGetTransactionArgs = {};
export type Vcat2ApiGetTransactionResponse = { transactions: Transaction[], };
type Transaction = {
  id: number,
  order_id: number, // 注文のID
  created_at: string, // 取引時間
  funds: { // 各残高の増減
    btc: string,
    jpy: string, // TODO: 貨幣はこれだけじゃない。ETCとかやる場合は追加が必要。
  },
  pair: Pair, // 取引ペア
  rate: string, // 約定価格
  fee_currency: string, // 手数料の通貨
  fee: string, // 手数料
  liquidity: 'T' | 'M', // Taker/Maker
  side: 'buy' | 'sell', // 売り/買い
};

export const Vcat2ApiGetTransaction = new Vcat2ApiTool<Vcat2ApiGetTransactionArgs, Vcat2ApiGetTransactionResponse>({
  method: 'GET',
  createRequest: () => ({
    uri: `/vcat2/v2/execute-api/transaction`,
  }),
});
