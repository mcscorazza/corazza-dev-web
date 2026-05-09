export function formatCustomDate(dateString: string) {
  const datePart = dateString.split("T")[0];
  const [year, month, day] = datePart.split("-");

  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const monthName = months[parseInt(month, 10) - 1];

  return `${day} ${monthName} ${year}`;
}
