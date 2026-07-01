# Sprite Assets

These PNG sprites are the runtime image set for this prototype. The current visual base uses cropped and prepared sprites from the CC0 `Ninja Adventure Asset Pack`, plus older prototype sprites kept as fallbacks or development references.

## Files

- `ninja-hero-walk.png`: current protagonist walking sheet used by the Canvas town and dungeon scenes.
- `ninja-villager-*.png`: current villager walking sheets used on the town map.
- `ninja-town-*.png`: current town grass, road, tree, bush, crate, and shop interior tiles.
- `ninja-shop-*.png`: current one-map shop floor, wall, door, and counter tiles.
- `floor.png`, `wall.png`, `stairs.png`, `chest.png`, `potion.png`, `material.png`, `weapon.png`, `armor.png`, `jewel.png`, `food.png`: dungeon and item sprites used by the Canvas renderer.
- `enemy-*-walk-v1.png`: enemy walking sheets used by dungeon entities.
- `*-source*.png`, `*-preview*.png`, and `*.gif`: development reference images. They are not loaded by `src/engine/sprites.js`.

## Usage

Runtime sprite loading is controlled by `src/engine/sprites.js`. Keep the same logical keys there when replacing an image file.

To replace a sprite later, keep the same file name and transparent PNG format, or update the matching key in `src/engine/sprites.js`.
