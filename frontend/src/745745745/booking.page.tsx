import { BookingIndex } from "../screens/2Booking";

export const documentProps = {
  title: 'Бронирование — Отдых в Геленджике',
  description: 'Список доступных мест для отдыха',
};

export function render() {
  return <BookingIndex />;
}