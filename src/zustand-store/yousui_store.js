import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createSaleSlice } from './slices/sales';
import { createIdoSlice } from './slices/ido';
const PERSISTED_KEYS = ['og-round'];

export const localStorageMiddleware = (config) => (set, get, api) =>
    config((args) => {
        set(args);
        localStorage.setItem('store', JSON.stringify(get(PERSISTED_KEYS)));
    }, get, api);

export const useYouSuiStore = create(
    devtools(
        persist(
            localStorageMiddleware((set, get, api) => {
                let localStorageState = {};
                try {
                    localStorageState = JSON.parse(localStorage.getItem('yousui-storage')) ?? {};
                } catch (e) {
                    console.error("Can't access localStorage:", e);
                }

                return {
                    ...localStorageState,
                    ...createSaleSlice(set, get, api),
                    ...createIdoSlice(set, get, api)
                };
            }),
            { name: 'yousui-storage' }  // unique name
        )
    )
);
