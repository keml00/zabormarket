const xlsx = require('xlsx');

const data = [
    ['category', 'model', 'thickness', 'coating', 'color', 'price'],
    ['profnastil', 'S-8', '0.45', 'Эконом Полиэстер', '', 545],
    ['profnastil', 'S-8', '0.45', 'Стандарт Полиэстер', 'Цинк', 575],
    ['profnastil', 'S-8', '0.45', 'Стандарт Полиэстер', '', 585],
    ['profnastil', 'S-8', '0.45', 'Стальной бархат', '', 870],
    ['profnastil', 'S-8', '0.45', 'Printech', '', 1375],

    ['profnastil', 'S-8', '0.5', 'Стандарт Полиэстер', '', 719],
    ['profnastil', 'S-8', '0.5', 'High Gloss Matt', '', 1133],

    ['metallocherepica', 'monterej', '0.45', 'Стандарт Полиэстер', '', 720],
    ['metallocherepica', 'monterej', '0.45', 'Стальной бархат', '', 950],

    ['saiding', 'korabelnaya', '0.45', 'Стандарт Полиэстер', '', 760],
    ['saiding', 'korabelnaya', '0.45', 'Printech', '', 1400],

    // Fallbacks to simulate products without specific coating listed
    ['shtaketnik', 'uzkiy', '0.45', '', '', 500],
    ['shtaketnik', 'polukrugly', '0.45', '', '', 520],
    ['shtaketnik', 'figurny', '0.45', '', '', 530],
    ['shtaketnik', 'shirokiy', '0.45', '', '', 540],
    ['shtaketnik', 'pletenka', '0.45', '', '', 560],

    ['lameli', 'evrozhaluzi', '0.45', '', '', 850],
    ['dobornie', 'individual', '0.45', '', '', 700],
    ['dobornie', 'individual', '0.5', '', '', 770]
];

const ws = xlsx.utils.aoa_to_sheet(data);
ws['!cols'] = [{ wch: 20 }, { wch: 18 }, { wch: 10 }, { wch: 25 }, { wch: 12 }, { wch: 12 }];
const wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, ws, 'Прайс');
xlsx.writeFile(wb, 'prices.xlsx');
console.log('prices.xlsx generated successfully with coatings.');
