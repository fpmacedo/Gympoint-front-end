import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Signin from '~/pages/Signin';

// authenticated routes
import Students from '~/pages/Students';
import AddStudent from '~/pages/AddStudent';
import Plans from '~/pages/Plans';
import Enrollments from '~/pages/Enrollments';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/register/student" component={AddStudent} isPrivate />
      <Route path="/students" component={Students} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/enrollments" component={Enrollments} isPrivate />
      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
