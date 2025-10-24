import { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";
import { HashLink } from "react-router-hash-link";

export const Header = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { text: "ГЛАВНАЯ", href: "/" },
    { text: "ПРЕДЛОЖЕНИЯ", href: "/booking" },
    { text: "БРОНЬ", href: "/#OffersSection" },
    { text: "ВОПРОСЫ", href: "/#FaqSection" },
    { text: "КОНТАКТЫ", href: "/#ContactSection" },
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="w-full px-4 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src="/logo.svg"
              alt="Company Logo"
              className="w-16 h-12 lg:w-20 lg:h-16 object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>


          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="flex gap-4 lg:gap-8">
              {navigationItems.map((item, index) => {
                if (!(item.href.includes("#"))) {
                  return (<NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <Link
                        className="font-bold text-gray-800 text-xs lg:text-sm tracking-wider hover:text-[#5d8f4a] transition-colors duration-200 px-2 py-1 whitespace-nowrap"
                        to={item.href}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        {item.text}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>)
                } else {
                  return (<NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <HashLink smooth to={item.href} className="font-bold text-gray-800 text-xs lg:text-sm tracking-wider hover:text-[#5d8f4a] transition-colors duration-200 px-2 py-1 whitespace-nowrap">
                        {item.text}
                      </HashLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>)
                }

              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Кнопка-бургер */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isOpen ? (
              // Иконка "крестик"
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Иконка "бургер"
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Мобильное меню */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <nav className="flex flex-col items-center bg-white shadow-md rounded-lg py-4 mt-2 gap-2">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                onClick={() => setIsOpen(false)} // закрыть меню при клике
                className="w-full text-center font-semibold text-gray-700 text-base py-3 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 border-b last:border-b-0"
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
