import { create } from 'zustand';

type NavigationState = {
  activeKey: string;
  isNavOpen: boolean;
  label: string;
};

type NavigationAction = {
  setActiveKey: (key: string) => void;
  setNavOpen: (isOpen: boolean) => void;
  setToggleNav: () => void;
  setLabel: (label: string) => void;
  reset: () => void;
};

const initialState: NavigationState = {
  activeKey: '',
  isNavOpen: window.innerWidth >= 600,
  label: '',
};

const useNavigationStore = create<NavigationState & NavigationAction>((set) => ({
  ...initialState,
  setActiveKey: (key: string) => set(() => ({ activeKey: key })),

  setNavOpen: (isNavOpen: boolean) => set(() => ({ isNavOpen })),
  setToggleNav: () => set((s) => ({ isNavOpen: !s.isNavOpen })),
  setLabel: (label: string) => set(() => ({ label })),
  reset: () => set(initialState),
}));

export default useNavigationStore;
