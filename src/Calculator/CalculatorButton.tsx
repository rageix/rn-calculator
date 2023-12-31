import { Pressable, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { PropsWithChildren, useState } from 'react';

export interface IProps extends PropsWithChildren {
  label: string;
  onPress: () => void;
  widthClass?: string;
  bgClass?: string;
  bgPressedClass?: string;
  fontColorClass?: string;
  accessibilityHint?: string;
}

const defaultProps: Partial<IProps> = {
  widthClass: 'w-1/4',
  bgClass: 'bg-gray-700',
  bgPressedClass: 'bg-slate-600',
  fontColorClass: 'text-white',
};

export interface IState {
  pressed: boolean;
}

const defaultState: IState = {
  pressed: false,
};

export default function CalculatorButton(props: IProps) {
  const tailwind = useTailwind();

  const [state, updateState] = useState<IState>(defaultState);
  props = { ...defaultProps, ...props };

  function onPressIn() {
    updateState({
      pressed: true,
    });
  }

  function onPressOut() {
    updateState({
      pressed: false,
    });
  }

  return (
    <View
      style={tailwind(
        `flex justify-center items-center h-1/5 px-0.5 py-0.5 ${props.widthClass}`,
      )}
    >
      <Pressable
        accessibilityHint={props.accessibilityHint || props.label}
        style={tailwind(
          `w-full h-full rounded-lg flex justify-center items-center ${
            state.pressed ? props.bgPressedClass : props.bgClass
          }`,
        )}
        onPress={props.onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Text style={tailwind(`${props.fontColorClass} text-3xl`)}>
          {props.label}
        </Text>
      </Pressable>
    </View>
  );
}
