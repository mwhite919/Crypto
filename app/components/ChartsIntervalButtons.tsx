import { RadioGroup } from "@headlessui/react";
import { useCrypto } from "@/app/Providers/CryptoProvider";

export default function ChartsIntervalButtons({
  handleNumberOfDays,
  numberOfDays,
}) {
  const times = [
    { name: "1D", value: "1" },
    { name: "1W", value: "7" },
    { name: "1M", value: "30" },
    { name: "3M", value: "90" },
    { name: "6M", value: "180" },
    { name: "1Y", value: "365" },
    { name: "5Y", value: "1825" },
  ];

  return (
    <div>
      <RadioGroup
        className="flex items-center justify-center my-5"
        value={numberOfDays}
        onChange={handleNumberOfDays}
      >
        {times.map((time) => (
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
            value={time.value}
          >
            {({ checked }) => <span>{time.name}</span>}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
}
