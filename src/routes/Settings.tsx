import { useLocalStorage } from "@uidotdev/usehooks";
import IconButton from "../components/IconButton";
import { HomeIcon } from "../components/icons";
import { TEMPERATURE_LOCAL_STORAGE_KEY } from "../constants";

const tempOptions = [
  { id: `F`, title: "Fahrenheit" },
  { id: `C`, title: "Celsius" },
];

const SettingsRoute: React.FC = () => {
  const [temp, setTemp] = useLocalStorage(TEMPERATURE_LOCAL_STORAGE_KEY, "F");
  return (
    <div className="max-w-lg mx-auto py-8">
      <IconButton href="/">
        <HomeIcon />
      </IconButton>
      <h1 className="text-2xl text-center">Settings</h1>
      <div className="py-8 px-4">
        <fieldset>
          <legend className="text-sm/6 font-semibold text-gray-900">
            Temperature Units
          </legend>
          <div className="mt-2 flex items-center space-y-0 space-x-10">
            {tempOptions.map((tempOpt) => (
              <div key={tempOpt.id} className="flex items-center">
                <input
                  defaultChecked={temp === tempOpt.id}
                  id={tempOpt.id}
                  value={tempOpt.id}
                  onChange={(e) => setTemp(e.target.value)}
                  name="temperature-selection"
                  type="radio"
                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                />
                <label
                  htmlFor={tempOpt.id}
                  className="ml-3 block text-sm/6 font-medium text-gray-900"
                >
                  {tempOpt.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default SettingsRoute;
