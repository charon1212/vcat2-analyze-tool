import { Auth } from './components/Auth';
import { ExecuteApi } from './components/ExecuteApi/ExecuteApi';

export const App = () => {
  return (
    <>
      <div>
        <Auth>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
              <h1>VCAT2 Analyze Tool</h1>
            </div>
            <ExecuteApi />
          </div>
        </Auth>
      </div>
    </>
  );
};
