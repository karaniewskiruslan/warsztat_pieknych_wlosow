import loadingImage from "/loading.svg";

const Loading = () => {

  return (
    <section className="fixed top-0 left-0 flex h-dvh w-dvw items-center justify-center bg-black text-white">
      <img
        src={loadingImage}
        alt="Loading. Please, wait"
        className="size-16 animate-spin"
      />
    </section>
  );
};

export default Loading;
