import { configureStore } from "@reduxjs/toolkit";
import TherpistReducer from './TherpistsSlice';
import CommentReducer from './CommentSlice';
import CategoryReducer from './CategorySlice';
import PatientReduser from './PatientSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import sessionStorage from "redux-persist/es/storage/session";
import AppealReducer from './AppealSlice';
import loginReducer from './LoginSlice';
// import SigninReducer from './SignInSlice';

const reducers = {
    therpists: TherpistReducer,
    comments: CommentReducer,
    categories: CategoryReducer,
    patients: PatientReduser,
    appeals:AppealReducer,
    login: loginReducer,
    // signin: SigninReducer,



}
const rootReducer = combineReducers(reducers);
const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ['therpists', 'patients', 'categories','login'],

};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getdefaultMiddleware) =>
        getdefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})
export const persistor = persistStore(store);



