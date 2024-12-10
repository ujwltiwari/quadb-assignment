import Sidebar from "@/modules/Admin/components/Sidebar.jsx";
import AdminLayout from "@/components/adminLayout/AdminLayout.jsx";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { FaPlusCircle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { toaster, urlToFile } from "@/helpers/helpers.js";
import { useLocation } from "react-router-dom";
import AddImage from "@/modules/Product/AddProduct/AddImage.jsx";
import {Loader2} from "lucide-react";

const EditProduct = () => {
  const pathname = useLocation().pathname.split("/");
  const productId = pathname[pathname.length - 1];
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    units: "",
    categories: "",
    measurements: "",
    colors: "",
    additionalInfo: "",
    images: "",
  });
  const [files, setFiles] = useState([]);
  const [currentDBImage, setCurrentDBImage] = useState(null);
  useEffect(() => {
    getSingleProduct();
  }, []);

  const getSingleProduct = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/products/${productId}`,
    );
    setProduct(data);
    setCurrentDBImage([...data.images]);
    data.colors = data.colors.join(", ");
    data.categories = data.categories.join(", ");
    setFormData(data);
  };

  const handleFormData = useCallback((name, data) => {
    if (name === "categories") {
      data = data.split(",");
    }

    if (name === "colors") {
      data = data.split(",");
    }
    setFormData((formData) => ({ ...formData, [name]: data }));
  }, []);

  const handleFileUpload = async () => {
    try {
      const data = new FormData();
      data.append("file", files[0]); // Append the selected file to FormData

      const result = await axios.post("http://localhost:3000/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      console.log("File uploaded successfully", result.data);
      toaster("success", "Image Upload Successful");
      setFiles([]);
      return result.data;
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  const updateProduct = useCallback(async () => {
    setLoading(true);
    const { price, title, description, units } = formData;
    if (!price || !title || !description || !units) {
      toaster("error", "Please Fill Required Fields");
      setLoading(false);
      return;
    }
    let image;
    if (files.length) {
      image = await handleFileUpload();
    }
    if (image) {
      console.log("image uploaded", image)
      formData["images"] = image.result;
    }
    if (typeof formData.colors === "string" && formData.colors.length === 0) {
      formData.colors = [];
    }

    if (
      typeof formData.categories === "string" &&
      formData.categories.length === 0
    ) {
      formData.categories = [];
    }
    try {
      const result = await axios.put(
        `http://localhost:3000/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            admin: true,
          },
        },
      );
      toaster("success", "Product Successfully Updated");
    } catch (err) {
      console.log(err);
      toaster("error", "Error Creating Product");
    }
    setLoading(false);
  }, [handleFileUpload, formData]);
  return (
    <div className="font-inter">
      <Toaster />
      <AdminLayout />
      <div className="flex">
        <Sidebar className="w-1/5 max-w-[240px]" />
        <div className="w-[80%]">
          <h1 className="w-full text-left text-[32px] font-semibold bg-[#F5F6FA] py-1 px-8">
            Edit Product
          </h1>
          <div className="px-8 mt-8 flex gap-24">
            <div className="w-1/5 items-start flex-col">
              <AddImage
                files={files}
                setFiles={setFiles}
                onSubmit={handleFileUpload}
                showUploadBtn={false}
              />
              {currentDBImage && (
                <div className="flex flex-col items-center justify-center">
                  <h4 className="text-[18px] pt-8 font-medium">
                    Current Image in Database
                  </h4>
                  <img
                    className="w-[200px] h-[200px] aspect-square object-contain"
                    src={currentDBImage}
                  />
                </div>
              )}
            </div>
            <div className="w-[80%] flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <h2 className="text-[28px] font-medium py-2">
                  Add Product Title
                </h2>
              </div>
              <Input
                size="lg"
                placeholder="Product Title..."
                onChange={(e) => handleFormData("title", e.target.value)}
                value={formData?.title}
              />

              <div className="flex gap-2 flex-col">
                <div className="flex gap-2 items-center">
                  <h2 className="text-left text-slate-400 text-[16px] font-normal py-2">
                    Add Description
                  </h2>
                </div>

                <Input
                  size="lg"
                  placeholder="Product Description..."
                  onChange={(e) =>
                    handleFormData("description", e.target.value)
                  }
                  value={formData?.description}
                />
              </div>

              <div className="flex gap-2 flex-col">
                <div className="flex gap-2 items-center">
                  <h2 className="text-left text-slate-400 text-[16px] font-normal py-2">
                    Add Units
                  </h2>
                </div>
                <Input
                  size="lg"
                  placeholder="Product Units..."
                  onChange={(e) => handleFormData("units", e.target.value)}
                  value={formData?.units}
                />
              </div>

              <div className="flex gap-2 flex-col mt-2">
                <div className="flex gap-8">
                  <Button
                    variant="ghost"
                    className="text-[28px] font-semibold py-2 w-fit flex gap-2 px-0 hover:bg-transparent"
                  >
                    <FaPlusCircle />
                    Add Price
                  </Button>
                </div>
                <Input
                  size="lg"
                  type="number"
                  placeholder="Product Price $24.99..."
                  onChange={(e) => handleFormData("price", e.target.value)}
                  value={formData?.price}
                />
                <Input
                  size="lg"
                  type="number"
                  placeholder="Product Discount in Percentage..."
                  onChange={(e) => handleFormData("discount", e.target.value)}
                  value={formData?.discount}
                />
              </div>
              <Separator />
              <div className="flex gap-2 flex-col">
                <div className="flex gap-2 items-center">
                  <h2 className="text-left text-slate-400 text-[16px] font-semibold py-2">
                    Measurements
                  </h2>
                </div>
                <Input
                  size="lg"
                  placeholder="Product Measuremnt..."
                  onChange={(e) =>
                    handleFormData("measurements", e.target.value)
                  }
                  value={formData?.measurements}
                />
              </div>

              <div className="flex gap-2 flex-col">
                <div className="flex gap-2 items-center">
                  <h2 className="text-left text-slate-400 text-[16px] font-semibold py-2">
                    Add Colors
                  </h2>
                </div>
                <Input
                  size="lg"
                  placeholder="Product Colors..."
                  onChange={(e) => handleFormData("colors", e.target.value)}
                  value={formData?.colors}
                />
              </div>

              <div className="flex gap-2 flex-col">
                <Textarea
                  size="lg"
                  placeholder="Additional Info..."
                  onChange={(e) =>
                    handleFormData("additionalInfo", e.target.value)
                  }
                  value={formData?.additionalInfo}
                />
              </div>

              <Button onClick={updateProduct} size="lg" className="flex gap-2 items-center">
                {loading && <Loader2 className="animate-spin" />}{" "}
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
