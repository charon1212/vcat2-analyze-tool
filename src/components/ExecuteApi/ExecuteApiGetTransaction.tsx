import { Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Vcat2ApiGetTransaction, Vcat2ApiGetTransactionResponse } from '../../lib/vcat2Api/Vcat2ApiGetTransaction';
import { SimpleTable } from '@charon1212/my-lib-react';

type Transaction = Vcat2ApiGetTransactionResponse['transactions'][number];

export const ExecuteApiGetTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const onClickExecute = () => {
    Vcat2ApiGetTransaction.request({}).then((response) => {
      if (response.success) {
        setTransactions(response.data.transactions);
      } else {
        alert(`API通信でエラー: [${response.message.join('],[')}]`);
      }
    });
  };

  const c = (side: 'buy' | 'sell') => ({ backgroundColor: side === 'buy' ? '#ffe0f8' : '#e0f8ff' });

  return (
    <>
      <Box sx={{ padding: '30px' }}>
        <div>
          <Typography variant='h4'>GetTransaction</Typography>
          <Button onClick={onClickExecute}>Execute API</Button>
        </div>
        <div style={{ width: '560px' }}>
          <SimpleTable
            tableProp={{ size: 'small' }}
            data={transactions}
            columns={[
              { header: 'time', cell: ({ side, created_at }) => <div style={{ ...c(side) }}>{created_at}</div>, sxCell: { padding: '0px', width: 200 } },
              { header: 'btc', cell: ({ side, funds: { btc } }) => <div style={{ ...c(side) }}>{btc}</div>, sxCell: { padding: '0px', width: 120 } },
              { header: 'pair', cell: ({ side, pair }) => <div style={{ ...c(side) }}>{pair}</div>, sxCell: { padding: '0px', width: 70 } },
              { header: 'rate', cell: ({ side, rate }) => <div style={{ ...c(side) }}>{rate}</div>, sxCell: { padding: '0px', width: 100 } },
              { header: 'side', cell: ({ side }) => <div style={{ ...c(side) }}>{side}</div>, sxCell: { padding: '0px', width: 70 } },
            ]}
          />
        </div>
      </Box>
    </>
  );
};
