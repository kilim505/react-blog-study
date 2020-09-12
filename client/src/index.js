import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import loadUser from './components/auth/loadUser';

loadUser(); // 토큰을 읽어옴

ReactDOM.render(<App />, document.getElementById('root'));
