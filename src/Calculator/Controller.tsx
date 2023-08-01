import React, { Dispatch, SetStateAction, useState } from 'react';
import { EAction } from './enums';

interface IState {
  total: number;
  buffer: string;
  memory: string;
  action: EAction;
  actionClear: boolean;
}

const defaultState: IState = {
  total: 0,
  buffer: '0',
  memory: '',
  action: null,
  actionClear: false,
};

export default class CalculatorController {
  state: IState;
  updateState: Dispatch<SetStateAction<IState>>;

  onRender = () => {
    [this.state, this.updateState] = useState<IState>(defaultState);
  };

  setState = (state: IState) => {
    this.updateState(state);
  };

  onPressClear = () => {
    this.setState(defaultState);
  };

  onPressKey = (val: number) => {
    let state: IState = { ...this.state };
    if (state.buffer === '0') {
      state.buffer = '';
    }
    if (state.actionClear) {
      state.memory = state.buffer;
      state.buffer = '';
      state.actionClear = false;
    }
    state.buffer += val.toString();
    this.setState(state);
  };

  onPressAction = (action: EAction) => {
    let state: IState = { ...this.state };
    if (!state.action) {
      state.actionClear = true;
    }
    state.action = action;
    this.setState(state);
  };

  onPressDecimal = () => {
    let state: IState = { ...this.state };
    if (state.buffer.indexOf('.') === -1) {
      state.buffer += '.';
    }
    this.setState(state);
  };

  onPressFlip = () => {
    let state: IState = { ...this.state };
    if (state.buffer.substring(0, 1) === '-') {
      state.buffer = state.buffer.substring(1);
    } else {
      state.buffer = '-' + state.buffer;
    }
    this.setState(state);
  };

  onPressEqual = () => {
    if(this.state.actionClear) {
      return;
    }

    let state: IState = { ...this.state };
    let memory = parseFloat(state.memory);
    let buffer = parseFloat(state.buffer);
    let total: number;

    switch (state.action) {
      case EAction.Add:
        total = memory + buffer;
        break;
      case EAction.Subtract:
        total = memory - buffer;
        break;
      case EAction.Multiply:
        total = memory * buffer;
        break;
      case EAction.Divide:
        total = memory / buffer;
        break;
      default:
        return;
    }

    state.buffer = String(total);
    state.action = null;
    this.setState(state);
  };

  onPressPercent = () => {
    let state: IState = { ...this.state };
    let memory = parseFloat(state.memory);
    let buffer = parseFloat(state.buffer);
    state.buffer = String(memory * (buffer / 100));
    this.setState(state);
  };

}
