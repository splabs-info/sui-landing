
export const createIdoSlice = (set, get) => ({
    objectIdOGRoleNft: '',
    setObjectId: (value) => {
        set(() => ({
            objectIdOGRoleNft: value
        }));
    },
    clearObjectId: () => {
        set(() => ({ objectIdOGRoleNft: '' }));
    }
});
