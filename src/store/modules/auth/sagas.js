import { all, takeLatest, put, call } from "redux-saga/effects";
import history from "~/services/history";
import { signInSuccess } from "./action";

import api from "~/services/api";

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, "/sessions", { email, password });

  const { token, user } = response.data;

  if (!user.provider) {
    console.tron.error("Usuário não é um prestador.");
    return;
  }

  yield put(signInSuccess(token, user));

  history.push("/dashboard");
}

export default all([takeLatest("@auth/SIGN_IN_REQUEST", signIn)]);
