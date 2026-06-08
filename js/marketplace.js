const STORAGE_KEY = 'evkeeperMarketplace';

const PARTS_SUBCATEGORIES = {
    'power-module': '電源模組',
    controller: '控制器',
    charging: '充電設備',
    other: '其他零件',
};

const BATTERY_BUY_SUBCATEGORIES = {
    'full-pack': '完整電池組',
    module: '電池模組',
    recycled: '回收電池（二手合規）',
};

const BATTERY_DISPOSE_SUBCATEGORIES = {
    'recycling-service': '電池回收服務',
    disposal: '廢棄電池棄置',
};

const BATTERY_SECTIONS = {
    buy: { label: '購買', desc: '購入合規認可的電池、模組與二手電池組' },
    dispose: { label: '回收／棄置', desc: '聯絡回收商妥善處理廢棄電池' },
};

function getBatteryGroup(subcategory) {
    if (subcategory === 'recycling-service' || subcategory === 'disposal') return 'dispose';
    return 'buy';
}

function emptyContact() {
    return { whatsapp: '', email: '' };
}

const SELLER_TYPES = {
    recycler: '回收商',
    repair: '維修站',
    private: '私人車主',
};

const CERTIFICATIONS = {
    epd: '環保署認可',
    repair: '維修站檢測',
    none: '未認證',
};

const CONDITIONS = {
    new: '全新',
    'like-new': '九成新',
    refurbished: '維修翻新',
};

function getSeedListings() {
    return [
        {
            id: 'seed-p1',
            category: 'parts',
            subcategory: 'power-module',
            title: 'Tesla Model 3 充電模組（九成新）',
            description: '原廠拆車件，功能正常，適用 2019–2022 Model 3 Long Range。含安裝說明，可面交測試。',
            price: 3200,
            condition: 'like-new',
            compatibleModel: 'Tesla Model 3',
            location: '九龍 觀塘',
            sellerName: '阿明 EV 零件',
            sellerType: 'private',
            contact: emptyContact(),
            imageUrl: 'https://placehold.co/400x300/0f172a/00ff88?text=Power+Module',
            createdAt: '2025-11-01T10:00:00.000Z',
            isSeed: true,
        },
        {
            id: 'seed-p2',
            category: 'parts',
            subcategory: 'charging',
            title: 'Wallbox Pulsar Plus 7kW 充電樁',
            description: '家用單相充電樁，支援 App 控制，安裝約一年，外觀良好。含固定支架，買家自備安裝。',
            price: 4500,
            condition: 'like-new',
            compatibleModel: '通用 AC 充電',
            location: '新界 沙田',
            sellerName: '沙田車主 Leo',
            sellerType: 'private',
            contact: emptyContact(),
            imageUrl: 'https://placehold.co/400x300/0f172a/00ff88?text=Wallbox+7kW',
            createdAt: '2025-11-15T08:00:00.000Z',
            isSeed: true,
        },
        {
            id: 'seed-p3',
            category: 'parts',
            subcategory: 'controller',
            title: 'Nissan Leaf BMS 控制器',
            description: '2018 Leaf 拆車 BMS 控制器，已測試讀取正常。適合維修或研究用途。',
            price: 1800,
            condition: 'refurbished',
            compatibleModel: 'Nissan Leaf (2018)',
            location: '港島 筲箕灣',
            sellerName: '筲箕灣電動維修',
            sellerType: 'repair',
            contact: emptyContact(),
            imageUrl: 'https://placehold.co/400x300/0f172a/00ff88?text=BMS+Controller',
            createdAt: '2025-12-01T12:00:00.000Z',
            isSeed: true,
        },
        {
            id: 'seed-p4',
            category: 'parts',
            subcategory: 'other',
            title: 'Leaf 電源逆變器模組',
            description: '日產 Leaf 原廠逆變器，適用早期 Leaf 車型。已做基本功能測試，售出不退。',
            price: 2600,
            condition: 'refurbished',
            compatibleModel: 'Nissan Leaf',
            location: '九龍 深水埗',
            sellerName: '深水埗二手電動',
            sellerType: 'private',
            contact: emptyContact(),
            imageUrl: 'https://placehold.co/400x300/0f172a/00ff88?text=Inverter',
            createdAt: '2025-12-10T09:00:00.000Z',
            isSeed: true,
        },
        {
            id: 'seed-b1',
            category: 'battery',
            subcategory: 'module',
            title: '認證回收模組 24kWh SOH 88%',
            description: '環保署認可回收商出品，經檢測 SOH 88%，適用部分商用 EV 改裝或儲能研究。附檢測報告。',
            price: 12000,
            condition: 'refurbished',
            compatibleModel: '多款商用 EV',
            location: '新界 元朗',
            sellerName: '綠能電池回收中心',
            sellerType: 'recycler',
            contact: emptyContact(),
            imageUrl: 'https://placehold.co/400x300/0f172a/00ff88?text=24kWh+Module',
            soh: 88,
            capacityKwh: 24,
            certification: 'epd',
            createdAt: '2025-10-20T10:00:00.000Z',
            isSeed: true,
        },
        {
            id: 'seed-b2',
            category: 'battery',
            subcategory: 'full-pack',
            title: '維修站整組電池 60kWh',
            description: '維修站更換下來的整組電池，SOH 約 82%，適用指定車型需確認。可安排專業安裝服務（另議）。',
            price: 38000,
            condition: 'refurbished',
            compatibleModel: 'Tesla Model S (需確認)',
            location: '九龍 紅磡',
            sellerName: '紅磡 EV 維修站',
            sellerType: 'repair',
            contact: emptyContact(),
            imageUrl: 'https://placehold.co/400x300/0f172a/00ff88?text=60kWh+Pack',
            soh: 82,
            capacityKwh: 60,
            certification: 'repair',
            createdAt: '2025-11-05T14:00:00.000Z',
            isSeed: true,
        },
        {
            id: 'seed-b3',
            category: 'battery',
            subcategory: 'recycling-service',
            batteryGroup: 'dispose',
            title: '環保署認可 — 廢棄 EV 電池回收服務',
            description: '提供退役電動車鋰電池合規回收、運送及處理。適合車主、車行及物業管理。免費上門評估（港島及九龍）。',
            price: 0,
            condition: 'new',
            compatibleModel: '所有 EV 電池',
            location: '港島 柴灣',
            sellerName: '環保署認可 EV 電池處理中心',
            sellerType: 'recycler',
            contact: emptyContact(),
            imageUrl: 'https://placehold.co/400x300/0f172a/00ff88?text=Recycling+Service',
            soh: null,
            capacityKwh: null,
            certification: 'epd',
            createdAt: '2025-09-01T08:00:00.000Z',
            isSeed: true,
        },
        {
            id: 'seed-b4',
            category: 'battery',
            subcategory: 'recycled',
            title: '二手合規電池組 40kWh',
            description: '經維修站檢測的二手合規電池，SOH 85%，附基本保養建議。買家需自行安排運輸及安裝。',
            price: 22000,
            condition: 'refurbished',
            compatibleModel: '多款中型 EV',
            location: '新界 屯門',
            sellerName: '屯門循環電池',
            sellerType: 'recycler',
            contact: emptyContact(),
            imageUrl: 'https://placehold.co/400x300/0f172a/00ff88?text=40kWh+Used',
            soh: 85,
            capacityKwh: 40,
            certification: 'repair',
            createdAt: '2025-12-01T11:00:00.000Z',
            isSeed: true,
        },
        {
            id: 'seed-b5',
            category: 'battery',
            subcategory: 'module',
            title: '私人出售 Model 3 電池模組',
            description: '升級換下的一組模組，SOH 約 79%，適合有技術背景買家。不建議無經驗者自行安裝。',
            price: 8500,
            condition: 'like-new',
            compatibleModel: 'Tesla Model 3',
            location: '港島 中環',
            sellerName: 'Jason（私人車主）',
            sellerType: 'private',
            contact: emptyContact(),
            imageUrl: 'https://placehold.co/400x300/0f172a/00ff88?text=Model+3+Module',
            soh: 79,
            capacityKwh: 16,
            certification: 'none',
            createdAt: '2025-12-18T16:00:00.000Z',
            isSeed: true,
        },
        {
            id: 'seed-b6',
            category: 'battery',
            subcategory: 'disposal',
            batteryGroup: 'dispose',
            title: '退役電池棄置 — 上門收取服務',
            description: '專為已無法繼續使用的 EV 電池提供合規棄置方案，含評估、包裝指引及運送至認可處理設施。',
            price: 0,
            condition: 'new',
            compatibleModel: '所有 EV 電池',
            location: '新界 葵涌',
            sellerName: '葵涌環保處理站',
            sellerType: 'recycler',
            contact: emptyContact(),
            imageUrl: 'https://placehold.co/400x300/0f172a/00ff88?text=Disposal+Service',
            soh: null,
            capacityKwh: null,
            certification: 'epd',
            createdAt: '2025-10-01T08:00:00.000Z',
            isSeed: true,
        },
    ];
}

class MarketplaceSystem {
    constructor() {
        this.currentCategory = 'parts';
        this.currentBatterySection = 'buy';
        this.currentSubcategory = 'all';
        this.currentSort = 'newest';
        this.searchQuery = '';
        this.currentListingId = null;
        this.data = this.load();
        this.init();
    }

    normalizeListing(listing) {
        listing.contact = emptyContact();
        if (listing.category === 'battery') {
            listing.batteryGroup = listing.batteryGroup || getBatteryGroup(listing.subcategory);
        }
        return listing;
    }

    load() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                const seedIds = new Set(getSeedListings().map((l) => l.id));
                const userListings = (parsed.listings || [])
                    .filter((l) => !l.isSeed && !seedIds.has(l.id))
                    .map((l) => this.normalizeListing(l));
                return {
                    listings: [...getSeedListings(), ...userListings],
                    inquiries: parsed.inquiries || [],
                };
            } catch {
                /* fall through */
            }
        }
        return { listings: getSeedListings(), inquiries: [] };
    }

    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    }

    init() {
        this.setupEventListeners();
        this.updateBatterySectionVisibility();
        this.renderSubcategoryFilters();
        this.renderGrid();
        this.renderMySection();
    }

    setupEventListeners() {
        document.querySelectorAll('.marketplace-tab').forEach((tab) => {
            tab.addEventListener('click', () => this.switchCategory(tab.dataset.category));
        });

        document.querySelectorAll('.battery-section-tab').forEach((tab) => {
            tab.addEventListener('click', () => this.switchBatterySection(tab.dataset.batterySection));
        });

        document.getElementById('marketplaceSearch').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.trim().toLowerCase();
            this.renderGrid();
        });

        document.getElementById('marketplaceSort').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderGrid();
        });

        document.getElementById('postListingBtn').addEventListener('click', () => this.openPostForm());

        document.querySelectorAll('.modal .close-btn, .modal [data-close-modal]').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) modal.classList.add('hidden');
            });
        });

        document.getElementById('postListingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitListing();
        });

        document.getElementById('inquiryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitInquiry();
        });

        document.querySelectorAll('.my-marketplace-tab').forEach((tab) => {
            tab.addEventListener('click', () => this.switchMyTab(tab.dataset.myTab));
        });
    }

    switchCategory(category) {
        this.currentCategory = category;
        this.currentSubcategory = 'all';
        if (category === 'battery') {
            this.currentBatterySection = 'buy';
            document.querySelectorAll('.battery-section-tab').forEach((tab) => {
                tab.classList.toggle('active', tab.dataset.batterySection === 'buy');
            });
        }
        document.querySelectorAll('.marketplace-tab').forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });
        this.updateBatterySectionVisibility();
        this.renderSubcategoryFilters();
        this.renderGrid();
    }

    switchBatterySection(section) {
        this.currentBatterySection = section;
        this.currentSubcategory = 'all';
        document.querySelectorAll('.battery-section-tab').forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.batterySection === section);
        });
        this.updateBatterySectionDescription();
        this.renderSubcategoryFilters();
        this.renderGrid();
    }

    updateBatterySectionVisibility() {
        const wrapper = document.getElementById('batterySectionWrapper');
        if (!wrapper) return;
        wrapper.classList.toggle('hidden', this.currentCategory !== 'battery');
        if (this.currentCategory === 'battery') {
            this.updateBatterySectionDescription();
        }
    }

    updateBatterySectionDescription() {
        const descEl = document.getElementById('batterySectionDesc');
        if (!descEl) return;
        const section = BATTERY_SECTIONS[this.currentBatterySection];
        descEl.textContent = section ? section.desc : '';
    }

    getBatterySubcategories() {
        return this.currentBatterySection === 'dispose'
            ? BATTERY_DISPOSE_SUBCATEGORIES
            : BATTERY_BUY_SUBCATEGORIES;
    }

    renderSubcategoryFilters() {
        const container = document.getElementById('subcategoryFilters');
        const subs = this.currentCategory === 'parts'
            ? PARTS_SUBCATEGORIES
            : this.getBatterySubcategories();
        let html = '<button class="filter-btn active" data-sub="all">全部</button>';
        Object.entries(subs).forEach(([key, label]) => {
            html += `<button class="filter-btn" data-sub="${key}">${label}</button>`;
        });
        container.innerHTML = html;
        container.querySelectorAll('.filter-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentSubcategory = btn.dataset.sub;
                this.renderGrid();
            });
        });
    }

    getListings() {
        let results = this.data.listings.filter((l) => l.category === this.currentCategory);

        if (this.currentCategory === 'battery') {
            results = results.filter((l) => getBatteryGroup(l.subcategory) === this.currentBatterySection);
        }

        if (this.currentSubcategory !== 'all') {
            results = results.filter((l) => l.subcategory === this.currentSubcategory);
        }

        if (this.searchQuery) {
            const q = this.searchQuery;
            results = results.filter((l) => {
                const haystack = [
                    l.title,
                    l.description,
                    l.compatibleModel || '',
                    l.location,
                    l.sellerName,
                ].join(' ').toLowerCase();
                return haystack.includes(q);
            });
        }

        results.sort((a, b) => {
            if (this.currentSort === 'price-asc') return a.price - b.price;
            if (this.currentSort === 'price-desc') return b.price - a.price;
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return results;
    }

    formatPrice(listing) {
        const price = listing.price;
        if (listing.category === 'battery' && (getBatteryGroup(listing.subcategory) === 'dispose' || price === 0)) {
            return '洽詢';
        }
        return `HK$ ${Number(price).toLocaleString('zh-HK')}`;
    }

    getSubcategoryLabel(listing) {
        if (listing.category === 'parts') {
            return PARTS_SUBCATEGORIES[listing.subcategory] || listing.subcategory;
        }
        const buy = BATTERY_BUY_SUBCATEGORIES[listing.subcategory];
        const dispose = BATTERY_DISPOSE_SUBCATEGORIES[listing.subcategory];
        return buy || dispose || listing.subcategory;
    }

    isDisposeListing(listing) {
        return listing.category === 'battery' && getBatteryGroup(listing.subcategory) === 'dispose';
    }

    renderGrid() {
        const grid = document.getElementById('listingGrid');
        const listings = this.getListings();

        if (listings.length === 0) {
            const emptyMsg = this.currentCategory === 'battery'
                ? `「${BATTERY_SECTIONS[this.currentBatterySection].label}」暫無符合條件的商品。`
                : '暫無符合條件的商品，試試其他篩選或發佈新商品。';
            grid.innerHTML = `<p class="listing-empty">${emptyMsg}</p>`;
            return;
        }

        grid.innerHTML = listings.map((l) => {
            const badges = this.renderBadges(l, true);
            const isRecycle = this.isDisposeListing(l);
            return `
                <article class="listing-card" data-id="${l.id}">
                    <div class="listing-image-wrap">
                        <img src="${l.imageUrl}" alt="${this.escapeHtml(l.title)}" loading="lazy" />
                        ${isRecycle ? '<span class="listing-recycle-cta">聯絡回收</span>' : ''}
                    </div>
                    <div class="listing-body">
                        <div class="listing-badges">${badges}</div>
                        <h3 class="listing-title">${this.escapeHtml(l.title)}</h3>
                        <p class="listing-price">${this.formatPrice(l)}</p>
                        <p class="listing-meta">${this.escapeHtml(l.location)}</p>
                    </div>
                </article>
            `;
        }).join('');

        grid.querySelectorAll('.listing-card').forEach((card) => {
            card.addEventListener('click', () => this.openDetail(card.dataset.id));
        });
    }

    renderBadges(listing, compact) {
        const parts = [];
        if (listing.category === 'battery' && listing.certification) {
            const certClass = listing.certification === 'epd' ? 'cert-epd' : listing.certification === 'repair' ? 'cert-repair' : 'cert-none';
            parts.push(`<span class="cert-badge ${certClass}">${CERTIFICATIONS[listing.certification]}</span>`);
        }
        if (listing.sellerType) {
            parts.push(`<span class="seller-badge">${SELLER_TYPES[listing.sellerType]}</span>`);
        }
        if (listing.condition && listing.category === 'parts') {
            parts.push(`<span class="condition-badge">${CONDITIONS[listing.condition]}</span>`);
        }
        if (!compact && listing.soh != null) {
            parts.push(`<span class="soh-badge">SOH ${listing.soh}%</span>`);
        }
        return parts.join('');
    }

    openDetail(id) {
        const listing = this.data.listings.find((l) => l.id === id);
        if (!listing) return;

        this.currentListingId = id;
        const modal = document.getElementById('listingDetailModal');
        const body = document.getElementById('detailModalBody');

        const contactHtml = this.renderContactLinks(listing);
        const isRecycle = this.isDisposeListing(listing);

        body.innerHTML = `
            <div class="detail-layout">
                <img class="detail-image" src="${listing.imageUrl}" alt="${this.escapeHtml(listing.title)}" />
                <div class="detail-info">
                    <div class="listing-badges detail-badges">${this.renderBadges(listing, false)}</div>
                    <h3>${this.escapeHtml(listing.title)}</h3>
                    <p class="detail-price">${this.formatPrice(listing)}</p>
                    <p class="detail-desc">${this.escapeHtml(listing.description)}</p>
                    <ul class="detail-specs">
                        <li><strong>分類：</strong>${this.getSubcategoryLabel(listing)}</li>
                        <li><strong>地區：</strong>${this.escapeHtml(listing.location)}</li>
                        <li><strong>賣家：</strong>${this.escapeHtml(listing.sellerName)}</li>
                        ${listing.compatibleModel ? `<li><strong>適用車型：</strong>${this.escapeHtml(listing.compatibleModel)}</li>` : ''}
                        ${listing.condition ? `<li><strong>成色：</strong>${CONDITIONS[listing.condition] || listing.condition}</li>` : ''}
                        ${listing.capacityKwh != null ? `<li><strong>容量：</strong>${listing.capacityKwh} kWh</li>` : ''}
                        ${listing.soh != null ? `<li><strong>SOH：</strong>${listing.soh}%</li>` : ''}
                    </ul>
                    <div class="contact-section">
                        <h4>聯絡賣家</h4>
                        ${contactHtml}
                    </div>
                    <button id="detailInquiryBtnInner" class="btn-primary ${isRecycle ? 'btn-recycle' : ''}">
                        ${isRecycle ? '預約電池回收' : '站內詢價'}
                    </button>
                </div>
            </div>
        `;

        document.getElementById('detailInquiryBtnInner').addEventListener('click', () => {
            modal.classList.add('hidden');
            this.openInquiryModal(id);
        });

        body.querySelectorAll('.contact-proto').forEach((btn) => {
            btn.addEventListener('click', () => this.showPrototypeContactNotice(btn.dataset.channel));
        });

        modal.classList.remove('hidden');
    }

    showPrototypeContactNotice(channel) {
        const label = channel === 'whatsapp' ? 'WhatsApp' : '電郵';
        alert(`原型示範：${label} 聯絡功能尚未連接真實服務。`);
    }

    renderContactLinks() {
        return `
            <div class="contact-links">
                <button type="button" class="contact-link whatsapp contact-proto" data-channel="whatsapp">WhatsApp</button>
                <button type="button" class="contact-link email contact-proto" data-channel="email">電郵</button>
            </div>
        `;
    }

    openPostForm() {
        const modal = document.getElementById('postListingModal');
        const form = document.getElementById('postListingForm');
        form.reset();

        const isBattery = this.currentCategory === 'battery';
        const batteryLabel = isBattery
            ? `電動車電池 — ${BATTERY_SECTIONS[this.currentBatterySection].label}`
            : '汽車零件';
        document.getElementById('postCategoryLabel').textContent = batteryLabel;
        document.getElementById('postCategory').value = this.currentCategory;

        this.populateSubcategorySelect('postSubcategory', this.currentCategory);
        document.getElementById('batteryFields').classList.toggle('hidden', !isBattery);
        document.getElementById('partsConditionField').classList.toggle('hidden', isBattery);

        const priceLabel = document.getElementById('postPriceLabel');
        if (priceLabel) {
            priceLabel.textContent = isBattery && this.currentBatterySection === 'dispose'
                ? '價格 (HKD，回收服務可填 0)'
                : '價格 (HKD)';
        }

        modal.classList.remove('hidden');
    }

    populateSubcategorySelect(selectId, category) {
        const select = document.getElementById(selectId);
        const subs = category === 'parts'
            ? PARTS_SUBCATEGORIES
            : this.getBatterySubcategories();
        select.innerHTML = Object.entries(subs).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
    }

    submitListing() {
        const category = document.getElementById('postCategory').value;
        const subcategory = document.getElementById('postSubcategory').value;
        const title = document.getElementById('postTitle').value.trim();
        const description = document.getElementById('postDescription').value.trim();
        const priceVal = document.getElementById('postPrice').value;
        const location = document.getElementById('postLocation').value.trim();
        const sellerName = document.getElementById('postSellerName').value.trim();
        const compatibleModel = document.getElementById('postCompatibleModel').value.trim();

        if (!title || !description || !location || !sellerName) {
            alert('請填寫標題、描述、地區及賣家名稱');
            return;
        }

        const isDisposeItem = category === 'battery' && getBatteryGroup(subcategory) === 'dispose';
        const price = isDisposeItem && (priceVal === '' || Number(priceVal) === 0) ? 0 : Number(priceVal);
        if (!isDisposeItem && (isNaN(price) || price < 0)) {
            alert('請輸入有效價格');
            return;
        }

        const listing = {
            id: 'user-' + Date.now(),
            category,
            subcategory,
            title,
            description,
            price,
            location,
            sellerName,
            compatibleModel: compatibleModel || '',
            contact: emptyContact(),
            imageUrl: `https://placehold.co/400x300/0f172a/00ff88?text=${encodeURIComponent(title.slice(0, 12))}`,
            createdAt: new Date().toISOString(),
            isSeed: false,
        };

        if (category === 'parts') {
            listing.condition = document.getElementById('postCondition').value;
            listing.sellerType = 'private';
        } else {
            listing.batteryGroup = getBatteryGroup(subcategory);
            listing.sellerType = document.getElementById('postSellerType').value;
            listing.certification = document.getElementById('postCertification').value;
            const soh = document.getElementById('postSoh').value;
            const cap = document.getElementById('postCapacity').value;
            listing.soh = soh !== '' ? Number(soh) : null;
            listing.capacityKwh = cap !== '' ? Number(cap) : null;
            if (listing.soh != null && (listing.soh < 0 || listing.soh > 100)) {
                alert('SOH 須為 0–100');
                return;
            }
            listing.condition = isDisposeItem ? 'new' : 'refurbished';
        }

        this.data.listings.unshift(listing);
        this.save();
        document.getElementById('postListingModal').classList.add('hidden');
        this.renderGrid();
        this.renderMySection();
        alert('商品發佈成功！');
    }

    openInquiryModal(listingId) {
        const listing = this.data.listings.find((l) => l.id === listingId);
        if (!listing) return;

        this.currentListingId = listingId;
        document.getElementById('inquiryListingTitle').textContent = listing.title;
        document.getElementById('inquiryForm').reset();
        document.getElementById('inquiryModal').classList.remove('hidden');
    }

    submitInquiry() {
        const listing = this.data.listings.find((l) => l.id === this.currentListingId);
        if (!listing) return;

        const buyerName = document.getElementById('inquiryBuyerName').value.trim();
        const buyerContact = document.getElementById('inquiryBuyerContact').value.trim();
        const message = document.getElementById('inquiryMessage').value.trim();

        if (!buyerName || !buyerContact || !message) {
            alert('請填寫姓名、聯絡方式及詢價內容');
            return;
        }

        this.data.inquiries.unshift({
            id: 'inq-' + Date.now(),
            listingId: listing.id,
            listingTitle: listing.title,
            buyerName,
            buyerContact,
            message,
            createdAt: new Date().toISOString(),
            status: 'pending',
        });

        this.save();
        document.getElementById('inquiryModal').classList.add('hidden');
        this.renderMySection();
        alert('詢價已送出！');
    }

    switchMyTab(tab) {
        document.querySelectorAll('.my-marketplace-tab').forEach((t) => {
            t.classList.toggle('active', t.dataset.myTab === tab);
        });
        document.querySelectorAll('.my-marketplace-panel').forEach((p) => {
            p.classList.toggle('hidden', p.dataset.myPanel !== tab);
        });
    }

    renderMySection() {
        this.renderMyListings();
        this.renderSentInquiries();
        this.renderReceivedInquiries();
    }

    renderMyListings() {
        const container = document.getElementById('myListingsList');
        const mine = this.data.listings.filter((l) => !l.isSeed);

        if (mine.length === 0) {
            container.innerHTML = '<p class="text-dim">你尚未發佈任何商品。</p>';
            return;
        }

        container.innerHTML = mine.map((l) => `
            <div class="inquiry-item my-listing-item">
                <div class="inquiry-main">
                    <strong>${this.escapeHtml(l.title)}</strong>
                    <span class="text-dim">${this.formatPrice(l)} · ${this.escapeHtml(l.location)}</span>
                </div>
                <button class="btn-danger btn-small" data-delete="${l.id}">刪除</button>
            </div>
        `).join('');

        container.querySelectorAll('[data-delete]').forEach((btn) => {
            btn.addEventListener('click', () => this.deleteListing(btn.dataset.delete));
        });
    }

    renderSentInquiries() {
        const container = document.getElementById('sentInquiriesList');
        const inquiries = this.data.inquiries;

        if (inquiries.length === 0) {
            container.innerHTML = '<p class="text-dim">暫無送出的詢價。</p>';
            return;
        }

        container.innerHTML = inquiries.map((inq) => `
            <div class="inquiry-item">
                <div class="inquiry-main">
                    <strong>${this.escapeHtml(inq.listingTitle)}</strong>
                    <p>${this.escapeHtml(inq.message)}</p>
                    <span class="text-dim">${this.formatDate(inq.createdAt)}</span>
                </div>
                <span class="inquiry-status">${inq.status === 'pending' ? '待回覆' : inq.status}</span>
            </div>
        `).join('');
    }

    renderReceivedInquiries() {
        const container = document.getElementById('receivedInquiriesList');
        const myIds = new Set(this.data.listings.filter((l) => !l.isSeed).map((l) => l.id));
        const received = this.data.inquiries.filter((inq) => myIds.has(inq.listingId));

        if (received.length === 0) {
            container.innerHTML = '<p class="text-dim">暫無收到的詢價。</p>';
            return;
        }

        container.innerHTML = received.map((inq) => `
            <div class="inquiry-item">
                <div class="inquiry-main">
                    <strong>${this.escapeHtml(inq.listingTitle)}</strong>
                    <p><strong>${this.escapeHtml(inq.buyerName)}</strong> · ${this.escapeHtml(inq.buyerContact)}</p>
                    <p>${this.escapeHtml(inq.message)}</p>
                    <span class="text-dim">${this.formatDate(inq.createdAt)}</span>
                </div>
                <span class="inquiry-status">新詢價</span>
            </div>
        `).join('');
    }

    deleteListing(id) {
        const listing = this.data.listings.find((l) => l.id === id);
        if (!listing || listing.isSeed) {
            alert('無法刪除此商品');
            return;
        }
        if (!confirm('確定要刪除此商品？')) return;

        this.data.listings = this.data.listings.filter((l) => l.id !== id);
        this.save();
        this.renderGrid();
        this.renderMySection();
    }

    formatDate(iso) {
        return new Date(iso).toLocaleString('zh-HK');
    }

    escapeHtml(text) {
        const el = document.createElement('div');
        el.textContent = text;
        return el.innerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-links');
    if (toggle && menu) {
        toggle.addEventListener('click', () => menu.classList.toggle('open'));
    }
    window.marketplaceSystem = new MarketplaceSystem();
});
