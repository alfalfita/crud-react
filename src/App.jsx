import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { Routing } from './Routing';

const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClientConfig}>
      <Routing />
    </QueryClientProvider>
  );
}

export default App;
