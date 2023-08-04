import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import zhCN from 'antd/locale/zh_CN';

const container = document.getElementById('root');
const root = createRoot(container as HTMLDivElement);

root.render(
    <BrowserRouter
      // 生产环境配置二级路径
      basename={'/' + import.meta.env.BASE_URL.replaceAll('/', '')}
    >
      <ConfigProvider locale={zhCN} >
        <App />
      </ConfigProvider>
    </BrowserRouter>
);
