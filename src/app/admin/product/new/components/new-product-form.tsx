"use client";
import { useForm } from "react-hook-form";
import { TProduct, ZProduct } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import ProductForm from "../../components/product-form";

const NewProductForm = () => {
  const router = useRouter();
  const toast = useToast();

  const form = useForm<TProduct>({
    resolver: zodResolver(ZProduct.omit({ id: true })),
    defaultValues: {
      price: 0.0,
      quantity: 0,
    },
  });

  const mutation = trpc.product.createProduct.useMutation({
    onSuccess() {
      toast({
        type: "open",
        message: "Successfully created a product",
        variant: "success",
      });
      router.push("/admin/product");
    },
    onError() {
      toast({
        type: "open",
        message: "There was an error while trying to create a product",
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: TProduct, event: any) => {
    let formData = new FormData(event?.target);
    await mutation.mutateAsync(formData);
  };

  return <ProductForm form={form} onSubmit={onSubmit} mutation={mutation} />;
};

export default NewProductForm;
