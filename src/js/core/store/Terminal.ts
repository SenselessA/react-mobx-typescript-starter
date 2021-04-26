import { action, makeAutoObservable, observable } from 'mobx';

interface TerminalParams {
    mode: 'default' | 'detectFace' | 'detectError' | 'showResults';
    username: string;
}

type TerminalProperty = keyof TerminalParams;

type StoreSetter = <K extends TerminalProperty>(property: K, value: TerminalParams[K]) => void;

export interface ITerminalStore {
    params: TerminalParams;
    set: StoreSetter;
}

class TerminalStore implements ITerminalStore {
    constructor() {
        makeAutoObservable(this);
    }

    params: TerminalParams = {
        mode: 'default',
        username: ''
    }

    @action set: StoreSetter = (property, value) => this.params[property] = value;
}

export const terminalStore = new TerminalStore();