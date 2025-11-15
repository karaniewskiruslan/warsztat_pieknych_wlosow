import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import AdminLogin from "./AdminLogin";
import { Outlet, useNavigate } from "react-router";
import { logIn } from "../../@api/admin.api";
import { useMutation } from "@tanstack/react-query";

const Admin = () => {
  const nav = useNavigate();
  const token = sessionStorage.getItem("token");

  const [{ login, password }, setAdminData] = useState({
    login: "",
    password: "",
  });
  const [logged, setLogged] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ login, password }: { login: string; password: string }) =>
      logIn(login, password),
    onSuccess: (data) => {
      setAdminData({ login: "", password: "" });

      if (data.token) {
        sessionStorage.setItem("token", data.token);
        logInAdmin();
      } else {
        throw new Error("Invalid credentials");
      }
    },
    onError: () => {
      setAdminData({
        login: "",
        password: "",
      });

      throw new Error("Wrong data");
    },
  });

  const logInAdmin = useCallback(() => {
    setLogged(true);
    nav("panel");
  }, [nav]);

  useEffect(() => {
    if (token) {
      return logInAdmin();
    }

    setLogged(false);
  }, [logInAdmin, token]);

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value, error: false }));
  };

  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();
    mutate({ login, password });
  };

  return (
    <section data-testid="admin">
      <h1>Strona administratora</h1>
      {!logged && (
        <AdminLogin
          onSubmitLogin={handleSubmitLogin}
          onChangeInput={handleChangeData}
          loading={isPending}
          error={error}
        />
      )}
      <Outlet />
    </section>
  );
};

export default Admin;
