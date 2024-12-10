/* eslint-disable react/prop-types */
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className, alt, ...props }) => {
  return (
    <LazyLoadImage
      // width="auto"
      // height="auto"
      className={className || ""}
      alt={alt || "LazyImage"}
      effect="blur"
      src={src}
      {...props}
    />
  );
};

export default Img;
