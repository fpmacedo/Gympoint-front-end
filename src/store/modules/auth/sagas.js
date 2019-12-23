import { all, takeLatest, call, put } from 'redux-saga/effects';

import history from '~/Services/history';
import api from '~/Services/api';

import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', { email, password });

  const { token, user } = response.data;

  if (!user.provider) {
    console.tron.error('Usuario nao e prestador');
  }

  yield put(signInSuccess(token, user));

  history.push('/students');
}
export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
