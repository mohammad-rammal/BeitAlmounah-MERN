import Services from "../../components/services/Services";
import Slider from "../../components/slider/Slider";
import HeadingTitle from "../../components/heading-title/HeadingTitle";
import { useSelector } from "react-redux";
import Categories from "../../components/Categories/Categories";
import HomeDesign from "../../components/HomeDesign/HomeDesign";
import SpicesLine from "../../components/SpicesLine/SpicesLine";
import ProductSlider from "../../components/Products-Slider/Products-Slider";
import AlanAi from "../../alan/AlanAi";




const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (

    <section>
      {user && user.isAdmin ? (
        // Render components specific to admin
        <Slider />
      ) : (
        <>
         <Categories/>
         <HeadingTitle title="All Products"/>
         <ProductSlider />
         <HomeDesign/>
         <SpicesLine />
         <AlanAi />

          {
            !user?.isAdmin && (
              <AlanAi />
            )
          }
        </>
      )}
    </section>
  );
};

export default HomePage;
