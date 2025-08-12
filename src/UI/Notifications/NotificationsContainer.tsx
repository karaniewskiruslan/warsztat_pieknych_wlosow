import { CSSProperties, useEffect } from "react";
import { Notification } from "../../types/notifications.type";
import Cancel from "/Cancel.svg";
import { motion, Variants } from "framer-motion";
import { colorChoice } from "./Notifications.data";
import { useNotificationContext } from "../../context/notificationContent";

const containerSectionVariants: Variants = {
  initial: { x: 100, opacity: 0 },
  exit: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

type Props = {
  notification: Notification;
};

const NotificationsContainer = ({ notification }: Props) => {
  const { shortLifetime, closeNotification } = useNotificationContext();

  const { id, body, title, lifeTime, type } = notification;

  const style: CSSProperties = {
    transform: `scale(${lifeTime / 50},1)`,
    background: `${colorChoice(type)}`,
  };

  useEffect(() => {
    if (lifeTime < 0) {
      closeNotification(id);
      return;
    }

    const life = setInterval(() => {
      shortLifetime(id);
    }, 100);

    return () => clearInterval(life);
  }, [id, lifeTime, closeNotification, shortLifetime]);

  return (
    <motion.div
      variants={containerSectionVariants}
      initial="initial"
      exit="exit"
      animate="animate"
      transition={{
        duration: 0.1,
      }}
      className="pointer-events-auto relative overflow-hidden rounded-2xl border-2 bg-white px-4 pt-4 pb-2"
    >
      <hgroup>
        <h4>{title}</h4>
        <p className="h-24">{body}</p>
      </hgroup>
      <button
        type="button"
        onClick={() => closeNotification(id)}
        className="absolute top-3 right-3 size-7 rounded-full border p-1"
      >
        <img src={Cancel} alt="Close" />
      </button>
      <div
        style={style}
        className="absolute top-0 left-0 h-2 w-full origin-left duration-150"
      ></div>
    </motion.div>
  );
};

export default NotificationsContainer;
