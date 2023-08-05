import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { BooksApp } from './BooksApp'
import { store } from './store';
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> BrowserRouter o hasRouter */} 
        <HashRouter>
          <BooksApp />
        </HashRouter>
      {/* </BrowserRouter> */}
    </Provider>
  </React.StrictMode>
)
