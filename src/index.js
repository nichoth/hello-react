var React = require('react');
import ReactDOM from 'react-dom';
import { html } from 'htm/react';

var el = html`<a href="/">Hello!</a>`

ReactDOM.render(el, document.getElementById('content'));
