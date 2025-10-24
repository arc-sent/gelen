import { Card, CardContent } from "../../../../components/ui/card";

export const BookingSteps = (): JSX.Element => {
  const steps = [
    {
      number: "1",
      title: "Выберите тип жилья",
      description: "Ознакомьтесь с доступными вариантами квартир, номеров и домов.",
    },
    {
      number: "2",
      title: "Свяжитесь с собственником",
      description: "Позвоните владельцу выбранного жилья, чтобы обсудить условия бронирования и договориться о броне.",
    },
    {
      number: "3",
      title: "Готовьтесь к отпуску",
      description: "Ожидайте подтверждения бронирования и начинайте готовиться к отдыху.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-[#292929]">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-center text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 lg:mb-16">
          Как оставить бронь
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white rounded-2xl border-0 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-800 flex items-center justify-center mb-4 md:mb-6 mx-auto">
                  <span className="text-gray-800 text-lg md:text-xl font-bold">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-gray-800 text-lg md:text-xl font-bold mb-3 md:mb-4">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};