const Loading = () => {
  return (
    <section className="fixed top-0 left-0 z-100 flex h-dvh w-dvw items-center justify-center bg-black text-white">
      <div className="size-12 animate-spin rounded-full border-4 border-b-transparent"></div>
    </section>
  );
};

export default Loading;
