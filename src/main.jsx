import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoApp from './TodoApp.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <TodoApp />
    </Provider>
  </React.StrictMode>,
)
