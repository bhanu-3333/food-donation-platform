import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface AnimatedFAQProps {
  faqs: FAQItem[];
  className?: string;
}

export const AnimatedFAQ: React.FC<AnimatedFAQProps> = ({ faqs, className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`w-full ${className}`}>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-solid border-[#2d3b36] rounded-[5px] mb-4 overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-[29px] py-[25px] flex items-center justify-between text-left hover:bg-[#f8fee5] transition-colors duration-200"
          >
            <span className="[font-family:'Inter',Helvetica] font-normal text-[#2d3b36] text-lg md:text-xl pr-4">
              {faq.question}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-[#2d3b36] transition-transform duration-300 flex-shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-[29px] pb-[25px]">
              <p className="[font-family:'Inter',Helvetica] font-normal text-[#525349] text-sm md:text-base tracking-[-0.70px] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};