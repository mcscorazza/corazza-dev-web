export function formatCustomDate(dateString: string) {
  const [year, month, day] = dateString.split('-');
  
  const months = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho", 
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];
  const monthName = months[parseInt(month, 10) - 1]; 
  return `${day} ${monthName} ${year}`;
}