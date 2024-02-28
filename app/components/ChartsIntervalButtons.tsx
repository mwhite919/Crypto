import { RadioGroup } from "@headlessui/react";
import { useCrypto } from "@/app/Providers/CryptoProvider";

export default function ChartsIntervalButtons() {
  const { numberOfDays, handleNumberOfDays } = useCrypto();
  return (
    <div>
      <RadioGroup
        className="flex items-center justify-center my-5"
        value={numberOfDays}
        onChange={handleNumberOfDays}
      >
        <RadioGroup.Option
          className={({ active, checked }) =>
            `${
              active
                ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 hover:scale-105"
                : ""
            }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 m-1 shadow-md focus:outline-none hover:scale-105`
          }
          value="1"
        >
          {({ checked }) => <span>1D</span>}
        </RadioGroup.Option>
        <RadioGroup.Option
          className={({ active, checked }) =>
            `${
              active
                ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 hover:scale-105"
                : ""
            }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md m-1 focus:outline-none hover:scale-105`
          }
          value="7"
        >
          {({ checked }) => <span>7D</span>}
        </RadioGroup.Option>
        <RadioGroup.Option
          className={({ active, checked }) =>
            `${
              active
                ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 hover:scale-105"
                : ""
            }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md m-1 focus:outline-none hover:scale-105`
          }
          value="14"
        >
          {({ checked }) => <span>14D</span>}
        </RadioGroup.Option>
        <RadioGroup.Option
          className={({ active, checked }) =>
            `${
              active
                ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 hover:scale-105"
                : ""
            }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md m-1 focus:outline-none hover:scale-105`
          }
          value="90"
        >
          {({ checked }) => <span>3M</span>}
        </RadioGroup.Option>
        <RadioGroup.Option
          className={({ active, checked }) =>
            `${
              active
                ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 hover:scale-105"
                : ""
            }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md m-1 focus:outline-none hover:scale-105`
          }
          value="180"
        >
          {({ checked }) => <span>6M</span>}
        </RadioGroup.Option>
        <RadioGroup.Option
          className={({ active, checked }) =>
            `${
              active
                ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 hover:scale-105"
                : ""
            }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md m-1 focus:outline-none hover:scale-105`
          }
          value="365"
        >
          {({ checked }) => <span>1Y</span>}
        </RadioGroup.Option>
        <RadioGroup.Option
          className={({ active, checked }) =>
            `${
              active
                ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 hover:scale-105"
                : ""
            }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md m-1 focus:outline-none hover:scale-105`
          }
          value="1825"
        >
          {({ checked }) => <span>5Y</span>}
        </RadioGroup.Option>
      </RadioGroup>
    </div>
  );
}
