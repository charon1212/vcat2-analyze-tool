import { Box, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { SimpleTable } from '@charon1212/my-lib-react';
import { Vcat2ApiGetOpenOrder, Vcat2ApiGetOpenOrderResponse } from '../../lib/vcat2Api/Vcat2ApiGetOpenOrder';
import { UpdateIconButton } from './UpdateIconButton';

type OpenOrder = Vcat2ApiGetOpenOrderResponse['orders'][number];

export const ExecuteApiGetOpenOrder = () => {
  const [openOrders, setOpenOrders] = useState<OpenOrder[]>([]);

  const updateOpenOrder = () =>
    Vcat2ApiGetOpenOrder.request({})
      .then((response) => {
        if (response.success) {
          setOpenOrders(response.data.orders);
        } else {
          alert(`API通信でエラー: [${response.message.join('],[')}]`);
        }
      })
      .catch((err) => {
        alert('API通信に失敗');
        console.error(err);
      });

  useEffect(() => {
    updateOpenOrder();
  }, []);

  const updateButton = (
    <UpdateIconButton
      onClick={(completeUpdate) => {
        updateOpenOrder().finally(() => {
          completeUpdate();
        });
      }}
    />
  );

  return (
    <>
      <Box sx={{ padding: '10px' }}>
        <Paper sx={{ padding: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <Typography variant='h5'>open order</Typography>
            </div>
            <div>{updateButton}</div>
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
