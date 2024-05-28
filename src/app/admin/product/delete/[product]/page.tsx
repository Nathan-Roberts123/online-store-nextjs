"use client";
import { useParams } from "next/navigation";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ConfirmDelete = () => {
  const params = useParams<{ product: string }>();
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <div className="flex-col">
        <div className="mb-4">
          Successfully deleted the product {params.product}
        </div>
        <div className="flex justify-center">
          <Button className="" onClick={() => router.push("/admin/product")}>
            Back To Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
