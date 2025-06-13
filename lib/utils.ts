export function cn(...classes: (string | boolean | undefined)[]) {
   return classes.filter(Boolean).join(' ');
}

export function formatDateRange(
   dateStart: string | Date,
   dateEnd: string | Date,
   locale = 'fr-FR'
): string {
   const start = new Date(dateStart);
   const end = new Date(dateEnd);

   const sameMonth = start.getMonth() === end.getMonth();
   const sameYear = start.getFullYear() === end.getFullYear();

   const dayStart = start.getDate().toString().padStart(2, '0');
   const dayEnd = end.getDate().toString().padStart(2, '0');

   const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long' });
   const month = monthFormatter.format(end); // always use end for consistency

   const year = end.getFullYear();

   if (sameMonth && sameYear) {
      return `${dayStart} - ${dayEnd} ${capitalize(month)} ${year}`;
   }

   const startMonth = capitalize(monthFormatter.format(start));
   const endMonth = capitalize(monthFormatter.format(end));
   const startYear = start.getFullYear();

   return `${dayStart} ${startMonth} ${startYear} - ${dayEnd} ${endMonth} ${year}`;
}

function capitalize(text: string): string {
   return text.charAt(0).toUpperCase() + text.slice(1);
}
