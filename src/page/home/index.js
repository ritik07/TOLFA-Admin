import axios from "axios";
import React, { useEffect, useState } from "react";
import { StaticBanner } from "../../component/static-banner/staticBanner";
import UnderDevelopment from "../../component/underDevelopment";
import { BASE_URL } from "../../constant";
import PetWiseCategory from "./components/mobile/petWiseCategory/petWiseCategory";
import ShopByBrands from "./components/mobile/ShopByBrands/shopByBrands";
import ShopByCategory from "./components/mobile/shopByCategory/shopByCategory";
import ShopByPetType from "./components/mobile/shopByPetType/shopByPetType";

const Home = () => {
  const [staticBannerData, setStaticBannerData] = useState(false);
  const [brandsList, setBrandsList] = useState([]);
  const [petTypeList, setpetTypeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [petWiseList, setPetWiseList] = useState([]);

  useEffect(() => {
    getStaticBannerData();
    getBrands();
    getPetType();
    getCategory();
    getPetWiseCategory();
  }, []);

  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as per your needs

  const getStaticBannerData = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/static-banner?active=${true}`
      );
      setStaticBannerData(response.data.data[0]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getBrands = async () => {
    try {
      let response = await axios.get(BASE_URL + `/brands/highlight?active=${true}`);
      setBrandsList(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPetType = async () => {
    try {
      let response = await axios.get(BASE_URL + `/pet-type?active=${true}`);
      setpetTypeList(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCategory = async () => {
    try {
      let response = await axios.get(BASE_URL + `/categories/highlight?active=${true}`);
      setCategoryList(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPetWiseCategory = async () => {
    try {
      let response = await axios.get(
        BASE_URL + `/categories/petwise-category?active=${true}`
      );
      setPetWiseList(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      {isMobile ? (
        <div>
          <div className="cs-mrl-10 cs-tm-20">
            <ShopByBrands brandsList={brandsList} />
          </div>

          <div className="cs-tm-30">
            <ShopByPetType petTypeList={petTypeList} />
          </div>

          <div className="cs-mrl-10 cs-tm-50">
            <ShopByCategory categoryList={categoryList} />
          </div>

          <div className="cs-mrl-10 cs-tm-30">
            <PetWiseCategory petWiseList={petWiseList} />
          </div>
        </div>
      ) : (
        <div>
          <StaticBanner staticBannerData={staticBannerData} />
          <UnderDevelopment />
        </div>
      )}
    </div>
  );
};

export default Home;
