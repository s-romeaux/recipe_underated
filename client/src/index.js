import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components'; // Import StyleSheetManager
import App from './App';
import reportWebVitals from './reportWebVitals';

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('root'));
root.render(
  <StyleSheetManager shouldForwardProp={(prop) => !['isOpen'].includes(prop)}> {/* Add StyleSheetManager and shouldForwardProp */}
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </StyleSheetManager>
);

reportWebVitals();
