import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'

const AppLayout = () => {
  return (
    <div className=' h-full w-[100%]'>
      <App />
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppLayout />
);

