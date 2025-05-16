import { all, call} from "typed-redux-saga/macro"

import {categorySage} from "./categories/category.saga"
import { userSagas } from "./user/user.saga";


export function* rootSaga() {
    yield all([call(categorySage), call(userSagas)]);
}