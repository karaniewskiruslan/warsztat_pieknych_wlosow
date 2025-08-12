import classNames from "classnames";
import NotificationsContainer from "./NotificationsContainer";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useNotificationContext } from "../../context/notificationContent";

const mainSectionVariants: Variants = {
  initial: { height: 0, opacity: 0 },
  exit: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
};

const Notifications = () => {
  const { notifications } = useNotificationContext();

  return (
    <section
      className={classNames(
        "fixed top-0 right-0 flex justify-end p-4",
        "font-poppins pointer-events-none h-dvh w-[550px]",
      )}
    >
      <motion.section
        variants={mainSectionVariants}
        initial="initial"
        exit="exit"
        animate="animate"
        transition={{
          duration: 0.3,
          delayChildren: 0.15,
        }}
        className="flex flex-col justify-end gap-4"
      >
        <AnimatePresence>
          {notifications.map((item) => (
            <NotificationsContainer key={item.id} notification={item} />
          ))}
        </AnimatePresence>
      </motion.section>
    </section>
  );
};

export default Notifications;
