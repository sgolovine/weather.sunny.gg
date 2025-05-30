// functions taken from: https://github.com/anton-bot/celsius

export function toFahrenheit(celsiusTemperature: string | number) {
  if (
    celsiusTemperature === null ||
    celsiusTemperature === "" ||
    celsiusTemperature === undefined
  ) {
    throw new Error(
      "Input was null/empty when trying to convert temperature to Celsius."
    );
  }

  const c = parseFloat(celsiusTemperature.toString());
  const f = c * 1.8 + 32;

  return Math.round(f);
}

export function toCelsius(fahrenheitTemperature: string | number) {
  if (
    fahrenheitTemperature === null ||
    fahrenheitTemperature === "" ||
    fahrenheitTemperature === undefined
  ) {
    throw new Error(
      "Input was null/empty when trying to convert temperature to Fahrenheit."
    );
  }

  const f = parseFloat(fahrenheitTemperature.toString());
  const c = (f - 32) / 1.8;

  return Math.round(c);
}
