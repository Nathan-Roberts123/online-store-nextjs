"use client";
import React, { useEffect, useState } from "react";
import ProductForm from "../../../components/product-form";
import { useForm } from "react-hook-form";
import { TProduct } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZProduct } from "@/types";
import { trpc } from "@/utils/trpc";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const EditProuctForm = () => {
  const toast = useToast();
  const router = useRouter();

  const { product_id } = useParams<{ product_id: string }>();

  const { data, isFetching } = trpc.product.getProduct.useQuery({
    id: product_id,
  });

  const form = useForm<TProduct>({
    resolver: zodResolver(ZProduct.omit({ id: true, image: true })),
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        status: data.status,
        suk: data.suk,
        image: data.image,
      });
    }
  }, [data, form]);

  const mutation = trpc.product.updateProduct.useMutation({
    onSuccess() {
      toast({
        type: "open",
        message: "Successfully updated a product",
        variant: "success",
      });
      router.push("/admin/product");
    },
    onError() {
      toast({
        type: "open",
        message: "There was an error while trying to update a product",
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: TProduct, event: any) => {
    let formData = new FormData(event?.target);
    formData.append("id", product_id);
    await mutation.mutateAsync(formData);
  };

  if (isFetching || !data) {
    return <div>Loading...</div>;
  }

  return <ProductForm form={form} mutation={mutation} onSubmit={onSubmit} />;
};

export default EditProuctForm;
