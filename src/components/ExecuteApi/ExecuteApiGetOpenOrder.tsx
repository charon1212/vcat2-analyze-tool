import { Box, Typography, Paper, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { SimpleTable, useYesNoDialog } from '@charon1212/my-lib-react';
import { Vcat2ApiGetOpenOrder, Vcat2ApiGetOpenOrderResponse } from '../../lib/vcat2Api/Vcat2ApiGetOpenOrder';
import { UpdateIconButton } from './UpdateIconButton';
import { Vcat2ApiDeleteOrder } from '../../lib/vcat2Api/Vcat2ApiDeleteOrder';

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

  const cancelOrder = (id: number) => {
    return Vcat2ApiDeleteOrder.request({ id })
      .then((response) => {
        if (response.success) {
          alert(`キャンセル成功。`);
        } else {
          alert(`API通信でエラー: [${response.message.join('],[')}]`);
        }
      })
      .catch((err) => {
        alert('API通信に失敗');
        console.error(err);
      });
  };

  const { yesNoDialog, openYesNoDialog } = useYesNoDialog<{ id: number }>({
    title: '注文キャンセル',
    message: '注文をキャンセルします。',
    onClickYes: (c, { id }) => {
      cancelOrder(id).finally(() => c());
    },
    onClickNo: (c) => c(),
  });

  return (
    <>
      {yesNoDialog}
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
                { header: 'pair', cell: ({ pair }) => pair, sxCell: { padding: '0px', width: 70 } },
                { header: 'rate', cell: ({ rate }) => rate, sxCell: { padding: '0px', width: 100 } },
                { header: 'type', cell: ({ order_type }) => order_type, sxCell: { padding: '0px', width: 60 } },
                {
                  header: 'cancel',
                  cell: ({ id }) => (
                    <>
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          openYesNoDialog({ id });
                        }}
                        href='#'
                      >
                        cancel
                      </Link>
                    </>
                  ),
                  sxCell: { padding: '0px', width: 70 },
                },
              ]}
            />
          </div>
        </Paper>
      </Box>
    </>
  );
};
