import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Image
        src="/mascot/Gotou.png"
        alt="Gotou"
        className="w-32 md:w-40 opacity-75"
        width={100}
        height={100}
        priority={true}
      />
      <div className="flex flex-col items-center justify-center">
        <h1 className="md:text-8xl text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 md:text-xl text-lg text-gray-600">Page Not Found</p>
      </div>
    </div>
  );
}
