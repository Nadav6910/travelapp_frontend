import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Homepage from "./pages/homepage"

function App() {

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/">
            <Homepage/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
