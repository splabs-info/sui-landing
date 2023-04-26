import produce from 'immer';

const initialMe = {
    CreatedAt: '2023-04-14T04:11:32Z',
    DeletedAt: null,
    ID: '',
    UpdatedAt: '',
    account_id: '',
    address: '',
    avatar: '',
    dob: '',
    email: '',
    gender: 1,
    nationality: '',
    nationality_code: '',
    status: 0,
    username: '',
};

export const createUserSlice = (set, get) => ({
    me: initialMe,
    updateUser: (props) =>
        set((state) =>
            produce(state, (draft) => {
                Object.assign(draft.me, props);
            })
        ),
    storeUser: (user) => {
        set(() => ({ me: user }));
    },
});
