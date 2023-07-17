import { StateCreator } from 'zustand'

const init = {}

export const createServicesSlice = (set, get) => ({
    services: init,
    storeServices: (data) => {
        set(() => ({
            services: { ...data }
        }))
    },
})
