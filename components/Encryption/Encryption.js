import React, { useEffect, useState } from "react";
import NodeRsa from "node-rsa";
import CircularProgress from "@material-ui/core/CircularProgress";

const Encryption = () => {
  const [textEnc, setTextEnc] = useState(true);
  const [fileEnc, setFileEnc] = useState(false);

  const [message, setMessage] = useState("");
  const [pubKey, setPubKey] = useState("");
  const [output, setOuput] = useState("");

  const [fileMessage, setFileMessage] = useState();
  const [fileMessagePreview, setFileMessagePreview] = useState("");
  const [filePubKey, setFilePubKey] = useState();
  const [filePubKeyPreview, setFilePubKeyPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const onChangeTypeEnc = () => {
    setFileEnc(!fileEnc);
    setTextEnc(!textEnc);
    setMessage("");
    setPubKey("");
    setOuput("");
    setFileMessage();
    setFilePubKey();
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

  // FILE PUBKEY
  useEffect(() => {
    if (!filePubKey) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setFilePubKeyPreview(fileReader.result);
    };
    fileReader.readAsText(filePubKey);
  }, [filePubKey]);

  useEffect(() => {
    if (output) {
      return setLoading(false);
    }
  }, [output]);

  const fileMessageHandler = (e) => {
    let pickedFile;
    if (!e.target.files && e.target.files.length === 0) {
      return "File is not valid!";
    }
    pickedFile = e.target.files[0];

    setFileMessage(pickedFile);
  };

  const filePubKeyHandler = (e) => {
    let pickedFile;
    if (!e.target.files && e.target.files.length === 0) {
      return "File is not valid!";
    }
    pickedFile = e.target.files[0];

    setFilePubKey(pickedFile);
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([output], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "encrypted.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const onEncryptSubmit = () => {
    // FILE TYPE
    if (fileEnc) {
      if (!fileMessage || !filePubKey) {
        return alert("Please choose file");
      }

      const key = new NodeRsa(filePubKeyPreview);
      const encrypted = key.encrypt(fileMessagePreview, "base64");
      setOuput(encrypted);
      setLoading(true);
      return;
    }

    // TEXT TYPE
    if (message.trim() === "" || pubKey.trim() === "") {
      return alert("Please fill the input");
    }

    const key = new NodeRsa(pubKey);
    const encrypted = key.encrypt(message, "base64");

    setOuput(encrypted);
    setLoading(true);
  };

  return (
    <>
      {/* ENCRYPTION */}
      <div className="p-4">
        <div className="w-full bg-blue-800 text-white p-6 rounded-lg">
          <h3 className="text-center text-2xl font-semibold pb-4">
            ENCRYPTION
          </h3>
          <hr />
          {/* SELECT TYPE */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <input
                checked={textEnc}
                onChange={onChangeTypeEnc}
                id="textType"
                name="fileType"
                type="radio"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
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
                checked={fileEnc}
                onChange={onChangeTypeEnc}
                id="fileType"
                name="fileType"
                type="radio"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
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
            {/* TEXT ENCRYPT */}
            {textEnc && (
              <>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white"
                  >
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Your Message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="pubkey"
                    className="block text-sm font-medium text-white"
                  >
                    Public Key
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="pubkey"
                      name="pubkey"
                      rows={5}
                      className="shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Public Key"
                      value={pubKey}
                      onChange={(e) => setPubKey(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* FILE ENCRYPT */}
            {fileEnc && (
              <>
                {/* INPUT FILE MESSAGE */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-white"
                  >
                    File Message
                  </label>
                  <div className="mt-1">
                    <input
                      type="file"
                      accept=".txt"
                      name="fileEnc"
                      id="fileEnc"
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
                        className="shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Your Message..."
                        value={fileMessagePreview}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* INPUT FILE PUBLIC KEY */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="filePubKey"
                    className="block text-sm font-medium text-white"
                  >
                    File Public Key
                  </label>
                  <div className="mt-1">
                    <input
                      type="file"
                      accept=".pub"
                      name="filePubKey"
                      id="filePubKey"
                      onChange={filePubKeyHandler}
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="filePubKey"
                      className="block text-sm font-medium text-white"
                    >
                      Output File Public Key
                    </label>
                    <div className="mt-1">
                      <textarea
                        readOnly
                        id="filePubKey"
                        name="filePubKey"
                        rows={5}
                        className="shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Public Key"
                        value={filePubKeyPreview}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* BUTTON */}
          <div className="my-4">
            <button
              onClick={onEncryptSubmit}
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-blue-800 bg-white hover:bg-indigo-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Encrypt
            </button>
          </div>
          {/* END BUTTON */}

          <hr />
          {/* OUTPUT */}
          <div className="">
            <div className="w-full">
              <div className="mt-4">
                <label
                  htmlFor="outputEncryption"
                  className="block text-sm font-medium text-white"
                >
                  Output
                </label>
                {/* OUTPUT TEXT */}
                {textEnc && output && (
                  <div className="mt-4">
                    {loading ? (
                      <div className="center">
                        <CircularProgress color="secondary" />
                      </div>
                    ) : (
                      <textarea
                        readOnly
                        id="outputEncryption"
                        name="outputEncryption"
                        rows={9}
                        className="shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Output"
                        value={output}
                        onChange={(e) => setOuput(e.target.value)}
                      />
                    )}
                  </div>
                )}
                {/* END OUTPUT TEXT */}

                {/* OUTPUT FILE */}
                {loading && (
                  <div className="center">
                    <CircularProgress color="secondary" />
                  </div>
                )}
                {output && (
                  <div className="mt-4 flex rounded-md shadow-sm">
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
                      className="w-60 inline-flex justify-center py-3 px-4 border-2 border-white rounded-r-md shadow-sm text-md font-medium text-white bg-transparent hover:bg-indigo-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Download Encrypted File
                    </button>
                  </div>
                )}
                {/* END OUTPUT FILE */}
              </div>
            </div>
          </div>

          {/* END OUTPUT */}
        </div>
      </div>

      {/* END ENCRYPTION */}
    </>
  );
};

export default Encryption;
