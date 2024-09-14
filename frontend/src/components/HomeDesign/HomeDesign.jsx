import "./HomeDesign.css"
import honey from "./honey.GIF";
import candles from "./candles.GIF";
import { useTranslate } from "../../translate/LanguageContext";
const HomeDesign = () => {
  const translate = useTranslate();
  return (
    <div className="design">
      <div className="posts">
        <div className="post-img">
          <img src={honey} alt="honey" />
          <div className="post-img-text">{translate('des1')}</div>
        </div>

        <div className="post-img2">
          <img src={candles} alt="candles" />
          <div className="post-img2-text">{translate('des2')}</div>
        </div>
      </div>
    </div>
  );
};

export default HomeDesign;