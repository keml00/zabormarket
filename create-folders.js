const fs = require('fs');
const path = require('path');

// Mocking the parts of data.js we need if we can't import easily
const colors = [
    'RAL 3005', 'RAL 6005', 'RAL 7024', 'RAL 8004', 'RAL 8017', 'RAL 2004', 'Цинк',
    'RAL 9005', 'RAL 7004', 'RAL 5005', 'RAL 5002', 'RAL 5021', 'RAL 6002', 'RAL 6020', 'RAL 9003', 'RAL 9010'
];

const products = [
    { id: 'profnastil', models: ['S-8', 'NS-10', 'NS-20', 'S-21', 'NS-21', 'NS-35', 'S-44', 'N-60', 'N-75'] },
    { id: 'metallocherepica', models: ['monterej'] },
    { id: 'saiding', models: ['korabelnaya', 'evrobrus', 'blokkhaus', 'brevno4d'] },
    { id: 'psp_sofiti', models: ['psp_smooth', 'psp_ribbed', 'psp_perforated', 'psp_stripe', 'sofity'] },
    { id: 'shtaketnik', models: ['uzkiy', 'polukrugly', 'figurny', 'shirokiy', 'pletenka'] },
    { id: 'lameli', models: ['evrozhaluzi'] },
    { id: 'dobornie', models: ['individual'] }
];

const baseDir = path.join(__dirname, 'img', 'products');

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

products.forEach(p => {
    p.models.forEach(m => {
        colors.forEach(c => {
            // Clean the color name for folder compatibility
            const cleanColor = c.replace(/\s+/g, '_');
            const dir = path.join(baseDir, m, cleanColor);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`Created: ${dir}`);
            }
        });
    });
});

console.log('Folder structure generation complete.');
