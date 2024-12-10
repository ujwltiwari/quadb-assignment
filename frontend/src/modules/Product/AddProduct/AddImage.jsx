import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toaster } from "@/helpers/helpers";
import { Toaster } from "react-hot-toast";
import { useCallback } from "react";

const AddImage = ({ files, setFiles, onSubmit, showUploadBtn = true }) => {
  const [imagePreview, setImagePreview] = useState("");

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles([file]);

      // Create a preview URL using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Toaster />
      <h1 className="text-[24px] font-medium">Upload Image</h1>
      <Input type="file" onChange={handleFileChange} />
      {imagePreview && (
        <div className="m-auto">
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          />
        </div>
      )}

      {showUploadBtn && <Button onClick={onSubmit}>Upload</Button>}
    </div>
  );
};

export default AddImage;
