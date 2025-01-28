/* eslint-disable react/prop-types */
// import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditing = Boolean(editId);

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditing ? editValues : {},
  });
  const queryClient = useQueryClient();

  const { errors } = formState;

  // console.log(errors);

  const { isPending: isCreatingCabin, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: (data) => {
      console.log({ creationData: data });
      toast.success("Cabin created successfully");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });

      reset();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { isPending: isEditingCabin, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: (data) => {
      console.log({ creationData: data });
      toast.success("Cabin edited successfully");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });

      reset();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    console.log({ formData: data });

    if (isEditing) {
      editCabin({ newCabin: { ...data, image }, id: editId });
    } else {
      createCabin({ ...data, image: image });
    }

    // return;
  };

  const onError = (error) => {
    console.log({ formStateErrors: error });
  };

  const isWorking = isEditingCabin || isCreatingCabin;

  console.log({ isWorking, isCreatingCabin, isEditingCabin });

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Max capacity should atleast be 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 10,
              message: "Price should atleast be $100",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            validate: (value) => {
              let { regularPrice } = getValues();
              regularPrice *= 1;
              const discount = value * 1;

              console.log({ discount, regularPrice });

              // return true

              if (discount < regularPrice) {
                return true;
              } else {
                return "Discount must be less than regular price.";
              }
            },
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
          id="description"
          defaultValue=""
        />
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          multiple
          {...register("image", {
            required: isEditing ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Reset
        </Button>
        <Button disabled={isWorking}>
          {isEditing ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
