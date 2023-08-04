import { useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultRoutes } from './routes';
import './app.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

function App() {
  const element = useRoutes(defaultRoutes);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='p-8 h-full'>
        <div className='p-8 h-full bg-zinc-600'>
            {element}
        </div>
      </div>
    </QueryClientProvider>
  )

}

export default App;
