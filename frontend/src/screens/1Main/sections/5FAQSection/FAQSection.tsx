import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";

export const FAQSection = (): JSX.Element => {
  const faqItems = [
    {
      id: "item-1",
      question: "Какие параметры жилья можно выбрать?",
      answer: "Через наш сервис вы можете подобрать жильё по основным параметрам: тип жилья, цена, количество гостей, расстояние до моря и другие критерии. Это поможет быстро найти вариант, который идеально подходит под ваши потребности.",
    },
    {
      id: "item-2",
      question: "Есть ли скидки при бронировании?",
      answer: "Да! Если вы бронируете жильё заранее (за несколько месяцев) или на срок более 15 дней, вы получаете дополнительную скидку. Это наша система поощрения ранних и длительных бронирований.",
    },
    {
      id: "item-3",
      question: "Работает ли служба поддержки?",
      answer: "Наша служба поддержки работает с 9:00 до 18:00. В экстренных случаях вы можете связаться с нами через мессенджеры.",
    },
    {
      id: "item-4",
      question: "Могу ли я получить консультацию по выбору жилья?",
      answer: "Конечно! Наши эксперты помогут вам выбрать идеальный вариант жилья, учитывая ваши предпочтения, бюджет и особые требования. Консультация предоставляется бесплатно.",
    },
  ];


  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white" id="FaqSection">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 lg:mb-16">
          Консультация
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border border-gray-200 rounded-lg px-4 md:px-6 py-2 hover:shadow-md transition-shadow duration-200"
            >
              <AccordionTrigger className="hover:no-underline py-4 md:py-6 text-left">
                <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 md:pb-6 text-sm md:text-base text-gray-600 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};