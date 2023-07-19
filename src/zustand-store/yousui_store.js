import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createIdoSlice } from './slices/ido';
import { createServicesSlice } from './slices/services';

export const useYouSuiStore = create()(
    devtools(
        persist(
            function (...a) {
                return {
                    ...createServicesSlice(...a),
                    ...createIdoSlice(...a)
                };
            },
            { name: 'yousui-storage', getStorage: () => localStorage }
        )
    )
);
