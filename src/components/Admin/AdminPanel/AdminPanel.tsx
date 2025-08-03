import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import PageButton from "../../../UI/PageButton";
import servicesChange from "/img/admin/ServiceChanged.svg";
import bookingManagement from "/img/admin/BookingManagement.svg";
import gear from "/img/admin/gear.svg";
import pen from "/img/admin/pen.svg";

const gearVariants = {
  initial: { rotate: 0 },
  exit: { rotate: 0 },
  hover: { rotate: [0, 270, 180, 360] },
};

const penVariants = {
  initial: { x: 0 },
  exit: { x: 0 },
  hover: { x: [0, 20, -20, 10, 15, 0], y: [0, -10, 20, 10, 22, 0] },
};

const textVariants = {
  initial: { opacity: 0, height: 0 },
  exit: { opacity: 0, height: 0 },
  hover: { opacity: 1, height: "auto" },
};

const AdminPanel = () => {
  const nav = useNavigate();

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    nav("/admin");
  };

  return (
    <section className="relative grid gap-4">
      <hgroup>
        <h2>Panel admina</h2>
        <p>Cześć, Natalka!</p>
        <p>
          Miło Cię widzieć tu znowu. Zarządzaj wszystkimi możliwymi danymi oraz
          umówionymi wizitami. Na dole odnajdziesz wszystkie opcję zarządzania
          stroną.
        </p>
      </hgroup>

      <section className="midpoint:grid-cols-2 grid grid-cols-1 gap-4">
        <motion.div
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.3 }}
          className="cursor-pointer rounded-3xl bg-gray-100 p-8"
        >
          <motion.picture
            className="tablet:size-60 relative flex size-40"
            layout
          >
            <motion.img
              className="tablet:size-12 tablet:right-8 tablet:top-18 absolute top-13 right-6 size-8"
              src={gear}
              variants={gearVariants}
              alt="Services change"
            />
            <img src={servicesChange} alt="gear" />
          </motion.picture>
          <motion.hgroup layout>
            <h3>Zmiana usług</h3>
            <motion.p variants={textVariants} className="overflow-hidden">
              <span>
                Dodawaj nowe, zmieniaj potrebne Ci właściwości oraz usuwaj
                zbędne
              </span>
            </motion.p>
          </motion.hgroup>
        </motion.div>

        <motion.div
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.3 }}
          className="cursor-pointer rounded-3xl bg-gray-100 p-8"
        >
          <motion.picture
            className="tablet:size-60 relative flex size-40"
            layout
          >
            <motion.img
              className="tablet:size-12 tablet:right-8 tablet:top-18 absolute top-13 right-6 size-8"
              src={pen}
              variants={penVariants}
              alt="Services change"
            />
            <img src={bookingManagement} alt="gear" />
          </motion.picture>
          <motion.hgroup layout>
            <h3>Zarządzanie wizytami</h3>
            <motion.p variants={textVariants} className="overflow-hidden">
              <span>
                Kontroluj umowione wizyty: potwierdzaj, odwołuj albo po prostu
                prypomnij o niej siebie
              </span>
            </motion.p>
          </motion.hgroup>
        </motion.div>
      </section>

      <PageButton text="Wyloguj" onClick={handleClickLogout} />
    </section>
  );
};

export default AdminPanel;
