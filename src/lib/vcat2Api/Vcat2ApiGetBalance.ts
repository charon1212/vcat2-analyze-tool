import { Currency } from "../../pair";
import { Vcat2ApiTool } from "./Vcat2ApiTool";

type BalanceKey = `${Currency}${'' | '_reserved' | '_lend_in_use' | '_lent' | '_debt'}`;

export type Vcat2ApiGetBalanceArgs = {};
export type Vcat2ApiGetBalanceResponse = { [key in BalanceKey]: string };

export const Vcat2ApiGetBalance = new Vcat2ApiTool<Vcat2ApiGetBalanceArgs, Vcat2ApiGetBalanceResponse>({
  method: 'GET',
  createRequest: () => ({
    uri: `/vcat2/v2/execute-api/balance`,
  }),
});
