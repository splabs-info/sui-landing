
export const createSaleSlice = (set, get) => ({
    sold: (value) => {
        set(() => ({ soled: value }));
    },
});
