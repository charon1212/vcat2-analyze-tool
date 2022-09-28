import { IconButton } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { useState } from 'react';

type Props = {
  onClick: (completeUpdate: () => void) => void;
};
export const UpdateIconButton = (props: Props) => {
  const { onClick } = props;
  const [updating, setUpdating] = useState(false);
  const completeUpdate = () => setUpdating(false);

  const handler = () => {
    setUpdating(true);
    onClick(completeUpdate);
  };
  return (
    <>
      <IconButton onClick={handler} disabled={updating}>
        <CachedIcon />
      </IconButton>
    </>
  );
};
