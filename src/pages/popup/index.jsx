import ReactDOM from 'react-dom';
import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';

ReactDOM.render(<Popup />, window.document.querySelector('#root'));

if (module.hot) module.hot.accept();
