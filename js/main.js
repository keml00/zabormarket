import { products, colors, icons } from './data.js';
import { prices } from './prices.js';

// DOM
const categoryList = document.getElementById('categoryList');
const configuratorContainer = document.getElementById('productConfigurator');
const emptyState = document.getElementById('emptyState');
const configImage = document.getElementById('configImage');
const configTitle = document.getElementById('configTitle');
const configDesc = document.getElementById('configDesc');
const modelSelect = document.getElementById('modelSelect');
const thicknessSelect = document.getElementById('thicknessSelect');
const mainColorGrid = document.getElementById('mainColorGrid');
const additionalColorGrid = document.getElementById('additionalColorGrid');
const selectedColorName = document.getElementById('selectedColorName');
const lengthConfigGroup = document.getElementById('lengthConfigGroup');
const lengthLimitInfo = document.getElementById('lengthLimitInfo');
const configsBtn = document.getElementById('configsBtn');
const specsBlock = document.getElementById('specsBlock');
const dynamicLogo = document.getElementById('dynamicLogo');
const priceValueEl = document.getElementById('priceValue');

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');

// Cart DOM
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartBody = document.getElementById('cartBody');
const cartFooter = document.getElementById('cartFooter');
const cartTotalEl = document.getElementById('cartTotal');
const cartOrderBtn = document.getElementById('cartOrderBtn');
const cartCountEl = document.querySelector('.cart-count');
const cartBtn = document.querySelector('.cart-btn');

// State
let currentCategory = null;
let currentConfig = { model: null, thickness: null, coating: null, color: null, length: null };
let cart = [];   // { id, name, model, thickness, color, length, qty, price }

// ─── INIT ─────────────────────────────────────────────────────────
async function init() {
    await loadExcelPrices();
    renderCategories();
    attachCartEvents();
    loadCustomerGallery();
    initHoverZoom();
}

async function loadExcelPrices() {
    try {
        const response = await fetch('prices.xlsx');
        if (!response.ok) throw new Error('Prices file not found');
        const arrayBuffer = await response.arrayBuffer();

        if (typeof XLSX === 'undefined') {
            console.error('XLSX library is not loaded');
            return;
        }

        const wb = XLSX.read(arrayBuffer, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

        let headerRow = 0;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i] && rows[i].some(c => String(c).toLowerCase().includes('category') || String(c).toLowerCase().includes('категор'))) {
                headerRow = i; break;
            }
        }

        const headers = rows[headerRow].map(h => String(h || '').toLowerCase().trim());
        const ci = headers.findIndex(h => h.includes('category') || h.includes('категор'));
        const mi = headers.findIndex(h => h.includes('model') || h.includes('модел'));
        const ti = headers.findIndex(h => h.includes('thick') || h.includes('толщ'));
        const coatingi = headers.findIndex(h => h.includes('coating') || h.includes('покрыти'));
        const coli = headers.findIndex(h => h.includes('color') || h.includes('цвет'));
        const pi = headers.findIndex(h => h.includes('price') || h.includes('цена'));

        if (pi === -1) return;

        const pricesMap = {};
        const coatingsMap = {};
        for (let i = headerRow + 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row || !row[pi]) continue;

            const cat = ci >= 0 ? String(row[ci] || '').trim() : '';
            const model = mi >= 0 ? String(row[mi] || '').trim() : '';
            const thick = ti >= 0 ? String(row[ti] || '').trim() : '';
            const coating = coatingi >= 0 ? String(row[coatingi] || '').trim() : '';
            const color = coli >= 0 ? String(row[coli] || '').trim() : '';
            const price = parseFloat(row[pi]) || 0;

            const key = `${cat}|${model}|${thick}|${coating}|${color}`;
            pricesMap[key] = price;

            const itemKey = `${cat}|${model}|${thick}`;
            if (!coatingsMap[itemKey]) coatingsMap[itemKey] = new Set();
            if (coating) coatingsMap[itemKey].add(coating);
        }

        window.excelPrices = pricesMap;
        window.availableCoatings = {};
        for (const k in coatingsMap) {
            window.availableCoatings[k] = Array.from(coatingsMap[k]);
        }
    } catch (err) {
        console.error('Failed to load prices.xlsx:', err);
    }
}

// ─── CATEGORIES ───────────────────────────────────────────────────
function renderCategories() {
    categoryList.innerHTML = products.map(product => {
        const hasSubs = product.id === 'profnastil';
        const subHtml = hasSubs ? `
            <ul class="subcategory-list hidden" id="sub-${product.id}">
                ${product.models.map(m => `
                    <li class="subcategory-item" data-parent="${product.id}" data-model="${m.id}">
                        ${product.name} ${m.name}
                    </li>`).join('')}
            </ul>` : '';
        return `
            <li class="category-wrapper">
                <div class="category-item" data-id="${product.id}">
                    ${product.name}
                    <i class="fas fa-chevron-right dropdown-icon"></i>
                </div>
                ${subHtml}
            </li>`;
    }).join('');

    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', e => {
            const target = e.currentTarget;
            const pid = target.getAttribute('data-id');
            const sub = document.getElementById(`sub-${pid}`);
            if (target.classList.contains('active')) {
                if (sub) { sub.classList.toggle('hidden'); toggleChevron(target); }
                return;
            }
            document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.subcategory-list').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.category-item i').forEach(ic => { ic.classList.remove('fa-chevron-down'); ic.classList.add('fa-chevron-right'); });
            target.classList.add('active');
            if (sub) { sub.classList.remove('hidden'); target.querySelector('i').classList.replace('fa-chevron-right', 'fa-chevron-down'); }
            selectCategory(pid);
        });
    });

    document.querySelectorAll('.subcategory-item').forEach(item => {
        item.addEventListener('click', e => {
            e.stopPropagation();
            const target = e.currentTarget;
            const modelId = target.getAttribute('data-model');
            const parentId = target.getAttribute('data-parent');
            document.querySelectorAll('.subcategory-item').forEach(el => el.classList.remove('active'));
            target.classList.add('active');
            if (currentCategory?.id !== parentId) {
                const parentEl = document.querySelector(`.category-item[data-id="${parentId}"]`);
                if (parentEl) {
                    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
                    parentEl.classList.add('active');
                    const sub = document.getElementById(`sub-${parentId}`);
                    if (sub) { sub.classList.remove('hidden'); parentEl.querySelector('i').classList.replace('fa-chevron-right', 'fa-chevron-down'); }
                    selectCategory(parentId, modelId);
                }
            } else {
                const modelObj = currentCategory.models.find(m => m.id === modelId);
                if (modelObj) setActiveModel(modelObj);
            }
        });
    });
}

function toggleChevron(el) {
    const i = el.querySelector('i');
    i.classList.toggle('fa-chevron-right');
    i.classList.toggle('fa-chevron-down');
}

// ─── SELECT ────────────────────────────────────────────────────────
function selectCategory(id, defaultModelId = null) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    currentCategory = product;
    const firstModel = defaultModelId ? product.models.find(m => m.id === defaultModelId) : product.models[0];
    currentConfig = { model: firstModel, thickness: product.thicknesses[0], coating: null, color: null, length: null };
    emptyState.classList.add('hidden');
    configuratorContainer.classList.remove('hidden');
    configTitle.textContent = product.name;
    configDesc.textContent = product.description;
    setImage(firstModel?.image || product.image);
    updateLogo(product.id);
    resetColor();
    document.querySelectorAll('.subcategory-item').forEach(el => el.classList.remove('active'));
    if (id === 'profnastil' && firstModel) {
        const s = document.querySelector(`.subcategory-item[data-model="${firstModel.id}"]`);
        if (s) s.classList.add('active');
    }
    renderModels(); renderThicknesses(); renderCoatings(); renderColors(); renderSpecs(); handleLength(); renderPrice();
}

function setActiveModel(modelObj) {
    currentConfig.model = modelObj;
    currentConfig.coating = null;
    setImage(modelObj.image || currentCategory.image);
    document.querySelectorAll('#modelSelect .chip').forEach(c => c.classList.toggle('active', c.getAttribute('data-id') === modelObj.id));
    renderSpecs(); renderCoatings(); renderPrice();
}

function setImage(src) {
    configImage.src = src;
    // Reset zoom on image change
    configImage.style.transform = 'scale(1)';
}

async function loadCustomerGallery() {
    const galleryContainer = document.getElementById('customerGallery');
    if (!galleryContainer) return;

    // Try to load up to 12 images named 1.jpg, 2.jpg... from img/gallery/customers
    for (let i = 1; i <= 12; i++) {
        const imgPath = `img/gallery/customers/${i}.jpg`;
        const img = new Image();
        img.onload = () => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<img src="${imgPath}" alt="Наши работы ${i}">`;
            item.onclick = () => window.open(imgPath, '_blank');
            galleryContainer.appendChild(item);
        };
        img.src = imgPath;
    }
}

async function checkCustomPhoto(modelId, colorCode) {
    if (!modelId || !colorCode) return null;
    // Check for img/products/[modelId]/[colorCode]/1.jpg
    const customPath = `img/products/${modelId}/${colorCode}/1.jpg`;
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(customPath);
        img.onerror = () => resolve(null);
        img.src = customPath;
    });
}

function initHoverZoom() {
    const wrapper = document.querySelector('.config-image-wrapper');
    if (!wrapper) return;

    wrapper.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = wrapper.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        configImage.style.transformOrigin = `${x}% ${y}%`;
    });

    wrapper.addEventListener('mouseleave', () => {
        configImage.style.transform = 'scale(1)';
    });
}

async function updateLogo(categoryId) {
    if (!dynamicLogo) return;
    const iconUrl = icons[categoryId];
    if (!iconUrl) {
        dynamicLogo.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(iconUrl);
        let svgText = await response.text();
        // Remove any explicit dimensions to allow CSS control
        svgText = svgText.replace(/width=".*?"/, '').replace(/height=".*?"/, '');
        dynamicLogo.innerHTML = svgText;

        // If a color is already selected, apply it to the new SVG
        if (currentConfig.color) {
            const hex = colors.main.find(c => c.code === currentConfig.color)?.hex ||
                colors.additional.find(c => c.code === currentConfig.color)?.hex;
            if (hex) await applyColorToLogo(hex, currentConfig.color);
        }
    } catch (err) {
        console.error('Error loading SVG logo:', err);
    }
}

async function applyColorToLogo(hex, colorCode) {
    const svg = dynamicLogo.querySelector('svg');
    if (svg) {
        svg.style.transition = 'fill 0.3s ease';
        svg.style.fill = hex;
        svg.querySelectorAll('[stroke]').forEach(el => el.style.stroke = hex);
        svg.querySelectorAll('[fill]').forEach(el => el.style.fill = hex);
    }

    const model = currentConfig.model;
    if (!model) return;

    // 1. Try custom folder-based photo first
    const customPhoto = await checkCustomPhoto(model.id, colorCode);
    if (customPhoto) {
        setImage(customPhoto);
        return;
    }

    // 2. Try hardcoded colorImages
    if (model && model.colorImages && model.colorImages[colorCode]) {
        setImage(model.colorImages[colorCode]);
    } else if (model) {
        // Fallback to base model image if color variant is not found
        setImage(model.image || currentCategory.image);
    }
}

function resetColor() {
    configImage.style.borderColor = 'var(--border-glass)';
    configImage.style.boxShadow = 'var(--shadow-sm)';
    selectedColorName.textContent = 'Не выбран';
    document.querySelectorAll('.color-swatch-wrapper').forEach(el => el.classList.remove('active'));
}

// ─── MODELS / THICKNESS / COLORS ──────────────────────────────────
function renderModels() {
    modelSelect.innerHTML = currentCategory.models.map(m =>
        `<div class="chip ${currentConfig.model?.id === m.id ? 'active' : ''}" data-id="${m.id}">${m.name}</div>`
    ).join('');
    modelSelect.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', e => {
            const m = currentCategory.models.find(x => x.id === e.currentTarget.getAttribute('data-id'));
            if (!m) return;
            setActiveModel(m);
            if (currentCategory.id === 'profnastil') {
                document.querySelectorAll('.subcategory-item').forEach(el => el.classList.remove('active'));
                const s = document.querySelector(`.subcategory-item[data-model="${m.id}"]`);
                if (s) s.classList.add('active');
            }
        });
    });
}

function renderThicknesses() {
    thicknessSelect.innerHTML = currentCategory.thicknesses.map(t =>
        `<div class="chip ${currentConfig.thickness === t ? 'active' : ''}" data-value="${t}">${t} мм</div>`
    ).join('');
    thicknessSelect.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', e => {
            thicknessSelect.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentConfig.thickness = e.currentTarget.getAttribute('data-value');
            currentConfig.coating = null;
            renderCoatings();
            renderPrice();
        });
    });
}

function renderCoatings() {
    const group = document.getElementById('coatingConfigGroup');
    const select = document.getElementById('coatingSelect');
    if (!group || !select) return;

    if (!currentCategory || !currentConfig.model || !currentConfig.thickness || !window.availableCoatings) {
        group.classList.add('hidden');
        return;
    }

    const key = `${currentCategory.id}|${currentConfig.model.id}|${currentConfig.thickness}`;
    const coatings = window.availableCoatings[key] || [];

    if (coatings.length === 0) {
        group.classList.add('hidden');
        currentConfig.coating = null;
        return;
    }

    group.classList.remove('hidden');
    // Auto-select first if none selected or invalid
    if (!currentConfig.coating || !coatings.includes(currentConfig.coating)) {
        currentConfig.coating = coatings[0];
    }

    select.innerHTML = coatings.map(c =>
        `<div class="chip ${currentConfig.coating === c ? 'active' : ''}" data-value="${c}">${c}</div>`
    ).join('');

    select.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', e => {
            select.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentConfig.coating = e.currentTarget.getAttribute('data-value');
            renderPrice();
        });
    });
}

function renderColors() {
    mainColorGrid.innerHTML = colors.main.map(swatchHTML).join('');
    additionalColorGrid.innerHTML = colors.additional.map(swatchHTML).join('');
    document.querySelectorAll('.color-swatch-wrapper').forEach(w => {
        w.addEventListener('click', e => {
            document.querySelectorAll('.color-swatch-wrapper').forEach(x => x.classList.remove('active'));
            const t = e.currentTarget;
            t.classList.add('active');
            currentConfig.color = t.getAttribute('data-code');
            selectedColorName.textContent = `${t.getAttribute('data-code')} — ${t.getAttribute('data-name')}`;
            const hex = t.getAttribute('data-hex');
            configImage.style.borderColor = hex;
            configImage.style.boxShadow = `0 0 20px ${hex}40, inset 0 0 20px ${hex}40`;
            applyColorToLogo(hex, t.getAttribute('data-code'));
        });
    });
}

function swatchHTML(c) {
    return `<div class="color-swatch-wrapper" data-code="${c.code}" data-hex="${c.hex}" data-name="${c.name}" title="${c.code} — ${c.name}">
        <div class="color-swatch" style="background-color:${c.hex}"></div>
        <div class="color-code">${c.code}</div>
    </div>`;
}

// ─── SPECS ────────────────────────────────────────────────────────
function renderSpecs() {
    const m = currentConfig.model;
    if (!m || (m.totalWidth === null && m.workingWidth === null)) { specsBlock.classList.add('hidden'); return; }
    specsBlock.classList.remove('hidden');
    document.getElementById('specTotalWidth').textContent = m.totalWidth ? `${m.totalWidth} мм` : '—';
    document.getElementById('specWorkingWidth').textContent = m.workingWidth ? `${m.workingWidth} мм` : '—';
}

// ─── LENGTH ───────────────────────────────────────────────────────
function handleLength() {
    if (currentCategory.customLength) {
        lengthConfigGroup.classList.remove('hidden');
        lengthLimitInfo.textContent = currentCategory.maxLength ? `Максимальная длина: ${currentCategory.maxLength}` : '';
    } else {
        lengthConfigGroup.classList.add('hidden');
    }
    const inp = document.getElementById('lengthInput');
    if (inp) { inp.value = ''; currentConfig.length = null; inp.oninput = () => { currentConfig.length = parseFloat(inp.value) || null; renderPrice(); }; }
}

// ─── PRICE ────────────────────────────────────────────────────────
function getBasePrice() {
    try {
        const store = window.excelPrices;
        if (!currentCategory || !currentConfig.model) return null;

        const cat = currentCategory.id;
        const mod = currentConfig.model.id;
        const thick = currentConfig.thickness || '';
        const coating = currentConfig.coating || '';
        const color = currentConfig.color || '';

        if (store) {
            // Priority 1: Exact matches (cat, mod, thick, coating, color)
            const exactKey = `${cat}|${mod}|${thick}|${coating}|${color}`;
            if (color && coating && store[exactKey] !== undefined) return store[exactKey];

            // Priority 2: Match coating, any color
            const coatingAnyColorKey = `${cat}|${mod}|${thick}|${coating}|`;
            if (coating && store[coatingAnyColorKey] !== undefined) return store[coatingAnyColorKey];

            // Priority 3: Match color, any coating (fallback for legacy excel data)
            const colorAnyCoatingKey = `${cat}|${mod}|${thick}||${color}`;
            if (color && store[colorAnyCoatingKey] !== undefined) return store[colorAnyCoatingKey];

            // Priority 4: Match only model and thickness (and implicitly no coating or inherited base coating)
            const baseKey = `${cat}|${mod}|${thick}||`;
            if (store[baseKey] !== undefined) return store[baseKey];
        }

        // 2. Fallback to prices.js static file
        return prices[currentConfig.model.id] ?? null;
    } catch {
        // Fallback to prices.js if map fails
        return currentConfig.model ? prices[currentConfig.model.id] : null;
    }
}

function getEffectivePrice() {
    return getBasePrice();
}

function renderPrice() {
    if (!priceValueEl) return;
    const price = getEffectivePrice();
    if (price === null) { priceValueEl.textContent = 'По запросу'; return; }
    const len = currentConfig.length;
    const ww = currentConfig.model?.workingWidth;
    if (len && ww) {
        const total = price * (ww / 1000) * len;
        priceValueEl.textContent = `${total.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽  (${price.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽/м²)`;
    } else {
        priceValueEl.textContent = `${price.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽/м²`;
    }
}

// ─── CART ─────────────────────────────────────────────────────────
function attachCartEvents() {
    cartBtn.addEventListener('click', openCart);
    cartOverlay.addEventListener('click', closeCart);
    cartCloseBtn.addEventListener('click', closeCart);
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);

    cartOrderBtn.addEventListener('click', e => {
        e.preventDefault();
        const text = window._cartOrderText || '';
        navigator.clipboard.writeText(text).then(() => {
            showToast('✅ Текст заказа скопирован! Вставьте его в Telegram');
        }).catch(() => {
            showToast('Открываю Telegram...');
        });
        setTimeout(() => window.open('https://t.me/keml00', '_blank'), 200);
    });
}

function showToast(msg) {
    let toast = document.getElementById('sm-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'sm-toast';
        toast.style.cssText = `
            position:fixed; bottom:5rem; right:2rem; z-index:9999;
            background:#1a1c22; color:#fff; padding:.8rem 1.4rem;
            border-radius:10px; border:1px solid rgba(255,255,255,0.1);
            font-family:'Montserrat',sans-serif; font-size:.9rem;
            box-shadow:0 4px 20px rgba(0,0,0,0.4);
            animation: fadeIn .2s ease;
            max-width:280px; line-height:1.4;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.display = 'block';
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => { toast.style.display = 'none'; }, 3500);
}
function openCart() { cartDrawer.classList.add('open'); cartOverlay.classList.add('visible'); document.body.style.overflow = 'hidden'; }
function closeCart() { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('visible'); document.body.style.overflow = ''; }

function addToCart() {
    if (!currentCategory) return;
    if (!currentConfig.color) { alert('Пожалуйста, выберите цвет перед добавлением в корзину.'); return; }

    const name = currentCategory.name;
    const model = currentConfig.model ? currentConfig.model.name : '';
    const thick = currentConfig.thickness || '';
    const coating = currentConfig.coating || '';
    const color = currentConfig.color || '';
    const len = currentConfig.length ? `${currentConfig.length} м` : '';
    const price = getEffectivePrice();
    const ww = currentConfig.model?.workingWidth;
    let itemPrice = null;
    if (price !== null && len && ww) { itemPrice = price * (ww / 1000) * currentConfig.length; }
    else if (price !== null) { itemPrice = price; }

    // Build a unique key to group same items
    const key = `${currentCategory.id}|${model}|${thick}|${coating}|${color}|${len}`;
    const existing = cart.find(i => i.key === key);
    if (existing) {
        existing.qty++;
        if (itemPrice !== null) existing.totalPrice = itemPrice * existing.qty;
    } else {
        cart.push({ key, name, model, thick, coating, color, len, qty: 1, unitPrice: itemPrice, totalPrice: itemPrice });
    }

    renderCart();
    updateCartCount();
    openCart();

    // Feedback on button
    const btn = document.getElementById('addToCartBtn');
    btn.innerHTML = '<i class="fas fa-check"></i> Добавлено';
    btn.style.background = '#2D5528';
    setTimeout(() => { btn.innerHTML = 'Добавить в корзину'; btn.style.background = ''; }, 2000);
}

function removeFromCart(key) {
    cart = cart.filter(i => i.key !== key);
    renderCart();
    updateCartCount();
}

function renderCart() {
    if (cart.length === 0) {
        cartBody.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-cart"></i><p>Корзина пуста</p></div>`;
        cartFooter.style.display = 'none';
        return;
    }

    const hasAnyPrice = cart.some(i => i.unitPrice !== null);
    let totalSum = 0;
    cartBody.innerHTML = cart.map(item => {
        const priceStr = item.unitPrice !== null
            ? `${(item.totalPrice || item.unitPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽`
            : 'По запросу';
        if (item.totalPrice) totalSum += item.totalPrice;

        const descParts = [item.model, item.thick ? `${item.thick} мм` : '', item.coating, item.color, item.len].filter(Boolean);
        return `
        <div class="cart-item">
            <div class="cart-item-info">
                <strong class="cart-item-name">${item.name}</strong>
                <span class="cart-item-desc">${descParts.join(' · ')}</span>
                <span class="cart-item-price">${priceStr}</span>
            </div>
            <div class="cart-item-actions">
                <span class="cart-item-qty">×${item.qty}</span>
                <button class="cart-remove-btn" onclick="window._removeCartItem('${item.key}')"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>`;
    }).join('');

    if (hasAnyPrice && totalSum > 0) {
        cartTotalEl.textContent = `${totalSum.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽`;
    } else {
        cartTotalEl.textContent = 'По запросу';
    }

    // Build order text for Telegram
    const msgParts = cart.map(i => {
        const desc = [i.model, i.thick ? `${i.thick} мм` : '', i.coating, i.color, i.len].filter(Boolean).join(', ');
        const price = i.unitPrice !== null ? `${(i.totalPrice || i.unitPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽` : 'цена по запросу';
        return `• ${i.name} (${desc}) ×${i.qty} — ${price}`;
    });
    const totalLine = totalSum > 0 ? `\nИтого: ${totalSum.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽` : '';
    window._cartOrderText = `Здравствуйте! Хочу сделать заказ:\n${msgParts.join('\n')}${totalLine}`;
    // href stays plain — actual open handled by click listener
    cartOrderBtn.href = 'https://t.me/keml00';

    cartFooter.style.display = 'flex';
}

function updateCartCount() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    cartCountEl.textContent = total;
}

// Expose remove handler globally (needed for inline onclick)
window._removeCartItem = removeFromCart;

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

// Close mobile menu on link click
mainNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        mainNav.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', init);
