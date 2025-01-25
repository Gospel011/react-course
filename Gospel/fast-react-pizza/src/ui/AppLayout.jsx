import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  console.log({ isLoading });

  return (
    <div className="layout">
      {/* LOADER */}
      {isLoading && <Loader />}
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT AREA */}
      <main>
        <Outlet />
      </main>

      {/* CART OVERVIEW */}
      <CartOverview />
    </div>
  );
}

export default AppLayout;
