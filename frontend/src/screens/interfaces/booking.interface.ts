export interface BookingWithSeasonalPrice {
  id: number;
  title: string;
  categoryId: number;
  subTitle: string;
  guests: number;
  beds: number;
  area: number;
  address: string;
  seasonalPrices: {
    price: number;
  }[];
  image: {
    path: string;
  }[];
}

export interface BookingCategory {
  id: number;
  name: string;
  subCategories?: BookingSubCategory[];
  bookings?: Booking[];
}

export interface BookingSubCategory {
  id: number;
  name: string;
  categoryId: number;
  category?: BookingCategory;
  bookings?: Booking[];
}

export interface Image {
  id: number;
  path: string;
  bookingId: number;
}

export interface SeasonalPrice {
  id: number;
  bookingId: number;
  startDate: string;
  endDate: string;
  price: number;
}

export interface Booking {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  categoryId: number;
  subcategoryId: number;

  category?: BookingCategory;
  subcategory?: BookingSubCategory;

  phone: string;
  guests: number;
  beds: number;
  area: number;
  address: string;
  checkIn: string; // ISO string
  exit: string;    // ISO string
  priority: boolean;

  // Правила проживания
  childRules: boolean;
  smokingRules: boolean;
  petRules: boolean;
  partyRules: boolean;

  // Удобства
  wifi: boolean;
  bedLinen: boolean;
  airConditioner: boolean;
  tv: boolean;
  towels: boolean;
  hairDryer: boolean;
  pool: boolean;

  image?: Image[];             // массив изображений
  seasonalPrices?: SeasonalPrice[];  // массив ценовых периодов

  lat: number;
  long: number;
}
