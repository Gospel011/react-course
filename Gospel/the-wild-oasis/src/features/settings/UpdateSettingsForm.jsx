import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSetings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import { useUpdateSetting } from "./useUpdateSettings";
import toast from "react-hot-toast";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakfastPrice,
    } = {},

    isLoading,
  } = useSetings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  const { register, formState, handleSubmit } = useForm();

  const { errors } = formState;

  if (isLoading) return <Spinner />;

  function onSubmit(data) {
    console.log({ data });

    const {
      minBookingLength: newMinBookingLength,
      maxBookingLength: newMaxBookingLength,
      maxGuestPerBooking: newMaxGuestPerBooking,
      breakfastPrice: newBreakfastPrice,
    } = data;

    const canEdit =
      minBookingLength != newMinBookingLength ||
      maxBookingLength != newMaxBookingLength ||
      maxGuestPerBooking != newMaxGuestPerBooking ||
      breakfastPrice != newBreakfastPrice;

    console.log({ canEdit });

    if (!canEdit) {
      toast.error("No new changes detected");
    } else {
      toast.loading("Updating setting...", { id: "PATCH setting" });
      updateSetting({
        minBookingLength: newMinBookingLength,
        maxBookingLength: newMaxBookingLength,
        maxGuestPerBooking: newMaxGuestPerBooking,
        breakfastPrice: newBreakfastPrice,
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Minimum nights/booking"
        error={errors?.minBookingLength?.message}
      >
        <Input
          disabled={isUpdating}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          {...register("minBookingLength", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow
        error={errors?.maxBookingLength?.message}
        label="Maximum nights/booking"
      >
        <Input
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          {...register("maxBookingLength", {
            required: "This field is required",
          })}
          type="number"
          id="max-nights"
        />
      </FormRow>
      <FormRow
        error={errors?.maxGuestPerBooking?.message}
        label="Maximum guests/booking"
      >
        <Input
          disabled={isUpdating}
          defaultValue={maxGuestPerBooking}
          {...register("maxGuestPerBooking", {
            required: "This field is required",
          })}
          type="number"
          id="max-guests"
        />
      </FormRow>
      <FormRow error={errors?.breakfastPrice?.message} label="Breakfast price">
        <Input
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          {...register("breakfastPrice", {
            required: "This field is required",
          })}
          type="number"
          id="breakfast-price"
        />
      </FormRow>

      <Row>
        <Button disabled={isUpdating}>
          {isUpdating ? "Updating settings..." : "Update settings"}
        </Button>
      </Row>
    </Form>
  );
}

export default UpdateSettingsForm;
