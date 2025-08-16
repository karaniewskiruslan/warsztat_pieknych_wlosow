import { ReactNode } from "react";
import { NotificationContextContainer } from "../notificationContent";
import { ServicesContextContainer } from "../servicesContext";
import { BookingContextContainer } from "../bookingContext";

type Props = {
  children: ReactNode;
};

const ContextsContainer = ({ children }: Props) => {
  return (
    <NotificationContextContainer>
      <ServicesContextContainer>
        <BookingContextContainer>{children}</BookingContextContainer>
      </ServicesContextContainer>
    </NotificationContextContainer>
  );
};

export default ContextsContainer;
