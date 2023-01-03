import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import initial from './initial';


const rootElement = document.getElementById('root');
if (rootElement) {
   const root = ReactDOM.createRoot(rootElement);
   root.render(<App initialData={initial}/>);
}

