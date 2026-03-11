export const colors = {
    main: [
        { code: 'RAL 1014', hex: '#E1CCAE', name: 'Слоновая кость (Бежевый)' },
        { code: 'RAL 3005', hex: '#5B1E31', name: 'Красное вино' },
        { code: 'RAL 6005', hex: '#114232', name: 'Зелёный мох' },
        { code: 'RAL 7024', hex: '#474A51', name: 'Серый графит' },
        { code: 'RAL 8004', hex: '#8E402A', name: 'Медно-коричневый' },
        { code: 'RAL 8017', hex: '#442F29', name: 'Шоколадно-коричневый' },
        { code: 'RAL 2004', hex: '#E75B12', name: 'Оранжевый (апельсин)' },
        { code: 'Цинк', hex: '#B0BEC5', name: 'Оцинкованный', border: '#78909C' }
    ],
    additional: [
        { code: 'RAL 9005', hex: '#0A0A0A', name: 'Чёрный' },
        { code: 'RAL 7004', hex: '#9EA0A1', name: 'Светло-серый' },
        { code: 'RAL 5005', hex: '#005387', name: 'Синий' },
        { code: 'RAL 5002', hex: '#20214F', name: 'Ультрамарин синий' },
        { code: 'RAL 5021', hex: '#007577', name: 'Бирюза' },
        { code: 'RAL 6002', hex: '#2D5528', name: 'Зелёная листва' },
        { code: 'RAL 6020', hex: '#37422F', name: 'Хромовый зелёный' },
        { code: 'RAL 9003', hex: '#ECECE4', name: 'Сигнальный белый' },
        { code: 'RAL 9010', hex: '#F1ECE1', name: 'Чистый белый' }
    ]
};

// Product images: professional 3D renders
const IMG = {
    profnastil: 'https://centermk.ru/upload/iblock/f2b/plii54ftzr7cbxre37lhf0h0qv38lpcc/Profnastil-S_8-proizvodstva-TPK-TSentr-Metallokrovli.png',
    metallocherepica: 'https://centermk.ru/upload/iblock/5cf/quc3viil34r6p0akh0o85rp6nmkbzij4/Metallocherepitsa-Monterrey-_Merkuriy_-proizvodstva-TPK-TSentr-Metallokrovli.png',
    saiding: 'https://centermk.ru/upload/iblock/4b8/tz61yxfwgsdvu5bvf9i5408v0dhm0n2h/Metallosayding-korabelnaya-doska-dlya-fasada.webp',
    sofity: 'https://centermk.ru/upload/iblock/130/k8omtjkw9xxrvd7njzkzaafr8f9xn78t/Linearnaya-panel-Gladkaya-potolochno_stenovaya.webp',
    shtaketnik: 'https://centermk.ru/upload/iblock/cc5/i26r134y2pnmqeupbabk7pa9t0408myy/SHtaketnik-Polukruglyy-dlya-zaborov-i-ograzhdeniy-proizvodstva-TSentr-Metallokrovli.png',
    lameli: 'img/evrozhaluzi_main.jpg',
    dobornie: 'https://centermk.ru/upload/iblock/3a4/4ivphmnti4vdlf79ftyxiujq07uy0w25/Dobornye-elementy-krovli_-fasada_-zabora-proizvodstva-TSentr-Metallokrovli.webp',
};

// Icons for dynamic coloring
export const icons = {
    profnastil: 'https://centermk.ru/upload/uf/ad1/ch1cws8v69refgwt6u9p6tk2ok6uuoqv/Profnastil-_proflist_-dlya-krovli_-fasada_-zabora.svg',
    metallocherepica: 'https://centermk.ru/upload/uf/110/eqcfsa1sfha9j55rvp7n30mnab3w6jg8/Metallocherepitsa-dlya-krovli-kryshi.svg',
    saiding: 'https://centermk.ru/upload/uf/b76/aqzwm2v57zlyaisqvdu5un58rpdotclt/Metallicheskiy-sayding-dlya-fasada-doma.svg',
    psp_sofiti: 'https://centermk.ru/upload/uf/94c/2g69y25l5uw0mhtosebqjkavlh78f0ok/Linearnye-potolochno_stenovye-paneli.svg',
    shtaketnik: 'https://centermk.ru/upload/uf/912/ab11gmeg1q3wiknug9eq3s38b9lhcuy7/Zabor-iz-shtaketnika.svg',
    lameli: 'https://centermk.ru/upload/uf/187/6uzte27c4mmem1i2j0keluhd3ixofkn0/Zabor-zhalyuzi_-rancho_-dvustoronniy.svg',
    dobornie: 'https://centermk.ru/upload/uf/7fa/lqpvhu23ahqe7ssml8lv6hen143ssk62/Dobornye-elementy-krovli_-fasada_-zabora.svg'
};

export const products = [
    {
        id: 'profnastil',
        name: 'Профнастил',
        description: 'Стеновой и кровельный профнастил',
        image: IMG.profnastil,
        thicknesses: ['0.45', '0.5', '0.65'],
        customLength: true,
        models: [
            {
                id: 'S-8', name: 'С-8', totalWidth: 1190, workingWidth: 1150,
                thicknesses: ['0.35', '0.45', '0.5', '0.65'],
                image: 'https://centermk.ru/upload/iblock/f2b/plii54ftzr7cbxre37lhf0h0qv38lpcc/Profnastil-S_8-proizvodstva-TPK-TSentr-Metallokrovli.png',
                colorImages: {
                    'RAL 1014': 'https://centermk.ru/upload/iblock/ee9/4m40pu1xc68ux4c36jhf2mpv8j309raq.jpg',
                    'RAL 3005': 'https://centermk.ru/upload/iblock/762/mgb3hvzp4rkvnctcmcbky9o6dsfiwpyw/onn5b3oumfkhrd5o7ngzq6ms1mvdy0mp.jpg',
                    'RAL 6005': 'https://centermk.ru/upload/iblock/89e/89e670ce8c46558bfec1cf06bf418567.jpg',
                    'RAL 7024': 'https://centermk.ru/upload/iblock/cfe/28ah4skw1dlf4bgkbruq204e6ftqc5xe/wrhimd5pelmvbc4r8uxtwik6o9ww1pea.jpg',
                    'RAL 8004': 'https://centermk.ru/upload/iblock/af0/p5ll8nghumnz6jfv2s0lr0nyqyp6o8yu/4m40pu1xc68ux4c36jhf2mpv8j309raq.jpg',
                    'RAL 8017': 'https://centermk.ru/upload/iblock/af0/p5ll8nghumnz6jfv2s0lr0nyqyp6o8yu/4m40pu1xc68ux4c36jhf2mpv8j309raq.jpg',
                    'RAL 2004': 'https://centermk.ru/upload/iblock/ee9/4m40pu1xc68ux4c36jhf2mpv8j309raq.jpg',
                    'RAL 9003': 'https://centermk.ru/upload/iblock/bbb/60oxue11l27fjuy1cvq1qrb0abqtshab/h43d4v40m55zu72tx60zdzf1k5nen0b4.jpg',
                    'RAL 9010': 'https://centermk.ru/upload/iblock/bbb/60oxue11l27fjuy1cvq1qrb0abqtshab/h43d4v40m55zu72tx60zdzf1k5nen0b4.jpg',
                    'Цинк': 'https://centermk.ru/upload/uf/aef/2gqfhrv3yd4axagdcm1wz0yev2mi4hv1.jpg'
                }
            },
            {
                id: 'NS-10', name: 'НС-10', totalWidth: 1190, workingWidth: 1150,
                thicknesses: ['0.35', '0.45', '0.5', '0.65'],
                image: 'https://centermk.ru/upload/iblock/8d6/lnhj7es0mmfj0pvvy118eq8rzjtd208d/Profnastil-NS_10-proizvodstva-TPK-TSentr-Metallokrovli.png',
                colorImages: {
                    'RAL 6005': 'https://centermk.ru/upload/iblock/638/u9ic9zay2t091i5x1qixwmsxaym984o7.jpg',
                    'RAL 7024': 'https://centermk.ru/upload/iblock/66e/x1giyuj1f88i8z0o1t3d4pzhptm3a01q.jpg',
                    'RAL 8004': 'https://centermk.ru/upload/iblock/af0/p5ll8nghumnz6jfv2s0lr0nyqyp6o8yu/4m40pu1xc68ux4c36jhf2mpv8j309raq.jpg',
                    'RAL 8017': 'https://centermk.ru/upload/iblock/af0/p5ll8nghumnz6jfv2s0lr0nyqyp6o8yu/4m40pu1xc68ux4c36jhf2mpv8j309raq.jpg',
                    'Цинк': 'https://centermk.ru/upload/uf/aef/2gqfhrv3yd4axagdcm1wz0yev2mi4hv1.jpg'
                }
            },
            { id: 'NS-20', name: 'НС-20', totalWidth: 1150, workingWidth: 1100, thicknesses: ['0.45', '0.5', '0.65'], image: 'https://centermk.ru/upload/iblock/e34/4q9xk24m8ggs32odb77x233mjn03mj0q/Profnastil-NS_20-proizvodstva-TPK-TSentr-Metallokrovli.png', colorImages: { 'RAL 6005': 'https://centermk.ru/upload/iblock/638/u9ic9zay2t091i5x1qixwmsxaym984o7.jpg', 'RAL 7024': 'https://centermk.ru/upload/iblock/66e/x1giyuj1f88i8z0o1t3d4pzhptm3a01q.jpg', 'RAL 8017': 'https://centermk.ru/upload/iblock/af0/p5ll8nghumnz6jfv2s0lr0nyqyp6o8yu/4m40pu1xc68ux4c36jhf2mpv8j309raq.jpg' } },
            { id: 'S-21', name: 'С-21', totalWidth: 1051, workingWidth: 1000, thicknesses: ['0.45', '0.5', '0.65'], image: 'https://centermk.ru/upload/iblock/2dd/eksr0xn4wz7dd18dqrtff9oqrm42b0pi/Profnastil-S_21-proizvodstva-TPK-TSentr-Metallokrovli.png', colorImages: { 'RAL 6005': 'https://centermk.ru/upload/iblock/638/u9ic9zay2t091i5x1qixwmsxaym984o7.jpg', 'RAL 7024': 'https://centermk.ru/upload/iblock/66e/x1giyuj1f88i8z0o1t3d4pzhptm3a01q.jpg' } },
            { id: 'NS-21', name: 'НС-21', totalWidth: 1051, workingWidth: 1000, thicknesses: ['0.45', '0.5', '0.65'], image: 'https://centermk.ru/upload/iblock/24e/ra530bxkble35u9biegg653urotlbjr0/Profnastil-NS_21A-proizvodstva-TPK-TSentr-Metallokrovli.png', colorImages: { 'RAL 7024': 'https://centermk.ru/upload/iblock/66e/x1giyuj1f88i8z0o1t3d4pzhptm3a01q.jpg' } },
            { id: 'NS-35', name: 'НС-35', totalWidth: 1075, workingWidth: 1000, thicknesses: ['0.45', '0.5', '0.65'], image: 'https://centermk.ru/upload/iblock/50f/a60db6l8dwd0527e6isp13qj2rpvrm9s/Profnastil-NS_35-proizvodstva-TPK-TSentr-Metallokrovli.png', colorImages: { 'RAL 6005': 'https://centermk.ru/upload/iblock/638/u9ic9zay2t091i5x1qixwmsxaym984o7.jpg', 'RAL 7024': 'https://centermk.ru/upload/iblock/66e/x1giyuj1f88i8z0o1t3d4pzhptm3a01q.jpg' } },
            { id: 'S-44', name: 'С-44', totalWidth: 1047, workingWidth: 1000, thicknesses: ['0.45', '0.5', '0.65'], image: 'https://centermk.ru/upload/iblock/ecb/44lviic2772b82c4rfs9is9kg7siquwq/Profnastil-S_44-proizvodstva-TPK-TSentr-Metallokrovli.png', colorImages: { 'RAL 7024': 'https://centermk.ru/upload/iblock/66e/x1giyuj1f88i8z0o1t3d4pzhptm3a01q.jpg' } },
            { id: 'N-60', name: 'Н-60', totalWidth: 1000, workingWidth: 900, thicknesses: ['0.45', '0.5', '0.65'], image: 'https://centermk.ru/upload/iblock/cbb/jnw1pgc0lvtigqaw3f67979mhkwv4nb6/Profnastil-N_60-proizvodstva-TSentr-Metallokrovli.png', colorImages: { 'RAL 7024': 'https://centermk.ru/upload/iblock/66e/x1giyuj1f88i8z0o1t3d4pzhptm3a01q.jpg' } },
            { id: 'N-75', name: 'Н-75', totalWidth: 1000, workingWidth: 750, thicknesses: ['0.45', '0.5', '0.65'], image: 'https://centermk.ru/upload/iblock/624/blxgv9s2fc61qjvi0wprsel32jgz9uff/Profnastil-N_75-proizvodstva-TSentr-Metallokrovli.png', colorImages: { 'RAL 7024': 'https://centermk.ru/upload/iblock/66e/x1giyuj1f88i8z0o1t3d4pzhptm3a01q.jpg' } },
        ]
    },
    {
        id: 'metallocherepica',
        name: 'Металлочерепица',
        description: 'Классическая и надёжная кровля',
        image: IMG.metallocherepica,
        thicknesses: ['0.45', '0.5', '0.65'],
        customLength: true,
        models: [
            {
                id: 'monterej',
                name: 'Монтерей',
                totalWidth: 1190,
                workingWidth: 1100,
                image: 'https://centermk.ru/upload/iblock/5cf/quc3viil34r6p0akh0o85rp6nmkbzij4/Metallocherepitsa-Monterrey-_Merkuriy_-proizvodstva-TPK-TSentr-Metallokrovli.png',
                colorImages: {
                    'RAL 3005': 'https://centermk.ru/upload/iblock/0c4/a8y91co9665tk01p6iqbzbrcl38tgwxc.jpg',
                    'RAL 6005': 'https://centermk.ru/upload/iblock/24a/a2795z65pb007xu3unps9wv0lmx9o4cv.jpg',
                    'RAL 7024': 'https://centermk.ru/upload/iblock/c50/4sj5uf8spp0jargs3m2eaaijwoxkrsl8.jpg',
                    'RAL 8017': 'https://centermk.ru/upload/resize_cache/iblock/af0/p5ll8nghumnz6jfv2s0lr0nyqyp6o8yu/400_400_140cd750bba9870f18aada2478b24840a/4m40pu1xc68ux4c36jhf2mpv8j309raq.jpg',
                    'RAL 9003': 'https://centermk.ru/upload/resize_cache/iblock/4f4/b9x82e8eq9z6u4sttx2phf88ljbk5jwl/400_400_140cd750bba9870f18aada2478b24840a/el4pqd4mzenvzzazpxvuy7mffp4l72xq.jpg',
                    'RAL 8004': 'https://centermk.ru/upload/resize_cache/iblock/b90/xgirrru47yizz000v1j6712b126redv9/400_400_140cd750bba9870f18aada2478b24840a/jvayzmpwomj966wud61oevkokfoya34c.jpg'
                }
            }
        ]
    },
    {
        id: 'saiding',
        name: 'Сайдинг',
        description: 'Металлический сайдинг для фасада',
        image: IMG.saiding,
        thicknesses: ['0.45', '0.5', '0.65'],
        customLength: true,
        models: [
            {
                id: 'korabelnaya', name: 'Корабельная доска', totalWidth: 281, workingWidth: 260, image: 'https://centermk.ru/upload/iblock/4b8/tz61yxfwgsdvu5bvf9i5408v0dhm0n2h/Metallosayding-korabelnaya-doska-dlya-fasada.webp',
                colorImages: {
                    'RAL 3005': 'https://centermk.ru/upload/iblock/b35/q51e941q3at67b84k61ly6p3z29unm2h.jpg',
                    'RAL 6005': 'https://centermk.ru/upload/iblock/58a/z3idlsd84310s985re7vbeaq26759y87.jpg',
                    'RAL 7024': 'https://centermk.ru/upload/iblock/a77/a77481dc761f086d107f211bc724d9ff.jpg'
                }
            },
            { id: 'evrobrus', name: 'Евро брус', totalWidth: 210, workingWidth: 190, image: 'https://centermk.ru/upload/iblock/878/igxm2jeek43xi0faj16fuf4sk522f10a/Metallosayding-Evro_Brus-pod-brus-dlya-fasada.webp', colorImages: { 'RAL 7024': 'https://centermk.ru/upload/iblock/a77/a77481dc761f086d107f211bc724d9ff.jpg', 'RAL 8017': 'https://centermk.ru/upload/iblock/b35/q51e941q3at67b84k61ly6p3z29unm2h.jpg' } },
            { id: 'blokkhaus', name: 'Блок хаус', totalWidth: 260, workingWidth: 230, image: 'https://centermk.ru/upload/iblock/85a/6k98f1vpo5hcp42k88eifxhdaa2d19ey/Metallicheskiy-sayding-Evro_Brus-pod-brus-dlya-fasada-doma.webp', colorImages: { 'RAL 7024': 'https://centermk.ru/upload/iblock/a77/a77481dc761f086d107f211bc724d9ff.jpg', 'RAL 8017': 'https://centermk.ru/upload/iblock/b35/q51e941q3at67b84k61ly6p3z29unm2h.jpg' } },
            { id: 'brevno4d', name: 'Бревно 4D', totalWidth: 337, workingWidth: 337, image: 'https://centermk.ru/upload/iblock/bda/eo3y7rhlc9ygvb90fl97gn33n7lfw8rq/Metallicheskiy-sayding-Brevno-Rublenoe-4D-dlya-fasada_1.webp' }
        ]
    },
    {
        id: 'psp_sofiti',
        name: 'ПСП панель и Софиты',
        description: 'Для подшивки карнизов и свесов',
        image: IMG.sofity,
        thicknesses: ['0.45'],
        customLength: true,
        models: [
            { id: 'psp_smooth', name: 'Линеарная панель Гладкая', totalWidth: null, workingWidth: null, image: 'https://centermk.ru/upload/iblock/130/k8omtjkw9xxrvd7njzkzaafr8f9xn78t/Linearnaya-panel-Gladkaya-potolochno_stenovaya.webp' },
            { id: 'psp_ribbed', name: 'Линеарная панель Рифленая', totalWidth: null, workingWidth: null, image: 'https://centermk.ru/upload/iblock/ec6/w8178skwu5afjymdm4csgdqrbx7m85ja/Linearnaya-panel-Riflenaya-potolochno_stenovaya.webp' },
            { id: 'psp_perforated', name: 'Линеарная панель С перфорацией', totalWidth: null, workingWidth: null, image: 'https://centermk.ru/upload/iblock/67d/2v47l0suirsvcwyk35lk1ul2rpu5mkh9/Linearnaya-panel-Perforirovannaya-_Sofit_-potolochno_stenovaya-dlya-podshivy-kryshi.webp' },
            { id: 'psp_stripe', name: 'Линеарная панель С полосой', totalWidth: null, workingWidth: null, image: 'https://centermk.ru/upload/iblock/ca0/hgygc34zihcw9cvrxdw2zd4o0oqickt9/Linearnaya-panel-s-polosoy-usilennaya-potolochno_stenovaya.webp' },
            { id: 'sofity', name: 'Софиты', totalWidth: null, workingWidth: null, image: 'https://centermk.ru/upload/iblock/67d/2v47l0suirsvcwyk35lk1ul2rpu5mkh9/Linearnaya-panel-Perforirovannaya-_Sofit_-potolochno_stenovaya-dlya-podshivy-kryshi.webp' }
        ]
    },
    {
        id: 'shtaketnik',
        name: 'Штакетник',
        description: 'Металлический штакетник для забора',
        image: IMG.shtaketnik,
        thicknesses: ['0.45'],
        customLength: true,
        models: [
            { id: 'uzkiy', name: 'Узкий', totalWidth: 85, workingWidth: 80, image: 'https://centermk.ru/upload/iblock/2c2/oppq4f4yc8ir1f84md9lav3tguuvrkl7/SHtaketnik-Uzkiy-P_obraznyy-dlya-zaborov-proizvodstva-TSentr-Metallokrovli.png' },
            { id: 'polukrugly', name: 'Полукруглый', totalWidth: 118, workingWidth: 110, image: 'https://centermk.ru/upload/iblock/cc5/i26r134y2pnmqeupbabk7pa9t0408myy/SHtaketnik-Polukruglyy-dlya-zaborov-i-ograzhdeniy-proizvodstva-TSentr-Metallokrovli.png' },
            { id: 'figurny', name: 'Фигурный', totalWidth: 118, workingWidth: 110, image: 'https://centermk.ru/upload/iblock/29a/79xxquhhwh3baqonret68h2t0i54vguw/SHtaketnik-Figurnyy-dlya-zaborov-i-ograzhdeniy-proizvodstva-TSentr-Metallokrovli.png' },
            { id: 'shirokiy', name: 'Широкий', totalWidth: 140, workingWidth: 130, image: 'https://centermk.ru/upload/iblock/e7d/a2da5ismvxqkpeeca3vchsv03jlq8l2i/SHtaketnik-SHirokiy-dlya-zaborov-i-ograzhdeniy-proizvodstva-TSentr-Metallokrovli.png' },
            { id: 'pletenka', name: 'Плетенка', totalWidth: 100, workingWidth: 92, image: 'https://centermk.ru/upload/iblock/79e/cb41sx6k47r2hjpt0ar7nk4cbap6b3nd/SHtaketnik-Avstriyskaya-Pletenka-dlya-zaborov-proizvodstva-TSentr-Metallokrovli.png' }
        ]
    },
    {
        id: 'lameli',
        name: 'Ламели (Евро жалюзи)',
        description: 'Современное решение для ограждений',
        image: 'https://centermk.ru/upload/iblock/a0c/a0c2cca9d2db19e66347292a49f11bfc.jpg',
        thicknesses: ['0.45', '0.5', '0.65'],
        customLength: true,
        models: [
            {
                id: 'evrozhaluzi',
                name: 'Евро жалюзи',
                totalWidth: 115,
                workingWidth: 115,
                image: 'https://centermk.ru/upload/iblock/a0c/a0c2cca9d2db19e66347292a49f11bfc.jpg',
                colorImages: {
                    'RAL 3005': 'https://centermk.ru/upload/iblock/c34/10000787_ral3005_krasnoe_vino.jpg',
                    'RAL 6005': 'https://centermk.ru/upload/iblock/c2d/10000781_ral6005_zelenyj_moh.jpg',
                    'RAL 7024': 'https://centermk.ru/upload/iblock/a0c/a0c2cca9d2db19e66347292a49f11bfc.jpg',
                    'RAL 8017': 'https://centermk.ru/upload/iblock/af0/p5ll8nghumnz6jfv2s0lr0nyqyp6o8yu/4m40pu1xc68ux4c36jhf2mpv8j309raq.jpg',
                    'RAL 9003': 'https://centermk.ru/upload/iblock/bbb/60oxue11l27fjuy1cvq1qrb0abqtshab/h43d4v40m55zu72tx60zdzf1k5nen0b4.jpg'
                }
            }
        ]
    },
    {
        id: 'dobornie',
        name: 'Доборные элементы',
        description: 'Планки конька, торцевые, карнизные и др.',
        image: IMG.dobornie,
        thicknesses: ['0.45', '0.5'],
        customLength: true,
        maxLength: 'до 3м',
        models: [
            { id: 'individual', name: 'Любой размер (индивидуально)', totalWidth: null, workingWidth: null, image: IMG.dobornie }
        ]
    }
];
