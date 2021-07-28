import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { html } from 'htm/react';
var observ = require('observ')
var struct = require('observ-struct')
var Bus = require('@nichoth/events')
var namespace = require('@nichoth/events/namespace')

var evs = namespace({
    inc: ['one'],
    minus: ['one']
})

var bus = Bus({
    memo: true
})

var state = struct({
    count: observ(0)
})

bus.on(evs.inc.one, () => {
    state.count.set(state.count() + 1)
})

bus.on(evs.minus.one, () => {
    state.count.set(state.count() - 1)
})

function App (props) {
    var [_state, setState] = useState(state());
    state(function onChange (newState) {
        setState(newState)
    })
    var emit = bus.emit.bind(bus)

    return html`<div className="app">
        <${Counter} ...${_state} emit=${emit} />
    </div>`
}

function Counter (props) {
    var { emit } = props
    return html`<div className="counter">
        ${props.count}
        <div className="controls">
            <button onClick=${emit(evs.inc.one)}>plus</button>
            <button onClick=${emit(evs.minus.one)}>minus</button>
        </div>
    </div>`
}

ReactDOM.render(html`<${App} />`, document.getElementById('content'));