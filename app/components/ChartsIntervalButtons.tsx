import { RadioGroup } from "@headlessui/react";
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
            key={time.value}
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-accent2-300 hover:scale-105"
                  : ""
              }
                      ${
                        checked
                          ? "border-2 border-shadowLight bg-accent text-second hover:scale-105"
                          : "bg-second hover:scale-105"
                      }
                          text-sm relative flex cursor-pointer font-semibold rounded-lg px-3 py-2 m-1 shadow-md focus:outline-none hover:scale-105`
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
