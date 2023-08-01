import { fireEvent, render, screen } from '@testing-library/react-native';
import Calculator from './Calculator';

test('test all buttons', () => {
  render(<Calculator />);

  const button1 = screen.getByAccessibilityHint('1');
  const button2 = screen.getByAccessibilityHint('2');
  const button3 = screen.getByAccessibilityHint('3');
  const button4 = screen.getByAccessibilityHint('4');
  const button5 = screen.getByAccessibilityHint('5');
  const button6 = screen.getByAccessibilityHint('6');
  const button7 = screen.getByAccessibilityHint('7');
  const button8 = screen.getByAccessibilityHint('8');
  const button9 = screen.getByAccessibilityHint('9');
  const button0 = screen.getByAccessibilityHint('0');
  const display = screen.getByAccessibilityHint('display');

  fireEvent.press(button1);
  fireEvent.press(button2);
  fireEvent.press(button3);
  fireEvent.press(button4);
  fireEvent.press(button5);
  fireEvent.press(button6);
  fireEvent.press(button7);
  fireEvent.press(button8);
  fireEvent.press(button9);
  fireEvent.press(button0);

  expect(display).toHaveTextContent('1234567890');
});

test('test add', () => {
  render(<Calculator />);

  const button1 = screen.getByAccessibilityHint('1');
  const button0 = screen.getByAccessibilityHint('0');
  const button5 = screen.getByAccessibilityHint('5');
  const display = screen.getByAccessibilityHint('display');
  const buttonAdd = screen.getByAccessibilityHint('add');
  const buttonEquals = screen.getByAccessibilityHint('equals');

  fireEvent.press(button1);
  fireEvent.press(button0);
  fireEvent.press(buttonAdd);
  fireEvent.press(button5);
  fireEvent.press(buttonEquals);

  expect(display).toHaveTextContent('15');
});

test('test subtract', () => {
  render(<Calculator />);

  const button2 = screen.getByAccessibilityHint('2');
  const button7 = screen.getByAccessibilityHint('7');
  const button3 = screen.getByAccessibilityHint('3');
  const display = screen.getByAccessibilityHint('display');
  const buttonSubtract = screen.getByAccessibilityHint('subtract');
  const buttonEquals = screen.getByAccessibilityHint('equals');

  fireEvent.press(button2);
  fireEvent.press(button7);
  fireEvent.press(buttonSubtract);
  fireEvent.press(button3);
  fireEvent.press(buttonEquals);

  expect(display).toHaveTextContent('24');
});

test('test multiply', () => {
  render(<Calculator />);

  const button1 = screen.getByAccessibilityHint('1');
  const button6 = screen.getByAccessibilityHint('6');
  const button4 = screen.getByAccessibilityHint('4');
  const display = screen.getByAccessibilityHint('display');
  const buttonMultiply = screen.getByAccessibilityHint('multiply');
  const buttonEquals = screen.getByAccessibilityHint('equals');

  fireEvent.press(button1);
  fireEvent.press(button6);
  fireEvent.press(buttonMultiply);
  fireEvent.press(button4);
  fireEvent.press(buttonEquals);

  expect(display).toHaveTextContent('64');
});

test('test divide', () => {
  render(<Calculator />);

  const button1 = screen.getByAccessibilityHint('1');
  const button9 = screen.getByAccessibilityHint('9');
  const button0 = screen.getByAccessibilityHint('0');
  const display = screen.getByAccessibilityHint('display');
  const buttonDivide = screen.getByAccessibilityHint('divide');
  const buttonEquals = screen.getByAccessibilityHint('equals');

  fireEvent.press(button9);
  fireEvent.press(button0);
  fireEvent.press(buttonDivide);
  fireEvent.press(button1);
  fireEvent.press(button0);
  fireEvent.press(buttonEquals);

  expect(display).toHaveTextContent('9');
});

test('test percent', () => {
  render(<Calculator />);

  const button1 = screen.getByAccessibilityHint('1');
  const button0 = screen.getByAccessibilityHint('0');
  const button7 = screen.getByAccessibilityHint('7');
  const button9 = screen.getByAccessibilityHint('9');
  const button8 = screen.getByAccessibilityHint('8');
  const display = screen.getByAccessibilityHint('display');
  const buttonPercent = screen.getByAccessibilityHint('percent');
  const buttonAdd = screen.getByAccessibilityHint('add');
  const buttonEquals = screen.getByAccessibilityHint('equals');
  const buttonClear = screen.getByAccessibilityHint('clear');

  fireEvent.press(button1);
  fireEvent.press(button0);
  fireEvent.press(button0);
  fireEvent.press(buttonAdd);
  fireEvent.press(button1);
  fireEvent.press(button0);
  fireEvent.press(buttonPercent);
  fireEvent.press(buttonEquals);

  expect(display).toHaveTextContent('110');

  fireEvent.press(buttonClear);
  fireEvent.press(button7);
  fireEvent.press(button9);
  fireEvent.press(button8);
  fireEvent.press(buttonAdd);
  fireEvent.press(button1);
  fireEvent.press(button0);
  fireEvent.press(buttonPercent);

  expect(display).toHaveTextContent('79.8');
});

test('test clear', () => {
  render(<Calculator />);

  const button1 = screen.getByAccessibilityHint('1');
  const button0 = screen.getByAccessibilityHint('0');
  const display = screen.getByAccessibilityHint('display');
  const buttonPercent = screen.getByAccessibilityHint('percent');
  const buttonAdd = screen.getByAccessibilityHint('add');
  const buttonEquals = screen.getByAccessibilityHint('equals');
  const buttonClear = screen.getByAccessibilityHint('clear');

  fireEvent.press(button1);
  fireEvent.press(button0);
  fireEvent.press(button0);
  fireEvent.press(buttonAdd);
  fireEvent.press(button1);
  fireEvent.press(button0);
  fireEvent.press(buttonPercent);
  fireEvent.press(buttonEquals);
  fireEvent.press(buttonClear);

  expect(display).toHaveTextContent('0');

  fireEvent.press(buttonEquals);

  expect(display).toHaveTextContent('0');
});

test('test flip', () => {
  render(<Calculator />);

  const button1 = screen.getByAccessibilityHint('1');
  const button0 = screen.getByAccessibilityHint('0');
  const display = screen.getByAccessibilityHint('display');
  const buttonFlip = screen.getByAccessibilityHint('flip positive / negative');

  fireEvent.press(buttonFlip);

  expect(display).toHaveTextContent('-0');

  fireEvent.press(button1);
  fireEvent.press(button0);

  expect(display).toHaveTextContent('-10');

  fireEvent.press(buttonFlip);

  expect(display).toHaveTextContent('10');
});
