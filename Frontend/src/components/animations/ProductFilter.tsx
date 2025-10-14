import React, { useState } from 'react';
import { Button } from '../ui/button';

interface FilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ProductFilter: React.FC<FilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-5">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`rounded-[100px] h-[50px] md:h-[60px] px-6 md:px-8 transition-all duration-300 transform hover:scale-105 ${
            activeCategory === category
              ? 'bg-[#2d3b36] text-[#fefff4] hover:bg-[#2d3b36]/90'
              : 'bg-[#fefff4] text-[#2d3b36] border border-[#2d3b36] hover:bg-[#2d3b36] hover:text-[#fefff4]'
          }`}
        >
          <span className="[font-family:'Inter',Helvetica] font-normal text-sm md:text-xl">
            {category}
          </span>
        </Button>
      ))}
    </div>
  );
};