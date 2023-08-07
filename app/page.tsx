import Image from "next/image";
import AuthForm from "./components/auth/AuthForm";

const Home = () => {
  return (
    <div
      className="
        flex
        min-h-screen
        flex-col
        justify-center
        py-12
        sm:px-6
        lg:px-8
        bg-gray-100
        relative
        bg-opacity-80
      "
      style={{
        backgroundImage: `url('/images/fondo.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="
          sm:mx-auto
          sm:w-full
          sm:max-w-md
          p-8
          rounded-lg
          shadow-md
          bg-[rgba(255,255,255,0.9)]
        "
      >
        <Image
          alt="Logo"
          height={400}
          width={400}
          className="mx-auto w-48"
          src={"/images/logoInfo.png"}
        />
        <h2
          className="
            mt-6
            text-center
            text-3xl
            font-bold
            tracking-tighter
            text-gray-900
          "
        >
          Iniciar sesión
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default Home;
