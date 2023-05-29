
export const createSaleSlice = (set, get) => ({
    soled: false,
    sold: (value) => {
        set(() => ({ soled: value }));
    },
});
