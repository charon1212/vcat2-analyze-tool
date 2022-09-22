import { Auth } from './components/Auth';
import { ExecuteApiGetTransaction } from './components/ExecuteApi/ExecuteApiGetTransaction';
import { TabComponent } from '@charon1212/my-lib-react';
import { ExecuteApiGetOpenOrder } from './components/ExecuteApi/ExecuteApiGetOpenOrder';
import { ExecuteApiPostOrder } from './components/ExecuteApi/ExecuteApiPostOrder';

export const App = () => {
  return (
    <>
      <div>
        <Auth>
          <h1>VCAT2 Analyze Tool</h1>
          <TabComponent
            tabs={[
              { tabTitle: 'get-transaction', children: <ExecuteApiGetTransaction /> },
              { tabTitle: 'get-open-order', children: <ExecuteApiGetOpenOrder /> },
              { tabTitle: 'post-order', children: <ExecuteApiPostOrder /> },
            ]}
          />
        </Auth>
      </div>
    </>
  );
};
