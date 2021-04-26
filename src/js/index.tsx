import React from 'react';
import ReactDom from 'react-dom';
import { App } from './modules/App';
import { Provider } from 'mobx-react';
import { terminalStore } from './core/store/Terminal';
import { configure } from 'mobx';

const stores = {
    terminal: terminalStore,
};

configure({
    enforceActions: 'observed',
    isolateGlobalState: true
});

ReactDom.render(
    <Provider { ...stores }>
        <App terminal={ stores.terminal } />
    </Provider>,
    document.getElementById('root')
);
