import { ExecuteApiGetOpenOrder } from './ExecuteApiGetOpenOrder';
import { ExecuteApiGetTransaction } from './ExecuteApiGetTransaction';
import { ExecuteApiPostOrder } from './ExecuteApiPostOrder';

export const ExecuteApi = () => {
  return (
    <>
      <div style={{ width: '600px' }}>
        <ExecuteApiPostOrder />
        <ExecuteApiGetTransaction />
        <ExecuteApiGetOpenOrder />
      </div>
    </>
  );
};
