import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Vcat2ApiGetBalance } from '../../lib/vcat2Api/Vcat2ApiGetBalance';
import { UpdateIconButton } from './UpdateIconButton';

type Balance = {
  jpy: number;
  btc: number;
};
type Props = {};
export const ExecuteApiGetBalance = (props: Props) => {
  const {} = props;

  const [balance, setBalance] = useState<Balance | undefined>({ jpy: 0, btc: 0 });

  const updateBalance = () =>
    Vcat2ApiGetBalance.request({})
      .then((response) => {
        if (response.success) {
          const { jpy, btc } = response.data;
          setBalance({ jpy: +jpy, btc: +btc });
        } else {
          alert(`API通信でエラー: [${response.message.join('],[')}]`);
        }
      })
      .catch((err) => {
        alert('API通信に失敗');
        console.error(err);
      });

  useEffect(() => {
    updateBalance();
  }, []);

  const updateButton = (
    <UpdateIconButton
      onClick={(completeUpdate) => {
        updateBalance().finally(() => {
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
              <Typography variant='h5'>Balance</Typography>
            </div>
            <div>{updateButton}</div>
          </div>
          <div style={{ width: '300px', marginLeft: '40px' }}>
            <div>jpy: {balance?.jpy ?? '-'}</div>
            <div>btc: {balance?.btc ?? '-'}</div>
          </div>
        </Paper>
      </Box>
    </>
  );
};
