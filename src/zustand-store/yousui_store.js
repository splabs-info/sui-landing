import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createIdoSlice } from './slices/ido';
export const useYouSuiStore = create()(
    devtools(
        persist(
            function (...a) {
                return {
                    ...createIdoSlice(...a),
                };
            },
            { name: 'yousui-storage', getStorage: () => localStorage }
        )
    )
);
