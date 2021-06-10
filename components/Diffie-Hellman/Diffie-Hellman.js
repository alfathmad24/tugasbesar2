import { useState } from "react";

const DiffieHellman = () => {
  const [primeNumber, setPrimeNumber] = useState("");
  const [genOfP, setGenOfP] = useState("");
  const [privkeyAlice, setPrivkeyAlice] = useState("");
  const [privkeyBob, setprivkeyBob] = useState("");

  const [secretkeyAlice, setSecretKeyAlice] = useState("");
  const [secretkeyBob, setSecretKeyBob] = useState("");

  function calculate(a, b, p) {
    if (b === 1) return a;
    else return Math.pow(a, b) % p;
  }

  function exchangedKeyAliceHandler() {
    const genKeyAlice = calculate(genOfP, privkeyAlice, primeNumber);
    // const exchangedKeyAlice = calculate(genKeyAlice, privkeyAlice, primeNumber);
    return genKeyAlice;
  }

  function exchangedKeyBobHandler() {
    const genKeyBob = calculate(genOfP, privkeyBob, primeNumber);
    // const exchangedKeyBob = calculate(genKeyBob, privkeyBob, primeNumber);
    return genKeyBob;
  }

  const calculateHandler = () => {
    if (
      primeNumber.trim() === "" ||
      genOfP.trim() === "" ||
      privkeyAlice.trim() === "" ||
      privkeyBob.trim() === ""
    ) {
      return alert("Please fill the empty input");
    }

    const exchangedKeyAlice = calculate(
      exchangedKeyBobHandler(),
      privkeyAlice,
      primeNumber
    );
    const exchangedKeyBob = calculate(
      exchangedKeyAliceHandler(),
      privkeyBob,
      primeNumber
    );

    setSecretKeyAlice(exchangedKeyAlice);
    setSecretKeyBob(exchangedKeyBob);
  };

  return (
    <div className="p-4">
      <div className="w-full bg-yellow-800 text-white p-6 rounded-lg">
        <h3 className="text-center text-2xl font-semibold pb-4">
          Diffie Hellman
        </h3>
        <hr />
        {/* LINE 1 */}
        <div className="md:flex md:flex-1 md:justify-between pt-4 md:space-x-4">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="primeNumber"
              className="block text-sm font-medium text-white"
            >
              Prime Number
            </label>
            <input
              type="text"
              name="primeNumber"
              id="primeNumber"
              autoComplete="given-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-black shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={primeNumber}
              onChange={(e) => setPrimeNumber(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="genOfP"
              className="block text-sm font-medium text-white"
            >
              Generator of P
            </label>
            <input
              type="text"
              name="genOfP"
              id="genOfP"
              autoComplete="given-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-black shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={genOfP}
              onChange={(e) => setGenOfP(e.target.value)}
            />
          </div>
        </div>
        {/* END LINE 1 */}

        {/* LINE 2 */}
        <div className="md:flex md:flex-1 md:justify-between mb-4 pt-4 md:space-x-4">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="alicePrivKey"
              className="block text-sm font-medium text-white"
            >
              Alice Private Key
            </label>
            <input
              type="text"
              name="alicePrivKey"
              id="alicePrivKey"
              autoComplete="given-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-black shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={privkeyAlice}
              onChange={(e) => setPrivkeyAlice(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="bobPrivKey"
              className="block text-sm font-medium text-white"
            >
              Bob Private Key
            </label>
            <input
              type="text"
              name="bobPrivKey"
              id="bobPrivKey"
              autoComplete="given-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-black shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={privkeyBob}
              onChange={(e) => setprivkeyBob(e.target.value)}
            />
          </div>
        </div>
        {/* END LINE 2 */}

        {/* BUTTON SUBMIT */}
        <div className="my-4">
          <button
            onClick={calculateHandler}
            type="button"
            className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-yellow-800 bg-white hover:bg-yellow-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Calculate
          </button>
        </div>
        {/* END BUTTON SUBMIT */}

        <hr />

        <div className="">
          <div className="w-full">
            <div className="mt-4">
              <div>
                <label
                  htmlFor="outputFilePrivKey"
                  className="block text-sm font-medium text-white"
                >
                  Output
                </label>
                <div className="mt-1">
                  <p>Prime Number : {primeNumber}</p>
                  <p>Generator of P : {genOfP}</p>
                  <p>The private key Alice : {privkeyAlice}</p>
                  <p>The private key Bob : {privkeyBob}</p>
                  <p>
                    <strong>
                      Secret key for the Alice is : {secretkeyAlice}
                    </strong>
                  </p>
                  <p>
                    <strong>Secret Key for the Bob is : {secretkeyBob}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffieHellman;
