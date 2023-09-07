
export const createUserSlice = (set, get) => ({
    currentUser: '',
    storageUser: (value) => {
        set(() => ({
            currentUser: value
        }));
    },
    clearUser: () => {
        set(() => ({ currentUser: '' }));
    }
});
