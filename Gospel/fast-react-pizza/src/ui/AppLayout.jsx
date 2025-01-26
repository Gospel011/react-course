import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // console.log({ isLoading });

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
      {/* LOADER */}
      {isLoading && <Loader />}
      {/* <Loader /> */}
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT AREA */}
      <div className="overflow-y-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      {/* CART OVERVIEW */}
      <CartOverview />
    </div>
  );
}

export default AppLayout;
