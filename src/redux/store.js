import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { productApi } from './api/productApi';

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([productApi.middleware]),
});

export var RootState = store.getState;
export var AppDispatch = store.dispatch;
export var useAppDispatch = useDispatch;
export var useAppSelector = useSelector;
