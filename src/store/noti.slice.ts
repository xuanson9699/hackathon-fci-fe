import { NotificationPlacement } from 'antd/es/notification/interface';
import { create } from 'zustand';

type NotificationProps = {
  message: string;
  description?: string;
  placement?: NotificationPlacement;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
};

type NotiState = {
  noti: NotificationProps | null;
};

type NotiAction = {
  setNoti: (noti: NotificationProps | null) => void;
  reset: () => void;
};

const initialState: NotiState = {
  noti: null,
};

const useNotiStore = create<NotiState & NotiAction>((set) => ({
  ...initialState,
  setNoti: (noti: NotificationProps | null) => set(() => ({ noti })),
  reset: () => set(initialState),
}));

export default useNotiStore;
