import Link from "next/link";

export default function Home() {
  return (
    <div className="container max-w-screen-lg mx-auto pb-6">
      <h1 className="text-center text-6xl py-4">TUGAS BESAR 2</h1>
      <h3 className="text-center text-3xl py-4">
        Muhammad Ayub Alfathoni - 41518110106
      </h3>
      <h3 className="text-center text-3xl py-4">RSA</h3>
      <div className="my-4">
        <Link href="/encrypt">
          <a className="w-full text-2xl inline-flex justify-center py-3 px-4 border-4 border-indigo-900 shadow-sm text-md font-medium rounded-md text-indigo-900 bg-white hover:bg-indigo-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900">
            Encrypting
          </a>
        </Link>
      </div>
      <div className="my-4">
        <Link href="/decrypt">
          <a className="w-full text-2xl inline-flex justify-center py-3 px-4 border-4 border-red-800 shadow-sm text-md font-medium rounded-md text-red-800 bg-white hover:bg-red-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800">
            Decrypting
          </a>
        </Link>
      </div>
      <h3 className="text-center text-3xl py-4">Diffie-Hellman</h3>
      <div className="my-4">
        <Link href="/diffie-hellman">
          <a className="w-full text-2xl inline-flex justify-center py-3 px-4 border-4 border-yellow-900 shadow-sm text-md font-medium rounded-md text-yellow-900 bg-white hover:bg-yellow-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-900">
            Diffie-Hellman
          </a>
        </Link>
      </div>
    </div>
  );
}
