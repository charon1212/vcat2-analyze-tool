import { Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { SimpleTable, useYesNoDialog } from '@charon1212/my-lib-react';
import { Vcat2ApiGetOpenOrder, Vcat2ApiGetOpenOrderResponse } from '../../lib/vcat2Api/Vcat2ApiGetOpenOrder';

type OpenOrder = Vcat2ApiGetOpenOrderResponse['orders'][number];

export const ExecuteApiGetOpenOrder = () => {
  const [openOrders, setOpenOrders] = useState<OpenOrder[]>([]);

  const onClickExecute = () => {
    Vcat2ApiGetOpenOrder.request({}).then((response) => {
      if (response.success) {
        setOpenOrders(response.data.orders);
      } else {
        alert(`API通信でエラー: [${response.message.join('],[')}]`);
      }
    });
  };

  return (
    <>
      <Box sx={{ padding: '30px' }}>
        <div>
          <Typography variant='h4'>GetOpenOrder</Typography>
          <Button onClick={onClickExecute}>Execute API</Button>
        </div>
        <div>
          <SimpleTable
            tableProp={{ size: 'small' }}
            data={openOrders}
            columns={[
              { header: 'id', cell: ({ id }) => id },
              { header: 'time', cell: ({ created_at }) => created_at },
              { header: 'pair', cell: ({ pair }) => pair },
              { header: 'rate', cell: ({ rate }) => rate },
              { header: 'order_type', cell: ({ order_type }) => order_type },
            ]}
          />
        </div>
      </Box>
    </>
  );
};
