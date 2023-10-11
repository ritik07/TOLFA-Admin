import "antd/dist/antd.css";
import "./static/style/main.css";
import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "./layout/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./page/home";
import Login from "./page/login/login";
import ProductByBrand from "./page/home/components/mobile/products/productByBrand/productByBrand";
import AllBrands from "./page/home/components/mobile/ShopByBrands/allBrands/allBrands";
import AllCategory from "./page/home/components/mobile/shopByCategory/allCategory/allCategory";
import ProductByCategory from "./page/home/components/mobile/products/productByCategory/productByCategory";
import ProductSingle from "./page/home/components/mobile/products/productSingle/productSingle";
import { Provider } from "react-redux";
import { store } from "./redux";

function App() {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);
  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<LayoutWrapper />}>
            <Route index element={<Home />} />
            <Route
              path="/brand/:brandId/products"
              element={<ProductByBrand />}
            />
            <Route
              path="/brand/:brandId/product/:productId/product-details"
              element={<ProductSingle />}
            />
            <Route
              path="/category/:categoryId/products"
              element={<ProductByCategory />}
            />
            <Route
              path="/category/:categoryId/products/:productId/product-details"
              element={<ProductSingle />}
            />
            <Route path="/allbrands" element={<AllBrands />} />
            <Route path="/allcategories" element={<AllCategory />} />
            <Route path="login-signup" element={<Login />} />
          </Route>
        </Routes>

        {/* <Routes>
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/" element={<LayoutWrapper />}>
          <Route path="" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Dashboard />} />
          <Route
            path="/home/category/:id/:category_slug"
            element={<Products />}
          />
          <Route
            path="/home/category/:id/:category_slug/product/:id/:product_slug"
            element={<Product />}
          />
          <Route
            path="/home/category/:id/:category_slug/product/:id/:product_slug/purchase"
            element={<Purchase />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/termsandcondition" element={<Terms />} />
        </Route>
        <Route path="/privacy-policy" element={<Policy />} />
      </Routes> */}
      </div>
    </Provider>
  );
}

export default App;
