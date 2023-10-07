import React, { useEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';

import AnswersPage from './pages/AnswersPage';
import PreviewPage from './pages/PreviewPage';
import NotFoundPage from './pages/NotFoundPage';

import styles from './WebApp.module.css';

const router = createHashRouter([
  {
    path: '/',
    element: <AnswersPage />,
  },
  {
    path: '/preview/:id',
    element: <PreviewPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const WebApp = () => {
  const WebApp = useWebApp();

  useEffect(() => {
    /**
     * https://core.telegram.org/bots/webapps#themeparams
     */
    WebApp.setHeaderColor('secondary_bg_color');
    WebApp.setBackgroundColor('secondary_bg_color');
  }, [WebApp]);

  return (
    <div className={styles.wrapper}>
      <RouterProvider router={router} />
    </div>
  );
};

export default WebApp;
