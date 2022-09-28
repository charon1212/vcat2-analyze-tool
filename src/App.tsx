import { Button } from '@mui/material';
import { Auth } from './components/Auth';
import { ExecuteApi } from './components/ExecuteApi/ExecuteApi';
import { PriceGraph } from './components/PriceGraph/PriceGraph';
import { Vcat2ApiGetPriceHistory } from './lib/vcat2Api/Vcat2ApiGetPriceHistory';

export const App = () => {
  return (
    <>
      <div>
        <Auth>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
              <h1>VCAT2 Analyze Tool</h1>
              <PriceGraph />
            </div>
            <ExecuteApi />
          </div>
        </Auth>
      </div>
    </>
  );
};
