import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
// import { createUserSlice } from './slices/user';
import { createSaleSlice } from './slices/sales';

export const useYouSuiStore= create()(
    devtools(
        function (...a) {
            return {
                // ...createUserSlice(...a),
                ...createSaleSlice(...a)
            };
        }
    )
);
