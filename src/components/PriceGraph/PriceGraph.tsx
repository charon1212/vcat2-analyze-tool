import { useTextField } from '@charon1212/my-lib-react';
import { Button, TextField, TextFieldProps, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { MyDate } from 'util-charon1212/build/main/MyDate';
import { Vcat2ApiGetPriceHistory } from '../../lib/vcat2Api/Vcat2ApiGetPriceHistory';
import { UpdateIconButton } from '../ExecuteApi/UpdateIconButton';
import { LineChart } from './LineChart';
import { SpanSelector } from './SpanSelector';

export const PriceGraph = () => {
  const [timespan, setTimespan] = useState(MyDate.ms1h);
  const [thinSize, setThinSize] = useState(1);
  const [textFieldLastTimestamp, textLastTimestamp, setTextLastTimestamp] = useScrollNumberField(MyDate.ms1m, `${Date.now()}`, { label: 'last' });
  const [numLastTimestamp, setNumLastTimestamp] = useState(Date.now());
  const [fixYAxis, setFixYAxis] = useState(true);
  const { priceList, updatePriceList, minPrice, maxPrice } = usePriceList();

  const updateButton = (
    <UpdateIconButton
      onClick={(updated) => {
        if (isNaN(+textLastTimestamp)) return alert('lastが数値ではありません。');
        setNumLastTimestamp(+textLastTimestamp);
        updatePriceList(+textLastTimestamp).finally(() => updated());
      }}
    />
  );

  const displayPriceList = useMemo(() => {
    console.log(timespan, thinSize, priceList);
    return priceList.filter(({ timestamp }) => timestamp % (thinSize * 10000) === 0 && timestamp >= numLastTimestamp - timespan);
  }, [timespan, thinSize, priceList]);

  const localeStringLastTimestamp = isNaN(+textLastTimestamp) ? '' : new Date(+textLastTimestamp).toLocaleString();

  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Typography variant='h4'>PriceHistory</Typography>
          </div>
          <div style={{ margin: '0 10px 0' }}>{updateButton}</div>
          <div style={{ margin: '0 10px 0' }}>{textFieldLastTimestamp}</div>
          <div style={{ margin: '0 10px 0' }}>
            <Button onClick={() => setTextLastTimestamp(`${Date.now()}`)} variant='contained'>
              Now
            </Button>
          </div>
          <div style={{ margin: '0 10px 0' }}>{localeStringLastTimestamp}</div>
          <div style={{ margin: '0 10px 0' }}>
            <SpanSelector
              onSelect={({ timespan, thinSize }) => {
                setTimespan(timespan);
                setThinSize(thinSize);
              }}
            />
          </div>
        </div>
        <div style={{ margin: '10px' }}></div>
        <div>
          <LineChart
            height={500}
            width={1000}
            priceHistory={displayPriceList}
            ymin={fixYAxis ? minPrice : undefined}
            ymax={fixYAxis ? maxPrice : undefined}
          />
        </div>
      </div>
    </>
  );
};

const usePriceList = () => {
  const [priceList, setPriceList] = useState<{ timestamp: number; price: number }[]>([]);
  const [minPrice, setMin] = useState(0);
  const [maxPrice, setMax] = useState(5);
  const updatePriceList = async (lastTimestamp: number) => {
    const startTimestamp = lastTimestamp - MyDate.ms1d;
    Vcat2ApiGetPriceHistory.request({ startTimestamp, lastTimestamp })
      .then((res) => {
        if (res.success) {
          setPriceList(res.data.priceList);
          const priceList = res.data.priceList.map(({ price }) => price);
          setMin(Math.min(...priceList));
          setMax(Math.max(...priceList));
        } else {
          alert(`GetPriceHistoryAPIリクエスト失敗: message=${JSON.stringify(res.message)}`);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('GetPriceHistoryAPIリクエスト失敗');
      });
  };

  return { priceList, updatePriceList, minPrice, maxPrice };
};

const useScrollNumberField = (delta: number, initValue: string, textFieldProp?: TextFieldProps) => {
  const [value, setValue, prop] = useTextField(initValue);
  const textField = (
    <TextField
      {...prop}
      {...textFieldProp}
      onWheel={(e) => {
        if (isNaN(+value)) return;
        const d = e.deltaY / Math.abs(e.deltaY);
        setValue((pre) => `${+pre - d * delta}`);
      }}
    />
  );
  return [textField, value, setValue] as const;
};
