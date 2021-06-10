import React, { useEffect, useState } from "react";
import NodeRsa from "node-rsa";
import CircularProgress from "@material-ui/core/CircularProgress";

const Decryption = () => {
  const [textDec, setTextDec] = useState(true);
  const [fileDec, setFileDec] = useState(false);

  const [message, setMessage] = useState("");
  const [privKey, setPrivKey] = useState("");
  const [output, setOuput] = useState("");

  const [fileMessage, setFileMessage] = useState();
  const [fileMessagePreview, setFileMessagePreview] = useState("");
  const [filePrivKey, setFilePrivKey] = useState();
  const [filePrivKeyPreview, setFilePrivKeyPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const onChangeTypeDec = () => {
    setFileDec(!fileDec);
    setTextDec(!textDec);
    setMessage("");
    setPrivKey("");
    setOuput("");
    setFileMessage();
    setFilePrivKey();
  };

  // FILE MESSAGE
  useEffect(() => {
    if (!fileMessage) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setFileMessagePreview(fileReader.result);
    };
    fileReader.readAsText(fileMessage);
  }, [fileMessage]);

  // LOADING
  useEffect(() => {
    if (output) {
      return setLoading(false);
    }
  }, [output]);

  // FILE PUBKEY
  useEffect(() => {
    if (!filePrivKey) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setFilePrivKeyPreview(fileReader.result);
    };
    fileReader.readAsText(filePrivKey);
  }, [filePrivKey]);

  const fileMessageHandler = (e) => {
    let pickedFile;
    if (!e.target.files && e.target.files.length === 0) {
      return "File is not valid!";
    }
    pickedFile = e.target.files[0];

    setFileMessage(pickedFile);
  };

  const filePrivKeyHandler = (e) => {
    let pickedFile;
    if (!e.target.files && e.target.files.length === 0) {
      return "File is not valid!";
    }
    pickedFile = e.target.files[0];

    setFilePrivKey(pickedFile);
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([output], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "decrypted.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const onDecryptSubmit = () => {
    // FILE TYPE
    if (fileDec) {
      if (!fileMessage || !filePrivKey) {
        return alert("Please choose file");
      }

      const key = new NodeRsa(filePrivKeyPreview);
      const decrypted = key.decrypt(fileMessagePreview, "utf8");
      setOuput(decrypted);
      setLoading(true);
      return;
    }

    // TEXT TYPE
    if (message.trim() === "" || privKey.trim() === "") {
      return alert("Please fill the input");
    }

    const key = new NodeRsa(privKey);
    const decrypted = key.decrypt(message, "utf8");

    setLoading(true);
    setOuput(decrypted);
  };

  return (
    <>
      {/* DECRYPTION */}
      <div className="p-4">
        <div className="w-full bg-red-800 text-white p-6 rounded-lg">
          <h3 className="text-center text-2xl font-semibold pb-4">
            DECRYPTION
          </h3>
          <hr />
          {/* SELECT TYPE */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <input
                checked={textDec}
                onChange={onChangeTypeDec}
                id="textType"
                name="fileType"
                type="radio"
                className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300"
              />
              <label
                htmlFor="textType"
                className="ml-3 block text-sm font-medium text-white"
              >
                Text
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={fileDec}
                onChange={onChangeTypeDec}
                id="fileType"
                name="fileType"
                type="radio"
                className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300"
              />
              <label
                htmlFor="fileType"
                className="ml-3 block text-sm font-medium text-white"
              >
                File
              </label>
            </div>
          </div>
          {/* END SELECT TYPE */}

          {/* FLEX */}
          <div className="md:flex md:flex-1 md:justify-between mb-4 pt-4 md:space-x-4">
            {/* TEXT DECRYPT */}
            {textDec && (
              <>
                {/* INPUT TEXT MESSAGE */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white"
                  >
                    Encrypted Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="shadow-sm text-black focus:ring-red-500 focus:border-red-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Encrypted Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
                {/* INPUT PUBLIC KEY */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="privkey"
                    className="block text-sm font-medium text-white"
                  >
                    Private Key
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="privkey"
                      name="privkey"
                      rows={5}
                      className="shadow-sm text-black focus:ring-red-500 focus:border-red-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Private Key"
                      value={privKey}
                      onChange={(e) => setPrivKey(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
            {/* FILE DECRYPT */}
            {fileDec && (
              <>
                {/* INPUT FILE MESSAGE */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-white"
                  >
                    File Encrypted Message
                  </label>
                  <div className="mt-1">
                    <input
                      type="file"
                      accept=".txt"
                      name="fileDec"
                      id="fileDec"
                      onChange={fileMessageHandler}
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="outputFileMessage"
                      className="block text-sm font-medium text-white"
                    >
                      Output File Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        readOnly
                        id="outputFileMessage"
                        name="outputFileMessage"
                        rows={5}
                        className="shadow-sm text-black focus:ring-red-500 focus:border-red-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Encrypted Message"
                        value={fileMessagePreview}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* INPUT FILE PUBLIC KEY */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="filePrivKey"
                    className="block text-sm font-medium text-white"
                  >
                    File Private Key
                  </label>
                  <div className="mt-1">
                    <input
                      type="file"
                      accept=".pri"
                      name="filePrivKey"
                      id="filePrivKey"
                      onChange={filePrivKeyHandler}
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="filePrivKey"
                      className="block text-sm font-medium text-white"
                    >
                      Output File Private Key
                    </label>
                    <div className="mt-1">
                      <textarea
                        readOnly
                        id="filePrivKey"
                        name="filePrivKey"
                        rows={5}
                        className="shadow-sm text-black focus:ring-red-500 focus:border-red-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Private Key"
                        value={filePrivKeyPreview}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* BUTTON SUBMIT */}
          <div className="my-4">
            <button
              onClick={onDecryptSubmit}
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-red-800 bg-white hover:bg-red-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Decrypting
            </button>
          </div>

          <hr />

          {/* OUTPUT */}
          <div className="">
            <div className="w-full">
              <div className="mt-4">
                <>
                  <label
                    htmlFor="outputFilePrivKey"
                    className="block text-sm font-medium text-white"
                  >
                    Output
                  </label>

                  {/* OUTPUT TEXT */}
                  {textDec && output && (
                    <div className="mt-1">
                      <textarea
                        readOnly
                        id="outputFilePrivKey"
                        name="outputFilePrivKey"
                        rows={9}
                        className="shadow-sm text-black focus:ring-red-500 focus:border-red-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Output"
                        value={output}
                        onChange={(e) => setOuput(e.target.value)}
                      />
                    </div>
                  )}
                  {/* END OUTPUT TEXT */}

                  {/* OUTPUT DOWNLOAD */}
                  {loading && (
                    <div className="center">
                      <CircularProgress color="secondary" />
                    </div>
                  )}

                  {output && (
                    <div className="mt-6 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </span>
                      <button
                        onClick={downloadTxtFile}
                        type="button"
                        className="w-60 inline-flex justify-center py-3 px-4 border-2 border-white rounded-r-md shadow-sm text-md font-medium text-white bg-transparent hover:bg-red-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Download Encrypted File
                      </button>
                    </div>
                  )}
                  {/* END OUTPUT DOWNLOAD */}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* END DECRYPTION */}
    </>
  );
};

export default Decryption;
