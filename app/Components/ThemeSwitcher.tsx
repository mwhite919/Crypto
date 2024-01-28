"use client";
import {useState, useEffect} from 'react';
import type {NextPage} from 'next';
import { RadioGroup, Switch } from '@headlessui/react';

function useStickyState(
  defaultValue: string | undefined,
  key: string,
): [string | undefined, (v: string) => void] {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    const stickyValue = localStorage.getItem(key);
    if (stickyValue !== null) {
      setValue(stickyValue);
    }
  }, [key, setValue]);

  return [
    value,
    (v) => {
      localStorage.setItem(key, v);
      setValue(v);
    },
  ];
}



const colors = ["green", "red", "blue"];
const modes = ["light", "dark"];


const ThemeSwitcher: NextPage = () => {
  const [color, setColor] = useStickyState(colors[0], 'theme-color');
  const [mode, setMode] = useStickyState(modes[0], 'theme-mode');

  return (
    <div
      className={[
        'bg-primaryBg flex  flex-col justify-center font-mono',
        color && `theme-${color}`,
        mode && `theme-${mode}`,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="bg-neutralBg text-onNeutralBg border-onNeutralBg mx-auto max-w-lg border-8 p-5">
        <h1 className="text-center text-3xl font-bold">Tailwind Themes</h1>
      </div>
      <div className={'...'}>
      <div className="...">
        {/* ... */}
        <RadioGroup value={color} onChange={setColor}>
          <RadioGroup.Label className="mt-5 block">
            Select a color:
          </RadioGroup.Label>
          <div className="mt-2 flex justify-between space-x-8">
            {colors.map((c) => {
              return (
                <RadioGroup.Option
                  className="ui-checked:text-onPrimaryBg ui-checked:bg-primaryBg ui-checked:ring-primary ui-not-checked:ring-onNeutralBg flex h-20 w-full cursor-pointer items-center justify-center font-bold uppercase ring-4"
                  value={c}
                  key={c}
                >
                  {c}
                </RadioGroup.Option>
              );
            })}
          </div>
        </RadioGroup>
      </div>
    </div>
    <div className={'...'}>
      <div className="...">
        {/* ... */}
        <Switch.Group>
          <div className="mt-10">
            <Switch.Label className="block">Enable dark mode:</Switch.Label>
            <Switch
              className="bg-onNeutralBg relative inline-flex h-6 w-11 items-center rounded-full"
              checked={mode === 'dark'}
              onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
            >
              <span className="bg-neutralBg ui-not-checked:translate-x-1 ui-checked:translate-x-6 inline-block h-4 w-4 transform rounded-full transition" />
            </Switch>
          </div>
        </Switch.Group>
      </div>
    </div>
    </div>

    
  );
};

export default ThemeSwitcher;
