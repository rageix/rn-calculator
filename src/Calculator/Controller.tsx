import { Dispatch, SetStateAction, useState } from 'react';
import { EAction } from './Enums';
import Decimal from 'decimal.js';

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
    const state: IState = { ...this.state };
    if (state.buffer === '0') {
      state.buffer = '';
    } else if (state.buffer === '-0') {
      state.buffer = '-';
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
    const state: IState = { ...this.state };
    if (!state.action) {
      state.actionClear = true;
    }
    state.action = action;
    this.setState(state);
  };

  onPressDecimal = () => {
    const state: IState = { ...this.state };
    if (state.buffer.indexOf('.') === -1) {
      state.buffer += '.';
    }
    this.setState(state);
  };

  onPressFlip = () => {
    const state: IState = { ...this.state };
    if (state.buffer.substring(0, 1) === '-') {
      state.buffer = state.buffer.substring(1);
    } else {
      state.buffer = '-' + state.buffer;
    }
    this.setState(state);
  };

  onPressEqual = () => {
    if (this.state.actionClear || !this.state.memory) {
      return;
    }

    const state: IState = { ...this.state };
    const memory = new Decimal(state.memory);
    const buffer = new Decimal(state.buffer);
    let total: Decimal;

    switch (state.action) {
      case EAction.Add:
        total = memory.add(buffer);
        break;
      case EAction.Subtract:
        total = memory.minus(buffer);
        break;
      case EAction.Multiply:
        total = memory.times(buffer);
        break;
      case EAction.Divide:
        total = memory.dividedBy(buffer);
        break;
      default:
        return;
    }

    state.buffer = total.toString();
    state.action = null;
    this.setState(state);
  };

  onPressPercent = () => {
    if (!this.state.action) {
      return;
    }

    const state: IState = { ...this.state };
    const memory = new Decimal(state.memory);
    const buffer = new Decimal(state.buffer);
    state.buffer = memory.times(buffer.dividedBy(100)).toString();
    this.setState(state);
  };
}
