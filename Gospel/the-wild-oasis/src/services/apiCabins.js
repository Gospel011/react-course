import supabase from "./supabase";

export async function createCabin(newCabin) {
  const { data: cabin, error } = await supabase.from("cabins").insert({
    name: newCabin.name,
    maxCapacity: newCabin.maxCapacity,
    regularPrice: newCabin.regularPrice,
    discount: newCabin.discount * 1,
    description: newCabin.description,
    image: newCabin.image,
  });

  if (error) {
    console.log({ errorCreatingCabin: error });

    throw new Error("Could not create cabin");
  }

  return cabin;
}

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log({ errorDeletingCabin: error });
    throw new Error("Cabin could not be deleted.");
  }

  return data;
}
