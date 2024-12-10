import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Img from "@/components/Img.jsx";
import Pencil from "@/assets/icons/Pencil.jsx";
import Bin from "@/assets/icons/Bin.jsx";
import Loader from "@/components/Loader.jsx";

const colors = ["#000000", "#9F9F9F", "#E98F8F"];

const ProductStock = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:3000/products/");
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Table className="bg-white rounded-md p-4">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="!py-4">
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Piece</TableHead>
              <TableHead>Available Color</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  <Img src={item.images[0]} />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  {item.categories.length ? item.categories[0] : "No Category"}
                </TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{item.units}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    {[
                      colors.map((x, idx) => {
                        return (
                          <div
                            key={idx}
                            className={`h-[20px] w-[20px] rounded-full cursor-pointer`}
                            style={{
                              backgroundColor: x,
                            }}
                          />
                        );
                      }),
                    ]}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center p-1 py-2 gap-4 bg-[#FAFBFD] rounded-md border border-[#D5D5D5]">
                    <button>
                      <Pencil />
                    </button>
                    <button>
                      <Bin />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ProductStock;
