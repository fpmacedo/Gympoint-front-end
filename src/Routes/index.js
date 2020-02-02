import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Signin from '~/pages/Signin';

// authenticated routes
import Students from '~/pages/Students';
import AddStudent from '~/pages/AddStudent';
import EditStudent from '~/pages/EditStudent';
import AddPlan from '~/pages/AddPlan';
import AddEnrollment from '~/pages/AddEnrollment';
import Plans from '~/pages/Plans';
import Enrollments from '~/pages/Enrollments';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/register/student" component={AddStudent} isPrivate />
      <Route path="/edit/student/:id" component={EditStudent} isPrivate />
      <Route path="/register/plan" component={AddPlan} isPrivate />
      <Route path="/register/enrollment" component={AddEnrollment} isPrivate />
      <Route path="/students" component={Students} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/enrollments" component={Enrollments} isPrivate />
      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
