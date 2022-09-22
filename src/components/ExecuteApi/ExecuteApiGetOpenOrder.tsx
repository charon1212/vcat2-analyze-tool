import { Button, Box, Typography, IconButton, Paper } from '@mui/material';
import { useState } from 'react';
import { SimpleTable } from '@charon1212/my-lib-react';
import { Vcat2ApiGetOpenOrder, Vcat2ApiGetOpenOrderResponse } from '../../lib/vcat2Api/Vcat2ApiGetOpenOrder';
import CachedIcon from '@mui/icons-material/Cached';

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
      <Box sx={{ padding: '10px' }}>
        <Paper sx={{ padding: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <Typography variant='h5'>open order</Typography>
            </div>
            <div>
              <IconButton onClick={onClickExecute}>
                <CachedIcon />
              </IconButton>
            </div>
          </div>
          <div style={{ width: '500px' }}>
            <SimpleTable
              tableProp={{ size: 'small' }}
              data={openOrders}
              columns={[
                { header: 'time', cell: ({ created_at }) => created_at, sxCell: { padding: '0px', width: 200 } },
                { header: 'pair', cell: ({ pair }) => pair, sxCell: { padding: '0px', width: 100 } },
                { header: 'rate', cell: ({ rate }) => rate, sxCell: { padding: '0px', width: 100 } },
                { header: 'order_type', cell: ({ order_type }) => order_type, sxCell: { padding: '0px', width: 100 } },
              ]}
            />
          </div>
        </Paper>
      </Box>
    </>
  );
};
