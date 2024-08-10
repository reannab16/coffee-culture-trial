import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type sessionType = {
    jwt: string;
    signedIn: boolean;
    shopId: string;
    email?: string;
}

interface authStoreState {
    session: sessionType | null;
    updateSession: (newSession: sessionType | null) => void;
}

export const useAuthStore = create<authStoreState>((set)=>({
    session: null,
    updateSession: (newSession : sessionType | null) => set({session: newSession})
}))