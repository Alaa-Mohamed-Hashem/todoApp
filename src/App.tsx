import React from 'react';

import { Toaster } from "react-hot-toast";
import AppContent from "./components/AppContent";
import AppFooter from "./components/AppFooter";
import PageTitle from "./components/PageTitle";
import classes from './styles/modules/app.module.css';

function App() {
  return (
    <>
      <div className="container">
        <PageTitle>Todo List</PageTitle>
        <div className={classes['app__wrapper']}>
          <AppContent />
          <AppFooter />
        </div>
      </div>
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            fontSize: '1.5rem'
          }
        }} />
    </>
  );
}

export default App;
