import "./about.css";
import IMG_2829 from "./IMG_2829.JPG";
import IMG_3498 from "./IMG_2813.JPG";
import IMG_3508 from "./IMG_3508.JPG";
import about1 from "./about1.JPG";
import about2 from "./about2.JPG";
import about3 from "./about3.JPG";
import lebanon from "./lebanon.gif";

const About = () => {
  return (
    <section className="about">
      <div className="postss">
        <div className="about-first">
          <div className="about-first-column">
            <div className="about-first-column-text">Our journey began with a shared vision:
              to create meaningful opportunities for individuals in Lebanon, particularly women,
              amidst challenging economic times. Fuelled by passion and a drive for change,
              we embarked on a mission to empower through education, skill-building, and community support.
              From humble beginnings to where we stand today, every step has been guided by our commitment to making a difference.
              Join us as we continue to write our story, one workshop, one product, and one empowered individual at a time.</div>
          </div>
          <div className="about-second-column">
            <img src={IMG_2829} alt="Beit Almonah" />
          </div>
        </div>

        <div className="about-second">
          <div className="about-second-first-column">
            <img src={IMG_3498} alt="Beit Almonah" />
          </div>
          <div className="about-second-second-column">
            We take pride in offering an array of homemade treasures, including traditional jams
            bursting with the flavors of locally sourced fruits, pure and aromatic honey harvested from Lebanese flora,
            and an exquisite assortment of spices to elevate your culinary creations. Delve into the rich tapestry of
            Lebanese culinary heritage with our pickled vegetables, dried fruits, nuts, and premium olive oil,
            each meticulously sourced and crafted to perfection.
          </div>
        </div>

        <div className="about-third">
          <div className="about-third-first-column">
            From intricately designed candles to luxuriously crafted soaps, each piece is lovingly made by skilled artisans
            to elevate your home and personal care routine. Our handmade items embody a commitment to quality, sustainability,
            and authenticity, offering you a unique blend of beauty and functionality. Whether you're searching for the perfect
            gift or looking to add a touch of elegance to your own space, our handcrafted creations promise to inspire and delight.
            Experience the essence of artisanal craftsmanship with our curated selection of handmade items.
          </div>
          <div className="about-third-second-column">
            <img src={IMG_3508} alt="Beit Almonah" />
          </div>
        </div>
      </div>

      <div className="pic-box">
        <img src={about1} alt="Beit Almonah" />
        <img src={about2} alt="Beit Almonah" />
        <img src={about3} alt="Beit Almonah" />
      </div>

      <div className="team">
        <div className="team-title">
          Meet Beit Almonah Team
        </div>
        <div className="teams">
          <div className="prof">
            <i class="bi bi-person-circle"></i>
            <div>Riham Khafaja</div>
          </div>
          <div className="prof">
            <i class="bi bi-person-circle"></i>
            <div>Zeinab Karaki</div>
          </div>
          <div className="prof">
            <i class="bi bi-person-circle"></i>
            <div>Salma Slim</div>
          </div>
          <div className="prof">
            <i class="bi bi-person-circle"></i>
            <div>Mohamad Rammal</div>
          </div>
        </div>
      </div>

      <div className="last-sentence">
        <img className="lebanese-flag" src={lebanon} alt="lebanon"></img>
        Made in Lebanon with love.
        <img className="lebanese-flag" src={lebanon} alt="lebanon"></img>
      </div>

    </section>
  );
};

export default About;
