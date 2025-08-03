import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import AdminLogin from "./AdminLogin";
import { Outlet, useNavigate } from "react-router";
import { logIn } from "../../api/admin.api";

const Admin = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  const [{ login, password, error, loading }, setAdminData] = useState({
    login: "",
    password: "",
    error: false,
    loading: false,
  });
  const [logged, setLogged] = useState(false);

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

    setAdminData((prev) => ({ ...prev, loading: true }));

    try {
      const { data, res } = await logIn(login, password);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        logInAdmin();
      } else {
        setAdminData((prev) => ({ ...prev, error: true }));
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.error("Login error:", err);
      setAdminData((prev) => ({ ...prev, error: true }));
    } finally {
      setAdminData((prev) => ({
        ...prev,
        login: "",
        password: "",
        loading: false,
      }));
    }
  };

  return (
    <section data-testid="admin">
      <h1>Strona administratora</h1>
      {!logged && (
        <AdminLogin
          onSubmitLogin={handleSubmitLogin}
          onChangeInput={handleChangeData}
          loading={loading}
          error={error}
        />
      )}
      <Outlet />
    </section>
  );
};

export default Admin;
