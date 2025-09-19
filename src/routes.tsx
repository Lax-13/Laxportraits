import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ServicePage } from './components/pages/ServicePage';
import CaseStudyPage from './components/pages/CaseStudyPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/services/:slug',
    element: <ServicePage />,
  },
  {
    path: '/services/:slug/:location',
    element: <ServicePage />,
  },
  {
    path: '/case-studies/:slug',
    element: <CaseStudyPage />,
  },
]);

export default router;
