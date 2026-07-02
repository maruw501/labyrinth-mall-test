(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const R = {
    normal: "\u666e\u901a",
    fine: "\u826f\u54c1",
    rare: "\u5e0c\u5c11",
    legend: "\u4f1d\u8aac"
  };

  const RARITY_ORDER = [R.normal, R.fine, R.rare, R.legend];
  const RARITY_MULTIPLIER = {
    [R.normal]: 1,
    [R.fine]: 1.25,
    [R.rare]: 1.65,
    [R.legend]: 2.5
  };

  const PRODUCT_CATALOG = [
    { id: "herb", name: "\u85ac\u8349", kind: "product", category: "\u751f\u6d3b\u54c1", rarity: R.normal, costValue: 12, price: 30, popularity: 62, effect: "HP\u3092\u5c11\u3057\u56de\u5fa9" },
    { id: "good_herb", name: "\u4e0a\u85ac\u8349", kind: "product", category: "\u751f\u6d3b\u54c1", rarity: R.fine, costValue: 34, price: 80, popularity: 58, effect: "HP\u3092\u5927\u304d\u304f\u56de\u5fa9" },
    { id: "torch", name: "\u305f\u3044\u307e\u3064", kind: "product", category: "\u63a2\u7d22\u54c1", rarity: R.normal, costValue: 18, price: 40, popularity: 54, effect: "\u8ff7\u5bae\u6b69\u304d\u306e\u5fc5\u9700\u54c1" },
    { id: "old_dagger", name: "\u53e4\u3073\u305f\u77ed\u5263", kind: "product", category: "\u6b66\u5177", rarity: R.fine, costValue: 50, price: 100, popularity: 47, effect: "\u65c5\u4eba\u5411\u3051\u306e\u8b77\u8eab\u5177" },
    { id: "small_shield", name: "\u5c0f\u3055\u306a\u76fe", kind: "product", category: "\u6b66\u5177", rarity: R.fine, costValue: 60, price: 120, popularity: 45, effect: "\u8efd\u304f\u6271\u3044\u3084\u3059\u3044\u76fe" },
    { id: "magic_water", name: "\u9b54\u6cd5\u306e\u6c34", kind: "product", category: "\u4e0d\u601d\u8b70\u54c1", rarity: R.rare, costValue: 74, price: 150, popularity: 52, effect: "\u75b2\u308c\u3092\u7652\u3084\u3059\u6e05\u6c34" },
    { id: "traveler_hat_goods", name: "\u65c5\u4eba\u306e\u5e3d\u5b50", kind: "product", category: "\u8863\u985e", rarity: R.rare, costValue: 96, price: 200, popularity: 50, effect: "\u65e5\u5dee\u3057\u306b\u5f37\u3044\u5e3d\u5b50" },
    { id: "silver_ring", name: "\u9280\u306e\u6307\u8f2a", kind: "product", category: "\u88c5\u98fe\u54c1", rarity: R.legend, costValue: 180, price: 400, popularity: 38, effect: "\u795d\u3044\u306e\u65e5\u306b\u6c42\u3081\u3089\u308c\u308b\u54c1" },
    { id: "dried_meat", name: "\u5e72\u3057\u8089", kind: "product", category: "\u98df\u6599", rarity: R.normal, costValue: 20, price: 55, popularity: 60, effect: "\u65c5\u306e\u643a\u5e2f\u98df" },
    { id: "salve", name: "\u50b7\u85ac", kind: "product", category: "\u751f\u6d3b\u54c1", rarity: R.fine, costValue: 40, price: 95, popularity: 61, effect: "HP\u3092\u56de\u5fa9" },
    { id: "herbal_tea", name: "\u9999\u8349\u8336", kind: "product", category: "\u98df\u6599", rarity: R.fine, costValue: 36, price: 85, popularity: 56, effect: "\u75b2\u308c\u3092\u548c\u3089\u3052\u308b" },
    { id: "copper_lantern", name: "\u9285\u306e\u30e9\u30f3\u30bf\u30f3", kind: "product", category: "\u63a2\u7d22\u54c1", rarity: R.fine, costValue: 72, price: 160, popularity: 49, effect: "\u6697\u3044\u9053\u3092\u7167\u3089\u3059" },
    { id: "warding_charm", name: "\u5b88\u308a\u672d", kind: "product", category: "\u4e0d\u601d\u8b70\u54c1", rarity: R.rare, costValue: 120, price: 260, popularity: 44, effect: "\u65c5\u4eba\u304c\u304a\u5b88\u308a\u306b\u8cb7\u3046" },
    { id: "amber_brooch", name: "\u7425\u73c0\u306e\u30d6\u30ed\u30fc\u30c1", kind: "product", category: "\u88c5\u98fe\u54c1", rarity: R.rare, costValue: 145, price: 320, popularity: 41, effect: "\u8a18\u5ff5\u54c1\u3068\u3057\u3066\u4eba\u6c17" },
    { id: "moon_glass", name: "\u6708\u5149\u30ac\u30e9\u30b9", kind: "product", category: "\u4e0d\u601d\u8b70\u54c1", rarity: R.legend, costValue: 230, price: 520, popularity: 34, effect: "\u9752\u767d\u304f\u5149\u308b\u73cd\u54c1" }
  ];

  const MATERIAL_CATALOG = [
    { id: "scrap_iron", name: "\u9244\u304f\u305a", kind: "material", rarity: R.normal, effect: "\u88c5\u5099\u5f37\u5316\u306b\u4f7f\u3046" },
    { id: "sturdy_lumber", name: "\u4e08\u592b\u306a\u6728\u6750", kind: "material", rarity: R.normal, effect: "\u5efa\u7269\u3084\u6b66\u5668\u306b\u4f7f\u3046" },
    { id: "mana_shard", name: "\u9b54\u77f3\u306e\u304b\u3051\u3089", kind: "material", rarity: R.rare, effect: "\u4e0d\u601d\u8b70\u306a\u5f37\u5316\u7d20\u6750" },
    { id: "cloth", name: "\u5e03\u5207\u308c", kind: "material", rarity: R.normal, effect: "\u8863\u985e\u306e\u4fee\u7e55\u306b\u4f7f\u3046" },
    { id: "beast_hide", name: "\u7363\u306e\u76ae", kind: "material", rarity: R.fine, effect: "\u9632\u5177\u306e\u6750\u6599" },
    { id: "copper_ore", name: "\u9285\u9271\u77f3", kind: "material", rarity: R.normal, effect: "\u6b66\u5668\u3084\u30e9\u30f3\u30bf\u30f3\u306e\u6750\u6599" },
    { id: "silver_thread", name: "\u9280\u7cf8", kind: "material", rarity: R.rare, effect: "\u88c5\u98fe\u54c1\u3068\u9632\u5177\u306e\u7d20\u6750" },
    { id: "hard_bone", name: "\u786c\u3044\u9aa8", kind: "material", rarity: R.fine, effect: "\u5f13\u3084\u5c0f\u7269\u306e\u6750\u6599" },
    { id: "glass_piece", name: "\u785d\u5b50\u7247", kind: "material", rarity: R.fine, effect: "\u30e9\u30f3\u30bf\u30f3\u306b\u4f7f\u3046" },
    { id: "star_sand", name: "\u661f\u7802", kind: "material", rarity: R.legend, effect: "\u4f1d\u8aac\u7d1a\u306e\u7d30\u5de5\u7d20\u6750" }
  ];

  const EQUIPMENT_CATALOG = [
    { id: "wood_sword", name: "\u6728\u306e\u5263", slot: "weapon", baseAttack: 3, baseDefense: 0, rarity: R.normal, price: 70 },
    { id: "iron_sword", name: "\u9244\u306e\u5263", slot: "weapon", baseAttack: 8, baseDefense: 0, rarity: R.fine, price: 170 },
    { id: "silver_dagger", name: "銀の短剣", slot: "weapon", baseAttack: 6, baseDefense: 0, rarity: R.rare, price: 230 },
    { id: "magic_stone_sword", name: "魔石の剣", slot: "weapon", baseAttack: 9, baseDefense: 1, rarity: R.rare, price: 310 },
    { id: "leather_clothes", name: "\u9769\u306e\u670d", slot: "armor", baseAttack: 0, baseDefense: 4, rarity: R.normal, price: 110 },
    { id: "traveler_hat_equip", name: "\u65c5\u4eba\u306e\u5e3d\u5b50", slot: "armor", baseAttack: 0, baseDefense: 2, rarity: R.fine, price: 130 },
    { id: "lucky_ring", name: "\u5e78\u904b\u306e\u6307\u8f2a", slot: "accessory", baseAttack: 0, baseDefense: 1, rarity: R.rare, price: 260 },
    { id: "copper_sword", name: "\u9285\u306e\u5263", slot: "weapon", baseAttack: 5, baseDefense: 0, rarity: R.normal, price: 120 },
    { id: "hunter_bow", name: "\u72e9\u4eba\u306e\u5f13", slot: "weapon", baseAttack: 7, baseDefense: 0, rarity: R.fine, price: 180 },
    { id: "chain_mail", name: "\u9396\u304b\u305f\u3073\u3089", slot: "armor", baseAttack: 0, baseDefense: 6, rarity: R.fine, price: 220 },
    { id: "merchant_coat", name: "\u5546\u4eba\u306e\u4e0a\u7740", slot: "armor", baseAttack: 0, baseDefense: 3, rarity: R.rare, price: 240 },
    { id: "guard_bracelet", name: "\u5b88\u308a\u306e\u8155\u8f2a", slot: "accessory", baseAttack: 0, baseDefense: 3, rarity: R.fine, price: 190 },
    { id: "cloth_bag", name: "\u5e03\u306e\u888b", slot: "bag", baseAttack: 0, baseDefense: 0, rarity: R.normal, price: 90, bagCarry: 4 },
    { id: "leather_bag", name: "\u9769\u306e\u9053\u5177\u888b", slot: "bag", baseAttack: 0, baseDefense: 1, rarity: R.fine, price: 190, bagCarry: 7 },
    { id: "expedition_pack", name: "\u5927\u5bb9\u91cf\u80cc\u8ca0\u3044\u888b", slot: "bag", baseAttack: 0, baseDefense: 2, rarity: R.rare, price: 340, bagCarry: 10 }
  ];

  const BONUS_POOL = [
    { id: "attack", label: "\u653b\u6483\u529b\u30a2\u30c3\u30d7", stat: "attack", min: 1, max: 4, unit: "" },
    { id: "defense", label: "\u9632\u5fa1\u529b\u30a2\u30c3\u30d7", stat: "defense", min: 1, max: 3, unit: "" },
    { id: "maxHp", label: "\u6700\u5927HP\u30a2\u30c3\u30d7", stat: "maxHp", min: 3, max: 10, unit: "" },
    { id: "salePrice", label: "\u8ca9\u58f2\u4fa1\u683c\u30a2\u30c3\u30d7", stat: "salePrice", min: 3, max: 10, unit: "%" },
    { id: "rareFind", label: "\u30ec\u30a2\u767a\u898b\u7387\u30a2\u30c3\u30d7", stat: "rareFind", min: 4, max: 12, unit: "%" },
    { id: "raidDown", label: "\u8972\u6483\u767a\u751f\u7387\u30c0\u30a6\u30f3", stat: "raidDown", min: 3, max: 9, unit: "%" },
    { id: "happyBonus", label: "\u5e78\u305b\u5ea6\u30dc\u30fc\u30ca\u30b9", stat: "happyBonus", min: 1, max: 4, unit: "" },
    { id: "carryLimit", label: "\u6301\u3061\u7269\u4e0a\u9650\u30a2\u30c3\u30d7", stat: "carryLimit", min: 1, max: 3, unit: "" }
  ];

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function choose(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function chance(percent) {
    return Math.random() * 100 < percent;
  }

  function makeInstance(base, extra) {
    return Object.assign({
      uid: `${base.id}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    }, base, extra || {});
  }

  function makeProduct(base, rarityOverride) {
    const rarity = rarityOverride || base.rarity;
    const multiplier = RARITY_MULTIPLIER[rarity] || 1;
    return makeInstance(base, {
      rarity,
      price: Math.max(10, Math.round(base.price * multiplier)),
      costValue: Math.max(5, Math.round(base.costValue * multiplier)),
      popularity: Math.min(95, base.popularity + RARITY_ORDER.indexOf(rarity) * 5)
    });
  }

  function capRarityForFloor(rarity, floor) {
    const level = Math.max(1, floor || 1);
    const maxIndex = level <= 5 ? 0 : level <= 7 ? 1 : level <= 9 ? 2 : 3;
    const index = RARITY_ORDER.indexOf(rarity);
    return RARITY_ORDER[Math.max(0, Math.min(index < 0 ? 0 : index, maxIndex))];
  }

  function makeMaterial(base, rarityOverride) {
    return makeInstance(base, { rarity: rarityOverride || base.rarity });
  }

  function makeEquipment(base, floor) {
    const level = Math.max(1, floor || 1);
    const upgrade = Math.min(level <= 5 ? 0 : 5, Math.max(0, randomInt(0, Math.ceil(level / 2))));
    const bonus = base.slot === "bag" ? BONUS_POOL.find((item) => item.stat === "carryLimit") : choose(BONUS_POOL);
    const value = base.slot === "bag"
      ? (base.bagCarry || 4) + Math.floor(level / 4) + Math.floor(upgrade / 2)
      : randomInt(bonus.min, bonus.max) + Math.floor(level / 3);
    const rarityRoll = Math.random();
    const rarity = capRarityForFloor(rarityRoll > 0.96 ? R.legend : rarityRoll > 0.78 ? R.rare : base.rarity, level);
    const multiplier = RARITY_MULTIPLIER[rarity] || 1;

    const item = makeInstance(base, {
      kind: "equipment",
      attack: base.baseAttack + (base.slot === "weapon" ? upgrade : 0),
      defense: base.baseDefense + (base.slot !== "weapon" ? upgrade : 0),
      upgrade,
      rarity,
      price: Math.round((base.price + upgrade * 35) * multiplier),
      bonus: { id: bonus.id, label: bonus.label, stat: bonus.stat, value, unit: bonus.unit },
      mastery: base.slot === "weapon" ? { xp: 0, max: 180, ready: false } : undefined,
      evolved: false,
      weaponEffects: base.slot === "weapon"
        ? (Game.Weapons ? [Game.Weapons.randomEffect(base, floor, rarity)] : [])
        : undefined
    });
    if (Game.Weapons) Game.Weapons.normalizeWeapon(item);
    return item;
  }

  function createEquipment(id, floor) {
    const base = EQUIPMENT_CATALOG.find((item) => item.id === id) || EQUIPMENT_CATALOG[0];
    return makeEquipment(base, floor || 1);
  }

  function equipmentLabel(item) {
    if (!item) return "\u306a\u3057";
    const plus = item.upgrade > 0 ? `+${item.upgrade}` : "";
    const bonus = item.bonus ? ` / ${item.bonus.label} ${item.bonus.value}${item.bonus.unit}` : "";
    const weapon = Game.Weapons && item.slot === "weapon" ? ` / ${Game.Weapons.weaponDetails(item).split(" / ").slice(1).join(" / ")}` : "";
    return `${item.name}${plus} \u653b${item.attack} \u9632${item.defense}${bonus}${weapon}`;
  }

  function itemLabel(item) {
    if (!item) return "";
    if (item.kind === "equipment") return equipmentLabel(item);
    if (item.kind === "material") return item.name;
    return `${item.name} ${item.price}G`;
  }

  function getEquipmentBonus(state, stat) {
    if (!state || !state.hero || !state.hero.equipment) return 0;
    const equipmentBonus = Object.values(state.hero.equipment).reduce((sum, item) => {
      if (item && item.bonus && item.bonus.stat === stat) return sum + item.bonus.value;
      return sum;
    }, 0);
    return equipmentBonus + (Game.Weapons ? Game.Weapons.effectBonus(state, stat) : 0);
  }

  function getTotalEquipmentAttack(state) {
    return Object.values(state.hero.equipment).reduce((sum, item) => sum + (item ? item.attack || 0 : 0), 0) + getEquipmentBonus(state, "attack");
  }

  function getTotalEquipmentDefense(state) {
    return Object.values(state.hero.equipment).reduce((sum, item) => sum + (item ? item.defense || 0 : 0), 0) + getEquipmentBonus(state, "defense");
  }

  function getCarryLimit(state) {
    return state.hero.baseCarryLimit + getEquipmentBonus(state, "carryLimit");
  }

  function rollRarity(baseChanceBonus) {
    const roll = Math.random() * 100;
    const bonus = baseChanceBonus || 0;
    if (roll < 1 + bonus * 0.12) return R.legend;
    if (roll < 9 + bonus * 0.4) return R.rare;
    if (roll < 32 + bonus * 0.7) return R.fine;
    return R.normal;
  }

  function productLootCandidates(floor) {
    const level = Math.max(1, floor || 1);
    const maxPrice = level <= 2 ? 120 : level <= 4 ? 180 : level <= 6 ? 240 : level <= 8 ? 320 : 9999;
    const candidates = PRODUCT_CATALOG.filter((item) => item.price <= maxPrice);
    return candidates.length ? candidates : PRODUCT_CATALOG.slice(0, 5);
  }

  function materialLootCandidates(floor) {
    const level = Math.max(1, floor || 1);
    return MATERIAL_CATALOG.filter((item) => {
      if (item.id === "star_sand") return level >= 8;
      if (["mana_shard", "silver_thread"].includes(item.id)) return level >= 4;
      return true;
    });
  }

  function createRandomLoot(floor, state) {
    const rareBonus = state ? getEquipmentBonus(state, "rareFind") : 0;
    const itemBonus = state && Game.Weapons ? Game.Weapons.effectBonus(state, "itemFind") : 0;
    const materialBonus = state && Game.Weapons ? Game.Weapons.effectBonus(state, "materialFind") : 0;
    const floorBonus = Math.max(0, floor - 1) * 3;
    const roll = Math.random() * 100;
    const productLimit = 58 + Math.min(12, itemBonus * 0.25);
    const materialLimit = 80 + Math.min(12, materialBonus * 0.3);

    if (roll < productLimit) return makeProduct(choose(productLootCandidates(floor)), capRarityForFloor(rollRarity(rareBonus + floorBonus), floor));
    if (roll < materialLimit) return makeMaterial(choose(materialLootCandidates(floor)));
    return makeEquipment(choose(equipmentLootCandidates(floor)), floor);
  }

  function equipmentLootCandidates(floor) {
    const level = Math.max(1, floor || 1);
    const maxPrice = level <= 2 ? 130 : level <= 4 ? 200 : level <= 6 ? 260 : level <= 8 ? 340 : 9999;
    const candidates = EQUIPMENT_CATALOG.filter((item) => {
      if (item.price > maxPrice) return false;
      if (["iron_sword", "hunter_bow", "leather_bag", "merchant_coat"].includes(item.id)) return level >= 3;
      if (["silver_dagger", "chain_mail", "guard_bracelet"].includes(item.id)) return level >= 5;
      if (["magic_stone_sword", "expedition_pack"].includes(item.id)) return level >= 7;
      return true;
    });
    return candidates.length ? candidates : EQUIPMENT_CATALOG;
  }

  function createNamedProduct(id) {
    const base = PRODUCT_CATALOG.find((item) => item.id === id) || PRODUCT_CATALOG[0];
    return makeProduct(base);
  }

  function isSaleable(item) {
    return item && (item.kind === "product" || item.kind === "equipment");
  }

  function isHealingItem(item) {
    return item && item.kind === "product" && ["herb", "good_herb", "magic_water", "salve", "herbal_tea"].includes(item.id);
  }

  function healingAmount(item) {
    if (!item) return 0;
    if (item.id === "good_herb") return 22;
    if (item.id === "magic_water") return 30;
    if (item.id === "salve") return 18;
    if (item.id === "herbal_tea") return 10;
    return 12;
  }

  Game.Items = {
    PRODUCT_CATALOG,
    MATERIAL_CATALOG,
    EQUIPMENT_CATALOG,
    RARITY_MULTIPLIER,
    BONUS_POOL,
    randomInt,
    choose,
    chance,
    createRandomLoot,
    equipmentLootCandidates,
    createNamedProduct,
    createEquipment,
    makeEquipment,
    itemLabel,
    equipmentLabel,
    getEquipmentBonus,
    getTotalEquipmentAttack,
    getTotalEquipmentDefense,
    getCarryLimit,
    isSaleable,
    isHealingItem,
    healingAmount
  };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const MAX_EFFECTS = 5;
  const DEFAULT_MASTERY_MAX = 180;

  const EFFECT_DEFS = {
    attackPercent: { id: "attackPercent", label: "攻撃力アップ", stat: "attackPercent", unit: "%", category: "戦闘" },
    defensePercent: { id: "defensePercent", label: "防御力アップ", stat: "defensePercent", unit: "%", category: "戦闘" },
    maxHp: { id: "maxHp", label: "最大HPアップ", stat: "maxHp", unit: "", category: "戦闘" },
    critRate: { id: "critRate", label: "会心率アップ", stat: "critRate", unit: "%", category: "戦闘" },
    itemFind: { id: "itemFind", label: "アイテム発見率アップ", stat: "itemFind", unit: "%", category: "探索" },
    rareFind: { id: "rareFind", label: "レア商品発見率アップ", stat: "rareFind", unit: "%", category: "探索" },
    materialFind: { id: "materialFind", label: "素材発見率アップ", stat: "materialFind", unit: "%", category: "探索" },
    salePrice: { id: "salePrice", label: "販売価格アップ", stat: "salePrice", unit: "%", category: "商売" },
    customerBonus: { id: "customerBonus", label: "客数アップ", stat: "customerBonus", unit: "", category: "商売" },
    reputationGain: { id: "reputationGain", label: "評判上昇アップ", stat: "reputationGain", unit: "", category: "商売" },
    townDefense: { id: "townDefense", label: "防衛力アップ", stat: "townDefense", unit: "", category: "町防衛" },
    raidDown: { id: "raidDown", label: "襲撃発生率ダウン", stat: "raidDown", unit: "%", category: "町防衛" },
    raidDamageDown: { id: "raidDamageDown", label: "襲撃被害軽減", stat: "raidDamageDown", unit: "%", category: "町防衛" },
    happyBonus: { id: "happyBonus", label: "幸せ度上昇アップ", stat: "happyBonus", unit: "", category: "村人" },
    injuryDown: { id: "injuryDown", label: "村人負傷率ダウン", stat: "injuryDown", unit: "%", category: "村人" },
    populationGrowth: { id: "populationGrowth", label: "人口増加率アップ", stat: "populationGrowth", unit: "", category: "村人" }
  };

  const STARTER_EFFECTS = {
    wood_sword: [{ stat: "itemFind", value: 4 }],
    iron_sword: [{ stat: "attackPercent", value: 5 }],
    copper_sword: [{ stat: "materialFind", value: 4 }],
    hunter_bow: [{ stat: "critRate", value: 4 }],
    silver_dagger: [{ stat: "rareFind", value: 8 }],
    magic_stone_sword: [{ stat: "townDefense", value: 4 }]
  };

  const EVOLUTIONS = {
    wood_sword: [
      { id: "hard_wood_sword", name: "硬木の剣", style: "戦闘", attack: 4, defense: 1, rarity: "良品", cost: 200, materials: { sturdy_lumber: 2 }, effects: [{ stat: "attackPercent", value: 5 }] },
      { id: "merchant_sword", name: "商人の剣", style: "商売", attack: 2, defense: 0, rarity: "良品", cost: 300, materials: { mana_shard: 1 }, effects: [{ stat: "salePrice", value: 6 }, { stat: "happyBonus", value: 1 }] }
    ],
    iron_sword: [
      { id: "steel_sword", name: "鋼鉄の剣", style: "戦闘", attack: 6, defense: 1, rarity: "希少", cost: 450, materials: { scrap_iron: 3, copper_ore: 1 }, effects: [{ stat: "attackPercent", value: 8 }, { stat: "critRate", value: 4 }] },
      { id: "smith_sword", name: "鍛冶師の剣", style: "素材", attack: 3, defense: 1, rarity: "希少", cost: 500, materials: { scrap_iron: 2, mana_shard: 1 }, effects: [{ stat: "materialFind", value: 10 }, { stat: "reputationGain", value: 2 }] }
    ],
    silver_dagger: [
      { id: "bandit_hunter_dagger", name: "盗賊狩りの短剣", style: "戦闘", attack: 5, defense: 0, rarity: "希少", cost: 520, materials: { silver_thread: 1, hard_bone: 1 }, effects: [{ stat: "critRate", value: 8 }, { stat: "raidDown", value: 5 }] },
      { id: "lucky_dagger", name: "幸運の短剣", style: "探索", attack: 2, defense: 0, rarity: "希少", cost: 560, materials: { mana_shard: 1, star_sand: 1 }, effects: [{ stat: "rareFind", value: 12 }, { stat: "itemFind", value: 8 }] }
    ],
    magic_stone_sword: [
      { id: "flame_magic_sword", name: "炎の魔剣", style: "戦闘", attack: 7, defense: 0, rarity: "伝説", cost: 800, materials: { mana_shard: 3, star_sand: 1 }, effects: [{ stat: "attackPercent", value: 12 }, { stat: "critRate", value: 6 }] },
      { id: "guardian_magic_sword", name: "守りの魔剣", style: "防衛", attack: 3, defense: 4, rarity: "伝説", cost: 820, materials: { mana_shard: 2, silver_thread: 1 }, effects: [{ stat: "townDefense", value: 12 }, { stat: "raidDamageDown", value: 10 }, { stat: "injuryDown", value: 8 }] }
    ]
  };

  function normalizeEffect(effect) {
    const def = EFFECT_DEFS[effect && effect.stat] || EFFECT_DEFS[effect && effect.id];
    if (!def) return null;
    return { stat: def.stat, value: Math.max(1, Math.round(effect.value || 1)) };
  }

  function makeEffect(stat, value) {
    return normalizeEffect({ stat, value });
  }

  function effectLabel(effect) {
    const normalized = normalizeEffect(effect);
    if (!normalized) return "";
    const def = EFFECT_DEFS[normalized.stat];
    return `${def.label}+${normalized.value}${def.unit}`;
  }

  function starterEffectsFor(baseId) {
    return (STARTER_EFFECTS[baseId] || [{ stat: "attackPercent", value: 3 }]).map((effect) => normalizeEffect(effect)).filter(Boolean);
  }

  function randomEffect(base, floor, rarity) {
    const pool = ["attackPercent", "critRate", "itemFind", "rareFind", "materialFind", "salePrice", "townDefense", "raidDown", "happyBonus"];
    const stat = base && STARTER_EFFECTS[base.id] ? STARTER_EFFECTS[base.id][0].stat : Game.Items.choose(pool);
    const rarityBonus = rarity === "伝説" ? 5 : rarity === "希少" ? 3 : rarity === "良品" ? 1 : 0;
    return makeEffect(stat, 3 + Math.floor((floor || 1) / 2) + rarityBonus);
  }

  function normalizeWeapon(item) {
    if (!item || item.kind !== "equipment" || item.slot !== "weapon") return item;
    item.mastery = Object.assign({ xp: 0, max: DEFAULT_MASTERY_MAX, ready: false }, item.mastery || {});
    item.mastery.max = Math.max(DEFAULT_MASTERY_MAX, Math.round(item.mastery.max || DEFAULT_MASTERY_MAX));
    item.mastery.xp = Game.State ? Game.State.clamp(Math.round(item.mastery.xp || 0), 0, item.mastery.max) : Math.max(0, Math.round(item.mastery.xp || 0));
    item.mastery.ready = item.mastery.xp >= item.mastery.max;
    item.weaponEffects = Array.isArray(item.weaponEffects) ? item.weaponEffects.map(normalizeEffect).filter(Boolean) : starterEffectsFor(item.evolutionBaseId || item.id);
    item.weaponEffects = item.weaponEffects.slice(0, MAX_EFFECTS);
    item.evolved = Boolean(item.evolved);
    return item;
  }

  function normalizeAll(state) {
    if (!state || !state.hero || !state.shop) return;
    Object.values(state.hero.equipment || {}).forEach(normalizeWeapon);
    (state.shop.storage || []).forEach(normalizeWeapon);
    (state.shop.shelfItems || []).forEach(normalizeWeapon);
    (state.hero.inventory || []).forEach(normalizeWeapon);
  }

  function effectBonus(state, stat) {
    const weapon = state && state.hero && state.hero.equipment ? state.hero.equipment.weapon : null;
    normalizeWeapon(weapon);
    return (weapon && weapon.weaponEffects ? weapon.weaponEffects : []).reduce((sum, effect) => {
      return effect.stat === stat ? sum + effect.value : sum;
    }, 0);
  }

  function addEffects(base, effects, overwriteOldest) {
    normalizeWeapon(base);
    if (!base || base.slot !== "weapon") return { ok: false, reason: "ベース武器がない。" };
    const next = base.weaponEffects.slice();
    for (const rawEffect of effects || []) {
      const effect = normalizeEffect(rawEffect);
      if (!effect) continue;
      const existing = next.find((item) => item.stat === effect.stat);
      if (existing) existing.value += effect.value;
      else next.push(effect);
    }
    while (next.length > MAX_EFFECTS) {
      if (!overwriteOldest) return { ok: false, reason: "特殊効果が5個を超える。上書き合成を選ぶと古い効果から消えます。" };
      next.shift();
    }
    base.weaponEffects = next;
    return { ok: true };
  }

  function addMastery(state, amount, logs, reason) {
    const weapon = state && state.hero && state.hero.equipment ? state.hero.equipment.weapon : null;
    normalizeWeapon(weapon);
    if (!weapon) return 0;
    const beforeReady = weapon.mastery.ready;
    const before = weapon.mastery.xp;
    weapon.mastery.xp = Math.min(weapon.mastery.max, weapon.mastery.xp + Math.max(1, Math.round(amount)));
    weapon.mastery.ready = weapon.mastery.xp >= weapon.mastery.max;
    const gained = weapon.mastery.xp - before;
    if (gained > 0 && logs) logs.push(`${weapon.name}の熟練度 +${gained}`);
    if (!beforeReady && weapon.mastery.ready) {
      if (logs) logs.push(`${weapon.name}は進化できるほど使い込まれた。`);
      if (Game.Audio) Game.Audio.playSfx("levelUp");
    } else if (gained > 0 && Game.Audio) {
      Game.Audio.playSfx(reason === "floor" ? "button" : "pickup");
    }
    return gained;
  }

  function materialName(id) {
    const material = Game.Items.MATERIAL_CATALOG.find((item) => item.id === id);
    return material ? material.name : id;
  }

  function materialText(materials) {
    return Object.entries(materials || {}).map(([id, amount]) => `${materialName(id)}x${amount}`).join(" / ") || "なし";
  }

  function countMaterials(state) {
    return (state.shop.storage || []).reduce((counts, item) => {
      if (item.kind === "material") counts[item.id] = (counts[item.id] || 0) + 1;
      return counts;
    }, {});
  }

  function hasMaterials(state, materials) {
    const counts = countMaterials(state);
    return Object.entries(materials || {}).every(([id, amount]) => (counts[id] || 0) >= amount);
  }

  function consumeMaterials(state, materials) {
    Object.entries(materials || {}).forEach(([id, amount]) => {
      for (let i = 0; i < amount; i += 1) {
        const index = state.shop.storage.findIndex((item) => item.kind === "material" && item.id === id);
        if (index >= 0) state.shop.storage.splice(index, 1);
      }
    });
  }

  function evolutionOptions(state, weapon) {
    normalizeWeapon(weapon);
    if (!weapon || weapon.slot !== "weapon" || weapon.evolved) return [];
    return (EVOLUTIONS[weapon.evolutionBaseId || weapon.id] || []).map((option) => {
      const reasons = [];
      if (!weapon.mastery.ready) reasons.push(`熟練度${weapon.mastery.max}必要`);
      if (state.hero.gold < option.cost) reasons.push(`${option.cost}G必要`);
      if (!hasMaterials(state, option.materials)) reasons.push(`素材: ${materialText(option.materials)}`);
      return Object.assign({}, option, {
        canEvolve: reasons.length === 0,
        reason: reasons.join(" / ") || "進化できます"
      });
    });
  }

  function evolveWeapon(state, weapon, optionId) {
    normalizeWeapon(weapon);
    const option = evolutionOptions(state, weapon).find((item) => item.id === optionId);
    if (!weapon || !option) return ["進化先が見つからない。"];
    if (!option.canEvolve) return [`${weapon.name}はまだ進化できない。${option.reason}`];
    state.hero.gold -= option.cost;
    consumeMaterials(state, option.materials);
    const oldName = weapon.name;
    weapon.evolutionBaseId = weapon.evolutionBaseId || weapon.id;
    weapon.id = option.id;
    weapon.name = option.name;
    weapon.attack += option.attack;
    weapon.defense += option.defense;
    weapon.rarity = option.rarity || weapon.rarity;
    weapon.price = Math.round((weapon.price || 100) * 1.35 + option.cost * 0.25);
    weapon.evolved = true;
    weapon.mastery = { xp: 0, max: DEFAULT_MASTERY_MAX + 50, ready: false };
    addEffects(weapon, option.effects, true);
    if (Game.Audio) Game.Audio.playSfx("forge");
    Game.State.updateDerivedStats(state);
    return [`${oldName}は${weapon.name}へ進化した。`];
  }

  function synthesisCost(base, material) {
    normalizeWeapon(base);
    normalizeWeapon(material);
    const effectCount = (base && base.weaponEffects ? base.weaponEffects.length : 0) + (material && material.weaponEffects ? material.weaponEffects.length : 0);
    const rareCost = [base, material].filter((item) => item && (item.rarity === "希少" || item.rarity === "伝説")).length * 180;
    return 200 + effectCount * 100 + rareCost;
  }

  function allWeapons(state) {
    const weapons = [];
    const equipped = state.hero.equipment.weapon;
    if (equipped) weapons.push({ key: "equipped:weapon", source: "装備中", index: -1, item: normalizeWeapon(equipped) });
    (state.shop.storage || []).forEach((item, index) => {
      if (item.kind === "equipment" && item.slot === "weapon") weapons.push({ key: `storage:${index}`, source: "倉庫", index, item: normalizeWeapon(item) });
    });
    return weapons;
  }

  function storageWeapons(state) {
    return allWeapons(state).filter((entry) => entry.key.startsWith("storage:"));
  }

  function findWeaponByKey(state, key) {
    const [source, indexText] = String(key || "").split(":");
    if (source === "equipped" && indexText === "weapon") {
      const weapon = state.hero.equipment.weapon;
      return weapon ? { key: "equipped:weapon", source: "装備中", index: -1, item: normalizeWeapon(weapon) } : null;
    }
    if (source !== "storage") return null;
    const index = Number(indexText);
    const item = state.shop.storage[index];
    if (!item || item.kind !== "equipment" || item.slot !== "weapon") return null;
    return { key: `storage:${index}`, source: "倉庫", index, item: normalizeWeapon(item) };
  }

  function synthesize(state, baseKey, materialKey, overwriteOldest) {
    const baseEntry = findWeaponByKey(state, baseKey);
    const materialEntry = findWeaponByKey(state, materialKey);
    if (!baseEntry || !materialEntry) return ["合成する武器を選んでください。"];
    if (!materialEntry.key.startsWith("storage:")) return ["素材武器は倉庫の武器から選んでください。"];
    if (baseEntry.key === materialEntry.key) return ["同じ武器同士は合成できない。"];
    const cost = synthesisCost(baseEntry.item, materialEntry.item);
    if (state.hero.gold < cost) return [`合成には${cost}G必要です。`];
    const materialIndex = state.shop.storage.findIndex((item) => item.kind === "material");
    if (materialIndex === -1) return ["合成には素材が1個必要です。"];
    const merge = addEffects(baseEntry.item, materialEntry.item.weaponEffects || [], overwriteOldest);
    if (!merge.ok) return [merge.reason];
    const usedMaterial = state.shop.storage.splice(materialIndex, 1)[0];
    const weaponIndex = state.shop.storage.indexOf(materialEntry.item);
    if (weaponIndex >= 0) state.shop.storage.splice(weaponIndex, 1);
    state.hero.gold -= cost;
    state.blacksmith = Object.assign({}, state.blacksmith || {}, { synthesisBase: baseEntry.key, synthesisMaterial: null });
    if (Game.Audio) Game.Audio.playSfx("forge");
    Game.State.updateDerivedStats(state);
    return [`${baseEntry.item.name}に${materialEntry.item.name}の特殊効果を合成した。${usedMaterial.name}と${cost}Gを使った。`];
  }

  function weaponDetails(item) {
    normalizeWeapon(item);
    if (!item) return "なし";
    const effects = (item.weaponEffects || []).map(effectLabel).join(" / ") || "特殊効果なし";
    const mastery = item.mastery ? `${item.mastery.xp}/${item.mastery.max}${item.mastery.ready ? " 進化可" : ""}` : "-";
    const plus = item.upgrade > 0 ? `+${item.upgrade}` : "";
    return `${item.name}${plus} 攻${item.attack} 防${item.defense} 熟練度${mastery} / ${effects}`;
  }

  Game.Weapons = {
    MAX_EFFECTS,
    DEFAULT_MASTERY_MAX,
    EFFECT_DEFS,
    EVOLUTIONS,
    normalizeWeapon,
    normalizeAll,
    effectBonus,
    addEffects,
    addMastery,
    randomEffect,
    starterEffectsFor,
    effectLabel,
    materialText,
    evolutionOptions,
    evolveWeapon,
    synthesisCost,
    allWeapons,
    storageWeapons,
    findWeaponByKey,
    synthesize,
    weaponDetails
  };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const STATUS = {
    healthy: "\u5143\u6c17",
    injured: "\u8ca0\u50b7",
    unhappy: "\u4e0d\u6e80",
    dead: "\u6b7b\u4ea1"
  };

  const BASE_VILLAGERS = [
    {
      id: "mira",
      name: "\u30df\u30e9",
      job: "\u8fb2\u5bb6",
      css: "villager-green",
      x: 3,
      y: 5,
      minTownLevel: 1,
      likes: ["herb", "good_herb", "herbal_tea", "dried_meat"],
      lines: [
        "\u4eba\u304c\u5897\u3048\u308c\u3070\u3001\u591c\u306e\u5e97\u3082\u3082\u3063\u3068\u306b\u304e\u3084\u304b\u306b\u306a\u308b\u3088\u3002",
        "\u5e83\u5834\u304c\u3042\u308b\u3068\u3001\u307f\u3093\u306a\u306e\u6c17\u5206\u304c\u660e\u308b\u304f\u306a\u308b\u306d\u3002"
      ]
    },
    {
      id: "gantz",
      name: "\u30ac\u30f3\u30c4",
      job: "\u935b\u51b6\u898b\u7fd2\u3044",
      css: "villager-smith",
      x: 6,
      y: 2,
      minTownLevel: 1,
      likes: ["old_dagger", "small_shield", "copper_lantern", "iron_sword"],
      lines: [
        "\u5f37\u5316\u3057\u305f\u3044\u88c5\u5099\u306f\u3001\u5148\u306b\u88c5\u5099\u753b\u9762\u3067\u8eab\u306b\u3064\u3051\u308b\u3093\u3060\u3002",
        "\u5f37\u5316\u306b\u306f\u7d20\u67501\u500b\u3068G\u304c\u8981\u308b\u3002\u935b\u51b6\u5c4bLv\u304c\u4e0a\u304c\u308b\u3068\u8cbb\u7528\u304c\u4e0b\u304c\u308b\u305e\u3002"
      ]
    },
    {
      id: "rito",
      name: "\u30ea\u30c8",
      job: "\u898b\u5f35\u308a",
      css: "villager-guard",
      x: 8,
      y: 3,
      minTownLevel: 1,
      likes: ["torch", "small_shield", "warding_charm", "salve"],
      lines: [
        "\u753a\u304c\u8c4a\u304b\u306b\u306a\u308b\u307b\u3069\u3001\u8972\u6483\u306e\u76ee\u3082\u5411\u304d\u3084\u3059\u3044\u3002\u898b\u5f35\u308a\u53f0\u306f\u5927\u4e8b\u3060\u3002",
        "\u6cbb\u5b89\u3068\u9632\u885b\u529b\u304c\u3042\u308c\u3070\u3001\u591c\u3082\u80f8\u3092\u5f35\u3063\u3066\u898b\u56de\u308c\u308b\u3002"
      ]
    },
    {
      id: "sena",
      name: "\u30bb\u30ca",
      job: "\u65c5\u4eba",
      css: "villager-traveler",
      x: 3,
      y: 6,
      minTownLevel: 2,
      likes: ["silver_ring", "amber_brooch", "moon_glass", "traveler_hat_goods"],
      lines: [
        "\u73cd\u3057\u3044\u5546\u54c1\u304c\u68da\u306b\u4e26\u3076\u3068\u3001\u9060\u304f\u304b\u3089\u5ba2\u304c\u6765\u308b\u3088\u3002",
        "\u9152\u5834\u304c\u3067\u304d\u3066\u304b\u3089\u3001\u3053\u306e\u753a\u306f\u901a\u308a\u3084\u3059\u304f\u306a\u3063\u305f\u306d\u3002"
      ]
    },
    { id: "nola", name: "\u30ce\u30e9", job: "\u7e54\u308a\u624b", css: "villager-green", x: 1, y: 6, minTownLevel: 1, likes: ["traveler_hat_goods", "merchant_coat", "herbal_tea"], lines: ["\u5e03\u3084\u8863\u985e\u304c\u3042\u308b\u3068\u3001\u66ae\u3089\u3057\u304c\u5c11\u3057\u697d\u306b\u306a\u308b\u308f\u3002"] },
    { id: "palo", name: "\u30d1\u30ed", job: "\u6728\u5de5", css: "villager-smith", x: 6, y: 5, minTownLevel: 1, likes: ["torch", "copper_lantern", "cloth_bag"], lines: ["\u5009\u5eab\u3068\u4f4f\u5b85\u304c\u5897\u3048\u308b\u3068\u3001\u753a\u306e\u666f\u8272\u3082\u5909\u308f\u308b\u306a\u3002"] },
    { id: "enna", name: "\u30a8\u30f3\u30ca", job: "\u6599\u7406\u4eba", css: "villager-green", x: 4, y: 6, minTownLevel: 1, likes: ["dried_meat", "herbal_tea", "magic_water"], lines: ["\u98df\u3079\u7269\u304c\u68da\u306b\u3042\u308b\u65e5\u306f\u3001\u5b50\u3069\u3082\u305f\u3061\u3082\u5b09\u3057\u305d\u3046\u3060\u3088\u3002"] },
    { id: "hal", name: "\u30cf\u30eb", job: "\u5b66\u3073\u5c4b", css: "villager", x: 6, y: 4, minTownLevel: 1, likes: ["magic_water", "moon_glass", "warding_charm"], lines: ["\u4e0d\u601d\u8b70\u306a\u54c1\u306f\u3001\u898b\u3066\u3044\u308b\u3060\u3051\u3067\u80f8\u304c\u8e0a\u308b\u3093\u3060\u3002"] },
    { id: "luca", name: "\u30eb\u30ab", job: "\u914d\u9054\u4eba", css: "villager-traveler", x: 0, y: 4, minTownLevel: 1, likes: ["torch", "cloth_bag", "leather_bag", "expedition_pack"], lines: ["\u888b\u304c\u4fbf\u5229\u3060\u3068\u3001\u4ed5\u5165\u308c\u3082\u914d\u9054\u3082\u306f\u304b\u3069\u308b\u3088\u3002"] },
    { id: "coco", name: "\u30b3\u30b3", job: "\u5b50\u3069\u3082", css: "villager", x: 0, y: 7, minTownLevel: 1, likes: ["silver_ring", "amber_brooch", "moon_glass", "herbal_tea"], lines: ["\u304d\u3089\u304d\u3089\u3057\u305f\u54c1\u304c\u3042\u308b\u3068\u3001\u5e97\u306e\u524d\u3067\u305a\u3063\u3068\u898b\u3061\u3083\u3046\u3002"] }
  ];

  const NAME_POOL = [
    "\u30a2\u30eb\u30de", "\u30d9\u30eb", "\u30c8\u30c8", "\u30e6\u30ea", "\u30e9\u30ca", "\u30aa\u30eb\u30c8", "\u30d5\u30a3\u30f3", "\u30de\u30aa",
    "\u30cd\u30eb", "\u30bb\u30eb\u30b8", "\u30ea\u30a2", "\u30dd\u30eb", "\u30e1\u30ea", "\u30ab\u30a4", "\u30ea\u30f3", "\u30bd\u30e9",
    "\u30df\u30aa", "\u30ed\u30c8", "\u30c6\u30a3\u30ca", "\u30b8\u30e5\u30ce", "\u30a4\u30aa", "\u30ad\u30ea", "\u30ef\u30eb\u30c4", "\u30d4\u30a2"
  ];

  const JOB_POOL = [
    { job: "\u8fb2\u5bb6", likes: ["herb", "dried_meat", "torch"], css: "villager-green" },
    { job: "\u5546\u4eba", likes: ["silver_ring", "amber_brooch", "copper_lantern"], css: "villager-traveler" },
    { job: "\u5de5\u592b", likes: ["old_dagger", "copper_lantern", "small_shield"], css: "villager-smith" },
    { job: "\u898b\u5f35\u308a", likes: ["torch", "salve", "warding_charm"], css: "villager-guard" },
    { job: "\u65c5\u4eba", likes: ["traveler_hat_goods", "magic_water", "old_dagger"], css: "villager-traveler" },
    { job: "\u5b50\u3069\u3082", likes: ["herbal_tea", "moon_glass", "amber_brooch"], css: "villager" }
  ];

  const WALK_SPOTS = [
    { x: 3, y: 5 }, { x: 6, y: 2 }, { x: 8, y: 3 }, { x: 3, y: 6 }, { x: 1, y: 6 },
    { x: 6, y: 5 }, { x: 4, y: 6 }, { x: 6, y: 4 }, { x: 0, y: 4 }, { x: 0, y: 7 }
  ];

  function makeVillager(template, index) {
    return Object.assign({
      status: "healthy",
      daysWithoutFavorite: 0,
      favoriteBoughtToday: false,
      joinedDay: 1,
      creditTrust: 55,
      creditBlocked: false
    }, template, {
      id: template.id || `villager_${index}_${Date.now()}`,
      likes: (template.likes || []).slice(),
      lines: (template.lines || ["\u3053\u306e\u753a\u304c\u597d\u304d\u3060\u304b\u3089\u3001\u5b88\u308a\u305f\u3044\u3093\u3060\u3002"]).slice()
    });
  }

  function createInitialVillagers(count) {
    const list = [];
    for (let i = 0; i < count; i += 1) list.push(createVillager(i));
    return list;
  }

  function createVillager(index, joinedDay) {
    if (index < BASE_VILLAGERS.length) return makeVillager(BASE_VILLAGERS[index], index);
    const jobTemplate = Game.Items.choose(JOB_POOL);
    const spot = WALK_SPOTS[index % WALK_SPOTS.length];
    const name = NAME_POOL[index % NAME_POOL.length] + (index >= NAME_POOL.length ? String(Math.floor(index / NAME_POOL.length) + 1) : "");
    return makeVillager({
      id: `resident_${index + 1}`,
      name,
      job: jobTemplate.job,
      css: jobTemplate.css,
      x: spot.x,
      y: spot.y,
      minTownLevel: index >= 20 ? 3 : index >= 12 ? 2 : 1,
      likes: jobTemplate.likes,
      lines: [
        "\u597d\u304d\u306a\u54c1\u304c\u68da\u306b\u4e26\u3076\u3068\u3001\u3053\u306e\u753a\u3067\u66ae\u3089\u3059\u306e\u304c\u697d\u3057\u304f\u306a\u308b\u3088\u3002",
        "\u8972\u6483\u304c\u3042\u308b\u3068\u4e0d\u5b89\u306b\u306a\u308b\u3002\u898b\u5f35\u308a\u53f0\u3092\u983c\u308a\u306b\u3057\u3066\u3044\u308b\u3088\u3002"
      ],
      joinedDay: joinedDay || 1
    }, index);
  }

  function normalizeVillagers(state) {
    if (!Array.isArray(state.villagers)) {
      const population = Number.isFinite(Number(state.town.population)) ? Math.max(0, Math.round(Number(state.town.population))) : 0;
      state.villagers = createInitialVillagers(population);
    }
    state.villagers = state.villagers.map((villager, index) => {
      const base = BASE_VILLAGERS.find((item) => item.id === villager.id);
      const normalized = makeVillager(Object.assign({}, base || createVillager(index), villager), index);
      if (!STATUS[normalized.status]) normalized.status = "healthy";
      normalized.daysWithoutFavorite = Math.max(0, Math.round(normalized.daysWithoutFavorite || 0));
      normalized.favoriteBoughtToday = Boolean(normalized.favoriteBoughtToday);
      normalized.creditTrust = Game.State ? Game.State.clamp(Math.round(normalized.creditTrust || 55), 0, 100) : Math.max(0, Math.min(100, Math.round(normalized.creditTrust || 55)));
      normalized.creditBlocked = Boolean(normalized.creditBlocked);
      return normalized;
    });
    ensurePopulationVillagers(state);
    syncPopulation(state);
  }

  function ensurePopulationVillagers(state) {
    const living = livingVillagers(state).length;
    const target = Math.max(0, Math.min(state.town.populationCap || 999, Math.round(state.town.population || living)));
    for (let i = living; i < target; i += 1) {
      state.villagers.push(createVillager(state.villagers.length, state.day || 1));
    }
  }

  function syncPopulation(state) {
    state.town.population = livingVillagers(state).length;
  }

  function livingVillagers(state) {
    return (state.villagers || []).filter((villager) => villager.status !== "dead");
  }

  function visibleVillagers(state) {
    return livingVillagers(state).filter((villager) => state.town.level >= (villager.minTownLevel || 1));
  }

  function getAt(state, x, y) {
    return visibleVillagers(state).find((villager) => villager.x === x && villager.y === y) || null;
  }

  function statusLabel(status) {
    return STATUS[status] || STATUS.healthy;
  }

  function productName(id) {
    const product = Game.Items.PRODUCT_CATALOG.find((item) => item.id === id);
    const material = Game.Items.MATERIAL_CATALOG.find((item) => item.id === id);
    const equipment = Game.Items.EQUIPMENT_CATALOG.find((item) => item.id === id);
    return (product || material || equipment || { name: id }).name;
  }

  function likesText(villager) {
    return (villager.likes || []).map(productName).join(" / ");
  }

  function likesItem(villager, item) {
    if (!villager || !item) return false;
    return (villager.likes || []).includes(item.id);
  }

  function beginSaleDay(state) {
    livingVillagers(state).forEach((villager) => { villager.favoriteBoughtToday = false; });
  }

  function recordSoldItem(state, item, logs) {
    if (!item) return null;
    const candidates = livingVillagers(state).filter((villager) => likesItem(villager, item) && !villager.favoriteBoughtToday);
    const villager = candidates.length ? Game.Items.choose(candidates) : null;
    if (villager) {
      villager.favoriteBoughtToday = true;
      villager.daysWithoutFavorite = 0;
      if (villager.status === "unhappy") villager.status = "healthy";
      state.town.happiness += 2;
      logs.push(`${villager.name}\u304c\u597d\u307f\u306e${item.name}\u3092\u8cb7\u3044\u3001\u5e78\u305b\u5ea6\u304c\u4e0a\u304c\u3063\u305f\u3002`);
      if (Game.Audio) Game.Audio.playSfx("questComplete");
    }
    tryHealInjured(state, item, logs);
    return villager;
  }

  function tryHealInjured(state, item, logs) {
    if (!["herb", "good_herb", "salve", "magic_water"].includes(item.id)) return;
    const injured = livingVillagers(state).filter((villager) => villager.status === "injured");
    if (!injured.length) return;
    const chance = item.id === "salve" || item.id === "good_herb" ? 80 : item.id === "magic_water" ? 65 : 45;
    if (!Game.Items.chance(chance)) return;
    const villager = Game.Items.choose(injured);
    villager.status = "healthy";
    villager.daysWithoutFavorite = Math.max(0, villager.daysWithoutFavorite - 1);
    state.town.happiness += 1;
    logs.push(`${item.name}\u304c\u884c\u304d\u6e21\u308a\u3001${villager.name}\u306e\u50b7\u304c\u56de\u5fa9\u3057\u305f\u3002`);
  }

  function finishSaleDay(state, logs) {
    const needy = [];
    livingVillagers(state).forEach((villager) => {
      if (villager.favoriteBoughtToday) return;
      villager.daysWithoutFavorite += 1;
      if (villager.daysWithoutFavorite >= 4 && villager.status === "healthy") {
        villager.status = "unhappy";
        needy.push(villager);
      } else if (villager.daysWithoutFavorite >= 6 && villager.status === "unhappy") {
        needy.push(villager);
      }
    });
    if (needy.length) {
      const penalty = Math.min(3, Math.ceil(needy.length / 3));
      state.town.happiness -= penalty;
      needy.slice(0, 2).forEach((villager) => logs.push(`${villager.name}\u306f\u597d\u307f\u306e\u54c1\u304c\u4e45\u3057\u304f\u4e26\u3070\u305a\u3001\u5c11\u3057\u4e0d\u6e80\u305d\u3046\u3060\u3002`));
      if (needy.length > 2) logs.push(`\u4ed6\u306b${needy.length - 2}\u4eba\u3082\u6b32\u3057\u3044\u54c1\u3092\u5f85\u3063\u3066\u3044\u308b\u3002`);
    }
  }

  function addImmigrants(state, count) {
    const added = [];
    for (let i = 0; i < count && livingVillagers(state).length < state.town.populationCap; i += 1) {
      const villager = createVillager(state.villagers.length, state.day || 1);
      state.villagers.push(villager);
      added.push(villager);
    }
    syncPopulation(state);
    return added;
  }

  function removeUnhappyResidents(state, count) {
    const removed = [];
    const candidates = livingVillagers(state).filter((villager) => !BASE_VILLAGERS.some((base) => base.id === villager.id)).sort((a, b) => {
      const scoreA = (a.status === "unhappy" ? 0 : 1) + a.daysWithoutFavorite * -0.01;
      const scoreB = (b.status === "unhappy" ? 0 : 1) + b.daysWithoutFavorite * -0.01;
      return scoreA - scoreB;
    });
    for (let i = 0; i < count && candidates[i]; i += 1) {
      const index = state.villagers.findIndex((villager) => villager.id === candidates[i].id);
      if (index >= 0) removed.push(state.villagers.splice(index, 1)[0]);
    }
    syncPopulation(state);
    return removed;
  }

  function applyRaidDamage(state, deathCount, injuryCount, logs) {
    const living = livingVillagers(state);
    const deaths = [];
    const injuries = [];
    for (let i = 0; i < deathCount && living.length; i += 1) {
      const index = Game.Items.randomInt(0, living.length - 1);
      const villager = living.splice(index, 1)[0];
      villager.status = "dead";
      deaths.push(villager);
      logs.push(`${villager.name}\u304c\u72a0\u7272\u306b\u306a\u3063\u305f\u3002`);
      if (Game.Audio) Game.Audio.playSfx("villagerLost");
    }
    const injuryTargets = living.filter((villager) => villager.status !== "injured");
    for (let i = 0; i < injuryCount && injuryTargets.length; i += 1) {
      const index = Game.Items.randomInt(0, injuryTargets.length - 1);
      const villager = injuryTargets.splice(index, 1)[0];
      villager.status = "injured";
      injuries.push(villager);
      logs.push(`${villager.name}\u304c\u8ca0\u50b7\u3057\u305f\u3002`);
      if (Game.Audio) Game.Audio.playSfx("villagerInjured");
    }
    syncPopulation(state);
    return { deaths, injuries };
  }

  function statusCounts(state) {
    return (state.villagers || []).reduce((counts, villager) => {
      counts[villager.status] = (counts[villager.status] || 0) + 1;
      return counts;
    }, { healthy: 0, injured: 0, unhappy: 0, dead: 0 });
  }

  Game.Villagers = {
    STATUS,
    BASE_VILLAGERS,
    createInitialVillagers,
    normalizeVillagers,
    ensurePopulationVillagers,
    syncPopulation,
    livingVillagers,
    visibleVillagers,
    getAt,
    statusLabel,
    likesText,
    likesItem,
    beginSaleDay,
    recordSoldItem,
    finishSaleDay,
    addImmigrants,
    removeUnhappyResidents,
    applyRaidDamage,
    statusCounts
  };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const GOAL_REWARDS = {
    gold50: { text: "50G", apply(state) { state.hero.gold += 50; } },
    happy3: { text: "幸せ度 +3", apply(state) { state.town.happiness += 3; } },
    rep2: { text: "店の評判 +2", apply(state) { state.shop.reputation += 2; } },
    wealth2: { text: "豊かさ +2", apply(state) { state.town.wealth += 2; } },
    defense2: { text: "防衛力 +2", apply(state) { state.town.defense += 2; } }
  };

  const QUEST_DEFS = {
    mira: {
      villagerId: "mira",
      villagerName: "ミラ",
      title: "薬草を2個売る",
      type: "sell",
      targetId: "herb",
      target: 2,
      rewardText: "幸せ度 +5、移住者 +1",
      reward(state) {
        state.town.happiness += 5;
        const added = Game.Villagers.addImmigrants(state, 1);
        return added.length ? [`ミラのお願いを叶え、${added[0].name}が移り住んだ。`] : ["ミラのお願いを叶え、幸せ度が上がった。"];
      }
    },
    gantz: {
      villagerId: "gantz",
      villagerName: "ガンツ",
      title: "鉄くずを3個届ける",
      type: "deliver",
      targetId: "scrap_iron",
      target: 3,
      rewardText: "鍛冶強化費用 -30G",
      reward(state) {
        state.flags.blacksmithDiscount = Math.max(state.flags.blacksmithDiscount || 0, 30);
        return ["ガンツが炉を整え、鍛冶の強化費用が少し下がった。"];
      }
    },
    rito: {
      villagerId: "rito",
      villagerName: "リト",
      title: "たいまつを2個届ける",
      type: "deliver",
      targetId: "torch",
      target: 2,
      rewardText: "防衛力 +5、治安 +3",
      reward(state) {
        state.town.defense += 5;
        state.town.safety += 3;
        return ["リトの見回り道具がそろい、防衛力と治安が上がった。"];
      }
    },
    sena: {
      villagerId: "sena",
      villagerName: "セナ",
      title: "銀の指輪を1個売る",
      type: "sell",
      targetId: "silver_ring",
      target: 1,
      rewardText: "店の評判 +10、豊かさ +3",
      reward(state) {
        state.shop.reputation += 10;
        state.town.wealth += 3;
        return ["セナが町の噂を広め、評判と豊かさが上がった。"];
      }
    }
  };

  function ensureState(state) {
    if (!state.dailyGoals) state.dailyGoals = { day: 0, goals: [] };
    if (!state.quests) state.quests = {};
    Object.values(QUEST_DEFS).forEach((quest) => {
      if (!state.quests[quest.villagerId]) state.quests[quest.villagerId] = { status: "unaccepted", progress: 0 };
    });
  }

  function initializeDay(state) {
    ensureState(state);
    if (state.dailyGoals.day === state.day && state.dailyGoals.goals.length) return [];
    state.dailyGoals = { day: state.day, goals: createDailyGoals(state) };
    return ["今日の目標が更新された。"];
  }

  function createDailyGoals(state) {
    const goals = [
      makeGoal("sell_count", "商品を2個売る", "sell", 2, null, "gold50"),
      makeGoal("collect_goods", "商品を2個仕入れる", "collectSaleable", 2, null, "rep2")
    ];
    if (!state.today.dungeonDone) goals.push(makeGoal("reach_floor", "ダンジョン3階まで到達する", "reachFloor", 3, null, "wealth2"));
    if (state.town.defense < 25 || (state.raidOmen && state.raidOmen.active)) goals.push(makeGoal("raise_defense", "防衛力を2上げる", "defenseGain", 2, null, "defense2"));
    const mira = (state.villagers || []).find((villager) => villager.id === "mira" && villager.status !== "dead");
    if (mira) goals.push(makeGoal("mira_favorite", "ミラに好きな商品を売る", "sellFavorite", 1, "mira", "happy3"));
    return goals.slice(0, 3);
  }

  function makeGoal(id, title, type, target, targetId, rewardId) {
    return {
      id: `${id}_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
      title,
      type,
      target,
      targetId,
      progress: 0,
      completed: false,
      rewardId
    };
  }

  function rewardText(goal) {
    return (GOAL_REWARDS[goal.rewardId] || GOAL_REWARDS.gold50).text;
  }

  function track(state, eventType, payload, logs) {
    ensureState(state);
    initializeDay(state);
    const messages = logs || [];
    state.dailyGoals.goals.forEach((goal) => {
      if (goal.completed) return;
      if (eventType === "collect" && goal.type === "collectSaleable" && payload && Game.Items.isSaleable(payload.item)) goal.progress += 1;
      if (eventType === "sell" && goal.type === "sell") goal.progress += 1;
      if (eventType === "sell" && goal.type === "sellFavorite" && payload && payload.villagerId === goal.targetId) goal.progress += 1;
      if (eventType === "reachFloor" && goal.type === "reachFloor" && payload) goal.progress = Math.max(goal.progress, payload.floor);
      if (eventType === "defenseGain" && goal.type === "defenseGain" && payload) goal.progress += Math.max(0, payload.amount || 0);
      if (goal.progress >= goal.target) completeGoal(state, goal, messages);
    });
    trackQuests(state, eventType, payload, messages);
    Game.State.updateDerivedStats(state);
    return messages;
  }

  function completeGoal(state, goal, logs) {
    goal.completed = true;
    const reward = GOAL_REWARDS[goal.rewardId] || GOAL_REWARDS.gold50;
    reward.apply(state);
    logs.push(`今日の目標「${goal.title}」達成。報酬: ${reward.text}`);
    if (Game.Audio) Game.Audio.playSfx("questComplete");
  }

  function trackQuests(state, eventType, payload, logs) {
    Object.values(QUEST_DEFS).forEach((quest) => {
      const status = state.quests[quest.villagerId];
      if (!status || status.status !== "active") return;
      if (eventType === "sell" && quest.type === "sell" && payload && payload.item && payload.item.id === quest.targetId) {
        status.progress += 1;
      }
      if (status.progress >= quest.target) {
        status.progress = quest.target;
        status.status = "ready";
        logs.push(`お願い「${quest.title}」が達成可能になった。`);
        if (Game.Audio) Game.Audio.playSfx("questComplete");
      }
    });
  }

  function handleVillagerTalk(state, villager, logs) {
    ensureState(state);
    const quest = QUEST_DEFS[villager.id];
    if (!quest) return logs;
    const status = state.quests[villager.id];
    if (status.status === "unaccepted") {
      status.status = "active";
      status.progress = currentQuestProgress(state, quest);
      logs.push(`${villager.name}のお願い「${quest.title}」を受けた。`);
      if (status.progress >= quest.target) status.status = "ready";
      if (Game.Audio) Game.Audio.playSfx("questAccept");
      return logs;
    }
    if (status.status === "active") {
      status.progress = Math.max(status.progress, currentQuestProgress(state, quest));
      if (status.progress >= quest.target) {
        status.status = "ready";
        completeQuest(state, quest, status, logs);
        return logs;
      }
      logs.push(`${villager.name}のお願い: ${progressText(quest, status)}`);
      return logs;
    }
    if (status.status === "ready") {
      completeQuest(state, quest, status, logs);
      return logs;
    }
    logs.push(`${villager.name}のお願いは達成済みだ。`);
    return logs;
  }

  function currentQuestProgress(state, quest) {
    if (quest.type !== "deliver") return 0;
    return (state.shop.storage || []).filter((item) => item.id === quest.targetId).length;
  }

  function completeQuest(state, quest, status, logs) {
    if (quest.type === "deliver") consumeQuestItems(state, quest.targetId, quest.target);
    status.status = "done";
    status.progress = quest.target;
    logs.push(...quest.reward(state));
    logs.push(`お願い「${quest.title}」達成。報酬: ${quest.rewardText}`);
    if (Game.Audio) Game.Audio.playSfx("questComplete");
    Game.State.updateDerivedStats(state);
  }

  function consumeQuestItems(state, itemId, count) {
    for (let i = 0; i < count; i += 1) {
      const index = state.shop.storage.findIndex((item) => item.id === itemId);
      if (index >= 0) state.shop.storage.splice(index, 1);
    }
  }

  function progressText(quest, status) {
    const label = itemName(quest.targetId);
    return `${label} ${Math.min(status.progress, quest.target)}/${quest.target}`;
  }

  function itemName(id) {
    const item = Game.Items.PRODUCT_CATALOG.find((entry) => entry.id === id)
      || Game.Items.MATERIAL_CATALOG.find((entry) => entry.id === id)
      || Game.Items.EQUIPMENT_CATALOG.find((entry) => entry.id === id);
    return item ? item.name : id;
  }

  function questList(state) {
    ensureState(state);
    return Object.values(QUEST_DEFS).map((quest) => {
      const status = state.quests[quest.villagerId];
      const villager = (state.villagers || []).find((person) => person.id === quest.villagerId) || {};
      if (quest.type === "deliver" && status.status === "active") status.progress = Math.max(status.progress, currentQuestProgress(state, quest));
      return Object.assign({}, quest, {
        villagerName: villager.name || quest.villagerName || quest.villagerId,
        status: status.status,
        progress: Math.min(status.progress || 0, quest.target),
        progressText: progressText(quest, status)
      });
    });
  }

  function statusLabel(status) {
    return {
      unaccepted: "未受注",
      active: "受注中",
      ready: "達成可能",
      done: "達成済み"
    }[status] || status;
  }

  Game.Objectives = {
    QUEST_DEFS,
    ensureState,
    initializeDay,
    track,
    handleVillagerTalk,
    questList,
    statusLabel,
    rewardText
  };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const MAX_DAYS = 30;
  const MAX_HERO_LEVEL = 10;
  const MAX_SHOP_LEVEL = 3;
  const MAX_TOWN_LEVEL = 10;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function defaultTownMap() {
    return {
      width: 100,
      height: 80,
      hero: { x: 48, y: 45 },
      facing: "up",
      lastBuilding: null
    };
  }

  function isDevelopmentTestBuild() {
    const location = typeof window !== "undefined" ? window.location : null;
    const host = location && location.hostname ? location.hostname : "";
    const protocol = location && location.protocol ? location.protocol : "";
    const path = location && location.pathname ? location.pathname : "";
    return protocol === "file:" ||
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "" ||
      host.includes("trycloudflare.com") ||
      (host === "maruw501.github.io" && path.includes("/labyrinth-mall-test"));
  }

  function developmentStartingGold() {
    return isDevelopmentTestBuild() ? 30000 : 300;
  }

  function createNewGame() {
    const state = {
      version: 4,
      day: 1,
      phase: "\u671d",
      maxDays: MAX_DAYS,
      screen: "main",
      today: { dungeonDone: false, shelvesArranged: false, nightSaleDone: false },
      hero: {
        name: "\u82e5\u304d\u5546\u4eba",
        level: 1,
        hp: 30,
        maxHp: 30,
        baseAttack: 5,
        baseDefense: 2,
        exp: 0,
        nextExp: 18,
        gold: developmentStartingGold(),
        baseCarryLimit: 10,
        inventory: [],
        equipment: { weapon: Game.Items.createEquipment("wood_sword", 1), armor: null, accessory: null, bag: null }
      },
      town: {
        population: 0,
        populationCap: 5,
        wealth: 10,
        happiness: 50,
        safety: 50,
        defense: 10,
        level: 1,
        investmentStage: 0
      },
      villagers: Game.Villagers.createInitialVillagers(0),
      shop: {
        name: "名もなき店",
        level: 1,
        shelves: 3,
        reputation: 10,
        durability: 100,
        storageCapacity: 30,
        warehouseExpansions: 0,
        storage: [],
        shelfItems: [],
        creditLedger: [],
        customerCredit: {}
      },
      townMap: defaultTownMap(),
      buildings: {
        blacksmithLevel: 0,
        weaponShopLevel: 0,
        tavernBuilt: false,
        guildBuilt: false
      },
      dungeon: {
        tier: 0,
        clearedTiers: []
      },
      blacksmith: {
        synthesisBase: null,
        synthesisMaterial: null
      },
      flags: {
        gameOver: false,
        victory: false,
        resultReason: "",
        nextDungeonMutation: false,
        adventurerDemand: false,
        alefVisited: false,
        blacksmithDiscount: 0,
        hadResidents: false,
        blacksmithArrivalPending: false,
        blacksmithArrivalShown: false
      },
      dailyGoals: { day: 0, goals: [] },
      quests: {},
      raidOmen: null,
      townStory: null,
      lastRaid: null,
      lastSale: null,
      saleSession: null,
      uiOverlay: null,
      lastConversation: null,
      log: [
        "\u3055\u3073\u308c\u305f\u6751\u306e\u5165\u308a\u53e3\u306b\u5c0f\u3055\u306a\u9053\u5177\u5c4b\u3092\u958b\u3044\u305f\u3002",
        "30\u65e5\u4ee5\u5185\u306b\u5546\u5e97\u8857\u3092\u80b2\u3066\u3088\u3046\u3002"
      ]
    };

    state.shop.storage.push(Game.Items.createNamedProduct("herb"));
    state.shop.storage.push(Game.Items.createNamedProduct("torch"));
    state.shop.storage.push(Game.Items.createNamedProduct("herb"));
    if (Game.Objectives) Game.Objectives.initializeDay(state);
    return state;
  }

  function normalizeState(state) {
    if (!state || typeof state !== "object") return createNewGame();
    const fresh = createNewGame();
    const merged = Object.assign({}, fresh, state);
    merged.today = Object.assign({}, fresh.today, state.today || {});
    merged.hero = Object.assign({}, fresh.hero, state.hero || {});
    merged.hero.inventory = Array.isArray(merged.hero.inventory) ? merged.hero.inventory : [];
    merged.hero.equipment = Object.assign({}, fresh.hero.equipment, (state.hero && state.hero.equipment) || {});
    merged.town = Object.assign({}, fresh.town, state.town || {});
    merged.villagers = Array.isArray(state.villagers) ? state.villagers : fresh.villagers;
    merged.shop = Object.assign({}, fresh.shop, state.shop || {});
    merged.shop.name = typeof merged.shop.name === "string" && merged.shop.name.trim() ? merged.shop.name.trim().slice(0, 16) : fresh.shop.name;
    merged.shop.storage = Array.isArray(merged.shop.storage) ? merged.shop.storage : [];
    merged.shop.shelfItems = Array.isArray(merged.shop.shelfItems) ? merged.shop.shelfItems : [];
    merged.shop.creditLedger = Array.isArray(merged.shop.creditLedger) ? merged.shop.creditLedger : [];
    merged.shop.customerCredit = merged.shop.customerCredit && typeof merged.shop.customerCredit === "object" ? merged.shop.customerCredit : {};
    merged.townMap = Object.assign(defaultTownMap(), state.townMap || {});
    merged.townMap.width = defaultTownMap().width;
    merged.townMap.height = defaultTownMap().height;
    if (state.townMap && (state.townMap.width < 50 || state.townMap.height < 40)) {
      merged.townMap.hero = Object.assign({}, defaultTownMap().hero);
    } else {
      merged.townMap.hero = Object.assign(defaultTownMap().hero, (state.townMap && state.townMap.hero) || {});
    }
    merged.townMap.facing = merged.townMap.facing || "down";
    merged.buildings = Object.assign({}, fresh.buildings, state.buildings || {});
    merged.dungeon = Object.assign({}, fresh.dungeon, state.dungeon || {});
    merged.dungeon.tier = clamp(Math.round(merged.dungeon.tier || 0), 0, 2);
    merged.dungeon.clearedTiers = Array.isArray(merged.dungeon.clearedTiers) ? merged.dungeon.clearedTiers : [];
    merged.blacksmith = Object.assign({}, fresh.blacksmith, state.blacksmith || {});
    merged.flags = Object.assign({}, fresh.flags, state.flags || {});
    merged.dailyGoals = Object.assign({}, fresh.dailyGoals, state.dailyGoals || {});
    merged.dailyGoals.goals = Array.isArray(merged.dailyGoals.goals) ? merged.dailyGoals.goals : [];
    merged.quests = Object.assign({}, fresh.quests, state.quests || {});
    merged.raidOmen = state.raidOmen && state.raidOmen.active ? Object.assign({}, state.raidOmen) : null;
    merged.townStory = state.townStory && typeof state.townStory === "object" ? Object.assign({}, state.townStory) : null;
    merged.log = Array.isArray(merged.log) ? merged.log.slice(-80) : fresh.log;
    merged.uiOverlay = null;
    if (isDevelopmentTestBuild()) merged.hero.gold = Math.max(Number(merged.hero.gold) || 0, 30000);
    Game.Villagers.normalizeVillagers(merged);
    if (Game.Weapons) Game.Weapons.normalizeAll(merged);
    if (Game.Objectives) {
      Game.Objectives.ensureState(merged);
      Game.Objectives.initializeDay(merged);
    }
    updateDerivedStats(merged);
    return merged;
  }

  function updateDerivedStats(state) {
    state.shop.level = clamp(state.shop.level, 1, MAX_SHOP_LEVEL);
    state.town.level = clamp(state.town.level, 1, MAX_TOWN_LEVEL);
    state.shop.shelves = state.shop.level === 1 ? 3 : state.shop.level === 2 ? 5 : 8;

    const hpBonus = Game.Items.getEquipmentBonus(state, "maxHp");
    state.hero.maxHp = Math.max(1, 30 + (state.hero.level - 1) * 5 + hpBonus);
    state.hero.hp = clamp(state.hero.hp, 0, state.hero.maxHp);
    state.hero.level = clamp(state.hero.level, 1, MAX_HERO_LEVEL);
    state.town.population = clamp(Math.round(state.town.population), 0, state.town.populationCap);
    if (Game.Villagers && Array.isArray(state.villagers)) {
      Game.Villagers.ensurePopulationVillagers(state);
      Game.Villagers.syncPopulation(state);
    }
    if (state.town.population > 0) state.flags.hadResidents = true;
    state.town.wealth = clamp(Math.round(state.town.wealth), 0, 999);
    state.town.happiness = clamp(Math.round(state.town.happiness), 0, 100);
    state.town.safety = clamp(Math.round(state.town.safety), 0, 100);
    state.town.defense = clamp(Math.round(state.town.defense), 0, 999);
    state.town.investmentStage = clamp(Math.round(Number(state.town.investmentStage) || 0), 0, 6);
    state.buildings.blacksmithLevel = clamp(Math.round(Number(state.buildings.blacksmithLevel) || 0), 0, 3);
    if (state.town.investmentStage >= 1 && state.buildings.blacksmithLevel <= 0 && !state.flags.blacksmithArrivalPending && !state.flags.blacksmithArrivalShown && !state.townStory) {
      state.flags.blacksmithArrivalPending = true;
    }
    state.shop.reputation = clamp(Math.round(state.shop.reputation), 0, 100);
    state.shop.durability = clamp(Math.round(state.shop.durability), 0, 100);
    state.shop.warehouseExpansions = clamp(Math.round(Number(state.shop.warehouseExpansions) || Math.floor(Math.max(0, state.shop.storageCapacity - 30) / 10)), 0, 30);
    state.shop.storage = state.shop.storage.slice(0, state.shop.storageCapacity);
    state.shop.shelfItems = state.shop.shelfItems.slice(0, state.shop.shelves);
    if (!Array.isArray(state.shop.creditLedger)) state.shop.creditLedger = [];
    if (!state.shop.customerCredit || typeof state.shop.customerCredit !== "object") state.shop.customerCredit = {};
    if (Game.Weapons) Game.Weapons.normalizeAll(state);
    state.townMap.hero.x = clamp(Math.round(state.townMap.hero.x), 0, state.townMap.width - 1);
    state.townMap.hero.y = clamp(Math.round(state.townMap.hero.y), 0, state.townMap.height - 1);
    if (!["up", "down", "left", "right"].includes(state.townMap.facing)) state.townMap.facing = "down";
    if (!state.dungeon || typeof state.dungeon !== "object") state.dungeon = { tier: 0, clearedTiers: [] };
    state.dungeon.tier = clamp(Math.round(state.dungeon.tier || 0), 0, 2);
    state.dungeon.clearedTiers = Array.isArray(state.dungeon.clearedTiers) ? state.dungeon.clearedTiers : [];
  }

  function addLog(state, message) {
    if (!message) return;
    state.log.push(message);
    state.log = state.log.slice(-80);
  }

  function addLogs(state, messages) {
    messages.forEach((message) => addLog(state, message));
  }

  function gainExperience(state, amount) {
    const logs = [];
    if (state.hero.level >= MAX_HERO_LEVEL) return logs;
    state.hero.exp += amount;
    logs.push(`${amount}\u7d4c\u9a13\u5024\u3092\u5f97\u305f\u3002`);

    while (state.hero.exp >= state.hero.nextExp && state.hero.level < MAX_HERO_LEVEL) {
      state.hero.exp -= state.hero.nextExp;
      state.hero.level += 1;
      state.hero.baseAttack += 2;
      state.hero.baseDefense += 1;
      state.hero.maxHp += 5;
      state.hero.hp = state.hero.maxHp;
      state.hero.nextExp = Math.round(state.hero.nextExp * 1.45 + 8);
      logs.push(`${state.hero.name}\u306f\u30ec\u30d9\u30eb${state.hero.level}\u306b\u306a\u3063\u305f\u3002`);
      if (Game.Audio) Game.Audio.playSfx("levelUp");
    }

    updateDerivedStats(state);
    return logs;
  }

  function checkTownLevelUp(state) {
    const logs = [];
    const requirements = [
      null,
      null,
      { wealth: 25, population: 3, happiness: 45, shopLevel: 1, capBonus: 5, log: "\u753a\u30ec\u30d9\u30eb\u304c2\u306b\u306a\u3063\u305f\u3002\u5e83\u5834\u3078\u306e\u5c0f\u9053\u304c\u3067\u304d\u305f\u3002" },
      { wealth: 40, population: 8, happiness: 50, shopLevel: 1, capBonus: 8, log: "\u753a\u30ec\u30d9\u30eb\u304c3\u306b\u306a\u3063\u305f\u3002\u5009\u5eab\u3068\u4f4f\u5b85\u304c\u5897\u3048\u305f\u3002" },
      { wealth: 60, population: 14, happiness: 52, shopLevel: 2, capBonus: 10, log: "\u753a\u30ec\u30d9\u30eb\u304c4\u306b\u306a\u3063\u305f\u3002\u75c5\u9662\u3092\u8a98\u81f4\u3067\u304d\u308b\u898f\u6a21\u306b\u306a\u3063\u305f\u3002" },
      { wealth: 85, population: 22, happiness: 55, shopLevel: 2, capBonus: 12, log: "\u753a\u30ec\u30d9\u30eb\u304c5\u306b\u306a\u3063\u305f\u3002\u898b\u5f35\u308a\u53f0\u3068\u935b\u51b6\u5c4b\u7528\u5730\u304c\u958b\u3051\u305f\u3002" },
      { wealth: 110, population: 30, happiness: 60, shopLevel: 3, capBonus: 14, log: "\u753a\u30ec\u30d9\u30eb\u304c6\u306b\u306a\u3063\u305f\u3002\u6b66\u5668\u5c4b\u3068\u9152\u5834\u304c\u4eba\u3092\u96c6\u3081\u59cb\u3081\u305f\u3002" },
      { wealth: 140, population: 42, happiness: 64, shopLevel: 3, capBonus: 16, log: "\u753a\u30ec\u30d9\u30eb\u304c7\u306b\u306a\u3063\u305f\u3002\u5408\u6210\u5c4b\u306e\u5834\u6240\u304c\u3067\u304d\u305f\u3002" },
      { wealth: 175, population: 56, happiness: 68, shopLevel: 3, capBonus: 18, log: "\u753a\u30ec\u30d9\u30eb\u304c8\u306b\u306a\u3063\u305f\u3002\u5192\u967a\u8005\u30ae\u30eb\u30c9\u3092\u547c\u3079\u308b\u753a\u306b\u306a\u3063\u305f\u3002" },
      { wealth: 215, population: 72, happiness: 72, shopLevel: 3, capBonus: 20, log: "\u753a\u30ec\u30d9\u30eb\u304c9\u306b\u306a\u3063\u305f\u3002\u5546\u5e97\u8857\u3068\u3057\u3066\u540d\u304c\u5e83\u304c\u3063\u305f\u3002" },
      { wealth: 260, population: 90, happiness: 78, shopLevel: 3, capBonus: 25, log: "\u753a\u30ec\u30d9\u30eb\u304c10\u306b\u306a\u3063\u305f\u3002\u8ff7\u5bae\u5546\u5e97\u8857\u306e\u4e2d\u5fc3\u5730\u306b\u306a\u3063\u305f\u3002" }
    ];
    while (state.town.level < MAX_TOWN_LEVEL) {
      const nextLevel = state.town.level + 1;
      const req = requirements[nextLevel];
      if (!req) break;
      if (state.town.wealth < req.wealth || state.town.population < req.population || state.town.happiness < req.happiness || state.shop.level < req.shopLevel) break;
      state.town.level = nextLevel;
      state.town.populationCap += req.capBonus;
      state.town.happiness += 2;
      if (nextLevel >= 6) state.buildings.tavernBuilt = true;
      if (nextLevel >= 8) state.buildings.guildBuilt = true;
      logs.push(req.log);
    }

    updateDerivedStats(state);
    return logs;
  }

  function checkGameEnd(state) {
    if (state.flags.gameOver) return true;
    if (state.town.population <= 0 && state.flags.hadResidents) {
      state.flags.gameOver = true;
      state.flags.victory = false;
      state.flags.resultReason = "\u4eba\u53e3\u304c0\u306b\u306a\u308a\u3001\u753a\u3092\u7dad\u6301\u3067\u304d\u306a\u304f\u306a\u3063\u305f\u3002";
      if (Game.Audio) Game.Audio.playSfx("lose");
      return true;
    }
    if (state.shop.durability <= 0) {
      state.flags.gameOver = true;
      state.flags.victory = false;
      state.flags.resultReason = "\u5e97\u306e\u8010\u4e45\u5ea6\u304c0\u306b\u306a\u308a\u3001\u55b6\u696d\u3067\u304d\u306a\u304f\u306a\u3063\u305f\u3002";
      if (Game.Audio) Game.Audio.playSfx("lose");
      return true;
    }
    if (state.day > MAX_DAYS) {
      const victory = state.shop.level >= 3 && state.town.level >= 3 && state.town.population >= 30 && state.town.happiness >= 60;
      state.flags.gameOver = true;
      state.flags.victory = victory;
      state.flags.resultReason = victory
        ? "30\u65e5\u4ee5\u5185\u306b\u7acb\u6d3e\u306a\u5546\u5e97\u8857\u3092\u4f5c\u308a\u4e0a\u3052\u305f\u3002"
        : "30\u65e5\u304c\u904e\u304e\u305f\u304c\u3001\u52dd\u5229\u6761\u4ef6\u3092\u6e80\u305f\u305b\u306a\u304b\u3063\u305f\u3002";
      if (Game.Audio) Game.Audio.playSfx(victory ? "win" : "lose");
      return true;
    }
    return false;
  }

  function startNextDay(state) {
    state.day += 1;
    state.phase = "\u671d";
    state.today = { dungeonDone: false, shelvesArranged: false, nightSaleDone: false };
    state.saleSession = null;
    state.hero.hp = state.hero.maxHp;
    state.flags.adventurerDemand = false;
    const logs = [];
    if (state.flags.blacksmithArrivalPending && state.buildings.blacksmithLevel <= 0) {
      state.flags.blacksmithArrivalPending = false;
      state.townStory = {
        type: "blacksmithArrival",
        phase: "intro",
        dialogIndex: 0,
        startedAt: 0,
        lineStartedAt: 0,
        opened: false
      };
      logs.push("朝、町の外れから一人の商人が歩いてきた。");
    }
    if (state.day <= state.maxDays && Game.Shop && Game.Shop.processCreditPayments) logs.push(...Game.Shop.processCreditPayments(state));
    if (state.day <= state.maxDays && Game.Raid && Game.Raid.updateOmen) Game.Raid.updateOmen(state, logs);
    if (state.day <= state.maxDays && Game.Objectives) logs.push(...Game.Objectives.initializeDay(state));
    updateDerivedStats(state);
    addLogs(state, logs);
  }

  Game.State = {
    MAX_DAYS,
    MAX_HERO_LEVEL,
    MAX_SHOP_LEVEL,
    MAX_TOWN_LEVEL,
    clamp,
    createNewGame,
    isDevelopmentTestBuild,
    normalizeState,
    updateDerivedStats,
    addLog,
    addLogs,
    gainExperience,
    checkTownLevelUp,
    checkGameEnd,
    startNextDay
  };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const WIDTH = 960;
  const HEIGHT = 540;
  const FONT = '"MS Gothic", "Yu Gothic", monospace';

  function setupCanvas(canvas) {
    if (!canvas) return null;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.aspectRatio = "16 / 9";
    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.textBaseline = "top";
    return ctx;
  }

  function clear(ctx, color) {
    ctx.fillStyle = color || "#171411";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  function rect(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function stroke(ctx, x, y, w, h, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width || 1;
    ctx.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, Math.round(w), Math.round(h));
  }

  function text(ctx, value, x, y, options) {
    const opts = options || {};
    ctx.save();
    ctx.font = `${opts.bold === false ? "400 " : "700 "}${opts.size || 15}px ${FONT}`;
    ctx.textAlign = opts.align || "left";
    const textValue = String(value);
    const px = Math.round(x);
    const py = Math.round(y);
    if (opts.shadow !== false) {
      ctx.fillStyle = opts.shadowColor || "rgba(0,0,0,0.78)";
      ctx.fillText(textValue, px + 1, py + 1);
    }
    ctx.fillStyle = opts.color || "#fff7df";
    ctx.fillText(textValue, px, py);
    ctx.restore();
  }

  function panel(ctx, x, y, w, h, options) {
    const opts = options || {};
    rect(ctx, x, y, w, h, opts.fill || "rgba(20, 18, 18, 0.9)");
    stroke(ctx, x, y, w, h, opts.border || "#f1dfb0", opts.width || 2);
    if (opts.inner !== false) stroke(ctx, x + 4, y + 4, w - 8, h - 8, opts.innerColor || "#4b4b55", 1);
  }

  function hudPill(ctx, label, value, x, y, w, color) {
    rect(ctx, x, y, w, 30, color || "rgba(45, 36, 31, 0.95)");
    stroke(ctx, x, y, w, 30, "#f1dfb0", 2);
    text(ctx, label, x + 8, y + 7, { size: 15, color: "#d9c9a4", bold: true });
    text(ctx, value, x + w - 8, y + 7, { size: 15, align: "right", color: "#fff7df", bold: true });
  }

  function hpBar(ctx, x, y, w, current, max, h) {
    const height = h || 14;
    rect(ctx, x, y, w, height, "#2b201d");
    const ratio = max > 0 ? Math.max(0, Math.min(1, current / max)) : 0;
    const fill = ratio <= 0.2 ? "#e23d35" : ratio < 0.35 ? "#c9782f" : "#48a35c";
    rect(ctx, x + 2, y + 2, Math.max(0, (w - 4) * ratio), height - 4, fill);
    stroke(ctx, x, y, w, height, "#f1dfb0", 1);
  }

  function statBar(ctx, label, x, y, w, current, max, color) {
    const ratio = max > 0 ? Math.max(0, Math.min(1, current / max)) : 0;
    text(ctx, label, x, y - 3, { size: 14, color: "#d9c9a4", bold: true });
    rect(ctx, x + 50, y, w - 50, 14, "#2b201d");
    rect(ctx, x + 52, y + 2, Math.max(0, (w - 54) * ratio), 10, color || "#48a35c");
    stroke(ctx, x + 50, y, w - 50, 14, "#f1dfb0", 1);
  }

  function wrapText(ctx, value, maxWidth, fontSize) {
    const textValue = String(value || "");
    const size = fontSize || 16;
    ctx.font = `700 ${size}px ${FONT}`;
    const output = [];
    let line = "";
    Array.from(textValue).forEach((char) => {
      const next = line + char;
      if (line && ctx.measureText(next).width > maxWidth) {
        output.push(line);
        line = char;
      } else {
        line = next;
      }
    });
    if (line) output.push(line);
    return output;
  }

  function message(ctx, lines, options) {
    const opts = options || {};
    const x = opts.x || 18;
    const w = opts.width || WIDTH - x * 2;
    const fontSize = opts.size || 16;
    const lineHeight = opts.lineHeight || 24;
    const maxLines = opts.maxLines || 4;
    const paddingTop = opts.paddingTop || 14;
    const paddingBottom = opts.paddingBottom || 18;
    const minHeight = paddingTop + paddingBottom + lineHeight * maxLines + (opts.extraMargin || 8);
    const h = Math.max(opts.height || 0, minHeight);
    let y = opts.y == null ? HEIGHT - h - 18 : opts.y;
    if (y + h > HEIGHT - 10) y = HEIGHT - h - 10;
    const safeLines = (Array.isArray(lines) ? lines : [lines]).filter(Boolean).slice(-6);
    const source = safeLines.length ? safeLines : ["\u753a\u306e\u7a7a\u6c17\u306f\u9759\u304b\u3060\u3002"];
    const wrapped = [];
    source.forEach((line, index) => {
      const prefix = index === 0 ? "\uFF0A " : "  ";
      wrapText(ctx, `${prefix}${line}`, w - 36, fontSize).forEach((row) => wrapped.push(row));
    });
    const visible = wrapped.slice(-maxLines);
    panel(ctx, x, y, w, h, {
      fill: opts.fill || "rgba(8, 9, 13, 0.90)",
      border: opts.border || "#f1dfb0",
      innerColor: opts.innerColor || "#54505a"
    });
    visible.forEach((line, index) => {
      text(ctx, line, x + 20, y + paddingTop + index * lineHeight, { size: fontSize, color: "#fff7df", bold: true });
    });
  }

  const drawMessageWindow = message;

  function tile(ctx, x, y, size, fill, border) {
    rect(ctx, x, y, size, size, fill);
    stroke(ctx, x, y, size, size, border || "rgba(30, 24, 20, 0.35)", 1);
  }

  function ellipse(ctx, x, y, rx, ry, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(Math.round(x), Math.round(y), rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawShadow(ctx, x, y, w, h, alpha) {
    const a = alpha == null ? 0.34 : alpha;
    ellipse(ctx, x + w / 2 + 2, y + h * 0.91 + 1, w * 0.42, h * 0.13, `rgba(0,0,0,${a * 0.45})`);
    ellipse(ctx, x + w / 2, y + h * 0.88, w * 0.34, h * 0.12, `rgba(0,0,0,${a})`);
  }

  function drawGlow(ctx, x, y, radius, color, alpha) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color || `rgba(255,235,150,${alpha || 0.42})`);
    gradient.addColorStop(1, "rgba(255,235,150,0)");
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    ctx.restore();
  }

  function drawAmbientVignette(ctx, x, y, w, h, alpha) {
    const a = alpha == null ? 0.34 : alpha;
    const gradient = ctx.createRadialGradient(x + w * 0.52, y + h * 0.45, Math.min(w, h) * 0.18, x + w * 0.52, y + h * 0.45, Math.max(w, h) * 0.72);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(0.66, `rgba(0,0,0,${a * 0.42})`);
    gradient.addColorStop(1, `rgba(0,0,0,${a})`);
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }

  function drawDepthBase(ctx, x, y, w, h, depth, color) {
    const d = depth || Math.max(4, Math.round(h * 0.12));
    ctx.save();
    ctx.fillStyle = color || "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.moveTo(x + 4, y + h - d);
    ctx.lineTo(x + w - 2, y + h - d);
    ctx.lineTo(x + w + d, y + h - 1);
    ctx.lineTo(x + d, y + h - 1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function diamondPath(ctx, cx, y, w, h) {
    ctx.beginPath();
    ctx.moveTo(Math.round(cx), Math.round(y));
    ctx.lineTo(Math.round(cx + w / 2), Math.round(y + h / 2));
    ctx.lineTo(Math.round(cx), Math.round(y + h));
    ctx.lineTo(Math.round(cx - w / 2), Math.round(y + h / 2));
    ctx.closePath();
  }

  function fillDiamond(ctx, cx, y, w, h, fill, strokeColor, lineWidth) {
    ctx.save();
    diamondPath(ctx, cx, y, w, h);
    ctx.fillStyle = fill;
    ctx.fill();
    if (strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth || 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawIsoTile(ctx, cx, y, w, h, options) {
    const opts = options || {};
    const fill = opts.fill || "#5a4c36";
    fillDiamond(ctx, cx, y, w, h, fill, opts.border || "rgba(24,18,14,0.54)", opts.lineWidth || 1);

    ctx.save();
    diamondPath(ctx, cx, y, w, h);
    ctx.clip();
    ctx.fillStyle = opts.light || "rgba(255,245,202,0.12)";
    ctx.beginPath();
    ctx.moveTo(cx, y + 1);
    ctx.lineTo(cx + w / 2 - 2, y + h / 2);
    ctx.lineTo(cx, y + h / 2 + 2);
    ctx.lineTo(cx - w / 2 + 2, y + h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = opts.shadow || "rgba(0,0,0,0.16)";
    ctx.beginPath();
    ctx.moveTo(cx - w / 2 + 1, y + h / 2);
    ctx.lineTo(cx, y + h - 1);
    ctx.lineTo(cx + w / 2 - 1, y + h / 2);
    ctx.lineTo(cx, y + h / 2 + 3);
    ctx.closePath();
    ctx.fill();
    if (opts.texture !== false) {
      const variant = opts.variant || 0;
      ctx.strokeStyle = "rgba(255,247,205,0.10)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (variant % 2 === 0) {
        ctx.moveTo(cx - w * 0.18, y + h * 0.40);
        ctx.lineTo(cx + w * 0.08, y + h * 0.27);
      }
      if (variant % 3 === 0) {
        ctx.moveTo(cx + w * 0.10, y + h * 0.64);
        ctx.lineTo(cx + w * 0.28, y + h * 0.53);
      }
      if (variant % 5 === 0) {
        ctx.moveTo(cx - w * 0.30, y + h * 0.55);
        ctx.lineTo(cx - w * 0.06, y + h * 0.68);
      }
      ctx.stroke();
      ctx.fillStyle = "rgba(0,0,0,0.10)";
      if (variant % 7 === 0) ctx.fillRect(Math.round(cx - 3), Math.round(y + h * 0.36), 7, 2);
      if (variant % 11 === 0) ctx.fillRect(Math.round(cx + w * 0.16), Math.round(y + h * 0.55), 5, 3);
    }
    ctx.restore();
  }

  function drawIsoTownGround(ctx, cx, y, w, h, isRoad, variant) {
    if (isRoad) {
      const fill = variant % 2 ? "#c3a068" : "#b68f54";
      drawIsoTile(ctx, cx, y, w, h, {
        fill,
        border: "rgba(60,40,22,0.62)",
        light: "rgba(255,244,190,0.18)",
        shadow: "rgba(82,51,24,0.20)",
        variant
      });
      return;
    }
    const fill = variant % 2 ? "#527842" : "#42693a";
    drawIsoTile(ctx, cx, y, w, h, {
      fill,
      border: "rgba(22,42,22,0.60)",
      light: "rgba(206,239,137,0.12)",
      shadow: "rgba(15,44,23,0.22)",
      variant
    });
  }

  function drawIsoWall(ctx, cx, y, w, h, height, variant, neighbors) {
    const wallH = height || Math.round(h * 0.9);
    const topY = y - wallH;
    const top = {
      n: [cx, topY],
      e: [cx + w / 2, topY + h / 2],
      s: [cx, topY + h],
      w: [cx - w / 2, topY + h / 2]
    };
    const base = {
      n: [cx, y],
      e: [cx + w / 2, y + h / 2],
      s: [cx, y + h],
      w: [cx - w / 2, y + h / 2]
    };
    const around = neighbors || {};

    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.34)";
    ctx.beginPath();
    ctx.moveTo(base.w[0] + 2, base.w[1] + 4);
    ctx.lineTo(base.e[0] + 7, base.e[1] + 5);
    ctx.lineTo(base.s[0] + 7, base.s[1] + 8);
    ctx.lineTo(base.s[0] - 4, base.s[1] + 6);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = variant % 2 ? "#3a3a40" : "#303238";
    ctx.beginPath();
    ctx.moveTo(top.e[0], top.e[1]);
    ctx.lineTo(base.e[0], base.e[1]);
    ctx.lineTo(base.s[0], base.s[1]);
    ctx.lineTo(top.s[0], top.s[1]);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = variant % 2 ? "#46454a" : "#3c3d43";
    ctx.beginPath();
    ctx.moveTo(top.w[0], top.w[1]);
    ctx.lineTo(top.s[0], top.s[1]);
    ctx.lineTo(base.s[0], base.s[1]);
    ctx.lineTo(base.w[0], base.w[1]);
    ctx.closePath();
    ctx.fill();

    fillDiamond(ctx, cx, topY, w, h, variant % 2 ? "#716d62" : "#625f58", "rgba(8,8,10,0.72)", 1);
    ctx.strokeStyle = "rgba(255,246,204,0.16)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(top.n[0], top.n[1] + 2);
    ctx.lineTo(top.e[0] - 2, top.e[1]);
    if (!around.left) {
      ctx.moveTo(top.w[0] + 3, top.w[1]);
      ctx.lineTo(top.s[0] - 3, top.s[1]);
    }
    ctx.stroke();
    ctx.strokeStyle = "rgba(0,0,0,0.38)";
    ctx.beginPath();
    if (!around.down) {
      ctx.moveTo(top.s[0], top.s[1]);
      ctx.lineTo(base.s[0], base.s[1]);
    }
    if (!around.right) {
      ctx.moveTo(top.e[0], top.e[1]);
      ctx.lineTo(base.e[0], base.e[1]);
    }
    ctx.stroke();
    if (variant % 3 === 0) {
      ctx.fillStyle = "rgba(255,255,225,0.09)";
      ctx.fillRect(Math.round(cx - 10), Math.round(topY + h * 0.36), 11, 3);
    }
    if (variant % 5 === 0) {
      ctx.fillStyle = "rgba(0,0,0,0.16)";
      ctx.fillRect(Math.round(cx + 5), Math.round(topY + h * 0.58), 12, 3);
    }
    ctx.restore();
  }

  function drawIsoTarget(ctx, cx, y, w, h, color) {
    ctx.save();
    diamondPath(ctx, cx, y, w, h);
    ctx.strokeStyle = color || "#ffe28a";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  function drawObliqueTileRim(ctx, x, y, size, options) {
    const opts = options || {};
    const depth = opts.depth || Math.max(5, Math.round(size * 0.16));
    ctx.save();
    ctx.fillStyle = opts.front || "rgba(0,0,0,0.18)";
    ctx.beginPath();
    ctx.moveTo(Math.round(x + 2), Math.round(y + size - depth));
    ctx.lineTo(Math.round(x + size - 2), Math.round(y + size - depth));
    ctx.lineTo(Math.round(x + size - 6), Math.round(y + size - 1));
    ctx.lineTo(Math.round(x + 6), Math.round(y + size - 1));
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = opts.light || "rgba(255,245,200,0.13)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.round(x + 3), Math.round(y + 4));
    ctx.lineTo(Math.round(x + size - 4), Math.round(y + 4));
    ctx.moveTo(Math.round(x + 4), Math.round(y + 5));
    ctx.lineTo(Math.round(x + 7), Math.round(y + size - depth));
    ctx.moveTo(Math.round(x + size - 4), Math.round(y + 5));
    ctx.lineTo(Math.round(x + size - 8), Math.round(y + size - depth));
    ctx.stroke();
    ctx.strokeStyle = opts.dark || "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.moveTo(Math.round(x + 2), Math.round(y + size - depth));
    ctx.lineTo(Math.round(x + size - 2), Math.round(y + size - depth));
    ctx.stroke();
    ctx.restore();
  }

  function drawFloorTile(ctx, x, y, size, variant, options) {
    const opts = options || {};
    const tone = pseudoNoise(variant);
    const base = opts.base || (tone > 0.58 ? "#665840" : tone > 0.3 ? "#5b4c37" : "#50432f");
    const edge = opts.edge || "#2f271f";
    tile(ctx, x, y, size, base, edge);
    drawSpriteImage(ctx, opts.sprite || "floor", x, y, size, size, "floor", "");
    drawObliqueTileRim(ctx, x, y, size, { front: "rgba(0,0,0,0.20)", light: "rgba(255,245,198,0.12)" });
    rect(ctx, x + 2, y + 2, size - 4, 2, "rgba(255,238,176,0.13)");
    rect(ctx, x + 2, y + size - 6, size - 4, 4, "rgba(0,0,0,0.22)");
    rect(ctx, x + 3, y + 3, 2, size - 6, "rgba(255,255,225,0.05)");
    rect(ctx, x + size - 5, y + 3, 3, size - 6, "rgba(0,0,0,0.10)");
    rect(ctx, x + 5, y + 5, size - 10, size - 10, "rgba(255,240,178,0.035)");
    if (variant % 3 === 0) rect(ctx, x + size * 0.16, y + size * 0.22, size * 0.30, 3, "rgba(255,238,176,0.15)");
    if (variant % 4 === 0) rect(ctx, x + size * 0.55, y + size * 0.60, size * 0.26, 4, "rgba(0,0,0,0.18)");
    if (variant % 5 === 0) rect(ctx, x + size * 0.28, y + size * 0.76, size * 0.40, 2, "rgba(33,25,18,0.20)");
    if (variant % 7 === 0) rect(ctx, x + size * 0.63, y + size * 0.20, 4, size * 0.28, "rgba(255,255,220,0.055)");
    if (variant % 11 === 0) rect(ctx, x + size * 0.18, y + size * 0.58, 5, 5, "rgba(0,0,0,0.13)");
  }

  function drawTownGround(ctx, x, y, size, isRoad, variant) {
    let ninjaSprite = isRoad ? "ninja-town-road" : "ninja-town-grass";
    if (!isRoad) {
      const pattern = Math.abs(Math.floor(variant || 0)) % 17;
      if (pattern === 0) ninjaSprite = "ninja-town-grass-a";
      if (pattern === 5) ninjaSprite = "ninja-town-grass-b";
      if (pattern === 11) ninjaSprite = "ninja-town-grass-c";
    }
    if (drawSpriteImage(ctx, ninjaSprite, x, y, size, size, "floor", "")) {
      rect(ctx, x, y, size, 2, isRoad ? "rgba(255,231,162,0.08)" : "rgba(218,246,141,0.07)");
      rect(ctx, x, y + size - 3, size, 3, isRoad ? "rgba(63,43,24,0.13)" : "rgba(34,68,28,0.11)");
      rect(ctx, x + size - 3, y + 3, 3, size - 6, "rgba(0,0,0,0.08)");
      if (!isRoad && variant % 13 === 0) rect(ctx, x + 5, y + 15, 8, 2, "rgba(103,124,39,0.20)");
      if (!isRoad && variant % 19 === 0) rect(ctx, x + 16, y + 8, 3, 5, "rgba(225,213,98,0.15)");
      if (isRoad && variant % 7 === 0) rect(ctx, x + 3, y + 6, size - 6, 2, "rgba(255,236,180,0.10)");
      return;
    }
    if (isRoad) {
      tile(ctx, x, y, size, variant % 2 ? "#9f7f4e" : "#ac8c58", "rgba(38,28,18,0.18)");
      drawSpriteImage(ctx, "town-road", x, y, size, size, "floor", "");
      rect(ctx, x + 1, y + 1, size - 2, 2, "rgba(255,235,168,0.12)");
      rect(ctx, x + 2, y + size - 6, size - 4, 5, "rgba(31,24,18,0.22)");
      rect(ctx, x + size - 5, y + 4, 4, size - 8, "rgba(30,24,18,0.16)");
      if (variant % 5 === 0) rect(ctx, x + size * 0.10, y + size * 0.70, size * 0.34, 3, "rgba(48,84,41,0.18)");
      return;
    }
    tile(ctx, x, y, size, variant % 2 ? "#496f3d" : "#456b38", "rgba(17,31,18,0.10)");
    drawSpriteImage(ctx, "town-grass", x, y, size, size, "floor", "");
    rect(ctx, x + 1, y + 1, size - 2, 2, "rgba(213,246,156,0.055)");
    rect(ctx, x + size - 5, y + 3, 4, size - 7, "rgba(10,24,13,0.12)");
    rect(ctx, x + 2, y + size - 6, size - 4, 5, "rgba(10,27,15,0.18)");
    if (variant % 9 === 0) rect(ctx, x + size * 0.18, y + size * 0.72, size * 0.32, 3, "rgba(165,143,72,0.11)");
  }

  function drawPseudo3DWall(ctx, x, y, size, variant, neighbors) {
    const around = neighbors || {};
    const cap = Math.max(11, Math.round(size * 0.34));
    const front = Math.max(14, Math.round(size * 0.42));
    rect(ctx, x + 4, y + front + 5, size - 1, size - front, "rgba(0,0,0,0.38)");
    rect(ctx, x, y + cap, size, size - cap, variant % 2 ? "#27272d" : "#22242a");
    drawSpriteImage(ctx, "wall", x, y + cap, size, size - cap, "wall", "");
    rect(ctx, x, y, size, cap + 3, variant % 2 ? "#6d695d" : "#5e5a52");
    rect(ctx, x + 2, y + 2, size - 4, 5, "rgba(255,248,205,0.22)");
    rect(ctx, x + 2, y + cap - 4, size - 4, 5, "rgba(0,0,0,0.18)");
    if (variant % 2 === 0) rect(ctx, x + 6, y + 7, 9, 5, "rgba(255,244,201,0.12)");
    if (variant % 3 === 0) rect(ctx, x + size - 16, y + 10, 8, 4, "rgba(0,0,0,0.16)");
    if (variant % 5 === 0) rect(ctx, x + 18, y + cap + 7, 13, 4, "rgba(255,255,230,0.06)");
    if (!around.down) {
      rect(ctx, x, y + size - front, size, front, "rgba(13,13,16,0.55)");
      rect(ctx, x + 3, y + size - front + 3, size - 6, 4, "rgba(255,255,230,0.06)");
      rect(ctx, x + 4, y + size - 5, size - 8, 5, "rgba(0,0,0,0.26)");
    }
    if (!around.right) rect(ctx, x + size - 7, y + cap + 4, 7, size - cap - 5, "rgba(0,0,0,0.28)");
    if (!around.left) rect(ctx, x, y + cap + 5, 5, size - cap - 6, "rgba(255,255,225,0.07)");
    if (!around.up) rect(ctx, x + 1, y, size - 2, 4, "rgba(255,255,220,0.10)");
    rect(ctx, x, y + cap + 1, size, 5, "rgba(0,0,0,0.32)");
    stroke(ctx, x, y, size, size, "rgba(7,7,9,0.72)", 1);
  }

  function pseudoNoise(value) {
    const n = Math.sin((value + 1) * 12.9898) * 43758.5453;
    return n - Math.floor(n);
  }

  function drawBuildingShadow(ctx, x, y, w, h) {
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.38)";
    ctx.beginPath();
    ctx.moveTo(x + w * 0.10, y + h * 0.70);
    ctx.lineTo(x + w * 0.96, y + h * 0.72);
    ctx.lineTo(x + w + 15, y + h + 9);
    ctx.lineTo(x + w * 0.22, y + h + 8);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawRaisedSprite(ctx, spriteName, x, y, w, h, height, fallbackType, label) {
    const lift = height || 0;
    drawShadow(ctx, x, y + lift, w, h, spriteName === "chest" ? 0.42 : 0.34);
    const ok = drawSpriteImage(ctx, spriteName, x, y - lift, w, h, fallbackType || spriteName, label);
    rect(ctx, x + w * 0.14, y + h - lift - 4, w * 0.72, 2, "rgba(255,248,208,0.14)");
    rect(ctx, x + w * 0.18, y + h - lift - 1, w * 0.64, 2, "rgba(0,0,0,0.18)");
    return ok;
  }

  function drawSpriteImage(ctx, spriteName, x, y, w, h, fallbackType, label) {
    const image = Game.Sprites && Game.Sprites.get(spriteName);
    if (image) {
      try {
        ctx.drawImage(image, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
        return true;
      } catch (error) {
        // Fall through to the CSS-free rectangle sprite.
      }
    }
    sprite(ctx, fallbackType || spriteName, x, y, Math.min(w, h), label);
    return false;
  }

  function drawSpriteSheetFrame(ctx, spriteName, frameX, frameY, frameW, frameH, x, y, w, h) {
    const image = Game.Sprites && Game.Sprites.get(spriteName);
    if (!image) return false;
    try {
      ctx.drawImage(
        image,
        frameX * frameW,
        frameY * frameH,
        frameW,
        frameH,
        Math.round(x),
        Math.round(y),
        Math.round(w),
        Math.round(h)
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  function directionRow(direction) {
    if (direction === "left") return 1;
    if (direction === "right") return 2;
    if (direction === "up") return 3;
    return 0;
  }

  function drawHeroWalkSheet(ctx, x, y, w, h, direction, motion) {
    const m = motion || {};
    const frame = Math.max(0, Math.min(15, Math.floor(m.walkFrame || 0)));
    const row = directionRow(direction);
    if (Game.Sprites && Game.Sprites.get("ninja-hero-walk")) {
      const simpleFrame = frame % 4;
      return drawSpriteSheetFrame(ctx, "ninja-hero-walk", simpleFrame, row, 16, 16, x, y, w, h);
    }
    if (Game.Sprites && Game.Sprites.get("hero-walk-sheet")) {
      const simpleFrame = frame % 4;
      return drawSpriteSheetFrame(ctx, "hero-walk-sheet", simpleFrame, row, 32, 48, x, y, w, h);
    }
    return drawSpriteSheetFrame(ctx, "hero-walk-16", frame, row, 48, 64, x, y, w, h);
  }

  function drawGenericWalkSheet(ctx, spriteName, x, y, w, h, direction, motion) {
    const sheetName = `${spriteName}-walk`;
    const image = Game.Sprites && Game.Sprites.get(sheetName);
    if (!image) return false;
    const m = motion || {};
    const row = directionRow(direction || "down");
    const frame = Math.max(0, Math.min(3, Math.floor(m.walkFrame || 0) % 4));
    const frameW = Math.floor(image.width / 4);
    const frameH = Math.floor(image.height / 4);
    if (frameW <= 0 || frameH <= 0) return false;
    try {
      ctx.drawImage(
        image,
        frame * frameW,
        row * frameH,
        frameW,
        frameH,
        Math.round(x),
        Math.round(y),
        Math.round(w),
        Math.round(h)
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  function drawOrientedSprite(ctx, spriteName, x, y, w, h, direction, fallbackType, label) {
    ctx.save();
    const flip = direction === "left";
    if (flip) {
      ctx.translate(Math.round(x + w), Math.round(y));
      ctx.scale(-1, 1);
      drawSpriteImage(ctx, spriteName, 0, 0, w, h, fallbackType, label);
    } else {
      drawSpriteImage(ctx, spriteName, x, y, w, h, fallbackType, label);
    }
    if (direction === "up") {
      ctx.globalCompositeOperation = "multiply";
      rect(ctx, flip ? 0 : x, flip ? 0 : y, w, h, "rgba(70,78,92,0.22)");
      ctx.globalCompositeOperation = "source-over";
      rect(ctx, flip ? w * 0.22 : x + w * 0.22, flip ? h * 0.16 : y + h * 0.16, w * 0.56, 3, "rgba(245,238,205,0.12)");
    }
    ctx.restore();
  }

  function drawWalkingSprite(ctx, spriteName, x, y, w, h, direction, motion, fallbackType, label) {
    const m = motion || {};
    const moving = Boolean(m.moving);
    if (spriteName === "hero" && drawHeroWalkSheet(ctx, x, y, w, h, direction || "down", m)) return;
    if (spriteName !== "hero" && drawGenericWalkSheet(ctx, spriteName, x, y, w, h, direction || "down", m)) return;
    const baseStep = typeof m.step === "number" ? m.step : Math.sin(Date.now() / (moving ? 120 : 560));
    const step = moving ? baseStep : baseStep * 0.22;
    const bob = typeof m.bobPx === "number" ? m.bobPx : Math.abs(step) * 0.18;
    const sway = typeof m.swayPx === "number" ? m.swayPx : step * 0.18;
    const lean = moving ? step * 0.38 : step * 0.12;
    const px = x + sway + lean;
    const py = y - bob;
    drawOrientedSprite(ctx, spriteName, px, py, w, h, direction, fallbackType, label);
    drawFootSteps(ctx, x, y, w, h, step, direction, moving);
  }

  function drawFootSteps(ctx, x, y, w, h, step, direction, moving) {
    if (w < 18 || h < 18) return;
    const footY = y + h - 4;
    const stride = moving ? 2.4 : 0.8;
    const leftPhase = step >= 0 ? 1 : -1;
    const rightPhase = -leftPhase;
    const side = direction === "left" ? -1 : 1;
    const alpha = moving ? 0.62 : 0.36;
    ctx.save();
    ctx.globalAlpha = alpha;
    rect(ctx, x + w * 0.30 + leftPhase * stride * side, footY - (leftPhase > 0 ? 1 : 0), Math.max(3, w * 0.15), 3, "rgba(25,20,16,0.78)");
    rect(ctx, x + w * 0.55 + rightPhase * stride * side, footY - (rightPhase > 0 ? 1 : 0), Math.max(3, w * 0.15), 3, "rgba(25,20,16,0.78)");
    ctx.restore();
  }

  function sprite(ctx, type, x, y, size, label) {
    const s = Math.round(size);
    const ix = Math.round(x);
    const iy = Math.round(y);
    const spriteName = normalizeSpriteName(type);
    const image = Game.Sprites && Game.Sprites.get(spriteName);
    if (image) {
      try {
        ctx.drawImage(image, ix, iy, s, s);
        return;
      } catch (error) {
        // Keep drawing with the fallback below.
      }
    }
    const colors = {
      hero: ["#2d5f9f", "#f1c27d", "#15365f"],
      villager: ["#3f8a4b", "#f0c58a", "#23542e"],
      guard: ["#486f78", "#f0c58a", "#253d45"],
      traveler: ["#7c5a9d", "#f0c58a", "#49335c"],
      enemy: ["#a33b32", "#f0d267", "#5c1f1b"],
      item: ["#c9932c", "#fff0a8", "#76511d"],
      chest: ["#7b4b24", "#f0c35a", "#3f2818"],
      stairs: ["#d8d4c8", "#ffffff", "#6f6a5c"],
      shop: ["#7a4f2a", "#c9932c", "#4b2d18"],
      hospital: ["#f4f1e6", "#d85d5d", "#8a8a83"],
      blacksmith: ["#6f6460", "#d2643f", "#3f3b3b"],
      warehouse: ["#5d3c23", "#aa7440", "#302018"],
      hall: ["#315d43", "#d4b65a", "#183323"],
      gate: ["#42596f", "#b8c7d8", "#253645"],
      house: ["#8a673d", "#d8b26a", "#4d3420"],
      square: ["#4f8c5a", "#e8d27a", "#244c2d"],
      watchtower: ["#5d5631", "#dac875", "#38341e"]
    };
    const c = colors[fallbackSpriteType(type)] || colors.item;
    rect(ctx, ix + 3, iy + 5, s - 6, s - 7, c[0]);
    rect(ctx, ix + 6, iy + 2, s - 12, Math.max(4, Math.round(s * 0.22)), c[1]);
    rect(ctx, ix + 5, iy + s - 7, s - 10, 4, c[2]);
    stroke(ctx, ix + 3, iy + 5, s - 6, s - 7, "rgba(0,0,0,0.45)", 1);
    if (label && s >= 18) text(ctx, label.slice(0, 1), ix + s / 2, iy + s / 2 - 4, { size: 10, align: "center", color: "#fff7df", bold: true });
  }

  function normalizeSpriteName(type) {
    const aliases = {
      blacksmith: "building-blacksmith",
      gate: "building-dungeon_gate",
      guard: "villager-guard",
      hall: "building-hall",
      hospital: "building-hall",
      house: "building-houses",
      item: "loot",
      shop: "building-shop",
      square: "building-square",
      traveler: "villager-traveler",
      warehouse: "building-warehouse",
      watchtower: "building-watchtower"
    };
    return aliases[type] || type;
  }

  function fallbackSpriteType(type) {
    if (type === "building-shop") return "shop";
    if (type === "building-blacksmith") return "blacksmith";
    if (type === "building-warehouse") return "warehouse";
    if (type === "building-hall") return "hall";
    if (type === "building-dungeon_gate") return "gate";
    if (type === "building-houses" || type === "building-tavern" || type === "building-guild") return "house";
    if (type === "building-square") return "square";
    if (type === "building-watchtower") return "watchtower";
    if (type === "villager-guard") return "guard";
    if (type === "villager-traveler") return "traveler";
    if (type === "villager-green" || type === "villager-smith") return "villager";
    if (type && type.startsWith("enemy-")) return "enemy";
    if (["weapon", "armor", "bag", "potion", "food", "material", "jewel", "loot"].includes(type)) return "item";
    return type;
  }

  function miniMap(ctx, x, y, w, h, mapWidth, mapHeight, drawCell) {
    panel(ctx, x, y, w, h, { fill: "rgba(18, 18, 21, 0.88)", width: 2, inner: false });
    const cellW = Math.max(3, Math.floor((w - 12) / mapWidth));
    const cellH = Math.max(3, Math.floor((h - 12) / mapHeight));
    const ox = x + 6;
    const oy = y + 6;
    for (let yy = 0; yy < mapHeight; yy += 1) {
      for (let xx = 0; xx < mapWidth; xx += 1) {
        rect(ctx, ox + xx * cellW, oy + yy * cellH, cellW - 1, cellH - 1, drawCell(xx, yy));
      }
    }
  }

  function sortEntitiesByDepth(entities) {
    return entities.slice().sort((a, b) => {
      const ay = a.depthY == null ? a.y || 0 : a.depthY;
      const by = b.depthY == null ? b.y || 0 : b.depthY;
      if (ay !== by) return ay - by;
      return (a.depthX == null ? a.x || 0 : a.depthX) - (b.depthX == null ? b.x || 0 : b.depthX);
    });
  }

  Game.Renderer = {
    WIDTH,
    HEIGHT,
    setupCanvas,
    clear,
    rect,
    stroke,
    text,
    panel,
    hudPill,
    hpBar,
    statBar,
    wrapText,
    message,
    drawMessageWindow,
    tile,
    ellipse,
    drawShadow,
    drawGlow,
    drawAmbientVignette,
    drawDepthBase,
    drawIsoTile,
    drawIsoTownGround,
    drawIsoWall,
    drawIsoTarget,
    drawFloorTile,
    drawTownGround,
    drawPseudo3DWall,
    drawBuildingShadow,
    drawRaisedSprite,
    drawSpriteImage,
    drawSpriteSheetFrame,
    drawOrientedSprite,
    drawWalkingSprite,
    sprite,
    miniMap,
    sortEntitiesByDepth
  };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const BASE_PATH = "assets/sprites/";
  const SPRITES = {
    armor: "armor.png",
    bag: "bag.png",
    chest: "chest.png",
    "empty-shelf": "empty-shelf.png",
    "enemy-bandit": "enemy-bandit-v2.png",
    "enemy-bandit-walk": "enemy-bandit-walk-v1.png",
    "enemy-bat": "enemy-bat-v2.png",
    "enemy-bat-walk": "enemy-bat-walk-v1.png",
    "enemy-bug": "enemy-bug-v2.png",
    "enemy-bug-walk": "enemy-bug-walk-v1.png",
    "enemy-goblet": "enemy-goblet-v2.png",
    "enemy-goblet-walk": "enemy-goblet-walk-v1.png",
    "enemy-keeper": "enemy-keeper-v2.png",
    "enemy-keeper-walk": "enemy-keeper-walk-v1.png",
    "enemy-lizard": "enemy-lizard-v2.png",
    "enemy-lizard-walk": "enemy-lizard-walk-v1.png",
    "enemy-rat": "enemy-rat-v2.png",
    "enemy-rat-walk": "enemy-rat-walk-v1.png",
    "enemy-statue": "enemy-statue-v2.png",
    "enemy-statue-walk": "enemy-statue-walk-v1.png",
    floor: "floor.png",
    food: "food.png",
    hero: "hero.png",
    "hero-walk-16": "hero-walk-16-sheet-v3.png",
    "hero-walk-sheet": "hero-walk-sheet.png",
    "ninja-hero-walk": "ninja-merchant-hero-walk.png",
    jewel: "jewel.png",
    loot: "potion.png",
    material: "material.png",
    potion: "potion.png",
    road: "road.png",
    stairs: "stairs.png",
    "town-grass": "town-grass-tile.png",
    "ninja-town-grass": "ninja-town-grass.png",
    "ninja-town-grass-a": "ninja-town-grass-a.png",
    "ninja-town-grass-b": "ninja-town-grass-b.png",
    "ninja-town-grass-c": "ninja-town-grass-c.png",
    "town-road": "town-road-tile.png",
    "ninja-town-road": "ninja-town-road.png",
    "town-wall": "town-wall-tile.png",
    "animal-cat": "ninja-animal-cat.png",
    "animal-dog": "ninja-animal-dog.png",
    "animal-chicken": "ninja-animal-chicken.png",
    "ninja-resource-grass": "ninja-resource-grass.png",
    "ninja-resource-rock": "ninja-resource-rock.png",
    "ninja-plant-animated": "ninja-plant-animated.png",
    "ninja-town-brighttree": "ninja-town-brighttree.png",
    "ninja-town-tree": "ninja-town-tree.png",
    "ninja-town-bush": "ninja-town-bush.png",
    "ninja-town-crate": "ninja-town-crate.png",
    "ninja-town-flower-blue": "ninja-town-flower-blue.png",
    "ninja-town-flower-white": "ninja-town-flower-white.png",
    "ninja-town-flower-yellow": "ninja-town-flower-yellow.png",
    "ninja-town-log": "ninja-town-log.png",
    "ninja-town-pine": "ninja-town-pine.png",
    "ninja-town-pinktree": "ninja-town-pinktree.png",
    "ninja-town-rock-a": "ninja-town-rock-a.png",
    "ninja-town-rock-b": "ninja-town-rock-b.png",
    "ninja-town-rock-g": "ninja-town-rock-g.png",
    "ninja-town-rock-h": "ninja-town-rock-h.png",
    "ninja-town-roundtree": "ninja-town-roundtree.png",
    "ninja-shop-floor": "ninja-shop-floor.png",
    "ninja-shop-wall": "ninja-shop-wall.png",
    "ninja-shop-door": "ninja-shop-door.png",
    "ninja-shop-counter": "ninja-shop-counter.png",
    villager: "villager-v2.png",
    "villager-walk": "ninja-villager-walk.png",
    "villager-green": "villager-v2.png",
    "villager-green-walk": "ninja-villager-walk.png",
    "villager-guard": "villager-guard-v2.png",
    "villager-guard-walk": "ninja-villager-guard-walk.png",
    "villager-smith": "villager-blacksmith-v2.png",
    "villager-smith-walk": "ninja-villager-smith-walk.png",
    "villager-traveler": "villager-traveler-v2.png",
    "villager-traveler-walk": "ninja-villager-traveler-walk.png",
    wall: "wall.png",
    weapon: "weapon.png"
  };

  const cache = {};
  const readyCallbacks = [];
  let started = false;
  let pending = Object.keys(SPRITES).length;
  let ready = false;

  function loadAll() {
    if (started) return;
    started = true;
    Object.entries(SPRITES).forEach(([name, file]) => {
      try {
        const image = new Image();
        cache[name] = { image, loaded: false, failed: false };
        image.onload = () => { cache[name].loaded = true; settle(); };
        image.onerror = () => { cache[name].failed = true; settle(); };
        image.src = `${BASE_PATH}${file}`;
      } catch (error) {
        cache[name] = { image: null, loaded: false, failed: true };
        settle();
      }
    });
  }

  function settle() {
    pending -= 1;
    if (pending > 0 || ready) return;
    ready = true;
    while (readyCallbacks.length) {
      const callback = readyCallbacks.shift();
      try { callback(); } catch (error) { /* Visual refresh only. */ }
    }
  }

  function get(name) {
    loadAll();
    const entry = cache[name];
    if (!entry || entry.failed || !entry.loaded) return null;
    return entry.image;
  }

  function onReady(callback) {
    loadAll();
    if (ready) {
      try { callback(); } catch (error) { /* Visual refresh only. */ }
      return;
    }
    readyCallbacks.push(callback);
  }

  Game.Sprites = { loadAll, get, onReady, SPRITES };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const state = {
    heroMove: null,
    entityMoves: {},
    heroRestFrame: 0,
    heroStepSide: 0,
    entityWalkPhases: {},
    attackEffect: null,
    hitEffects: [],
    ambientUntil: 0,
    ticking: false,
    drawFrame: null
  };
  const HERO_MOVE_DURATION = 74;
  const ENTITY_MOVE_DURATION = 128;

  function now() {
    return (window.performance && performance.now) ? performance.now() : Date.now();
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function directionFromDelta(dx, dy) {
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? "right" : "left";
    if (dy !== 0) return dy > 0 ? "down" : "up";
    return "down";
  }

  function startHeroMove(scene, from, to, direction, duration) {
    if (!from || !to || (from.x === to.x && from.y === to.y)) return;
    const moveDirection = direction || directionFromDelta(to.x - from.x, to.y - from.y);
    const frames = buildStepFrames(state.heroRestFrame || 0, state.heroStepSide || 0, moveDirection);
    state.heroMove = {
      active: true,
      scene,
      fromX: from.x,
      fromY: from.y,
      toX: to.x,
      toY: to.y,
      direction: moveDirection,
      startTime: now(),
      duration: duration || HERO_MOVE_DURATION,
      frames,
      endFrame: frames[frames.length - 1],
      nextStepSide: state.heroStepSide ? 0 : 1
    };
  }

  function heroTile(scene, currentX, currentY) {
    const move = state.heroMove;
    if (!move || !move.active || move.scene !== scene) {
      return { x: currentX, y: currentY, bob: 0, bobPx: 0, swayPx: 0, step: 0, moving: false, walkFrame: state.heroRestFrame || 0 };
    }
    const current = now();
    const elapsed = current - move.startTime;
    const raw = Math.max(0, Math.min(1, elapsed / move.duration));
    if (raw >= 1) {
      finishHeroMove(move);
      return { x: currentX, y: currentY, bob: 0, bobPx: 0, swayPx: 0, step: 0, moving: false, walkFrame: state.heroRestFrame || 0 };
    }
    const t = easeInOutQuad(raw);
    const step = Math.sin(raw * Math.PI * 2);
    const bobPx = 0;
    const swayPx = Math.sin(raw * Math.PI * 2) * (move.scene === "town" ? 0.04 : 0.025);
    return {
      x: move.fromX + (move.toX - move.fromX) * t,
      y: move.fromY + (move.toY - move.fromY) * t,
      bob: bobPx / 40,
      bobPx,
      swayPx,
      step,
      walkFrame: walkFrameFromProgress(raw, move.frames),
      moving: true,
      direction: move.direction
    };
  }

  function entityTile(scene, key, currentX, currentY, direction, duration) {
    const id = `${scene}:${key}`;
    const current = now();
    let move = state.entityMoves[id];
    if (!move) {
      move = state.entityMoves[id] = {
        scene,
        key,
        lastX: currentX,
        lastY: currentY,
        targetX: currentX,
        targetY: currentY,
        direction: direction || "down",
        active: false,
        startTime: current,
        duration: duration || ENTITY_MOVE_DURATION,
        startFrame: state.entityWalkPhases[id] || 0,
        endFrame: nextRestFrame(state.entityWalkPhases[id] || 0)
      };
    }

    if (move.targetX !== currentX || move.targetY !== currentY) {
      const visual = entityVisual(move, current);
      move.fromX = visual.x;
      move.fromY = visual.y;
      move.targetX = currentX;
      move.targetY = currentY;
      move.direction = direction || directionFromDelta(currentX - move.lastX, currentY - move.lastY);
      move.startTime = current;
      move.duration = duration || ENTITY_MOVE_DURATION;
      move.startFrame = state.entityWalkPhases[id] || 0;
      move.endFrame = nextRestFrame(move.startFrame);
      move.active = true;
      move.lastX = currentX;
      move.lastY = currentY;
    }

    return entityVisual(move, current);
  }

  function entityVisual(move, current) {
    if (!move.active) {
      const phaseKey = `${move.scene}:${move.key}`;
      return {
        x: move.targetX,
        y: move.targetY,
        bobPx: 0,
        swayPx: 0,
        step: Math.sin(current / 480 + stablePhase(move.key)) * 0.28,
        walkFrame: state.entityWalkPhases[phaseKey] || 0,
        moving: false,
        direction: move.direction
      };
    }
    const raw = Math.max(0, Math.min(1, (current - move.startTime) / move.duration));
    if (raw >= 1) {
      move.active = false;
      state.entityWalkPhases[`${move.scene}:${move.key}`] = move.endFrame || 0;
      return {
        x: move.targetX,
        y: move.targetY,
        bobPx: 0,
        swayPx: 0,
        step: 0,
        walkFrame: move.endFrame || 0,
        moving: false,
        direction: move.direction
      };
    }
    const t = easeInOutQuad(raw);
    const groundedTownWalk = move.scene === "town";
    const step = Math.sin(raw * Math.PI * 2);
    return {
      x: move.fromX + (move.targetX - move.fromX) * t,
      y: move.fromY + (move.targetY - move.fromY) * t,
      bobPx: 0,
      swayPx: Math.sin(raw * Math.PI * 2) * (groundedTownWalk ? 0.04 : 0.025),
      step,
      walkFrame: walkFrameFromProgress(raw, move.startFrame),
      moving: true,
      direction: move.direction
    };
  }

  function stablePhase(value) {
    const text = String(value || "");
    let seed = 0;
    for (let i = 0; i < text.length; i += 1) seed += text.charCodeAt(i) * (i + 1);
    return seed % 19;
  }

  function buildStepFrames(restFrame, stepSide, direction) {
    const start = Number.isFinite(restFrame) ? restFrame % 4 : 0;
    if (stepSide) return [start, 3, 2, 3];
    return [start, 1, 2, 1];
  }

  function nextRestFrame(frame) {
    const current = Number.isFinite(frame) ? frame % 4 : 0;
    return current === 1 ? 3 : 1;
  }

  function finishHeroMove(move) {
    if (!move) return;
    move.active = false;
    state.heroRestFrame = move.endFrame || 0;
    state.heroStepSide = move.nextStepSide || 0;
  }

  function walkFrameFromProgress(progress, framesOrStartFrame) {
    if (Array.isArray(framesOrStartFrame) && framesOrStartFrame.length) {
      const index = Math.max(0, Math.min(framesOrStartFrame.length - 1, Math.floor(progress * framesOrStartFrame.length)));
      return framesOrStartFrame[index];
    }
    const framesPerTile = 4;
    const localFrame = Math.max(0, Math.min(framesPerTile - 1, Math.floor(progress * framesPerTile)));
    return ((framesOrStartFrame || 0) + localFrame) % 4;
  }

  function isHeroMoving(scene) {
    const move = state.heroMove;
    if (!move || !move.active || move.scene !== scene) return false;
    if (now() - move.startTime >= move.duration) {
      finishHeroMove(move);
      return false;
    }
    return true;
  }

  function startAttack(scene, origin, target, direction, damage, hit, kind) {
    if (!origin || !target) return;
    const startTime = now();
    state.attackEffect = {
      active: true,
      scene,
      originX: origin.x,
      originY: origin.y,
      x: target.x,
      y: target.y,
      direction: direction || directionFromDelta(target.x - origin.x, target.y - origin.y),
      startTime,
      duration: kind === "fire" ? 230 : 240,
      hit: hit !== false,
      kind: kind || "slash"
    };
    if (damage) {
      state.hitEffects.push({
        scene,
        x: target.x,
        y: target.y,
        damage,
        startTime,
        duration: 260
      });
    }
  }

  function addHitEffect(scene, x, y, damage, duration, kind) {
    if (!damage) return;
    state.hitEffects.push({
      scene,
      x,
      y,
      damage,
      startTime: now(),
      duration: duration || 300,
      kind: kind || "hit"
    });
  }

  function getAttackEffect(scene) {
    const effect = state.attackEffect;
    if (!effect || !effect.active || effect.scene !== scene) return null;
    const elapsed = now() - effect.startTime;
    const progress = Math.max(0, Math.min(1, elapsed / effect.duration));
    if (progress >= 1) {
      effect.active = false;
      return null;
    }
    return Object.assign({ progress }, effect);
  }

  function getHitEffects(scene) {
    const current = now();
    state.hitEffects = state.hitEffects.filter((effect) => current - effect.startTime < effect.duration);
    return state.hitEffects
      .filter((effect) => effect.scene === scene)
      .map((effect) => Object.assign({
        progress: Math.max(0, Math.min(1, (current - effect.startTime) / effect.duration))
      }, effect));
  }

  function hasActive() {
    const current = now();
    if (state.ambientUntil && current < state.ambientUntil) return true;
    if (state.heroMove && state.heroMove.active && current - state.heroMove.startTime < state.heroMove.duration) return true;
    if (Object.values(state.entityMoves).some((move) => move.active && current - move.startTime < move.duration)) return true;
    if (state.attackEffect && state.attackEffect.active && current - state.attackEffect.startTime < state.attackEffect.duration) return true;
    return state.hitEffects.some((effect) => current - effect.startTime < effect.duration);
  }

  function keepAmbient(duration) {
    state.ambientUntil = Math.max(state.ambientUntil || 0, now() + (duration || 240));
  }

  function run(drawFrame) {
    state.drawFrame = drawFrame;
    if (state.ticking) return;
    state.ticking = true;
    requestAnimationFrame(tick);
  }

  function tick() {
    if (typeof state.drawFrame === "function") state.drawFrame();
    if (hasActive()) {
      requestAnimationFrame(tick);
      return;
    }
    state.ticking = false;
  }

  Game.Animations = {
    startHeroMove,
    heroTile,
    entityTile,
    isHeroMoving,
    startAttack,
    addHitEffect,
    getAttackEffect,
    getHitEffects,
    hasActive,
    keepAmbient,
    run,
    directionFromDelta
  };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const DIRECTIONS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  function key(x, y) {
    return `${x},${y}`;
  }

  function directionFromDelta(dx, dy) {
    if (dy < 0) return "up";
    if (dy > 0) return "down";
    if (dx < 0) return "left";
    if (dx > 0) return "right";
    return null;
  }

  function frontOf(position, facing) {
    const dir = DIRECTIONS[facing] || DIRECTIONS.down;
    return { x: position.x + dir.x, y: position.y + dir.y };
  }

  function inside(width, height, x, y) {
    return x >= 0 && y >= 0 && x < width && y < height;
  }

  Game.Tilemap = { DIRECTIONS, key, directionFromDelta, frontOf, inside };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  function buildingSpriteType(building) {
    if (!building) return "building-houses";
    if (building.id === "shop") return "building-shop";
    if (building.id === "hospital") return "building-hall";
    if (building.id === "blacksmith" || building.id === "weapon_shop") return "building-blacksmith";
    if (building.id === "warehouse") return "building-warehouse";
    if (building.id === "hall") return "building-hall";
    if (building.id === "dungeon_gate") return "building-dungeon_gate";
    if (building.id === "square") return "building-square";
    if (building.id === "watchtower") return "building-watchtower";
    if (building.id === "tavern") return "building-tavern";
    if (building.id === "guild") return "building-guild";
    return "building-houses";
  }

  function villagerSpriteType(villager) {
    if (!villager) return "villager";
    if (villager.css === "villager-guard") return "villager-guard";
    if (villager.css === "villager-traveler") return "villager-traveler";
    if (villager.css === "villager-smith") return "villager-smith";
    return villager.css || "villager";
  }

  function itemSpriteType(item, pickupType) {
    if (pickupType === "chest") return "chest";
    if (!item) return "loot";
    if (item.kind === "material") return "material";
    if (item.kind === "equipment") {
      if (item.slot === "weapon") return "weapon";
      if (item.slot === "bag") return "bag";
      if (item.slot === "accessory") return "jewel";
      return "armor";
    }
    if (Game.Items && Game.Items.isHealingItem && Game.Items.isHealingItem(item)) return "potion";
    if (item.category === "\u98df\u6599") return "food";
    if (item.category === "\u88c5\u98fe\u54c1") return "jewel";
    if (item.category === "\u6b66\u5177") return "weapon";
    return "loot";
  }

  function enemySpriteType(enemy) {
    return enemy && enemy.css ? enemy.css : "enemy-goblet";
  }

  Game.Entity = { buildingSpriteType, villagerSpriteType, itemSpriteType, enemySpriteType };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  function calculateDamage(attack, defense) {
    return Math.max(1, attack - defense + Game.Items.randomInt(-1, 3));
  }

  function heroAttackPower(state) {
    const base = state.hero.baseAttack + Game.Items.getTotalEquipmentAttack(state);
    const percent = Game.Weapons ? Game.Weapons.effectBonus(state, "attackPercent") : 0;
    return Math.max(1, Math.round(base * (1 + percent / 100)));
  }

  function heroDefensePower(state) {
    const base = state.hero.baseDefense + Game.Items.getTotalEquipmentDefense(state);
    const percent = Game.Weapons ? Game.Weapons.effectBonus(state, "defensePercent") : 0;
    return Math.max(0, Math.round(base * (1 + percent / 100)));
  }

  function attackEnemy(state, enemy) {
    let damage = calculateDamage(heroAttackPower(state), enemy.defense);
    const critical = Game.Weapons && Game.Items.chance(Game.Weapons.effectBonus(state, "critRate"));
    if (critical) damage = Math.max(2, Math.round(damage * 1.7));
    enemy.hp -= damage;
    const logs = [critical ? `会心の一撃！ ${enemy.name}\u306b${damage}\u30c0\u30e1\u30fc\u30b8\u3002` : `${enemy.name}\u306b${damage}\u30c0\u30e1\u30fc\u30b8\u3002`];

    if (enemy.hp <= 0) {
      logs.push(`${enemy.name}\u3092\u5012\u3057\u305f\u3002`);
      logs.push(...Game.State.gainExperience(state, enemy.exp));
      if (Game.Weapons) Game.Weapons.addMastery(state, enemy.actionType === "boss" ? 12 : 3, logs, enemy.actionType === "boss" ? "boss" : "kill");
      if (enemy.goldDrop && Game.Items.chance(enemy.goldDrop.chance)) {
        const gold = Game.Items.randomInt(enemy.goldDrop.min, enemy.goldDrop.max);
        state.hero.gold += gold;
        logs.push(`${gold}G\u3092\u62fe\u3063\u305f\u3002`);
      }
    }
    return logs;
  }

  function enemyAttackHero(state, enemy) {
    const damage = calculateDamage(enemy.attack, heroDefensePower(state));
    state.hero.hp -= damage;
    const logs = [`${enemy.name}\u306e\u653b\u6483\u3002${damage}\u30c0\u30e1\u30fc\u30b8\u3092\u53d7\u3051\u305f\u3002`];

    if (enemy.actionType === "steal" && state.hero.inventory.length > 0 && Game.Items.chance(22)) {
      const index = Game.Items.randomInt(0, state.hero.inventory.length - 1);
      const stolen = state.hero.inventory.splice(index, 1)[0];
      logs.push(`${enemy.name}\u306b${Game.Items.itemLabel(stolen)}\u3092\u76d7\u307e\u308c\u305f\u3002`);
    }

    if (state.hero.hp <= 0) {
      state.hero.hp = 0;
      logs.push("HP\u304c\u5c3d\u304d\u305f\u3002\u753a\u3078\u5f37\u5236\u5e30\u9084\u3059\u308b\u3002");
    }
    return logs;
  }

  Game.Combat = { calculateDamage, heroAttackPower, heroDefensePower, attackEnemy, enemyAttackHero };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const BASE_WIDTH = 34;
  const BASE_HEIGHT = 14;
  const SECTION_MARGIN = 2;
  const SECTION_GAP = 4;
  const SECTION_COLUMNS = 2;
  const MAP_SECTION_SIZES = [
    { w: 12, h: 9 },
    { w: 14, h: 10 },
    { w: 13, h: 10 },
    { w: 11, h: 9 },
    { w: 14, h: 9 },
    { w: 12, h: 10 },
    { w: 15, h: 9 },
    { w: 13, h: 11 }
  ];
  const DUNGEON_TIERS = [
    { id: "stock_maze", name: "仕入れの迷宮", maxFloor: 5, difficultyBonus: 0, lootBonus: 0, enemyBonus: 0 },
    { id: "deep_market_cave", name: "深商いの洞", maxFloor: 10, difficultyBonus: 4, lootBonus: 3, enemyBonus: 1 },
    { id: "ancient_bazaar_depths", name: "古市の深層", maxFloor: 20, difficultyBonus: 10, lootBonus: 8, enemyBonus: 2 }
  ];

  const ENEMY_TABLE = [
    { id: "goblet", name: "\u5c0f\u9b3c", symbol: "\u5c0f", css: "enemy-goblet", minFloor: 1, hp: 13, attack: 5, defense: 1, exp: 7, actionType: "chase", sight: 5, goldDrop: { chance: 15, min: 10, max: 28 } },
    { id: "maze_rat", name: "\u8ff7\u5bae\u30cd\u30ba\u30df", symbol: "\u9f20", css: "enemy-rat", minFloor: 1, hp: 9, attack: 4, defense: 0, exp: 6, actionType: "steal", sight: 4, goldDrop: { chance: 8, min: 5, max: 18 } },
    { id: "rookie_bandit", name: "\u76d7\u8cca\u898b\u7fd2\u3044", symbol: "\u76d7", css: "enemy-bandit", minFloor: 2, hp: 16, attack: 7, defense: 2, exp: 11, actionType: "steal", sight: 5, goldDrop: { chance: 35, min: 20, max: 55 } },
    { id: "stone_lizard", name: "\u706b\u5439\u304d\u30c8\u30ab\u30b2", symbol: "\u706b", css: "enemy-lizard", minFloor: 3, hp: 22, attack: 7, defense: 5, exp: 14, actionType: "fire", sight: 4, goldDrop: { chance: 12, min: 15, max: 40 } },
    { id: "shadow_bat", name: "\u5f71\u30b3\u30a6\u30e2\u30ea", symbol: "\u5f71", css: "enemy-bat", minFloor: 4, hp: 18, attack: 10, defense: 2, exp: 16, actionType: "chase", sight: 6, goldDrop: { chance: 18, min: 18, max: 48 } },
    { id: "iron_bug", name: "\u9244\u6bbb\u866b", symbol: "\u866b", css: "enemy-bug", minFloor: 6, hp: 32, attack: 10, defense: 7, exp: 21, actionType: "guard", sight: 3, goldDrop: { chance: 18, min: 22, max: 58 } },
    { id: "old_stone_guard", name: "\u53e4\u77f3\u5175", symbol: "\u77f3", css: "enemy-statue", minFloor: 8, hp: 38, attack: 13, defense: 6, exp: 25, actionType: "guard", sight: 4, goldDrop: { chance: 22, min: 35, max: 76 } },
    { id: "keeper", name: "\u8ff7\u5bae\u306e\u756a\u4eba", symbol: "\u5b88", css: "enemy-keeper", minFloor: 10, hp: 60, attack: 16, defense: 8, exp: 44, actionType: "boss", sight: 7, goldDrop: { chance: 100, min: 150, max: 260 } }
  ];

  DUNGEON_TIERS[0].name = "仕入れの迷宮";
  DUNGEON_TIERS[1].name = "深商いの洞窟";
  DUNGEON_TIERS[2].name = "古市の深層";

  function startRun(state) {
    state.phase = "\u663c";
    state.today.dungeonDone = true;
    state.hero.inventory = [];
    Game.State.updateDerivedStats(state);
    const tier = currentTier(state);

    const run = {
      active: true,
      floor: 1,
      dungeonTier: tier.index,
      dungeonId: tier.id,
      name: tier.name,
      maxFloor: tier.maxFloor,
      difficultyBonus: tier.difficultyBonus,
      lootBonus: tier.lootBonus,
      enemyBonus: tier.enemyBonus,
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
      player: { x: 2, y: 2 },
      tiles: [],
      enemies: [],
      pickups: [],
      discovered: {},
      messages: [`${tier.name}に入った。最深部は${tier.maxFloor}階だ。`],
      facing: "down",
      mutation: state.flags.nextDungeonMutation
    };
    run.messages = [`${tier.name}に入った。最深部は${tier.maxFloor}階だ。`];
    state.flags.nextDungeonMutation = false;
    generateFloor(state, run, 1);
    return run;
  }

  function floorPlanFor(run, floor) {
    const firstTierFloor = Math.max(1, Math.min(5, floor || 1));
    const tierBonus = Math.max(0, run.dungeonTier || 0);
    const sectionCount = Math.max(2, firstTierFloor + 1 + tierBonus);
    const sectionSizes = [];
    for (let i = 0; i < sectionCount; i += 1) {
      const base = MAP_SECTION_SIZES[i % MAP_SECTION_SIZES.length];
      const loopGrow = Math.floor(i / MAP_SECTION_SIZES.length);
      sectionSizes.push({
        w: base.w + tierBonus * 2 + loopGrow * 2,
        h: base.h + tierBonus + loopGrow
      });
    }
    return layoutSections(sectionSizes);
  }

  function layoutSections(sectionSizes) {
    const placements = sectionSizes.map((section, index) => {
      const row = Math.floor(index / SECTION_COLUMNS);
      const indexInRow = index % SECTION_COLUMNS;
      const col = row % 2 === 0 ? indexInRow : SECTION_COLUMNS - 1 - indexInRow;
      return Object.assign({ index, row, col }, section);
    });
    const colWidths = new Array(SECTION_COLUMNS).fill(0);
    const rowHeights = [];
    placements.forEach((placement) => {
      colWidths[placement.col] = Math.max(colWidths[placement.col], placement.w);
      rowHeights[placement.row] = Math.max(rowHeights[placement.row] || 0, placement.h);
    });

    const xOffsets = [];
    let x = SECTION_MARGIN;
    for (let col = 0; col < SECTION_COLUMNS; col += 1) {
      xOffsets[col] = x;
      x += colWidths[col] + SECTION_GAP;
    }
    const yOffsets = [];
    let y = SECTION_MARGIN;
    for (let row = 0; row < rowHeights.length; row += 1) {
      yOffsets[row] = y;
      y += rowHeights[row] + SECTION_GAP;
    }

    const sections = placements
      .sort((a, b) => a.index - b.index)
      .map((placement) => {
        const section = {
          x: xOffsets[placement.col],
          y: yOffsets[placement.row],
          w: placement.w,
          h: placement.h,
          index: placement.index,
          row: placement.row,
          col: placement.col
        };
        section.center = {
          x: Math.floor(section.x + section.w / 2),
          y: Math.floor(section.y + section.h / 2)
        };
        return section;
      });

    return {
      width: SECTION_MARGIN * 2 + colWidths.reduce((total, value) => total + value, 0) + SECTION_GAP * (SECTION_COLUMNS - 1),
      height: SECTION_MARGIN * 2 + rowHeights.reduce((total, value) => total + value, 0) + SECTION_GAP * Math.max(0, rowHeights.length - 1),
      sections
    };
  }

  function emptyTiles(width, height, fill) {
    const tiles = [];
    for (let y = 0; y < height; y += 1) {
      const row = [];
      for (let x = 0; x < width; x += 1) row.push(fill || "wall");
      tiles.push(row);
    }
    return tiles;
  }

  function positionKey(x, y) {
    return `${x},${y}`;
  }

  function currentTier(state) {
    const rawIndex = state && state.dungeon ? state.dungeon.tier || 0 : 0;
    const index = Math.max(0, Math.min(DUNGEON_TIERS.length - 1, Math.round(rawIndex)));
    return Object.assign({ index }, DUNGEON_TIERS[index]);
  }

  function nextTierPreview(state) {
    const tier = currentTier(state);
    return DUNGEON_TIERS[Math.min(DUNGEON_TIERS.length - 1, tier.index + 1)] || tier;
  }

  function effectiveDifficultyFloor(run, floor) {
    return Math.max(1, Math.round(floor + (run.difficultyBonus || 0) + (run.mutation ? 2 : 0)));
  }

  function generateFloor(state, run, floor) {
    let attempts = 0;
    let generated;
    do {
      attempts += 1;
      generated = buildCandidateFloor(state, run, floor);
    } while (!isReachable(generated.tiles, generated.start, generated.stairs) && attempts < 40);

    run.floor = floor;
    run.width = generated.width;
    run.height = generated.height;
    run.tiles = generated.tiles;
    run.player = generated.start;
    run.stairs = generated.stairs;
    run.rooms = generated.rooms || [];
    run.sections = generated.sections || generated.rooms || [];
    run.enemies = generated.enemies;
    run.pickups = generated.pickups;
    run.discovered = {};
    discoverAround(run, run.player.x, run.player.y, 1);
    run.messages.push(`${floor}\u968e\u306b\u5230\u7740\u3057\u305f\u3002`);
  }

  function buildCandidateFloor(state, run, floor) {
    const mutation = run.mutation;
    const effectiveFloor = effectiveDifficultyFloor(run, floor);
    const plan = floorPlanFor(run, floor);
    const tiles = emptyTiles(plan.width, plan.height, "wall");
    carveSections(tiles, plan.sections);
    connectSections(tiles, plan.sections);
    const start = Object.assign({}, plan.sections[0].center);
    const stairs = Object.assign({}, plan.sections[plan.sections.length - 1].center);
    const occupied = new Set([positionKey(start.x, start.y)]);
    occupied.add(positionKey(stairs.x, stairs.y));
    tiles[stairs.y][stairs.x] = "stairs";

    const pickups = [];
    const itemFindBonus = Game.Weapons ? Game.Weapons.effectBonus(state, "itemFind") : 0;
    const itemCount = 3 + Math.min(8, floor + Math.floor(plan.sections.length / 2)) + Math.floor((run.lootBonus || 0) / 2) + (mutation ? 2 : 0) + Math.floor(itemFindBonus / 15);
    for (let i = 0; i < itemCount; i += 1) {
      const pos = randomFreePosition(occupied, tiles);
      if (!pos) continue;
      const lootFloor = effectiveFloor + (run.lootBonus || 0);
      pickups.push({ x: pos.x, y: pos.y, type: Game.Items.chance(18 + (run.lootBonus || 0)) ? "chest" : "item", item: Game.Items.createRandomLoot(lootFloor, state) });
      occupied.add(positionKey(pos.x, pos.y));
    }

    const enemies = [];
    if (floor === run.maxFloor) {
      const pos = randomFreePosition(occupied, tiles);
      enemies.push(Object.assign(makeEnemy(ENEMY_TABLE.find((enemy) => enemy.id === "keeper"), effectiveFloor, mutation), pos));
      if (pos) occupied.add(positionKey(pos.x, pos.y));
    } else {
      const enemyCount = Math.min(12, 2 + Math.floor(effectiveFloor / 2) + Math.floor(plan.sections.length / 2) + (mutation ? 1 : 0) + (run.enemyBonus || 0));
      for (let i = 0; i < enemyCount; i += 1) {
        const pos = randomFreePosition(occupied, tiles);
        if (!pos) continue;
        enemies.push(Object.assign(makeRandomEnemy(effectiveFloor, mutation), pos));
        occupied.add(positionKey(pos.x, pos.y));
      }
    }

    return { width: plan.width, height: plan.height, tiles, start, stairs, rooms: plan.sections, sections: plan.sections, enemies, pickups };
  }

  function carveSections(tiles, sections) {
    sections.forEach((section) => {
      carveRect(tiles, section.x, section.y, section.w, section.h);
      shapeSection(tiles, section);
      carveRect(tiles, section.center.x - 1, section.center.y - 1, 3, 3);
    });
  }

  function carveRect(tiles, x, y, w, h) {
    for (let yy = y; yy < y + h; yy += 1) {
      for (let xx = x; xx < x + w; xx += 1) {
        if (tiles[yy] && tiles[yy][xx] !== undefined) tiles[yy][xx] = "floor";
      }
    }
  }

  function shapeSection(tiles, section) {
    const variant = section.index % 6;
    const cuts = [];
    if (variant === 0) cuts.push({ x: section.x, y: section.y, w: 3, h: 2 }, { x: section.x + section.w - 2, y: section.y + section.h - 3, w: 2, h: 3 });
    if (variant === 1) cuts.push({ x: section.x + section.w - 3, y: section.y, w: 3, h: 3 }, { x: section.x, y: section.y + Math.floor(section.h / 2), w: 2, h: 3 });
    if (variant === 2) cuts.push({ x: section.x, y: section.y + section.h - 3, w: 3, h: 3 }, { x: section.x + section.w - 2, y: section.y + 2, w: 2, h: 3 });
    if (variant === 3) cuts.push({ x: section.x, y: section.y, w: 2, h: 3 }, { x: section.x + section.w - 3, y: section.y, w: 3, h: 2 }, { x: section.x + Math.floor(section.w / 2), y: section.y + section.h - 2, w: 3, h: 2 });
    if (variant === 4) cuts.push({ x: section.x + Math.floor(section.w / 2) - 1, y: section.y, w: 3, h: 2 }, { x: section.x, y: section.y + section.h - 2, w: 2, h: 2 });
    if (variant === 5) cuts.push({ x: section.x + section.w - 3, y: section.y + section.h - 3, w: 3, h: 3 }, { x: section.x, y: section.y + 1, w: 2, h: 2 });

    cuts.forEach((cut) => fillRect(tiles, cut.x, cut.y, cut.w, cut.h, "wall"));
    if (section.w >= 13 && section.h >= 9) {
      const rubbleX = section.x + 2 + (section.index * 3) % Math.max(1, section.w - 5);
      const rubbleY = section.y + 2 + (section.index * 5) % Math.max(1, section.h - 5);
      if (Math.abs(rubbleX - section.center.x) + Math.abs(rubbleY - section.center.y) > 3) fillRect(tiles, rubbleX, rubbleY, 1, 1, "wall");
    }
  }

  function fillRect(tiles, x, y, w, h, tile) {
    for (let yy = y; yy < y + h; yy += 1) {
      for (let xx = x; xx < x + w; xx += 1) {
        if (tiles[yy] && tiles[yy][xx] !== undefined) tiles[yy][xx] = tile;
      }
    }
  }

  function connectSections(tiles, sections) {
    for (let i = 1; i < sections.length; i += 1) {
      carveCorridor(tiles, sections[i - 1].center, sections[i].center, i % 2 === 0, 1);
    }
    if (sections.length >= 4) carveCorridor(tiles, sections[0].center, sections[sections.length - 1].center, true, 1);
  }

  function farthestRoomCenter(rooms, start) {
    return rooms
      .map((room) => room.center)
      .sort((a, b) => (Math.abs(b.x - start.x) + Math.abs(b.y - start.y)) - (Math.abs(a.x - start.x) + Math.abs(a.y - start.y)))[0] || start;
  }

  function carveCorridor(tiles, from, to, verticalFirst, width) {
    if (verticalFirst) {
      carveVertical(tiles, from.y, to.y, from.x, width);
      carveHorizontal(tiles, from.x, to.x, to.y, width);
    } else {
      carveHorizontal(tiles, from.x, to.x, from.y, width);
      carveVertical(tiles, from.y, to.y, to.x, width);
    }
  }

  function carveHorizontal(tiles, x1, x2, y, width) {
    const min = Math.min(x1, x2);
    const max = Math.max(x1, x2);
    const offsets = corridorOffsets(width);
    for (let x = min; x <= max; x += 1) {
      offsets.forEach((offset) => {
        const yy = y + offset;
        if (tiles[yy] && tiles[yy][x] !== undefined) tiles[yy][x] = "floor";
      });
    }
  }

  function carveVertical(tiles, y1, y2, x, width) {
    const min = Math.min(y1, y2);
    const max = Math.max(y1, y2);
    const offsets = corridorOffsets(width);
    for (let y = min; y <= max; y += 1) {
      offsets.forEach((offset) => {
        const xx = x + offset;
        if (tiles[y] && tiles[y][xx] !== undefined) tiles[y][xx] = "floor";
      });
    }
  }

  function corridorOffsets(width) {
    if ((width || 1) <= 1) return [0];
    return [0, 1];
  }

  function randomFreePosition(occupied, tiles) {
    const candidates = [];
    for (let y = 1; y < tiles.length - 1; y += 1) {
      for (let x = 1; x < tiles[y].length - 1; x += 1) {
        if (tiles[y][x] !== "wall" && !occupied.has(positionKey(x, y))) candidates.push({ x, y });
      }
    }
    return candidates.length ? Game.Items.choose(candidates) : null;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function isReachable(tiles, start, goal) {
    const queue = [start];
    const seen = new Set([positionKey(start.x, start.y)]);
    while (queue.length) {
      const current = queue.shift();
      if (current.x === goal.x && current.y === goal.y) return true;
      [{ x: current.x + 1, y: current.y }, { x: current.x - 1, y: current.y }, { x: current.x, y: current.y + 1 }, { x: current.x, y: current.y - 1 }].forEach((next) => {
        const key = positionKey(next.x, next.y);
        if (seen.has(key)) return;
        if (!tiles[next.y] || tiles[next.y][next.x] === "wall") return;
        seen.add(key);
        queue.push(next);
      });
    }
    return false;
  }

  function makeRandomEnemy(floor, mutation) {
    const candidates = ENEMY_TABLE.filter((enemy) => enemy.minFloor <= floor && enemy.id !== "keeper");
    return makeEnemy(Game.Items.choose(candidates), floor, mutation);
  }

  function makeEnemy(template, floor, mutation) {
    const boost = Math.max(0, floor - 1);
    const mutationBoost = mutation ? 2 : 0;
    return {
      uid: `${template.id}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      id: template.id,
      name: template.name,
      symbol: template.symbol,
      css: template.css,
      facing: "down",
      hp: template.hp + boost * 3 + mutationBoost * 2,
      maxHp: template.hp + boost * 3 + mutationBoost * 2,
      attack: template.attack + boost + mutationBoost,
      defense: template.defense + Math.floor(boost / 2),
      exp: template.exp + boost * 2,
      actionType: template.actionType,
      sight: template.sight || 5,
      goldDrop: template.goldDrop
    };
  }

  function moveHero(state, run, dx, dy, options) {
    if (!run || !run.active) return { acted: false };
    const skipEnemyTurn = Boolean(options && options.skipEnemyTurn);
    const logs = [];
    if (dx || dy) run.facing = directionFromDelta(dx, dy);
    const target = { x: run.player.x + dx, y: run.player.y + dy };
    if (getTile(run, target.x, target.y) === "wall") {
      logs.push("\u58c1\u304c\u3042\u3063\u3066\u9032\u3081\u306a\u3044\u3002");
      pushMessages(run, logs);
      return { acted: false, blocked: true };
    }
    if (dx && dy && (getTile(run, run.player.x + dx, run.player.y) === "wall" || getTile(run, run.player.x, run.player.y + dy) === "wall")) {
      logs.push("角が狭くて斜めには進めない。");
      pushMessages(run, logs);
      return { acted: false, blocked: true };
    }

    const enemy = findEnemyAt(run, target.x, target.y);
    let moved = false;
    let attacked = false;
    if (enemy) {
      attacked = true;
      resolveHeroAttack(state, run, enemy, target.x, target.y, logs);
    } else {
      run.player = target;
      moved = true;
      discoverAround(run, run.player.x, run.player.y, 1);
      collectPickup(state, run, logs);
      if (getTile(run, run.player.x, run.player.y) === "stairs") {
        logs.push("階段を見つけた。決定で下りるか、町へ帰れる。");
      }
    }

    if (!skipEnemyTurn && run.active && state.hero.hp > 0) logs.push(...moveEnemies(state, run));
    if (state.hero.hp <= 0 && run.active) logs.push(...returnToTown(state, run, true));
    pushMessages(run, logs);
    return { acted: true, moved, attacked };
  }

  function attackAdjacent(state, run, options) {
    if (!run || !run.active) return false;
    const skipEnemyTurn = Boolean(options && options.skipEnemyTurn);
    const logs = [];
    const directions = [
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 }
    ];
    const target = directions
      .map((dir) => ({ x: run.player.x + dir.x, y: run.player.y + dir.y, direction: directionFromDelta(dir.x, dir.y) }))
      .find((pos) => findEnemyAt(run, pos.x, pos.y));

    if (!target) {
      logs.push("\u8fd1\u304f\u306b\u653b\u6483\u3067\u304d\u308b\u6575\u304c\u3044\u306a\u3044\u3002");
      pushMessages(run, logs);
      return false;
    }

    const enemy = findEnemyAt(run, target.x, target.y);
    run.facing = target.direction;
    resolveHeroAttack(state, run, enemy, target.x, target.y, logs);
    if (!skipEnemyTurn && run.active && state.hero.hp > 0) logs.push(...moveEnemies(state, run));
    if (state.hero.hp <= 0 && run.active) logs.push(...returnToTown(state, run, true));
    pushMessages(run, logs);
    return true;
  }

  function resolveHeroAttack(state, run, enemy, x, y, logs) {
    const beforeHp = enemy.hp;
    logs.push(...Game.Combat.attackEnemy(state, enemy));
    const damage = Math.max(0, beforeHp - enemy.hp);
    if (Game.Animations) {
      Game.Animations.startAttack("dungeon", { x: run.player.x, y: run.player.y }, { x, y }, directionFromDelta(x - run.player.x, y - run.player.y), damage, damage > 0);
    }
    if (enemy.hp <= 0) {
      run.enemies = run.enemies.filter((item) => item.uid !== enemy.uid);
      maybeDropLoot(state, run, x, y, enemy, logs);
    }
  }

  function getTile(run, x, y) {
    if (!run.tiles[y] || !run.tiles[y][x]) return "wall";
    return run.tiles[y][x];
  }

  function findEnemyAt(run, x, y) {
    return run.enemies.find((enemy) => enemy.x === x && enemy.y === y);
  }

  function findPickupAt(run, x, y) {
    return run.pickups.find((pickup) => pickup.x === x && pickup.y === y);
  }

  function isOnStairs(run) {
    return Boolean(run && run.active && getTile(run, run.player.x, run.player.y) === "stairs");
  }

  function discoverAround(run, x, y, radius) {
    if (!run) return;
    if (!run.discovered || typeof run.discovered !== "object") run.discovered = {};
    const r = Math.max(0, radius || 0);
    for (let yy = y - r; yy <= y + r; yy += 1) {
      for (let xx = x - r; xx <= x + r; xx += 1) {
        if (!run.tiles[yy] || run.tiles[yy][xx] === undefined) continue;
        run.discovered[positionKey(xx, yy)] = true;
      }
    }
  }

  function isDiscovered(run, x, y) {
    if (!run || !run.discovered) return false;
    return Boolean(run.discovered[positionKey(x, y)]);
  }

  function collectPickup(state, run, logs) {
    const pickup = findPickupAt(run, run.player.x, run.player.y);
    if (!pickup) return;
    const limit = Game.Items.getCarryLimit(state);
    if (state.hero.inventory.length >= limit) {
      logs.push("\u6301\u3061\u7269\u304c\u3044\u3063\u3071\u3044\u3067\u62fe\u3048\u306a\u3044\u3002");
      return;
    }
    state.hero.inventory.push(pickup.item);
    run.pickups = run.pickups.filter((item) => item !== pickup);
    logs.push(`${pickup.type === "chest" ? "\u5b9d\u7bb1\u304b\u3089" : ""}${Game.Items.itemLabel(pickup.item)}\u3092\u62fe\u3063\u305f\u3002`);
    if (Game.Objectives) Game.Objectives.track(state, "collect", { item: pickup.item }, logs);
  }

  function maybeDropLoot(state, run, x, y, enemy, logs) {
    const itemFindBonus = Game.Weapons ? Game.Weapons.effectBonus(state, "itemFind") : 0;
    const dropChance = enemy.id === "keeper" ? 100 : 24 + run.floor * 4 + itemFindBonus * 0.25;
    if (!Game.Items.chance(dropChance)) return;
    const item = Game.Items.createRandomLoot(run.floor + (enemy.id === "keeper" ? 2 : 0) + (run.lootBonus || 0), state);
    run.pickups.push({ x, y, type: enemy.id === "keeper" ? "chest" : "item", item });
    logs.push(`${enemy.name}\u304c${Game.Items.itemLabel(item)}\u3092\u843d\u3068\u3057\u305f\u3002`);
  }

  function completeDungeon(state, run, logs) {
    if (!state.dungeon || typeof state.dungeon !== "object") state.dungeon = { tier: 0, clearedTiers: [] };
    if (!Array.isArray(state.dungeon.clearedTiers)) state.dungeon.clearedTiers = [];
    if (!state.dungeon.clearedTiers.includes(run.dungeonTier)) state.dungeon.clearedTiers.push(run.dungeonTier);

    const nextIndex = Math.min(DUNGEON_TIERS.length - 1, (run.dungeonTier || 0) + 1);
    if (nextIndex > (state.dungeon.tier || 0)) {
      state.dungeon.tier = nextIndex;
      const next = DUNGEON_TIERS[nextIndex];
      logs.push(`${run.name}を踏破した。次は${next.name}（${next.maxFloor}階）へ進めるようになった。`);
    } else {
      logs.push(`${run.name}を踏破した。最深部まで仕入れを終えた。`);
    }
  }

  function descendOrFinish(state, run, logs) {
    if (run.floor >= run.maxFloor) {
      completeDungeon(state, run, logs);
      logs.push(...returnToTown(state, run, false));
      return;
    }
    generateFloor(state, run, run.floor + 1);
    logs.push("\u968e\u6bb5\u3092\u4e0b\u308a\u305f\u3002");
    if (Game.Weapons) Game.Weapons.addMastery(state, 1, logs, "floor");
    if (Game.Objectives) Game.Objectives.track(state, "reachFloor", { floor: run.floor }, logs);
  }

  function useStairs(state, run) {
    const logs = [];
    if (!isOnStairs(run)) {
      logs.push("階段の上でだけ下りたり、町へ戻ったりできる。");
      pushMessages(run, logs);
      return false;
    }
    descendOrFinish(state, run, logs);
    if (run.active && state.hero.hp > 0) logs.push(...moveEnemies(state, run));
    if (state.hero.hp <= 0 && run.active) logs.push(...returnToTown(state, run, true));
    pushMessages(run, logs);
    return true;
  }

  function resolveEnemyTurn(state, run) {
    const logs = [];
    if (!run || !run.active) return logs;
    if (state.hero.hp > 0) logs.push(...moveEnemies(state, run));
    if (state.hero.hp <= 0 && run.active) logs.push(...returnToTown(state, run, true));
    pushMessages(run, logs);
    return logs;
  }

  function moveEnemies(state, run) {
    const logs = [];
    run.enemies.forEach((enemy) => {
      if (!run.active || state.hero.hp <= 0) return;
      const distance = distanceToHero(run, enemy);
      if (distance === 1) {
        enemy.facing = directionFromDelta(run.player.x - enemy.x, run.player.y - enemy.y);
        logs.push(...enemyAttackHero(state, run, enemy));
        return;
      }
      if (enemy.actionType === "fire" && canFireBreathe(run, enemy) && Game.Items.chance(48)) {
        enemy.facing = directionFromDelta(run.player.x - enemy.x, run.player.y - enemy.y);
        logs.push(...enemyFireBreath(state, run, enemy));
        return;
      }
      let options = [{ x: enemy.x + 1, y: enemy.y }, { x: enemy.x - 1, y: enemy.y }, { x: enemy.x, y: enemy.y + 1 }, { x: enemy.x, y: enemy.y - 1 }].filter((pos) => canEnemyMoveTo(run, pos.x, pos.y));
      const alert = distance <= (enemy.sight || 5);
      if ((enemy.actionType === "chase" || enemy.actionType === "steal" || enemy.actionType === "boss" || enemy.actionType === "fire") && alert) {
        options = options.sort((a, b) => Math.abs(a.x - run.player.x) + Math.abs(a.y - run.player.y) - (Math.abs(b.x - run.player.x) + Math.abs(b.y - run.player.y)));
        if (options[0]) moveEnemyTo(enemy, options[0]);
      } else if (options.length && Game.Items.chance(55)) {
        moveEnemyTo(enemy, Game.Items.choose(options));
      }
    });
    return logs;
  }

  function distanceToHero(run, enemy) {
    return Math.max(Math.abs(enemy.x - run.player.x), Math.abs(enemy.y - run.player.y));
  }

  function enemyAttackHero(state, run, enemy) {
    const beforeHp = state.hero.hp;
    const logs = Game.Combat.enemyAttackHero(state, enemy);
    const damage = Math.max(0, beforeHp - state.hero.hp);
    if (damage && Game.Animations) Game.Animations.addHitEffect("dungeon", run.player.x, run.player.y, damage, 420, "hero");
    if (damage && Game.Audio) Game.Audio.playSfx("hurt");
    return logs;
  }

  function enemyFireBreath(state, run, enemy) {
    const damage = Math.max(1, Game.Combat.calculateDamage(enemy.attack + 2, Game.Combat.heroDefensePower(state)));
    state.hero.hp = Math.max(0, state.hero.hp - damage);
    if (Game.Animations) {
      Game.Animations.startAttack("dungeon", { x: enemy.x, y: enemy.y }, { x: run.player.x, y: run.player.y }, directionFromDelta(run.player.x - enemy.x, run.player.y - enemy.y), damage, true, "fire");
      Game.Animations.addHitEffect("dungeon", run.player.x, run.player.y, damage, 460, "hero");
    }
    if (Game.Audio) Game.Audio.playSfx("hurt");
    const logs = [`${enemy.name}が火を噴いた。${damage}ダメージを受けた。`];
    if (state.hero.hp <= 0) {
      state.hero.hp = 0;
      logs.push("HPが尽きた。町へ強制帰還する。");
    }
    return logs;
  }

  function canFireBreathe(run, enemy) {
    const dx = run.player.x - enemy.x;
    const dy = run.player.y - enemy.y;
    if (!((Math.abs(dx) === 2 && dy === 0) || (Math.abs(dy) === 2 && dx === 0))) return false;
    const stepX = Math.sign(dx);
    const stepY = Math.sign(dy);
    const midX = enemy.x + stepX;
    const midY = enemy.y + stepY;
    return getTile(run, midX, midY) !== "wall";
  }

  function moveEnemyTo(enemy, next) {
    enemy.facing = directionFromDelta(next.x - enemy.x, next.y - enemy.y);
    Object.assign(enemy, next);
  }

  function canEnemyMoveTo(run, x, y) {
    return getTile(run, x, y) !== "wall" && !(run.player.x === x && run.player.y === y) && !findEnemyAt(run, x, y);
  }

  function directionFromDelta(dx, dy) {
    if (Game.Animations && Game.Animations.directionFromDelta) return Game.Animations.directionFromDelta(dx, dy);
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? "right" : "left";
    return dy > 0 ? "down" : "up";
  }

  function useItem(state, run, requestedIndex, options) {
    const skipEnemyTurn = Boolean(options && options.skipEnemyTurn);
    const logs = [];
    let index = Number.isFinite(Number(requestedIndex)) ? Number(requestedIndex) : -1;
    if (index >= 0 && state.hero.inventory[index] && !Game.Items.isHealingItem(state.hero.inventory[index])) {
      logs.push("\u3053\u308c\u306f\u4eca\u4f7f\u3048\u306a\u3044\u3002");
      pushMessages(run, logs);
      return false;
    }
    if (index < 0 || !state.hero.inventory[index]) index = state.hero.inventory.findIndex((item) => Game.Items.isHealingItem(item));
    if (index === -1) {
      logs.push("\u4f7f\u3048\u308b\u56de\u5fa9\u54c1\u304c\u306a\u3044\u3002");
      pushMessages(run, logs);
      return false;
    }
    const item = state.hero.inventory.splice(index, 1)[0];
    const before = state.hero.hp;
    state.hero.hp = Game.State.clamp(state.hero.hp + Game.Items.healingAmount(item), 0, state.hero.maxHp);
    logs.push(`${item.name}\u3092\u4f7f\u3044\u3001HP\u304c${state.hero.hp - before}\u56de\u5fa9\u3057\u305f\u3002`);
    if (!skipEnemyTurn) logs.push(...moveEnemies(state, run));
    if (state.hero.hp <= 0 && run.active) logs.push(...returnToTown(state, run, true));
    pushMessages(run, logs);
    return true;
  }

  function returnToTown(state, run, forced) {
    const logs = [];
    if (!run.active) return logs;
    run.active = false;
    if (forced) {
      const loseCount = state.hero.inventory.length;
      for (let i = 0; i < loseCount; i += 1) {
        const index = Game.Items.randomInt(0, state.hero.inventory.length - 1);
        const lost = state.hero.inventory.splice(index, 1)[0];
        if (lost) logs.push(`${Game.Items.itemLabel(lost)}\u3092\u843d\u3068\u3057\u3066\u3057\u307e\u3063\u305f\u3002`);
      }
      if (!loseCount) logs.push("\u6301\u3061\u7269\u306f\u7a7a\u3060\u3063\u305f\u3002");
      state.hero.hp = Math.max(1, Math.floor(state.hero.maxHp * 0.35));
    }
    const broughtBack = state.hero.inventory.splice(0);
    let stored = 0;
    broughtBack.forEach((item) => {
      if (state.shop.storage.length < state.shop.storageCapacity) {
        state.shop.storage.push(item);
        stored += 1;
      } else {
        logs.push(`\u5009\u5eab\u304c\u3044\u3063\u3071\u3044\u3067${Game.Items.itemLabel(item)}\u3092\u4fdd\u7ba1\u3067\u304d\u306a\u304b\u3063\u305f\u3002`);
      }
    });
    state.phase = "\u5915\u65b9";
    if (stored > 0) logs.push(`${stored}\u500b\u3092\u5009\u5eab\u306b\u5165\u308c\u305f\u3002`);
    resetDungeonLevel(state, logs);
    logs.push("\u753a\u3078\u5e30\u3063\u305f\u3002");
    Game.State.updateDerivedStats(state);
    return logs;
  }

  function resetDungeonLevel(state, logs) {
    if (state.hero.level > 1 || state.hero.exp > 0) logs.push("\u753a\u306b\u623b\u308a\u3001\u63a2\u7d22\u30ec\u30d9\u30eb\u306f1\u306b\u623b\u3063\u305f\u3002");
    state.hero.level = 1;
    state.hero.exp = 0;
    state.hero.nextExp = 18;
    state.hero.baseAttack = 5;
    state.hero.baseDefense = 2;
  }

  function pushMessages(run, logs) {
    run.messages.push(...logs);
    run.messages = run.messages.slice(-12);
  }

  Game.Dungeon = { DUNGEON_TIERS, ENEMY_TABLE, currentTier, nextTierPreview, startRun, moveHero, attackAdjacent, resolveEnemyTurn, useItem, useStairs, isOnStairs, isDiscovered, returnToTown };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const PRICE_POLICIES = {
    cheap: { id: "cheap", label: "安く売る", resultLabel: "安値", rate: 0.75, chanceBonus: 22 },
    normal: { id: "normal", label: "普通価格", resultLabel: "普通価格", rate: 1, chanceBonus: 0 },
    expensive: { id: "expensive", label: "高く売る", resultLabel: "高値", rate: 1.35, chanceBonus: -22 }
  };

  const CUSTOMER_TYPES = [
    {
      id: "villager",
      label: "村人",
      wantsText: "生活用品、薬草、食べ物",
      ids: ["herb", "good_herb", "salve", "herbal_tea", "dried_meat", "torch"],
      categories: ["生活品", "食料"],
      slots: [],
      budget: [55, 190],
      personalities: ["堅実", "心配性", "家族思い"],
      lines: ["家で使えるものを探しているんだ。", "安心できる品があると助かるよ。"]
    },
    {
      id: "adventurer",
      label: "冒険者",
      wantsText: "薬、武器、防具、たいまつ",
      ids: ["herb", "good_herb", "salve", "magic_water", "torch", "old_dagger", "small_shield"],
      categories: ["生活品", "探索品", "武具"],
      slots: ["weapon", "armor"],
      budget: [140, 420],
      personalities: ["豪快", "慎重", "急ぎ足"],
      lines: ["次の探索に備えたい。役に立つ品はあるかい。", "武器か薬が欲しい。"]
    },
    {
      id: "traveler",
      label: "旅人",
      wantsText: "珍しい品、装飾品、衣類",
      ids: ["traveler_hat_goods", "silver_ring", "amber_brooch", "moon_glass", "magic_water", "warding_charm"],
      categories: ["装飾品", "不思議品", "衣類"],
      slots: ["accessory"],
      budget: [180, 620],
      personalities: ["目利き", "気まぐれ", "土産好き"],
      lines: ["この町らしい珍しい品を探しているんだ。", "旅の記念になるものがあれば見せてほしい。"]
    },
    {
      id: "merchant",
      label: "隣町の商人",
      wantsText: "売れ筋商品、武具、珍しい品",
      ids: ["torch", "copper_lantern", "old_dagger", "small_shield", "silver_ring", "amber_brooch"],
      categories: ["探索品", "武具", "装飾品"],
      slots: ["weapon", "armor"],
      budget: [150, 520],
      personalities: ["目利き", "仕入れ中", "交渉好き"],
      lines: ["隣町の店にも並べられそうな品を探している。", "この町ならではの掘り出し物はあるかな。"]
    },
    {
      id: "child",
      label: "子ども",
      wantsText: "安い食べ物、小物、きらきらした品",
      ids: ["herb", "herbal_tea", "dried_meat", "amber_brooch", "silver_ring"],
      categories: ["食料", "生活品", "装飾品"],
      slots: [],
      budget: [25, 110],
      personalities: ["わくわく", "おこづかい", "遠慮がち"],
      lines: ["おこづかいで買えるもの、あるかな。", "きれいなものを見るだけでも楽しいな。"]
    },
    {
      id: "soldier",
      label: "兵士",
      wantsText: "武器、防具、薬",
      ids: ["old_dagger", "small_shield", "salve", "good_herb", "torch", "warding_charm"],
      categories: ["武具", "生活品"],
      slots: ["weapon", "armor"],
      budget: [120, 360],
      personalities: ["実直", "警戒中", "任務前"],
      lines: ["見回りの前に備えを整えたい。", "町を守るための品が必要だ。"]
    }
  ];

  const FALLBACK_NAMES = ["アルマ", "ベル", "トト", "ユリ", "ラナ", "オルト", "フィン", "マオ"];

  function addToShelf(state, storageIndex) {
    const item = state.shop.storage[storageIndex];
    if (!Game.Items.isSaleable(item)) return "\u7d20\u6750\u306f\u68da\u306b\u4e26\u3079\u3089\u308c\u306a\u3044\u3002";
    if (state.shop.shelfItems.length >= state.shop.shelves) return "\u68da\u304c\u3044\u3063\u3071\u3044\u3060\u3002";
    state.shop.storage.splice(storageIndex, 1);
    state.shop.shelfItems.push(item);
    state.today.shelvesArranged = true;
    return `${Game.Items.itemLabel(item)}\u3092\u68da\u306b\u4e26\u3079\u305f\u3002`;
  }

  function removeFromShelf(state, shelfIndex) {
    const item = state.shop.shelfItems[shelfIndex];
    if (!item) return "\u305d\u306e\u68da\u306f\u7a7a\u3060\u3002";
    if (state.shop.storage.length >= state.shop.storageCapacity) return "\u5009\u5eab\u304c\u3044\u3063\u3071\u3044\u3067\u623b\u305b\u306a\u3044\u3002";
    state.shop.shelfItems.splice(shelfIndex, 1);
    state.shop.storage.push(item);
    return `${Game.Items.itemLabel(item)}\u3092\u5009\u5eab\u306b\u623b\u3057\u305f\u3002`;
  }

  function autoArrange(state) {
    const logs = [];
    while (state.shop.shelfItems.length < state.shop.shelves) {
      const bestIndex = findBestSaleableIndex(state.shop.storage, state);
      if (bestIndex === -1) break;
      logs.push(addToShelf(state, bestIndex));
    }
    if (!logs.length) logs.push("\u4e26\u3079\u3089\u308c\u308b\u5546\u54c1\u304c\u306a\u3044\u3002");
    return logs;
  }

  function findBestSaleableIndex(storage, state) {
    let bestIndex = -1;
    let bestScore = -Infinity;
    storage.forEach((item, index) => {
      if (!Game.Items.isSaleable(item)) return;
      const score = estimateSalePrice(state, item) + (item.popularity || 35) * 2;
      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    });
    return bestIndex;
  }

  function estimateSalePrice(state, item) {
    const saleBonus = Game.Items.getEquipmentBonus(state, "salePrice");
    const wealthBonus = Math.min(0.3, state.town.wealth / 400);
    const reputationBonus = Math.min(0.2, state.shop.reputation / 500);
    const adventurerBonus = state.flags.adventurerDemand && item.price >= 150 ? 0.2 : 0;
    return Math.round((item.price || 50) * (1 + saleBonus / 100 + wealthBonus + reputationBonus + adventurerBonus));
  }

  function saleChance(state, item, customers) {
    const price = estimateSalePrice(state, item);
    const popularity = item.popularity || (item.kind === "equipment" ? 36 : 45);
    const pricePressure = Math.max(0, (price - 120 - state.town.wealth * 2) / 8);
    const base = popularity + state.shop.reputation * 0.25 + state.town.happiness * 0.12 + state.town.wealth * 0.08 + customers * 0.45 - pricePressure;
    return Game.State.clamp(base, 8, 92);
  }

  function customerCount(state) {
    const reputationBonus = Math.floor((state.shop.reputation || 0) / 25);
    const populationBonus = Math.floor((state.town.population || 0) / 3);
    const weaponBonus = Game.Weapons ? Game.Weapons.effectBonus(state, "customerBonus") : 0;
    return Game.State.clamp(2 + state.shop.level + state.town.level + populationBonus + reputationBonus + weaponBonus, 3, 10);
  }

  function weightedCustomerType(state) {
    const weights = CUSTOMER_TYPES.map((type) => {
      let weight = 10;
      const earlyTown = state.town.population <= 3;
      if (type.id === "villager") weight = Math.max(4, state.town.population * 2.4);
      if (type.id === "adventurer") weight = 24 + (earlyTown ? 12 : 0) + (state.flags.adventurerDemand ? 18 : 0) + state.town.level * 2 + (state.buildings.weaponShopLevel || 0) * 4;
      if (type.id === "traveler") weight = 10 + state.town.level * 4 + state.town.wealth * 0.04;
      if (type.id === "merchant") weight = 18 + (earlyTown ? 14 : 0) + state.town.wealth * 0.04 + (state.buildings.weaponShopLevel || 0) * 3;
      if (type.id === "child") weight = 12 + state.town.happiness * 0.05;
      if (type.id === "soldier") weight = 8 + (state.town.safety < 45 ? 16 : 0) + (Game.Raid.raidChance(state) > 24 ? 12 : 0) + (state.raidOmen && state.raidOmen.active ? 24 : 0);
      return { type, weight };
    });
    const total = weights.reduce((sum, item) => sum + item.weight, 0);
    let roll = Math.random() * total;
    for (const item of weights) {
      roll -= item.weight;
      if (roll <= 0) return item.type;
    }
    return CUSTOMER_TYPES[0];
  }

  function createCustomer(state, index) {
    const type = weightedCustomerType(state);
    const living = Game.Villagers.livingVillagers(state);
    let villager = null;
    if (type.id === "child") villager = living.find((item) => item.job === "子ども") || null;
    if (!villager && type.id === "villager" && living.length) villager = Game.Items.choose(living);
    if (!villager && type.id === "soldier") villager = living.find((item) => item.job === "見張り") || null;
    const wealthBonus = Math.round(state.town.wealth * (type.id === "traveler" ? 1.6 : 0.8));
    const minBudget = type.budget[0] + Math.floor(wealthBonus * 0.15);
    const maxBudget = type.budget[1] + wealthBonus + state.town.level * 20;
    const baseName = villager ? villager.name : FALLBACK_NAMES[(index + state.day) % FALLBACK_NAMES.length];
    return {
      id: `${state.day}_${index}_${type.id}`,
      typeId: type.id,
      typeLabel: type.label,
      name: `${type.label}${baseName}`,
      villagerId: villager ? villager.id : null,
      wantsText: type.wantsText,
      desireIds: type.ids.slice(),
      desireCategories: type.categories.slice(),
      desireSlots: type.slots.slice(),
      budget: Game.Items.randomInt(minBudget, Math.max(minBudget, maxBudget)),
      creditEligible: Boolean(villager || type.id === "soldier" || (type.id === "adventurer" && Math.random() < 0.45)),
      personality: Game.Items.choose(type.personalities),
      line: Game.Items.choose(type.lines)
    };
  }

  function ensureCreditState(state) {
    if (!state.shop.creditLedger || !Array.isArray(state.shop.creditLedger)) state.shop.creditLedger = [];
    if (!state.shop.customerCredit || typeof state.shop.customerCredit !== "object") state.shop.customerCredit = {};
    state.shop.creditLedger.forEach((entry, index) => {
      entry.id = entry.id || `credit_${state.day || 1}_${index}_${Math.random().toString(36).slice(2, 7)}`;
      entry.status = entry.status || "unpaid";
      entry.paidAmount = Math.max(0, Math.round(entry.paidAmount || 0));
      entry.amount = Math.max(0, Math.round(entry.amount || 0));
      entry.originalPrice = Math.max(0, Math.round(entry.originalPrice || entry.amount || 0));
      entry.dayCreated = Math.max(1, Math.round(entry.dayCreated || state.day || 1));
      entry.dueDay = Math.max(entry.dayCreated, Math.round(entry.dueDay || entry.dayCreated + 3));
    });
  }

  function currentVillager(state, customer) {
    if (!customer || !customer.villagerId) return null;
    return (state.villagers || []).find((villager) => villager.id === customer.villagerId) || null;
  }

  function creditKey(customer) {
    if (!customer) return "unknown";
    if (customer.villagerId) return `villager:${customer.villagerId}`;
    return `guest:${customer.typeId}:${customer.name}`;
  }

  function remainingCredit(entry) {
    return Math.max(0, Math.round((entry.amount || 0) - (entry.paidAmount || 0)));
  }

  function creditBalance(state, filter) {
    ensureCreditState(state);
    return state.shop.creditLedger.reduce((sum, entry) => {
      if (filter && !filter(entry)) return sum;
      if (!["unpaid", "late"].includes(entry.status)) return sum;
      return sum + remainingCredit(entry);
    }, 0);
  }

  function unpaidCreditsForCustomer(state, customer) {
    const key = creditKey(customer);
    return state.shop.creditLedger.filter((entry) => {
      if (!["unpaid", "late"].includes(entry.status)) return false;
      if (entry.villagerId && customer.villagerId) return entry.villagerId === customer.villagerId;
      return entry.creditKey === key || (!entry.villagerId && entry.customerName === customer.name);
    });
  }

  function reasonForCustomerItem(state, customer, item) {
    const villager = currentVillager(state, customer);
    if (villager && Game.Villagers.likesItem(villager, item)) return `${villager.name}の好みの品だった`;
    if (Game.Items.isHealingItem(item)) return "薬や手当ての品を探していた";
    if (item.id === "torch" || item.category === "探索品") return "暗い道や見回りに使う品を見ていた";
    if (isWeaponOrArmor(item)) return "旅の護身用に武具を見ていた";
    if (item.category === "装飾品") return "珍しい装飾品に目を留めた";
    if (item.category === "食料") return "持ち帰れる食べ物を探していた";
    if (isRareItem(item)) return "珍しい品にひかれた";
    return `${customer.wantsText}に合う品を見つけた`;
  }

  function findBroughtItemForCustomer(state, customer) {
    let best = null;
    let bestScore = -Infinity;
    saleCandidates(state).forEach((candidate) => {
      const item = candidate.item;
      const desire = desireScore(state, customer, item);
      const threshold = customer.typeId === "child" ? 24 : 28;
      if (desire < threshold) return;
      const normalPrice = priceForPolicy(state, item, "normal");
      const cheapPrice = priceForPolicy(state, item, "cheap");
      const overBudget = Math.max(0, normalPrice - customer.budget);
      const budgetScore = normalPrice <= customer.budget ? 22 : cheapPrice <= customer.budget ? 12 : -Math.min(18, overBudget * 0.08);
      const rarityScore = customer.typeId === "traveler" && isRareItem(item) ? 12 : isRareItem(item) ? 4 : 0;
      const score = desire * 1.8 + budgetScore + (item.popularity || 40) * 0.25 + rarityScore - overBudget * 0.02;
      if (score > bestScore) {
        best = Object.assign({}, candidate, {
          desireScore: Math.round(score),
          reasonText: reasonForCustomerItem(state, customer, item)
        });
        bestScore = score;
      }
    });
    return best;
  }

  function currentBroughtCandidate(state) {
    const session = state.saleSession;
    if (!session || !session.active) return null;
    const live = candidateByKey(state, session.currentBroughtItemKey);
    if (live) {
      return Object.assign({}, live, {
        desireScore: session.currentBroughtDesire || 0,
        reasonText: session.currentBroughtReason || ""
      });
    }
    if (session.currentBroughtItem) {
      return {
        source: "shelf",
        index: session.currentBroughtShelfIndex || 0,
        key: session.currentBroughtItemKey || "brought:gone",
        item: session.currentBroughtItem,
        stale: true,
        desireScore: session.currentBroughtDesire || 0,
        reasonText: session.currentBroughtReason || ""
      };
    }
    return null;
  }

  function prepareCurrentCustomer(state) {
    const session = state.saleSession;
    const customer = currentCustomer(state);
    const logs = [];
    if (!session || !session.active || !customer) return { candidate: null, logs };
    session.selectedItem = null;
    session.currentBroughtItemKey = null;
    session.currentBroughtItem = null;
    session.currentBroughtShelfIndex = null;
    session.currentBroughtReason = "";
    session.currentBroughtDesire = 0;
    session.lastResult = null;
    session.waitingNext = false;
    const candidate = findBroughtItemForCustomer(state, customer);
    if (candidate) {
      session.currentBroughtItemKey = candidate.key;
      session.currentBroughtItem = candidate.item;
      session.currentBroughtShelfIndex = candidate.index;
      session.currentBroughtReason = candidate.reasonText;
      session.currentBroughtDesire = candidate.desireScore;
      session.customerStage = "bring";
      session.rpgMode = "price";
      return { candidate, logs };
    }
    const wanted = customer.wantsText || "欲しい品";
    const reason = `${customer.name}は棚を見回したが、${wanted}が見つからなかった。`;
    session.customerStage = "noWantedItem";
    session.rpgMode = "noWantedItem";
    session.waitingNext = true;
    session.noWantedCount = (session.noWantedCount || 0) + 1;
    if (session.noWantedCount >= 2) state.shop.reputation -= 1;
    if (customer.villagerId) state.town.happiness -= 1;
    session.lastResult = {
      success: false,
      noWanted: true,
      customerName: customer.name,
      itemName: "",
      policyLabel: "",
      price: 0,
      chance: 0,
      wanted: false,
      message: reason,
      reaction: `${customer.name}は少し残念そうに店を出た。`,
      wantedText: wanted
    };
    logs.push(reason);
    session.resultLogs.push(...logs);
    session.resultLogs = session.resultLogs.slice(-20);
    Game.State.updateDerivedStats(state);
    return { candidate: null, logs };
  }

  function startManualSale(state) {
    const total = customerCount(state);
    state.phase = "夜";
    state.today.nightSaleDone = true;
    Game.Villagers.beginSaleDay(state);
    state.saleSession = {
      active: true,
      index: 0,
      total,
      customers: Array.from({ length: total }, (_, index) => createCustomer(state, index)),
      revenue: 0,
      soldCount: 0,
      soldItemIds: [],
      resultLogs: [],
      selectedItem: null,
      currentBroughtItemKey: null,
      currentBroughtItem: null,
      currentBroughtShelfIndex: null,
      currentBroughtReason: "",
      currentBroughtDesire: 0,
      creditCount: 0,
      creditAmount: 0,
      customerStage: "enter",
      rpgMode: "main",
      waitingNext: false,
      lastResult: null
    };
    const message = `夜の接客を始めた。今日は${total}人ほど来店しそうだ。`;
    state.saleSession.resultLogs.push(message);
    const prepared = prepareCurrentCustomer(state);
    return [message].concat(prepared.logs);
  }

  function currentCustomer(state) {
    const session = state.saleSession;
    if (!session || !session.active) return null;
    return session.customers[session.index] || null;
  }

  function saleCandidates(state) {
    return state.shop.shelfItems
      .map((item, index) => ({ source: "shelf", index, key: `shelf:${index}`, item }))
      .filter(({ item }) => Game.Items.isSaleable(item));
  }

  function candidateByKey(state, key) {
    const [source, indexText] = String(key || "").split(":");
    const index = Number(indexText);
    const list = source === "shelf" ? state.shop.shelfItems : null;
    if (!list || !Number.isInteger(index) || index < 0 || index >= list.length) return null;
    const item = list[index];
    return Game.Items.isSaleable(item) ? { source, index, key: `${source}:${index}`, item } : null;
  }

  function selectSaleItem(state, key) {
    if (!state.saleSession || !state.saleSession.active) return "販売中ではない。";
    return "今は客が棚から持ってきた商品だけを販売できる。";
  }

  function setSaleMenuMode(state, mode) {
    const session = state.saleSession;
    if (!session || !session.active) return "販売中ではない。";
    session.rpgMode = currentBroughtCandidate(state) ? (mode || "price") : "noWantedItem";
    return "";
  }

  function recommendSaleItem(state) {
    const candidate = currentBroughtCandidate(state) || findBroughtItemForCustomer(state, currentCustomer(state));
    const session = state.saleSession;
    if (session) session.rpgMode = candidate ? "price" : "noWantedItem";
    return candidate ? `${candidate.item.name}を客がレジに持ってきている。` : "客が欲しい商品は棚にない。";
  }

  function priceForPolicy(state, item, policyId) {
    const policy = PRICE_POLICIES[policyId] || PRICE_POLICIES.normal;
    return Math.max(1, Math.round(estimateSalePrice(state, item) * policy.rate));
  }

  function isRareItem(item) {
    return item && (item.rarity === "希少" || item.rarity === "伝説");
  }

  function isWeaponOrArmor(item) {
    return item && (item.category === "武具" || (item.kind === "equipment" && ["weapon", "armor"].includes(item.slot)));
  }

  function desireScore(state, customer, item) {
    if (!customer || !item) return 0;
    let score = 0;
    if (customer.desireIds.includes(item.id)) score = Math.max(score, 44);
    if (customer.desireCategories.includes(item.category)) score = Math.max(score, 30);
    if (item.kind === "equipment" && customer.desireSlots.includes(item.slot)) score = Math.max(score, 34);
    if (customer.typeId === "traveler" && isRareItem(item)) score = Math.max(score, 42);
    if (customer.typeId === "child" && estimateSalePrice(state, item) <= 120) score = Math.max(score, 24);
    if (customer.villagerId) {
      const villager = (state.villagers || []).find((person) => person.id === customer.villagerId);
      if (villager && Game.Villagers.likesItem(villager, item)) score = Math.max(score, 48);
    }
    return score;
  }

  function customerWantsItem(state, customer, item) {
    return desireScore(state, customer, item) >= 28;
  }

  function saleSuccessChance(state, customer, item, policyId) {
    const policy = PRICE_POLICIES[policyId] || PRICE_POLICIES.normal;
    const price = priceForPolicy(state, item, policy.id);
    const popularity = item.popularity || (item.kind === "equipment" ? 38 : 45);
    const rarityBonus = item.rarity === "良品" ? 3 : item.rarity === "希少" ? 7 : item.rarity === "伝説" ? 10 : 0;
    const rareCaution = isRareItem(item) && customer.typeId !== "traveler" ? -6 : 0;
    const budgetPressure = price > customer.budget ? Math.min(40, (price - customer.budget) / Math.max(6, customer.budget) * 70) : -6;
    const base = 18 + popularity * 0.5 + desireScore(state, customer, item) + policy.chanceBonus + state.shop.reputation * 0.18 + state.town.happiness * 0.08 + rarityBonus + rareCaution - budgetPressure;
    return Math.round(Game.State.clamp(base, 10, 95));
  }

  function recommendCandidate(state, customer) {
    let best = null;
    let bestScore = -Infinity;
    saleCandidates(state).forEach((candidate) => {
      const chance = saleSuccessChance(state, customer, candidate.item, "normal");
      const overBudget = Math.max(0, priceForPolicy(state, candidate.item, "normal") - customer.budget);
      const score = chance + desireScore(state, customer, candidate.item) * 0.6 - overBudget * 0.04;
      if (score > bestScore) {
        best = candidate;
        bestScore = score;
      }
    });
    return best;
  }

  function removeCandidate(state, candidate) {
    const list = candidate.source === "shelf" ? state.shop.shelfItems : state.shop.storage;
    return list.splice(candidate.index, 1)[0];
  }

  function markSpecificVillagerFavorite(state, customer, item, logs) {
    if (!customer.villagerId) return null;
    const villager = (state.villagers || []).find((person) => person.id === customer.villagerId);
    if (!villager || !Game.Villagers.likesItem(villager, item) || villager.favoriteBoughtToday) return null;
    villager.favoriteBoughtToday = true;
    villager.daysWithoutFavorite = 0;
    if (villager.status === "unhappy") villager.status = "healthy";
    state.town.happiness += 1;
    logs.push(`${villager.name}は好みの${item.name}に満足した。幸せ度 +1`);
    return villager.id;
  }

  function applyCustomerSuccessEffects(state, customer, item, policy, logs) {
    const wanted = customerWantsItem(state, customer, item);
    let happiness = 0;
    let reputation = 0;
    let wealth = 0;
    let defense = 0;
    if (customer.typeId === "villager" && wanted) happiness += Game.Items.randomInt(1, 3);
    if (customer.typeId === "child" && policy.id === "cheap") happiness += 3;
    if (customer.typeId === "adventurer" && (isWeaponOrArmor(item) || Game.Items.isHealingItem(item) || item.id === "torch")) reputation += 1;
    if (customer.typeId === "traveler" && isRareItem(item)) {
      reputation += 3;
      wealth += 2;
    }
    if (customer.typeId === "merchant" && (wanted || isRareItem(item))) {
      reputation += 1;
      wealth += 1;
    }
    if (customer.typeId === "soldier" && (isWeaponOrArmor(item) || Game.Items.isHealingItem(item) || item.id === "torch")) defense += 1;
    if (wanted && policy.id === "cheap") happiness += 1;
    if (wanted && policy.id === "expensive") reputation += 1;
    state.town.happiness += happiness;
    state.shop.reputation += reputation + (reputation > 0 && Game.Weapons ? Game.Weapons.effectBonus(state, "reputationGain") : 0);
    state.town.wealth += wealth;
    state.town.defense += defense;
    if (happiness > 0) logs.push(`${customer.name}は満足して帰った。幸せ度 +${happiness}`);
    if (reputation > 0) logs.push(`店の評判 +${reputation}`);
    if (wealth > 0) logs.push(`珍しい品が話題になり、豊かさ +${wealth}`);
    if (defense > 0) logs.push(`守りの備えが整い、防衛力 +${defense}`);
    if (defense > 0 && Game.Objectives) Game.Objectives.track(state, "defenseGain", { amount: defense }, logs);
  }

  function saleReaction(state, customer, item, policy, success, wanted, price) {
    if (success) {
      if (customer.typeId === "villager" && wanted) return `${customer.name}は${item.name}を買って安心した。`;
      if (customer.typeId === "traveler" && isRareItem(item)) return `${customer.name}は${item.name}を見て目を輝かせた。`;
      if (customer.typeId === "soldier" && (isWeaponOrArmor(item) || Game.Items.isHealingItem(item) || item.id === "torch")) return `${customer.name}は${item.name}を買い、見回りに向かった。`;
      if (customer.typeId === "child" && policy.id === "cheap") return `${customer.name}は${item.name}を大事そうに抱えて笑った。`;
      if (customer.typeId === "adventurer" && (isWeaponOrArmor(item) || Game.Items.isHealingItem(item) || item.id === "torch")) return `${customer.name}は${item.name}を手に、次の探索へ向かった。`;
      if (wanted) return `${customer.name}は${item.name}を気に入り、満足して帰った。`;
      return `${customer.name}は少し迷いながらも${item.name}を買ってくれた。`;
    }
    if (price > customer.budget || policy.id === "expensive") return `少し高すぎるようだ。${customer.name}は首を横に振った。`;
    if (!wanted) return `欲しい物とは違ったようだ。${customer.name}は別の棚を見ている。`;
    return `${customer.name}は迷ったが、何も買わずに帰った。`;
  }

  function addTrust(state, customer, amount) {
    const villager = currentVillager(state, customer);
    if (villager) {
      villager.creditTrust = Game.State.clamp(Math.round((villager.creditTrust || 55) + amount), 0, 100);
      return villager.creditTrust;
    }
    ensureCreditState(state);
    const key = creditKey(customer);
    const record = state.shop.customerCredit[key] || { trust: customer.typeId === "soldier" ? 58 : 45, blocked: false };
    record.trust = Game.State.clamp(Math.round((record.trust || 45) + amount), 0, 100);
    state.shop.customerCredit[key] = record;
    return record.trust;
  }

  function customerTrust(state, customer) {
    const villager = currentVillager(state, customer);
    if (villager) return villager.creditTrust || 55;
    ensureCreditState(state);
    const record = state.shop.customerCredit[creditKey(customer)];
    return record && typeof record.trust === "number" ? record.trust : customer.typeId === "soldier" ? 58 : 45;
  }

  function creditStatus(state, customer, item, amount) {
    ensureCreditState(state);
    const villager = currentVillager(state, customer);
    const record = state.shop.customerCredit[creditKey(customer)] || {};
    const unpaid = unpaidCreditsForCustomer(state, customer);
    const totalBalance = creditBalance(state);
    const limit = Math.max(120, (state.shop.level || 1) * 300);
    if (customer.typeId === "traveler") return { ok: false, reason: "旅人にはツケ払いできない" };
    if (customer.typeId === "merchant") return { ok: false, reason: "初来店の商人にはツケ払いできない" };
    if (villager && villager.status === "dead") return { ok: false, reason: "この村人のツケは回収できない" };
    if (villager && villager.creditBlocked) return { ok: false, reason: "この客はツケ払い不可にしている" };
    if (!villager && record.blocked) return { ok: false, reason: "この客はツケ払い不可にしている" };
    if (!(villager || customer.typeId === "soldier" || (customer.typeId === "adventurer" && customer.creditEligible))) {
      return { ok: false, reason: "まだ信用が足りない" };
    }
    if (unpaid.length >= 2) return { ok: false, reason: "未払いが多すぎる" };
    if (totalBalance + amount > limit) return { ok: false, reason: "店の資金繰りが苦しいため、これ以上ツケを増やせない" };
    return { ok: true, reason: amount > customer.budget ? `${amount - customer.budget}G足りないがツケなら渡せる` : "信用できる客なのでツケ払いできる" };
  }

  function finishCustomerResult(state, session, result, logs) {
    session.customerStage = result.credit ? "credit" : result.denied ? "leave" : result.success ? "sold" : "failed";
    session.lastResult = result;
    session.resultLogs.push(...logs);
    session.resultLogs = session.resultLogs.slice(-20);
    session.waitingNext = true;
    Game.State.updateDerivedStats(state);
  }

  function sellToCustomer(state, policyId) {
    const session = state.saleSession;
    const customer = currentCustomer(state);
    const policy = PRICE_POLICIES[policyId] || PRICE_POLICIES.normal;
    const logs = [];
    if (!session || !session.active || !customer) return { ok: false, done: false, logs: ["今は接客中ではない。"], sound: "error" };
    if (session.waitingNext) return { ok: false, done: false, logs: ["次の客へ進めよう。"], sound: "error" };
    const candidate = candidateByKey(state, session.currentBroughtItemKey);
    if (!candidate) return { ok: false, done: false, logs: ["客がレジに持ってきた商品だけを販売できる。"], sound: "error" };

    const item = candidate.item;
    const price = priceForPolicy(state, item, policy.id);
    const chance = saleSuccessChance(state, customer, item, policy.id);
    const success = Game.Items.chance(chance);
    const wanted = customerWantsItem(state, customer, item);
    const reaction = saleReaction(state, customer, item, policy, success, wanted, price);
    let message = "";

    if (success) {
      removeCandidate(state, candidate);
      session.currentBroughtItem = item;
      session.currentBroughtItemKey = null;
      state.hero.gold += price;
      session.revenue += price;
      session.soldCount += 1;
      session.soldItemIds.push(item.id);
      const specificVillagerId = markSpecificVillagerFavorite(state, customer, item, logs);
      const matchedVillager = Game.Villagers.recordSoldItem(state, item, logs);
      applyCustomerSuccessEffects(state, customer, item, policy, logs);
      if (Game.Objectives) Game.Objectives.track(state, "sell", { item, customer, villagerId: specificVillagerId || (matchedVillager && matchedVillager.id) || null }, logs);
      message = `${customer.name}に${item.name}を${policy.resultLabel}で売った。${reaction} +${price}G`;
      logs.unshift(message);
    } else {
      if (policy.id === "expensive") {
        state.shop.reputation -= 1;
        logs.push("高値を警戒され、店の評判 -1");
      }
      message = `${customer.name}に${item.name}を${policy.resultLabel}ですすめたが、買ってもらえなかった。${reaction}`;
      logs.unshift(message);
    }

    finishCustomerResult(state, session, { success, customerName: customer.name, itemName: item.name, itemUid: item.uid, itemLabel: Game.Items.itemLabel(item), policyLabel: policy.label, price, chance, wanted, message, reaction, shelfNumber: candidate.index + 1 }, logs);
    session.selectedItem = null;
    return {
      ok: success,
      done: false,
      logs,
      sound: success ? (isRareItem(item) ? "rareSell" : "sell") : "error",
      happySound: success && logs.some((log) => log.includes("幸せ度 +"))
    };
  }

  function sellOnCredit(state) {
    const session = state.saleSession;
    const customer = currentCustomer(state);
    const logs = [];
    if (!session || !session.active || !customer) return { ok: false, logs: ["今は接客中ではない。"], sound: "error" };
    if (session.waitingNext) return { ok: false, logs: ["次の客へ進めよう。"], sound: "error" };
    const candidate = candidateByKey(state, session.currentBroughtItemKey);
    if (!candidate) return { ok: false, logs: ["ツケにできる商品がレジにない。"], sound: "error" };
    const item = candidate.item;
    const amount = priceForPolicy(state, item, "normal");
    const status = creditStatus(state, customer, item, amount);
    if (!status.ok) return { ok: false, logs: [status.reason], sound: "error" };

    removeCandidate(state, candidate);
    session.currentBroughtItem = item;
    session.currentBroughtItemKey = null;
    session.soldCount += 1;
    session.creditCount = (session.creditCount || 0) + 1;
    session.creditAmount = (session.creditAmount || 0) + amount;
    session.soldItemIds.push(item.id);

    const trustAtSale = addTrust(state, customer, 5);
    state.town.happiness += 2;
    state.shop.reputation += 1;
    const specificVillagerId = markSpecificVillagerFavorite(state, customer, item, logs);
    const matchedVillager = Game.Villagers.recordSoldItem(state, item, logs);
    applyCustomerSuccessEffects(state, customer, item, PRICE_POLICIES.normal, logs);
    if (Game.Objectives) Game.Objectives.track(state, "sell", { item, customer, villagerId: specificVillagerId || (matchedVillager && matchedVillager.id) || null }, logs);

    const entry = {
      id: `credit_${state.day}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      customerName: customer.name,
      customerType: customer.typeLabel,
      customerTypeId: customer.typeId,
      creditKey: creditKey(customer),
      villagerId: customer.villagerId || null,
      itemName: item.name,
      itemId: item.id,
      amount,
      originalPrice: amount,
      dayCreated: state.day,
      dueDay: state.day + 3,
      status: "unpaid",
      trustAtSale,
      paidAmount: 0
    };
    state.shop.creditLedger.push(entry);

    const reaction = `${customer.name}に${item.name}をツケで渡した。支払い予定日は${entry.dueDay}日目。`;
    const message = `${reaction} ツケ帳に記録した。`;
    logs.unshift(message);
    finishCustomerResult(state, session, {
      success: true,
      credit: true,
      customerName: customer.name,
      itemName: item.name,
      itemUid: item.uid,
      itemLabel: Game.Items.itemLabel(item),
      policyLabel: "ツケ払い",
      price: amount,
      chance: 100,
      wanted: true,
      message,
      reaction,
      shelfNumber: candidate.index + 1,
      dueDay: entry.dueDay
    }, logs);
    return { ok: true, logs, sound: "questAccept", happySound: true };
  }

  function denySale(state) {
    const session = state.saleSession;
    const customer = currentCustomer(state);
    const logs = [];
    if (!session || !session.active || !customer) return { ok: false, logs: ["今は接客中ではない。"], sound: "error" };
    if (session.waitingNext) return { ok: false, logs: ["次の客へ進めよう。"], sound: "error" };
    const candidate = currentBroughtCandidate(state);
    const item = candidate && candidate.item;
    const message = item
      ? `${customer.name}には${item.name}を売らなかった。商品は棚に戻された。`
      : `${customer.name}には売れる商品がなかった。`;
    if (customer.villagerId && Game.Items.chance(35)) state.town.happiness -= 1;
    logs.push(message);
    finishCustomerResult(state, session, {
      success: false,
      denied: true,
      customerName: customer.name,
      itemName: item ? item.name : "",
      itemUid: item ? item.uid : "",
      itemLabel: item ? Game.Items.itemLabel(item) : "",
      policyLabel: "売らない",
      price: 0,
      chance: 0,
      wanted: Boolean(item),
      message,
      reaction: `${customer.name}は小さくうなずき、店を出た。`,
      shelfNumber: candidate ? candidate.index + 1 : 0
    }, logs);
    return { ok: true, logs, sound: "button" };
  }

  function nextCustomer(state) {
    const session = state.saleSession;
    const logs = [];
    if (!session || !session.active) return { done: true, logs };
    const customer = currentCustomer(state);
    if (customer && !session.waitingNext) {
      logs.push(`${customer.name}は品物を決めずに店を出た。`);
      session.resultLogs.push(...logs);
      session.resultLogs = session.resultLogs.slice(-20);
    }
    session.index += 1;
    session.selectedItem = null;
    session.currentBroughtItemKey = null;
    session.currentBroughtItem = null;
    session.currentBroughtShelfIndex = null;
    session.currentBroughtReason = "";
    session.currentBroughtDesire = 0;
    session.waitingNext = false;
    session.lastResult = null;
    session.customerStage = "enter";
    session.rpgMode = "main";
    if (session.index >= session.total) return { done: true, logs: logs.concat(finishManualSale(state)) };
    const prepared = prepareCurrentCustomer(state);
    return { done: false, logs: logs.concat(prepared.logs), customer: currentCustomer(state) };
  }

  function endManualSale(state) {
    const session = state.saleSession;
    const logs = [];
    if (!session || !session.active) return logs;
    const customer = currentCustomer(state);
    if (customer && !session.waitingNext) logs.push(`${customer.name}は店を出た。`);
    logs.push("今日はここで販売を終了した。");
    return logs.concat(finishManualSale(state));
  }

  function finishManualSale(state) {
    const session = state.saleSession;
    const logs = [];
    if (!session) return logs;
    Game.Villagers.finishSaleDay(state, logs);
    if (session.soldCount <= 0) {
      state.shop.reputation -= 2;
      state.town.happiness -= 1;
      logs.push("今夜は一つも売れず、評判と幸せ度が少し下がった。");
    } else {
      state.shop.reputation += Math.max(0, Math.floor(session.soldCount / 2));
      state.town.wealth += Math.ceil(session.revenue / 140);
      state.town.happiness += 1 + Game.Items.getEquipmentBonus(state, "happyBonus");
    }
    state.lastSale = { customers: session.total, revenue: session.revenue, soldCount: session.soldCount, soldItemIds: session.soldItemIds.slice(), creditCount: session.creditCount || 0, creditAmount: session.creditAmount || 0 };
    logs.push(`本日の現金売上は${session.revenue}G。`);
    if (session.creditCount > 0) logs.push(`ツケ払いは${session.creditCount}件、売掛${session.creditAmount}G。`);
    state.saleSession = null;
    Game.State.updateDerivedStats(state);
    return logs;
  }

  function runNightSale(state) {
    const logs = [];
    let revenue = 0;
    let soldCount = 0;
    const soldItemIds = [];
    const shelves = state.shop.shelfItems.splice(0);
    const customers = Math.max(0, Math.round(state.town.population * 0.5 + state.shop.reputation * 0.3 + state.town.level * 3 + Game.Items.randomInt(-2, 4)));

    state.phase = "\u591c";
    state.today.nightSaleDone = true;
    Game.Villagers.beginSaleDay(state);
    logs.push("\u304a\u307e\u304b\u305b\u8ca9\u58f2\u3092\u9078\u3093\u3060\u3002\u68da\u306e\u5546\u54c1\u3092\u3059\u3079\u3066\u5b89\u3081\u306b\u58f2\u308b\u3002");
    logs.push(customers <= 2 ? "\u4eca\u65e5\u306f\u5ba2\u8db3\u304c\u5c11\u306a\u304b\u3063\u305f\u3002" : `${customers}\u4eba\u307b\u3069\u304c\u5e97\u3092\u306e\u305e\u3044\u305f\u3002`);

    shelves.forEach((item) => {
      if (Game.Items.chance(saleChance(state, item, customers) + 14)) {
        const price = Math.max(1, Math.round(estimateSalePrice(state, item) * 0.7));
        revenue += price;
        soldCount += 1;
        soldItemIds.push(item.id);
        const matchedVillager = Game.Villagers.recordSoldItem(state, item, logs);
        if (Game.Objectives) Game.Objectives.track(state, "sell", { item, villagerId: matchedVillager && matchedVillager.id }, logs);
        if (Game.Audio) Game.Audio.playSfx(item.rarity === "\u5e0c\u5c11" || item.rarity === "\u4f1d\u8aac" ? "rareSell" : "sell");
        const buyer = matchedVillager ? matchedVillager.name : price >= 180 ? "\u65c5\u4eba" : "\u6751\u4eba";
        const adverb = price >= 250 ? "\u9ad8\u5024\u3067" : "";
        logs.push(`${buyer}\u304c${item.name}\u3092${adverb}\u8cb7\u3063\u3066\u3044\u3063\u305f\u3002 +${price}G`);
      } else if (state.shop.storage.length < state.shop.storageCapacity) {
        state.shop.storage.push(item);
        logs.push(`${item.name}\u306f\u58f2\u308c\u6b8b\u3063\u305f\u3002`);
      } else {
        logs.push(`${item.name}\u306f\u58f2\u308c\u6b8b\u3063\u305f\u304c\u3001\u5009\u5eab\u306b\u7a7a\u304d\u304c\u306a\u304f\u51e6\u5206\u3057\u305f\u3002`);
      }
    });

    if (!shelves.length) {
      state.shop.reputation -= 2;
      state.town.happiness -= 1;
      logs.push("\u68da\u304c\u7a7a\u306e\u307e\u307e\u591c\u3092\u8fce\u3048\u3001\u8a55\u5224\u304c\u5c11\u3057\u4e0b\u304c\u3063\u305f\u3002");
    } else {
      state.shop.reputation += Math.max(0, Math.floor(soldCount / 3));
      state.town.wealth += Math.ceil(revenue / 180);
      state.town.happiness += soldCount > 0 ? 1 + Game.Items.getEquipmentBonus(state, "happyBonus") : -1;
      if (soldCount > 0) logs.push("\u5b89\u58f2\u308a\u3067\u58f2\u308c\u3084\u3059\u3044\u304c\u3001\u58f2\u4e0a\u3068\u8a55\u5224\u306e\u4f38\u3073\u306f\u63a7\u3048\u3081\u3060\u3002");
    }

    Game.Villagers.finishSaleDay(state, logs);
    state.hero.gold += revenue;
    state.lastSale = { customers, revenue, soldCount, soldItemIds };
    logs.push(`\u672c\u65e5\u306e\u58f2\u4e0a\u306f${revenue}G\u3002`);
    Game.State.updateDerivedStats(state);
    return logs;
  }

  function creditPaymentChance(state, entry) {
    const villager = entry.villagerId ? (state.villagers || []).find((person) => person.id === entry.villagerId) : null;
    const trust = villager ? villager.creditTrust || entry.trustAtSale || 55 : entry.trustAtSale || 45;
    const unpaidCount = state.shop.creditLedger.filter((item) => item.customerName === entry.customerName && ["unpaid", "late"].includes(item.status)).length;
    const amountPressure = Math.min(28, remainingCredit(entry) * 0.06);
    const reminderBonus = entry.reminded ? 10 : 0;
    const base = 32 + trust * 0.34 + state.town.happiness * 0.12 + state.town.wealth * 0.06 + reminderBonus - unpaidCount * 4 - amountPressure;
    return Game.State.clamp(Math.round(base), 12, 92);
  }

  function processCreditPayments(state) {
    ensureCreditState(state);
    const logs = [];
    state.shop.creditLedger.forEach((entry) => {
      if (!["unpaid", "late"].includes(entry.status) || entry.dueDay > state.day) return;
      const remaining = remainingCredit(entry);
      if (remaining <= 0) {
        entry.status = "paid";
        return;
      }
      const villager = entry.villagerId ? (state.villagers || []).find((person) => person.id === entry.villagerId) : null;
      if (entry.villagerId && (!villager || villager.status === "dead")) {
        entry.status = "defaulted";
        entry.defaultReason = "回収不能";
        state.shop.reputation -= 1;
        logs.push(`${entry.customerName}の${entry.itemName}代${remaining}Gは回収不能になった。`);
        return;
      }
      const chance = creditPaymentChance(state, entry);
      const roll = Math.random() * 100;
      if (roll <= chance) {
        entry.paidAmount = entry.amount;
        entry.status = "paid";
        state.hero.gold += remaining;
        state.shop.reputation += 1;
        if (villager) villager.creditTrust = Game.State.clamp((villager.creditTrust || 55) + 2, 0, 100);
        logs.push(`${entry.customerName}がツケの${entry.itemName}代${remaining}Gを支払った。`);
        if (Game.Audio) Game.Audio.playSfx("questComplete");
      } else if (roll <= chance + 22 && remaining >= 30) {
        const paid = Math.max(10, Math.min(remaining - 1, Math.round(remaining * (0.35 + Math.random() * 0.3))));
        entry.paidAmount += paid;
        entry.status = "late";
        entry.dueDay = state.day + 2;
        state.hero.gold += paid;
        logs.push(`${entry.customerName}がツケを${paid}Gだけ支払った。残り${remainingCredit(entry)}Gは${entry.dueDay}日目まで待つことにした。`);
      } else if (entry.status === "late" && roll > 88) {
        entry.status = "defaulted";
        state.shop.reputation -= 1;
        state.town.happiness -= 1;
        if (villager) villager.creditTrust = Game.State.clamp((villager.creditTrust || 55) - 5, 0, 100);
        logs.push(`${entry.customerName}の${entry.itemName}代${remaining}Gは踏み倒された。`);
      } else {
        entry.status = "late";
        entry.dueDay = state.day + 2;
        if (villager) villager.creditTrust = Game.State.clamp((villager.creditTrust || 55) - 1, 0, 100);
        logs.push(`${entry.customerName}はツケの支払いを${entry.dueDay}日目まで延ばしてほしいと言った。`);
      }
      entry.reminded = false;
    });
    return logs;
  }

  function creditLedgerSummary(state) {
    ensureCreditState(state);
    const unpaid = state.shop.creditLedger.filter((entry) => ["unpaid", "late"].includes(entry.status));
    const paid = state.shop.creditLedger.filter((entry) => entry.status === "paid");
    const defaulted = state.shop.creditLedger.filter((entry) => entry.status === "defaulted");
    return {
      unpaid,
      paid,
      defaulted,
      balance: creditBalance(state),
      limit: Math.max(120, (state.shop.level || 1) * 300)
    };
  }

  function handleCreditAction(state, id, action) {
    ensureCreditState(state);
    const entry = state.shop.creditLedger.find((item) => item.id === id);
    if (!entry || !["unpaid", "late"].includes(entry.status)) return ["対応できるツケがない。"];
    const logs = [];
    const villager = entry.villagerId ? (state.villagers || []).find((person) => person.id === entry.villagerId) : null;
    if (action === "remind") {
      entry.reminded = true;
      if (villager && Game.Items.chance(35)) villager.creditTrust = Game.State.clamp((villager.creditTrust || 55) - 1, 0, 100);
      logs.push(`${entry.customerName}にやさしく支払い予定を確認した。次の回収判定が少し良くなる。`);
    } else if (action === "wait") {
      entry.status = "late";
      entry.dueDay = Math.max(entry.dueDay, state.day) + 2;
      if (villager) villager.creditTrust = Game.State.clamp((villager.creditTrust || 55) + 1, 0, 100);
      logs.push(`${entry.customerName}の支払いを${entry.dueDay}日目まで待つことにした。`);
    } else if (action === "block") {
      if (villager) villager.creditBlocked = true;
      else {
        const record = state.shop.customerCredit[entry.creditKey] || { trust: entry.trustAtSale || 40, blocked: false };
        record.blocked = true;
        record.trust = Game.State.clamp((record.trust || 40) - 8, 0, 100);
        state.shop.customerCredit[entry.creditKey] = record;
      }
      state.town.happiness -= entry.villagerId ? 1 : 0;
      logs.push(`${entry.customerName}には今後ツケ払いを許可しないことにした。`);
    } else {
      logs.push("その対応は選べない。");
    }
    Game.State.updateDerivedStats(state);
    return logs;
  }

  function storageSummary(state) {
    return state.shop.storage.reduce((summary, item) => {
      const label = item.kind === "equipment" ? Game.Items.equipmentLabel(item) : Game.Items.itemLabel(item);
      summary[label] = (summary[label] || 0) + 1;
      return summary;
    }, {});
  }

  Game.Shop = {
    PRICE_POLICIES,
    CUSTOMER_TYPES,
    addToShelf,
    removeFromShelf,
    autoArrange,
    estimateSalePrice,
    priceForPolicy,
    saleSuccessChance,
    startManualSale,
    currentCustomer,
    saleCandidates,
    currentBroughtCandidate,
    findBroughtItemForCustomer,
    selectSaleItem,
    setSaleMenuMode,
    recommendSaleItem,
    recommendCandidate,
    creditStatus,
    creditLedgerSummary,
    processCreditPayments,
    handleCreditAction,
    sellToCustomer,
    sellOnCredit,
    denySale,
    nextCustomer,
    endManualSale,
    finishManualSale,
    runNightSale,
    storageSummary
  };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const BUILDING_DEFS = [
    { id: "shop", name: "\u9053\u5177\u5c4b", symbol: "\u5e97", x: 2, y: 2, action: "openShop", description: "\u5546\u54c1\u3092\u68da\u306b\u4e26\u3079\u308b\u5834\u6240\u3002" },
    { id: "hospital", name: "病院", symbol: "医", x: 3, y: 1, action: "openHospital", description: "負傷した村人の状態を確認する場所。" },
    { id: "blacksmith", name: "\u935b\u51b6\u5c4b", symbol: "\u935b", x: 5, y: 2, action: "openBlacksmith", description: "\u7d20\u6750\u3067\u88c5\u5099\u3092\u4f5c\u308a\u3001\u5f37\u5316\u3059\u308b\u3002", visible: (state) => state.buildings.blacksmithLevel > 0 },
    { id: "weapon_shop", name: "\u6b66\u5668\u5c4b", symbol: "\u6b66", x: 6, y: 1, action: "openBlacksmith", description: "\u6b66\u5668\u306e\u4f5c\u6210\u3001\u9032\u5316\u3001\u5408\u6210\u3092\u6271\u3046\u5e97\u3002", visible: (state) => state.buildings.weaponShopLevel > 0 },
    { id: "warehouse", name: "\u5009\u5eab", symbol: "\u5009", x: 7, y: 2, action: "openWarehouse", description: "\u6301\u3061\u5e30\u3063\u305f\u54c1\u3092\u4fdd\u7ba1\u3059\u308b\u3002" },
    { id: "hall", name: "\u753a\u5f79\u5834", symbol: "\u5f79", x: 4, y: 4, action: "openTown", description: "\u753a\u3068\u5e97\u306b\u6295\u8cc7\u3059\u308b\u3002" },
    { id: "dungeon_gate", name: "\u8ff7\u5bae\u9580", symbol: "\u9580", x: 8, y: 5, action: "enterDungeon", description: "\u4ed5\u5165\u308c\u306e\u8ff7\u5bae\u3078\u5411\u304b\u3046\u3002" },
    { id: "houses", name: "\u4f4f\u5b85", symbol: "\u5bb6", x: 1, y: 5, action: null, description: "\u4eba\u53e3\u4e0a\u9650\u3092\u652f\u3048\u308b\u5bb6\u3002", visible: (state) => state.town.populationCap > 5 },
    { id: "watchtower", name: "\u898b\u5f35\u308a\u53f0", symbol: "\u898b", x: 8, y: 1, action: null, description: "\u8972\u6483\u306b\u5099\u3048\u308b\u5efa\u7269\u3002", visible: (state) => state.town.defense >= 25 },
    { id: "square", name: "\u5e83\u5834", symbol: "\u5e83", x: 5, y: 5, action: "openQuests", description: "\u6751\u4eba\u306e\u304a\u9858\u3044\u3092\u78ba\u8a8d\u3059\u308b\u5834\u6240\u3002", visible: (state) => state.town.happiness >= 60 || state.town.level >= 2 },
    { id: "tavern", name: "\u9152\u5834", symbol: "\u9152", x: 2, y: 6, action: null, description: "\u753a\u30ec\u30d9\u30eb2\u3067\u958b\u5e97\u3002\u65c5\u4eba\u304c\u5897\u3048\u308b\u3002", visible: (state) => state.buildings.tavernBuilt || state.town.level >= 2 },
    { id: "guild", name: "\u5192\u967a\u8005\u30ae\u30eb\u30c9", symbol: "\u30ae", x: 7, y: 6, action: null, description: "\u753a\u30ec\u30d9\u30eb3\u3067\u958b\u653e\u3002\u5c06\u6765\u306e\u4f9d\u983c\u6a5f\u80fd\u7528\u3002", visible: (state) => state.buildings.guildBuilt || state.town.level >= 3 }
  ];

  const LARGE_TOWN_BUILDINGS = [
    { id: "shop", name: "お店", symbol: "店", x: 43, y: 40, action: "openShop", description: "棚に商品を並べ、夜の販売へ備える店。" },
    { id: "item_shop", name: "道具屋", symbol: "道", x: 36, y: 32, action: "openShop", description: "薬草やたいまつなどを扱う商店。" },
    { id: "hospital", name: "病院", symbol: "医", x: 52, y: 28, action: "openHospital", description: "負傷した村人の状態を確認する場所。" },
    { id: "blacksmith", name: "鍛冶屋", symbol: "鍛", x: 60, y: 39, action: "openBlacksmith", description: "素材で装備を作り、強化する。", visible: (state) => state.buildings.blacksmithLevel > 0 },
    { id: "weapon_shop", name: "武器屋", symbol: "武", x: 67, y: 32, action: "openBlacksmith", description: "武器の作成、進化、合成を扱う店。", visible: (state) => state.buildings.weaponShopLevel > 0 },
    { id: "synthesis_shop", name: "合成屋", symbol: "合", x: 66, y: 48, action: "openBlacksmith", description: "武器合成や特殊効果の引き継ぎを相談できる店。", visible: (state) => state.buildings.blacksmithLevel >= 2 || state.buildings.weaponShopLevel >= 1 },
    { id: "warehouse", name: "倉庫", symbol: "倉", x: 73, y: 42, action: "openWarehouse", description: "持ち帰った品を保管する。" },
    { id: "hall", name: "町役場", symbol: "役", x: 49, y: 43, action: "openTown", description: "町と店に投資する。" },
    { id: "dungeon_gate", name: "迷宮門", symbol: "門", x: 55, y: 47, action: "enterDungeon", description: "仕入れの迷宮へ向かう。" },
    { id: "houses", name: "住宅", symbol: "家", x: 32, y: 54, action: null, description: "人口上限を支える家。", visible: (state) => state.town.populationCap > 5 },
    { id: "watchtower", name: "見張り台", symbol: "見", x: 77, y: 26, action: null, description: "襲撃に備える建物。", visible: (state) => state.town.defense >= 25 },
    { id: "square", name: "広場", symbol: "広", x: 50, y: 50, action: "openQuests", description: "村人のお願いを確認する場所。", visible: (state) => state.town.happiness >= 60 || state.town.level >= 2 },
    { id: "tavern", name: "酒場", symbol: "酒", x: 40, y: 55, action: null, description: "町レベル2で開店。旅人が増える。", visible: (state) => state.buildings.tavernBuilt || state.town.level >= 2 },
    { id: "guild", name: "冒険者ギルド", symbol: "ギ", x: 60, y: 55, action: null, description: "町レベル3で開放。将来の依頼機能用。", visible: (state) => state.buildings.guildBuilt || state.town.level >= 3 }
  ];

  const VILLAGERS = [
    {
      id: "mira",
      name: "\u30df\u30e9",
      job: "\u8fb2\u5bb6",
      css: "villager-green",
      x: 46,
      y: 47,
      minTownLevel: 1,
      lines: [
        "\u4eba\u304c\u5897\u3048\u308c\u3070\u3001\u591c\u306e\u5e97\u3082\u3082\u3063\u3068\u306b\u304e\u3084\u304b\u306b\u306a\u308b\u3088\u3002",
        "\u5e83\u5834\u304c\u3042\u308b\u3068\u3001\u307f\u3093\u306a\u306e\u6c17\u5206\u304c\u660e\u308b\u304f\u306a\u308b\u306d\u3002"
      ]
    },
    {
      id: "gantz",
      name: "\u30ac\u30f3\u30c4",
      job: "\u935b\u51b6\u898b\u7fd2\u3044",
      css: "villager-smith",
      x: 61,
      y: 41,
      minTownLevel: 1,
      lines: [
        "\u5f37\u5316\u3057\u305f\u3044\u88c5\u5099\u306f\u3001\u5148\u306b\u88c5\u5099\u753b\u9762\u3067\u8eab\u306b\u3064\u3051\u308b\u3093\u3060\u3002",
        "\u5f37\u5316\u306b\u306f\u7d20\u67501\u500b\u3068G\u304c\u8981\u308b\u3002\u935b\u51b6\u5c4bLv\u304c\u4e0a\u304c\u308b\u3068\u8cbb\u7528\u304c\u4e0b\u304c\u308b\u305e\u3002"
      ]
    },
    {
      id: "rito",
      name: "\u30ea\u30c8",
      job: "\u898b\u5f35\u308a",
      css: "villager-guard",
      x: 76,
      y: 29,
      minTownLevel: 1,
      lines: [
        "\u753a\u304c\u8c4a\u304b\u306b\u306a\u308b\u307b\u3069\u3001\u8972\u6483\u306e\u76ee\u3082\u5411\u304d\u3084\u3059\u3044\u3002\u898b\u5f35\u308a\u53f0\u306f\u5927\u4e8b\u3060\u3002",
        "\u6cbb\u5b89\u3068\u9632\u885b\u529b\u304c\u3042\u308c\u3070\u3001\u591c\u3082\u80f8\u3092\u5f35\u3063\u3066\u898b\u56de\u308c\u308b\u3002"
      ]
    },
    {
      id: "sena",
      name: "\u30bb\u30ca",
      job: "\u65c5\u4eba",
      css: "villager-traveler",
      x: 41,
      y: 57,
      minTownLevel: 2,
      lines: [
        "\u73cd\u3057\u3044\u5546\u54c1\u304c\u68da\u306b\u4e26\u3076\u3068\u3001\u9060\u304f\u304b\u3089\u5ba2\u304c\u6765\u308b\u3088\u3002",
        "\u9152\u5834\u304c\u3067\u304d\u3066\u304b\u3089\u3001\u3053\u306e\u753a\u306f\u901a\u308a\u3084\u3059\u304f\u306a\u3063\u305f\u306d\u3002"
      ]
    }
  ];

  const TOWN_INVEST_COSTS = [1000, 3000, 5000, 10000, 30000, 50000];
  const WAREHOUSE_EXPANSION_MAX = 30;
  const LEVEL_ONE_BLACKSMITH = { x: 38, y: 48, w: 6, h: 6 };

  function townInvestmentStage(state) {
    const value = Number(state.town.investmentStage);
    if (Number.isFinite(value)) return Game.State.clamp(Math.round(value), 0, TOWN_INVEST_COSTS.length);
    return 0;
  }

  function warehouseExpansionCount(state) {
    const saved = Number(state.shop.warehouseExpansions);
    if (Number.isFinite(saved)) return Game.State.clamp(Math.round(saved), 0, WAREHOUSE_EXPANSION_MAX);
    return Game.State.clamp(Math.floor(Math.max(0, (state.shop.storageCapacity || 30) - 30) / 10), 0, WAREHOUSE_EXPANSION_MAX);
  }

  const UPGRADE_OPTIONS = [
    {
      id: "townInvestment",
      name: "町に投資する",
      description: "町の基盤を整える。費用は1000G→3000G→5000G→10000G→30000G→50000G。",
      getCost: (state) => TOWN_INVEST_COSTS[townInvestmentStage(state)] || null,
      apply(state) {
        const nextStage = townInvestmentStage(state) + 1;
        state.town.investmentStage = nextStage;
        state.town.wealth += 10 + nextStage * 5;
        state.town.happiness += 2 + Math.floor(nextStage / 2);
        state.town.safety += 2;
        state.town.defense += 2;
        if (nextStage % 2 === 0) state.town.populationCap += 2;
        return `町への投資が${nextStage}段階目になった。`;
      }
    },
    {
      id: "warehouse",
      name: "倉庫を拡張する",
      description: "倉庫容量+10。費用は500Gから始まり、拡張ごとに500Gずつ高くなる。最大30回。",
      getCost: (state) => {
        const count = warehouseExpansionCount(state);
        return count >= WAREHOUSE_EXPANSION_MAX ? null : 500 * (count + 1);
      },
      apply(state) {
        const nextCount = warehouseExpansionCount(state) + 1;
        state.shop.warehouseExpansions = nextCount;
        state.shop.storageCapacity += 10;
        return `倉庫を拡張した。倉庫容量は${state.shop.storageCapacity}になった。`;
      }
    }
  ];

  UPGRADE_OPTIONS[0].name = "町に投資する";
  UPGRADE_OPTIONS[0].description = "町の基盤を整える。1回目の投資で鍛冶屋が開店する。";
  UPGRADE_OPTIONS[0].apply = function applyTownInvestment(state) {
    const nextStage = townInvestmentStage(state) + 1;
    const opensBlacksmith = nextStage === 1 && state.buildings.blacksmithLevel <= 0;
    state.town.investmentStage = nextStage;
    state.town.wealth += 10 + nextStage * 5;
    state.town.happiness += 2 + Math.floor(nextStage / 2);
    state.town.safety += 2;
    state.town.defense += 2;
    if (nextStage % 2 === 0) state.town.populationCap += 2;
    if (opensBlacksmith) {
      state.buildings.blacksmithLevel = 1;
      return `町への投資が${nextStage}段階目になった。鍛冶屋が店を開いた。`;
    }
    return `町への投資が${nextStage}段階目になった。`;
  };
  UPGRADE_OPTIONS[1].name = "倉庫を拡張する";
  UPGRADE_OPTIONS[1].description = "倉庫容量+10。費用は500Gから始まり、拡張ごとに500Gずつ高くなる。最大30回。";
  UPGRADE_OPTIONS[1].apply = function applyWarehouseExpansion(state) {
    const nextCount = warehouseExpansionCount(state) + 1;
    state.shop.warehouseExpansions = nextCount;
    state.shop.storageCapacity += 10;
    return `倉庫を拡張した。倉庫容量は${state.shop.storageCapacity}になった。`;
  };

  UPGRADE_OPTIONS[0].name = "町に投資する";
  UPGRADE_OPTIONS[0].description = "町の基盤を整える。1回目の投資をした翌朝、鍛冶職人が訪れる。";
  UPGRADE_OPTIONS[0].apply = function applyTownInvestmentV2(state) {
    const nextStage = townInvestmentStage(state) + 1;
    const invitesBlacksmith = nextStage === 1 && state.buildings.blacksmithLevel <= 0 && !state.flags.blacksmithArrivalShown;
    state.town.investmentStage = nextStage;
    state.town.wealth += 10 + nextStage * 5;
    state.town.happiness += 2 + Math.floor(nextStage / 2);
    state.town.safety += 2;
    state.town.defense += 2;
    if (nextStage % 2 === 0) state.town.populationCap += 2;
    if (invitesBlacksmith) {
      state.flags.blacksmithArrivalPending = true;
      return `町への投資が${nextStage}段階目になった。明日の朝、商売の気配を聞きつけて誰かが来そうだ。`;
    }
    return `町への投資が${nextStage}段階目になった。`;
  };
  UPGRADE_OPTIONS[1].name = "倉庫を拡張する";
  UPGRADE_OPTIONS[1].description = "倉庫容量+10。費用は500Gから始まり、拡張ごとに500Gずつ高くなる。最大30回。";
  UPGRADE_OPTIONS[1].apply = function applyWarehouseExpansionV2(state) {
    const nextCount = warehouseExpansionCount(state) + 1;
    state.shop.warehouseExpansions = nextCount;
    state.shop.storageCapacity += 10;
    return `倉庫を拡張した。倉庫容量は${state.shop.storageCapacity}になった。`;
  };

  const BLACKSMITH_RECIPES = [
    { id: "wood_sword", name: "\u6728\u306e\u5263\u3092\u4f5c\u308b", equipmentId: "wood_sword", cost: 180, materials: { sturdy_lumber: 1, cloth: 1 } },
    { id: "iron_sword", name: "\u9244\u306e\u5263\u3092\u4f5c\u308b", equipmentId: "iron_sword", cost: 360, materials: { scrap_iron: 2, sturdy_lumber: 1 } },
    { id: "silver_dagger", name: "銀の短剣を作る", equipmentId: "silver_dagger", cost: 520, materials: { silver_thread: 1, hard_bone: 1 } },
    { id: "magic_stone_sword", name: "魔石の剣を作る", equipmentId: "magic_stone_sword", cost: 760, materials: { mana_shard: 3, scrap_iron: 1 } },
    { id: "leather_clothes", name: "\u9769\u306e\u670d\u3092\u4f5c\u308b", equipmentId: "leather_clothes", cost: 260, materials: { beast_hide: 1, cloth: 2 } },
    { id: "lucky_ring", name: "\u5e78\u904b\u306e\u6307\u8f2a\u3092\u4f5c\u308b", equipmentId: "lucky_ring", cost: 520, materials: { mana_shard: 2, scrap_iron: 1 } },
    { id: "copper_sword", name: "\u9285\u306e\u5263\u3092\u4f5c\u308b", equipmentId: "copper_sword", cost: 260, materials: { copper_ore: 2, sturdy_lumber: 1 } },
    { id: "hunter_bow", name: "\u72e9\u4eba\u306e\u5f13\u3092\u4f5c\u308b", equipmentId: "hunter_bow", cost: 340, materials: { hard_bone: 1, sturdy_lumber: 2 } },
    { id: "chain_mail", name: "\u9396\u304b\u305f\u3073\u3089\u3092\u4f5c\u308b", equipmentId: "chain_mail", cost: 440, materials: { scrap_iron: 2, silver_thread: 1 } },
    { id: "guard_bracelet", name: "\u5b88\u308a\u306e\u8155\u8f2a\u3092\u4f5c\u308b", equipmentId: "guard_bracelet", cost: 380, materials: { copper_ore: 1, mana_shard: 1 } },
    { id: "cloth_bag", name: "\u5e03\u306e\u888b\u3092\u4f5c\u308b", equipmentId: "cloth_bag", cost: 220, materials: { cloth: 2 } },
    { id: "leather_bag", name: "\u9769\u306e\u9053\u5177\u888b\u3092\u4f5c\u308b", equipmentId: "leather_bag", cost: 420, materials: { cloth: 1, beast_hide: 2 } },
    { id: "expedition_pack", name: "\u5927\u5bb9\u91cf\u80cc\u8ca0\u3044\u888b\u3092\u4f5c\u308b", equipmentId: "expedition_pack", cost: 720, materials: { silver_thread: 1, beast_hide: 1, sturdy_lumber: 1 } }
  ];

  const ALWAYS_VISIBLE_LARGE_BUILDINGS = new Set([
    "shop",
    "item_shop",
    "hospital",
    "blacksmith",
    "weapon_shop",
    "synthesis_shop",
    "warehouse",
    "hall",
    "dungeon_gate"
  ]);

  const LARGE_BUILDING_LABELS = {
    shop: { name: "\u304a\u5e97", symbol: "\u5e97", x: 49, y: 42, footprint: { x: 44, y: 36, w: 10, h: 11 }, description: "\u68da\u306b\u5546\u54c1\u3092\u4e26\u3079\u3001\u591c\u306e\u8ca9\u58f2\u3078\u5099\u3048\u308b\u5e97\u3002" },
    item_shop: { name: "\u9053\u5177\u5c4b", symbol: "\u9053", description: "\u85ac\u8349\u3084\u305f\u3044\u307e\u3064\u306a\u3069\u3092\u6271\u3046\u5546\u5e97\u3002" },
    hospital: { name: "\u75c5\u9662", symbol: "\u533b", description: "\u8ca0\u50b7\u3057\u305f\u6751\u4eba\u306e\u72b6\u614b\u3092\u78ba\u8a8d\u3059\u308b\u5834\u6240\u3002" },
    blacksmith: { name: "\u935b\u51b6\u5c4b", symbol: "\u935b", description: "\u7d20\u6750\u3067\u88c5\u5099\u3092\u4f5c\u308a\u3001\u5f37\u5316\u3059\u308b\u3002" },
    weapon_shop: { name: "\u6b66\u5668\u5c4b", symbol: "\u6b66", description: "\u6b66\u5668\u306e\u4f5c\u6210\u3001\u9032\u5316\u3001\u5408\u6210\u3092\u6271\u3046\u5e97\u3002" },
    synthesis_shop: { name: "\u5408\u6210\u5c4b", symbol: "\u5408", description: "\u6b66\u5668\u5408\u6210\u3084\u7279\u6b8a\u52b9\u679c\u306e\u5f15\u304d\u7d99\u304e\u3092\u76f8\u8ac7\u3067\u304d\u308b\u5e97\u3002" },
    warehouse: { name: "\u5009\u5eab", symbol: "\u5009", description: "\u6301\u3061\u5e30\u3063\u305f\u54c1\u3092\u4fdd\u7ba1\u3059\u308b\u3002" },
    hall: { name: "\u753a\u5f79\u5834", symbol: "\u5f79", description: "\u753a\u3068\u5e97\u306b\u6295\u8cc7\u3059\u308b\u3002" },
    dungeon_gate: { name: "\u8ff7\u5bae\u9580", symbol: "\u9580", footprint: { x: 54, y: 46, w: 3, h: 3 }, description: "\u4ed5\u5165\u308c\u306e\u8ff7\u5bae\u3078\u5411\u304b\u3046\u3002" },
    houses: { name: "\u4f4f\u5b85", symbol: "\u5bb6", description: "\u4eba\u53e3\u4e0a\u9650\u3092\u652f\u3048\u308b\u5bb6\u3002" },
    watchtower: { name: "\u898b\u5f35\u308a\u53f0", symbol: "\u898b", description: "\u8972\u6483\u306b\u5099\u3048\u308b\u5efa\u7269\u3002" },
    square: { name: "\u5e83\u5834", symbol: "\u5e83", description: "\u6751\u4eba\u306e\u304a\u9858\u3044\u3092\u78ba\u8a8d\u3059\u308b\u5834\u6240\u3002" },
    tavern: { name: "\u9152\u5834", symbol: "\u9152", description: "\u753a\u30ec\u30d9\u30eb2\u3067\u958b\u5e97\u3002\u65c5\u4eba\u304c\u5897\u3048\u308b\u3002" },
    guild: { name: "\u5192\u967a\u8005\u30ae\u30eb\u30c9", symbol: "\u30ae", description: "\u753a\u30ec\u30d9\u30eb3\u3067\u958b\u653e\u3002\u5c06\u6765\u306e\u4f9d\u983c\u6a5f\u80fd\u7528\u3002" }
  };

  function normalizeLargeBuilding(building) {
    return Object.assign({}, building, LARGE_BUILDING_LABELS[building.id] || {});
  }

  function buildingUnlockLevel(building) {
    const levels = {
      shop: 1,
      square: 2,
      hall: 2,
      dungeon_gate: 1,
      item_shop: 2,
      warehouse: 3,
      houses: 3,
      hospital: 4,
      blacksmith: 5,
      watchtower: 5,
      weapon_shop: 6,
      tavern: 6,
      synthesis_shop: 7,
      guild: 8
    };
    return levels[building.id] || 10;
  }

  function getVisibleBuildings(state) {
    return LARGE_TOWN_BUILDINGS
      .map(normalizeLargeBuilding)
      .filter((building) => (state.town.level || 1) >= buildingUnlockLevel(building))
      .filter((building) => !building.visible || building.visible(state) || ALWAYS_VISIBLE_LARGE_BUILDINGS.has(building.id));
  }

  function getBuildingAt(state, x, y) {
    return getVisibleBuildings(state).find((building) => {
      if (building.id === "shop" && (state.town.level || 1) <= 1) return false;
      return pointInsideBuilding(building, x, y);
    }) || null;
  }

  function pointInsideBuilding(building, x, y) {
    if (!building) return false;
    const footprint = building.footprint;
    if (!footprint) return building.x === x && building.y === y;
    return x >= footprint.x && x < footprint.x + footprint.w && y >= footprint.y && y < footprint.y + footprint.h;
  }

  function getVisibleVillagers(state) {
    return Game.Villagers.visibleVillagers(state);
  }

  function getVillagerAt(state, x, y) {
    return Game.Villagers.getAt(state, x, y);
  }

  function directionFromDelta(dx, dy) {
    if (Game.Tilemap && Game.Tilemap.directionFromDelta) return Game.Tilemap.directionFromDelta(dx, dy);
    if (dy < 0) return "up";
    if (dy > 0) return "down";
    if (dx < 0) return "left";
    if (dx > 0) return "right";
    return null;
  }

  function frontOf(position, facing) {
    if (Game.Tilemap && Game.Tilemap.frontOf) return Game.Tilemap.frontOf(position, facing);
    const dirs = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    };
    const dir = dirs[facing] || dirs.down;
    return { x: position.x + dir.x, y: position.y + dir.y };
  }

  function inside(width, height, x, y) {
    if (Game.Tilemap && Game.Tilemap.inside) return Game.Tilemap.inside(width, height, x, y);
    return x >= 0 && y >= 0 && x < width && y < height;
  }

  function getFrontPosition(state) {
    return frontOf(state.townMap.hero, state.townMap.facing || "down");
  }

  function getInteractionTarget(state) {
    const hero = state.townMap.hero;
    const front = getFrontPosition(state);
    const positions = [
      hero,
      front,
      { x: hero.x + 1, y: hero.y },
      { x: hero.x - 1, y: hero.y },
      { x: hero.x, y: hero.y + 1 },
      { x: hero.x, y: hero.y - 1 }
    ];
    const seen = new Set();
    for (const position of positions) {
      const key = `${position.x},${position.y}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (!inside(state.townMap.width, state.townMap.height, position.x, position.y)) continue;
      const shopFacility = getLevelOneShopFacilityAt(state, position.x, position.y);
      if (shopFacility) return { type: "building", building: shopFacility, x: position.x, y: position.y };
      const villager = getVillagerAt(state, position.x, position.y);
      const building = getBuildingAt(state, position.x, position.y);
      if (villager) return { type: "villager", villager, x: position.x, y: position.y };
      if (building) return { type: "building", building, x: position.x, y: position.y };
    }
    if ((state.town.level || 1) <= 1 && hero.x >= 52 && hero.x <= 57 && hero.y >= 45 && hero.y <= 50) {
      const gate = getVisibleBuildings(state).find((building) => building.id === "dungeon_gate");
      if (gate) return { type: "building", building: gate, x: gate.x, y: gate.y };
    }
    return { type: "empty", x: front.x, y: front.y };
  }

  function getLevelOneShopFacilityAt(state, x, y) {
    if (!state || (state.town.level || 1) > 1) return null;
    if (isTownBlacksmithWorkbenchTile(state, x, y)) {
      return {
        id: "town_blacksmith",
        name: "鍛冶屋",
        symbol: "鍛",
        action: "openBlacksmith",
        description: "武器の強化と進化を行う鍛冶場。"
      };
    }
    if (isTownDevelopmentDeskTile(state, x, y)) {
      return {
        id: "town_development_desk",
        name: "投資棚",
        symbol: "投",
        action: "openTown",
        description: "町と倉庫へ投資するための棚。"
      };
    }
    if (isTownShopNameSignTile(state, x, y)) {
      return {
        id: "shop_name_sign",
        name: "店名看板",
        symbol: "名",
        action: "openShopName",
        description: "お店の名前を決められる看板。"
      };
    }
    if (isTownShopCounterTile(state, x, y)) {
      return {
        id: "shop_counter",
        name: "販売カウンター",
        symbol: "店",
        action: "openShop",
        description: "棚に商品を並べ、夜の販売へ備える。"
      };
    }
    if (isTownShopStorageTile(state, x, y)) {
      return {
        id: "shop_storage",
        name: "倉庫箱",
        symbol: "倉",
        action: "openWarehouse",
        description: "袋と倉庫の品を出し入れできる。"
      };
    }
    if (isTownShopBedTile(state, x, y) || isTownShopBedUseTile(state, x, y)) {
      return {
        id: "shop_bed",
        name: "ベッド",
        symbol: "眠",
        action: "sleep",
        description: "眠って翌朝を迎える。HPも回復する。"
      };
    }
    return null;
  }

  function talkToVillager(state) {
    const target = getInteractionTarget(state);
    const villager = target.villager;
    if (!villager) return ["\u8a71\u305b\u308b\u4eba\u304c\u8fd1\u304f\u306b\u3044\u306a\u3044\u3002"];
    const line = Game.Items.choose(villager.lines);
    state.lastConversation = { name: villager.name, job: villager.job, line };
    const logs = [`${villager.name}\u300c${line}\u300d`];
    if (Game.Objectives) Game.Objectives.handleVillagerTalk(state, villager, logs);
    return logs;
  }

  function buildingStage(state, building) {
    if (!building) return 1;
    if (building.id === "shop") return state.shop.level;
    if (building.id === "item_shop") return state.shop.level;
    if (building.id === "blacksmith") return state.buildings.blacksmithLevel;
    if (building.id === "weapon_shop") return state.buildings.weaponShopLevel;
    if (building.id === "synthesis_shop") return Math.max(state.buildings.blacksmithLevel, state.buildings.weaponShopLevel);
    if (building.id === "warehouse") return Game.State.clamp(1 + Math.floor((state.shop.storageCapacity - 30) / 10), 1, 3);
    if (building.id === "hall") return state.town.level;
    if (building.id === "dungeon_gate") return Game.State.clamp(1 + Math.floor(state.town.wealth / 40), 1, 3);
    if (building.id === "houses") return Game.State.clamp(1 + Math.floor((state.town.populationCap - 5) / 10), 1, 3);
    if (building.id === "watchtower") return Game.State.clamp(1 + Math.floor(state.town.defense / 35), 1, 3);
    if (building.id === "square") return state.town.happiness >= 80 ? 3 : state.town.happiness >= 60 ? 2 : 1;
    if (building.id === "tavern") return state.town.level >= 3 ? 2 : 1;
    if (building.id === "guild") return state.town.level >= 3 ? 2 : 1;
    return 1;
  }

  function isTownRoadTile(x, y) {
    return (x >= 18 && x <= 82 && y === 42) ||
      (y >= 18 && y <= 64 && x === 48) ||
      (x >= 26 && x <= 76 && y === 30) ||
      (x >= 24 && x <= 78 && y === 56) ||
      (y >= 24 && y <= 60 && x === 28) ||
      (y >= 24 && y <= 62 && x === 72) ||
      (x >= 43 && x <= 53 && y === 46) ||
      (x >= 48 && x <= 58 && y === 36) ||
      (x >= 60 && x <= 76 && y === 48) ||
      (x >= 12 && x <= 28 && y === 42) ||
      (x >= 24 && x <= 36 && y === 32) ||
      (x >= 70 && x <= 82 && y === 58);
  }

  function isLevelOneRoadTile(x, y) {
    return ((x === 48 || x === 49) && y >= 47 && y <= 50) ||
      (x === 56 && y >= 43 && y <= 49) ||
      (y === 49 && x >= 47 && x <= 56) ||
      (y === 50 && x >= 43 && x <= 49);
  }

  function isRoadForState(state, x, y) {
    return state && (state.town.level || 1) <= 1 ? isLevelOneRoadTile(x, y) : isTownRoadTile(x, y);
  }

  function isTownWaterTile(state, x, y) {
    if (state && (state.town.level || 1) <= 1) {
      return isLevelOneWaterTile(x, y);
    }
    return (x < 12 && y < 60) ||
      (x < 22 && y >= 24 && y <= 36) ||
      (x < 18 && y >= 49 && y <= 59) ||
      (x >= 51 && x <= 58 && y >= 35 && y <= 42);
  }

  function isLevelOneWaterTile(x, y) {
    return ((y === 34 && x >= 57 && x <= 60) ||
      (y === 35 && x >= 56 && x <= 61) ||
      (y === 36 && x >= 56 && x <= 62) ||
      (y === 37 && x >= 57 && x <= 61) ||
      (y === 44 && x >= 39 && x <= 42) ||
      (y === 45 && x >= 38 && x <= 42) ||
      (y === 46 && x >= 38 && x <= 43) ||
      (y === 47 && x >= 39 && x <= 42) ||
      (y === 46 && x >= 61 && x <= 63) ||
      (y === 47 && x >= 60 && x <= 64) ||
      (y === 48 && x >= 61 && x <= 63));
  }

  function isTownShopWallTile(state, x, y) {
    if (!state || (state.town.level || 1) > 1) return false;
    const footprint = LARGE_BUILDING_LABELS.shop.footprint;
    const inside = x >= footprint.x && x < footprint.x + footprint.w && y >= footprint.y && y < footprint.y + footprint.h;
    if (!inside) return false;
    const left = x === footprint.x;
    const right = x === footprint.x + footprint.w - 1;
    const top = y === footprint.y;
    const bottom = y === footprint.y + footprint.h - 1;
    const door = bottom && x >= footprint.x + 4 && x <= footprint.x + 5;
    const divider = y === footprint.y + 3 && ((x >= footprint.x && x <= footprint.x + 2) || (x >= footprint.x + 7 && x <= footprint.x + footprint.w - 1));
    return ((left || right || top || bottom) && !door) || divider;
  }

  function isTownShopCounterTile(state, x, y) {
    if (!state || (state.town.level || 1) > 1) return false;
    return y === 42 && x >= 45 && x <= 50;
  }

  function isTownShopStorageTile(state, x, y) {
    if (!state || (state.town.level || 1) > 1) return false;
    return x === 46 && y === 37;
  }

  function isTownShopBedTile(state, x, y) {
    if (!state || (state.town.level || 1) > 1) return false;
    return x === 45 && y === 37;
  }

  function isTownShopBedUseTile(state, x, y) {
    if (!state || (state.town.level || 1) > 1) return false;
    return x === 45 && y === 38;
  }

  function isTownDevelopmentDeskTile(state, x, y) {
    if (!state || (state.town.level || 1) > 1) return false;
    return x === 51 && y === 37;
  }

  function isTownShopNameSignTile(state, x, y) {
    if (!state || (state.town.level || 1) > 1) return false;
    return x === 51 && y === 47;
  }

  function isLevelOneBlacksmithOpen(state) {
    return Boolean(state && (state.town.level || 1) <= 1 && state.buildings && state.buildings.blacksmithLevel > 0);
  }

  function isInsideLevelOneBlacksmith(state, x, y) {
    if (!isLevelOneBlacksmithOpen(state)) return false;
    const fp = LEVEL_ONE_BLACKSMITH;
    return x >= fp.x && x < fp.x + fp.w && y >= fp.y && y < fp.y + fp.h;
  }

  function isTownBlacksmithWallTile(state, x, y) {
    if (!isInsideLevelOneBlacksmith(state, x, y)) return false;
    const fp = LEVEL_ONE_BLACKSMITH;
    const left = x === fp.x;
    const right = x === fp.x + fp.w - 1;
    const top = y === fp.y;
    const bottom = y === fp.y + fp.h - 1;
    const door = right && y >= fp.y + 2 && y <= fp.y + 3;
    return (left || right || top || bottom) && !door;
  }

  function isTownBlacksmithWorkbenchTile(state, x, y) {
    if (!isLevelOneBlacksmithOpen(state)) return false;
    return y === LEVEL_ONE_BLACKSMITH.y + 2 && x >= LEVEL_ONE_BLACKSMITH.x + 1 && x <= LEVEL_ONE_BLACKSMITH.x + 3;
  }

  function isTownStepBlocked(state, x, y) {
    if (isTownWaterTile(state, x, y) && !isRoadForState(state, x, y)) return true;
    return Boolean(
      isTownShopWallTile(state, x, y) ||
      isTownShopCounterTile(state, x, y) ||
      isTownShopStorageTile(state, x, y) ||
      isTownShopBedTile(state, x, y) ||
      isTownDevelopmentDeskTile(state, x, y) ||
      isTownShopNameSignTile(state, x, y) ||
      isTownBlacksmithWallTile(state, x, y) ||
      isTownBlacksmithWorkbenchTile(state, x, y) ||
      getVillagerAt(state, x, y)
    );
  }

  function moveTownHero(state, dx, dy) {
    const facing = directionFromDelta(dx, dy);
    if (facing) state.townMap.facing = facing;
    const next = {
      x: Game.State.clamp(state.townMap.hero.x + dx, 0, state.townMap.width - 1),
      y: Game.State.clamp(state.townMap.hero.y + dy, 0, state.townMap.height - 1)
    };
    if (dx && dy && (isTownStepBlocked(state, state.townMap.hero.x + dx, state.townMap.hero.y) || isTownStepBlocked(state, state.townMap.hero.x, state.townMap.hero.y + dy))) {
      return "角が狭くて斜めには進めない。";
    }
    const building = getBuildingAt(state, next.x, next.y);
    const villager = getVillagerAt(state, next.x, next.y);
    if (isTownWaterTile(state, next.x, next.y) && !isRoadForState(state, next.x, next.y)) {
      return "\u6c34\u8fba\u3060\u3002\u3053\u3053\u306f\u6b69\u3051\u306a\u3044\u3002";
    }
    if (isTownShopWallTile(state, next.x, next.y)) {
      return "\u304a\u5e97\u306e\u77f3\u58c1\u3060\u3002\u5165\u308a\u53e3\u3084\u58f2\u308a\u5834\u304b\u3089\u5229\u7528\u3057\u3088\u3046\u3002";
    }
    if (isTownShopCounterTile(state, next.x, next.y)) {
      return "カウンターがある。中央で決定すると店を利用できる。";
    }
    if (isTownShopStorageTile(state, next.x, next.y)) {
      return "倉庫箱がある。決定で袋と倉庫の品を出し入れできる。";
    }
    if (isTownShopBedTile(state, next.x, next.y)) {
      return "ベッドがある。いつでも眠れる。決定で翌朝を迎える。";
    }
    if (isTownDevelopmentDeskTile(state, next.x, next.y)) {
      return "投資棚だ。決定で町へ投資できる。";
    }
    if (isTownShopNameSignTile(state, next.x, next.y)) {
      return "店名看板だ。決定でお店の名前を決められる。";
    }
    if (isTownBlacksmithWallTile(state, next.x, next.y)) {
      return "鍛冶屋の壁だ。入口から入ろう。";
    }
    if (isTownBlacksmithWorkbenchTile(state, next.x, next.y)) {
      return "鍛冶台がある。決定で武器の強化や進化ができる。";
    }
    if (villager) {
      return `${villager.name}\u304c\u3053\u3061\u3089\u3092\u898b\u3066\u3044\u308b\u3002\u6c7a\u5b9a\u3067\u8a71\u305b\u308b\u3002`;
    }
    state.townMap.hero = next;
    state.townMap.lastBuilding = building ? building.id : null;
    if (building) return `${building.name}\u306e\u58f2\u308a\u5834\u306b\u6765\u305f\u3002\u6c7a\u5b9a\u3067\u305d\u306e\u307e\u307e\u5229\u7528\u3067\u304d\u308b\u3002`;
    return "\u753a\u9053\u3092\u6b69\u3044\u305f\u3002";
    if (building) {
      state.townMap.lastBuilding = building.id;
      return `${building.name}\u306e\u524d\u306b\u6765\u305f\u3002\u6c7a\u5b9a\u3067\u5229\u7528\u3067\u304d\u308b\u3002`;
    }
    if (villager) {
      return `${villager.name}\u304c\u3053\u3061\u3089\u3092\u898b\u3066\u3044\u308b\u3002\u6c7a\u5b9a\u3067\u8a71\u305b\u308b\u3002`;
    }
    if (isTownWaterTile(state, next.x, next.y) && !isRoadForState(state, next.x, next.y)) {
      return "\u6c34\u8fba\u3060\u3002\u3053\u3053\u306f\u6b69\u3051\u306a\u3044\u3002";
    }
    if (building) {
      state.townMap.lastBuilding = building.id;
      return `${building.name}の前に来た。決定で利用できる。`;
    }
    if (villager) {
      return `${villager.name}がこちらを見ている。決定で話せる。`;
    }
    state.townMap.hero = next;
    state.townMap.lastBuilding = building ? building.id : null;
    return "\u753a\u9053\u3092\u6b69\u3044\u305f\u3002";
  }

  function isWalkable(state, x, y) {
    if (!inside(state.townMap.width, state.townMap.height, x, y)) return false;
    if (isTownWaterTile(state, x, y) && !isRoadForState(state, x, y)) return false;
    if (isTownShopWallTile(state, x, y)) return false;
    if (isTownShopCounterTile(state, x, y)) return false;
    if (isTownShopStorageTile(state, x, y)) return false;
    if (isTownShopBedTile(state, x, y)) return false;
    if (isTownDevelopmentDeskTile(state, x, y)) return false;
    if (isTownShopNameSignTile(state, x, y)) return false;
    if (isTownBlacksmithWallTile(state, x, y)) return false;
    if (isTownBlacksmithWorkbenchTile(state, x, y)) return false;
    return !getVillagerAt(state, x, y);
  }

  function approachBuilding(state, building) {
    if (!building) return "\u5efa\u7269\u304c\u898b\u3064\u304b\u3089\u306a\u3044\u3002";
    const candidates = [
      { x: building.x, y: building.y + 1, facing: "up" },
      { x: building.x - 1, y: building.y, facing: "right" },
      { x: building.x + 1, y: building.y, facing: "left" },
      { x: building.x, y: building.y - 1, facing: "down" }
    ];
    const spot = candidates.find((pos) => isWalkable(state, pos.x, pos.y));
    if (spot) {
      state.townMap.hero.x = spot.x;
      state.townMap.hero.y = spot.y;
      state.townMap.facing = spot.facing;
    }
    state.townMap.lastBuilding = building.id;
    return `${building.name}\u306e\u524d\u3078\u79fb\u52d5\u3057\u305f\u3002`;
  }

  function buyUpgrade(state, id) {
    const option = UPGRADE_OPTIONS.find((item) => item.id === id);
    if (!option) return ["\u5f37\u5316\u9805\u76ee\u304c\u898b\u3064\u304b\u3089\u306a\u3044\u3002"];
    const cost = option.getCost(state);
    if (cost === null) return [`${option.name}\u306f\u3053\u308c\u4ee5\u4e0a\u5f37\u5316\u3067\u304d\u306a\u3044\u3002`];
    if (state.hero.gold < cost) return [`${cost}G\u5fc5\u8981\u3060\u3002`];
    state.hero.gold -= cost;
    const beforeDefense = state.town.defense;
    const logs = [option.apply(state)];
    if (option.id !== "townInvestment") logs.push(...Game.State.checkTownLevelUp(state));
    if (Game.Objectives) Game.Objectives.track(state, "defenseGain", { amount: state.town.defense - beforeDefense }, logs);
    Game.State.updateDerivedStats(state);
    return logs;
  }

  function applyDailyPopulationChange(state) {
    const logs = [];
    const populationBonus = Game.Weapons ? Game.Weapons.effectBonus(state, "populationGrowth") : 0;
    const growthScore = state.town.wealth * 0.22 + state.town.happiness * 0.18 + state.town.safety * 0.12 + state.town.level * 4 + populationBonus + Game.Items.randomInt(-8, 8);
    if (growthScore >= 25 && state.town.population < state.town.populationCap) {
      const increase = Math.min(state.town.populationCap - state.town.population, Game.Items.randomInt(1, state.town.level + 3) + (state.town.wealth >= 55 && state.town.happiness >= 65 ? 1 : 0));
      const added = Game.Villagers.addImmigrants(state, increase);
      if (added.length) logs.push(`\u753a\u306e\u8a55\u5224\u3092\u805e\u3044\u3066${added.length}\u4eba\u304c\u79fb\u308a\u4f4f\u3093\u3060\u3002${added.slice(0, 2).map((villager) => villager.name).join("\u3001")}\u304c\u65b0\u305f\u306b\u4ef2\u9593\u306b\u306a\u3063\u305f\u3002`);
    } else if ((state.town.happiness < 25 || state.town.safety < 20) && state.town.population > 0) {
      const decrease = Math.min(state.town.population, Game.Items.randomInt(1, 3));
      const removed = Game.Villagers.removeUnhappyResidents(state, decrease);
      if (removed.length) logs.push(`\u66ae\u3089\u3057\u306b\u4e0d\u5b89\u3092\u611f\u3058\u3001${removed.map((villager) => villager.name).join("\u3001")}\u304c\u753a\u3092\u96e2\u308c\u305f\u3002`);
    }
    Game.State.updateDerivedStats(state);
    return logs;
  }

  function countMaterials(state) {
    return state.shop.storage.reduce((counts, item) => {
      if (item.kind === "material") counts[item.id] = (counts[item.id] || 0) + 1;
      return counts;
    }, {});
  }

  function hasMaterials(state, materials) {
    const counts = countMaterials(state);
    return Object.entries(materials).every(([id, amount]) => (counts[id] || 0) >= amount);
  }

  function hasAnyMaterial(state) {
    return state.shop.storage.some((stored) => stored.kind === "material");
  }

  function getStrengthenCost(state, item) {
    if (!item) return null;
    if (state.buildings.blacksmithLevel <= 0) return null;
    const discount = (state.buildings.blacksmithLevel - 1) * 20;
    const questDiscount = state.flags.blacksmithDiscount || 0;
    return Math.max(40, 120 + item.upgrade * 80 - discount - questDiscount);
  }

  function getStrengthenLimit(state) {
    if (state.buildings.blacksmithLevel <= 0) return 0;
    return 5;
  }

  function getStrengthenStatus(state, item) {
    if (state.buildings.blacksmithLevel <= 0) return { ok: false, cost: null, reason: "\u753a\u3078\u6295\u8cc7\u3057\u3066\u935b\u51b6\u5c4b\u3092\u958b\u5e97\u3057\u3066\u304f\u3060\u3055\u3044\u3002" };
    if (!item) return { ok: false, cost: null, reason: "\u88c5\u5099\u753b\u9762\u3067\u5f37\u5316\u3057\u305f\u3044\u88c5\u5099\u3092\u5148\u306b\u88c5\u5099\u3057\u3066\u304f\u3060\u3055\u3044\u3002" };
    const limit = getStrengthenLimit(state);
    if (item.upgrade >= limit) return { ok: false, cost: null, reason: `鍛冶屋での強化上限は+${limit}です。` };
    const cost = getStrengthenCost(state, item);
    if (!hasAnyMaterial(state)) return { ok: false, cost, reason: "\u5009\u5eab\u306b\u7d20\u6750\u304c1\u500b\u5fc5\u8981\u3067\u3059\u3002" };
    if (state.hero.gold < cost) return { ok: false, cost, reason: `${cost}G\u5fc5\u8981\u3067\u3059\u3002` };
    return { ok: true, cost, reason: `\u5fc5\u8981: ${cost}G + \u7d20\u67501\u500b\u3002\u6b21\u306f+${item.upgrade + 1}\u306b\u306a\u308a\u307e\u3059\u3002` };
  }

  function consumeMaterials(state, materials) {
    Object.entries(materials).forEach(([id, amount]) => {
      for (let i = 0; i < amount; i += 1) {
        const index = state.shop.storage.findIndex((item) => item.kind === "material" && item.id === id);
        if (index >= 0) state.shop.storage.splice(index, 1);
      }
    });
  }

  function strengthenEquipment(state, slot) {
    if (state.buildings.blacksmithLevel <= 0) return ["\u935b\u51b6\u5c4b\u306f\u307e\u3060\u958b\u5e97\u3057\u3066\u3044\u306a\u3044\u3002\u753a\u3078\u6295\u8cc7\u3057\u3088\u3046\u3002"];
    const item = state.hero.equipment[slot];
    if (!item) return ["\u5f37\u5316\u3059\u308b\u88c5\u5099\u304c\u306a\u3044\u3002"];
    const limit = getStrengthenLimit(state);
    if (item.upgrade >= limit) return [`${item.name}\u306f\u73fe\u5728\u306e\u935b\u51b6\u5c4bLv\u3067\u306f+${limit}\u307e\u3067\u3067\u3059\u3002`];
    const cost = getStrengthenCost(state, item);
    if (state.hero.gold < cost) return [`\u5f37\u5316\u306b\u306f${cost}G\u5fc5\u8981\u3060\u3002`];
    const materialIndex = state.shop.storage.findIndex((stored) => stored.kind === "material");
    if (materialIndex === -1) return ["\u5f37\u5316\u306b\u4f7f\u3048\u308b\u7d20\u6750\u304c\u5009\u5eab\u306b\u306a\u3044\u3002"];
    const material = state.shop.storage.splice(materialIndex, 1)[0];
    state.hero.gold -= cost;
    item.upgrade += 1;
    if (item.slot === "weapon") item.attack += 1;
    else if (item.slot === "bag" && item.bonus && item.bonus.stat === "carryLimit") item.bonus.value += 1;
    else item.defense += 1;
    Game.State.updateDerivedStats(state);
    return [`${material.name}\u3068${cost}G\u3067${item.name}+${item.upgrade}\u306b\u5f37\u5316\u3057\u305f\u3002`];
  }

  function recipeStatus(state, recipe) {
    if (state.buildings.blacksmithLevel <= 0) return { ok: false, reason: "\u935b\u51b6\u5c4b\u306e\u958b\u5e97\u6295\u8cc7\u304c\u5fc5\u8981\u3067\u3059\u3002" };
    const forgeLevel = recipeMinBlacksmithLevel(recipe);
    if (state.buildings.blacksmithLevel < forgeLevel) return { ok: false, reason: `\u935b\u51b6\u5c4bLv${forgeLevel}\u3067\u89e3\u653e\u3002` };
    const weaponLevel = recipeMinWeaponShopLevel(recipe);
    if (state.buildings.weaponShopLevel < weaponLevel) return { ok: false, reason: `\u6b66\u5668\u5c4bLv${weaponLevel}\u3067\u89e3\u653e\u3002` };
    if (state.hero.gold < recipe.cost) return { ok: false, reason: `${recipe.cost}G\u5fc5\u8981\u3067\u3059\u3002` };
    if (!hasMaterials(state, recipe.materials)) return { ok: false, reason: "\u5fc5\u8981\u306a\u7d20\u6750\u304c\u8db3\u308a\u307e\u305b\u3093\u3002" };
    if (state.shop.storage.length >= state.shop.storageCapacity) return { ok: false, reason: "\u5009\u5eab\u304c\u3044\u3063\u3071\u3044\u3067\u3059\u3002" };
    return { ok: true, reason: "\u4f5c\u6210\u3067\u304d\u307e\u3059\u3002" };
  }

  function recipeMinBlacksmithLevel(recipe) {
    const level3 = ["silver_dagger", "magic_stone_sword", "chain_mail", "guard_bracelet", "expedition_pack"];
    const level2 = ["iron_sword", "hunter_bow", "leather_bag", "lucky_ring"];
    if (level3.includes(recipe.equipmentId)) return 3;
    if (level2.includes(recipe.equipmentId)) return 2;
    return 1;
  }

  function recipeMinWeaponShopLevel(recipe) {
    const equipment = Game.Items.EQUIPMENT_CATALOG.find((item) => item.id === recipe.equipmentId);
    if (!equipment || equipment.slot !== "weapon") return 0;
    if (["silver_dagger", "magic_stone_sword"].includes(recipe.equipmentId)) return 2;
    if (recipe.equipmentId === "iron_sword" || recipe.equipmentId === "hunter_bow") return 1;
    return 0;
  }

  function craftEquipment(state, recipeId) {
    const recipe = BLACKSMITH_RECIPES.find((item) => item.id === recipeId);
    if (!recipe) return ["\u30ec\u30b7\u30d4\u304c\u898b\u3064\u304b\u3089\u306a\u3044\u3002"];
    const status = recipeStatus(state, recipe);
    if (!status.ok) return [status.reason];
    consumeMaterials(state, recipe.materials);
    state.hero.gold -= recipe.cost;
    const item = Game.Items.createEquipment(recipe.equipmentId, state.buildings.blacksmithLevel + 1);
    state.shop.storage.push(item);
    Game.State.updateDerivedStats(state);
    return [`\u935b\u51b6\u5c4b\u3067${Game.Items.equipmentLabel(item)}\u3092\u4f5c\u3063\u305f\u3002`];
  }

  function equipFromStorage(state, storageIndex) {
    const item = state.shop.storage[storageIndex];
    if (!item || item.kind !== "equipment") return ["\u88c5\u5099\u54c1\u3067\u306f\u306a\u3044\u3002"];
    const slot = item.slot;
    const previous = state.hero.equipment[slot];
    state.shop.storage.splice(storageIndex, 1);
    if (previous) state.shop.storage.push(previous);
    state.hero.equipment[slot] = item;
    Game.State.updateDerivedStats(state);
    return [`${Game.Items.equipmentLabel(item)}\u3092\u88c5\u5099\u3057\u305f\u3002`];
  }

  function canUseWeaponEvolution(state) {
    return state.buildings.blacksmithLevel >= 1;
  }

  function canUseWeaponSynthesis(state) {
    return state.buildings.blacksmithLevel >= 3 && state.buildings.weaponShopLevel >= 2;
  }

  function evolveWeapon(state, key, evolutionId) {
    if (!canUseWeaponEvolution(state)) return ["町へ1回投資して鍛冶屋を開店してください。"];
    const entry = Game.Weapons.findWeaponByKey(state, key);
    if (!entry) return ["進化させる武器が見つからない。"];
    const logs = Game.Weapons.evolveWeapon(state, entry.item, evolutionId);
    return logs;
  }

  function selectSynthesisWeapon(state, role, key) {
    if (!canUseWeaponSynthesis(state)) return ["\u6b66\u5668\u5408\u6210\u306b\u306f\u935b\u51b6\u5c4bLv3\u3068\u6b66\u5668\u5c4bLv2\u304c\u5fc5\u8981\u3067\u3059\u3002"];
    const entry = Game.Weapons.findWeaponByKey(state, key);
    if (!entry) return ["武器が見つからない。"];
    state.blacksmith = Object.assign({ synthesisBase: null, synthesisMaterial: null }, state.blacksmith || {});
    if (role === "base") {
      state.blacksmith.synthesisBase = key;
      if (state.blacksmith.synthesisMaterial === key) state.blacksmith.synthesisMaterial = null;
      return [`ベース武器に${entry.item.name}を選んだ。`];
    }
    if (!key.startsWith("storage:")) return ["素材武器は倉庫の武器から選んでください。"];
    state.blacksmith.synthesisMaterial = key;
    if (state.blacksmith.synthesisBase === key) state.blacksmith.synthesisBase = null;
    return [`素材武器に${entry.item.name}を選んだ。`];
  }

  function synthesizeWeapons(state, overwriteOldest) {
    if (!canUseWeaponSynthesis(state)) return ["\u6b66\u5668\u5408\u6210\u306b\u306f\u935b\u51b6\u5c4bLv3\u3068\u6b66\u5668\u5c4bLv2\u304c\u5fc5\u8981\u3067\u3059\u3002"];
    state.blacksmith = Object.assign({ synthesisBase: null, synthesisMaterial: null }, state.blacksmith || {});
    return Game.Weapons.synthesize(state, state.blacksmith.synthesisBase, state.blacksmith.synthesisMaterial, overwriteOldest);
  }

  Game.Town = {
    BUILDING_DEFS,
    VILLAGERS,
    UPGRADE_OPTIONS,
    BLACKSMITH_RECIPES,
    getVisibleBuildings,
    getBuildingAt,
    getVisibleVillagers,
    getVillagerAt,
    getInteractionTarget,
    getLevelOneShopFacilityAt,
    talkToVillager,
    buildingStage,
    moveTownHero,
    approachBuilding,
    buyUpgrade,
    applyDailyPopulationChange,
    countMaterials,
    hasMaterials,
    hasAnyMaterial,
    getStrengthenCost,
    getStrengthenLimit,
    getStrengthenStatus,
    recipeStatus,
    strengthenEquipment,
    craftEquipment,
    equipFromStorage,
    canUseWeaponEvolution,
    canUseWeaponSynthesis,
    evolveWeapon,
    selectSynthesisWeapon,
    synthesizeWeapons
  };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const RAID_TYPES = [
    { id: "bandits", name: "\u76d7\u8cca\u56e3\u306e\u8972\u6483", text: "\u591c\u3001\u76d7\u8cca\u56e3\u304c\u753a\u3092\u8972\u3063\u305f\u3002" },
    { id: "monsters", name: "\u9b54\u7269\u306e\u8972\u6483", text: "\u8ff7\u5bae\u304b\u3089\u9b54\u7269\u304c\u753a\u3078\u6d41\u308c\u8fbc\u3093\u3060\u3002" },
    { id: "warehouse", name: "\u5009\u5eab\u8352\u3089\u3057", text: "\u5009\u5eab\u8352\u3089\u3057\u304c\u5e97\u306e\u88cf\u624b\u306b\u5fcd\u3073\u8fbc\u3093\u3060\u3002" },
    { id: "fire", name: "\u591c\u306e\u706b\u4ed8\u3051", text: "\u591c\u9053\u306b\u706b\u4ed8\u3051\u306e\u5f71\u304c\u73fe\u308c\u305f\u3002" }
  ];

  const OMEN_TEXTS = [
    "\u76d7\u8cca\u306e\u8db3\u8de1\u304c\u753a\u306e\u5916\u3067\u898b\u3064\u304b\u3063\u305f",
    "\u591c\u9053\u3067\u9b54\u7269\u306e\u58f0\u304c\u805e\u3053\u3048\u308b",
    "\u5009\u5eab\u3092\u898b\u5f35\u308b\u602a\u3057\u3044\u5f71\u304c\u3044\u305f",
    "\u9060\u304f\u306e\u6797\u3067\u4e0d\u81ea\u7136\u306a\u706b\u306e\u624b\u304c\u4e0a\u304c\u3063\u305f"
  ];

  function raidChance(state) {
    const equipmentDown = Game.Items.getEquipmentBonus(state, "raidDown");
    const raw = 10 + state.town.wealth * 0.2 - state.town.safety * 0.1 - state.town.defense * 0.05 - equipmentDown;
    return Game.State.clamp(raw, 5, 50);
  }

  function shouldRaidOccur(state) {
    if (state.day <= 2) return false;
    if (state.raidOmen && state.raidOmen.active && state.raidOmen.daysLeft <= 0) return true;
    if (state.day % 5 === 0) return true;
    return Game.Items.chance(raidChance(state));
  }

  function updateOmen(state, logs) {
    const messages = logs || [];
    if (!state || state.flags.gameOver) return messages;
    if (state.raidOmen && state.raidOmen.active) {
      state.raidOmen.daysLeft = Math.max(0, (state.raidOmen.daysLeft || 0) - 1);
      messages.push(`襲撃予兆: ${state.raidOmen.text}。${state.raidOmen.daysLeft > 0 ? `あと${state.raidOmen.daysLeft}日ほどで危ない。` : "今夜にも来そうだ。"}`);
      if (Game.Audio) Game.Audio.playSfx("raidWarning");
      return messages;
    }

    const chance = raidChance(state);
    const periodicWarning = state.day >= 3 && state.day % 5 === 3;
    const riskyWarning = state.day >= 4 && chance >= 24 && Game.Items.chance(30);
    if (!periodicWarning && !riskyWarning) return messages;
    state.raidOmen = {
      active: true,
      daysLeft: periodicWarning ? 2 : Game.Items.randomInt(1, 3),
      text: Game.Items.choose(OMEN_TEXTS)
    };
    messages.push(`襲撃予兆: ${state.raidOmen.text}。兵士が備えの品を探している。`);
    if (Game.Audio) Game.Audio.playSfx("raidWarning");
    return messages;
  }

  function runRaid(state) {
    Game.Villagers.ensurePopulationVillagers(state);
    const type = Game.Items.choose(RAID_TYPES);
    const logs = [type.text];
    state.raidOmen = null;
    const weaponDefense = Game.Weapons ? Game.Weapons.effectBonus(state, "townDefense") : 0;
    const damageDown = Game.Weapons ? Game.Weapons.effectBonus(state, "raidDamageDown") : 0;
    const injuryDown = Game.Weapons ? Game.Weapons.effectBonus(state, "injuryDown") : 0;
    const raidPower = Math.round(state.day * 1.4 + state.town.wealth * 0.12 + Game.Items.randomInt(8, 30));
    const defenseRoll = Math.round(state.town.defense + weaponDefense + state.town.safety + Game.Items.randomInt(0, 45));
    const success = defenseRoll >= raidPower;

    if (success) {
      logs.push("\u898b\u56de\u308a\u3068\u9632\u5099\u304c\u50cd\u304d\u3001\u88ab\u5bb3\u3092\u6291\u3048\u305f\u3002");
      state.town.safety += 2;
      state.shop.reputation += 2;
      if (defenseRoll - raidPower < 12) {
        state.shop.durability -= 3;
        logs.push("\u5c0f\u7af6\u308a\u5408\u3044\u3067\u5e97\u5148\u304c\u5c11\u3057\u50b7\u3093\u3060\u3002");
        if (Game.Items.chance(25)) Game.Villagers.applyRaidDamage(state, 0, 1, logs);
      }
    } else {
      const loss = raidPower - defenseRoll;
      const reducedLoss = Math.max(1, Math.round(loss * (1 - Math.min(60, damageDown) / 100)));
      const injuryRate = 1 - Math.min(65, injuryDown) / 100;
      const deaths = Math.min(state.town.population, reducedLoss >= 18 ? Math.max(1, Math.floor(reducedLoss / 22) + Game.Items.randomInt(0, 1)) : (Game.Items.chance(35 * injuryRate) ? 1 : 0));
      const injuries = Math.min(Math.max(0, state.town.population - deaths), Math.max(1, Math.floor((reducedLoss / 16) * injuryRate)));
      const goldLoss = Math.min(state.hero.gold, Math.max(20, Math.round(reducedLoss * 4 + Game.Items.randomInt(0, 80))));
      const durabilityLoss = Game.State.clamp(Math.round(reducedLoss / 3) + Game.Items.randomInt(3, 9), 4, 28);
      const storageLoss = Math.min(state.shop.storage.length, Game.Items.randomInt(0, 3));
      state.hero.gold -= goldLoss;
      state.shop.durability -= durabilityLoss;
      state.town.happiness -= 8 + Math.floor(reducedLoss / 12);
      state.town.safety -= 8 + Math.floor(reducedLoss / 18);
      logs.push("\u9632\u885b\u306b\u5931\u6557\u3057\u3001\u753a\u306b\u88ab\u5bb3\u304c\u51fa\u305f\u3002");
      const casualties = Game.Villagers.applyRaidDamage(state, deaths, injuries, logs);
      if (!casualties.deaths.length && !casualties.injuries.length) logs.push("\u907f\u96e3\u304c\u9593\u306b\u5408\u3044\u3001\u4eba\u7684\u88ab\u5bb3\u306f\u51fa\u306a\u304b\u3063\u305f\u3002");
      logs.push(`${goldLoss}G\u3092\u596a\u308f\u308c\u3001\u5e97\u306e\u8010\u4e45\u5ea6\u304c${durabilityLoss}\u4e0b\u304c\u3063\u305f\u3002`);
      for (let i = 0; i < storageLoss; i += 1) {
        const index = Game.Items.randomInt(0, state.shop.storage.length - 1);
        const stolen = state.shop.storage.splice(index, 1)[0];
        logs.push(`\u5009\u5eab\u304b\u3089${Game.Items.itemLabel(stolen)}\u304c\u5931\u308f\u308c\u305f\u3002`);
      }
    }

    Game.State.updateDerivedStats(state);
    const report = { type: type.name, chance: Math.round(raidChance(state)), raidPower, defenseRoll, success, logs };
    state.lastRaid = report;
    return report;
  }

  Game.Raid = { RAID_TYPES, OMEN_TEXTS, raidChance, shouldRaidOccur, updateOmen, runRaid };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  function rollDailyEvent(state) {
    const logs = [];
    if (!Game.Items.chance(28)) return logs;
    const event = Game.Items.choose([merchantVisit, immigrants, festival, theft, adventurerVisit, poorHarvest, dungeonMutation]);
    logs.push(...event(state));
    Game.State.updateDerivedStats(state);
    return logs;
  }

  function merchantVisit(state) {
    const item = Game.Items.createRandomLoot(Math.max(2, state.town.level + 1), state);
    const price = Math.max(60, Math.round((item.price || 80) * 0.65));
    if (state.hero.gold >= price && state.shop.storage.length < state.shop.storageCapacity) {
      state.hero.gold -= price;
      state.shop.storage.push(item);
      return [`\u65c5\u5546\u4eba\u304c\u6765\u8a2a\u3057\u3001${Game.Items.itemLabel(item)}\u3092${price}G\u3067\u4ed5\u5165\u308c\u305f\u3002`];
    }
    return ["\u65c5\u5546\u4eba\u304c\u6765\u8a2a\u3057\u305f\u304c\u3001\u4eca\u56de\u306f\u898b\u9001\u3063\u305f\u3002"];
  }

  function immigrants(state) {
    if (state.town.happiness < 60) return ["\u79fb\u4f4f\u5e0c\u671b\u8005\u304c\u8a2a\u308c\u305f\u304c\u3001\u66ae\u3089\u3057\u5411\u304d\u306b\u4e0d\u5b89\u3092\u6b8b\u3057\u3066\u5e30\u3063\u305f\u3002"];
    const increase = Math.min(state.town.populationCap - state.town.population, Game.Items.randomInt(2, 5));
    if (increase <= 0) return ["\u79fb\u4f4f\u5e0c\u671b\u8005\u304c\u6765\u305f\u304c\u3001\u4f4f\u3080\u5bb6\u304c\u8db3\u308a\u306a\u304b\u3063\u305f\u3002"];
    const added = Game.Villagers.addImmigrants(state, increase);
    return [`${added.length}\u4eba\u304c\u79fb\u4f4f\u3057\u3066\u304d\u305f\u3002${added.slice(0, 2).map((villager) => villager.name).join("\u3001")}\u304c\u65b0\u3057\u3044\u66ae\u3089\u3057\u3092\u59cb\u3081\u305f\u3002`];
  }

  function festival(state) {
    state.town.happiness += 10;
    state.shop.reputation += 5;
    return ["\u5c0f\u3055\u306a\u796d\u308a\u304c\u958b\u304b\u308c\u3001\u5e78\u305b\u5ea6\u3068\u5e97\u306e\u8a55\u5224\u304c\u4e0a\u304c\u3063\u305f\u3002"];
  }

  function theft(state) {
    if (state.town.safety >= 45 || !state.shop.storage.length) return ["\u591c\u56de\u308a\u304c\u4e0d\u5be9\u306a\u8db3\u8de1\u3092\u898b\u3064\u3051\u3001\u76d7\u96e3\u3092\u9632\u3044\u3060\u3002"];
    const index = Game.Items.randomInt(0, state.shop.storage.length - 1);
    const stolen = state.shop.storage.splice(index, 1)[0];
    state.town.safety -= 2;
    return [`\u6cbb\u5b89\u306e\u60aa\u3055\u306b\u3064\u3051\u3053\u307e\u308c\u3001${Game.Items.itemLabel(stolen)}\u304c\u76d7\u307e\u308c\u305f\u3002`];
  }

  function adventurerVisit(state) {
    state.flags.adventurerDemand = true;
    return ["\u5192\u967a\u8005\u306e\u4e00\u56e3\u304c\u6765\u5e97\u4e88\u5b9a\u3092\u544a\u3052\u305f\u3002\u6b21\u306e\u591c\u306f\u9ad8\u984d\u5546\u54c1\u304c\u58f2\u308c\u3084\u3059\u3044\u3002"];
  }

  function poorHarvest(state) {
    state.town.happiness -= 5;
    state.town.wealth -= 2;
    return ["\u8fd1\u304f\u306e\u7551\u304c\u4e0d\u4f5c\u3068\u306a\u308a\u3001\u5e78\u305b\u5ea6\u304c\u4e0b\u304c\u3063\u305f\u3002"];
  }

  function dungeonMutation(state) {
    state.flags.nextDungeonMutation = true;
    return ["\u8ff7\u5bae\u306e\u7a7a\u6c17\u304c\u3056\u308f\u3064\u3044\u305f\u3002\u6b21\u306e\u63a2\u7d22\u306f\u6575\u304c\u5f37\u3044\u304c\u3001\u73cd\u3057\u3044\u54c1\u3082\u5897\u3048\u308b\u3002"];
  }

  Game.Events = { rollDailyEvent };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});
  const SAVE_KEY = "labyrinth_mall_save_v1";

  function save(state) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      return Game.State.normalizeState(JSON.parse(raw));
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  function hasSave() {
    try {
      return Boolean(localStorage.getItem(SAVE_KEY));
    } catch (error) {
      return false;
    }
  }

  function clear() {
    localStorage.removeItem(SAVE_KEY);
  }

  Game.Save = {
    SAVE_KEY,
    save,
    load,
    hasSave,
    clear
  };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});
  const STORAGE_KEY = "labyrinthMallAudioSettings";

  const AudioManager = {
    enabled: true,
    volume: 0.45,
    initialized: false,
    audioContext: null,
    masterGain: null,
    lastPlayed: {}
  };

  const SFX = {
    button: [{ f: 720, d: 0.035, t: "square", g: 0.45 }],
    move: [{ f: 180, d: 0.025, t: "triangle", g: 0.22 }],
    stairs: [
      { f: 392, d: 0.11, t: "triangle", g: 0.42, slide: 330 },
      { f: 294, d: 0.13, t: "triangle", g: 0.40, slide: 247 },
      { f: 220, d: 0.15, t: "sine", g: 0.36, slide: 165 },
      { f: 147, d: 0.20, t: "sine", g: 0.32, slide: 110 }
    ],
    pickup: [{ f: 660, d: 0.045, t: "square", g: 0.45 }, { f: 990, d: 0.07, t: "square", g: 0.38 }],
    sell: [{ f: 784, d: 0.045, t: "square", g: 0.45 }, { f: 1175, d: 0.08, t: "triangle", g: 0.36 }],
    rareSell: [{ f: 880, d: 0.04, t: "square", g: 0.42 }, { f: 1175, d: 0.05, t: "square", g: 0.4 }, { f: 1568, d: 0.08, t: "triangle", g: 0.34 }],
    questAccept: [{ f: 523, d: 0.05, t: "triangle", g: 0.36 }, { f: 659, d: 0.08, t: "triangle", g: 0.36 }],
    questComplete: [{ f: 523, d: 0.045, t: "square", g: 0.42 }, { f: 784, d: 0.055, t: "square", g: 0.42 }, { f: 1047, d: 0.11, t: "triangle", g: 0.38 }],
    levelUp: [{ f: 659, d: 0.05, t: "square", g: 0.45 }, { f: 880, d: 0.05, t: "square", g: 0.45 }, { f: 1319, d: 0.12, t: "triangle", g: 0.36 }],
    forge: [{ f: 247, d: 0.04, t: "square", g: 0.48 }, { f: 494, d: 0.05, t: "square", g: 0.48 }, { f: 988, d: 0.08, t: "triangle", g: 0.36 }],
    forgeFail: [{ f: 220, d: 0.06, t: "sawtooth", g: 0.42 }, { f: 165, d: 0.08, t: "square", g: 0.34 }],
    raidWarning: [{ f: 196, d: 0.08, t: "sine", g: 0.4 }, { f: 196, d: 0.08, t: "sine", g: 0.4 }],
    raidStart: [{ f: 147, d: 0.12, t: "square", g: 0.5 }, { f: 110, d: 0.16, t: "sawtooth", g: 0.42 }],
    raidWin: [{ f: 392, d: 0.06, t: "square", g: 0.42 }, { f: 587, d: 0.07, t: "square", g: 0.42 }, { f: 784, d: 0.12, t: "triangle", g: 0.36 }],
    raidLose: [{ f: 220, d: 0.09, t: "sawtooth", g: 0.42 }, { f: 165, d: 0.12, t: "square", g: 0.36 }, { f: 110, d: 0.18, t: "triangle", g: 0.3 }],
    villagerInjured: [{ f: 330, d: 0.055, t: "sawtooth", g: 0.36 }, { f: 247, d: 0.08, t: "triangle", g: 0.32 }],
    villagerLost: [{ f: 196, d: 0.12, t: "triangle", g: 0.36 }, { f: 147, d: 0.18, t: "sine", g: 0.3 }],
    win: [{ f: 523, d: 0.08, t: "square", g: 0.44 }, { f: 659, d: 0.08, t: "square", g: 0.44 }, { f: 784, d: 0.08, t: "square", g: 0.44 }, { f: 1047, d: 0.18, t: "triangle", g: 0.38 }],
    lose: [{ f: 330, d: 0.1, t: "triangle", g: 0.36 }, { f: 247, d: 0.12, t: "triangle", g: 0.32 }, { f: 196, d: 0.2, t: "sine", g: 0.28 }],
    error: [{ f: 130, d: 0.06, t: "square", g: 0.38 }, { f: 120, d: 0.055, t: "square", g: 0.32 }],
    attack: [{ f: 784, d: 0.045, t: "square", g: 0.52 }, { f: 523, d: 0.07, t: "square", g: 0.42 }],
    hurt: [{ f: 164, d: 0.055, t: "sawtooth", g: 0.44 }, { f: 98, d: 0.09, t: "square", g: 0.34 }],
    miss: [{ f: 220, d: 0.04, t: "triangle", g: 0.32 }, { f: 185, d: 0.06, t: "triangle", g: 0.28 }],
    talk: [{ f: 523, d: 0.04, t: "triangle", g: 0.3 }, { f: 659, d: 0.05, t: "triangle", g: 0.3 }]
  };

  const COOLDOWN = {
    button: 45,
    move: 60,
    stairs: 420,
    sell: 90,
    rareSell: 120,
    raidWarning: 500,
    raidStart: 500,
    villagerInjured: 180,
    villagerLost: 240,
    hurt: 80,
    error: 120
  };

  function loadSettings() {
    try {
      const raw = window.localStorage && window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const settings = JSON.parse(raw);
      AudioManager.enabled = settings.enabled !== false;
      AudioManager.volume = clamp(Number(settings.volume), 0, 1, 0.45);
    } catch (error) {
      /* Ignore broken audio settings. */
    }
  }

  function saveSettings() {
    try {
      if (!window.localStorage) return;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ enabled: AudioManager.enabled, volume: AudioManager.volume }));
    } catch (error) {
      /* Audio settings are optional. */
    }
  }

  function clamp(value, min, max, fallback) {
    if (!Number.isFinite(value)) return fallback;
    return Math.max(min, Math.min(max, value));
  }

  async function initAudio() {
    try {
      if (!AudioManager.enabled) return false;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;
      if (!AudioManager.audioContext) {
        AudioManager.audioContext = new AudioContext();
        AudioManager.masterGain = AudioManager.audioContext.createGain();
        AudioManager.masterGain.gain.value = AudioManager.volume;
        AudioManager.masterGain.connect(AudioManager.audioContext.destination);
      }
      if (AudioManager.audioContext.state === "suspended") await AudioManager.audioContext.resume();
      AudioManager.initialized = true;
      return true;
    } catch (error) {
      return false;
    }
  }

  function playTone(note, startTime) {
    const context = AudioManager.audioContext;
    const master = AudioManager.masterGain;
    if (!context || !master) return;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const duration = note.d || 0.06;
    osc.type = note.t || "square";
    osc.frequency.setValueAtTime(note.f || 440, startTime);
    if (note.slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, note.slide), startTime + duration);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(note.g || 0.35, startTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.03);
  }

  async function playSfx(name) {
    try {
      if (!AudioManager.enabled) return false;
      const nowMs = Date.now();
      const cooldown = COOLDOWN[name] == null ? 35 : COOLDOWN[name];
      if (AudioManager.lastPlayed[name] && nowMs - AudioManager.lastPlayed[name] < cooldown) return false;
      AudioManager.lastPlayed[name] = nowMs;
      const ok = await initAudio();
      if (!ok || !AudioManager.audioContext) return false;
      if (AudioManager.masterGain) AudioManager.masterGain.gain.value = AudioManager.volume;
      const notes = SFX[name] || SFX.button;
      let offset = 0;
      notes.forEach((note) => {
        playTone(note, AudioManager.audioContext.currentTime + 0.01 + offset);
        offset += (note.d || 0.06) * 0.85;
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  function setVolume(value) {
    AudioManager.volume = clamp(Number(value), 0, 1, AudioManager.volume);
    if (AudioManager.masterGain) AudioManager.masterGain.gain.value = AudioManager.volume;
    saveSettings();
    return AudioManager.volume;
  }

  function toggleSound() {
    AudioManager.enabled = !AudioManager.enabled;
    saveSettings();
    if (AudioManager.enabled) initAudio();
    return AudioManager.enabled;
  }

  function isEnabled() {
    return AudioManager.enabled;
  }

  function getVolume() {
    return AudioManager.volume;
  }

  /* Compatibility with the earlier BGM-oriented API. */
  function setMode() {}
  function start() { return initAudio(); }
  function stop() {}
  function toggle() { return toggleSound(); }
  function isPlaying() { return AudioManager.enabled; }

  loadSettings();

  Game.AudioManager = AudioManager;
  Game.Audio = { AudioManager, initAudio, playSfx, setVolume, toggleSound, isEnabled, getVolume, start, stop, toggle, setMode, isPlaying };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const TILE = 24;
  const TILE_Y = 24;
  const ROW_SKEW = 0;
  const MAP_X = 36;
  const MAP_Y = 24;
  const VIEW_W = 37;
  const VIEW_H = 15;
  const UI_WINDOW_Y = 412;
  const UI_WINDOW_H = 108;
  let activeCamera = { x: 0, y: 0 };
  let activeTownLevel = 1;
  let activeTownState = null;
  let cameraVisual = null;
  let cameraVisualTime = 0;
  const LEVEL_ONE_ANIMALS = [
    { id: "cat", sprite: "animal-cat", x: 43.4, y: 48.0, path: [[0, 0], [1.1, 0], [1.1, 0.2], [0, 0.2]], speed: 820, size: 19, footDrop: 4, phase: 0.15 },
    { id: "dog", sprite: "animal-dog", x: 58.2, y: 45.4, path: [[0, 0], [-1.0, 0], [-1.0, 0.2], [0, 0.2]], speed: 980, size: 19, footDrop: 4, phase: 0.55 },
    { id: "chicken", sprite: "animal-chicken", x: 53.0, y: 36.7, path: [[0, 0], [0.9, 0], [0.9, 0.2], [0, 0.2]], speed: 620, size: 16, footDrop: 1, phase: 0.80 }
  ];
  const LEVEL_ONE_SHOP = { x: 44, y: 36, w: 10, h: 11 };
  const LEVEL_ONE_BLACKSMITH = { x: 38, y: 48, w: 6, h: 6 };
  const STORY_TEXT_SPEED = 58;
  const GODO_WALK_DURATION = 3600;
  const STORY_INTRO_LINES = [
    "朝の空気がまだ冷たいころ、町の外れで荷車の音がした。",
    "どうやら、商売の気配を聞きつけた誰かが歩いてくるようだ。"
  ];
  const GODO_DIALOG_LINES = [
    "ゴド「こんなところにお店があったとは、",
    "冒険者が好きそうな迷宮もあるので儲かりそうだな。",
    "ここでわしも商売させてもらうよ。",
    "私の名前はゴド、よろしくな」"
  ];
  const ALEF_DIALOG_LINES = [
    "冒険者アレフ「迷宮の近くに、こんな町があったなんて。",
    "これからの発展が楽しみだな。しばらく立ち寄らせてもらうよ」",
    "冒険者アレフが町に立ち寄るようになった。"
  ];

  function draw(canvas, state) {
    const ctx = Game.Renderer.setupCanvas(canvas);
    if (!ctx || !state) return;
    const R = Game.Renderer;
    const story = updateTownStory(state);
    const target = story ? { type: "empty" } : Game.Town.getInteractionTarget ? Game.Town.getInteractionTarget(state) : {};
    if (Game.Animations && Game.Animations.keepAmbient) Game.Animations.keepAmbient(story ? 1200 : 220);

    R.clear(ctx, "#11170f");
    drawTownMap(ctx, state, target, story);
    drawTownOverlay(ctx, state, target);
    drawTownStoryOverlay(ctx, state, story);
  }

  function drawTownOverlay(ctx, state, target) {
    const R = Game.Renderer;
    const storyActive = state && state.townStory && state.townStory.type === "blacksmithArrival";
    drawTopStatus(ctx, state, target);
    R.message(ctx, messageLines(state, target), {
      x: 226,
      y: storyActive ? UI_WINDOW_Y - 20 : UI_WINDOW_Y,
      width: 690,
      height: storyActive ? 128 : UI_WINDOW_H,
      maxLines: storyActive ? 4 : 3,
      size: storyActive ? 17 : 18,
      lineHeight: storyActive ? 24 : 25,
      paddingTop: 12,
      paddingBottom: 12,
      extraMargin: 4,
      fill: "rgba(8, 9, 13, 0.52)",
      innerColor: "rgba(84,80,90,0.48)"
    });
  }

  function drawTopStatus(ctx, state, target) {
    const R = Game.Renderer;
    const hero = state.hero || {};
    const expMax = Math.max(1, hero.nextExp || 1);
    const expNow = Math.max(0, Math.min(expMax, hero.exp || 0));
    const hpMax = Math.max(1, hero.maxHp || 1);
    const hpNow = Math.max(0, Math.min(hpMax, hero.hp || 0));
    const hpRatio = hpNow / hpMax;
    const hpDanger = hpRatio <= 0.2;
    const place = currentPlaceLabel(state, target);

    const hpX = 344;
    const wealthX = 626;
    const goldX = 760;
    const levelX = 208;
    const placeX = 20;

    drawHudWindow(ctx, placeX, 16, 180, 38);
    R.text(ctx, place, placeX + 14, 27, { size: 17, color: "#fff7df", bold: true });

    drawHudWindow(ctx, levelX, 12, 126, 48);
    R.text(ctx, `Lv ${hero.level || 1}`, levelX + 14, 20, { size: 18, color: "#fff7df", bold: true });
    R.rect(ctx, levelX + 14, 44, 96, 7, "rgba(13, 9, 7, 0.62)");
    R.rect(ctx, levelX + 15, 45, Math.max(1, Math.round(94 * (expNow / expMax))), 5, "rgba(88, 171, 255, 0.82)");
    R.stroke(ctx, levelX + 14, 44, 96, 7, "rgba(241,223,176,0.58)", 1);

    drawHudWindow(ctx, hpX, 16, 272, 38);
    R.text(ctx, `HP ${hpNow}/${hpMax}`, hpX + 14, 27, { size: 17, color: hpDanger ? "#ff5a4a" : hpRatio < 0.35 ? "#ffb0a0" : "#e5ff91", bold: true });
    R.rect(ctx, hpX + 112, 29, 142, 11, "rgba(13, 9, 7, 0.62)");
    R.rect(ctx, hpX + 114, 31, Math.max(1, Math.round(138 * hpRatio)), 7, hpDanger ? "rgba(239, 54, 45, 0.95)" : hpRatio < 0.35 ? "rgba(210, 78, 66, 0.88)" : "rgba(83, 186, 98, 0.88)");
    R.stroke(ctx, hpX + 112, 29, 142, 11, "rgba(241,223,176,0.58)", 1);
    if (hpDanger) R.text(ctx, "\u5371\u967a", hpX + 260, 27, { size: 15, color: "#ff4b38", align: "right", bold: true });

    drawHudWindow(ctx, wealthX, 16, 124, 38);
    R.text(ctx, `豊かさ ${state.town.wealth || 0}`, wealthX + 12, 27, { size: 17, color: "#fff3b8", bold: true });

    drawHudWindow(ctx, goldX, 16, 164, 38);
    R.text(ctx, `所持金 ${hero.gold || 0}G`, goldX + 12, 27, { size: 17, color: "#ffe3a2", bold: true });
  }

  function drawHudWindow(ctx, x, y, w, h) {
    const R = Game.Renderer;
    R.rect(ctx, x, y, w, h, "rgba(7, 9, 11, 0.46)");
    R.stroke(ctx, x, y, w, h, "rgba(241,223,176,0.54)", 1);
    R.stroke(ctx, x + 3, y + 3, w - 6, h - 6, "rgba(84,80,90,0.34)", 1);
  }

  function drawTownMap(ctx, state, target, story) {
    const R = Game.Renderer;
    activeTownLevel = state.town.level || 1;
    activeTownState = state;
    const heroVisual = Game.Animations ? Game.Animations.heroTile("town", state.townMap.hero.x, state.townMap.hero.y) : { x: state.townMap.hero.x, y: state.townMap.hero.y, bob: 0 };
    activeCamera = smoothTownCamera(townCamera(state, heroVisual));
    const mapW = VIEW_W * TILE;
    const mapH = VIEW_H * TILE_Y;
    R.panel(ctx, MAP_X - 12, MAP_Y - 12, mapW + 24, mapH + 24, { fill: "#23351e", inner: false, border: "rgba(225,212,160,0.62)" });

    ctx.save();
    ctx.beginPath();
    ctx.rect(MAP_X, MAP_Y, mapW, mapH);
    ctx.clip();

    const range = visibleTileRange();
    for (let y = range.startY; y <= range.endY; y += 1) {
      for (let x = range.startX; x <= range.endX; x += 1) {
        const point = tilePoint(x, y);
        const terrain = terrainAt(x, y);
        if (terrain === "water") {
          drawWaterTile(ctx, point.x, point.y, x, y, x * 13 + y * 7);
        } else if (terrain === "shopWall" || terrain === "shopFloor" || terrain === "shopDoor") {
          drawLevelOneShopTile(ctx, point.x, point.y, terrain, x * 13 + y * 7);
        } else if (terrain === "blacksmithWall" || terrain === "blacksmithFloor" || terrain === "blacksmithDoor") {
          drawLevelOneBlacksmithTile(ctx, point.x, point.y, terrain, x * 13 + y * 7);
        } else {
          R.drawTownGround(ctx, point.x, point.y, TILE, terrain === "road" || terrain === "stone", x * 13 + y * 7);
        }
      }
    }
    const entities = [];
    for (let y = range.startY; y <= range.endY; y += 1) {
      for (let x = range.startX; x <= range.endX; x += 1) {
        const type = decorType(state, x, y);
        if (!type) continue;
        entities.push({
          x,
          y: y + 0.72,
          depthY: y + 0.72,
          draw: () => drawDecorAtTile(ctx, type, x, y)
        });
      }
    }
    townAnimals(state).forEach((animal) => {
      const visualAnimal = animalVisual(animal);
      if (!inView(visualAnimal.x, visualAnimal.y)) return;
      entities.push({
        x: visualAnimal.x,
        y: visualAnimal.y + 0.80,
        depthY: visualAnimal.y + 0.80,
        draw: () => drawAnimal(ctx, animal, visualAnimal)
      });
    });
    if (story && story.type === "blacksmithArrival" && !story.opened && (story.phase === "walk" || story.phase === "godoTalk")) {
      const visualGodo = godoVisual(story.elapsed);
      if (inView(visualGodo.x, visualGodo.y)) {
        entities.push({
          x: visualGodo.x,
          y: visualGodo.y + 0.82,
          depthY: visualGodo.y + 0.82,
          draw: () => drawGodo(ctx, visualGodo)
        });
      }
    }
    if (levelOneBlacksmithOpen() && inView(LEVEL_ONE_BLACKSMITH.x + 2, LEVEL_ONE_BLACKSMITH.y + 3)) {
      entities.push({
        x: LEVEL_ONE_BLACKSMITH.x + 2,
        y: LEVEL_ONE_BLACKSMITH.y + 3.70,
        depthY: LEVEL_ONE_BLACKSMITH.y + 3.70,
        draw: () => drawLevelOneBlacksmithProps(ctx)
      });
    }
    Game.Town.getVisibleBuildings(state).forEach((building) => {
      if (!inView(building.x, building.y)) return;
      entities.push({
        x: building.x,
        y: building.y + 0.78,
        depthY: building.y + 0.78,
        draw: () => drawBuilding(ctx, state, building)
      });
    });
    Game.Town.getVisibleVillagers(state).forEach((villager) => {
      if (!inView(villager.x, villager.y)) return;
      const facing = villagerFacing(villager);
      const visualVillager = Game.Animations ? Game.Animations.entityTile("town", `villager:${villager.id}`, villager.x, villager.y, facing) : { x: villager.x, y: villager.y, moving: false, direction: facing };
      entities.push({
        x: visualVillager.x,
        y: visualVillager.y + 0.82,
        depthY: visualVillager.y + 0.82,
        draw: () => drawVillager(ctx, villager, visualVillager)
      });
    });

    const visual = heroVisual;
    entities.push({
      x: visual.x,
      y: visual.y + 0.84,
      depthY: visual.y + 0.84,
      draw: () => drawHero(ctx, state, visual)
    });

    if (target && target.x !== undefined && target.y !== undefined && inView(target.x, target.y)) drawTargetMarker(ctx, target);
    R.sortEntitiesByDepth(entities).forEach((entity) => entity.draw());
    ctx.restore();
  }

  function decorType(state, x, y) {
    if (activeTownLevel <= 1) {
      if (terrainAt(x, y) !== "grass" || Game.Town.getVillagerAt(state, x, y)) return null;
      if (isAt(x, y, [[39, 37], [42, 50]])) return "bigTree";
      if (isAt(x, y, [[61, 39], [62, 50]])) return "tree";
      if (isAt(x, y, [[42, 37], [54, 38]])) return "tree";
      if (isAt(x, y, [[39, 49], [58, 48]])) return "bigTree";
      if (isAt(x, y, [[63, 42]])) return "tree";
      if (isAt(x, y, [[44, 46], [52, 46], [47, 50], [51, 36], [55, 37], [57, 40]])) return "bush";
      if ((x === 50 && y === 46) || (x === 55 && y === 44)) return "crate";
      if (isAt(x, y, [[41, 41], [52, 49], [59, 43]])) return "flowerWhite";
      if (isAt(x, y, [[44, 48], [53, 47], [60, 41]])) return "flowerYellow";
      if (isAt(x, y, [[45, 47], [52, 36], [57, 42]])) return "flowerYellow";
      if (isAt(x, y, [[43, 42], [55, 45]])) return "flowerWhite";
      if (isAt(x, y, [[60, 45], [40, 48]])) return "flowerBlue";
      if (isAt(x, y, [[44, 37], [59, 50]])) return "rockTan";
      if (isAt(x, y, [[53, 35], [63, 44]])) return "rockGray";
      if (isAt(x, y, [[40, 36], [54, 50]])) return "rockTanB";
      if (isAt(x, y, [[58, 39], [64, 41]])) return "rockGrayB";
      if (isAt(x, y, [[40, 40], [57, 47]])) return "rockTanB";
      return null;
    }
    if (terrainAt(x, y) === "water" || isRoad(x, y) || Game.Town.getBuildingAt(state, x, y) || Game.Town.getVillagerAt(state, x, y)) return null;
    if (x === 50 && y === 50 && state.town.level >= 2) return "fountain";
    if (isTownBorderTree(x, y) || pseudoTile(x, y, 17) > 0.94) return "tree";
    if (pseudoTile(x, y, 29) > 0.90) return "bush";
    if ((x === 42 && y === 39) || (x === 58 && y === 38) || (x === 72 && y === 43)) return "crate";
    return null;
  }

  function isAt(x, y, points) {
    return points.some((point) => point[0] === x && point[1] === y);
  }

  function townCamera(state, visualHero) {
    const maxX = Math.max(0, state.townMap.width - VIEW_W);
    const maxY = Math.max(0, state.townMap.height - VIEW_H);
    if (state.townStory && state.townStory.type === "blacksmithArrival") {
      return {
        x: Math.max(0, Math.min(maxX, 42 - VIEW_W / 2)),
        y: Math.max(0, Math.min(maxY, 49 - VIEW_H / 2))
      };
    }
    const heroX = visualHero && Number.isFinite(visualHero.x) ? visualHero.x : state.townMap.hero.x;
    const heroY = visualHero && Number.isFinite(visualHero.y) ? visualHero.y : state.townMap.hero.y;
    return {
      x: Math.max(0, Math.min(maxX, heroX - VIEW_W / 2 + 0.5)),
      y: Math.max(0, Math.min(maxY, heroY - VIEW_H / 2 + 0.5))
    };
  }

  function smoothTownCamera(target) {
    const now = (window.performance && performance.now) ? performance.now() : Date.now();
    if (!cameraVisual) {
      cameraVisual = { x: target.x, y: target.y };
      cameraVisualTime = now;
      return cameraVisual;
    }
    // The town camera follows the hero's visual tile position directly.
    // A second delayed lerp here made the whole map wobble after each step.
    cameraVisualTime = now;
    cameraVisual.x = target.x;
    cameraVisual.y = target.y;
    return cameraVisual;
  }

  function visibleTileRange() {
    return {
      startX: Math.floor(activeCamera.x) - 1,
      startY: Math.floor(activeCamera.y) - 1,
      endX: Math.ceil(activeCamera.x + VIEW_W) + 1,
      endY: Math.ceil(activeCamera.y + VIEW_H) + 1
    };
  }

  function inView(x, y) {
    return x >= activeCamera.x - 1 && x <= activeCamera.x + VIEW_W && y >= activeCamera.y - 1 && y <= activeCamera.y + VIEW_H;
  }

  function terrainAt(x, y) {
    const shopTerrain = levelOneShopTerrain(x, y);
    if (shopTerrain) return shopTerrain;
    const blacksmithTerrain = levelOneBlacksmithTerrain(x, y);
    if (blacksmithTerrain) return blacksmithTerrain;
    if (isStonePlaza(x, y)) return "stone";
    if (isRoad(x, y)) return "road";
    if (isWater(x, y)) return "water";
    return "grass";
  }

  function levelOneShopTerrain(x, y) {
    if (activeTownLevel > 1) return null;
    const footprint = LEVEL_ONE_SHOP;
    const inside = x >= footprint.x && x < footprint.x + footprint.w && y >= footprint.y && y < footprint.y + footprint.h;
    if (!inside) return null;
    const left = x === footprint.x;
    const right = x === footprint.x + footprint.w - 1;
    const top = y === footprint.y;
    const bottom = y === footprint.y + footprint.h - 1;
    const door = bottom && x >= footprint.x + 4 && x <= footprint.x + 5;
    const divider = y === footprint.y + 3 && ((x >= footprint.x && x <= footprint.x + 2) || (x >= footprint.x + 7 && x <= footprint.x + footprint.w - 1));
    if (door) return "shopDoor";
    if (left || right || top || bottom || divider) return "shopWall";
    return "shopFloor";
  }

  function levelOneBlacksmithOpen() {
    return activeTownLevel <= 1 && activeTownState && activeTownState.buildings && activeTownState.buildings.blacksmithLevel > 0;
  }

  function levelOneBlacksmithTerrain(x, y) {
    if (!levelOneBlacksmithOpen()) return null;
    const fp = LEVEL_ONE_BLACKSMITH;
    const inside = x >= fp.x && x < fp.x + fp.w && y >= fp.y && y < fp.y + fp.h;
    if (!inside) return null;
    const left = x === fp.x;
    const right = x === fp.x + fp.w - 1;
    const top = y === fp.y;
    const bottom = y === fp.y + fp.h - 1;
    const door = right && y >= fp.y + 2 && y <= fp.y + 3;
    if (door) return "blacksmithDoor";
    if (left || right || top || bottom) return "blacksmithWall";
    return "blacksmithFloor";
  }

  function isWater(x, y) {
    if (activeTownLevel <= 1) {
      return isLevelOneWaterTile(x, y);
    }
    if (x < 12 && y < 60) return true;
    if (x < 22 && y >= 24 && y <= 36) return true;
    if (x < 18 && y >= 49 && y <= 59) return true;
    if (x >= 51 && x <= 58 && y >= 35 && y <= 42) return true;
    return false;
  }

  function isLevelOneWaterTile(x, y) {
    return ((y === 34 && x >= 57 && x <= 60) ||
      (y === 35 && x >= 56 && x <= 61) ||
      (y === 36 && x >= 56 && x <= 62) ||
      (y === 37 && x >= 57 && x <= 61) ||
      (y === 44 && x >= 39 && x <= 42) ||
      (y === 45 && x >= 38 && x <= 42) ||
      (y === 46 && x >= 38 && x <= 43) ||
      (y === 47 && x >= 39 && x <= 42) ||
      (y === 46 && x >= 61 && x <= 63) ||
      (y === 47 && x >= 60 && x <= 64) ||
      (y === 48 && x >= 61 && x <= 63));
  }

  function isStonePlaza(x, y) {
    if (activeTownLevel <= 1) return false;
    return (x >= 46 && x <= 54 && y >= 40 && y <= 50) ||
      (x >= 34 && x <= 40 && y >= 30 && y <= 36) ||
      (x >= 58 && x <= 70 && y >= 30 && y <= 50);
  }

  function isTownBorderTree(x, y) {
    if (activeTownLevel <= 1) return false;
    return ((x >= 24 && x <= 80 && (y === 20 || y === 64)) || (y >= 20 && y <= 64 && (x === 24 || x === 80))) && (x + y) % 2 === 0;
  }

  function pseudoTile(x, y, salt) {
    const n = Math.sin((x * 41.13 + y * 17.97 + salt * 7.31) * 12.9898) * 43758.5453;
    return n - Math.floor(n);
  }

  function tilePoint(x, y) {
    return {
      x: MAP_X + (x - activeCamera.x) * TILE + (y - activeCamera.y) * ROW_SKEW,
      y: MAP_Y + (y - activeCamera.y) * TILE_Y
    };
  }

  function tileFoot(x, y) {
    const point = tilePoint(x, y);
    return {
      x: point.x + TILE / 2,
      y: point.y + TILE * 0.76
    };
  }

  function drawDecorAtTile(ctx, type, x, y) {
    const point = tilePoint(x, y);
    const px = point.x;
    const py = point.y;
    drawDecor(ctx, type, px, py);
  }

  function drawDecor(ctx, type, px, py) {
    if (type === "bigTree") drawBigTree(ctx, px, py);
    if (type === "tree") drawTree(ctx, px, py);
    if (type === "pineTree") drawTreeVariant(ctx, px, py, "ninja-town-pine", -4, TILE + 8, TILE + 24, 0.29);
    if (type === "roundTree") drawTreeVariant(ctx, px, py, "ninja-town-roundtree", -4, TILE + 8, TILE + 24, 0.28);
    if (type === "brightTree") drawTreeVariant(ctx, px, py, "ninja-town-brighttree", -5, TILE + 10, TILE + 24, 0.28);
    if (type === "pinkTree") drawTreeVariant(ctx, px, py, "ninja-town-pinktree", -10, TILE + 20, TILE + 24, 0.31);
    if (type === "fountain") drawFountain(ctx, px, py);
    if (type === "bush") drawBush(ctx, px, py);
    if (type === "crate") drawCrate(ctx, px, py);
    if (type === "grassTuft") drawSmallGroundSprite(ctx, "ninja-resource-grass", px + 4, py + 8, 16, 16, 0.10, "grass");
    if (type === "flowerYellow") drawSmallGroundSprite(ctx, "ninja-town-flower-yellow", px + 4, py + 8, 16, 16, 0.11, "flower");
    if (type === "flowerWhite") drawSmallGroundSprite(ctx, "ninja-town-flower-white", px + 4, py + 8, 16, 16, 0.11, "flower");
    if (type === "flowerBlue") drawSmallGroundSprite(ctx, "ninja-town-flower-blue", px + 4, py + 8, 16, 16, 0.11, "flower");
    if (type === "rockTan") drawSmallGroundSprite(ctx, "ninja-town-rock-a", px + 4, py + 9, 16, 16, 0.18, "rock");
    if (type === "rockGray") drawSmallGroundSprite(ctx, "ninja-town-rock-g", px + 4, py + 9, 16, 16, 0.18, "rock");
    if (type === "rockTanB") drawSmallGroundSprite(ctx, "ninja-town-rock-b", px + 4, py + 9, 16, 16, 0.18, "rock");
    if (type === "rockGrayB") drawSmallGroundSprite(ctx, "ninja-town-rock-h", px + 4, py + 9, 16, 16, 0.18, "rock");
    if (type === "log") drawLog(ctx, px, py);
  }

  function drawWaterTile(ctx, x, y, tileX, tileY, variant) {
    const R = Game.Renderer;
    R.drawTownGround(ctx, x, y, TILE, false, variant);
    const top = !isWater(tileX, tileY - 1);
    const bottom = !isWater(tileX, tileY + 1);
    const left = !isWater(tileX - 1, tileY);
    const right = !isWater(tileX + 1, tileY);
    const padTop = top ? 3 : 0;
    const padBottom = bottom ? 3 : 0;
    const padLeft = left ? 3 : 0;
    const padRight = right ? 3 : 0;
    const waterX = x + padLeft;
    const waterY = y + padTop;
    const waterW = TILE - padLeft - padRight;
    const waterH = TILE - padTop - padBottom;
    const shore = "#9fb94f";
    const shoreDark = "rgba(74,105,42,0.42)";

    if (top) R.rect(ctx, x, y, TILE, 4, shore);
    if (bottom) R.rect(ctx, x, y + TILE - 4, TILE, 4, shoreDark);
    if (left) R.rect(ctx, x, y, 4, TILE, "rgba(144,177,74,0.82)");
    if (right) R.rect(ctx, x + TILE - 4, y, 4, TILE, "rgba(65,91,42,0.45)");
    if (top && left) R.rect(ctx, x, y, 7, 7, "rgba(170,197,84,0.95)");
    if (top && right) R.rect(ctx, x + TILE - 7, y, 7, 7, "rgba(132,166,75,0.82)");
    if (bottom && left) R.rect(ctx, x, y + TILE - 7, 7, 7, "rgba(91,126,58,0.58)");
    if (bottom && right) R.rect(ctx, x + TILE - 7, y + TILE - 7, 7, 7, "rgba(52,79,46,0.50)");

    R.rect(ctx, waterX, waterY, waterW, waterH, variant % 2 ? "#1666ba" : "#105bab");
    R.rect(ctx, waterX, waterY, waterW, 2, "rgba(157,229,255,0.28)");
    R.rect(ctx, waterX, waterY + waterH - 3, waterW, 3, "rgba(0,23,84,0.25)");
    R.rect(ctx, waterX, waterY + 2, 2, waterH - 4, "rgba(184,242,255,0.10)");
    R.rect(ctx, waterX + waterW - 3, waterY + 3, 3, waterH - 5, "rgba(0,25,84,0.18)");
    const wave = (variant % 11) + 3;
    R.rect(ctx, waterX + Math.min(waterW - 8, wave), waterY + 7, 8, 1, "rgba(206,245,255,0.50)");
    R.rect(ctx, waterX + Math.min(waterW - 7, ((wave + 9) % 16)), waterY + Math.max(10, waterH - 8), 7, 1, "rgba(206,245,255,0.34)");
  }

  function drawLevelOneShopTile(ctx, x, y, terrain, variant) {
    const R = Game.Renderer;
    if (terrain === "shopWall") {
      if (R.drawSpriteImage(ctx, "ninja-shop-wall", x, y, TILE, TILE, "wall", "")) {
        R.rect(ctx, x, y + TILE - 5, TILE, 5, "rgba(0,0,0,0.18)");
        R.rect(ctx, x, y, TILE, 3, "rgba(255,238,188,0.10)");
        return;
      }
      R.rect(ctx, x, y, TILE, TILE, variant % 2 ? "#574a50" : "#4d4248");
      R.rect(ctx, x, y, TILE, 5, "#7b6b72");
      R.rect(ctx, x, y + TILE - 6, TILE, 6, "#342e33");
      R.rect(ctx, x + TILE - 5, y + 4, 5, TILE - 8, "rgba(12,11,12,0.26)");
      R.rect(ctx, x + 2, y + 8, TILE - 4, 2, "rgba(255,236,184,0.10)");
      R.rect(ctx, x + 2, y + 15, TILE - 4, 2, "rgba(0,0,0,0.16)");
      R.stroke(ctx, x, y, TILE, TILE, "rgba(20,18,18,0.72)", 1);
      return;
    }
    if (terrain === "shopDoor") {
      if (!R.drawSpriteImage(ctx, "ninja-shop-door", x, y, TILE, TILE, "floor", "")) drawLevelOneShopTile(ctx, x, y, "shopFloor", variant);
      R.rect(ctx, x + 1, y + TILE - 5, TILE - 2, 4, "#6b4730");
      R.rect(ctx, x + 2, y + TILE - 9, TILE - 4, 3, "rgba(255,226,152,0.32)");
      R.stroke(ctx, x + 1, y + TILE - 9, TILE - 2, 8, "rgba(65,37,20,0.62)", 1);
      return;
    }
    if (R.drawSpriteImage(ctx, "ninja-shop-floor", x, y, TILE, TILE, "floor", "")) {
      R.rect(ctx, x, y, TILE, 2, "rgba(255,244,204,0.12)");
      R.rect(ctx, x, y + TILE - 3, TILE, 3, "rgba(98,52,31,0.10)");
      return;
    }
    R.rect(ctx, x, y, TILE, TILE, variant % 2 ? "#f3aa72" : "#f7b77a");
    R.rect(ctx, x + 1, y + 3, TILE - 2, 3, "rgba(255,238,190,0.25)");
    R.rect(ctx, x + 1, y + 11, TILE - 2, 2, "rgba(141,77,40,0.22)");
    R.rect(ctx, x + 1, y + 19, TILE - 2, 2, "rgba(141,77,40,0.18)");
    if (variant % 4 === 0) R.rect(ctx, x + 5, y + 7, 8, 2, "rgba(122,71,37,0.16)");
    if (variant % 5 === 0) R.rect(ctx, x + 12, y + 16, 7, 2, "rgba(255,230,177,0.20)");
    R.stroke(ctx, x, y, TILE, TILE, "rgba(119,64,35,0.30)", 1);
  }

  function drawLevelOneBlacksmithTile(ctx, x, y, terrain, variant) {
    const mapped = terrain === "blacksmithWall" ? "shopWall" : terrain === "blacksmithDoor" ? "shopDoor" : "shopFloor";
    drawLevelOneShopTile(ctx, x, y, mapped, variant);
    const R = Game.Renderer;
    if (terrain === "blacksmithWall") {
      R.rect(ctx, x, y, TILE, TILE, "rgba(34,35,40,0.18)");
      return;
    }
    if (terrain === "blacksmithDoor") {
      R.rect(ctx, x + TILE - 5, y + 2, 4, TILE - 4, "#6b4730");
      R.rect(ctx, x + TILE - 9, y + 3, 3, TILE - 6, "rgba(255,226,152,0.28)");
      R.stroke(ctx, x + TILE - 9, y + 1, 8, TILE - 2, "rgba(65,37,20,0.62)", 1);
      return;
    }
    R.rect(ctx, x, y, TILE, TILE, "rgba(82,62,48,0.06)");
    return;
  }

  function drawLevelOneBlacksmithProps(ctx) {
    const R = Game.Renderer;
    const fp = LEVEL_ONE_BLACKSMITH;
    const forge = tilePoint(fp.x + 1, fp.y + 1);
    const anvil = tilePoint(fp.x + 1, fp.y + 2);
    const tool = tilePoint(fp.x + 4, fp.y + 1);
    const godo = tilePoint(fp.x + 2, fp.y + 1.08);

    drawCharacterGroundShadow(ctx, godo.x, godo.y, 0.30);
    R.drawWalkingSprite(ctx, "villager-smith", godo.x + 1, godo.y - 1, TILE - 2, TILE - 2, "down", { moving: false, direction: "down", walkFrame: 0, swayPx: 0 }, "villager", "G");

    R.drawGlow(ctx, forge.x + 13, forge.y + 13, 20, "rgba(255,130,56,0.20)", 0.20);
    R.drawShadow(ctx, forge.x + 4, forge.y + 13, 16, 8, 0.26);
    R.rect(ctx, forge.x + 5, forge.y + 8, 15, 12, "#5c4a43");
    R.rect(ctx, forge.x + 6, forge.y + 9, 13, 4, "#2e2930");
    R.rect(ctx, forge.x + 8, forge.y + 13, 9, 5, "#e06932");
    R.rect(ctx, forge.x + 10, forge.y + 12, 5, 2, "#ffd26c");
    R.stroke(ctx, forge.x + 5, forge.y + 8, 15, 12, "rgba(14,11,10,0.72)", 1);

    R.drawShadow(ctx, anvil.x + 2, anvil.y + 15, 66, 10, 0.30);
    for (let i = 0; i < 3; i += 1) {
      const x = anvil.x + i * TILE;
      R.rect(ctx, x + 2, anvil.y + 7, TILE - 4, 15, "#63402a");
      R.rect(ctx, x + 2, anvil.y + 7, TILE - 4, 5, "#bf7a38");
      R.rect(ctx, x + 2, anvil.y + 18, TILE - 4, 4, "rgba(32,17,8,0.42)");
      R.stroke(ctx, x + 2, anvil.y + 7, TILE - 4, 15, "rgba(27,14,8,0.82)", 1);
    }
    R.rect(ctx, anvil.x + 11, anvil.y + 1, 25, 10, "#70777a");
    R.rect(ctx, anvil.x + 15, anvil.y - 2, 12, 5, "#9ea7a7");
    R.rect(ctx, anvil.x + 28, anvil.y + 2, 8, 4, "#525b5e");
    R.rect(ctx, anvil.x + 17, anvil.y + 11, 8, 6, "#4d5356");
    R.stroke(ctx, anvil.x + 11, anvil.y + 1, 25, 10, "rgba(18,20,20,0.78)", 1);

    R.drawShadow(ctx, tool.x + 8, tool.y + 15, 10, 6, 0.20);
    R.rect(ctx, tool.x + 10, tool.y + 5, 3, 15, "#5b3b25");
    R.rect(ctx, tool.x + 8, tool.y + 4, 8, 4, "#b9b0a4");
    R.rect(ctx, tool.x + 7, tool.y + 17, 10, 3, "#7b4e27");

    const sign = tilePoint(fp.x + 2, fp.y);
    R.rect(ctx, sign.x + 5, sign.y + 1, 14, 10, "rgba(54,37,21,0.92)");
    R.stroke(ctx, sign.x + 5, sign.y + 1, 14, 10, "#e0c47a", 1);
    R.text(ctx, "鍛", sign.x + 12, sign.y + 2, { size: 9, align: "center", color: "#fff2b8", bold: true, shadow: false });
  }

  function drawCastShadow(ctx, x, y, w, h, depth, alpha) {
    const R = Game.Renderer;
    R.ellipse(ctx, x + w / 2, y + h * 0.78, Math.max(8, w * 0.38), Math.max(3, h * 0.08), `rgba(0,0,0,${alpha == null ? 0.14 : alpha})`);
  }

  function drawTreeVariant(ctx, px, py, spriteName, ox, w, h, shadowAlpha) {
    const R = Game.Renderer;
    const footY = py + TILE + 1;
    const drawX = px + ox;
    const drawY = footY - h;
    R.ellipse(ctx, px + TILE / 2 + 2, footY - 2, Math.max(7, w * 0.18), 3, `rgba(0,0,0,${shadowAlpha || 0.26})`);
    if (R.drawSpriteImage(ctx, spriteName, drawX, drawY, w, h, "tree", "")) return;
    drawTree(ctx, px, py);
  }

  function drawSmallGroundSprite(ctx, spriteName, x, y, w, h, shadowAlpha, fallbackType) {
    const R = Game.Renderer;
    R.drawShadow(ctx, x + 3, y + h - 3, w - 6, 5, shadowAlpha || 0.14);
    if (R.drawSpriteImage(ctx, spriteName, x, y, w, h, fallbackType || "item", "")) return;
    R.rect(ctx, x + 4, y + 7, w - 8, h - 8, fallbackType === "rock" ? "#79816e" : "#5aa33d");
    R.stroke(ctx, x + 4, y + 7, w - 8, h - 8, "rgba(24,32,18,0.38)", 1);
  }

  function drawLog(ctx, px, py) {
    const R = Game.Renderer;
    R.drawShadow(ctx, px + 1, py + 17, TILE + 2, 6, 0.18);
    if (R.drawSpriteImage(ctx, "ninja-town-log", px - 2, py + 7, TILE + 4, 14, "crate", "")) return;
    R.rect(ctx, px + 2, py + 10, TILE - 4, 8, "#8d5b2f");
    R.rect(ctx, px + 3, py + 11, TILE - 6, 2, "rgba(255,220,145,0.25)");
    R.stroke(ctx, px + 2, py + 10, TILE - 4, 8, "rgba(43,25,11,0.65)", 1);
  }

  function townAnimals(state) {
    if (!state || activeTownLevel > 1) return [];
    return LEVEL_ONE_ANIMALS;
  }

  function animalVisual(animal) {
    const path = animal.path && animal.path.length ? animal.path : [[0, 0], [0.8, 0]];
    const cycle = ((Date.now() / animal.speed) + (animal.phase || 0)) % path.length;
    const index = Math.floor(cycle);
    const nextIndex = (index + 1) % path.length;
    const raw = cycle - index;
    const from = path[index];
    const to = path[nextIndex];
    const dx = (to[0] || 0) - (from[0] || 0);
    const dy = (to[1] || 0) - (from[1] || 0);
    const direction = dx < -0.02 ? "left" : "right";
    return {
      x: animal.x + (from[0] || 0) + dx * raw,
      y: animal.y + (from[1] || 0) + dy * raw,
      frame: Math.floor(Date.now() / 140 + (animal.phase || 0) * 7) % 2,
      direction,
      step: Math.sin(raw * Math.PI * 2)
    };
  }

  function drawAnimal(ctx, animal, visual) {
    const R = Game.Renderer;
    const point = tilePoint(visual.x, visual.y);
    const size = animal.size || 16;
    const x = point.x + Math.round((TILE - size) / 2);
    const footY = point.y + TILE + 1;
    const y = footY - size + (animal.footDrop || 0) + Math.sin(Date.now() / 180 + (animal.phase || 0)) * 0.25;
    R.ellipse(ctx, x + size / 2, footY - 1, Math.max(5, size * 0.32), 2.4, "rgba(0,0,0,0.24)");
    if (drawAnimalSprite(ctx, animal.sprite, x, y, size, size, visual.direction, visual.frame)) return;
    R.rect(ctx, x + 3, y + 5, size - 6, size - 8, animal.id === "chicken" ? "#e9d7a5" : "#b77b4c");
    R.rect(ctx, x + size - 6, y + 6, 3, 3, "#1a1a1a");
  }

  function drawAnimalSprite(ctx, spriteName, x, y, w, h, direction, frame) {
    const image = Game.Sprites && Game.Sprites.get(spriteName);
    if (!image) return false;
    const frameW = Math.floor(image.width / 2);
    const frameH = image.height;
    if (frameW <= 0 || frameH <= 0) return false;
    const sx = (Math.max(0, frame || 0) % 2) * frameW;
    try {
      ctx.save();
      if (direction === "left") {
        ctx.translate(Math.round(x + w), Math.round(y));
        ctx.scale(-1, 1);
        ctx.drawImage(image, sx, 0, frameW, frameH, 0, 0, Math.round(w), Math.round(h));
      } else {
        ctx.drawImage(image, sx, 0, frameW, frameH, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
      }
      ctx.restore();
      return true;
    } catch (error) {
      ctx.restore();
      return false;
    }
  }

  function drawTree(ctx, px, py) {
    const R = Game.Renderer;
    R.drawShadow(ctx, px - 7, py + TILE - 4, TILE + 14, 10, 0.25);
    if (R.drawSpriteImage(ctx, "ninja-town-tree", px - 13, py - 18, TILE + 26, TILE + 20, "tree", "")) return;
    drawCastShadow(ctx, px + 8, py + 23, TILE - 16, TILE - 17, 14, 0.18);
    R.drawShadow(ctx, px + 7, py + 18, TILE - 14, TILE - 12, 0.24);
    R.rect(ctx, px + TILE * 0.46, py + TILE * 0.48, 9, 19, "#5a341d");
    R.rect(ctx, px + TILE * 0.51, py + TILE * 0.50, 5, 18, "rgba(0,0,0,0.18)");
    R.ellipse(ctx, px + TILE * 0.50, py + TILE * 0.35, 23, 18, "rgba(36,98,42,0.96)");
    R.ellipse(ctx, px + TILE * 0.34, py + TILE * 0.43, 16, 12, "rgba(48,123,51,0.96)");
    R.ellipse(ctx, px + TILE * 0.65, py + TILE * 0.44, 17, 13, "rgba(26,78,38,0.96)");
    R.ellipse(ctx, px + TILE * 0.50, py + TILE * 0.24, 15, 11, "rgba(61,126,50,0.96)");
    R.rect(ctx, px + TILE * 0.30, py + TILE * 0.20, 22, 4, "rgba(202,238,134,0.18)");
    R.rect(ctx, px + TILE * 0.63, py + TILE * 0.55, 12, 4, "rgba(0,0,0,0.16)");
  }

  function drawBigTree(ctx, px, py) {
    const R = Game.Renderer;
    R.drawShadow(ctx, px - 15, py + TILE - 4, TILE + 30, 13, 0.31);
    if (R.drawSpriteImage(ctx, "ninja-town-tree", px - 20, py - 30, TILE + 40, TILE + 36, "tree", "")) return;
    R.rect(ctx, px + TILE * 0.43, py + TILE * 0.38, 11, 29, "#5a341d");
    R.rect(ctx, px + TILE * 0.52, py + TILE * 0.42, 5, 27, "rgba(0,0,0,0.20)");
    R.ellipse(ctx, px + TILE * 0.50, py + TILE * 0.23, 31, 22, "rgba(36,98,42,0.98)");
    R.ellipse(ctx, px + TILE * 0.24, py + TILE * 0.40, 20, 15, "rgba(48,123,51,0.96)");
    R.ellipse(ctx, px + TILE * 0.75, py + TILE * 0.42, 22, 16, "rgba(26,78,38,0.97)");
    R.ellipse(ctx, px + TILE * 0.50, py + TILE * 0.02, 19, 14, "rgba(69,134,54,0.96)");
    R.ellipse(ctx, px + TILE * 0.48, py + TILE * 0.52, 28, 17, "rgba(31,91,38,0.96)");
    R.rect(ctx, px + TILE * 0.10, py + TILE * 0.06, 30, 5, "rgba(220,248,148,0.17)");
    R.rect(ctx, px + TILE * 0.62, py + TILE * 0.60, 18, 5, "rgba(0,0,0,0.18)");
  }

  function drawFountain(ctx, px, py) {
    const R = Game.Renderer;
    R.drawShadow(ctx, px + 3, py + 15, TILE - 6, 8, 0.26);
    R.ellipse(ctx, px + TILE / 2, py + 18, 11, 5, "rgba(43,67,77,0.96)");
    R.ellipse(ctx, px + TILE / 2, py + 15, 9, 4, "rgba(115,190,211,0.92)");
    R.rect(ctx, px + 10, py + 8, 4, 8, "#d8d1b8");
    R.rect(ctx, px + 11, py + 5, 3, 4, "#e8dec2");
    R.rect(ctx, px + 13, py + 9, 2, 7, "rgba(0,0,0,0.15)");
    R.drawGlow(ctx, px + TILE / 2, py + 14, 14, "rgba(130,214,255,0.18)", 0.18);
  }

  function drawBush(ctx, px, py) {
    const R = Game.Renderer;
    R.drawShadow(ctx, px + 3, py + 15, TILE - 6, 7, 0.18);
    if (R.drawSpriteImage(ctx, "ninja-town-bush", px + 1, py + 8, TILE - 2, 12, "bush", "")) return;
    R.drawShadow(ctx, px + 5, py + 16, TILE - 10, 7, 0.18);
    R.ellipse(ctx, px + 9, py + 16, 6, 4, "rgba(44,104,43,0.96)");
    R.ellipse(ctx, px + 15, py + 16, 7, 5, "rgba(34,88,38,0.96)");
    R.ellipse(ctx, px + 12, py + 12, 6, 4, "rgba(69,128,50,0.95)");
    R.rect(ctx, px + 8, py + 10, 6, 2, "rgba(205,233,137,0.16)");
  }

  function drawCrate(ctx, px, py) {
    const R = Game.Renderer;
    R.drawShadow(ctx, px + 6, py + 15, TILE - 12, 8, 0.22);
    if (R.drawSpriteImage(ctx, "ninja-town-crate", px + 5, py + 7, TILE - 10, TILE - 10, "crate", "")) return;
    R.drawShadow(ctx, px + 6, py + 13, TILE - 12, 9, 0.22);
    R.rect(ctx, px + 7, py + 9, 10, 10, "#7a5431");
    R.rect(ctx, px + 7, py + 9, 10, 3, "#a06f3d");
    R.rect(ctx, px + 8, py + 16, 8, 2, "rgba(0,0,0,0.22)");
    R.stroke(ctx, px + 7, py + 9, 10, 10, "rgba(38,24,12,0.72)", 1);
  }

  function drawBuilding(ctx, state, building) {
    if (building.id === "shop" && activeTownLevel <= 1) {
      drawLevelOneShopProps(ctx, state, building);
      return;
    }
    const R = Game.Renderer;
    const point = tilePoint(building.x, building.y);
    const stage = Game.Town.buildingStage(state, building);
    const palette = buildingPixelPalette(building);
    const x = point.x - 12;
    const y = point.y - 18;
    const w = 48;
    const h = 42;
    const label = building && building.symbol ? building.symbol : "\u5e97";
    R.ellipse(ctx, point.x + TILE / 2 + 5, point.y + TILE - 1, 28, 8, "rgba(0,0,0,0.28)");

    R.rect(ctx, x + 7, y + 19, w - 14, h - 19, palette.wall);
    R.rect(ctx, x + 9, y + 21, w - 18, 3, "rgba(255,244,198,0.18)");
    R.rect(ctx, x + 7, y + h - 7, w - 14, 6, "rgba(0,0,0,0.18)");
    R.rect(ctx, x + 14, y + 2, w - 28, 4, palette.roof);
    R.rect(ctx, x + 9, y + 6, w - 18, 7, palette.roof);
    R.rect(ctx, x + 4, y + 13, w - 8, 9, palette.roofDark);
    R.rect(ctx, x + 10, y + 6, w - 20, 2, "rgba(255,235,168,0.20)");
    R.rect(ctx, x + 6, y + 19, w - 12, 3, "rgba(0,0,0,0.23)");
    for (let sx = x + 12; sx < x + w - 10; sx += 8) {
      R.rect(ctx, sx, y + 9, 2, 10, "rgba(0,0,0,0.12)");
    }

    const doorW = 10;
    const doorX = x + Math.round(w / 2 - doorW / 2);
    R.rect(ctx, doorX, y + h - 17, doorW, 16, palette.door);
    R.rect(ctx, doorX + doorW - 3, y + h - 9, 2, 2, palette.accent);
    R.stroke(ctx, doorX, y + h - 17, doorW, 16, "rgba(24,16,10,0.58)", 1);

    R.rect(ctx, x + 11, y + 27, 7, 7, "#f7e6a3");
    R.rect(ctx, x + w - 18, y + 27, 7, 7, "#f7e6a3");
    R.rect(ctx, x + 12, y + 28, 5, 2, "rgba(255,255,255,0.24)");
    R.rect(ctx, x + w - 17, y + 28, 5, 2, "rgba(255,255,255,0.24)");
    R.stroke(ctx, x + 11, y + 27, 7, 7, palette.trim, 1);
    R.stroke(ctx, x + w - 18, y + 27, 7, 7, palette.trim, 1);
    R.rect(ctx, x + Math.round(w / 2) - 9, y + 16, 18, 11, "rgba(54,37,21,0.90)");
    R.stroke(ctx, x + Math.round(w / 2) - 9, y + 16, 18, 11, "#e0c47a", 1);
    R.text(ctx, label, x + Math.round(w / 2), y + 17, { size: 11, align: "center", color: "#fff2b8", bold: true, shadow: false });

    R.stroke(ctx, x + 7, y + 19, w - 14, h - 19, "rgba(34,24,15,0.55)", 1);
    if (stage >= 2) {
      R.rect(ctx, x + 2, y + h - 2, w - 4, 2, palette.accent);
      R.rect(ctx, x + w - 11, y + 13, 5, 9, palette.accent);
    }
    if (stage >= 3) {
      R.stroke(ctx, x + 3, y + 3, w - 6, h - 5, "#f1d778", 1);
      R.rect(ctx, x + 13, y + 34, 4, 4, "#ffe28a");
      R.rect(ctx, x + w - 17, y + 34, 4, 4, "#ffe28a");
    }
  }

  function drawLevelOneShopProps(ctx, state, building) {
    const R = Game.Renderer;
    const bed = tilePoint(45, 37);
    const warehouse = tilePoint(46, 37);
    const developmentDesk = tilePoint(51, 37);
    const counterStart = tilePoint(45, 42);
    const leftShelf = tilePoint(46, 40);
    const rightShelf = tilePoint(49, 40);
    const box = tilePoint(52, 41);

    drawShopBed(ctx, bed.x, bed.y);

    R.drawShadow(ctx, warehouse.x + 4, warehouse.y + 8, 16, 11, 0.22);
    R.rect(ctx, warehouse.x + 4, warehouse.y + 5, 16, 13, "#7b4e27");
    R.rect(ctx, warehouse.x + 5, warehouse.y + 6, 14, 3, "#d1a15a");
    R.rect(ctx, warehouse.x + 5, warehouse.y + 12, 14, 2, "rgba(43,25,11,0.38)");
    R.rect(ctx, warehouse.x + 11, warehouse.y + 5, 2, 13, "rgba(43,25,11,0.32)");
    R.stroke(ctx, warehouse.x + 4, warehouse.y + 5, 16, 13, "rgba(34,19,8,0.72)", 1);

    drawTownDevelopmentDesk(ctx, developmentDesk.x, developmentDesk.y);

    drawDisplayShelf(ctx, leftShelf.x, leftShelf.y, "薬");
    drawDisplayShelf(ctx, rightShelf.x, rightShelf.y, "品");

    R.drawShadow(ctx, counterStart.x + 4, counterStart.y + 16, TILE * 6 - 8, 10, 0.28);
    for (let i = 0; i < 6; i += 1) {
      const counter = tilePoint(45 + i, 42);
      if (R.drawSpriteImage(ctx, "ninja-shop-counter", counter.x, counter.y + 5, TILE, 18, "crate", "")) {
        R.rect(ctx, counter.x + 1, counter.y + 18, TILE - 2, 3, "rgba(36,19,9,0.30)");
        continue;
      }
      R.rect(ctx, counter.x + 1, counter.y + 7, TILE - 2, 15, "#7a3f22");
      R.rect(ctx, counter.x + 1, counter.y + 7, TILE - 2, 5, "#df9b45");
      R.rect(ctx, counter.x + 1, counter.y + 12, TILE - 2, 4, "#a75e2a");
      R.rect(ctx, counter.x + 1, counter.y + 19, TILE - 2, 3, "rgba(38,20,10,0.42)");
      R.stroke(ctx, counter.x + 1, counter.y + 7, TILE - 2, 15, "rgba(30,16,8,0.82)", 1);
      if (i > 0) R.rect(ctx, counter.x + 1, counter.y + 9, 1, 11, "rgba(55,28,12,0.42)");
    }

    R.drawShadow(ctx, box.x + 7, box.y + 9, 11, 9, 0.18);
    R.rect(ctx, box.x + 7, box.y + 7, 11, 10, "#d39b47");
    R.rect(ctx, box.x + 8, box.y + 8, 9, 2, "#f2c16a");
    R.stroke(ctx, box.x + 7, box.y + 7, 11, 10, "rgba(44,26,10,0.62)", 1);

    drawShopNameSign(ctx, state);
  }

  function drawShopBed(ctx, x, y) {
    const R = Game.Renderer;
    R.drawShadow(ctx, x + 3, y + 15, 18, 7, 0.22);
    R.rect(ctx, x + 3, y + 4, 18, 17, "#7c4c2c");
    R.rect(ctx, x + 5, y + 6, 14, 5, "#f4e7bd");
    R.rect(ctx, x + 5, y + 11, 14, 8, "#39596f");
    R.rect(ctx, x + 5, y + 11, 14, 3, "#5e83a0");
    R.rect(ctx, x + 3, y + 4, 3, 17, "rgba(39,24,13,0.32)");
    R.stroke(ctx, x + 3, y + 4, 18, 17, "rgba(34,19,8,0.76)", 1);
    R.text(ctx, "眠", x + 12, y + 10, { size: 9, align: "center", color: "#fff2b8", bold: true, shadow: true });
  }

  function drawDisplayShelf(ctx, x, y, label) {
    const R = Game.Renderer;
    R.drawShadow(ctx, x + 4, y + 14, 16, 7, 0.18);
    R.rect(ctx, x + 4, y + 8, 16, 12, "#805631");
    R.rect(ctx, x + 5, y + 9, 14, 3, "#d19a52");
    R.rect(ctx, x + 5, y + 15, 14, 2, "rgba(41,24,10,0.32)");
    R.rect(ctx, x + 8, y + 12, 4, 4, "#83c66d");
    R.rect(ctx, x + 14, y + 12, 3, 4, "#d7bf64");
    R.stroke(ctx, x + 4, y + 8, 16, 12, "rgba(34,19,8,0.70)", 1);
    R.text(ctx, label, x + 12, y + 4, { size: 8, align: "center", color: "#fff2b8", bold: true, shadow: true });
  }

  function drawTownDevelopmentDesk(ctx, x, y) {
    const R = Game.Renderer;
    R.drawShadow(ctx, x + 5, y + 12, 15, 8, 0.24);
    R.rect(ctx, x + 5, y + 8, 15, 12, "#6b4931");
    R.rect(ctx, x + 5, y + 8, 15, 4, "#c8893e");
    R.rect(ctx, x + 6, y + 14, 13, 3, "rgba(35,20,9,0.30)");
    R.stroke(ctx, x + 5, y + 8, 15, 12, "rgba(30,17,8,0.76)", 1);
    R.rect(ctx, x + 8, y + 1, 9, 9, "rgba(52,37,25,0.96)");
    R.stroke(ctx, x + 8, y + 1, 9, 9, "#e0c47a", 1);
    R.text(ctx, "投", x + 12, y + 0, { size: 9, align: "center", color: "#fff2b8", bold: true, shadow: false });
    R.rect(ctx, x + 16, y + 13, 3, 3, "#8fd66a");
  }

  function drawShopNameSign(ctx, state) {
    const R = Game.Renderer;
    const point = tilePoint(51, 47);
    const name = (state.shop && state.shop.name) ? state.shop.name : "名もなき店";
    const shortName = name.length > 5 ? `${name.slice(0, 5)}…` : name;
    R.drawShadow(ctx, point.x + 2, point.y + 15, TILE + 15, 8, 0.24);
    R.rect(ctx, point.x + 8, point.y + 12, 4, 12, "#6c4324");
    R.rect(ctx, point.x + 13, point.y + 12, 4, 12, "#6c4324");
    R.rect(ctx, point.x - 3, point.y + 2, TILE + 30, 14, "rgba(79,48,24,0.96)");
    R.rect(ctx, point.x - 1, point.y + 4, TILE + 26, 3, "rgba(246,211,127,0.26)");
    R.stroke(ctx, point.x - 3, point.y + 2, TILE + 30, 14, "#e0c47a", 1);
    R.text(ctx, shortName, point.x + 24, point.y + 2, { size: 10, align: "center", color: "#fff2b8", bold: true, shadow: false });
  }

  function buildingPixelPalette(building) {
    const id = building && building.id;
    if (id === "item_shop") return { roof: "#7f4d2c", roofDark: "#4d2b19", wall: "#c1945c", trim: "#5c3823", door: "#4b2b18", accent: "#f1d778", sign: "#f0d49a" };
    if (id === "hospital") return { roof: "#446f9e", roofDark: "#263f66", wall: "#d8d3be", trim: "#5b6f80", door: "#6c4b34", accent: "#eef6ff", sign: "#f7f5ec" };
    if (id === "blacksmith" || id === "weapon_shop") return { roof: "#666565", roofDark: "#34383b", wall: "#80624b", trim: "#2e2924", door: "#2c2420", accent: "#f09b42", sign: "#d9d0b6" };
    if (id === "synthesis_shop") return { roof: "#6c4a96", roofDark: "#402c5f", wall: "#9a7bb2", trim: "#3b2a4f", door: "#34243f", accent: "#d3b5ff", sign: "#e9d8ff" };
    if (id === "warehouse") return { roof: "#9a6a30", roofDark: "#5e3f1f", wall: "#8b6034", trim: "#4a2f19", door: "#3b2415", accent: "#d9b066", sign: "#f0d49a" };
    if (id === "dungeon_gate" || id === "watchtower") return { roof: "#5f6362", roofDark: "#303436", wall: "#7b7b70", trim: "#272b2e", door: "#292520", accent: "#cf4d3f", sign: "#e7dfc7" };
    if (id === "hall" || id === "square" || id === "guild") return { roof: "#366c3b", roofDark: "#214326", wall: "#bfa36d", trim: "#645030", door: "#5d3d20", accent: "#f1d778", sign: "#fff0be" };
    return { roof: "#9d4933", roofDark: "#62301f", wall: "#b88955", trim: "#5c3823", door: "#4b2b18", accent: "#f1d778", sign: "#f0d49a" };
  }

  function drawPixelRoof(ctx, x, y, w, roof, dark) {
    const R = Game.Renderer;
    R.rect(ctx, x + 10, y + 2, w - 20, 4, roof);
    R.rect(ctx, x + 7, y + 6, w - 14, 5, roof);
    R.rect(ctx, x + 4, y + 11, w - 8, 6, roof);
    R.rect(ctx, x + 2, y + 16, w - 4, 4, dark);
    R.rect(ctx, x + 8, y + 5, w - 16, 2, "rgba(255,235,168,0.20)");
    R.rect(ctx, x + 5, y + 15, w - 10, 2, "rgba(0,0,0,0.22)");
    for (let sx = x + 8; sx < x + w - 8; sx += 8) {
      R.rect(ctx, sx, y + 8, 2, 8, "rgba(0,0,0,0.12)");
    }
  }

  function drawPixelDoor(ctx, x, y, w, h, palette) {
    const R = Game.Renderer;
    const doorW = 10;
    const doorX = x + Math.round(w / 2 - doorW / 2);
    R.rect(ctx, doorX, y + h - 18, doorW, 15, palette.door);
    R.rect(ctx, doorX + doorW - 3, y + h - 11, 2, 2, palette.accent);
    R.stroke(ctx, doorX, y + h - 18, doorW, 15, "rgba(24,16,10,0.60)", 1);
  }

  function drawPixelWindows(ctx, x, y, w, palette) {
    const R = Game.Renderer;
    R.rect(ctx, x + 9, y + 25, 7, 7, "#f7e6a3");
    R.rect(ctx, x + w - 16, y + 25, 7, 7, "#f7e6a3");
    R.rect(ctx, x + 10, y + 26, 5, 2, "rgba(255,255,255,0.25)");
    R.rect(ctx, x + w - 15, y + 26, 5, 2, "rgba(255,255,255,0.25)");
    R.stroke(ctx, x + 9, y + 25, 7, 7, palette.trim, 1);
    R.stroke(ctx, x + w - 16, y + 25, 7, 7, palette.trim, 1);
  }

  function drawPixelSign(ctx, x, y, w, building) {
    const R = Game.Renderer;
    const label = building && building.symbol ? building.symbol : "店";
    R.rect(ctx, x + Math.round(w / 2) - 8, y + 18, 16, 9, "rgba(54,37,21,0.88)");
    R.stroke(ctx, x + Math.round(w / 2) - 8, y + 18, 16, 9, "#e0c47a", 1);
    R.text(ctx, label, x + Math.round(w / 2), y + 19, { size: 9, align: "center", color: "#fff2b8", bold: true, shadow: false });
  }

  function drawBuildingCastShadow(ctx, x, y, w, h, stage) {
    const d = 13 + stage * 3;
    const lift = 16 + stage * 2;
    const groundY = y + h + lift;
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.24)";
    ctx.beginPath();
    ctx.moveTo(x + w * 0.14, groundY - 16);
    ctx.lineTo(x + w * 0.96, groundY - 15);
    ctx.lineTo(x + w + d, groundY + 3);
    ctx.lineTo(x + w * 0.34, groundY + 9);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.10)";
    ctx.beginPath();
    ctx.moveTo(x + w * 0.48, groundY - 10);
    ctx.lineTo(x + w + d + 7, groundY + 1);
    ctx.lineTo(x + w + d + 12, groundY + 12);
    ctx.lineTo(x + w * 0.60, groundY + 3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawBuildingPlinth(ctx, x, y, w, h, stage) {
    const depth = 9 + stage * 2;
    const lift = 16 + stage * 2;
    const groundY = y + h + lift;
    ctx.save();
    ctx.fillStyle = "rgba(45,32,22,0.44)";
    ctx.beginPath();
    ctx.moveTo(x + 8, groundY - lift - 8);
    ctx.lineTo(x + w - 8, groundY - lift - 8);
    ctx.lineTo(x + w + depth, groundY - 1);
    ctx.lineTo(x + 14, groundY + 1);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,235,176,0.08)";
    ctx.fillRect(Math.round(x + 10), Math.round(groundY - lift - 8), Math.round(w - 22), 3);
    ctx.restore();
  }

  function buildingVolumePalette(building) {
    const id = building && building.id;
    if (id === "hospital") return { front: "rgba(214,204,180,0.86)", side: "rgba(112,108,103,0.80)", dark: "rgba(50,50,50,0.36)" };
    if (id === "blacksmith" || id === "weapon_shop") return { front: "rgba(94,80,70,0.86)", side: "rgba(50,42,40,0.82)", dark: "rgba(20,18,18,0.38)" };
    if (id === "warehouse" || id === "houses" || id === "tavern") return { front: "rgba(112,70,38,0.86)", side: "rgba(58,38,24,0.82)", dark: "rgba(24,16,11,0.38)" };
    if (id === "dungeon_gate" || id === "watchtower") return { front: "rgba(92,90,84,0.86)", side: "rgba(42,44,45,0.84)", dark: "rgba(12,13,14,0.40)" };
    if (id === "hall" || id === "square" || id === "guild") return { front: "rgba(92,84,50,0.80)", side: "rgba(44,48,33,0.78)", dark: "rgba(16,20,12,0.36)" };
    return { front: "rgba(118,72,38,0.84)", side: "rgba(58,37,24,0.80)", dark: "rgba(24,17,12,0.36)" };
  }

  function drawBuildingBackVolume(ctx, x, y, w, h, stage, building, lift) {
    const depth = 12 + stage * 2;
    const wallLift = lift || 16;
    const spriteBottom = y + h;
    const groundY = spriteBottom + wallLift;
    const palette = buildingVolumePalette(building);
    ctx.save();

    // Right side face and raised underside. These are intentionally stronger
    // than a shadow: the building reads as a block lifted above the ground.
    ctx.fillStyle = palette.side;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.78, y + h * 0.34);
    ctx.lineTo(x + w + depth, y + h * 0.39);
    ctx.lineTo(x + w + depth, groundY);
    ctx.lineTo(x + w - 7, spriteBottom - 4);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255,238,185,0.10)";
    ctx.beginPath();
    ctx.moveTo(x + w * 0.79, y + h * 0.35);
    ctx.lineTo(x + w + depth - 2, y + h * 0.39);
    ctx.lineTo(x + w + depth - 2, y + h * 0.44);
    ctx.lineTo(x + w * 0.79, y + h * 0.40);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(0,0,0,0.20)";
    ctx.beginPath();
    ctx.moveTo(x + w + depth - 5, y + h * 0.46);
    ctx.lineTo(x + w + depth, y + h * 0.48);
    ctx.lineTo(x + w + depth, groundY);
    ctx.lineTo(x + w + depth - 5, groundY - 2);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(0,0,0,0.50)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  function drawBuildingFrontVolume(ctx, x, y, w, h, stage, building, lift) {
    const R = Game.Renderer;
    const depth = 12 + stage * 2;
    const wallLift = lift || 16;
    const frontTop = y + h - 7;
    const frontBottom = y + h + wallLift;
    const palette = buildingVolumePalette(building);
    ctx.save();

    // Front face: visible vertical wall under the sprite footprint.
    ctx.fillStyle = palette.front;
    ctx.fillRect(Math.round(x + 8), Math.round(frontTop), Math.round(w - 16), Math.round(frontBottom - frontTop));
    ctx.globalAlpha = building && (building.id === "blacksmith" || building.id === "dungeon_gate" || building.id === "watchtower") ? 0.48 : 0.28;
    R.drawSpriteImage(ctx, "town-wall", x + 8, frontTop, w - 16, frontBottom - frontTop, "wall", "");
    ctx.globalAlpha = 1;
    ctx.fillStyle = palette.dark;
    ctx.fillRect(Math.round(x + 8), Math.round(frontBottom - 7), Math.round(w - 16), 7);

    // The front face also wraps slightly into the right side so it reads as a box.
    ctx.fillStyle = palette.side;
    ctx.beginPath();
    ctx.moveTo(x + w - 8, frontTop + 2);
    ctx.lineTo(x + w + depth, frontTop + 8);
    ctx.lineTo(x + w + depth, frontBottom);
    ctx.lineTo(x + w - 8, frontBottom);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.fillRect(Math.round(x + w - 1), Math.round(frontTop + 7), Math.round(depth - 4), Math.round(frontBottom - frontTop - 8));

    // Top lip separates the original building sprite from the new wall.
    ctx.fillStyle = "rgba(255,238,185,0.32)";
    ctx.fillRect(Math.round(x + 9), Math.round(frontTop), Math.round(w - 19), 5);
    ctx.fillStyle = "rgba(0,0,0,0.30)";
    ctx.fillRect(Math.round(x + 8), Math.round(frontTop - 2), Math.round(w - 16), 2);

    ctx.strokeStyle = "rgba(35,22,14,0.48)";
    ctx.lineWidth = 1;
    for (let lineX = x + 16; lineX < x + w - 13; lineX += 12) {
      ctx.beginPath();
      ctx.moveTo(Math.round(lineX) + 0.5, Math.round(frontTop + 5));
      ctx.lineTo(Math.round(lineX - 1) + 0.5, Math.round(frontBottom - 8));
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(0,0,0,0.46)";
    ctx.strokeRect(Math.round(x + 8) + 0.5, Math.round(frontTop) + 0.5, Math.round(w - 16), Math.round(frontBottom - frontTop));

    // Door-like darker center detail keeps the wall from reading as a shadow.
    const doorW = Math.max(10, Math.round(w * 0.20));
    const doorX = Math.round(x + w * 0.5 - doorW / 2);
    ctx.fillStyle = "rgba(30,22,16,0.42)";
    ctx.fillRect(doorX, Math.round(frontTop + 10), doorW, Math.round(frontBottom - frontTop - 13));
    ctx.fillStyle = "rgba(255,221,132,0.45)";
    ctx.fillRect(doorX + doorW - 4, Math.round(frontTop + 18), 2, 3);

    ctx.strokeStyle = "rgba(255,240,190,0.18)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 7, y + 5);
    ctx.lineTo(x + w - 13, y + 5);
    ctx.moveTo(x + 8, y + 5);
    ctx.lineTo(x + 8, frontBottom - 5);
    ctx.stroke();
    ctx.strokeStyle = "rgba(0,0,0,0.26)";
    ctx.beginPath();
    ctx.moveTo(x + w - 8, frontTop + 2);
    ctx.lineTo(x + w - 8, frontBottom);
    ctx.moveTo(x + w - 8, frontBottom - 1);
    ctx.lineTo(x + w + depth - 1, frontBottom);
    ctx.stroke();
    ctx.restore();
  }

  function drawVillager(ctx, villager, visual) {
    const R = Game.Renderer;
    const point = tilePoint(visual.x, visual.y);
    const idle = Math.sin(Date.now() / 620 + villager.x * 0.7) * 0.18;
    const groundedVisual = Object.assign({}, visual, {
      bob: 0,
      bobPx: 0,
      swayPx: visual && visual.moving ? (visual.swayPx || 0) * 0.25 : 0
    });
    drawCharacterGroundShadow(ctx, point.x, point.y, 0.34);
    R.drawWalkingSprite(ctx, Game.Entity.villagerSpriteType(villager), point.x + 2, point.y + 1 + idle, TILE - 4, TILE - 4, groundedVisual.direction || villagerFacing(villager), groundedVisual, "villager", villager.name);
    if (villager.status === "injured") R.stroke(ctx, point.x + 2, point.y + 1, TILE - 4, TILE - 4, "#d85d5d", 2);
    if (villager.status === "unhappy") R.stroke(ctx, point.x + 2, point.y + 1, TILE - 4, TILE - 4, "#c9932c", 2);
  }

  function villagerFacing(villager) {
    const directions = ["down", "left", "right", "up"];
    const id = String(villager && villager.id ? villager.id : villager && villager.name ? villager.name : "villager");
    let seed = 0;
    for (let i = 0; i < id.length; i += 1) seed += id.charCodeAt(i) * (i + 1);
    return directions[seed % directions.length];
  }

  function drawHero(ctx, state, visual) {
    const R = Game.Renderer;
    const point = tilePoint(visual.x, visual.y);
    const groundedVisual = Object.assign({}, visual, {
      bob: 0,
      bobPx: 0,
      swayPx: visual && visual.moving ? (visual.swayPx || 0) * 0.25 : 0
    });
    drawCharacterGroundShadow(ctx, point.x, point.y, 0.36);
    const facing = state.townMap.facing || "down";
    R.drawWalkingSprite(ctx, "hero", point.x + 1, point.y - 1, TILE - 2, TILE - 2, groundedVisual.direction || facing, groundedVisual, "hero", "\u5546");
  }

  function drawCharacterGroundShadow(ctx, x, y, alpha) {
    const R = Game.Renderer;
    R.ellipse(ctx, x + TILE / 2, y + TILE - 3, 9, 3, `rgba(0,0,0,${alpha || 0.28})`);
  }

  function drawTargetMarker(ctx, target) {
    const R = Game.Renderer;
    const point = tilePoint(target.x, target.y);
    R.stroke(ctx, point.x + 2, point.y + 5, TILE - 4, TILE_Y - 4, "#ffe28a", 2);
    R.text(ctx, "\u25bc", point.x + TILE / 2, point.y - 14, { size: 16, align: "center", color: "#ffe28a", bold: true });
  }

  function drawSideHints(ctx, state, target, counts) {
    const R = Game.Renderer;
    R.panel(ctx, 728, 82, 208, 280, { fill: "rgba(13,14,18,0.92)" });
    R.text(ctx, "\u753a\u30de\u30c3\u30d7", 752, 106, { size: 22, color: "#ffeab0", bold: true });
    R.text(ctx, `\u753a Lv ${state.town.level}`, 752, 144, { size: 16, color: "#fff7df" });
    R.text(ctx, `\u5e97 Lv ${state.shop.level}`, 752, 170, { size: 16, color: "#fff7df" });
    const tier = Game.Dungeon && Game.Dungeon.currentTier ? Game.Dungeon.currentTier(state) : null;
    if (tier) R.text(ctx, `\u8ff7\u5bae ${tier.maxFloor}\u968e`, 752, 196, { size: 16, color: "#fff7df" });
    R.text(ctx, `\u8ca0\u50b7 ${counts.injured || 0}`, 752, 222, { size: 16, color: counts.injured ? "#ffd0c8" : "#d9c9a4" });
    if (state.raidOmen && state.raidOmen.active) {
      R.text(ctx, "\u8972\u6483\u4e88\u5146\u3042\u308a", 752, 250, { size: 16, color: "#ffb08f", bold: true });
    }
    const label = target && target.building ? target.building.name : target && target.villager ? target.villager.name : "\u9053";
    R.text(ctx, "\u6b63\u9762", 752, 282, { size: 15, color: "#d9c9a4" });
    R.text(ctx, label, 752, 306, { size: 20, color: "#fff7df", bold: true });
    R.text(ctx, "\u6c7a\u5b9a\uff1a\u8a71\u3059/\u5165\u308b", 752, 342, { size: 15, color: "#d9c9a4" });
  }

  function currentPlaceLabel(state, target) {
    if (target && target.villager) return `${target.villager.name}\u4ed8\u8fd1`;
    if (target && target.building) return `${target.building.name}\u524d`;
    if (state && state.townMap && state.townMap.lastBuilding) {
      const building = Game.Town.getVisibleBuildings(state).find((item) => item.id === state.townMap.lastBuilding);
      if (building) return `${building.name}\u4ed8\u8fd1`;
    }
    return "\u753a\u9053";
  }

  function messageLines(state, target) {
    const story = state && state.townStory && state.townStory.type === "blacksmithArrival" ? state.townStory : null;
    if (story) {
      if (story.phase === "intro") return storyTypedLines(story, STORY_INTRO_LINES, "決定で様子を見る。");
      if (story.phase === "walk") return ["ゴドが道具袋を揺らしながら、ゆっくり歩いてくる。"];
      if (story.phase === "godoTalk" || story.phase === "message") return storyTypedLines(story, GODO_DIALOG_LINES, "決定で続ける。");
      if (story.phase === "opened") return ["ゴドの鍛冶屋が町に開店した。", "決定で続ける。"];
      if (story.phase === "alef") return storyTypedLines(story, ALEF_DIALOG_LINES, "決定で町へ戻る。");
    }
    if (state.lastConversation) {
      return [`${state.lastConversation.name}: ${state.lastConversation.line}`];
    }
    if (target && target.villager) return [`${target.villager.name}\u304c\u3053\u3061\u3089\u3092\u898b\u3066\u3044\u308b\u3002\u6c7a\u5b9a\u3067\u8a71\u305b\u308b\u3002`];
    if (target && target.building) return [`${target.building.name}\u306e\u524d\u306b\u3044\u308b\u3002\u6c7a\u5b9a\u3067\u5229\u7528\u3067\u304d\u308b\u3002`];
    return [(state.log || []).slice(-1)[0] || "\u753a\u3092\u6b69\u3053\u3046\u3002"];
  }

  function updateTownStory(state) {
    const story = state && state.townStory && state.townStory.type === "blacksmithArrival" ? state.townStory : null;
    if (!story) return null;
    const now = Date.now();
    if (!story.phase || story.phase === "message") story.phase = story.phase === "message" ? "godoTalk" : "intro";
    if (!Number.isFinite(story.dialogIndex)) story.dialogIndex = 0;
    if (!story.lineStartedAt) story.lineStartedAt = now;
    if (!story.startedAt) story.startedAt = now;
    story.elapsed = now - story.startedAt;
    if (story.phase === "walk" && story.elapsed >= GODO_WALK_DURATION) {
      story.phase = "godoTalk";
      story.dialogIndex = 0;
      story.lineStartedAt = now;
      story.startedAt = now - GODO_WALK_DURATION;
      story.elapsed = GODO_WALK_DURATION;
    }
    return story;
  }

  function advanceTownStory(state) {
    const story = state && state.townStory && state.townStory.type === "blacksmithArrival" ? state.townStory : null;
    if (!story) return false;
    const now = Date.now();
    if (!story.phase || story.phase === "message") story.phase = story.phase === "message" ? "godoTalk" : "intro";
    if (!story.lineStartedAt) story.lineStartedAt = now;
    if (!Number.isFinite(story.dialogIndex)) story.dialogIndex = 0;

    if (story.phase === "intro") {
      if (advanceStoryLine(story, STORY_INTRO_LINES, "walk")) {
        story.startedAt = now;
        story.elapsed = 0;
      }
      return true;
    }

    if (story.phase === "walk") {
      story.elapsed = story.startedAt ? now - story.startedAt : 0;
      if (story.elapsed >= GODO_WALK_DURATION) {
        story.phase = "godoTalk";
        story.dialogIndex = 0;
        story.lineStartedAt = now;
      }
      return true;
    }

    if (story.phase === "godoTalk") {
      if (!advanceStoryLine(story, GODO_DIALOG_LINES, "opened")) return true;
      story.opened = true;
      state.buildings.blacksmithLevel = 1;
      state.flags.blacksmithArrivalShown = true;
      if (Game.State && Game.State.addLog) Game.State.addLog(state, "ゴドの鍛冶屋が町に開店した。");
      if (Game.Audio) Game.Audio.playSfx("questComplete");
      if (Game.Save && Game.Save.save) Game.Save.save(state);
      return true;
    }

    if (story.phase === "opened") {
      ensureAlefVisitor(state);
      story.phase = "alef";
      story.dialogIndex = 0;
      story.lineStartedAt = now;
      if (Game.State && Game.State.addLog) Game.State.addLog(state, "冒険者アレフが町に立ち寄るようになった。");
      if (Game.Save && Game.Save.save) Game.Save.save(state);
      return true;
    }

    if (story.phase === "alef") {
      if (!advanceStoryLine(story, ALEF_DIALOG_LINES, "done")) return true;
      state.townStory = null;
      if (Game.Save && Game.Save.save) Game.Save.save(state);
      return true;
    }
    return false;
  }

  function godoVisual(elapsed) {
    const progress = Math.max(0, Math.min(1, elapsed / GODO_WALK_DURATION));
    const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    return {
      x: 50 - 6 * eased,
      y: 50.1,
      direction: "left",
      moving: progress < 1,
      walkFrame: Math.floor(elapsed / 120) % 4,
      swayPx: 0.04,
      step: Math.sin(progress * Math.PI * 2)
    };
  }

  function drawGodo(ctx, visual) {
    const R = Game.Renderer;
    const point = tilePoint(visual.x, visual.y);
    drawCharacterGroundShadow(ctx, point.x, point.y, 0.34);
    R.drawWalkingSprite(ctx, "villager-smith", point.x + 1, point.y - 1, TILE - 2, TILE - 2, visual.direction, visual, "villager", "ゴ");
  }

  function drawTownStoryOverlay(ctx, state, story) {
    if (!story || story.type !== "blacksmithArrival") return;
    const R = Game.Renderer;
    if (story.phase === "opened") {
      R.rect(ctx, 0, 0, 960, 540, "rgba(0,0,0,0.72)");
      R.text(ctx, "鍛冶屋が開店した", 480, 238, { size: 30, align: "center", color: "#fff2b8", bold: true });
      R.text(ctx, "ゴドの店", 480, 278, { size: 18, align: "center", color: "#d9c9a4", bold: true });
      R.text(ctx, "決定で続ける", 480, 316, { size: 16, align: "center", color: "#fff7df", bold: true });
    }
  }

  function storyTypedLines(story, lines, prompt) {
    const index = Math.max(0, Math.min(lines.length - 1, story.dialogIndex || 0));
    const line = lines[index] || "";
    const chars = Array.from(line);
    const elapsed = Date.now() - (story.lineStartedAt || Date.now());
    const count = Math.min(chars.length, Math.floor(elapsed / STORY_TEXT_SPEED));
    const visible = chars.slice(0, count).join("") + (count < chars.length ? "▌" : "");
    const result = [];
    if (index > 0) result.push(lines[index - 1]);
    result.push(visible);
    if (count >= chars.length && prompt) result.push(prompt);
    return result;
  }

  function storyLineComplete(story, lines) {
    const index = Math.max(0, Math.min(lines.length - 1, story.dialogIndex || 0));
    const line = lines[index] || "";
    return Date.now() - (story.lineStartedAt || Date.now()) >= Array.from(line).length * STORY_TEXT_SPEED;
  }

  function revealStoryLine(story, lines) {
    const index = Math.max(0, Math.min(lines.length - 1, story.dialogIndex || 0));
    const line = lines[index] || "";
    story.lineStartedAt = Date.now() - Array.from(line).length * STORY_TEXT_SPEED - 80;
  }

  function advanceStoryLine(story, lines, nextPhase) {
    if (!storyLineComplete(story, lines)) {
      revealStoryLine(story, lines);
      return false;
    }
    if ((story.dialogIndex || 0) < lines.length - 1) {
      story.dialogIndex = (story.dialogIndex || 0) + 1;
      story.lineStartedAt = Date.now();
      return false;
    }
    story.phase = nextPhase;
    story.dialogIndex = 0;
    story.lineStartedAt = Date.now();
    return true;
  }

  function ensureAlefVisitor(state) {
    if (!state) return;
    if (!Array.isArray(state.villagers)) state.villagers = [];
    if (state.villagers.some((villager) => villager.id === "alef")) {
      state.flags.alefVisited = true;
      if (Game.Villagers && Game.Villagers.syncPopulation) Game.Villagers.syncPopulation(state);
      return;
    }
    state.villagers.push({
      id: "alef",
      name: "アレフ",
      job: "冒険者",
      css: "villager-traveler",
      x: 45,
      y: 50,
      minTownLevel: 1,
      status: "healthy",
      daysWithoutFavorite: 0,
      favoriteBoughtToday: false,
      joinedDay: state.day || 1,
      creditTrust: 65,
      creditBlocked: false,
      likes: ["herb", "torch", "old_dagger", "small_shield"],
      lines: [
        "迷宮の近くにこんな店があるなんて、これからの発展が楽しみだな。",
        "俺はアレフ。仕入れの迷宮に挑むなら、薬とたいまつを忘れるなよ。"
      ]
    });
    state.flags.alefVisited = true;
    if (Game.Villagers && Game.Villagers.normalizeVillagers) Game.Villagers.normalizeVillagers(state);
  }

  function isRoad(x, y) {
    if (activeTownLevel <= 1) {
      return ((x === 48 || x === 49) && y >= 47 && y <= 50) ||
        (x === 56 && y >= 43 && y <= 49) ||
        (y === 49 && x >= 47 && x <= 56) ||
        (y === 50 && x >= 43 && x <= 49);
    }
    return (x >= 18 && x <= 82 && y === 42) ||
      (y >= 18 && y <= 64 && x === 48) ||
      (x >= 26 && x <= 76 && y === 30) ||
      (x >= 24 && x <= 78 && y === 56) ||
      (y >= 24 && y <= 60 && x === 28) ||
      (y >= 24 && y <= 62 && x === 72) ||
      (x >= 43 && x <= 53 && y === 46) ||
      (x >= 48 && x <= 58 && y === 36) ||
      (x >= 60 && x <= 76 && y === 48) ||
      (x >= 12 && x <= 28 && y === 42) ||
      (x >= 24 && x <= 36 && y === 32) ||
      (x >= 70 && x <= 82 && y === 58);
  }

  Game.TownScene = { draw, advanceTownStory };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});

  const TILE = 48;
  const TILE_Y = 37;
  const ROW_SKEW = 3;
  const VIEW_W = 15;
  const VIEW_H = 10;
  const MAP_X = 86;
  const MAP_Y = 78;
  const MAP_W = VIEW_W * TILE + (VIEW_H - 1) * ROW_SKEW;
  const MAP_H = (VIEW_H - 1) * TILE_Y + TILE;

  function draw(canvas, state, run) {
    const ctx = Game.Renderer.setupCanvas(canvas);
    if (!ctx || !state || !run) return;
    const R = Game.Renderer;
    R.clear(ctx, "#07080c");
    drawDungeonMap(ctx, state, run);
    drawHud(ctx, state, run);
    drawMiniMap(ctx, run);
    drawFootInfo(ctx, state, run);
    R.message(ctx, (run.messages || []).slice(-8), { x: 28, y: 344, width: 620, height: 126, maxLines: 4, size: 17, lineHeight: 24, paddingTop: 12, paddingBottom: 16, extraMargin: 6 });
  }

  function drawHud(ctx, state, run) {
    const R = Game.Renderer;
    R.panel(ctx, 20, 10, 920, 42, { fill: "rgba(5,6,8,0.58)", border: "rgba(241,223,176,0.30)", width: 1, inner: false });
    R.text(ctx, `${run.name || "\u4ed5\u5165\u308c\u306e\u8ff7\u5bae"} ${run.floor}/${run.maxFloor}階`, 34, 22, { size: 18, color: "#fff7df", bold: true });
    R.text(ctx, `Lv ${state.hero.level}`, 300, 22, { size: 18, color: "#fff7df", bold: true });
    R.text(ctx, `HP ${state.hero.hp}/${state.hero.maxHp}`, 374, 22, { size: 18, color: state.hero.hp < state.hero.maxHp * 0.35 ? "#ffb0a0" : "#e5ff91", bold: true });
    R.hpBar(ctx, 500, 24, 152, state.hero.hp, state.hero.maxHp, 14);
    R.text(ctx, `気力 ${Math.max(1, state.hero.hp)}/${state.hero.maxHp}`, 674, 22, { size: 16, color: "#ffe36f", bold: true });
    R.hpBar(ctx, 790, 25, 90, Math.max(1, state.hero.hp), state.hero.maxHp, 11);
    R.text(ctx, `${state.hero.gold}G`, 896, 18, { size: 18, color: "#fff7df", align: "right", bold: true });
    R.text(ctx, `${state.hero.inventory.length}/${Game.Items.getCarryLimit(state)}`, 896, 36, { size: 15, color: "#fff7df", align: "right", bold: true });
    R.rect(ctx, 28, 18, 250, 24, "rgba(5,6,8,0.78)");
    R.text(ctx, `${run.name || "仕入れの迷宮"} ${run.floor}/${run.maxFloor}階`, 34, 22, { size: 18, color: "#fff7df", bold: true });
    R.rect(ctx, 666, 18, 116, 23, "rgba(5,6,8,0.78)");
    R.text(ctx, `気力 ${Math.max(1, state.hero.hp)}/${state.hero.maxHp}`, 674, 22, { size: 16, color: "#ffe36f", bold: true });
  }

  function drawMiniMap(ctx, run) {
    const R = Game.Renderer;
    R.miniMap(ctx, 30, 66, 118, 118, run.width, run.height, (x, y) => {
      const discovered = Game.Dungeon && Game.Dungeon.isDiscovered ? Game.Dungeon.isDiscovered(run, x, y) : true;
      if (!discovered) return "rgba(0,0,0,0)";
      if (run.player.x === x && run.player.y === y) return "#5ba8ff";
      if (run.enemies.some((enemy) => enemy.x === x && enemy.y === y)) return "#d85b51";
      if (run.pickups.some((pickup) => pickup.x === x && pickup.y === y)) return "#f1ca5d";
      if (run.tiles[y][x] === "wall") return "#25272d";
      if (run.tiles[y][x] === "stairs") return "#fff6cf";
      return "#806b4a";
    });
    R.text(ctx, "MINI", 44, 80, { size: 13, color: "#fff7df", bold: true });
  }

  function drawDungeonMap(ctx, state, run) {
    const R = Game.Renderer;
    const view = camera(run);
    const currentSection = sectionAt(run, run.player.x, run.player.y) || nearestSection(run, run.player.x, run.player.y);
    const heroHit = heroHitEffect(run);
    const shake = heroHit ? Math.sin(heroHit.progress * Math.PI * 10) * (1 - heroHit.progress) * 5 : 0;
    const visual = Game.Animations ? Game.Animations.heroTile("dungeon", run.player.x, run.player.y) : { x: run.player.x, y: run.player.y, bob: 0 };
    const heroScreen = toScreen(view, visual.x, visual.y) || toScreen(view, run.player.x, run.player.y);

    ctx.save();
    if (shake) ctx.translate(Math.round(shake), 0);
    R.panel(ctx, MAP_X - 12, MAP_Y - 12, MAP_W + 24, MAP_H + 24, { fill: "#171411", border: "rgba(241,223,176,0.42)", width: 1, inner: false });
    ctx.save();
    ctx.beginPath();
    ctx.rect(MAP_X - 2, MAP_Y - 2, MAP_W + 4, MAP_H + 4);
    ctx.clip();
    for (let vy = 0; vy < VIEW_H; vy += 1) {
      for (let vx = 0; vx < VIEW_W; vx += 1) {
        const x = view.x + vx;
        const y = view.y + vy;
        const point = tilePoint(vx, vy);
        const tile = run.tiles[y] && run.tiles[y][x];
        if (tile === "wall") {
          R.drawPseudo3DWall(ctx, point.x, point.y, TILE, x * 17 + y * 7, wallNeighbors(run, x, y));
        } else {
          R.drawFloorTile(ctx, point.x, point.y, TILE, x * 11 + y * 13, { base: tile === "stairs" ? "#6a5438" : null });
          drawFloorDepth(ctx, run, x, y, point);
          if (tile === "stairs") drawStairs(ctx, point);
        }
        drawMapDimming(ctx, run, currentSection, x, y, point);
      }
    }

    if (heroScreen) {
      const heroFoot = tileFoot(heroScreen.x, heroScreen.y);
      const hx = heroFoot.x;
      const hy = heroFoot.y - TILE * 0.25;
      R.drawGlow(ctx, hx, hy, TILE * 2.15, "rgba(255,224,143,0.20)", 0.2);
    }

    const entities = [];
    run.pickups.forEach((pickup) => {
      const screen = toScreen(view, pickup.x, pickup.y);
      if (!screen) return;
      entities.push({
        x: pickup.x,
        y: pickup.y + 0.55,
        depthY: pickup.y + 0.55,
        draw: () => drawPickup(ctx, pickup, screen, isDimSection(run, currentSection, pickup.x, pickup.y))
      });
    });
    run.enemies.forEach((enemy) => {
      const visualEnemy = Game.Animations ? Game.Animations.entityTile("dungeon", enemy.uid, enemy.x, enemy.y, enemy.facing || "down") : { x: enemy.x, y: enemy.y, moving: false, direction: "down" };
      const screen = toScreen(view, visualEnemy.x, visualEnemy.y) || toScreen(view, enemy.x, enemy.y);
      if (!screen) return;
      entities.push({
        x: visualEnemy.x,
        y: visualEnemy.y + 0.8,
        depthY: visualEnemy.y + 0.8,
        draw: () => drawEnemy(ctx, enemy, screen, visualEnemy, isDimSection(run, currentSection, enemy.x, enemy.y))
      });
    });
    if (heroScreen) {
      entities.push({
        x: visual.x,
        y: visual.y + 0.82,
        depthY: visual.y + 0.82,
        draw: () => drawHero(ctx, visual, heroScreen, run.facing, heroHit, run)
      });
    }

    drawDungeonLight(ctx, heroScreen);
    R.sortEntitiesByDepth(entities).forEach((entity) => entity.draw());
    drawAttackEffect(ctx, view);
    drawHitNumbers(ctx, view);
    ctx.restore();
    drawHeroDamageOverlay(ctx, heroHit);
    ctx.restore();
  }

  function tilePoint(x, y) {
    return {
      x: MAP_X + x * TILE + y * ROW_SKEW,
      y: MAP_Y + y * TILE_Y
    };
  }

  function tileFoot(x, y) {
    const point = tilePoint(x, y);
    return {
      x: point.x + TILE / 2,
      y: point.y + TILE * 0.76
    };
  }

  function drawStairs(ctx, point) {
    const R = Game.Renderer;
    R.drawGlow(ctx, point.x + TILE / 2, point.y + TILE / 2, TILE * 0.74, "rgba(255,238,175,0.36)", 0.36);
    R.drawRaisedSprite(ctx, "stairs", point.x + 5, point.y + 4, TILE - 10, TILE - 10, 1, "stairs", "\u968e");
  }

  function drawFloorDepth(ctx, run, x, y, point) {
    const R = Game.Renderer;
    if (isWall(run, x, y - 1)) R.rect(ctx, point.x + 2, point.y + 1, TILE - 4, 8, "rgba(0,0,0,0.24)");
    if (isWall(run, x - 1, y)) R.rect(ctx, point.x + 1, point.y + 4, 7, TILE - 8, "rgba(0,0,0,0.14)");
    if (isWall(run, x + 1, y)) R.rect(ctx, point.x + TILE - 7, point.y + 4, 6, TILE - 8, "rgba(255,245,205,0.04)");
    if (isWall(run, x, y + 1)) R.rect(ctx, point.x + 3, point.y + TILE - 6, TILE - 6, 4, "rgba(255,245,205,0.05)");
    if (isWall(run, x - 1, y - 1)) R.rect(ctx, point.x + 2, point.y + 2, 8, 8, "rgba(0,0,0,0.12)");
    if ((x + y) % 6 === 0) R.rect(ctx, point.x + 11, point.y + 14, 9, 3, "rgba(255,240,190,0.07)");
    if ((x * 5 + y) % 8 === 0) R.rect(ctx, point.x + 24, point.y + 26, 6, 5, "rgba(0,0,0,0.12)");
  }

  function drawPickup(ctx, pickup, screen, dimmed) {
    const R = Game.Renderer;
    const foot = tileFoot(screen.x, screen.y);
    const sprite = Game.Entity.itemSpriteType(pickup.item, pickup.type);
    const pulse = 0.5 + Math.sin(Date.now() / 240 + pickup.x * 0.7 + pickup.y) * 0.5;
    const rare = isRareItem(pickup.item) || pickup.type === "chest";
    const size = TILE - 12;
    ctx.save();
    if (dimmed) ctx.globalAlpha = 0.48;
    if (rare) R.drawGlow(ctx, foot.x, foot.y - TILE * 0.34, TILE * (0.42 + pulse * 0.08), "rgba(255,221,116,0.30)", 0.3);
    R.drawRaisedSprite(ctx, sprite, foot.x - size / 2, foot.y - size + 6 - (rare ? pulse * 2 : 0), size, size, pickup.type === "chest" ? 5 : 2, sprite, pickup.type === "chest" ? "\u5b9d" : "\u54c1");
    ctx.restore();
  }

  function drawEnemy(ctx, enemy, screen, visual, dimmed) {
    const R = Game.Renderer;
    const foot = tileFoot(screen.x, screen.y);
    const hit = hitEffectFor(enemy.x, enemy.y);
    const idle = Math.sin(Date.now() / 360 + enemy.x) * 1.2;
    const shake = hit ? Math.sin(hit.progress * Math.PI * 6) * 4 : 0;
    const w = TILE + 6;
    const h = TILE + 18;
    const x = foot.x - w / 2 + shake;
    const y = foot.y - h + 8 + idle;
    ctx.save();
    if (dimmed) ctx.globalAlpha = 0.48;
    R.drawShadow(ctx, foot.x - TILE / 2 + 3 + shake, foot.y - TILE + 15, TILE - 6, TILE - 8, 0.34);
    if (hit && hit.progress < 0.45) {
      R.drawGlow(ctx, foot.x, foot.y - TILE * 0.55, TILE * 0.7, "rgba(255,255,255,0.42)", 0.42);
      R.rect(ctx, x + 6, y + 8, w - 12, h - 16, "rgba(255,255,255,0.30)");
    }
    R.drawWalkingSprite(ctx, Game.Entity.enemySpriteType(enemy), x, y, w, h, visual.direction || "down", visual, "enemy", enemy.symbol || "\u6575");
    if (enemy.hp < enemy.maxHp) R.hpBar(ctx, foot.x - TILE / 2 + 5, foot.y - 7, TILE - 10, enemy.hp, enemy.maxHp, 5);
    ctx.restore();
  }

  function drawHero(ctx, visual, screen, facing, hit, run) {
    const R = Game.Renderer;
    const foot = tileFoot(screen.x, screen.y);
    const direction = visual.direction || facing || "down";
    const size = TILE - 12;
    const hitProgress = hit ? hit.progress : 1;
    const hitPower = hit ? 1 - hitProgress : 0;
    const shake = hit ? Math.sin(hitProgress * Math.PI * 14) * hitPower * 5 : 0;
    const attackPose = heroAttackPose(run);
    const drawX = foot.x - size / 2 + shake + attackPose.x;
    const drawY = foot.y - size + 4 + attackPose.y;
    R.drawShadow(ctx, foot.x - size / 2, foot.y - size + 10, size, size - 2, 0.30 + hitPower * 0.12);
    if (hit) {
      const ring = TILE * (0.22 + hitProgress * 0.62);
      R.drawGlow(ctx, foot.x, foot.y - TILE * 0.38, TILE * (0.8 + hitPower * 0.6), "rgba(255,75,45,0.42)", 0.42 * hitPower);
      ctx.save();
      ctx.globalAlpha = Math.max(0, 0.72 * hitPower);
      ctx.strokeStyle = "#ff5138";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(foot.x, foot.y - TILE * 0.34, ring, ring * 0.44, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.save();
    if (attackPose.scaleX !== 1 || attackPose.scaleY !== 1) {
      ctx.translate(drawX + size / 2, drawY + size);
      ctx.scale(attackPose.scaleX, attackPose.scaleY);
      ctx.translate(-(drawX + size / 2), -(drawY + size));
    }
    R.drawWalkingSprite(ctx, "hero", drawX, drawY, size, size, direction, visual, "hero", "\u5546");
    if (hit) {
      if (Math.floor(hitProgress * 8) % 2 === 0) R.rect(ctx, drawX + 5, drawY + 5, size - 10, size - 8, "rgba(255,255,255,0.28)");
      R.rect(ctx, drawX, drawY, size, size, `rgba(255,48,36,${0.36 * hitPower})`);
    }
    ctx.restore();
  }

  function heroAttackPose(run) {
    if (!Game.Animations || !run) return { x: 0, y: 0, scaleX: 1, scaleY: 1 };
    const effect = Game.Animations.getAttackEffect("dungeon");
    if (!effect || effect.kind !== "slash") return { x: 0, y: 0, scaleX: 1, scaleY: 1 };
    if (effect.originX !== run.player.x || effect.originY !== run.player.y) return { x: 0, y: 0, scaleX: 1, scaleY: 1 };
    const power = Math.sin(effect.progress * Math.PI);
    const lunge = 7 * power;
    const pose = { x: 0, y: 0, scaleX: 1 + 0.05 * power, scaleY: 1 - 0.03 * power };
    if (effect.direction === "left") pose.x = -lunge;
    else if (effect.direction === "right") pose.x = lunge;
    else if (effect.direction === "up") pose.y = -lunge * 0.75;
    else pose.y = lunge * 0.55;
    return pose;
  }

  function drawDungeonLight(ctx, heroScreen) {
    if (!heroScreen) return;
    const R = Game.Renderer;
    const foot = tileFoot(heroScreen.x, heroScreen.y);
    const hx = foot.x;
    const hy = foot.y - TILE * 0.25;
    const gradient = ctx.createRadialGradient(hx, hy, TILE * 0.9, hx, hy, TILE * 5.0);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(0.38, "rgba(0,0,0,0.03)");
    gradient.addColorStop(0.74, "rgba(0,0,0,0.28)");
    gradient.addColorStop(1, "rgba(0,0,0,0.54)");
    ctx.save();
    ctx.beginPath();
    ctx.rect(MAP_X, MAP_Y, MAP_W, MAP_H);
    ctx.clip();
    R.drawAmbientVignette(ctx, MAP_X, MAP_Y, MAP_W, MAP_H, 0.28);
    ctx.fillStyle = gradient;
    ctx.fillRect(MAP_X, MAP_Y, MAP_W, MAP_H);
    ctx.fillStyle = "rgba(255,231,156,0.05)";
    ctx.fillRect(hx - TILE * 1.5, hy - TILE_Y * 1.5, TILE * 3, TILE_Y * 3);
    ctx.restore();
  }

  function drawMapDimming(ctx, run, currentSection, x, y, point) {
    const R = Game.Renderer;
    const section = sectionAt(run, x, y);
    let alpha = 0;
    if (section && currentSection && section.index !== currentSection.index) alpha = 0.42;
    else if (!section && currentSection && Math.max(Math.abs(x - run.player.x), Math.abs(y - run.player.y)) > 3) alpha = 0.24;
    if (alpha <= 0) return;
    R.rect(ctx, point.x, point.y, TILE, TILE, `rgba(0,0,0,${alpha})`);
  }

  function isDimSection(run, currentSection, x, y) {
    const section = sectionAt(run, x, y);
    if (!section || !currentSection) return false;
    return section.index !== currentSection.index;
  }

  function drawFootInfo(ctx, state, run) {
    const R = Game.Renderer;
    const pickup = run.pickups.find((item) => item.x === run.player.x && item.y === run.player.y);
    const tile = run.tiles[run.player.y][run.player.x];
    const here = pickup ? (pickup.type === "chest" ? "宝箱" : pickup.item.name) : tile === "stairs" ? "階段" : "";
    if (!here) return;
    R.panel(ctx, 674, 360, 252, 54, { fill: "rgba(5,6,8,0.66)", border: "rgba(241,223,176,0.36)", width: 1, inner: false });
    R.text(ctx, "足元", 692, 372, { size: 14, color: "#d9c9a4", bold: true });
    R.text(ctx, here, 692, 394, { size: 18, color: "#ffeab0", bold: true });
  }

  function drawSidePanel(ctx, state, run) {
    const R = Game.Renderer;
    R.panel(ctx, 735, 82, 202, 280, { fill: "rgba(13,14,18,0.92)" });
    R.text(ctx, "\u8db3\u5143", 758, 106, { size: 17, color: "#d9c9a4", bold: true });
    const pickup = run.pickups.find((item) => item.x === run.player.x && item.y === run.player.y);
    const tile = run.tiles[run.player.y][run.player.x];
    const here = pickup ? (pickup.type === "chest" ? "\u5b9d\u7bb1" : pickup.item.name) : tile === "stairs" ? "\u968e\u6bb5" : "\u5e8a";
    R.text(ctx, here, 758, 132, { size: 18, color: "#ffeab0", bold: true });
    R.text(ctx, `\u888b ${state.hero.inventory.length}/${Game.Items.getCarryLimit(state)}`, 758, 178, { size: 16, color: "#fff7df" });
    R.text(ctx, `\u653b ${Game.Combat.heroAttackPower(state)} / \u9632 ${Game.Combat.heroDefensePower(state)}`, 758, 206, { size: 16, color: "#fff7df" });
    R.text(ctx, `\u6575 ${run.enemies.length}`, 758, 234, { size: 16, color: "#fff7df" });
    const nearEnemy = run.enemies.some((enemy) => Math.abs(enemy.x - run.player.x) + Math.abs(enemy.y - run.player.y) <= 2);
    if (nearEnemy) R.text(ctx, "\u8fd1\u304f\u306b\u6c17\u914d\u3042\u308a", 758, 266, { size: 15, color: "#ffb08f", bold: true });
    R.text(ctx, "\u64cd\u4f5c", 758, 310, { size: 15, color: "#d9c9a4", bold: true });
    R.text(ctx, "WASD/QEZC / 矢印で移動", 728, 332, { size: 14, color: "#fff7df" });
  }

  function hitEffectFor(x, y) {
    if (!Game.Animations) return null;
    return Game.Animations.getHitEffects("dungeon").find((effect) => effect.x === x && effect.y === y && effect.kind !== "hero");
  }

  function heroHitEffect(run) {
    if (!Game.Animations || !run) return null;
    return Game.Animations.getHitEffects("dungeon").find((effect) => effect.kind === "hero" && effect.x === run.player.x && effect.y === run.player.y) || null;
  }

  function drawHeroDamageOverlay(ctx, hit) {
    if (!hit) return;
    const alpha = Math.max(0, (1 - hit.progress) * 0.22);
    if (alpha <= 0) return;
    ctx.save();
    ctx.fillStyle = `rgba(160,0,0,${alpha})`;
    ctx.fillRect(MAP_X - 12, MAP_Y - 12, MAP_W + 24, MAP_H + 24);
    ctx.strokeStyle = `rgba(255,62,43,${alpha * 3})`;
    ctx.lineWidth = 3;
    ctx.strokeRect(MAP_X - 12, MAP_Y - 12, MAP_W + 24, MAP_H + 24);
    ctx.restore();
  }

  function drawHitNumbers(ctx, view) {
    if (!Game.Animations) return;
    const R = Game.Renderer;
    Game.Animations.getHitEffects("dungeon").forEach((effect) => {
      const screen = toScreen(view, effect.x, effect.y);
      if (!screen) return;
      const foot = tileFoot(screen.x, screen.y);
      const px = foot.x;
      const py = foot.y - TILE - 10 - effect.progress * 20;
      const hero = effect.kind === "hero";
      R.text(ctx, `-${effect.damage}`, px, py, { size: hero ? 22 : 18, align: "center", color: hero ? "#ff604a" : effect.progress < 0.55 ? "#fff7df" : "#ffe28a", bold: true });
    });
  }

  function drawAttackEffect(ctx, view) {
    if (!Game.Animations) return;
    const effect = Game.Animations.getAttackEffect("dungeon");
    if (!effect) return;
    const screen = toScreen(view, effect.x, effect.y);
    if (!screen) return;
    const foot = tileFoot(screen.x, screen.y);
    const cx = foot.x;
    const cy = foot.y - TILE * 0.42;
    const alpha = 1 - effect.progress;
    ctx.save();
    ctx.globalAlpha = Math.max(0, alpha);
    if (effect.kind === "fire") {
      const originScreen = toScreen(view, effect.originX, effect.originY);
      const originFoot = originScreen ? tileFoot(originScreen.x, originScreen.y) : null;
      const sx = originFoot ? originFoot.x : cx;
      const sy = originFoot ? originFoot.y - TILE * 0.42 : cy;
      const mx = sx + (cx - sx) * effect.progress;
      const my = sy + (cy - sy) * effect.progress;
      ctx.strokeStyle = "#ff8a33";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(mx, my);
      ctx.stroke();
      ctx.fillStyle = "rgba(255, 217, 95, 0.85)";
      ctx.beginPath();
      ctx.arc(mx, my, 7 + effect.progress * 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255, 75, 35, 0.75)";
      ctx.beginPath();
      ctx.arc(mx - 4, my + 3, 4 + effect.progress * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }
    ctx.lineCap = "round";
    ctx.strokeStyle = "#fff7d6";
    ctx.lineWidth = 7;
    ctx.beginPath();
    if (effect.direction === "left" || effect.direction === "right") {
      ctx.moveTo(cx - TILE * 0.36, cy - TILE * 0.30);
      ctx.lineTo(cx + TILE * 0.38, cy + TILE * 0.23);
      ctx.moveTo(cx - TILE * 0.30, cy + TILE * 0.27);
      ctx.lineTo(cx + TILE * 0.32, cy - TILE * 0.20);
    } else {
      ctx.moveTo(cx - TILE * 0.31, cy + TILE * 0.32);
      ctx.lineTo(cx + TILE * 0.27, cy - TILE * 0.36);
      ctx.moveTo(cx + TILE * 0.32, cy + TILE * 0.24);
      ctx.lineTo(cx - TILE * 0.25, cy - TILE * 0.28);
    }
    ctx.stroke();
    ctx.strokeStyle = "#82eaff";
    ctx.lineWidth = 3;
    ctx.stroke();
    if (effect.hit) {
      const spark = Math.sin(effect.progress * Math.PI);
      ctx.globalAlpha = Math.max(0, alpha) * 0.9;
      ctx.strokeStyle = "#ffd56a";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx - 14 * spark, cy);
      ctx.lineTo(cx + 14 * spark, cy);
      ctx.moveTo(cx, cy - 14 * spark);
      ctx.lineTo(cx, cy + 14 * spark);
      ctx.moveTo(cx - 10 * spark, cy - 10 * spark);
      ctx.lineTo(cx + 10 * spark, cy + 10 * spark);
      ctx.stroke();
    }
    ctx.restore();
  }

  function isRareItem(item) {
    if (!item || !item.rarity) return false;
    return item.rarity === "\u5e0c\u5c11" || item.rarity === "\u4f1d\u8aac" || item.rarity === "rare" || item.rarity === "legendary";
  }

  function camera(run) {
    return {
      x: clamp(run.player.x - Math.floor(VIEW_W / 2), 0, Math.max(0, run.width - VIEW_W)),
      y: clamp(run.player.y - Math.floor(VIEW_H / 2), 0, Math.max(0, run.height - VIEW_H))
    };
  }

  function sectionAt(run, x, y) {
    const sections = run.sections || run.rooms || [];
    return sections.find((section) => x >= section.x && x < section.x + section.w && y >= section.y && y < section.y + section.h) || null;
  }

  function nearestSection(run, x, y) {
    const sections = run.sections || run.rooms || [];
    return sections
      .slice()
      .sort((a, b) => (Math.abs(a.center.x - x) + Math.abs(a.center.y - y)) - (Math.abs(b.center.x - x) + Math.abs(b.center.y - y)))[0] || null;
  }

  function toScreen(view, x, y) {
    const sx = x - view.x;
    const sy = y - view.y;
    if (sx < -0.8 || sy < -0.8 || sx >= VIEW_W + 0.8 || sy >= VIEW_H + 0.8) return null;
    return { x: sx, y: sy };
  }

  function wallNeighbors(run, x, y) {
    return {
      up: run.tiles[y - 1] && run.tiles[y - 1][x] === "wall",
      down: run.tiles[y + 1] && run.tiles[y + 1][x] === "wall",
      left: run.tiles[y] && run.tiles[y][x - 1] === "wall",
      right: run.tiles[y] && run.tiles[y][x + 1] === "wall"
    };
  }

  function isWall(run, x, y) {
    return Boolean(run.tiles[y] && run.tiles[y][x] === "wall");
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function draw(canvas, state, run) {
    const ctx = Game.Renderer.setupCanvas(canvas);
    if (!ctx || !state || !run) return;
    const R = Game.Renderer;
    R.clear(ctx, "#07080c");
    drawDungeonMap(ctx, state, run);
    drawHud(ctx, state, run);
    drawMiniMap(ctx, run);
    drawFootInfo(ctx, state, run);
    R.message(ctx, (run.messages || []).slice(-8), {
      x: 226,
      y: 412,
      width: 690,
      height: 124,
      maxLines: 4,
      size: 18,
      lineHeight: 25,
      paddingTop: 12,
      paddingBottom: 14,
      extraMargin: 4,
      fill: "rgba(8, 9, 13, 0.52)",
      innerColor: "rgba(84,80,90,0.48)"
    });
  }

  function drawHud(ctx, state, run) {
    const R = Game.Renderer;
    const hero = state.hero || {};
    const hpMax = Math.max(1, hero.maxHp || 1);
    const hpNow = Math.max(0, Math.min(hpMax, hero.hp || 0));
    const hpRatio = hpNow / hpMax;
    const hpDanger = hpRatio <= 0.2;
    const carryLimit = Game.Items.getCarryLimit(state);

    drawHudWindow(ctx, 20, 16, 180, 38);
    R.text(ctx, `${run.name || "迷宮"} ${run.floor}/${run.maxFloor}F`, 34, 27, { size: 17, color: "#fff7df", bold: true });

    drawHudWindow(ctx, 208, 12, 126, 48);
    R.text(ctx, `Lv ${hero.level || 1}`, 222, 20, { size: 18, color: "#fff7df", bold: true });
    R.rect(ctx, 222, 44, 96, 7, "rgba(13, 9, 7, 0.62)");
    R.rect(ctx, 223, 45, 46, 5, "rgba(88, 171, 255, 0.82)");
    R.stroke(ctx, 222, 44, 96, 7, "rgba(241,223,176,0.58)", 1);

    drawHudWindow(ctx, 344, 16, 272, 38);
    R.text(ctx, `HP ${hpNow}/${hpMax}`, 358, 27, { size: 17, color: hpDanger ? "#ff5a4a" : hpRatio < 0.35 ? "#ffb0a0" : "#e5ff91", bold: true });
    R.rect(ctx, 456, 29, 142, 11, "rgba(13, 9, 7, 0.62)");
    R.rect(ctx, 458, 31, Math.max(1, Math.round(138 * hpRatio)), 7, hpDanger ? "rgba(239, 54, 45, 0.95)" : hpRatio < 0.35 ? "rgba(210, 78, 66, 0.88)" : "rgba(83, 186, 98, 0.88)");
    R.stroke(ctx, 456, 29, 142, 11, "rgba(241,223,176,0.58)", 1);
    if (hpDanger) R.text(ctx, "\u5371\u967a", 604, 27, { size: 15, color: "#ff4b38", align: "right", bold: true });

    drawHudWindow(ctx, 626, 16, 124, 38);
    R.text(ctx, `袋 ${hero.inventory.length}/${carryLimit}`, 638, 27, { size: 17, color: "#fff3b8", bold: true });

    drawHudWindow(ctx, 760, 16, 164, 38);
    R.text(ctx, `${hero.gold || 0}G`, 772, 27, { size: 17, color: "#ffe3a2", bold: true });
  }

  function drawHudWindow(ctx, x, y, w, h) {
    const R = Game.Renderer;
    R.rect(ctx, x, y, w, h, "rgba(7, 9, 11, 0.46)");
    R.stroke(ctx, x, y, w, h, "rgba(241,223,176,0.54)", 1);
    R.stroke(ctx, x + 3, y + 3, w - 6, h - 6, "rgba(84,80,90,0.34)", 1);
  }

  Game.DungeonScene = { draw };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});
  let handlers = {};
  let getState = null;
  let getDungeonRun = null;

  function init(options) {
    handlers = options.handlers;
    getState = options.getState;
    getDungeonRun = options.getDungeonRun;
    if (Game.Sprites) Game.Sprites.loadAll();
    window.addEventListener("keydown", onKeyDown);
  }

  function app() {
    return document.getElementById("app");
  }

  function set(html) {
    app().innerHTML = html;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function button(label, action, className, disabled, value) {
    const valueAttr = value !== undefined && value !== null ? `data-value="${escapeHtml(value)}"` : "";
    return `<button type="button" ${className ? `class="${className}"` : ""} data-action="${action}" ${valueAttr} ${disabled ? "disabled" : ""}>${escapeHtml(label)}</button>`;
  }

  function bindActions() {
    app().querySelectorAll("[data-action]").forEach((element) => {
      element.addEventListener("click", () => {
        const action = element.dataset.action;
        const value = element.dataset.value;
        if (Game.Audio) Game.Audio.playSfx("button");
        if (handlers[action]) handlers[action](value, element);
      });
    });
  }

  function setScreen(name) {
    const state = getState && getState();
    if (state) state.screen = name;
    const root = app();
    if (root) root.dataset.screen = name;
  }

  function showSceneTransition(title, subtitle) {
    const root = app();
    if (!root) return;
    const old = document.body.querySelector(".scene-transition");
    if (old) old.remove();
    const overlay = document.createElement("div");
    overlay.className = "scene-transition scene-transition-global";
    overlay.innerHTML = `
      <div class="scene-transition-card">
        <strong>${escapeHtml(title || "")}</strong>
        ${subtitle ? `<span>${escapeHtml(subtitle)}</span>` : ""}
      </div>
    `;
    document.body.appendChild(overlay);
    window.setTimeout(() => {
      if (overlay && overlay.parentNode) overlay.remove();
    }, 1150);
  }

  function renderTitle(showHelp) {
    setScreen("title");
    set(`
      <main class="screen title-screen">
        <section class="title-crest">
          <h1 class="title">\u8ff7\u5bae\u5546\u5e97\u8857</h1>
          <p class="subtitle">\u4ed5\u5165\u308c\u3001\u5546\u3044\u3001\u753a\u3065\u304f\u308a\u300230\u65e5\u9593\u306e\u5c0f\u3055\u306a\u6311\u6226\u3002</p>
          <div class="button-row title-buttons">
            ${button("\u306f\u3058\u3081\u304b\u3089", "newGame", "primary")}
            ${button("\u3064\u3065\u304d\u304b\u3089", "continueGame", "", !Game.Save.hasSave())}
            ${button("\u904a\u3073\u65b9", "toggleTitleHelp", "quiet")}
          </div>
          ${showHelp ? helpBox() : ""}
        </section>
      </main>
    `);
    bindActions();
  }

  function helpBox() {
    return `
      <div class="panel">
        <h2>\u904a\u3073\u65b9</h2>
        <p>\u663c\u306f\u8ff7\u5bae\u3067\u5546\u54c1\u3092\u4ed5\u5165\u308c\u3001\u591c\u306f\u9053\u5177\u5c4b\u3067\u8ca9\u58f2\u3057\u307e\u3059\u3002\u58f2\u4e0a\u3067\u5e97\u3068\u753a\u3092\u5f37\u5316\u3057\u3001\u6751\u4eba\u3092\u5897\u3084\u3057\u307e\u3057\u3087\u3046\u3002\u753a\u304c\u8c4a\u304b\u306b\u306a\u308b\u307b\u3069\u8972\u6483\u3082\u5897\u3048\u307e\u3059\u300230\u65e5\u4ee5\u5185\u306b\u7acb\u6d3e\u306a\u5546\u5e97\u8857\u3092\u4f5c\u308b\u3053\u3068\u304c\u76ee\u7684\u3067\u3059\u3002</p>
      </div>
    `;
  }

  function renderMain() {
    renderTownCanvas("main");
  }

  function renderTownCanvas(screenName) {
    const state = getState();
    setScreen(screenName || "townMap");
    const storyActive = Boolean(state && state.townStory);
    const target = Game.Town.getInteractionTarget ? Game.Town.getInteractionTarget(state) : {};
    const canEnter = target.building && target.building.action && !(target.building.action === "enterDungeon" && state.today.dungeonDone);
    const confirmDisabled = storyActive ? false : (!target.villager && !canEnter);
    const confirmLabel = storyActive ? "\u6b21\u3078" : target.villager ? "\u8a71\u3059" : target.building ? "\u4f7f\u3046" : "\u6c7a\u5b9a";
    set(`
      <main class="screen game-screen">
        <section class="game-shell">
          <div class="game-canvas-frame">
            <div class="canvas-stage">
              <canvas id="gameCanvas" class="game-canvas" width="960" height="540" aria-label="town map"></canvas>
              ${mapOverlay(state, getDungeonRun && getDungeonRun())}
              <div class="game-command-strip town-command-menu" aria-label="town commands">
                ${button("\u88c5\u5099", "openEquipment", "", state.flags.gameOver || storyActive)}
                ${button("\u888b", "openBag", "", state.flags.gameOver || storyActive)}
                ${button("\u30b9\u30c6\u30fc\u30bf\u30b9", "openStatus", "", state.flags.gameOver || storyActive)}
              </div>
            </div>
          </div>
          <div class="game-touch-controls">
            <div class="game-mobile-menu-buttons" aria-label="mobile town commands">
              ${button("\u88c5\u5099", "openEquipment", "", state.flags.gameOver || storyActive)}
              ${button("\u888b", "openBag", "", state.flags.gameOver || storyActive)}
              ${button("\u30b9\u30c6\u30fc\u30bf\u30b9", "openStatus", "", state.flags.gameOver || storyActive)}
            </div>
            <div class="pad game-pad">
              ${button("↖", "townUpLeft")}${button("\u2191", "townUp")}${button("↗", "townUpRight")}
              ${button("\u2190", "townLeft")}${button(confirmLabel, "townConfirm", "primary", confirmDisabled)}${button("\u2192", "townRight")}
              ${button("↙", "townDownLeft")}${button("\u2193", "townDown")}${button("↘", "townDownRight")}
            </div>
            <div class="game-side-buttons">
              ${button("\u623b\u308b", "townCancel", "quiet")}
              ${button("\u5168\u753b\u9762", "toggleFullscreen", "quiet")}
            </div>
          </div>
        </section>
      </main>
    `);
    bindActions();
    const canvas = document.getElementById("gameCanvas");
    const drawFrame = () => {
      const current = document.getElementById("gameCanvas");
      const currentState = getState();
      if (current === canvas && currentState && (currentState.screen === "main" || currentState.screen === "townMap") && Game.TownScene) {
        Game.TownScene.draw(canvas, currentState);
      }
    };
    drawFrame();
    if (Game.Sprites && Game.TownScene) Game.Sprites.onReady(drawFrame);
    if (Game.Animations && Game.Animations.hasActive()) Game.Animations.run(drawFrame);
  }

  function renderStatus() {
    const state = getState();
    const counts = Game.Villagers.statusCounts(state);
    const weapon = Game.Items.equipmentLabel(state.hero.equipment.weapon);
    const armor = Game.Items.equipmentLabel(state.hero.equipment.armor);
    const accessory = Game.Items.equipmentLabel(state.hero.equipment.accessory);
    const bag = Game.Items.equipmentLabel(state.hero.equipment.bag);
    setScreen("status");
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <section class="panel">
          <h2>\u30b9\u30c6\u30fc\u30bf\u30b9</h2>
          <div class="status-grid">
            ${stat("\u65e5\u6570", `${state.day}/${state.maxDays}`)}
            ${stat("\u6240\u6301\u91d1", `${state.hero.gold}G`)}
            ${stat("\u4e3b\u4eba\u516c", `Lv${state.hero.level} HP${state.hero.hp}/${state.hero.maxHp}`, state.hero.hp, state.hero.maxHp)}
            ${stat("\u653b\u6483/\u9632\u5fa1", `${Game.Combat.heroAttackPower(state)} / ${Game.Combat.heroDefensePower(state)}`)}
            ${stat("\u753a\u30ec\u30d9\u30eb", state.town.level)}
            ${stat("\u5e97\u30ec\u30d9\u30eb", `Lv${state.shop.level} \u68da${state.shop.shelves}`)}
            ${stat("\u4eba\u53e3", `${state.town.population}/${state.town.populationCap}`)}
            ${stat("\u6751\u4eba", `\u5143\u6c17${counts.healthy || 0} \u8ca0\u50b7${counts.injured || 0} \u4e0d\u6e80${counts.unhappy || 0}`)}
            ${stat("\u8c4a\u304b\u3055", state.town.wealth)}
            ${stat("\u5e78\u305b\u5ea6", state.town.happiness, state.town.happiness, 100)}
            ${stat("\u6cbb\u5b89", state.town.safety, state.town.safety, 100)}
            ${stat("\u9632\u885b\u529b", state.town.defense)}
          </div>
        </section>
        <section class="panel">
          <h2>\u88c5\u5099\u4e2d</h2>
          <div class="list">
            <div class="list-item"><span><strong>\u6b66\u5668</strong><br>${escapeHtml(weapon)}</span></div>
            <div class="list-item"><span><strong>\u9632\u5177</strong><br>${escapeHtml(armor)}</span></div>
            <div class="list-item"><span><strong>\u88c5\u98fe</strong><br>${escapeHtml(accessory)}</span></div>
            <div class="list-item"><span><strong>\u888b</strong><br>${escapeHtml(bag)}</span></div>
          </div>
          <div class="toolbar" style="margin-top:12px">${button("\u753a\u3078\u623b\u308b", "openTownMap", "primary")}</div>
        </section>
      </main>
    `);
    bindActions();
  }
  function commandCategory(title, inner) {
    return `
      <div class="command-category">
        <h3>${escapeHtml(title)}</h3>
        <div class="command-grid">${inner}</div>
      </div>
    `;
  }

  function dailyGoalsPanel(state) {
    const goals = state.dailyGoals && Array.isArray(state.dailyGoals.goals) ? state.dailyGoals.goals : [];
    return `
      <section class="panel objective-panel">
        <div class="panel-headline">
          <h2>今日の目標</h2>
          <span class="tag">${state.day}日目</span>
        </div>
        <div class="objective-grid">
          ${goals.length ? goals.map((goal) => {
            const progress = Math.min(goal.progress || 0, goal.target || 1);
            const percent = Game.State.clamp((progress / (goal.target || 1)) * 100, 0, 100);
            return `
              <article class="objective-card ${goal.completed ? "completed" : ""}">
                <strong>${escapeHtml(goal.title)}</strong>
                <span>${progress}/${goal.target}</span>
                <div class="meter"><span style="width:${percent}%"></span></div>
                <span class="tag">報酬 ${escapeHtml(Game.Objectives ? Game.Objectives.rewardText(goal) : "")}</span>
              </article>
            `;
          }).join("") : "<p>今日の目標はまだありません。</p>"}
        </div>
      </section>
    `;
  }

  function raidOmenPanel(state) {
    if (!state.raidOmen || !state.raidOmen.active) return "";
    const daysText = state.raidOmen.daysLeft > 0 ? `あと${state.raidOmen.daysLeft}日ほど` : "今夜にも";
    return `
      <section class="panel raid-warning">
        <h2>襲撃予兆</h2>
        <p>${escapeHtml(state.raidOmen.text)}。${escapeHtml(daysText)}危険です。兵士客が武器・防具・薬を探しに来やすくなっています。</p>
        <div class="toolbar">
          ${button("防衛へ投資", "openTown", "primary", state.flags.gameOver)}
          ${button("商品を並べる", "openShop", "", state.flags.gameOver)}
        </div>
      </section>
    `;
  }

  function creditWarningNotice(state) {
    if (!Game.Shop || !Game.Shop.creditLedgerSummary) return "";
    const summary = Game.Shop.creditLedgerSummary(state);
    if (!summary.balance) return "";
    const strong = summary.balance >= summary.limit * 0.7;
    return `
      <div class="notice ${strong ? "credit-warning" : ""}">
        <strong>ツケ残高 ${summary.balance}G / 上限 ${summary.limit}G</strong>
        <p>ツケ残高が増えています。資金繰りに注意してください。</p>
        <div class="toolbar">${button("ツケ帳を見る", "openCreditLedger", "primary", state.flags.gameOver)}</div>
      </div>
    `;
  }

  function headerPanel(state) {
    const villagerCounts = Game.Villagers.statusCounts(state);
    return `
      <section class="panel">
        <h2>${state.day}\u65e5\u76ee / ${state.maxDays}\u65e5  ${escapeHtml(state.phase)}</h2>
        <div class="status-grid">
          ${stat("\u6240\u6301\u91d1", `${state.hero.gold}G`)}
          ${stat("\u4e3b\u4eba\u516c", `Lv${state.hero.level} HP${state.hero.hp}/${state.hero.maxHp}`, state.hero.hp, state.hero.maxHp)}
          ${stat("\u653b\u6483/\u9632\u5fa1", `${Game.Combat.heroAttackPower(state)} / ${Game.Combat.heroDefensePower(state)}`)}
          ${stat("\u753a\u30ec\u30d9\u30eb", state.town.level)}
          ${stat("\u5e97\u30ec\u30d9\u30eb", `Lv${state.shop.level} \u68da${state.shop.shelves}`)}
          ${stat("\u4eba\u53e3", `${state.town.population}/${state.town.populationCap}`)}
          ${stat("\u6751\u4eba\u72b6\u614b", `\u5143${villagerCounts.healthy || 0} \u8ca0${villagerCounts.injured || 0} \u4e0d${villagerCounts.unhappy || 0}`)}
          ${stat("\u8c4a\u304b\u3055", state.town.wealth)}
          ${stat("\u5e78\u305b\u5ea6", state.town.happiness, state.town.happiness, 100)}
          ${stat("\u6cbb\u5b89", state.town.safety, state.town.safety, 100)}
          ${stat("\u9632\u885b\u529b", state.town.defense)}
          ${stat("\u5e97\u306e\u8a55\u5224", state.shop.reputation, state.shop.reputation, 100)}
          ${stat("\u5e97\u306e\u8010\u4e45\u5ea6", state.shop.durability, state.shop.durability, 100)}
          ${stat("\u5009\u5eab", `${state.shop.storage.length}/${state.shop.storageCapacity}`)}
          ${stat("\u8972\u6483\u5371\u967a\u5ea6", `${Math.round(Game.Raid.raidChance(state))}%`)}
        </div>
      </section>
    `;
  }

  function stat(label, value, meterValue, meterMax) {
    const meter = typeof meterValue === "number"
      ? `<div class="meter"><span style="width:${Game.State.clamp((meterValue / meterMax) * 100, 0, 100)}%"></span></div>`
      : "";
    return `<div class="stat"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong>${meter}</div>`;
  }

  function soundPanel() {
    const volume = Game.Audio && Game.Audio.getVolume ? Game.Audio.getVolume() : 0.45;
    return `
      <div class="sound-panel">
        <span class="tag">\u52b9\u679c\u97f3 ${Game.Audio && Game.Audio.isEnabled && Game.Audio.isEnabled() ? "ON" : "OFF"}</span>
        <button type="button" class="mini-button" data-action="setSfxVolume" data-value="0.25">\u5c0f</button>
        <button type="button" class="mini-button" data-action="setSfxVolume" data-value="0.45">\u4e2d</button>
        <button type="button" class="mini-button" data-action="setSfxVolume" data-value="0.75">\u5927</button>
        <span class="tag">\u97f3\u91cf ${Math.round(volume * 100)}%</span>
      </div>
    `;
  }

  function goalPanel(state) {
    return `
      <div class="notice">
        <strong>\u52dd\u5229\u6761\u4ef6</strong>
        <p>30\u65e5\u4ee5\u5185\u306b\u3001\u5e97\u30ec\u30d9\u30eb3\u30fb\u753a\u30ec\u30d9\u30eb3\u30fb\u4eba\u53e330\u4eba\u4ee5\u4e0a\u30fb\u5e78\u305b\u5ea660\u4ee5\u4e0a\u3092\u9054\u6210\u3059\u308b\u3002</p>
        <span class="tag">\u5e97Lv ${state.shop.level}/3</span>
        <span class="tag">\u753aLv ${state.town.level}/3</span>
        <span class="tag">\u4eba\u53e3 ${state.town.population}/30</span>
        <span class="tag">\u5e78\u305b\u5ea6 ${state.town.happiness}/60</span>
      </div>
    `;
  }

  function logPanel(logs) {
    return `
      <section class="panel bottom-log">
        <h2>\u64cd\u4f5c\u30ed\u30b0</h2>
        <ul class="log-list">${logs.slice(-18).reverse().map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    `;
  }

  function renderTownMap() {
    renderTownCanvas("townMap");
  }

  function townBoard(state) {
    let cells = "";
    for (let y = 0; y < state.townMap.height; y += 1) {
      for (let x = 0; x < state.townMap.width; x += 1) {
        const building = Game.Town.getBuildingAt(state, x, y);
        const villager = Game.Town.getVillagerAt(state, x, y);
        let cls = "town-road";
        let label = "\u9053";
        let content = sprite("road", label);
        if (building) {
          const stage = Game.Town.buildingStage(state, building);
          cls = `town-building building-${building.id} stage-${stage}`;
          label = building.name;
          content = `${sprite(`building-${building.id}`, label)}<span class="map-label">${escapeHtml(building.symbol)}Lv${stage}</span>`;
        }
        if (villager && !building) {
          cls = `town-villager ${villager.css}`;
          label = `${villager.name} / ${villager.job}`;
          content = `${sprite(villager.css || "villager", label)}<span class="map-label">${escapeHtml(villager.name)}</span>`;
        }
        if (state.townMap.hero.x === x && state.townMap.hero.y === y) {
          cls += " town-hero";
          label = "\u82e5\u304d\u5546\u4eba";
          content = `${sprite("hero", label)}<span class="map-label">\u5546</span>`;
        }
        cells += `<div class="town-cell ${cls}" title="${escapeHtml(label)}">${content}</div>`;
      }
    }
    return `<div class="town-board">${cells}</div>`;
  }

  function buildingInfo(building, state) {
    const enterText = building.action === "enterDungeon" && state.today.dungeonDone ? "\u4eca\u65e5\u306e\u63a2\u7d22\u306f\u7d42\u4e86\u6e08\u307f\u3002" : "\u300c\u5165\u308b\u300d\u3067\u5229\u7528\u3067\u304d\u307e\u3059\u3002";
    return `<div class="notice"><strong>${escapeHtml(building.name)} Lv${Game.Town.buildingStage(state, building)}</strong><p>${escapeHtml(building.description)}</p><span class="tag">${escapeHtml(enterText)}</span></div>`;
  }

  function villagerInfo(villager) {
    return `<div class="notice"><strong>${escapeHtml(villager.name)} / ${escapeHtml(villager.job)}</strong><p>\u300c\u8a71\u3059\u300d\u3067\u4f1a\u8a71\u3067\u304d\u307e\u3059\u3002</p></div>`;
  }

  function conversationPanel(state) {
    const talk = state.lastConversation;
    if (!talk) return "";
    return `
      <div class="conversation-box">
        <strong>${escapeHtml(talk.name)} / ${escapeHtml(talk.job)}</strong>
        <p>\u300c${escapeHtml(talk.line)}\u300d</p>
      </div>
    `;
  }

  function buildingChip(building, state) {
    return `<button type="button" class="building-chip" data-action="jumpTownBuilding" data-value="${building.id}">${escapeHtml(building.symbol)} ${escapeHtml(building.name)} Lv${Game.Town.buildingStage(state, building)}</button>`;
  }

  function villagerChip(villager) {
    return `<span class="legend-chip">${sprite(villager.css || "villager", villager.name)}${escapeHtml(villager.name)} / ${escapeHtml(villager.job)}</span>`;
  }

  function sprite(type, label) {
    return `<span class="pixel-sprite sprite-${escapeHtml(type)}" aria-hidden="true"></span><span class="sr-only">${escapeHtml(label)}</span>`;
  }

  function renderDungeon() {
    const state = getState();
    const run = getDungeonRun();
    if (!run || !run.active) {
      renderMain();
      return;
    }
    setScreen("dungeon");
    set(`
      <main class="screen game-screen">
        <section class="game-shell">
          <div class="game-canvas-frame">
            <div class="canvas-stage">
              <canvas id="gameCanvas" class="game-canvas" width="960" height="540" aria-label="ダンジョン"></canvas>
              ${mapOverlay(state, run)}
              <div class="game-command-strip dungeon-command-menu" aria-label="dungeon commands">
                ${button("装備", "openEquipment", "", state.flags.gameOver)}
                ${button("袋", "openDungeonBag", "", state.flags.gameOver)}
                ${button("ステータス", "openStatus", "", state.flags.gameOver)}
              </div>
            </div>
          </div>
          <div class="game-touch-controls">
            <div class="game-mobile-menu-buttons" aria-label="mobile dungeon commands">
              ${button("装備", "openEquipment", "", state.flags.gameOver)}
              ${button("袋", "openDungeonBag", "", state.flags.gameOver)}
              ${button("ステータス", "openStatus", "", state.flags.gameOver)}
            </div>
            <div class="pad game-pad">
              ${button("↖", "moveUpLeft")}${button("\u2191", "moveUp")}${button("↗", "moveUpRight")}
              ${button("\u2190", "moveLeft")}${button("決定", "attackButton", "primary")}${button("\u2192", "moveRight")}
              ${button("↙", "moveDownLeft")}${button("\u2193", "moveDown")}${button("↘", "moveDownRight")}
            </div>
            <div class="game-side-buttons">
              ${button("待機", "waitTurn", "quiet")}
              ${button("全画面", "toggleFullscreen", "quiet")}
            </div>
          </div>
        </section>
      </main>
    `);
    bindActions();
    const canvas = document.getElementById("gameCanvas");
    const drawFrame = () => {
      const current = document.getElementById("gameCanvas");
      const currentState = getState();
      const currentRun = getDungeonRun();
      if (current === canvas && currentRun && currentRun.active && Game.DungeonScene) {
        Game.DungeonScene.draw(canvas, currentState, currentRun);
      }
    };
    drawFrame();
    if (Game.Sprites && Game.DungeonScene) Game.Sprites.onReady(drawFrame);
    if (Game.Animations && Game.Animations.hasActive()) Game.Animations.run(drawFrame);
  }

  function dungeonBoard(run) {
    let cells = "";
    for (let y = 0; y < run.height; y += 1) {
      for (let x = 0; x < run.width; x += 1) {
        const enemy = run.enemies.find((item) => item.x === x && item.y === y);
        const pickup = run.pickups.find((item) => item.x === x && item.y === y);
        let cls = run.tiles[y][x];
        let label = run.tiles[y][x] === "wall" ? "\u58c1" : "\u5e8a";
        let content = sprite(run.tiles[y][x] === "wall" ? "wall" : "floor", label);
        let marker = "";
        if (run.tiles[y][x] === "stairs") {
          label = "\u968e\u6bb5";
          content = sprite("stairs", label);
          marker = "\u968e";
        }
        if (pickup) {
          cls = pickup.type === "chest" ? "chest" : "loot";
          label = pickup.type === "chest" ? "\u5b9d\u7bb1" : Game.Items.itemLabel(pickup.item);
          content = sprite(pickup.type === "chest" ? "chest" : itemSpriteType(pickup.item), label);
          marker = pickup.type === "chest" ? "\u5b9d" : "\u54c1";
        }
        if (enemy) {
          cls = `enemy ${enemy.css || ""}`;
          label = enemy.name;
          content = sprite(enemy.css || "enemy", label);
          marker = enemy.symbol;
        }
        if (run.player.x === x && run.player.y === y) {
          cls = "hero";
          label = "\u82e5\u304d\u5546\u4eba";
          content = sprite("hero", label);
          marker = "\u5546";
        }
        if (marker) content += `<span class="cell-label">${escapeHtml(marker)}</span>`;
        cells += `<div class="cell ${cls}" title="${escapeHtml(label)}">${content}</div>`;
      }
    }
    return `<div class="dungeon-board" role="grid" style="grid-template-columns:repeat(${run.width}, minmax(24px, 1fr)); aspect-ratio:${run.width} / ${run.height}">${cells}</div>`;
  }

  function itemSpriteType(item) {
    if (!item) return "loot";
    if (item.kind === "material") return "material";
    if (item.kind === "equipment") {
      if (item.slot === "weapon") return "weapon";
      if (item.slot === "bag") return "bag";
      if (item.slot === "accessory") return "jewel";
      return "armor";
    }
    if (Game.Items.isHealingItem(item)) return "potion";
    if (item.category === "\u98df\u6599") return "food";
    if (item.category === "\u88c5\u98fe\u54c1") return "jewel";
    return "loot";
  }

  function slotLabel(slot) {
    const labels = { weapon: "武器", armor: "防具", accessory: "装飾", bag: "袋" };
    return labels[slot] || slot;
  }

  function mapOverlay(state, run) {
    if (!state || !state.uiOverlay) return "";
    const type = state.uiOverlay.type || "bag";
    if (type === "stairs") return stairsOverlay(run);
    if (type === "equipment") return equipmentOverlay(state, run);
    if (type === "status") return statusOverlay(state);
    if (type === "shop") return shopCounterOverlay(state);
    if (type === "warehouse") return warehouseOverlay(state);
    if (type === "hospital") return simpleFacilityOverlay("病院", "負傷した住民の治療は、今後この町マップ内の受付で操作できるようにします。");
    if (type === "blacksmith") return blacksmithMapOverlay(state);
    if (type === "town") return townDevelopmentOverlay(state);
    if (type === "shopName") return shopNameOverlay(state);
    if (type === "quests") return simpleFacilityOverlay("お願い", "村人のお願いは、村人に話しかけた時の会話ウィンドウへ寄せていきます。");
    if (type === "credit") return simpleFacilityOverlay("ツケ帳", "ツケ帳は、店のカウンター内ウィンドウとして統合します。");
    return bagOverlay(state, run);
  }

  function stairsOverlay(run) {
    const floorText = run && run.floor >= run.maxFloor ? "この先で踏破して町へ戻ります。" : `次は${(run && run.floor ? run.floor + 1 : 2)}階です。`;
    return `
      <div class="map-overlay-window stairs-window" role="dialog" aria-label="階段">
        <div class="map-window-title"><span>階段</span><button type="button" data-action="closeOverlay">閉じる</button></div>
        <p class="map-window-help">階段の上にいる。${escapeHtml(floorText)}</p>
        <div class="map-shop-actions">
          <button type="button" data-action="descendStairs">下りる</button>
          <button type="button" data-action="returnTown">町へ戻る</button>
        </div>
      </div>
    `;
  }

  function activeOverlayItems(state, run) {
    return run && run.active
      ? { source: "inventory", label: `袋 ${state.hero.inventory.length}/${Game.Items.getCarryLimit(state)}`, items: state.hero.inventory }
      : { source: "storage", label: `持ち物 ${state.shop.storage.length}/${state.shop.storageCapacity}`, items: state.shop.storage };
  }

  function bagOverlay(state, run) {
    const data = activeOverlayItems(state, run);
    return `
      <div class="map-overlay-window item-window" role="dialog" aria-label="袋">
        <div class="map-window-title"><span>袋</span><button type="button" data-action="closeOverlay">閉じる</button></div>
        <p class="map-window-help">${escapeHtml(data.label)} / アイテムは「使う・捨てる」、装備品は「装備・捨てる」。</p>
        <div class="map-item-list">
          ${data.items.length ? data.items.map((item, index) => overlayItemRow(item, index, data.source)).join("") : "<p class=\"map-empty\">持ち物は空です。</p>"}
        </div>
      </div>
    `;
  }

  function activeOverlayItems(state, run) {
    return { source: "inventory", label: `袋 ${state.hero.inventory.length}/${Game.Items.getCarryLimit(state)}`, items: state.hero.inventory };
  }

  function warehouseOverlay(state) {
    const carryLimit = Game.Items.getCarryLimit(state);
    const inventory = state.hero.inventory || [];
    const storage = state.shop.storage || [];
    return `
      <div class="map-overlay-window item-window warehouse-window" role="dialog" aria-label="倉庫">
        <div class="map-window-title"><span>倉庫</span><button type="button" data-action="closeOverlay">閉じる</button></div>
        <p class="map-window-help">袋と倉庫の品を移動できます。袋画面には手持ちだけを表示します。</p>
        <div class="map-storage-columns">
          <section>
            <div class="map-section-label">袋 ${inventory.length}/${carryLimit}</div>
            <div class="map-item-list compact">
              ${inventory.length ? inventory.map((item, index) => warehouseItemRow(item, index, "inventory")).join("") : "<p class=\"map-empty\">袋は空です。</p>"}
            </div>
          </section>
          <section>
            <div class="map-section-label">倉庫 ${storage.length}/${state.shop.storageCapacity}</div>
            <div class="map-item-list compact">
              ${storage.length ? storage.map((item, index) => warehouseItemRow(item, index, "storage")).join("") : "<p class=\"map-empty\">倉庫は空です。</p>"}
            </div>
          </section>
        </div>
      </div>
    `;
  }

  function warehouseItemRow(item, index, source) {
    const label = item.kind === "equipment" ? Game.Items.equipmentLabel(item) : Game.Items.itemLabel(item);
    const action = source === "inventory" ? "storeInventoryItem" : "takeStorageItem";
    const actionLabel = source === "inventory" ? "しまう" : "取り出す";
    return `
      <div class="map-item-row">
        <span>${sprite(itemSpriteType(item), label)}${escapeHtml(label)}</span>
        <button type="button" data-action="${action}" data-value="${index}">${actionLabel}</button>
      </div>
    `;
  }

  function overlayItemRow(item, index, source) {
    const label = item.kind === "equipment" ? Game.Items.equipmentLabel(item) : Game.Items.itemLabel(item);
    const useable = item.kind !== "equipment" && Game.Items.isHealingItem(item);
    const equipValue = `${source}:${index}`;
    if (item.kind === "equipment") {
      return `
        <div class="map-item-row">
          <span>${sprite(itemSpriteType(item), label)}${escapeHtml(label)}</span>
          <button type="button" data-action="equipOverlayItem" data-value="${escapeHtml(equipValue)}">装備</button>
          <button type="button" class="danger" data-action="discardOverlayItem" data-value="${index}">捨てる</button>
        </div>
      `;
    }
    return `
      <div class="map-item-row">
        <span>${sprite(itemSpriteType(item), label)}${escapeHtml(label)}</span>
        <button type="button" data-action="useOverlayItem" data-value="${index}" ${useable ? "" : "disabled"}>使う</button>
        <button type="button" class="danger" data-action="discardOverlayItem" data-value="${index}">捨てる</button>
      </div>
    `;
  }

  function equipmentOverlay(state, run) {
    const data = activeOverlayItems(state, run);
    const equipmentItems = data.items.map((item, index) => ({ item, index })).filter(({ item }) => item.kind === "equipment");
    const slots = ["weapon", "armor", "accessory", "bag"];
    return `
      <div class="map-overlay-window equipment-window" role="dialog" aria-label="装備">
        <div class="map-window-title"><span>装備</span><button type="button" data-action="closeOverlay">閉じる</button></div>
        <p class="map-window-help">E は装備中。装備中の品は「外す・捨てる」を選べます。</p>
        <div class="map-item-list">
          ${slots.map((slot) => equippedRow(state, slot)).join("")}
          <div class="map-section-label">${escapeHtml(data.label)} の装備品</div>
          ${equipmentItems.length ? equipmentItems.map(({ item, index }) => overlayItemRow(item, index, data.source)).join("") : "<p class=\"map-empty\">装備できる品はありません。</p>"}
        </div>
      </div>
    `;
  }

  function equippedRow(state, slot) {
    const item = state.hero.equipment[slot];
    const label = item ? Game.Items.equipmentLabel(item) : "なし";
    return `
      <div class="map-item-row equipped-row">
        <span><strong>E</strong> ${escapeHtml(slotLabel(slot))}: ${escapeHtml(label)}</span>
        <button type="button" data-action="unequipOverlayItem" data-value="${escapeHtml(slot)}" ${item ? "" : "disabled"}>外す</button>
        <button type="button" class="danger" data-action="discardEquippedItem" data-value="${escapeHtml(slot)}" ${item ? "" : "disabled"}>捨てる</button>
      </div>
    `;
  }

  function statusOverlay(state) {
    return `
      <div class="map-overlay-window status-window" role="dialog" aria-label="ステータス">
        <div class="map-window-title"><span>ステータス</span><button type="button" data-action="closeOverlay">閉じる</button></div>
        <div class="map-status-grid">
          <span>日数</span><strong>${state.day}/${state.maxDays}</strong>
          <span>所持金</span><strong>${state.hero.gold}G</strong>
          <span>HP</span><strong>${state.hero.hp}/${state.hero.maxHp}</strong>
          <span>攻撃/防御</span><strong>${Game.Combat.heroAttackPower(state)} / ${Game.Combat.heroDefensePower(state)}</strong>
          <span>町Lv</span><strong>${state.town.level}</strong>
          <span>店Lv</span><strong>${state.shop.level}</strong>
          <span>人口</span><strong>${state.town.population}/${state.town.populationCap}</strong>
          <span>幸せ度</span><strong>${state.town.happiness}</strong>
        </div>
      </div>
    `;
  }

  function shopCounterOverlay(state) {
    const saleable = state.shop.storage.map((item, index) => ({ item, index })).filter(({ item }) => Game.Items.isSaleable(item)).slice(0, 8);
    return `
      <div class="map-overlay-window shop-window" role="dialog" aria-label="店カウンター">
        <div class="map-window-title"><span>店カウンター</span><button type="button" data-action="closeOverlay">閉じる</button></div>
        <p class="map-window-help">お店の中でカウンター越しに棚を整えます。カウンターは通れません。</p>
        <div class="map-shop-actions">
          <button type="button" data-action="autoArrange">おすすめで並べる</button>
          <button type="button" data-action="startNightSale" ${state.shop.shelfItems.length ? "" : "disabled"}>夜の販売へ</button>
        </div>
        <div class="map-item-list">
          <div class="map-section-label">棚 ${state.shop.shelfItems.length}/${state.shop.shelves}</div>
          ${state.shop.shelfItems.length ? state.shop.shelfItems.map((item, index) => `
            <div class="map-item-row"><span>${sprite(itemSpriteType(item), item.name)}${escapeHtml(Game.Items.itemLabel(item))}</span><button type="button" data-action="removeShelf" data-value="${index}">戻す</button></div>
          `).join("") : "<p class=\"map-empty\">棚は空です。</p>"}
          <div class="map-section-label">並べられる品</div>
          ${saleable.length ? saleable.map(({ item, index }) => `
            <div class="map-item-row"><span>${sprite(itemSpriteType(item), item.name)}${escapeHtml(Game.Items.itemLabel(item))}</span><button type="button" data-action="addShelf" data-value="${index}" ${state.shop.shelfItems.length >= state.shop.shelves ? "disabled" : ""}>並べる</button></div>
          `).join("") : "<p class=\"map-empty\">並べられる商品がありません。</p>"}
        </div>
      </div>
    `;
  }

  function townDevelopmentOverlay(state) {
    const options = Game.Town.UPGRADE_OPTIONS || [];
    return `
      <div class="map-overlay-window town-development-window" role="dialog" aria-label="町の開発">
        <div class="map-window-title"><span>町の開発</span><button type="button" data-action="closeOverlay">閉じる</button></div>
        <p class="map-window-help">売上を町と店へ投資します。今回は外観変化はまだ入れず、効果だけ反映します。</p>
        <div class="map-status-grid compact-status">
          <span>所持金</span><strong>${state.hero.gold}G</strong>
          <span>町Lv</span><strong>${state.town.level}</strong>
          <span>人口</span><strong>${state.town.population}/${state.town.populationCap}</strong>
          <span>豊かさ</span><strong>${state.town.wealth}</strong>
          <span>幸せ度</span><strong>${state.town.happiness}</strong>
          <span>防衛力</span><strong>${state.town.defense}</strong>
        </div>
        <div class="map-item-list town-upgrade-list">
          ${options.map((option) => townUpgradeRow(state, option)).join("")}
        </div>
      </div>
    `;
  }

  function blacksmithMapOverlay(state) {
    if (!state || state.buildings.blacksmithLevel <= 0) {
      return simpleFacilityOverlay("鍛冶屋", "町に投資すると、翌朝に鍛冶職人が訪れます。");
    }
    return `
      <div class="map-overlay-window blacksmith-window" role="dialog" aria-label="鍛冶屋">
        <div class="map-window-title"><span>鍛冶屋</span><button type="button" data-action="closeOverlay">閉じる</button></div>
        <p class="map-window-help">ゴドの鍛冶屋です。装備中の武器を強化できます。熟練度が満タンの武器は進化できます。</p>
        <div class="map-item-list">
          <div class="map-section-label">武器の強化</div>
          ${blacksmithEquipmentSlot(state, "weapon", "装備中の武器", state.hero.equipment.weapon)}
          <div class="map-section-label">武器の進化</div>
          ${blacksmithWeaponEvolutionPanel(state)}
        </div>
      </div>
    `;
  }

  function townUpgradeRow(state, option) {
    const cost = option.getCost(state);
    const disabled = cost === null || state.hero.gold < cost;
    const costText = cost === null ? "最大" : `${cost}G`;
    const reason = cost === null ? "これ以上投資できません。" : state.hero.gold < cost ? "所持金が足りません。" : "投資できます。";
    return `
      <div class="map-item-row town-upgrade-row">
        <span><strong>${escapeHtml(option.name)}</strong><br>${escapeHtml(option.description)}<br><em>${escapeHtml(reason)}</em></span>
        <span class="map-cost">${escapeHtml(costText)}</span>
        <button type="button" data-action="buyUpgrade" data-value="${escapeHtml(option.id)}" ${disabled ? "disabled" : ""}>投資</button>
      </div>
    `;
  }

  function shopNameOverlay(state) {
    const name = state.shop && state.shop.name ? state.shop.name : "名もなき店";
    return `
      <div class="map-overlay-window shop-name-window" role="dialog" aria-label="店名看板">
        <div class="map-window-title"><span>店名看板</span><button type="button" data-action="closeOverlay">閉じる</button></div>
        <p class="map-window-help">看板に出すお店の名前を決めます。短い名前ほど町マップで読みやすくなります。</p>
        <label class="map-input-label" for="shopNameInput">お店の名前</label>
        <input id="shopNameInput" class="map-text-input" type="text" maxlength="16" value="${escapeHtml(name)}" autocomplete="off">
        <div class="map-shop-actions">
          <button type="button" data-action="setShopName">看板に書く</button>
          <button type="button" data-action="closeOverlay">やめる</button>
        </div>
      </div>
    `;
  }

  function simpleFacilityOverlay(title, message) {
    return `
      <div class="map-overlay-window status-window" role="dialog" aria-label="${escapeHtml(title)}">
        <div class="map-window-title"><span>${escapeHtml(title)}</span><button type="button" data-action="closeOverlay">閉じる</button></div>
        <p class="map-window-help">${escapeHtml(message)}</p>
      </div>
    `;
  }

  function dungeonInventory(state) {
    if (!state.hero.inventory.length) return "<p>\u307e\u3060\u4f55\u3082\u6301\u3063\u3066\u3044\u306a\u3044\u3002</p>";
    return state.hero.inventory.map((item, index) => {
      const canUse = Game.Items.isHealingItem(item);
      return `
      <div class="inventory-row">
        <span class="mini-item">${sprite(itemSpriteType(item), Game.Items.itemLabel(item))}${escapeHtml(Game.Items.itemLabel(item))}</span>
        <button type="button" class="mini-button" data-action="useDungeonItem" data-value="${index}" ${canUse ? "" : "disabled"}>\u4f7f\u3046</button>
        <button type="button" class="mini-button danger" data-action="discardDungeonItem" data-value="${index}">\u6368\u3066\u308b</button>
      </div>
    `;
    }).join("");
  }

  function renderBag() {
    const state = getState();
    const run = getDungeonRun();
    if (run && run.active) {
      renderDungeonBag();
      return;
    }
    setScreen("bag");
    const carried = state.hero.inventory || [];
    const limit = Game.Items.getCarryLimit(state);
    const storagePreview = state.shop.storage.slice(0, 12);
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <div class="split">
          <section class="panel">
            <h2>袋</h2>
            <div class="toolbar">
              ${button("装備を選ぶ", "openEquipment", "primary")}
              ${button("倉庫を見る", "openWarehouse", "")}
              ${button("町マップ", "openTownMap", "")}
              ${button("戻る", "backMain", "quiet")}
            </div>
            <div class="notice">
              <strong>持ち物上限 ${carried.length}/${limit}</strong>
              <p>袋を装備すると、ダンジョンで持ち帰れる道具の数が増えます。町に戻ると袋の中身は倉庫へ移します。</p>
            </div>
            <h3>現在の袋の中</h3>
            <div class="list">${carried.length ? carried.map((item) => `<div class="inventory-row"><span class="mini-item">${sprite(itemSpriteType(item), Game.Items.itemLabel(item))}${escapeHtml(Game.Items.itemLabel(item))}</span></div>`).join("") : "<p>いま袋の中は空です。</p>"}</div>
          </section>
          <section class="panel">
            <h2>倉庫の中身</h2>
            <p class="muted">販売・装備・鍛冶に使う品は倉庫に入っています。</p>
            <div class="list">${storagePreview.length ? storagePreview.map((item) => `<div class="inventory-row"><span class="mini-item">${sprite(itemSpriteType(item), Game.Items.itemLabel(item))}${escapeHtml(Game.Items.itemLabel(item))}</span></div>`).join("") : "<p>倉庫は空です。</p>"}</div>
          </section>
        </div>
      </main>
    `);
    bindActions();
  }

  function renderDungeonBag() {
    const state = getState();
    const run = getDungeonRun();
    if (!run || !run.active) {
      renderBag();
      return;
    }
    setScreen("dungeonBag");
    const limit = Game.Items.getCarryLimit(state);
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <section class="panel">
          <h2>袋 ${state.hero.inventory.length}/${limit}</h2>
          <div class="toolbar">
            ${button("迷宮へ戻る", "backDungeon", "primary")}
            ${button("装備", "openEquipment", "")}
          </div>
          <div class="notice">
            <strong>探索中の持ち物</strong>
            <p>回復品は「使う」、不要な品は「捨てる」で袋を空けられます。捨てた品は戻りません。</p>
          </div>
          <div class="list">${dungeonInventory(state)}</div>
        </section>
      </main>
    `);
    bindActions();
  }

  function renderShop() {
    const state = getState();
    setScreen("shop");
    const saleable = state.shop.storage.map((item, index) => ({ item, index })).filter(({ item }) => Game.Items.isSaleable(item));
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <div class="split">
          <section class="panel">
            <h2>\u68da ${state.shop.shelfItems.length}/${state.shop.shelves}</h2>
            <div class="toolbar">
              ${button("\u304a\u3059\u3059\u3081\u3067\u4e26\u3079\u308b", "autoArrange", "primary")}
              ${button("\u591c\u306e\u8ca9\u58f2\u3092\u958b\u59cb", "startNightSale", "primary", state.today.nightSaleDone)}
              ${button("ツケ帳", "openCreditLedger", "")}
              ${button("\u623b\u308b", "backMain", "quiet")}
            </div>
            ${creditWarningNotice(state)}
            ${shopLayout(state)}
            <div class="list" style="margin-top:12px">${state.shop.shelfItems.length ? state.shop.shelfItems.map((item, index) => shelfItem(item, index)).join("") : "<p>\u68da\u306f\u7a7a\u3067\u3059\u3002</p>"}</div>
          </section>
          <section class="panel">
            <h2>\u5009\u5eab\u306e\u5546\u54c1</h2>
            <div class="list">${saleable.length ? saleable.map(({ item, index }) => storageSaleItem(state, item, index)).join("") : "<p>\u68da\u306b\u4e26\u3079\u3089\u308c\u308b\u5546\u54c1\u304c\u3042\u308a\u307e\u305b\u3093\u3002</p>"}</div>
          </section>
        </div>
      </main>
    `);
    bindActions();
  }

  function renderCreditLedger() {
    const state = getState();
    setScreen("creditLedger");
    const summary = Game.Shop.creditLedgerSummary(state);
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <section class="panel">
          <div class="panel-headline">
            <h2>ツケ帳</h2>
            <span class="tag">未回収 ${summary.balance}G / 上限 ${summary.limit}G</span>
          </div>
          <div class="toolbar">
            ${button("店へ戻る", "openShop", "primary")}
            ${button("メインへ", "backMain", "quiet")}
          </div>
          <div class="credit-summary">
            <span class="tag">未払い ${summary.unpaid.length}件</span>
            <span class="tag">支払い済み ${summary.paid.length}件</span>
            <span class="tag">踏み倒し ${summary.defaulted.length}件</span>
          </div>
          <div class="credit-ledger-grid">
            <section>
              <h3>未払い</h3>
              <div class="list">${summary.unpaid.length ? summary.unpaid.map((entry) => creditLedgerRow(state, entry, true)).join("") : "<p>未払いのツケはありません。</p>"}</div>
            </section>
            <section>
              <h3>支払い済み</h3>
              <div class="list">${summary.paid.length ? summary.paid.slice(-12).reverse().map((entry) => creditLedgerRow(state, entry, false)).join("") : "<p>支払い済みの記録はまだありません。</p>"}</div>
            </section>
            <section>
              <h3>踏み倒し・回収不能</h3>
              <div class="list">${summary.defaulted.length ? summary.defaulted.slice(-12).reverse().map((entry) => creditLedgerRow(state, entry, false)).join("") : "<p>回収不能の記録はありません。</p>"}</div>
            </section>
          </div>
        </section>
      </main>
    `);
    bindActions();
  }

  function creditLedgerRow(state, entry, withActions) {
    const remaining = Math.max(0, (entry.amount || 0) - (entry.paidAmount || 0));
    const dueText = entry.status === "paid"
      ? "支払い済み"
      : entry.status === "defaulted"
        ? (entry.defaultReason || "回収不能")
        : entry.dueDay <= state.day ? "期限切れ" : `期限: あと${entry.dueDay - state.day}日`;
    const actionValue = (action) => `${entry.id}|${action}`;
    const canAct = withActions && ["unpaid", "late"].includes(entry.status) && entry.dueDay <= state.day;
    return `
      <div class="list-item credit-row ${entry.status}">
        <span>
          <strong>${escapeHtml(entry.customerName)} / ${escapeHtml(entry.itemName)}</strong><br>
          ${remaining}G / ${escapeHtml(dueText)} / ${escapeHtml(creditStatusLabel(entry.status))}
        </span>
        ${canAct ? `<span class="credit-actions">
          ${button("やさしく催促", "creditAction", "mini-button", false, actionValue("remind"))}
          ${button("支払いを待つ", "creditAction", "mini-button", false, actionValue("wait"))}
          ${button("もう売らない", "creditAction", "mini-button danger", false, actionValue("block"))}
        </span>` : ""}
      </div>
    `;
  }

  function creditStatusLabel(status) {
    if (status === "paid") return "支払い済み";
    if (status === "late") return "遅れ";
    if (status === "defaulted") return "踏み倒し";
    return "未払い";
  }

  function shopLayout(state) {
    const slots = Array.from({ length: state.shop.shelves }, (_, index) => state.shop.shelfItems[index] || null);
    return `
      <div class="shop-layout" aria-label="\u5e97\u5185\u30ec\u30a4\u30a2\u30a6\u30c8">
        <div class="shop-counter"><span>\u8ca9\u58f2\u53f0</span></div>
        <div class="shop-shelves">
          ${slots.map((item, index) => `
            <div class="shop-shelf ${item ? "filled" : "empty"}">
              ${item ? sprite(itemSpriteType(item), Game.Items.itemLabel(item)) : sprite("empty-shelf", "\u7a7a\u304d\u68da")}
              <span class="shelf-label">\u68da${index + 1}<br>${item ? escapeHtml(item.name) : "\u7a7a\u304d"}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function shelfItem(item, index) {
    return `<div class="list-item"><span class="mini-item">${sprite(itemSpriteType(item), Game.Items.itemLabel(item))}<span><strong>${escapeHtml(item.name)}</strong><br>${escapeHtml(Game.Items.itemLabel(item))}</span></span><button type="button" data-action="removeShelf" data-value="${index}">\u623b\u3059</button></div>`;
  }

  function storageSaleItem(state, item, index) {
    return `<div class="list-item"><span><strong>${escapeHtml(item.name)}</strong><br>${escapeHtml(Game.Items.itemLabel(item))}<br><span class="tag">\u4e88\u60f3 ${Game.Shop.estimateSalePrice(state, item)}G</span></span><button type="button" data-action="addShelf" data-value="${index}" ${state.shop.shelfItems.length >= state.shop.shelves ? "disabled" : ""}>\u4e26\u3079\u308b</button></div>`;
  }

  function renderSaleMode() {
    const state = getState();
    setScreen("saleMode");
    const shelfCount = Game.Shop.saleCandidates(state).length;
    const disabled = state.today.nightSaleDone || state.flags.gameOver || shelfCount <= 0;
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <section class="panel">
          <h2>夜の販売方法</h2>
          <div class="toolbar">${button("棚を確認", "openShop", "primary")}${button("戻る", "backMain", "quiet")}</div>
          <div class="sale-mode-grid">
            <article class="choice-card">
              <h3>手動接客</h3>
              <p>客が棚から選んでレジに持ってきた品を、安値・普通・高値・ツケ払いで対応する。</p>
              <span class="tag">棚の商品 ${shelfCount}個</span>
              <div class="toolbar">${button("手動で売る", "startManualSale", "primary", disabled)}</div>
            </article>
            <article class="choice-card">
              <h3>おまかせ安売り</h3>
              <p>棚の商品をまとめて安く売る。売れやすいが、売上と評判の伸びは控えめ。</p>
              <span class="tag">価格 70%</span>
              <div class="toolbar">${button("自動で売る", "startAutoSale", "", disabled)}</div>
            </article>
          </div>
          ${shelfCount <= 0 ? `<div class="notice"><strong>棚が空です</strong><p>先に商品を棚へ並べてください。</p></div>` : ""}
        </section>
      </main>
    `);
    bindActions();
  }

  function renderManualSale() {
    const state = getState();
    const session = state.saleSession;
    const customer = Game.Shop.currentCustomer(state);
    if (!session || !session.active || !customer) {
      renderMain();
      return;
    }
    setScreen("manualSale");
    const candidates = Game.Shop.saleCandidates(state);
    const activeCandidate = Game.Shop.currentBroughtCandidate(state);
    const hasSelected = Boolean(activeCandidate);
    const finishedCurrent = session.waitingNext;
    const saleMode = session.rpgMode || "main";
    set(`
      <main class="screen rpg-sale-screen">
        <section class="rpg-sale-shell">
          ${rpgShopScreen(state, session, customer, candidates, activeCandidate, hasSelected, finishedCurrent, saleMode)}
        </section>
      </main>
    `);
    bindActions();
  }

  function rpgShopScreen(state, session, customer, candidates, activeCandidate, hasSelected, finishedCurrent, saleMode) {
    const heldItem = activeCandidate && activeCandidate.item;
    const sceneState = finishedCurrent ? (session.lastResult && session.lastResult.success ? "happy" : "leave") : session.customerStage === "noWantedItem" ? "leave" : "talk";
    return `
      <div class="rpg-shop-frame" role="application" aria-label="夜の販売">
        <div class="rpg-shop-scene">
          <div class="rpg-wall">
            <span class="wall-sign">迷宮商店街</span>
            <span class="wall-lamp"></span>
            <span class="wall-tools"></span>
          </div>
          <div class="rpg-floor"></div>
          <div class="rpg-shelf-line">
            ${Array.from({ length: state.shop.shelves }, (_, index) => rpgShelf(state, index, activeCandidate)).join("")}
          </div>
          <div class="rpg-counter-front"></div>
          <div class="rpg-keeper rpg-person">${sprite("villager-shopkeeper", "店主")}<span>店主</span></div>
          <div class="rpg-customer rpg-person rpg-customer-${escapeHtml(sceneState)}">${sprite(customerSpriteType(customer), customer.name)}<span>${escapeHtml(customer.name)}</span></div>
          ${heldItem ? `<div class="rpg-held-item">${sprite(itemSpriteType(heldItem), Game.Items.itemLabel(heldItem))}<span>${escapeHtml(heldItem.name)}</span></div>` : ""}
          <div class="rpg-sale-hud">
            <span>${session.index + 1}/${session.total}人目</span>
            <span>${state.hero.gold}G</span>
            <span>売上 ${session.revenue}G</span>
            ${(session.creditAmount || 0) > 0 ? `<span>ツケ ${session.creditAmount}G</span>` : ""}
          </div>
          ${rpgChoiceWindow(state, session, customer, activeCandidate, hasSelected, finishedCurrent)}
          ${activeCandidate && !finishedCurrent ? rpgBroughtItemWindow(state, customer, activeCandidate) : ""}
          ${rpgMessageWindow(state, session, customer, activeCandidate, finishedCurrent, saleMode)}
        </div>
        <div class="rpg-mobile-hint">数字キー / ↑↓ / Enter でも操作できます</div>
      </div>
    `;
  }

  function rpgShelf(state, index, activeCandidate) {
    const item = state.shop.shelfItems[index];
    const active = activeCandidate && activeCandidate.key === `shelf:${index}`;
    return `
      <div class="rpg-shelf ${active ? "selected" : ""} ${item ? "" : "empty"}">
        <span class="rpg-shelf-board">棚${index + 1}</span>
        <span class="rpg-shelf-item">${item ? sprite(itemSpriteType(item), Game.Items.itemLabel(item)) : ""}</span>
        <span class="rpg-shelf-name">${escapeHtml(item ? item.name : "空")}</span>
      </div>
    `;
  }

  function rpgChoiceWindow(state, session, customer, activeCandidate, hasSelected, finishedCurrent) {
    if (finishedCurrent) {
      return `
        <div class="rpg-window rpg-choice-window">
          ${buttonWithArrow("次へ", "nextCustomer", "rpg-menu-button")}
          ${buttonWithArrow("販売終了", "endManualSale", "rpg-menu-button")}
        </div>
      `;
    }
    if (!hasSelected || !activeCandidate) {
      return `
        <div class="rpg-window rpg-choice-window">
          ${buttonWithArrow("次へ", "nextCustomer", "rpg-menu-button")}
          ${buttonWithArrow("販売終了", "endManualSale", "rpg-menu-button")}
        </div>
      `;
    }
    const item = activeCandidate.item;
    const normalPrice = Game.Shop.priceForPolicy(state, item, "normal");
    const credit = Game.Shop.creditStatus(state, customer, item, normalPrice);
    return `
      <div class="rpg-window rpg-choice-window">
        ${rpgPriceButton(state, customer, item, "cheap", "安く売る")}
        ${rpgPriceButton(state, customer, item, "normal", "普通価格")}
        ${rpgPriceButton(state, customer, item, "expensive", "高く売る")}
        ${buttonWithArrow("ツケ払い", "sellOnCredit", "rpg-menu-button", null, !credit.ok, credit.reason)}
        ${buttonWithArrow("売らない", "denySale", "rpg-menu-button")}
      </div>
    `;
  }

  function rpgBroughtItemWindow(state, customer, candidate) {
    const item = candidate.item;
    const normalPrice = Game.Shop.priceForPolicy(state, item, "normal");
    const shortage = Math.max(0, normalPrice - customer.budget);
    return `
      <div class="rpg-window rpg-brought-window">
        <strong>レジの商品</strong>
        <div class="rpg-brought-card">
          <span>${sprite(itemSpriteType(item), Game.Items.itemLabel(item))}</span>
          <span><b>${escapeHtml(item.name)}</b><em>通常 ${normalPrice}G / 所持金 ${customer.budget}G${shortage ? ` / 不足 ${shortage}G` : ""}</em></span>
        </div>
      </div>
    `;
  }

  function rpgItemWindow(candidates) {
    return `
      <div class="rpg-window rpg-item-window">
        <strong>売る商品</strong>
        <div class="rpg-list">
          ${candidates.length ? candidates.map((candidate) => {
            const item = candidate.item;
            return `<div class="rpg-menu-button rpg-item-button"><span>${escapeHtml(item.name)}</span><em>${item.price || 0}G</em></div>`;
          }).join("") : `<p>棚に商品がありません。</p>`}
        </div>
      </div>
    `;
  }

  function rpgPriceWindow(state, customer, candidate, hasSelected) {
    if (!hasSelected || !candidate) return "";
    const item = candidate.item;
    return `
      <div class="rpg-window rpg-price-window">
        <strong>${escapeHtml(item.name)}</strong>
        <div class="rpg-list">
          ${rpgPriceButton(state, customer, item, "cheap", "安く売る")}
          ${rpgPriceButton(state, customer, item, "normal", "普通価格")}
          ${rpgPriceButton(state, customer, item, "expensive", "高く売る")}
        </div>
      </div>
    `;
  }

  function rpgPriceButton(state, customer, item, policyId, label) {
    const price = Game.Shop.priceForPolicy(state, item, policyId);
    const chance = Game.Shop.saleSuccessChance(state, customer, item, policyId);
    return `<button type="button" class="rpg-menu-button rpg-price-button" data-action="sellToCustomer" data-value="${policyId}"><span>▶ ${escapeHtml(label)}</span><em>${price}G / ${chance}%</em></button>`;
  }

  function rpgMessageWindow(state, session, customer, candidate, finishedCurrent, saleMode) {
    const item = candidate && candidate.item;
    const result = session.lastResult;
    let lead = `＊ ${customer.name}`;
    let line = item ? customerAskLine(customer, item) : `${customer.name}は棚を見回している。`;
    let sub = item ? `${item.name}をレジへ持ってきた。` : "欲しい品が棚になければ、客は何も買わずに帰ります。";
    if (item && !finishedCurrent) {
      const normalPrice = Game.Shop.priceForPolicy(state, item, "normal");
      const shortage = Math.max(0, normalPrice - customer.budget);
      line = shortage
        ? `ごめん、今は${customer.budget}Gしかないんだ。残りは今度でもいい？`
        : `${item.name}が欲しいようだ。いくらで売りますか？`;
      sub = `${session.currentBroughtReason || "棚から選んだ"} / 通常 ${normalPrice}G / 所持金 ${customer.budget}G${shortage ? ` / 不足 ${shortage}G` : ""}`;
    }
    if (result) {
      lead = result.noWanted ? "＊ 探しものなし" : result.credit ? "＊ ツケ帳に記録" : result.denied ? "＊ 見送り" : result.success ? "＊ まいどあり！" : "＊ うまくいかなかった";
      line = result.reaction || result.message;
      if (result.noWanted) sub = `${result.wantedText || customer.wantsText}を探していた。次の客へ進めよう。`;
      else if (result.credit) sub = `${result.policyLabel} ${result.price}G / 支払い予定 ${result.dueDay}日目`;
      else if (result.denied) sub = "商品は棚に戻った。";
      else sub = `判定 ${result.chance}% / ${result.policyLabel} ${result.price}G`;
    }
    return `
      <div class="rpg-window rpg-message-window">
        <strong>${escapeHtml(lead)}</strong>
        <p>${escapeHtml(line)}</p>
        <span>${escapeHtml(sub)}</span>
      </div>
    `;
  }

  function buttonWithArrow(label, action, className, value, disabled, title) {
    const valueAttr = value !== undefined && value !== null ? ` data-value="${escapeHtml(value)}"` : "";
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
    return `<button type="button" class="${className}" data-action="${action}"${valueAttr}${titleAttr} ${disabled ? "disabled" : ""}><span>▶ ${escapeHtml(label)}</span>${title ? `<em>${escapeHtml(title)}</em>` : ""}</button>`;
  }

  function saleProgressActions(session) {
    const nextLabel = session.index + 1 >= session.total ? "\u8ca9\u58f2\u3092\u7d42\u3048\u308b" : "\u6b21\u306e\u5ba2\u3078";
    return `
      <div class="sale-progress-actions">
        ${button(nextLabel, "nextCustomer", "primary")}
        ${button("\u8ca9\u58f2\u7d42\u4e86", "endManualSale", "quiet")}
      </div>
    `;
  }

  function shopDialogueBox(state, session, customer, candidate, hasSelected, finishedCurrent) {
    const item = candidate && candidate.item;
    const result = session.lastResult;
    const lead = result ? (result.success ? "＊ 売れた！" : "＊ 見送られた") : `＊ ${customer.name}`;
    const speech = result ? (result.reaction || result.message) : customerAskLine(customer, item);
    const subLine = result
      ? `判定 ${result.chance}% / ${result.policyLabel} ${result.price}G`
      : item ? `${item.name}をレジへ持ってきた。価格を決めよう。` : "売れる商品が棚にない。";
    return `
      <div class="shop-dialogue">
        <div class="dialogue-text">
          <strong>${escapeHtml(lead)}</strong>
          <p>${escapeHtml(speech)}</p>
          <span>${escapeHtml(subLine)}</span>
        </div>
        <div class="dialogue-side">
          ${finishedCurrent ? `<div class="auto-next-note">次のお客へ移動中...</div>${saleProgressActions(session)}` : saleChoiceButtons(state, customer, candidate, hasSelected)}
        </div>
        <ul class="dialogue-log">${(session.resultLogs || []).slice(-3).reverse().map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
    `;
  }

  function saleChoiceButtons(state, customer, candidate, hasSelected) {
    if (!hasSelected || !candidate) return `<div class="auto-next-note">棚に売れる商品がありません。</div>`;
    return `
      <div class="shop-choice-grid">
        ${saleChoiceButton(state, customer, candidate, "cheap", "安く売る", "primary")}
        ${saleChoiceButton(state, customer, candidate, "normal", "普通価格", "")}
        ${saleChoiceButton(state, customer, candidate, "expensive", "高く売る", "danger")}
      </div>
      <div class="shop-sub-actions">
        ${button("見送る", "nextCustomer", "quiet")}
        ${button("販売終了", "endManualSale", "quiet")}
      </div>
    `;
  }

  function saleChoiceButton(state, customer, candidate, policyId, label, className) {
    const item = candidate.item;
    const price = Game.Shop.priceForPolicy(state, item, policyId);
    const chance = Game.Shop.saleSuccessChance(state, customer, item, policyId);
    return `
      <button type="button" class="shop-choice ${className}" data-action="sellToCustomer" data-value="${policyId}">
        <strong>${escapeHtml(label)}</strong>
        <span>${price}G / ${chance}%</span>
      </button>
    `;
  }

  function customerAskLine(customer, item) {
    if (!item) return `${customer.name}は棚を見回している。`;
    const lines = {
      villager: [
        `${item.name}があると家で安心できそうだね。いくらかな。`,
        `これなら家族にも喜ばれそうだ。値段を聞かせて。`,
        `今日はこれを買って帰ろうかな。`
      ],
      adventurer: [
        `${item.name}か。次の探索で役に立ちそうだ。`,
        `これを持っていけば、迷宮でも少し粘れそうだな。`,
        `急ぎの支度中なんだ。いい値段なら買うよ。`
      ],
      traveler: [
        `${item.name}は旅の土産に良さそうだ。`,
        `この町で見つけた記念に、ひとつ欲しいね。`,
        `なかなか雰囲気のある品だ。値を聞こう。`
      ],
      merchant: [
        `${item.name}、目を引く品だね。仕入れ目線で見ても面白い。`,
        `隣町でも話題になりそうだ。条件次第で買おう。`,
        `ふむ、棚の置き方も悪くない。これを見せてもらうよ。`
      ],
      child: [
        `${item.name}、おこづかいで買えるかな。`,
        `これ、持って帰ったらみんなに見せたいな。`,
        `少しだけ安くしてくれたらうれしいな。`
      ],
      soldier: [
        `${item.name}があれば今夜の見回りに使えそうだ。`,
        `町を守る備えとして、これは悪くない。`,
        `任務前だ。役に立つなら買っていく。`
      ]
    };
    const pool = lines[customer.typeId] || [`${item.name}を買うか迷っている。`];
    return stablePick(pool, `${customer.id}:${item.uid || item.id}:${customer.personality}`);
  }

  function stablePick(list, seed) {
    let hash = 0;
    String(seed).split("").forEach((char) => {
      hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    });
    return list[hash % list.length];
  }

  function customerSpriteType(customer) {
    if (!customer) return "villager";
    if (customer.typeId === "soldier") return "villager-guard";
    if (customer.typeId === "traveler" || customer.typeId === "merchant") return "villager-traveler";
    return "villager";
  }

  function saleStageInfo(session, customer, selectedCandidate, recommended) {
    if (session.waitingNext && session.lastResult && session.lastResult.success) {
      return { title: "会計", text: `${customer.name}はレジ台で代金を支払い、店を出ようとしている。` };
    }
    if (session.waitingNext && session.lastResult) {
      return { title: "退店", text: `${customer.name}は商品を棚へ戻し、店を出ようとしている。` };
    }
    if (selectedCandidate) {
      return { title: "レジへ", text: `${customer.name}が${selectedCandidate.item.name}を手に取り、レジ台へ持ってきた。価格を決めよう。` };
    }
    if (recommended) {
      return { title: "棚を見る", text: `${customer.name}は${recommended.item.name}の棚で足を止めた。` };
    }
    return { title: "来店", text: `${customer.name}が入口から入ってきた。` };
  }

  function storeInterior(state, session, customer, selectedCandidate, recommended) {
    const stage = session.waitingNext ? (session.lastResult && session.lastResult.success ? "checkout" : "leave") : selectedCandidate ? "bring" : "enter";
    const heldItem = selectedCandidate && selectedCandidate.item;
    return `
      <div class="store-map shop-floor stage-${escapeHtml(stage)}">
        <div class="shop-back-wall">
          <span>迷宮商店街の道具屋</span>
        </div>
        <div class="shop-entrance">
          <span class="store-symbol">\u5165</span>
          <strong>入口</strong>
        </div>
        <div class="store-shelves">
          ${Array.from({ length: state.shop.shelves }, (_, index) => storeShelfTile(state, session, index, selectedCandidate, recommended)).join("")}
        </div>
        <div class="register-area ${session.lastResult && session.lastResult.success ? "result-success" : session.lastResult ? "result-fail" : ""}">
          <div class="shopkeeper-spot">
            ${sprite("villager-shopkeeper", "店主")}
            <strong>店主</strong>
          </div>
          <div class="register-counter">
            <span class="register-sign">レジ台</span>
            <span class="register-box">会計</span>
            <span class="counter-top"></span>
          </div>
        </div>
        ${sceneCustomer(customer, heldItem, stage)}
      </div>
    `;
  }

  function storeShelfTile(state, session, index, selectedCandidate, recommended) {
    const item = state.shop.shelfItems[index];
    const key = `shelf:${index}`;
    const selected = selectedCandidate && selectedCandidate.key === key;
    const watching = recommended && recommended.key === key;
    const failed = item && session.lastResult && !session.lastResult.success && session.lastResult.itemUid === item.uid;
    const label = item ? item.name : "\u7a7a";
    return `
      <div class="store-shelf-tile ${item ? "" : "empty"} ${selected ? "selected" : ""} ${watching ? "watching" : ""} ${failed ? "result-fail" : ""}">
        <span class="store-shelf-head">\u68da${index + 1}</span>
        <span class="shelf-planks"></span>
        <span class="store-shelf-icon">${item ? sprite(itemSpriteType(item), Game.Items.itemLabel(item)) : sprite("empty-shelf", "\u7a7a\u306e\u68da")}</span>
        <strong>${escapeHtml(label)}</strong>
        ${selected ? `<span class="customer-mini">選択中</span>` : watching ? `<span class="customer-mini">注目</span>` : ""}
      </div>
    `;
  }

  function sceneCustomer(customer, item, stage) {
    return `
      <div class="scene-customer customer-${escapeHtml(stage)}">
        ${sprite(customerSpriteType(customer), customer.name)}
        <strong>${escapeHtml(customer.name)}</strong>
        ${item ? `<span class="held-item">${sprite(itemSpriteType(item), Game.Items.itemLabel(item))}<em>${escapeHtml(item.name)}</em></span>` : ""}
      </div>
    `;
  }

  function saleCandidateCard(state, customer, candidate, selected, recommended, session) {
    const item = candidate.item;
    const isSelected = selected === candidate.key;
    const isRecommended = recommended && recommended.key === candidate.key;
    const resultClass = session.lastResult && session.lastResult.itemUid === item.uid
      ? (session.lastResult.success ? "result-success" : "result-fail")
      : "";
    const normalPrice = Game.Shop.priceForPolicy(state, item, "normal");
    const cheapPrice = Game.Shop.priceForPolicy(state, item, "cheap");
    const highPrice = Game.Shop.priceForPolicy(state, item, "expensive");
    const chance = Game.Shop.saleSuccessChance(state, customer, item, "normal");
    const source = candidate.source === "shelf" ? "\u68da" : "\u5009\u5eab";
    return `
      <div class="sale-card ${isSelected ? "selected" : ""} ${isRecommended ? "watching" : ""} ${resultClass}">
        <span class="sale-card-art">${sprite(itemSpriteType(item), Game.Items.itemLabel(item))}</span>
        <span class="sale-card-body">
          <strong>${escapeHtml(item.name)}</strong>
          <span>${escapeHtml(source)} / \u4eba\u6c17 ${item.popularity || 40}</span>
          <span>\u666e\u901a ${normalPrice}G / \u6210\u529f\u7387 ${chance}%</span>
          <span>\u5b89 ${cheapPrice}G  \u9ad8 ${highPrice}G</span>
          ${isRecommended ? `<span class="tag">\u304a\u3059\u3059\u3081</span>` : ""}
        </span>
      </div>
    `;
  }

  function saleResult(result) {
    if (!result) return "";
    return `
      <div class="sale-result ${result.success ? "success" : "fail"}">
        <div class="sold-item-card ${result.success ? "result-success" : "result-fail"}">
          <strong>${escapeHtml(result.itemName)}</strong>
          <span>${escapeHtml(result.policyLabel)} / ${result.price}G</span>
        </div>
        <div>
          <strong>${result.success ? "\u6210\u529f" : "\u5931\u6557"}</strong>
          <p>${escapeHtml(result.reaction || result.message)}</p>
          <span class="tag">\u5224\u5b9a ${result.chance}%</span>
        </div>
      </div>
    `;
  }

  function renderTown() {
    const state = getState();
    setScreen("town");
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <section class="panel">
          <h2>\u753a\u3068\u5efa\u7269\u3092\u5f37\u5316\u3059\u308b</h2>
          <div class="toolbar">${button("\u753a\u30de\u30c3\u30d7", "openTownMap", "primary")}${button("\u304a\u9858\u3044\u4e00\u89a7", "openQuests", "")}${button("\u623b\u308b", "backMain", "quiet")}</div>
          <div class="list" style="margin-top:12px">
            ${Game.Town.UPGRADE_OPTIONS.map((option) => {
              const cost = option.getCost(state);
              const disabled = cost === null || state.hero.gold < cost;
              return `<div class="list-item"><span><strong>${escapeHtml(option.name)}</strong><br>${escapeHtml(option.description)}<br><span class="tag">${cost === null ? "\u6700\u5927" : `${cost}G`}</span></span><button type="button" data-action="buyUpgrade" data-value="${option.id}" ${disabled ? "disabled" : ""}>\u5b9f\u884c</button></div>`;
            }).join("")}
          </div>
        </section>
      </main>
    `);
    bindActions();
  }

  function renderWarehouse() {
    const state = getState();
    setScreen("warehouse");
    const summary = Object.entries(Game.Shop.storageSummary(state));
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <section class="panel">
          <h2>\u5009\u5eab</h2>
          <div class="toolbar">${button("\u753a\u30de\u30c3\u30d7", "openTownMap", "primary")}${button("\u304a\u9858\u3044\u4e00\u89a7", "openQuests", "")}${button("\u623b\u308b", "backMain", "quiet")}</div>
          <div class="list" style="margin-top:12px">${summary.length ? summary.map(([label, count]) => `<div class="list-item"><span>${escapeHtml(label)}</span><strong>${count}\u500b</strong></div>`).join("") : "<p>\u5009\u5eab\u306f\u7a7a\u3067\u3059\u3002</p>"}</div>
        </section>
      </main>
    `);
    bindActions();
  }

  function renderHospital() {
    const state = getState();
    setScreen("hospital");
    const injured = (state.villagers || []).filter((villager) => villager.status === "injured");
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <section class="panel">
          <div class="panel-headline">
            <h2>病院</h2>
            <span class="tag">負傷者 ${injured.length}人</span>
          </div>
          <div class="toolbar">
            ${button("村人一覧", "openVillagers", "primary")}
            ${button("倉庫で薬を確認", "openWarehouse", "")}
            ${button("町へ戻る", "backMain", "quiet")}
          </div>
          <div class="notice">
            <strong>仮設の診療所</strong>
            <p>今回は町マップから入れる入口として追加しています。薬草や傷薬が売れると、既存の村人回復処理で負傷者が回復しやすくなります。</p>
          </div>
          <div class="list" style="margin-top:12px">
            ${injured.length ? injured.map((villager) => `<div class="list-item"><span><strong>${escapeHtml(villager.name)}</strong><br>${escapeHtml(villager.job)} / 負傷中</span></div>`).join("") : "<p>今は負傷している村人はいません。</p>"}
          </div>
        </section>
      </main>
    `);
    bindActions();
  }

  function renderVillagers() {
    const state = getState();
    setScreen("villagers");
    const villagers = state.villagers || [];
    const counts = Game.Villagers.statusCounts(state);
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <section class="panel">
          <h2>\u6751\u4eba\u4e00\u89a7</h2>
          <div class="toolbar">${button("\u753a\u30de\u30c3\u30d7", "openTownMap", "primary")}${button("\u304a\u9858\u3044\u4e00\u89a7", "openQuests", "")}${button("\u623b\u308b", "backMain", "quiet")}</div>
          <div class="building-list" style="margin-top:10px">
            <span class="tag">\u5143\u6c17 ${counts.healthy || 0}</span>
            <span class="tag">\u8ca0\u50b7 ${counts.injured || 0}</span>
            <span class="tag">\u4e0d\u6e80 ${counts.unhappy || 0}</span>
            <span class="tag">\u6b7b\u4ea1 ${counts.dead || 0}</span>
          </div>
          <div class="villager-grid">
            ${villagers.map((villager) => villagerCard(villager)).join("")}
          </div>
        </section>
      </main>
    `);
    bindActions();
  }

  function villagerCard(villager) {
    const status = Game.Villagers.statusLabel(villager.status);
    const waiting = villager.status === "dead" ? "\u8a18\u9332" : villager.daysWithoutFavorite > 0 ? `\u597d\u307f\u306e\u54c1\u5f85\u3061 ${villager.daysWithoutFavorite}\u65e5` : "\u6e80\u8db3";
    return `
      <article class="villager-card status-${escapeHtml(villager.status)}">
        <div class="villager-face">${sprite(villager.css || "villager", villager.name)}</div>
        <div>
          <h3>${escapeHtml(villager.name)}</h3>
          <p>${escapeHtml(villager.job)} / ${escapeHtml(status)}</p>
          <p><strong>\u597d\u307f</strong>: ${escapeHtml(Game.Villagers.likesText(villager))}</p>
          <span class="tag">${escapeHtml(waiting)}</span>
        </div>
      </article>
    `;
  }

  function renderQuests() {
    const state = getState();
    setScreen("quests");
    const quests = Game.Objectives ? Game.Objectives.questList(state) : [];
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <section class="panel">
          <h2>村人のお願い</h2>
          <div class="toolbar">${button("町マップ", "openTownMap", "primary")}${button("村人一覧", "openVillagers", "")}${button("戻る", "backMain", "quiet")}</div>
          <div class="notice"><strong>受注方法</strong><p>お願いは町マップで村人に話しかけると受けられます。広場や道で村人の前に立ち、決定を押してください。</p></div>
          <div class="quest-grid">
            ${quests.map((quest) => questCard(quest)).join("") || "<p>お願いはまだありません。</p>"}
          </div>
        </section>
      </main>
    `);
    bindActions();
  }

  function questCard(quest) {
    const percent = Game.State.clamp((quest.progress / quest.target) * 100, 0, 100);
    return `
      <article class="quest-card status-${escapeHtml(quest.status)}">
        <h3>${escapeHtml(quest.villagerName)}のお願い</h3>
        <p><strong>${escapeHtml(quest.title)}</strong></p>
        <div class="meter"><span style="width:${percent}%"></span></div>
        <span class="tag">${escapeHtml(Game.Objectives.statusLabel(quest.status))}</span>
        <span class="tag">${escapeHtml(quest.progressText)}</span>
        <span class="tag">報酬 ${escapeHtml(quest.rewardText)}</span>
      </article>
    `;
  }

  function renderEquipment() {
    const state = getState();
    const run = getDungeonRun();
    const inDungeon = run && run.active;
    setScreen("equipment");
    const equipments = state.shop.storage.map((item, index) => ({ item, index })).filter(({ item }) => item.kind === "equipment");
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <div class="split">
          <section class="panel">
            <h2>\u88c5\u5099</h2>
            <div class="toolbar">
              ${button("\u935b\u51b6\u5c4b", "openBlacksmith", "primary", inDungeon)}
              ${button("\u888b", inDungeon ? "openDungeonBag" : "openBag", "")}
              ${inDungeon ? "" : button("\u753a\u30de\u30c3\u30d7", "openTownMap", "")}
              ${button(inDungeon ? "\u8ff7\u5bae\u3078\u623b\u308b" : "\u623b\u308b", inDungeon ? "backDungeon" : "backMain", "quiet")}
            </div>
            <div class="notice"><strong>\u888b</strong><p>\u888b\u3092\u88c5\u5099\u3059\u308b\u3068\u8ff7\u5bae\u3067\u6301\u3066\u308b\u9053\u5177\u304c\u5897\u3048\u307e\u3059\u3002\u73fe\u5728\u306e\u6301\u3061\u7269\u4e0a\u9650\u306f${Game.Items.getCarryLimit(state)}\u500b\u3067\u3059\u3002</p></div>
            ${equipmentSlot(state, "weapon", "\u6b66\u5668", state.hero.equipment.weapon)}
            ${equipmentSlot(state, "armor", "\u9632\u5177", state.hero.equipment.armor)}
            ${equipmentSlot(state, "accessory", "\u88c5\u98fe", state.hero.equipment.accessory)}
            ${equipmentSlot(state, "bag", "\u888b", state.hero.equipment.bag)}
          </section>
          <section class="panel">
            <h2>\u5009\u5eab\u306e\u88c5\u5099\u54c1</h2>
            <div class="list">${equipments.length ? equipments.map(({ item, index }) => `<div class="list-item"><span>${escapeHtml(Game.Items.equipmentLabel(item))}</span><button type="button" data-action="equipItem" data-value="${index}">\u88c5\u5099</button></div>`).join("") : "<p>\u88c5\u5099\u54c1\u306f\u3042\u308a\u307e\u305b\u3093\u3002</p>"}</div>
          </section>
        </div>
      </main>
    `);
    bindActions();
  }

  function equipmentSlot(state, slot, label, item) {
    const status = Game.Town.getStrengthenStatus(state, item);
    return `<div class="list-item" style="margin-top:10px"><span><strong>${escapeHtml(label)}</strong><br>${escapeHtml(Game.Items.equipmentLabel(item))}<br><span class="tag">${escapeHtml(status.reason)}</span></span><button type="button" data-action="strengthenEquipment" data-value="${slot}" ${status.ok ? "" : "disabled"}>\u5f37\u5316</button></div>`;
  }

  function renderBlacksmith() {
    const state = getState();
    setScreen("blacksmith");
    if (state.buildings.blacksmithLevel <= 0) {
      set(`
        <main class="screen">
          ${headerPanel(state)}
          <section class="panel">
            <h2>\u935b\u51b6\u5c4b</h2>
            <div class="notice">
              <strong>\u672a\u958b\u5e97</strong>
              <p>町に投資すると、翌朝に鍛冶職人ゴドが訪れます。開店後は武器の強化と進化ができます。</p>
            </div>
            <div class="toolbar">${button("\u753a\u3068\u5efa\u7269\u306b\u6295\u8cc7", "openTown", "primary")}${button("\u623b\u308b", "backMain", "quiet")}</div>
          </section>
        </main>
      `);
      bindActions();
      return;
    }
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <section class="panel">
          <h2>鍛冶屋</h2>
          <div class="toolbar">${button("町マップ", "openTownMap", "primary")}${button("装備", "openEquipment", "")}${button("戻る", "backMain", "quiet")}</div>
          <div class="notice">
            <strong>できること</strong>
            <p>ここでは武器の強化と進化だけを行います。強化は装備中の武器に素材1個とゴールドを使います。進化は熟練度が満タンになった武器から選べます。</p>
          </div>
          <h3>武器の強化</h3>
          ${blacksmithEquipmentSlot(state, "weapon", "装備中の武器", state.hero.equipment.weapon)}
          ${blacksmithWeaponEvolutionPanel(state)}
        </section>
      </main>
    `);
    bindActions();
    return;

    const counts = Game.Town.countMaterials(state);
    set(`
      <main class="screen">
        ${headerPanel(state)}
        <div class="split">
          <section class="panel">
            <h2>\u935b\u51b6\u5c4b Lv${state.buildings.blacksmithLevel}</h2>
            <div class="toolbar">${button("\u753a\u30de\u30c3\u30d7", "openTownMap", "primary")}${button("\u88c5\u5099\u753b\u9762", "openEquipment", "")}${button("\u623b\u308b", "backMain", "quiet")}</div>
            <div class="notice">
              <strong>\u5f37\u5316\u306e\u3084\u308a\u65b9</strong>
              <p>1. \u88c5\u5099\u753b\u9762\u3067\u6b66\u5668\u30fb\u9632\u5177\u30fb\u88c5\u98fe\u30fb\u888b\u3092\u88c5\u5099\u3059\u308b\u30022. \u935b\u51b6\u5c4b\u3067\u300c\u5f37\u5316\u300d\u3092\u62bc\u3059\u30023. \u6240\u6301\u91d1\u3068\u5009\u5eab\u306e\u7d20\u67501\u500b\u3092\u4f7f\u3063\u3066+5\u307e\u3067\u5f37\u5316\u3067\u304d\u307e\u3059\u3002</p>
            </div>
            <h3>\u88c5\u5099\u5f37\u5316</h3>
            ${blacksmithEquipmentSlot(state, "weapon", "\u6b66\u5668", state.hero.equipment.weapon)}
            ${blacksmithEquipmentSlot(state, "armor", "\u9632\u5177", state.hero.equipment.armor)}
            ${blacksmithEquipmentSlot(state, "accessory", "\u88c5\u98fe", state.hero.equipment.accessory)}
            ${blacksmithEquipmentSlot(state, "bag", "\u888b", state.hero.equipment.bag)}
            <h3>\u7d20\u6750</h3>
            <div class="building-list">${Game.Items.MATERIAL_CATALOG.map((material) => `<span class="tag">${escapeHtml(material.name)} x${counts[material.id] || 0}</span>`).join("")}</div>
            ${weaponEvolutionPanel(state)}
            ${weaponSynthesisPanel(state)}
          </section>
          <section class="panel">
            <h2>\u88c5\u5099\u4f5c\u6210</h2>
            <div class="list">
              ${Game.Town.BLACKSMITH_RECIPES.map((recipe) => recipeItem(state, recipe)).join("")}
            </div>
            ${weaponListPanel(state)}
            ${weaponEffectsPanel()}
          </section>
        </div>
      </main>
    `);
    bindActions();
  }

  function blacksmithEquipmentSlot(state, slot, label, item) {
    const status = Game.Town.getStrengthenStatus(state, item);
    const costText = status.cost === null ? "\u5fc5\u8981: \u306a\u3057" : `\u5fc5\u8981: ${status.cost}G + \u7d20\u67501\u500b`;
    return `
      <div class="list-item upgrade-slot" style="margin-top:10px">
        <span>
          <strong>${escapeHtml(label)}</strong><br>
          ${escapeHtml(Game.Items.equipmentLabel(item))}<br>
          <span class="tag">${escapeHtml(costText)}</span>
          <span class="tag">${escapeHtml(status.reason)}</span>
        </span>
        <button type="button" data-action="strengthenEquipment" data-value="${slot}" ${status.ok ? "" : "disabled"}>\u5f37\u5316</button>
      </div>
    `;
  }

  function recipeItem(state, recipe) {
    const status = Game.Town.recipeStatus(state, recipe);
    return `<div class="list-item"><span><strong>${escapeHtml(recipe.name)}</strong><br>${escapeHtml(materialsText(recipe.materials))}<br><span class="tag">${recipe.cost}G</span><span class="tag">${escapeHtml(status.reason)}</span></span><button type="button" data-action="craftEquipment" data-value="${recipe.id}" ${status.ok ? "" : "disabled"}>\u4f5c\u308b</button></div>`;
  }

  function blacksmithWeaponEvolutionPanel(state) {
    if (!Game.Town.canUseWeaponEvolution(state)) {
      return `
        <h3>武器の進化</h3>
        <div class="notice"><strong>未開店</strong><p>町へ1回投資すると、鍛冶屋で武器進化が使えるようになります。</p></div>
      `;
    }
    const weapons = Game.Weapons.allWeapons(state);
    return `
      <h3>武器の進化</h3>
      <div class="list">
        ${weapons.length ? weapons.map((entry) => blacksmithWeaponEvolutionItem(state, entry)).join("") : "<p>進化できる武器がありません。</p>"}
      </div>
    `;
  }

  function blacksmithWeaponEvolutionItem(state, entry) {
    const options = Game.Weapons.evolutionOptions(state, entry.item);
    const mastery = entry.item.mastery || { xp: 0, max: 100, ready: false };
    const percent = Game.State.clamp((mastery.xp / Math.max(1, mastery.max)) * 100, 0, 100);
    const effects = (entry.item.weaponEffects || []).map(Game.Weapons.effectLabel).join(" / ") || "特殊効果なし";
    return `
      <div class="weapon-card">
        <strong>${escapeHtml(entry.item.name)} <span class="tag">${escapeHtml(entry.source)}</span></strong>
        <div class="meter"><span style="width:${percent}%"></span></div>
        <p>熟練度 ${mastery.xp}/${mastery.max} / 攻撃 ${entry.item.attack || 0} / 防御 ${entry.item.defense || 0}</p>
        <p>${escapeHtml(effects)}</p>
        <div class="toolbar">
          ${options.length ? options.map((option) => button(`${option.name} (${option.style})`, "evolveWeapon", option.canEvolve ? "primary" : "", !option.canEvolve, `${entry.key}|${option.id}`)).join("") : `<span class="tag">進化先なし</span>`}
        </div>
        ${options.length ? `<p>${options.map((option) => `${option.name}: ${option.cost}G / ${Game.Weapons.materialText(option.materials)} / ${option.reason}`).map(escapeHtml).join("<br>")}</p>` : ""}
      </div>
    `;
  }

  function weaponEvolutionPanel(state) {
    if (!Game.Town.canUseWeaponEvolution(state)) {
      return `
        <h3>武器進化</h3>
        <div class="notice"><strong>未解放</strong><p>鍛冶屋Lv2と武器屋Lv1で使えるようになります。</p></div>
      `;
    }
    const weapons = Game.Weapons.allWeapons(state);
    return `
      <h3>武器進化</h3>
      <div class="list">
        ${weapons.length ? weapons.map((entry) => weaponEvolutionItem(state, entry)).join("") : "<p>進化できる武器がありません。</p>"}
      </div>
    `;
  }

  function weaponEvolutionItem(state, entry) {
    const options = Game.Weapons.evolutionOptions(state, entry.item);
    const mastery = entry.item.mastery || { xp: 0, max: 100, ready: false };
    return `
      <div class="weapon-card">
        <strong>${escapeHtml(entry.item.name)} <span class="tag">${escapeHtml(entry.source)}</span></strong>
        <div class="meter"><span style="width:${Game.State.clamp((mastery.xp / mastery.max) * 100, 0, 100)}%"></span></div>
        <p>熟練度 ${mastery.xp}/${mastery.max} / 攻${entry.item.attack} 防${entry.item.defense}</p>
        <p>${escapeHtml((entry.item.weaponEffects || []).map(Game.Weapons.effectLabel).join(" / ") || "特殊効果なし")}</p>
        <div class="toolbar">
          ${options.length ? options.map((option) => button(`${option.name} (${option.style})`, "evolveWeapon", option.canEvolve ? "primary" : "", !option.canEvolve, `${entry.key}|${option.id}`)).join("") : `<span class="tag">進化先なし</span>`}
        </div>
        ${options.length ? `<p>${options.map((option) => `${option.name}: ${option.cost}G / ${Game.Weapons.materialText(option.materials)} / ${option.reason}`).map(escapeHtml).join("<br>")}</p>` : ""}
      </div>
    `;
  }

  function weaponSynthesisPanel(state) {
    if (!Game.Town.canUseWeaponSynthesis(state)) {
      return `
        <h3>武器合成</h3>
        <div class="notice"><strong>未解放</strong><p>鍛冶屋Lv3と武器屋Lv2で使えるようになります。</p></div>
      `;
    }
    state.blacksmith = Object.assign({ synthesisBase: null, synthesisMaterial: null }, state.blacksmith || {});
    const base = Game.Weapons.findWeaponByKey(state, state.blacksmith.synthesisBase);
    const material = Game.Weapons.findWeaponByKey(state, state.blacksmith.synthesisMaterial);
    const cost = base && material ? Game.Weapons.synthesisCost(base.item, material.item) : null;
    return `
      <h3>武器合成</h3>
      <div class="notice">
        <strong>選択中</strong>
        <p>ベース: ${escapeHtml(base ? base.item.name : "未選択")} / 素材: ${escapeHtml(material ? material.item.name : "未選択")}${cost ? ` / 費用 ${cost}G + 素材1個` : ""}</p>
        <div class="toolbar">
          ${button("合成する", "synthesizeWeapons", "primary", !base || !material)}
          ${button("上書き合成", "synthesizeWeaponsOverwrite", "danger", !base || !material)}
        </div>
      </div>
      <div class="weapon-select-grid">
        <div>
          <h4>ベース武器</h4>
          ${Game.Weapons.allWeapons(state).map((entry) => weaponSelectButton(entry, "selectSynthesisBase", state.blacksmith.synthesisBase === entry.key)).join("") || "<p>武器なし</p>"}
        </div>
        <div>
          <h4>素材武器</h4>
          ${Game.Weapons.storageWeapons(state).map((entry) => weaponSelectButton(entry, "selectSynthesisMaterial", state.blacksmith.synthesisMaterial === entry.key)).join("") || "<p>倉庫に素材武器がありません。</p>"}
        </div>
      </div>
    `;
  }

  function weaponSelectButton(entry, action, selected) {
    return `<button type="button" class="mini-button weapon-select ${selected ? "selected" : ""}" data-action="${action}" data-value="${escapeHtml(entry.key)}">${escapeHtml(entry.item.name)} / ${escapeHtml((entry.item.weaponEffects || []).map(Game.Weapons.effectLabel).join(" / ") || "効果なし")}</button>`;
  }

  function weaponListPanel(state) {
    const weapons = Game.Weapons.allWeapons(state);
    return `
      <h3>武器一覧</h3>
      <div class="list">
        ${weapons.length ? weapons.map((entry) => `<div class="list-item"><span><strong>${escapeHtml(entry.item.name)}</strong><br>${escapeHtml(Game.Weapons.weaponDetails(entry.item))}<br><span class="tag">${escapeHtml(entry.source)}</span></span></div>`).join("") : "<p>武器がありません。</p>"}
      </div>
    `;
  }

  function weaponEffectsPanel() {
    const effects = Object.values(Game.Weapons.EFFECT_DEFS);
    return `
      <h3>特殊効果一覧</h3>
      <div class="building-list">
        ${effects.map((effect) => `<span class="tag">${escapeHtml(effect.category)}: ${escapeHtml(effect.label)}</span>`).join("")}
      </div>
    `;
  }

  function materialsText(materials) {
    return Object.entries(materials).map(([id, amount]) => {
      const material = Game.Items.MATERIAL_CATALOG.find((item) => item.id === id);
      return `${material ? material.name : id} x${amount}`;
    }).join(" / ");
  }

  function renderHelp() {
    setScreen("help");
    set(`
      <main class="screen">
        ${helpBox()}
        <section class="panel">
          <h2>\u64cd\u4f5c\u65b9\u6cd5</h2>
          <p>町とダンジョンは矢印キーまたはWASDで移動できます。斜め移動はQ/E/Z/C、または画面の斜めボタンで操作できます。</p>
          <p>\u753a\u30de\u30c3\u30d7\u3067\u5efa\u7269\u306e\u4e0a\u306b\u79fb\u52d5\u3057\u3001\u5165\u308b\u3092\u62bc\u3059\u3068\u5e97\u3084\u935b\u51b6\u5c4b\u3092\u5229\u7528\u3067\u304d\u307e\u3059\u3002</p>
          <div class="toolbar">${button("\u623b\u308b", "backMain", "quiet")}</div>
        </section>
      </main>
    `);
    bindActions();
  }

  function renderRaid(report) {
    const state = getState();
    setScreen("raid");
    set(`
      <main class="screen">
        <section class="panel">
          <h1 class="result">${report.success ? "\u8972\u6483\u3092\u3057\u306e\u3044\u3060" : "\u8972\u6483\u88ab\u5bb3"}</h1>
          <div class="status-grid">
            ${stat("\u8972\u6483", report.type)}
            ${stat("\u8972\u6483\u6226\u529b", report.raidPower)}
            ${stat("\u9632\u885b\u5224\u5b9a", report.defenseRoll)}
            ${stat("\u4eba\u53e3", `${state.town.population}/${state.town.populationCap}\u4eba`)}
            ${stat("\u5e97\u306e\u8010\u4e45\u5ea6", state.shop.durability, state.shop.durability, 100)}
          </div>
        </section>
        <section class="panel">
          <h2>\u8972\u6483\u30ed\u30b0</h2>
          <ul class="log-list">${report.logs.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          <div class="toolbar" style="margin-top:12px">${button("\u6b21\u3078", "continueAfterRaid", "primary")}</div>
        </section>
      </main>
    `);
    bindActions();
  }

  function renderResult() {
    const state = getState();
    setScreen("result");
    set(`
      <main class="screen title-screen">
        <section class="title-crest">
          <h1 class="result">${state.flags.victory ? "\u5546\u5e97\u8857\u3001\u5b8c\u6210" : "\u6311\u6226\u7d42\u4e86"}</h1>
          <p>${escapeHtml(state.flags.resultReason)}</p>
          <div class="status-grid">
            ${stat("\u5230\u9054\u65e5", `${Math.min(state.day, state.maxDays)}\u65e5`)}
            ${stat("\u6240\u6301\u91d1", `${state.hero.gold}G`)}
            ${stat("\u5e97\u30ec\u30d9\u30eb", state.shop.level)}
            ${stat("\u753a\u30ec\u30d9\u30eb", state.town.level)}
            ${stat("\u4eba\u53e3", `${state.town.population}\u4eba`)}
            ${stat("\u5e78\u305b\u5ea6", state.town.happiness)}
            ${stat("\u9632\u885b\u529b", state.town.defense)}
            ${stat("\u5e97\u306e\u8a55\u5224", state.shop.reputation)}
          </div>
          <div class="button-row title-buttons">
            ${button("\u3082\u3046\u4e00\u5ea6\u306f\u3058\u3081\u308b", "newGame", "primary")}
            ${button("\u30bf\u30a4\u30c8\u30eb\u3078", "title", "quiet")}
          </div>
        </section>
      </main>
    `);
    bindActions();
  }

  function onKeyDown(event) {
    const run = getDungeonRun ? getDungeonRun() : null;
    const state = getState ? getState() : null;
    const key = event.key.toLowerCase();
    if (state && state.uiOverlay && (state.screen === "main" || state.screen === "townMap" || state.screen === "dungeon")) {
      handleMapOverlayKeyboard(event, key);
      return;
    }
    if (run && run.active) {
      if (["q", "7", "home"].includes(key)) { event.preventDefault(); handlers.moveUpLeft(); return; }
      if (["e", "9", "pageup"].includes(key)) { event.preventDefault(); handlers.moveUpRight(); return; }
      if (["z", "1", "end"].includes(key)) { event.preventDefault(); handlers.moveDownLeft(); return; }
      if (["c", "3", "pagedown"].includes(key)) { event.preventDefault(); handlers.moveDownRight(); return; }
      if (["arrowup", "w"].includes(key)) { event.preventDefault(); handlers.moveUp(); }
      if (["arrowdown", "s"].includes(key)) { event.preventDefault(); handlers.moveDown(); }
      if (["arrowleft", "a"].includes(key)) { event.preventDefault(); handlers.moveLeft(); }
      if (["arrowright", "d"].includes(key)) { event.preventDefault(); handlers.moveRight(); }
      if (["enter", " ", "f"].includes(key)) { event.preventDefault(); handlers.attackButton(); }
      return;
    }
    if (state && (state.screen === "townMap" || state.screen === "main")) {
      if (["q", "7", "home"].includes(key)) { event.preventDefault(); handlers.townUpLeft(); return; }
      if (["e", "9", "pageup"].includes(key)) { event.preventDefault(); handlers.townUpRight(); return; }
      if (["z", "1", "end"].includes(key)) { event.preventDefault(); handlers.townDownLeft(); return; }
      if (["c", "3", "pagedown"].includes(key)) { event.preventDefault(); handlers.townDownRight(); return; }
      if (["arrowup", "w"].includes(key)) { event.preventDefault(); handlers.townUp(); }
      if (["arrowdown", "s"].includes(key)) { event.preventDefault(); handlers.townDown(); }
      if (["arrowleft", "a"].includes(key)) { event.preventDefault(); handlers.townLeft(); }
      if (["arrowright", "d"].includes(key)) { event.preventDefault(); handlers.townRight(); }
      if (["enter", " "].includes(key)) { event.preventDefault(); handlers.townConfirm(); }
      if (key === "escape") { event.preventDefault(); handlers.townCancel(); }
      if (key === "m") { event.preventDefault(); handlers.openTown(); }
      return;
    }
    if (state && state.screen === "manualSale") {
      handleSaleKeyboard(event, key);
    }
  }

  function handleMapOverlayKeyboard(event, key) {
    const buttons = Array.from(app().querySelectorAll(".map-overlay-window button:not(:disabled)"));
    if (key === "escape") {
      event.preventDefault();
      if (handlers.closeOverlay) handlers.closeOverlay();
      return;
    }
    if (!buttons.length) return;
    const active = document.activeElement;
    const index = Math.max(0, buttons.indexOf(active));
    if (["arrowdown", "s", "arrowright", "d"].includes(key)) {
      event.preventDefault();
      buttons[(index + 1) % buttons.length].focus();
      return;
    }
    if (["arrowup", "w", "arrowleft", "a"].includes(key)) {
      event.preventDefault();
      buttons[(index - 1 + buttons.length) % buttons.length].focus();
      return;
    }
    if (["enter", " "].includes(key)) {
      event.preventDefault();
      (buttons.includes(active) ? active : buttons[0]).click();
    }
  }

  function handleSaleKeyboard(event, key) {
    const buttons = Array.from(app().querySelectorAll(".rpg-menu-button:not(:disabled)"));
    if (!buttons.length) return;
    const active = document.activeElement;
    const index = Math.max(0, buttons.indexOf(active));
    if (/^[1-9]$/.test(key)) {
      const target = buttons[Number(key) - 1];
      if (target) {
        event.preventDefault();
        target.click();
      }
      return;
    }
    if (["arrowdown", "s", "arrowright", "d"].includes(key)) {
      event.preventDefault();
      buttons[(index + 1) % buttons.length].focus();
      return;
    }
    if (["arrowup", "w", "arrowleft", "a"].includes(key)) {
      event.preventDefault();
      buttons[(index - 1 + buttons.length) % buttons.length].focus();
      return;
    }
    if (["enter", " "].includes(key)) {
      event.preventDefault();
      (buttons.includes(active) ? active : buttons[0]).click();
      return;
    }
    if (key === "escape") {
      event.preventDefault();
      const back = app().querySelector('[data-action="saleMenuMode"][data-value="main"]') || app().querySelector('[data-action="nextCustomer"]');
      if (back) back.click();
    }
  }

  Game.UI = {
    init,
    renderTitle,
    renderMain,
    renderTownMap,
    renderDungeon,
    renderShop,
    renderCreditLedger,
    renderHospital,
    renderSaleMode,
    renderManualSale,
    renderTown,
    renderWarehouse,
    renderVillagers,
    renderQuests,
    renderEquipment,
    renderBag,
    renderStatus,
    renderDungeonBag,
    renderBlacksmith,
    renderHelp,
    renderRaid,
    renderResult,
    showSceneTransition
  };
})();


(function () {
  const Game = window.LabyrinthMall || (window.LabyrinthMall = {});
  let state = null;
  let dungeonRun = null;
  let titleHelp = false;
  let queuedDungeonMove = null;
  let queuedTownMove = null;
  let dungeonMoveTimer = null;
  let townMoveTimer = null;
  let sceneTransitionBusy = false;
  let dungeonEnemyTurnTimer = null;
  let dungeonEnemyTurnBusy = false;

  function boot() {
    Game.UI.init({
      getState: () => state,
      getDungeonRun: () => dungeonRun,
      handlers: {
        newGame,
        continueGame,
        toggleTitleHelp,
        title,
        enterDungeon,
        moveUp: () => move(0, -1),
        moveUpLeft: () => move(-1, -1),
        moveUpRight: () => move(1, -1),
        moveDown: () => move(0, 1),
        moveDownLeft: () => move(-1, 1),
        moveDownRight: () => move(1, 1),
        moveLeft: () => move(-1, 0),
        moveRight: () => move(1, 0),
        waitTurn: () => move(0, 0),
        attackButton,
        openStairsMenu,
        descendStairs,
        useDungeonItem,
        discardDungeonItem,
        returnTown,
        backDungeon: () => Game.UI.renderDungeon(),
        openTownMap: () => Game.UI.renderTownMap(),
        townUp: () => moveTown(0, -1),
        townUpLeft: () => moveTown(-1, -1),
        townUpRight: () => moveTown(1, -1),
        townDown: () => moveTown(0, 1),
        townDownLeft: () => moveTown(-1, 1),
        townDownRight: () => moveTown(1, 1),
        townLeft: () => moveTown(-1, 0),
        townRight: () => moveTown(1, 0),
        townConfirm,
        townCancel,
        enterTownBuilding,
        talkVillager,
        jumpTownBuilding,
        openShop: () => openOverlay("shop"),
        openCreditLedger: () => openOverlay("credit"),
        openTown: () => openOverlay("town"),
        openShopName: () => openOverlay("shopName"),
        openWarehouse: () => openOverlay("warehouse"),
        openHospital: () => openOverlay("hospital"),
        openVillagers: () => Game.UI.renderVillagers(),
        openQuests: () => openOverlay("quests"),
        openEquipment: () => openOverlay("equipment"),
        openBag: () => openOverlay("bag"),
        openStatus: () => openOverlay("status"),
        openDungeonBag: () => openOverlay("bag"),
        openBlacksmith: () => openOverlay("blacksmith"),
        closeOverlay,
        useOverlayItem,
        discardOverlayItem,
        equipOverlayItem,
        unequipOverlayItem,
        discardEquippedItem,
        storeInventoryItem,
        takeStorageItem,
        openHelp: () => Game.UI.renderHelp(),
        backMain: () => Game.UI.renderMain(),
        addShelf,
        removeShelf,
        autoArrange,
        startNightSale,
        startManualSale,
        startAutoSale,
        saleCommand,
        saleMenuMode,
        selectSaleItem,
        sellToCustomer,
        sellOnCredit,
        denySale,
        nextCustomer,
        endManualSale,
        creditAction,
        buyUpgrade,
        setShopName,
        equipItem,
        strengthenEquipment,
        craftEquipment,
        evolveWeapon,
        selectSynthesisBase,
        selectSynthesisMaterial,
        synthesizeWeapons,
        synthesizeWeaponsOverwrite,
        toggleMusic,
        setSfxVolume,
        toggleFullscreen,
        saveGame,
        continueAfterRaid
      }
    });
    Game.UI.renderTitle(false);
  }

  function newGame() {
    if (Game.Audio) Game.Audio.initAudio();
    clearMoveQueues();
    state = Game.State.createNewGame();
    dungeonRun = null;
    Game.Save.save(state);
    Game.UI.renderMain();
    showDayTransition("はじまりの町");
  }

  function continueGame() {
    if (Game.Audio) Game.Audio.initAudio();
    clearMoveQueues();
    const loaded = Game.Save.load();
    if (!loaded) {
      titleHelp = true;
      Game.UI.renderTitle(titleHelp);
      return;
    }
    state = loaded;
    dungeonRun = null;
    if (state.flags.gameOver) Game.UI.renderResult();
    else if (state.saleSession && state.saleSession.active) Game.UI.renderManualSale();
    else Game.UI.renderMain();
  }

  function toggleTitleHelp() {
    titleHelp = !titleHelp;
    Game.UI.renderTitle(titleHelp);
  }

  function title() {
    clearMoveQueues();
    state = null;
    dungeonRun = null;
    Game.UI.renderTitle(false);
  }

  function enterDungeon() {
    if (!state || state.today.dungeonDone) return;
    if (sceneTransitionBusy) return;
    clearMoveQueues();
    const tier = Game.Dungeon && Game.Dungeon.currentTier ? Game.Dungeon.currentTier(state) : { name: "始まりのダンジョン" };
    runAfterSceneTransition(`${tier.name || "始まりのダンジョン"} 1F`, () => {
      if (Game.Audio) Game.Audio.setMode("dungeon");
      dungeonRun = Game.Dungeon.startRun(state);
      Game.State.addLog(state, `${dungeonRun.name || "\u4ed5\u5165\u308c\u306e\u8ff7\u5bae"}\u3078\u5411\u304b\u3063\u305f\u3002`);
      Game.UI.renderDungeon();
    });
  }

  function currentPlayRenderer() {
    return dungeonRun && dungeonRun.active ? Game.UI.renderDungeon : Game.UI.renderTownMap;
  }

  function renderCurrentPlay() {
    currentPlayRenderer()();
  }

  function showSceneTransition(title, subtitle) {
    if (Game.UI && Game.UI.showSceneTransition) {
      Game.UI.showSceneTransition(title, subtitle);
    }
  }

  function dayTitle(day) {
    return `${Math.max(1, Number(day) || 1)}日目`;
  }

  function showDayTransition(subtitle) {
    if (!state || state.flags.gameOver) return;
    showSceneTransition(dayTitle(state.day), subtitle || "朝");
  }

  function dungeonTransitionTitle(run) {
    if (!run) return "始まりのダンジョン";
    return `${run.name || "始まりのダンジョン"} ${run.floor || 1}F`;
  }

  function dungeonTransitionTitleForFloor(run, floor) {
    if (!run) return "始まりのダンジョン";
    return `${run.name || "始まりのダンジョン"} ${floor || run.floor || 1}F`;
  }

  function runAfterSceneTransition(title, callback, subtitle) {
    if (sceneTransitionBusy) return;
    sceneTransitionBusy = true;
    showSceneTransition(title, subtitle);
    window.setTimeout(() => {
      try {
        callback();
      } finally {
        sceneTransitionBusy = false;
      }
    }, 190);
  }

  function openOverlay(type) {
    if (!state) return;
    if (state.townStory) return;
    state.uiOverlay = { type: type || "bag" };
    if (Game.Audio) Game.Audio.playSfx("button");
    renderCurrentPlay();
  }

  function closeOverlay() {
    if (!state || !state.uiOverlay) return;
    state.uiOverlay = null;
    if (Game.Audio) Game.Audio.playSfx("button");
    renderCurrentPlay();
  }

  function setShopName() {
    if (!state) return;
    const input = document.getElementById("shopNameInput");
    const name = input && input.value ? input.value.trim().slice(0, 16) : "";
    if (!name) {
      Game.State.addLog(state, "看板に書く名前を入力しよう。");
      if (Game.Audio) Game.Audio.playSfx("error");
      renderCurrentPlay();
      return;
    }
    state.shop.name = name;
    Game.State.addLog(state, `${name}の看板を掲げた。`);
    state.uiOverlay = null;
    if (Game.Audio) Game.Audio.playSfx("questComplete");
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function attackButton() {
    if (!dungeonRun || !dungeonRun.active) return;
    if (sceneTransitionBusy) return;
    if (Game.Animations && Game.Animations.isHeroMoving("dungeon")) return;
    if (dungeonEnemyTurnBusy) return;
    if (Game.Dungeon.isOnStairs && Game.Dungeon.isOnStairs(dungeonRun)) {
      openStairsMenu();
      return;
    }
    const attacked = Game.Dungeon.attackAdjacent(state, dungeonRun, { skipEnemyTurn: true });
    if (Game.Audio) Game.Audio.playSfx(attacked ? "attack" : "miss");
    if (!dungeonRun.active) {
      const endingRun = dungeonRun;
      clearMoveQueues();
      runAfterSceneTransition("はじまりの町", () => {
        Game.State.addLogs(state, endingRun.messages.slice(-8));
        Game.Save.save(state);
        if (Game.Audio) Game.Audio.setMode("town");
        Game.UI.renderMain();
      });
      return;
    }
    Game.UI.renderDungeon();
    if (attacked) scheduleDungeonEnemyTurn(280);
  }

  function openStairsMenu() {
    if (!dungeonRun || !dungeonRun.active) return;
    if (sceneTransitionBusy) return;
    if (!(Game.Dungeon.isOnStairs && Game.Dungeon.isOnStairs(dungeonRun))) {
      dungeonRun.messages.push("階段の上でだけ下りたり、町へ戻ったりできる。");
      dungeonRun.messages = dungeonRun.messages.slice(-12);
      if (Game.Audio) Game.Audio.playSfx("error");
      Game.UI.renderDungeon();
      return;
    }
    state.uiOverlay = { type: "stairs" };
    if (Game.Audio) Game.Audio.playSfx("button");
    Game.UI.renderDungeon();
  }

  function descendStairs() {
    if (!dungeonRun || !dungeonRun.active) return;
    if (sceneTransitionBusy) return;
    if (Game.Animations && Game.Animations.isHeroMoving("dungeon")) return;
    if (!(Game.Dungeon.isOnStairs && Game.Dungeon.isOnStairs(dungeonRun))) {
      if (Game.Audio) Game.Audio.playSfx("error");
      return;
    }
    const title = dungeonRun.floor >= dungeonRun.maxFloor ? "はじまりの町" : dungeonTransitionTitleForFloor(dungeonRun, dungeonRun.floor + 1);
    state.uiOverlay = null;
    clearMoveQueues();
    if (Game.Audio) Game.Audio.playSfx("stairs");
    runAfterSceneTransition(title, () => {
      const used = Game.Dungeon.useStairs ? Game.Dungeon.useStairs(state, dungeonRun) : false;
      if (!used) {
        if (Game.Audio) Game.Audio.playSfx("error");
        Game.UI.renderDungeon();
        return;
      }
      if (!dungeonRun.active) {
        Game.State.addLogs(state, dungeonRun.messages.slice(-8));
        Game.Save.save(state);
        if (Game.Audio) Game.Audio.setMode("town");
        clearMoveQueues();
        Game.UI.renderMain();
        return;
      }
      Game.UI.renderDungeon();
    });
  }

  function move(dx, dy) {
    if (!dungeonRun || !dungeonRun.active) return;
    if (sceneTransitionBusy) return;
    if (state && state.uiOverlay) {
      closeOverlay();
      return;
    }
    if (dungeonEnemyTurnBusy) return;
    if ((dx || dy) && Game.Animations && Game.Animations.isHeroMoving("dungeon")) {
      queueMove("dungeon", dx, dy);
      return;
    }
    if (dx === 0 && dy === 0) {
      dungeonRun.messages.push("\u305d\u306e\u5834\u3067\u606f\u3092\u6574\u3048\u305f\u3002");
      dungeonRun.messages = dungeonRun.messages.slice(-12);
      Game.UI.renderDungeon();
      scheduleDungeonEnemyTurn(130);
      return;
    }
    const beforeInventory = state.hero.inventory.length;
    const beforePosition = { x: dungeonRun.player.x, y: dungeonRun.player.y };
    const beforeFloor = dungeonRun.floor;
    const action = Game.Dungeon.moveHero(state, dungeonRun, dx, dy, { skipEnemyTurn: true }) || { acted: false };
    const moved = beforePosition.x !== dungeonRun.player.x || beforePosition.y !== dungeonRun.player.y;
    if (moved && beforeFloor === dungeonRun.floor && Game.Animations) {
      Game.Animations.startHeroMove("dungeon", beforePosition, { x: dungeonRun.player.x, y: dungeonRun.player.y }, Game.Animations.directionFromDelta(dx, dy));
    }
    if (Game.Audio) {
      if (state.hero.inventory.length > beforeInventory) Game.Audio.playSfx("pickup");
      else if (action.attacked) Game.Audio.playSfx("attack");
      else if (moved) Game.Audio.playSfx("move");
      else Game.Audio.playSfx("error");
    }
    if (!dungeonRun.active) {
      const endingRun = dungeonRun;
      clearMoveQueues();
      runAfterSceneTransition("はじまりの町", () => {
        Game.State.addLogs(state, endingRun.messages.slice(-8));
        Game.Save.save(state);
        if (Game.Audio) Game.Audio.setMode("town");
        Game.UI.renderMain();
      });
      return;
    }
    Game.UI.renderDungeon();
    if (action.acted) scheduleDungeonEnemyTurn(action.attacked ? 280 : 150);
  }

  function useDungeonItem(index) {
    if (!dungeonRun || !dungeonRun.active) return;
    if (sceneTransitionBusy) return;
    if (dungeonEnemyTurnBusy) return;
    const acted = Game.Dungeon.useItem(state, dungeonRun, index, { skipEnemyTurn: true });
    if (Game.Audio) Game.Audio.playSfx("button");
    if (!dungeonRun.active) {
      const endingRun = dungeonRun;
      clearMoveQueues();
      runAfterSceneTransition("はじまりの町", () => {
        Game.State.addLogs(state, endingRun.messages.slice(-8));
        Game.Save.save(state);
        if (Game.Audio) Game.Audio.setMode("town");
        Game.UI.renderMain();
      });
      return;
    }
    Game.UI.renderDungeon();
    if (acted) scheduleDungeonEnemyTurn(170);
  }

  function discardDungeonItem(index) {
    if (!dungeonRun || !dungeonRun.active) return;
    if (sceneTransitionBusy) return;
    const item = state.hero.inventory.splice(Number(index), 1)[0];
    if (item) {
      dungeonRun.messages.push(`${Game.Items.itemLabel(item)}\u3092\u6368\u3066\u305f\u3002`);
      dungeonRun.messages = dungeonRun.messages.slice(-12);
      if (Game.Audio) Game.Audio.playSfx("button");
    } else if (Game.Audio) {
      Game.Audio.playSfx("error");
    }
    Game.UI.renderDungeon();
  }

  function returnTown() {
    if (!dungeonRun || !dungeonRun.active) return;
    if (sceneTransitionBusy) return;
    if (Game.Dungeon.isOnStairs && !Game.Dungeon.isOnStairs(dungeonRun)) {
      dungeonRun.messages.push("町へ帰れるのは階段の上だけだ。");
      dungeonRun.messages = dungeonRun.messages.slice(-12);
      if (Game.Audio) Game.Audio.playSfx("error");
      Game.UI.renderDungeon();
      return;
    }
    state.uiOverlay = null;
    clearMoveQueues();
    if (Game.Audio) Game.Audio.playSfx("stairs");
    runAfterSceneTransition("はじまりの町", () => {
      const logs = Game.Dungeon.returnToTown(state, dungeonRun, false);
      Game.State.addLogs(state, logs);
      Game.Save.save(state);
      if (Game.Audio) Game.Audio.setMode("town");
      Game.UI.renderMain();
    });
  }

  function finishDungeonReturn(forced) {
    if (sceneTransitionBusy) return;
    clearMoveQueues();
    runAfterSceneTransition("はじまりの町", () => {
      const logs = Game.Dungeon.returnToTown(state, dungeonRun, forced);
      Game.State.addLogs(state, logs);
      Game.Save.save(state);
      if (Game.Audio) Game.Audio.setMode("town");
      Game.UI.renderMain();
    });
  }

  function moveTown(dx, dy) {
    if (!state) return;
    if (sceneTransitionBusy) return;
    if (state.townStory) {
      Game.UI.renderTownMap();
      return;
    }
    if (state.uiOverlay) {
      closeOverlay();
      return;
    }
    if ((dx || dy) && Game.Animations && Game.Animations.isHeroMoving("town")) {
      queueMove("town", dx, dy);
      return;
    }
    const beforePosition = { x: state.townMap.hero.x, y: state.townMap.hero.y };
    Game.State.addLog(state, Game.Town.moveTownHero(state, dx, dy));
    const afterPosition = { x: state.townMap.hero.x, y: state.townMap.hero.y };
    if ((beforePosition.x !== afterPosition.x || beforePosition.y !== afterPosition.y) && Game.Animations) {
      Game.Animations.startHeroMove("town", beforePosition, afterPosition, Game.Animations.directionFromDelta(dx, dy));
    }
    if (Game.Audio) Game.Audio.playSfx("move");
    Game.Save.save(state);
    Game.UI.renderTownMap();
  }

  function scheduleDungeonEnemyTurn(delay) {
    if (!state || !dungeonRun || !dungeonRun.active) return;
    if (dungeonEnemyTurnBusy || dungeonEnemyTurnTimer) return;
    dungeonEnemyTurnBusy = true;
    dungeonEnemyTurnTimer = window.setTimeout(() => {
      dungeonEnemyTurnTimer = null;
      if (!state || !dungeonRun) {
        dungeonEnemyTurnBusy = false;
        return;
      }
      if (dungeonRun.active && Game.Dungeon.resolveEnemyTurn) Game.Dungeon.resolveEnemyTurn(state, dungeonRun);
      const endingRun = dungeonRun;
      const inactive = !dungeonRun.active;
      dungeonEnemyTurnBusy = false;
      if (inactive) {
        clearMoveQueues();
        runAfterSceneTransition("はじまりの町", () => {
          Game.State.addLogs(state, endingRun.messages.slice(-8));
          Game.Save.save(state);
          if (Game.Audio) Game.Audio.setMode("town");
          Game.UI.renderMain();
        });
        return;
      }
      Game.Save.save(state);
      Game.UI.renderDungeon();
    }, delay || 180);
  }

  function queueMove(scene, dx, dy) {
    if (scene === "dungeon") {
      queuedDungeonMove = { dx, dy };
      if (dungeonMoveTimer) return;
      dungeonMoveTimer = window.setTimeout(() => {
        dungeonMoveTimer = null;
        const queued = queuedDungeonMove;
        queuedDungeonMove = null;
        if (queued) move(queued.dx, queued.dy);
      }, 80);
      return;
    }
    queuedTownMove = { dx, dy };
    if (townMoveTimer) return;
    townMoveTimer = window.setTimeout(() => {
      townMoveTimer = null;
      const queued = queuedTownMove;
      queuedTownMove = null;
      if (queued) moveTown(queued.dx, queued.dy);
    }, 80);
  }

  function clearMoveQueues() {
    queuedDungeonMove = null;
    queuedTownMove = null;
    if (dungeonMoveTimer) {
      window.clearTimeout(dungeonMoveTimer);
      dungeonMoveTimer = null;
    }
    if (townMoveTimer) {
      window.clearTimeout(townMoveTimer);
      townMoveTimer = null;
    }
    if (dungeonEnemyTurnTimer) {
      window.clearTimeout(dungeonEnemyTurnTimer);
      dungeonEnemyTurnTimer = null;
    }
    dungeonEnemyTurnBusy = false;
  }

  function talkVillager() {
    if (!state) return;
    const logs = Game.Town.talkToVillager(state);
    Game.State.addLogs(state, logs);
    if (Game.Audio) Game.Audio.playSfx(logs.some((message) => message.includes("\u8a71\u305b\u308b\u4eba")) ? "error" : "questAccept");
    Game.Save.save(state);
    Game.UI.renderTownMap();
  }

  function enterTownBuilding() {
    clearMoveQueues();
    const target = Game.Town.getInteractionTarget ? Game.Town.getInteractionTarget(state) : {};
    const building = target.building || Game.Town.getBuildingAt(state, state.townMap.hero.x, state.townMap.hero.y);
    if (!building || !building.action) return;
    if (building.action === "enterDungeon") {
      enterDungeon();
      return;
    }
    if (building.action === "openShop") openOverlay("shop");
    if (building.action === "openHospital") openOverlay("hospital");
    if (building.action === "openBlacksmith") openOverlay("blacksmith");
    if (building.action === "openWarehouse") openOverlay("warehouse");
    if (building.action === "openTown") openOverlay("town");
    if (building.action === "openQuests") openOverlay("quests");
    if (building.action === "openShopName") openOverlay("shopName");
    if (building.action === "sleep") sleepAtBed();
  }

  function sleepAtBed() {
    if (!state || sceneTransitionBusy) return;
    clearMoveQueues();
    state.uiOverlay = null;
    state.hero.hp = state.hero.maxHp;
    Game.State.addLog(state, "ベッドで眠った。HPが回復した。");
    Game.State.startNextDay(state);
    Game.State.addLog(state, "翌朝になった。");
    Game.State.checkGameEnd(state);
    if (Game.Audio) Game.Audio.playSfx("questComplete");
    Game.Save.save(state);
    if (state.flags.gameOver) Game.UI.renderResult();
    else {
      Game.UI.renderMain();
      showDayTransition("朝");
    }
  }

  function townConfirm() {
    if (!state) return;
    if (state.townStory) {
      if (Game.TownScene && Game.TownScene.advanceTownStory) Game.TownScene.advanceTownStory(state);
      Game.UI.renderTownMap();
      return;
    }
    const target = Game.Town.getInteractionTarget ? Game.Town.getInteractionTarget(state) : {};
    if (target.villager) {
      talkVillager();
      return;
    }
    if (target.building && target.building.action) {
      enterTownBuilding();
      return;
    }
    Game.State.addLog(state, "\u8db3\u5143\u3092\u78ba\u304b\u3081\u305f\u3002");
    Game.Save.save(state);
    Game.UI.renderTownMap();
  }

  function townCancel() {
    if (!state) return;
    clearMoveQueues();
    if (state.uiOverlay) {
      closeOverlay();
      return;
    }
    Game.UI.renderMain();
  }

  function jumpTownBuilding(id) {
    const building = Game.Town.getVisibleBuildings(state).find((item) => item.id === id);
    if (!building) return;
    Game.State.addLog(state, Game.Town.approachBuilding ? Game.Town.approachBuilding(state, building) : `${building.name}\u306e\u524d\u3078\u79fb\u52d5\u3057\u305f\u3002`);
    Game.Save.save(state);
    Game.UI.renderTownMap();
  }

  function addShelf(index) {
    const message = Game.Shop.addToShelf(state, Number(index));
    Game.State.addLog(state, message);
    if (Game.Audio && (message.includes("\u3044\u3063\u3071\u3044") || message.includes("\u4e26\u3079\u3089\u308c\u306a\u3044"))) Game.Audio.playSfx("error");
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function removeShelf(index) {
    Game.State.addLog(state, Game.Shop.removeFromShelf(state, Number(index)));
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function autoArrange() {
    Game.State.addLogs(state, Game.Shop.autoArrange(state));
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function startNightSale() {
    if (state.today.nightSaleDone) return;
    Game.UI.renderSaleMode();
  }

  function startManualSale() {
    if (state.today.nightSaleDone) return;
    Game.State.addLogs(state, Game.Shop.startManualSale(state));
    if (Game.Audio) Game.Audio.playSfx("move");
    Game.Save.save(state);
    Game.UI.renderManualSale();
  }

  function startAutoSale() {
    if (state.today.nightSaleDone) return;
    Game.State.addLogs(state, Game.Shop.runNightSale(state));
    if (Game.Audio) Game.Audio.playSfx(state.lastSale && state.lastSale.soldCount > 0 ? "sell" : "error");
    finishNightAfterSales();
  }

  function saleMenuMode(mode) {
    Game.Shop.setSaleMenuMode(state, mode || "main");
    if (Game.Audio) Game.Audio.playSfx("button");
    Game.Save.save(state);
    Game.UI.renderManualSale();
  }

  function saleCommand(command) {
    if (!state || !state.saleSession || !state.saleSession.active) return;
    if (command === "recommend") {
      const message = Game.Shop.recommendSaleItem(state);
      Game.State.addLog(state, message);
      if (Game.Audio) Game.Audio.playSfx(message.includes("ない") ? "error" : "button");
      Game.Save.save(state);
      Game.UI.renderManualSale();
      return;
    }
    if (command === "decline") {
      denySale();
      return;
    }
  }

  function selectSaleItem(key) {
    const message = Game.Shop.selectSaleItem(state, key);
    Game.State.addLog(state, message);
    if (Game.Audio && message.includes("選べない")) Game.Audio.playSfx("error");
    Game.Save.save(state);
    Game.UI.renderManualSale();
  }

  function sellToCustomer(policyId) {
    const result = Game.Shop.sellToCustomer(state, policyId);
    Game.State.addLogs(state, result.logs);
    if (Game.Audio) {
      Game.Audio.playSfx(result.sound || "button");
      if (result.happySound) Game.Audio.playSfx("questComplete");
    }
    Game.Save.save(state);
    Game.UI.renderManualSale();
    advanceSaleAfterDelay(800);
  }

  function sellOnCredit() {
    const result = Game.Shop.sellOnCredit(state);
    Game.State.addLogs(state, result.logs);
    if (Game.Audio) {
      Game.Audio.playSfx(result.sound || "questAccept");
      if (result.happySound) Game.Audio.playSfx("questComplete");
    }
    Game.Save.save(state);
    Game.UI.renderManualSale();
    advanceSaleAfterDelay(900);
  }

  function denySale() {
    const result = Game.Shop.denySale(state);
    Game.State.addLogs(state, result.logs);
    if (Game.Audio) Game.Audio.playSfx(result.sound || "button");
    Game.Save.save(state);
    Game.UI.renderManualSale();
    advanceSaleAfterDelay(700);
  }

  function advanceSaleAfterDelay(delay) {
    if (state.saleSession && state.saleSession.active && state.saleSession.waitingNext) {
      window.setTimeout(() => {
        if (!state.saleSession || !state.saleSession.active || !state.saleSession.waitingNext) return;
        const next = Game.Shop.nextCustomer(state);
        Game.State.addLogs(state, next.logs);
        if (Game.Audio) Game.Audio.playSfx(next.done ? "button" : "move");
        if (next.done) {
          finishNightAfterSales();
          return;
        }
        Game.Save.save(state);
        Game.UI.renderManualSale();
      }, delay);
    }
  }

  function nextCustomer() {
    const result = Game.Shop.nextCustomer(state);
    Game.State.addLogs(state, result.logs);
    if (Game.Audio) Game.Audio.playSfx(result.done ? "button" : "move");
    if (result.done) {
      finishNightAfterSales();
      return;
    }
    Game.Save.save(state);
    Game.UI.renderManualSale();
  }

  function endManualSale() {
    const logs = Game.Shop.endManualSale(state);
    Game.State.addLogs(state, logs);
    if (Game.Audio) Game.Audio.playSfx("button");
    finishNightAfterSales();
  }

  function creditAction(value) {
    const [id, action] = String(value || "").split("|");
    const logs = Game.Shop.handleCreditAction(state, id, action);
    Game.State.addLogs(state, logs);
    if (Game.Audio) Game.Audio.playSfx(logs.some((message) => message.includes("ない") || message.includes("選べない")) ? "error" : "button");
    Game.Save.save(state);
    Game.UI.renderCreditLedger();
  }

  function finishNightAfterSales() {
    Game.State.addLogs(state, Game.Town.applyDailyPopulationChange(state));
    Game.State.addLogs(state, Game.Events.rollDailyEvent(state));
    Game.State.addLogs(state, Game.State.checkTownLevelUp(state));

    let raidReport = null;
    let startedNextDay = false;
    if (Game.Raid.shouldRaidOccur(state)) {
      if (Game.Audio) {
        Game.Audio.playSfx("raidWarning");
        Game.Audio.playSfx("raidStart");
      }
      if (Game.Audio) Game.Audio.setMode("raid");
      raidReport = Game.Raid.runRaid(state);
      if (Game.Audio) Game.Audio.playSfx(raidReport.success ? "raidWin" : "raidLose");
      Game.State.addLogs(state, raidReport.logs);
    }

    if (!Game.State.checkGameEnd(state)) {
      if (state.day >= state.maxDays) {
        Game.State.startNextDay(state);
        startedNextDay = true;
        Game.State.checkGameEnd(state);
      } else if (!raidReport) {
        Game.State.startNextDay(state);
        startedNextDay = true;
      }
    }

    Game.Save.save(state);
    if (state.flags.gameOver) Game.UI.renderResult();
    else if (raidReport) Game.UI.renderRaid(raidReport);
    else {
      Game.UI.renderMain();
      if (startedNextDay) showDayTransition("朝");
    }
  }

  function continueAfterRaid() {
    if (Game.Audio) Game.Audio.setMode("town");
    let startedNextDay = false;
    if (!Game.State.checkGameEnd(state)) {
      if (state.day >= state.maxDays) {
        Game.State.startNextDay(state);
        startedNextDay = true;
        Game.State.checkGameEnd(state);
      } else {
        Game.State.startNextDay(state);
        startedNextDay = true;
      }
    }
    Game.Save.save(state);
    if (state.flags.gameOver) Game.UI.renderResult();
    else {
      Game.UI.renderMain();
      if (startedNextDay) showDayTransition("朝");
    }
  }

  function buyUpgrade(id) {
    const logs = Game.Town.buyUpgrade(state, id);
    Game.State.addLogs(state, logs);
    if (Game.Audio && logs.some((message) => message.includes("G\u5fc5\u8981") || message.includes("\u3067\u304d\u306a\u3044"))) Game.Audio.playSfx("error");
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function equipItem(index) {
    Game.State.addLogs(state, Game.Town.equipFromStorage(state, Number(index)));
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function activeItemSource() {
    return "inventory";
  }

  function activeItems() {
    return activeItemSource() === "inventory" ? state.hero.inventory : state.shop.storage;
  }

  function useOverlayItem(value) {
    if (!state) return;
    const index = Number(value);
    if (!Number.isFinite(index)) return;
    if (dungeonRun && dungeonRun.active) {
      useDungeonItem(index);
      return;
    }
    const item = state.hero.inventory[index];
    if (!item) return;
    if (!Game.Items.isHealingItem(item)) {
      Game.State.addLog(state, "今は使えない道具だ。");
      if (Game.Audio) Game.Audio.playSfx("error");
      renderCurrentPlay();
      return;
    }
    const before = state.hero.hp;
    state.hero.hp = Game.State.clamp(state.hero.hp + Game.Items.healingAmount(item), 0, state.hero.maxHp);
    state.hero.inventory.splice(index, 1);
    Game.State.addLog(state, `${item.name}を使い、HPが${state.hero.hp - before}回復した。`);
    if (Game.Audio) Game.Audio.playSfx("pickup");
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function discardOverlayItem(value) {
    if (!state) return;
    const source = activeItemSource();
    const items = activeItems();
    const index = Number(value);
    const item = items[index];
    if (!item) {
      if (Game.Audio) Game.Audio.playSfx("error");
      return;
    }
    items.splice(index, 1);
    const label = Game.Items.itemLabel(item);
    if (dungeonRun && dungeonRun.active) {
      dungeonRun.messages.push(`${label}を捨てた。`);
      dungeonRun.messages = dungeonRun.messages.slice(-12);
    } else {
      Game.State.addLog(state, `${label}を捨てた。`);
    }
    if (Game.Audio) Game.Audio.playSfx("button");
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function equipOverlayItem(value) {
    if (!state) return;
    const [source, rawIndex] = String(value || "").split(":");
    const index = Number(rawIndex);
    if (!Number.isFinite(index)) return;
    if (source === "inventory") {
      equipFromInventory(index);
      return;
    }
    Game.State.addLogs(state, Game.Town.equipFromStorage(state, index));
    if (Game.Audio) Game.Audio.playSfx("button");
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function equipFromInventory(index) {
    const item = state.hero.inventory[index];
    if (!item || item.kind !== "equipment") {
      if (Game.Audio) Game.Audio.playSfx("error");
      return;
    }
    const slot = item.slot;
    const previous = state.hero.equipment[slot];
    state.hero.inventory.splice(index, 1);
    if (previous) state.hero.inventory.push(previous);
    state.hero.equipment[slot] = item;
    Game.State.updateDerivedStats(state);
    if (dungeonRun && dungeonRun.active) dungeonRun.messages.push(`${Game.Items.equipmentLabel(item)}を装備した。`);
    else Game.State.addLog(state, `${Game.Items.equipmentLabel(item)}を装備した。`);
    if (Game.Audio) Game.Audio.playSfx("button");
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function unequipOverlayItem(slot) {
    if (!state || !state.hero.equipment[slot]) return;
    const item = state.hero.equipment[slot];
    const target = state.hero.inventory;
    const limit = Game.Items.getCarryLimit(state);
    if (target.length >= limit) {
      const message = dungeonRun && dungeonRun.active ? "袋がいっぱいで外せない。" : "倉庫がいっぱいで外せない。";
      if (dungeonRun && dungeonRun.active) dungeonRun.messages.push(message);
      else Game.State.addLog(state, message);
      if (Game.Audio) Game.Audio.playSfx("error");
      renderCurrentPlay();
      return;
    }
    state.hero.equipment[slot] = null;
    target.push(item);
    Game.State.updateDerivedStats(state);
    const message = `${Game.Items.equipmentLabel(item)}を外した。`;
    if (dungeonRun && dungeonRun.active) dungeonRun.messages.push(message);
    else Game.State.addLog(state, message);
    if (Game.Audio) Game.Audio.playSfx("button");
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function discardEquippedItem(slot) {
    if (!state || !state.hero.equipment[slot]) return;
    const item = state.hero.equipment[slot];
    state.hero.equipment[slot] = null;
    Game.State.updateDerivedStats(state);
    const message = `${Game.Items.equipmentLabel(item)}を捨てた。`;
    if (dungeonRun && dungeonRun.active) {
      dungeonRun.messages.push(message);
      dungeonRun.messages = dungeonRun.messages.slice(-12);
    } else {
      Game.State.addLog(state, message);
    }
    if (Game.Audio) Game.Audio.playSfx("button");
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function storeInventoryItem(value) {
    if (!state) return;
    const index = Number(value);
    const item = state.hero.inventory[index];
    if (!item) {
      if (Game.Audio) Game.Audio.playSfx("error");
      return;
    }
    if (state.shop.storage.length >= state.shop.storageCapacity) {
      Game.State.addLog(state, "倉庫がいっぱいでしまえない。");
      if (Game.Audio) Game.Audio.playSfx("error");
      renderCurrentPlay();
      return;
    }
    state.hero.inventory.splice(index, 1);
    state.shop.storage.push(item);
    Game.State.addLog(state, `${Game.Items.itemLabel(item)}を倉庫にしまった。`);
    if (Game.Audio) Game.Audio.playSfx("button");
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function takeStorageItem(value) {
    if (!state) return;
    const index = Number(value);
    const item = state.shop.storage[index];
    if (!item) {
      if (Game.Audio) Game.Audio.playSfx("error");
      return;
    }
    if (state.hero.inventory.length >= Game.Items.getCarryLimit(state)) {
      Game.State.addLog(state, "袋がいっぱいで取り出せない。");
      if (Game.Audio) Game.Audio.playSfx("error");
      renderCurrentPlay();
      return;
    }
    state.shop.storage.splice(index, 1);
    state.hero.inventory.push(item);
    Game.State.addLog(state, `${Game.Items.itemLabel(item)}を袋に入れた。`);
    if (Game.Audio) Game.Audio.playSfx("pickup");
    Game.Save.save(state);
    renderCurrentPlay();
  }

  function strengthenEquipment(slot) {
    const logs = Game.Town.strengthenEquipment(state, slot);
    Game.State.addLogs(state, logs);
    if (Game.Audio) Game.Audio.playSfx(logs.some((message) => message.includes("\u5f37\u5316\u3057\u305f")) ? "forge" : "forgeFail");
    Game.Save.save(state);
    if (state.uiOverlay && state.uiOverlay.type === "blacksmith") renderCurrentPlay();
    else if (state.screen === "blacksmith") Game.UI.renderBlacksmith();
    else Game.UI.renderEquipment();
  }

  function craftEquipment(recipeId) {
    const logs = Game.Town.craftEquipment(state, recipeId);
    Game.State.addLogs(state, logs);
    if (Game.Audio) Game.Audio.playSfx(logs.some((message) => message.includes("\u4f5c\u3063\u305f")) ? "forge" : "forgeFail");
    Game.Save.save(state);
    if (state.uiOverlay && state.uiOverlay.type === "blacksmith") renderCurrentPlay();
    else Game.UI.renderBlacksmith();
  }

  function evolveWeapon(value) {
    const [key, evolutionId] = String(value || "").split("|");
    const logs = Game.Town.evolveWeapon(state, key, evolutionId);
    Game.State.addLogs(state, logs);
    if (Game.Audio) Game.Audio.playSfx(logs.some((message) => message.includes("進化した")) ? "forge" : "error");
    Game.Save.save(state);
    if (state.uiOverlay && state.uiOverlay.type === "blacksmith") renderCurrentPlay();
    else Game.UI.renderBlacksmith();
  }

  function selectSynthesisBase(key) {
    const logs = Game.Town.selectSynthesisWeapon(state, "base", key);
    Game.State.addLogs(state, logs);
    if (Game.Audio && logs.some((message) => message.includes("見つからない"))) Game.Audio.playSfx("error");
    Game.Save.save(state);
    if (state.uiOverlay && state.uiOverlay.type === "blacksmith") renderCurrentPlay();
    else Game.UI.renderBlacksmith();
  }

  function selectSynthesisMaterial(key) {
    const logs = Game.Town.selectSynthesisWeapon(state, "material", key);
    Game.State.addLogs(state, logs);
    if (Game.Audio && logs.some((message) => message.includes("見つからない") || message.includes("倉庫"))) Game.Audio.playSfx("error");
    Game.Save.save(state);
    if (state.uiOverlay && state.uiOverlay.type === "blacksmith") renderCurrentPlay();
    else Game.UI.renderBlacksmith();
  }

  function synthesizeWeapons() {
    finishSynthesis(false);
  }

  function synthesizeWeaponsOverwrite() {
    finishSynthesis(true);
  }

  function finishSynthesis(overwrite) {
    const logs = Game.Town.synthesizeWeapons(state, overwrite);
    Game.State.addLogs(state, logs);
    if (Game.Audio) Game.Audio.playSfx(logs.some((message) => message.includes("合成した")) ? "forge" : "error");
    Game.Save.save(state);
    if (state.uiOverlay && state.uiOverlay.type === "blacksmith") renderCurrentPlay();
    else Game.UI.renderBlacksmith();
  }

  async function toggleMusic() {
    if (!Game.Audio) return;
    Game.Audio.toggleSound();
    Game.UI.renderMain();
  }

  function setSfxVolume(value) {
    if (!Game.Audio) return;
    Game.Audio.setVolume(Number(value));
    Game.Audio.playSfx("button");
    Game.UI.renderMain();
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
      if (Game.Audio) Game.Audio.playSfx("button");
    } catch (error) {
      if (state) Game.State.addLog(state, "\u5168\u753b\u9762\u306b\u5207\u308a\u66ff\u3048\u3089\u308c\u306a\u304b\u3063\u305f\u3002");
      if (Game.Audio) Game.Audio.playSfx("error");
    }
    Game.UI.renderMain();
  }

  function saveGame() {
    const ok = Game.Save.save(state);
    Game.State.addLog(state, ok ? "\u30bb\u30fc\u30d6\u3057\u307e\u3057\u305f\u3002" : "\u30bb\u30fc\u30d6\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002");
    Game.UI.renderMain();
  }

  window.addEventListener("DOMContentLoaded", boot);
})();
