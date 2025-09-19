import { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Theme } from './settings/types';
import { PhotographyLandingPage } from './components/generated/PhotographyLandingPage';
import { ServicePage } from './components/pages/ServicePage';

let theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'none';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const generatedComponent = useMemo(() => {
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    return <PhotographyLandingPage />;
  }, []);

  const content = container === 'centered' ? (
    <div className="h-full w-full flex flex-col items-center justify-center">{generatedComponent}</div>
  ) : (
    generatedComponent
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Routes>
        <Route path="/" element={content} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
