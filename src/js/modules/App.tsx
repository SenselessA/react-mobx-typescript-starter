import React from 'react';
import { inject, observer } from 'mobx-react';
import { ITerminalStore } from '../core/store/Terminal';

type Props = {
    terminal: ITerminalStore
}

const AppComponent: React.FC<Props> = ({ terminal }) => {
    return (
        <>
            <div>{ terminal.params.mode }</div>
            <button onClick={ () => terminal.set('mode', 'detectFace') } />
        </>
    );
};

export const App = inject('terminal')(observer(AppComponent));