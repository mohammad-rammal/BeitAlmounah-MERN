import { useContext } from "react";
import { Link } from "react-router-dom";
import BookStoreContext from "../../context/bookStorContext";

const HeaderMiddle = () => {
  const { cartInfoLength } = useContext(BookStoreContext);
  return (
    <div className="header-middle">
      {/* <Link to="/" className="header-middle-logo">
        <img className="img-logo" src="logob.jpeg" alt="logo"></img>
        <b>Beit Almonah</b>
      </Link> */}
      {/* <div className="header-middle-search-box">
        <input
          className="header-middle-search-input"
          type="search"
          placeholder="Search..."
        />
        <i className="bi bi-search"></i>
      </div> */}

      <div className="header-icons">
        <div className="header-icons-img">

          <img className="img11" src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708247078/krmvqrnume6gjueanmdf.png" ></img>
          <img className="img11" src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708250614/wuxdvar89cay0kmanspr.png" ></img>
          <img className="img11" src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708247077/dkiufx7zgj1laux5pjym.png" ></img>


          <img src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708246012/uvnbmdntcftifteyg7ze.png" ></img>


          <img src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708246747/va4jxvgvsyxmu0e51iaa.png" ></img>



          <img src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708248505/ehsfmdiuuwk6h845ru0i.png" ></img>
          <img src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708248528/rc36wdbttmkl93chtqiv.png" ></img>
          <img className="img11" src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708250188/nouu1yyhw5cyyey5hprk.png" ></img>
          <img src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708250454/g5fm6qqpro6foicwpnyz.png" ></img>
          <img src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708246013/sx7onsdgtin9hdwlagca.png" ></img>

          <img src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708250770/wuei9vqpyyrobyahz3e8.png" ></img>
        </div>
      </div>

      {/* <div className="slogan-container">
        <h2 className="slogan">Crafting Excellence: Explore, Learn, Create</h2>
      </div> */}
      <Link to="/cart" className="header-middle-cart-wrapper">
        {cartInfoLength > 0 && (
          <b className="cart-notification">{cartInfoLength}</b>
        )}
        <i className="bi bi-cart2"></i>
      </Link>

      {/* 
      <div class="main-area">
        <div class="circles">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div> */}


    </div>



  );
};

export default HeaderMiddle;
