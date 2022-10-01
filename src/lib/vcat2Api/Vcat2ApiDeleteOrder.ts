import { Vcat2ApiTool } from "./Vcat2ApiTool";

export type Vcat2ApiDeleteOrderArgs = { id: number };
export type Vcat2ApiDeleteOrderResponse = { id: number };

export const Vcat2ApiDeleteOrder = new Vcat2ApiTool<Vcat2ApiDeleteOrderArgs, Vcat2ApiDeleteOrderResponse>({
  method: 'DELETE',
  createRequest: ({ id }) => ({
    uri: `/vcat2/v2/execute-api/order`,
    requestParam: { id: `${id}` },
  }),
});
