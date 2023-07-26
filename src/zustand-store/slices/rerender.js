
export const createRerenderSlice = (set, get) => ({
    render: false,
    setRender: (value) => {
        set(() => ({
            render: value
        }));
    },
});
