import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/Dashboard';
import Repository from '../pages/Repository/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    {/* When a path param has a forword slash(es) as part of if, to prevent react understanding them as subpaths and force it
    interpret them as part of the parameter, it is necessary to add a plus (+) signal at the end. */}
    <Route path="/repository/:repository+" component={Repository} />
  </Switch>
);

export default Routes;
