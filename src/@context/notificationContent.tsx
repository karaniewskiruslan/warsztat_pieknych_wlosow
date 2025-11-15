/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from "react";
import { Notification } from "../@types/notifications.type";
import { v4 as uniqueID } from "uuid";

type Props = {
  children: ReactNode;
};

type NotificationContentProps = {
  notifications: Notification[];
  addNewNotification: (
    type: "error" | "success" | "added",
    title: string,
    body: string,
  ) => void;
  closeNotification: (id: string) => void;
  shortLifetime: (id: string) => void;
};

const NotificationContext = createContext({} as NotificationContentProps);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context)
    throw new Error("Context must be used within NotificationContext");

  return context;
};

export const NotificationContextContainer = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNewNotification = (
    type: "error" | "success" | "added",
    title: string,
    body: string,
  ) => {
    const newItem: Notification = {
      id: uniqueID(),
      type,
      title,
      body,
      lifeTime: 50,
    };

    setNotifications((prev) => [...prev, newItem]);
  };

  const shortLifetime = (id: string) => {
    setNotifications((prev) =>
      prev.map((el) => {
        if (el.id === id) return { ...el, lifeTime: el.lifeTime - 1 };

        return el;
      }),
    );
  };

  const closeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNewNotification,
        closeNotification,
        shortLifetime,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
