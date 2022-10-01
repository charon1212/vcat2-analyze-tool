import { Box, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { Vcat2ApiGetTransaction, Vcat2ApiGetTransactionResponse } from '../../lib/vcat2Api/Vcat2ApiGetTransaction';
import { SimpleTable } from '@charon1212/my-lib-react';
import { UpdateIconButton } from './UpdateIconButton';

type Transaction = Vcat2ApiGetTransactionResponse['transactions'][number];

export const ExecuteApiGetTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const updateTransaction = () =>
    Vcat2ApiGetTransaction.request({})
      .then((response) => {
        if (response.success) {
          setTransactions(response.data.transactions.filter((_, i) => i < 10));
        } else {
          alert(`API通信でエラー: [${response.message.join('],[')}]`);
        }
      })
      .catch((err) => {
        alert('API通信に失敗');
        console.error(err);
      });

  useEffect(() => {
    updateTransaction();
  }, []);

  const updateButton = (
    <UpdateIconButton
      onClick={(completeUpdate) => {
        updateTransaction().finally(() => {
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
              <Typography variant='h5'>transaction</Typography>
            </div>
            <div>{updateButton}</div>
          </div>
          <div style={{ width: '500px' }}>
            <SimpleTable
              tableProp={{ size: 'small' }}
              data={transactions}
              columns={[
                {
                  header: 'time',
                  cell: ({ side, created_at }) => <div style={{ ...c(side) }}>{created_at}</div>,
                  sxCell: { padding: '0px', width: 200 },
                },
                {
                  header: 'amount',
                  cell: ({ side, funds: { btc } }) => <div style={{ ...c(side) }}>{f(+btc)}</div>,
                  sxCell: { padding: '0px', width: 80 },
                },
                { header: 'pair', cell: ({ side, pair }) => <div style={{ ...c(side) }}>{pair}</div>, sxCell: { padding: '0px', width: 70 } },
                { header: 'rate', cell: ({ side, rate }) => <div style={{ ...c(side) }}>{rate}</div>, sxCell: { padding: '0px', width: 100 } },
                { header: 'side', cell: ({ side }) => <div style={{ ...c(side) }}>{side}</div>, sxCell: { padding: '0px', width: 50 } },
              ]}
            />
          </div>
        </Paper>
      </Box>
    </>
  );
};

const c = (side: 'buy' | 'sell') => ({ backgroundColor: side === 'buy' ? '#ffe0ff' : '#e0ffff' });

const f = (x: number) => Math.round(x * 10000) / 10000;
