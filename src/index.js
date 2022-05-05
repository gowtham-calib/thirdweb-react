import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      desiredChainId={ChainId.Mumbai}
      sdkOptions={{
        gasSettings: { maxPriceInGwei: 500, speed: "fast" },
        readonlySettings: {
          chainId: ChainId.Mumbai,
          rpcUrl: "https://rpc-mumbai.maticvigil.com",
        },
      }}
    >
      <App />
    </ThirdwebProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
