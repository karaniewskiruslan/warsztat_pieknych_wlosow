import { ReactNode } from "react";
import { NotificationContextContainer } from "../notificationContent";
import { ServicesContextContainer } from "../servicesContext";
import { BookingContextContainer } from "../bookingContext";
import { MastersContextContainer } from "../mastersContext";

type Props = {
  children: ReactNode;
};

const ContextsContainer = ({ children }: Props) => {
  return (
    <NotificationContextContainer>
      <MastersContextContainer>
        <ServicesContextContainer>
          <BookingContextContainer>{children}</BookingContextContainer>
        </ServicesContextContainer>
      </MastersContextContainer>
    </NotificationContextContainer>
  );
};

export default ContextsContainer;
