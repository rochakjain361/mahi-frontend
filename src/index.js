import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './css/index.css'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import { store } from './store'

import firebase from 'firebase/app'
import 'firebase/auth'

import { get_firebase_config } from './configurations/firebase_config'

const firebaseConfig = get_firebase_config()
firebase.initializeApp(firebaseConfig)

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
