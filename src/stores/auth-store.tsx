import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type sessionType = {
    accessToken: string | null | undefined;
    signedIn: boolean;
    shopId: string;
    email?: string;
}

interface authStoreState {
    session: sessionType | null;
    updateSession: (newSession: sessionType | null) => void;
}

// export const useAuthStore = create<authStoreState>(persist((set)=>({
//     session: null,
//     updateSession: (newSession : sessionType | null) => set({session: newSession})
// }), {
//     name: 'food-storage', // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => sessionStorage), 
// }))

export const useAuthStore = create(
    persist<authStoreState>(
      (set) => ({
        session: null,
        updateSession: (newSession: sessionType | null) => set({ session: newSession }),
      }),
      {
        name: 'auth-storage', // Unique name for the storage key
        storage: createJSONStorage(() => sessionStorage), // Use sessionStorage to persist data
        // partialize: (state) => ({ session: state.session }), // Persist only the session part
      }
    )
  );