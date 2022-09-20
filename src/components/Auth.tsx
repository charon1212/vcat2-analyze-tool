import { Button, TextField } from '@mui/material';
import { ReactNode, useState } from 'react';

type Props = { children: ReactNode };
export const Auth = (props: Props) => {
  const { children } = props;
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  const authorization = () => {
    if (password === process.env['REACT_APP_PASSWORD']) setIsAuth(true);
  };

  const AuthComponent = (
    <>
      <h1>認証：</h1>
      <div>
        <TextField label='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <Button onClick={authorization}>認証</Button>
      </div>
    </>
  );

  return <>{isAuth ? children : AuthComponent}</>;
};
