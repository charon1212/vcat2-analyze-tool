import { Alert, Button, Box, Typography, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useTextField, useYesNoDialog } from '@charon1212/my-lib-react';
import { Vcat2ApiPostOrderArgs } from '../../lib/vcat2Api/Vcat2ApiPostOrder';
import { validationPostOrderArgs } from './validationPostOrderArgs';

export const ExecuteApiPostOrder = () => {
  const [rate, , propRate] = useTextField('');
  const [amount, , propAmount] = useTextField('');
  const [amountMarketBuy, , propAmountMarketBuy] = useTextField('');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [type, setType] = useState<'limit' | 'market'>('market');

  const args: Vcat2ApiPostOrderArgs = {
    pair: 'btc_jpy',
    side,
    type,
    rate: rate ? +rate : undefined,
    amount: amount ? +amount : undefined,
    amountMarketBuy: amountMarketBuy ? +amountMarketBuy : undefined,
  };

  const validationMessage = validationPostOrderArgs(args);

  const { yesNoDialog, openYesNoDialog } = useYesNoDialog({
    message: `次のリクエストを送信します：${JSON.stringify(args)}`,
    onClickYes: (closeDialog) => {
      alert('送信！');
      closeDialog();
    },
    onClickNo: (closeDialog) => closeDialog(),
  });

  const onClickRequest = () => {
    if (validationMessage){
      alert('バリデーションエラーがあります');
      return;
    }
    openYesNoDialog();
  };

  return (
    <>
      {yesNoDialog}
      <Box sx={{ padding: '30px' }}>
        <div style={{ padding: '10px' }}>
          <Typography variant='h4'>PostOrder</Typography>
        </div>
        <div style={{ padding: '10px' }}>
          {validationMessage ? <Alert severity='error'>{validationMessage}</Alert> : ''}
          <SimpleGridLayout
            rows={[
              { label: 'Side', content: <RadioButtonGroup options={['buy', 'sell']} value={side} setter={setSide} /> },
              { label: 'Type', content: <RadioButtonGroup options={['market', 'limit']} value={type} setter={setType} /> },
              { label: 'Rate', visible: type === 'limit', content: <TextField {...propRate} /> },
              { label: 'Amount', visible: type === 'limit' || side === 'sell', content: <TextField {...propAmount} /> },
              { label: 'AmountMarketBuy', visible: type === 'market' && side === 'buy', content: <TextField {...propAmountMarketBuy} /> },
            ]}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <Button onClick={onClickRequest}>!Request!</Button>
        </div>
      </Box>
    </>
  );
};

const SimpleGridLayout = (props: { rows: { label: string; content: ReactNode; visible?: boolean }[] }) => (
  <Grid container sx={{ width: '500px' }}>
    {props.rows
      .filter(({ visible }) => visible !== false)
      .map(({ label, content }) => (
        <Grid key={label} container sx={{ margin: '5px' }}>
          <Grid item xs={4}>
            {label}
          </Grid>
          <Grid item xs={8}>
            {content}
          </Grid>
        </Grid>
      ))}
  </Grid>
);

const RadioButtonGroup = <T extends string>(props: { options: T[]; value: T; setter: (t: T) => void }) => {
  const { options, value, setter } = props;
  return (
    <FormControl>
      <RadioGroup row value={value} onChange={(e) => setter(e.currentTarget.value as T)}>
        {options.map((op) => (
          <FormControlLabel value={op} control={<Radio />} label={op} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
