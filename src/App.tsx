import React from 'react';
import './App.css';
import News from './components/News/index'
import {Provider} from 'react-redux'
import  store  from './store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <News/>
    </div>
    </Provider>
  );
}

export default App;
