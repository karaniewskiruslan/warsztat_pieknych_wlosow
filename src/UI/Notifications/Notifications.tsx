import classNames from "classnames";
import NotificationsContainer from "./NotificationsContainer";
import { AnimatePresence } from "framer-motion";
import { useNotificationContext } from "../../context/notificationContent";

const Notifications = () => {
  const { notifications = [] } = useNotificationContext();

  return (
    <section
      className={classNames(
        "fixed top-0 right-0 flex justify-end p-4",
        "font-poppins mobile:w-[550px] pointer-events-none h-dvh w-dvw",
      )}
    >
      <section className="flex w-full flex-col justify-end gap-4">
        <AnimatePresence>
          {notifications.map((item) => (
            <NotificationsContainer key={item.id} notification={item} />
          ))}
        </AnimatePresence>
      </section>
    </section>
  );
};

export default Notifications;
