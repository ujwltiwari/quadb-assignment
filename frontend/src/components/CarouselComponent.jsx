import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselComponent = ({ images }) => {
  return (
    <Carousel>
      <CarouselContent>
        {images?.map((image, idx) => (
          <CarouselItem key={idx}>
            <img className="w-full" src={image} alt="banner" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselComponent;
