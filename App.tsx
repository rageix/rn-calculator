import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import MainView from './src/MainView';

export default function App() {
  return (
    <>
      {/* TailwindProvider does not have the proper definitions so ignore. */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore*/}
      <TailwindProvider utilities={utilities}>
        <MainView />
      </TailwindProvider>
    </>
  );
}
