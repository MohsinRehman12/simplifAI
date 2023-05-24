import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import {store} from './services/store'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
  <RecoilRoot>

   <Provider store={store}>
    <App />
    </Provider>
    </RecoilRoot>

  </React.StrictMode>,
)
