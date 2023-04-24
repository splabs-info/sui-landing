import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice } from './slices/user.ks';

export const useYouSuiStore= create()(
    devtools(
        function (...a) {
            return {
                ...createUserSlice(...a),
            };
        }
    )
);
