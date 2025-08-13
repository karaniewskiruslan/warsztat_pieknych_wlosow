import { ReactNode } from "react";
import { NotificationContextContainer } from "../notificationContent";
import { ServicesContextContainer } from "../servicesContext";

type Props = {
  children: ReactNode;
};

const ContextsContainer = ({ children }: Props) => {
  return (
    <ServicesContextContainer>
      <NotificationContextContainer>{children}</NotificationContextContainer>
    </ServicesContextContainer>
  );
};

export default ContextsContainer;
