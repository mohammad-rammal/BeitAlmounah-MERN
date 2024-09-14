import React from "react";
// import aboutImg from "../../assets/images/about-us.png";
// import CountUp from "react-countup";

const AboutUs = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col lg:flex-row">
        <div className="lg:w-6/12 md:w-full relative">
          <div
            className="about__img shape4"
            style={{
              margin: '10px',
              width: '500px',
              height: '330px',
              background: 'linear-gradient(145deg, #e8e8e8, #c3c3c3)',
              borderRadius: '20px',
              boxShadow: '28px 28px 56px #ababab, -28px -28px 56px #ffffff',
            }}
          >
            <img
              // srcSet="logo"
              src="https://res.cloudinary.com/dwjqz8eyv/image/upload/v1706180282/beautiful-food-edible-bouquet-with-carved-fruit-flowers-vegetables-rustic-style_290431-9655_wzgzsj.jpg"
              alt=""
              className="w-full h-full rounded-md"
            />
          </div>
        </div>


        <div className="lg:w-6/12 md:w-full px-4 lg:px-0">
          <div className="about__content">
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-600">
              Welcome to Beit Al MONE, where we're shaping futures and creating opportunities
              in the face of Lebanon's economic challenges.
              Our Focus
              Mouneh and Craft Workshops:
              Dive into the world of Mouneh with workshops on pickles and Kaushik production.
              Explore contemporary crafting skills such as soap making, hand embroidery, and sewing.
            </p>

            <div className="about__counter mt-8">
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="single__counter w-32">
                  <span className="counter text-2xl font-semibold">
                    {/* <CountUp start={0} end={25} duration={2} suffix="" /> */}
                  </span>
                  <p className="counter__title text-gray-600">Completed Workshops</p>
                </div>

                <div className="single__counter w-32">
                  <span className="counter text-2xl font-semibold">
                    {/* <CountUp start={0} end={12} duration={2} suffix="" /> */}
                  </span>
                  <p className="counter__title text-gray-600">Seller's</p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-5 mt-4">
                <div className="single__counter w-50">
                  <span className="counter text-2xl font-semibold">
                    {/* <CountUp start={0} end={160} duration={2} suffix="" /> */}
                  </span>
                  <p className="counter__title text-gray-600">Products</p>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="single__counter w-50">
                  <span className="counter text-2xl font-semibold">
                    {/* <CountUp start={0} end={5} duration={2} suffix="" /> */}
                  </span>
                  <p className="counter__title text-gray-600">Categories Served</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
