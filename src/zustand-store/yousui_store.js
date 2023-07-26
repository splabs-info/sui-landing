import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createIdoSlice } from './slices/ido';
// import { createServicesSlice } from './slices/services';
import { createRerenderSlice } from './slices/rerender';
export const useYouSuiStore = create()(
    devtools(
        persist(
            function (...a) {
                return {
                    ...createIdoSlice(...a),
                    ...createRerenderSlice(...a)
                };
            },
            { name: 'yousui-storage', getStorage: () => localStorage }
        )
    )
);
