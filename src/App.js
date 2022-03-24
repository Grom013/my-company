import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Route path="/login:type?" component={Login} />
        <Route path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
