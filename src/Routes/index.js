import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Signin from '~/pages/Signin';

// authenticated routes
import Students from '~/pages/Students';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/students" exact component={Students} isPrivate />
    </Switch>
  );
}
