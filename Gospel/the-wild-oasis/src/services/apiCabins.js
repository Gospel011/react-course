import supabase from "./supabase";

export async function createEditCabin(newCabin, id) {
  // https://npualittvgzymsaatqkq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // image name

  console.log("ABOUT TO CREATE OR EDIT");

  console.log({ newCabin, id });

  const hasImagePath = newCabin.image?.startsWith?.(
    import.meta.env.VITE_SUPERBASE_URL
  );
  const imageName = hasImagePath
    ? ""
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  // image url
  const imageUrl = hasImagePath
    ? newCabin.image
    : `${
        import.meta.env.VITE_SUPERBASE_URL
      }/storage/v1/object/public/cabin-images/${imageName}`;

  console.log({ imageName, imageUrl, id, newCabin });

  let query = supabase.from("cabins");

  // create cabin
  if (!id) {
    query = query.insert({
      name: newCabin.name,
      maxCapacity: newCabin.maxCapacity,
      regularPrice: newCabin.regularPrice,
      discount: newCabin.discount * 1,
      description: newCabin.description,
      image: imageUrl,
    });
  } else {
    query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);
  }

  const { data: cabin, error } = await query.select().single();

  if (error) {
    console.log({
      errorCreatingCabin: error,
      isEditing: typeof id === "string",
    });

    throw new Error("Could not create cabin");
  }

  // upload image
  if (!hasImagePath) {
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // delete cabin if upload image fails
    if (uploadError) {
      console.log({ uploadError });

      await supabase.from("cabins").delete().eq("id", cabin.id);

      throw new Error("Error uploading image, cabin not created.");
    }
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
