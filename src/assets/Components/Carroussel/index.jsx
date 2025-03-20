import "./style.css";
import { useEffect, useState } from "react";
import { Banner1, Banner2, Banner3 } from "../../img";

export default function ImageCarroussel() {
  const img = [Banner1, Banner2, Banner3];
  const [currentIndx, setCurrentIndx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndx((prevIndex) => (prevIndex + 1) % img.length);
    }, 5000); // interval 5 seconds

    return () => clearInterval(interval);
  }, [img.length]);

  return (
    <section className="ImgCarrousselContainer">
      <div className="ImgCarrousselContent" style={{ transform: `translateX(-${currentIndx * 100}%)`}}>
        {img.map((item, index) => (
          <img
            key={index}
            src={item}
            alt={`Banner ${index + 1}`}
            className="CarrousselImage"
          />
        ))}
      </div>
    </section>
  );
}
