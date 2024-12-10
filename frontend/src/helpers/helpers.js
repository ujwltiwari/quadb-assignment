import toast from "react-hot-toast";
export const toaster = (type, message) => {
  toast[type](message);
};

export const textCapitalizer = (text) => {
  const textArr = text.split(" ");
  return textArr.map((x) => `${x[0].toUpperCase()}${x.slice(1)}`).join(" ");
};

export const urlToFile = async (url, filename = "", mimeType = "image/png") => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
};

export const renameKey = (obj, oldKey, newKey) => {
  const { [oldKey]: value, ...rest } = obj;
  return {
    ...rest,
    [newKey]: value,
  };
};

export const calculateDiscount = (originalPrice, discountPercentage) => {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;
  return discountedPrice;
}
