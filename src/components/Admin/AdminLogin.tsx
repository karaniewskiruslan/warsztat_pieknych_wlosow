import { ChangeEvent, FormEvent } from "react";
import loadingImage from "/loading.svg";

type Props = {
  onSubmitLogin: (e: FormEvent) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  error: boolean;
};

const AdminLogin = ({
  onSubmitLogin,
  onChangeInput,
  loading,
  error,
}: Props) => {
  return (
    <section>
      <h2>Zaloguj się</h2>
      <form onSubmit={onSubmitLogin} className="flex flex-col gap-4 pt-4">
        <label className="labelStyle">
          <p>Login:</p>
          <input
            onChange={onChangeInput}
            className="inputStyle"
            name="login"
            type="text"
            placeholder="Wpisz login"
            required
          />
        </label>
        <label className="labelStyle">
          <p>Hasło:</p>
          <input
            onChange={onChangeInput}
            className="inputStyle"
            name="password"
            type="password"
            placeholder="Wpisz hasło"
            required
          />
        </label>
        <button
          type="submit"
          className="grid w-60 h-8 cursor-pointer place-items-center rounded-sm border px-2 py-1 duration-150 hover:bg-black hover:text-white"
        >
          {loading ? (
            <>
              <img
                src={loadingImage}
                alt="Loading. Please, wait"
                className="size-4 animate-spin"
              />
            </>
          ) : (
            "Wejdź"
          )}
        </button>
      </form>

      {error && (
        <p className="pt-2 text-red-400">Nieprawidłowe hasło albo login</p>
      )}
    </section>
  );
};

export default AdminLogin;
