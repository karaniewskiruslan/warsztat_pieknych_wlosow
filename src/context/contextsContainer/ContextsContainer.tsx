import { ReactNode } from "react";
import { NotificationContextContainer } from "../notificationContent";
import { ServicesContextContainer } from "../servicesContext";
import { BookingContextContainer } from "../bookingContext";

type Props = {
  children: ReactNode;
};

const ContextsContainer = ({ children }: Props) => {
  return (
    <ServicesContextContainer>
      <NotificationContextContainer>
        <BookingContextContainer>{children}</BookingContextContainer>
      </NotificationContextContainer>
    </ServicesContextContainer>
  );
};

export default ContextsContainer;
