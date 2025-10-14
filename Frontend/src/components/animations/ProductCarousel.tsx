import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface ProductCarouselProps {
  products: Product[];
  className?: string;
  showSliderControls?: boolean;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  products, 
  className = '',
  showSliderControls = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mobile/Tablet Carousel */}
      <div className="md:hidden">
        <div 
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0 px-4">
              <Card className="w-full h-[400px] sm:h-[500px] bg-cover bg-center border-none rounded-lg overflow-hidden">
                <CardContent className="p-0 relative h-full">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#fefff4] rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-[#2d3b36] text-lg leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-[#2d3b3680] text-sm mt-1">
                        {product.price}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-12 h-12 bg-[#2d3b361a] rounded-lg hover:bg-[#2d3b3630] transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border-[#2d3b36] hover:bg-[#2d3b36] hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-[#2d3b36] hover:bg-[#2d3b36]/80 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-4">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#2d3b36] w-6' : 'bg-[#2d3b3640]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:flex justify-between gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="w-full h-[770px] bg-cover bg-center border-none rounded-none group hover:scale-[1.02] transition-transform duration-500"
            style={{ backgroundImage: `url(${product.image})` }}
          >
            <CardContent className="p-0 relative h-full">
              <div className="absolute bottom-5 left-5 right-5 bg-[#fefff4] rounded-[10px] p-5 flex items-center justify-between transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div>
                  <h3 className="font-normal text-[#2d3b36] text-xl tracking-[-1.00px] leading-normal">
                    {product.name}
                  </h3>
                  <p className="font-normal text-[#2d3b3680] text-base tracking-[-0.80px] leading-normal mt-2">
                    {product.price}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-20 h-20 bg-[#2d3b361a] rounded-[10px] hover:bg-[#2d3b36] hover:text-white transition-all duration-300"
                >
                  <ShoppingCart className="w-[30px] h-[30px]" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Slider Controls for Desktop (when showSliderControls is true) */}
      {showSliderControls && (
        <div className="hidden md:flex justify-between items-center mt-8">
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-[#2d3b36] hover:bg-[#2d3b36] hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-[#2d3b36] hover:bg-[#2d3b36]/80 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#2d3b36] w-8' : 'bg-[#2d3b3640]'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};