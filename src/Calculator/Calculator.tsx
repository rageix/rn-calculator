import { Platform, SafeAreaView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import CalculatorButton, { IProps as IButtonProps } from './CalculatorButton';
import Controller from './Controller';
import { EAction } from './Enums';

let controller: Controller;

const ACTION_BUTTON_BACKGROUND = 'bg-amber-600';
const ACTION_BUTTON_PRESS_BACKGROUND = 'bg-amber-500';
const ACTION_BUTTON_ACTIVE_BACKGROUND = 'bg-amber-200';
const ACTION_BUTTON_ACTIVE_PRESS_BACKGROUND = 'bg-amber-500';
const ACTION_BUTTON_ACTIVE_TEXT_COLOR = 'text-amber-500';
const ACTION_BUTTON_TEXT_COLOR = 'text-white';
const OTHER_BUTTON_BACKGROUND = 'bg-gray-400';
const OTHER_BUTTON_PRESS_BACKGROUND = 'bg-gray-300';
const OTHER_BUTTON_TEXT_COLOR = 'text-gray-900';

const OTHER_BUTTON_PROPS: Partial<IButtonProps> = {
  bgClass: OTHER_BUTTON_BACKGROUND,
  bgPressedClass: OTHER_BUTTON_PRESS_BACKGROUND,
  fontColorClass: OTHER_BUTTON_TEXT_COLOR,
};

function actionButtonProps(
  action: EAction,
  currentAction: EAction,
): Partial<IButtonProps> {
  if (action === currentAction) {
    return {
      bgClass: ACTION_BUTTON_ACTIVE_BACKGROUND,
      bgPressedClass: ACTION_BUTTON_ACTIVE_PRESS_BACKGROUND,
      fontColorClass: ACTION_BUTTON_ACTIVE_TEXT_COLOR,
    };
  }
  return {
    bgClass: ACTION_BUTTON_BACKGROUND,
    bgPressedClass: ACTION_BUTTON_PRESS_BACKGROUND,
    fontColorClass: ACTION_BUTTON_TEXT_COLOR,
  };
}

export default function Calculator() {
  const tailwind = useTailwind();

  if (!controller) {
    controller = new Controller();
  }

  controller.onRender();
  const state = controller.state;

  return (
    <SafeAreaView
      style={tailwind(
        `max-w-xl h-full w-full mx-auto ${
          Platform.OS !== 'web' ? 'bg-slate-950' : ''
        }`,
      )}
    >
      <View style={tailwind('h-full w-full bg-slate-950')}>
        <View style={tailwind('h-1/3 flex justify-end px-5')}>
          <Text
            style={tailwind('w-full text-right text-white text-8xl')}
            adjustsFontSizeToFit={true}
            accessibilityHint="display"
          >
            {state.buffer}
          </Text>
        </View>
        <View style={tailwind('h-2/3 flex flex-row justify-evenly flex-wrap')}>
          <View
            style={tailwind(
              'h-full flex flex-row justify-evenly flex-wrap px-0.5 w-full max-w-full',
            )}
          >
            <CalculatorButton
              label="C"
              accessibilityHint="clear"
              onPress={controller.onPressClear}
              {...OTHER_BUTTON_PROPS}
            />
            <CalculatorButton
              label="+/-"
              accessibilityHint="flip positive / negative"
              onPress={controller.onPressFlip}
              {...OTHER_BUTTON_PROPS}
            />
            <CalculatorButton
              label="%"
              accessibilityHint="percent"
              onPress={controller.onPressPercent}
              {...OTHER_BUTTON_PROPS}
            />
            <CalculatorButton
              label="/"
              accessibilityHint="divide"
              onPress={() => controller.onPressAction(EAction.Divide)}
              {...actionButtonProps(EAction.Divide, state.action)}
            />
            <CalculatorButton
              label="7"
              onPress={() => controller.onPressKey(7)}
            />
            <CalculatorButton
              label="8"
              onPress={() => controller.onPressKey(8)}
            />
            <CalculatorButton
              label="9"
              onPress={() => controller.onPressKey(9)}
            />
            <CalculatorButton
              label="x"
              accessibilityHint="multiply"
              onPress={() => controller.onPressAction(EAction.Multiply)}
              {...actionButtonProps(EAction.Multiply, state.action)}
            />
            <CalculatorButton
              label="4"
              onPress={() => controller.onPressKey(4)}
            />
            <CalculatorButton
              label="5"
              onPress={() => controller.onPressKey(5)}
            />
            <CalculatorButton
              label="6"
              onPress={() => controller.onPressKey(6)}
            />
            <CalculatorButton
              label="-"
              accessibilityHint="subtract"
              onPress={() => controller.onPressAction(EAction.Subtract)}
              {...actionButtonProps(EAction.Subtract, state.action)}
            />
            <CalculatorButton
              label="1"
              onPress={() => controller.onPressKey(1)}
            />
            <CalculatorButton
              label="2"
              onPress={() => controller.onPressKey(2)}
            />
            <CalculatorButton
              label="3"
              onPress={() => controller.onPressKey(3)}
            />
            <CalculatorButton
              label="+"
              accessibilityHint="add"
              onPress={() => controller.onPressAction(EAction.Add)}
              {...actionButtonProps(EAction.Add, state.action)}
            />
            <CalculatorButton
              label="0"
              onPress={() => controller.onPressKey(0)}
              widthClass="w-1/2"
            />
            <CalculatorButton
              label="."
              accessibilityHint="decimal point"
              onPress={controller.onPressDecimal}
            />
            <CalculatorButton
              label="="
              accessibilityHint="equals"
              onPress={controller.onPressEqual}
              bgClass={ACTION_BUTTON_BACKGROUND}
              bgPressedClass={ACTION_BUTTON_PRESS_BACKGROUND}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
