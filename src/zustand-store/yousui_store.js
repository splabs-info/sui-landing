import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createServicesSlice } from './slices/services';

export const useYouSuiStore = create()(
    devtools(
        persist(
            function (...a) {
                return {
                    ...createServicesSlice(...a),
                };
            },
            { name: 'yousui-storage', getStorage: () => localStorage }
        )
    )
);
