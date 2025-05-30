import { Route, Switch } from "wouter";
import WeatherRoute from "./routes/Weather";
import SettingsRoute from "./routes/Settings";

const App: React.FC = () => (
  <Switch>
    <Route path="/" component={WeatherRoute} />
    <Route path="/settings" component={SettingsRoute} />
  </Switch>
);

export default App;
