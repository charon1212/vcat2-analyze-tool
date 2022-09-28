import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { MyDate } from 'util-charon1212/build/main/MyDate';

type Span = { timespan: number; thinSize: number };
type Props = {
  onSelect?: (span: Span) => void;
};

const spanList = [
  { value: '10m', span: { timespan: 10 * MyDate.ms1m, thinSize: 1 } },
  { value: '1h', span: { timespan: 1 * MyDate.ms1h, thinSize: 1 } },
  { value: '6h', span: { timespan: 6 * MyDate.ms1h, thinSize: 6 } },
  { value: '24h', span: { timespan: 24 * MyDate.ms1h, thinSize: 24 } },
];

export const SpanSelector = (props: Props) => {
  const { onSelect } = props;
  const [value, setValue] = useState('1h');
  return (
    <>
      <div style={{ display: 'flex' }}>
        <ToggleButtonGroup
          color='primary'
          exclusive
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
            const span = spanList.find((s) => s.value === newValue)?.span;
            if (onSelect && span) onSelect(span);
          }}
        >
          {spanList.map(({ value }) => (
            <ToggleButton value={value}>{value}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </>
  );
};
