import create from 'zustand';

export const useAppStore = create((set) => ({
    isLoading: true,
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
}));

export const useOrderStore = create((set) => ({
    orders: [],
    setOrders: (orders) => set(() => ({ orders: orders || [] })),
    clearOrders: () => set({ orders: [] }),
}));
