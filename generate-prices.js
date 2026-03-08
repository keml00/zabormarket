const XLSX = require('xlsx');
const path = require('path');

// All products from data.js
const products = [
    {
        category: 'Профнастил', models: [
            { name: 'С-8', thicknesses: ['0.35', '0.45', '0.5', '0.65'] },
            { name: 'НС-10', thicknesses: ['0.35', '0.45', '0.5', '0.65'] },
            { name: 'НС-20', thicknesses: ['0.35', '0.45', '0.5', '0.65'] },
            { name: 'С-21', thicknesses: ['0.35', '0.45', '0.5', '0.65'] },
            { name: 'НС-21', thicknesses: ['0.35', '0.45', '0.5', '0.65'] },
            { name: 'НС-35', thicknesses: ['0.35', '0.45', '0.5', '0.65'] },
            { name: 'С-44', thicknesses: ['0.35', '0.45', '0.5', '0.65'] },
            { name: 'Н-60', thicknesses: ['0.45', '0.5', '0.65'] },
            { name: 'Н-75', thicknesses: ['0.45', '0.5', '0.65'] },
        ]
    },
    {
        category: 'Металлочерепица', models: [
            { name: 'Монтерей', thicknesses: ['0.45', '0.5'] },
        ]
    },
    {
        category: 'Сайдинг', models: [
            { name: 'Корабельная доска', thicknesses: ['0.45'] },
            { name: 'Евро брус', thicknesses: ['0.45'] },
            { name: 'Блок хаус', thicknesses: ['0.45'] },
            { name: 'Бревно 4D', thicknesses: ['0.45'] },
        ]
    },
    {
        category: 'ПСП панель и Софиты', models: [
            { name: 'Линеарная панель Гладкая', thicknesses: ['0.45'] },
            { name: 'Линеарная панель Рифленая', thicknesses: ['0.45'] },
            { name: 'Линеарная панель С перфорацией', thicknesses: ['0.45'] },
            { name: 'Линеарная панель С полосой', thicknesses: ['0.45'] },
            { name: 'Софиты', thicknesses: ['0.45'] },
        ]
    },
    {
        category: 'Штакетник', models: [
            { name: 'Узкий', thicknesses: ['0.45'] },
            { name: 'Полукруглый', thicknesses: ['0.45'] },
            { name: 'Фигурный', thicknesses: ['0.45'] },
            { name: 'Широкий', thicknesses: ['0.45'] },
            { name: 'Плетенка', thicknesses: ['0.45'] },
        ]
    },
    {
        category: 'Ламели (Евро жалюзи)', models: [
            { name: 'Евро жалюзи', thicknesses: ['0.45'] },
        ]
    },
    {
        category: 'Доборные элементы', models: [
            { name: 'Любой размер (индивидуально)', thicknesses: ['0.45', '0.5'] },
        ]
    },
];

// All available colors
const colors = [
    'RAL 3005', 'RAL 6005', 'RAL 7024', 'RAL 8004', 'RAL 8017', 'RAL 2004', 'Цинк',
    'RAL 9005', 'RAL 7004', 'RAL 5005', 'RAL 5002', 'RAL 5021', 'RAL 6002', 'RAL 6020', 'RAL 9003', 'RAL 9010'
];

// Standard coatings
const coatings = ['Полиэстер', 'Матовое'];

const rows = [['Категория', 'Модель', 'Толщина (мм)', 'Покрытие', 'Цвет', 'Цена (руб/м2)']];

products.forEach(cat => {
    cat.models.forEach(model => {
        model.thicknesses.forEach(thickness => {
            coatings.forEach(coating => {
                colors.forEach(color => {
                    // Skip zinc for non-galvanized coatings
                    if (color === 'Цинк' && coating !== 'Полиэстер') return;
                    rows.push([
                        cat.category,
                        model.name,
                        thickness,
                        coating,
                        color,
                        ''   // price cell - to be filled by user
                    ]);
                });
            });
        });
    });
});

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(rows);

// Set column widths
ws['!cols'] = [
    { wch: 25 }, // Category
    { wch: 35 }, // Model
    { wch: 14 }, // Thickness
    { wch: 15 }, // Coating
    { wch: 12 }, // Color
    { wch: 16 }, // Price
];

// Style the header row
const headerRange = XLSX.utils.decode_range(ws['!ref']);
for (let c = headerRange.s.c; c <= headerRange.e.c; c++) {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c });
    if (!ws[cellRef]) continue;
    ws[cellRef].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: '1E3A5F' } },
        font: { color: { rgb: 'FFFFFF' }, bold: true }
    };
}

XLSX.utils.book_append_sheet(wb, ws, 'Прайс');
const outputPath = path.join(__dirname, 'prices.xlsx');
XLSX.writeFile(wb, outputPath);
console.log(`Generated prices.xlsx with ${rows.length - 1} rows.`);
