import { useEffect, useRef } from "react";
import * as dotenv from "dotenv";
dotenv.config();

const { CLOUDNAME, UPLOAD_PRESET } = process.env;

export default function UploadWidget(props) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: CLOUDNAME,
        uploadPreset: UPLOAD_PRESET,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          props.onUpload(result.info.secure_url);
        }
      }
    );
  }, [props]);

  return (
    <div className="widgetContainer">
      <span className="uploadText">Upload an Image</span>
      <br />
      <a onClick={() => widgetRef.current.open()}>Upload</a>
    </div>
  );
}
