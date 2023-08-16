import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createIdoSlice } from './slices/ido';
import { createUserSlice } from './slices/user';

export const useYouSuiStore = create()(
    devtools(
        persist(
            function (...a) {
                return {
                    ...createIdoSlice(...a),
                    ...createUserSlice(...a),
                };
            },
            { name: 'yousui-storage', getStorage: () => localStorage }
        )
    )
);
