/**
 * Converts a TTF/OTF font to Three.js typeface.json format.
 * Usage: node scripts/convert-font.mjs
 */
import opentype from 'opentype.js'
import fs from 'fs'
import path from 'path'

const FONT_PATH = path.resolve('public/fonts/BowlbyOneSC/bowlby-one-sc-v19-latin-regular.ttf')
const OUT_PATH = path.resolve('public/fonts/BowlbyOneSC/bowlby-one-sc.typeface.json')

// Characters needed for the intro text: "DIE KIETZKNEIPE" (uppercase A–Z + space)
const CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?-'

function pathToThree(commands) {
  let o = ''
  for (const cmd of commands) {
    switch (cmd.type) {
      case 'M':
        o += `m ${Math.round(cmd.x)} ${Math.round(cmd.y)} `
        break
      case 'L':
        o += `l ${Math.round(cmd.x)} ${Math.round(cmd.y)} `
        break
      case 'C':
        o += `b ${Math.round(cmd.x1)} ${Math.round(cmd.y1)} ${Math.round(cmd.x2)} ${Math.round(cmd.y2)} ${Math.round(cmd.x)} ${Math.round(cmd.y)} `
        break
      case 'Q':
        o += `q ${Math.round(cmd.x1)} ${Math.round(cmd.y1)} ${Math.round(cmd.x)} ${Math.round(cmd.y)} `
        break
      case 'Z':
        o += 'z '
        break
    }
  }
  return o.trim()
}

const font = opentype.loadSync(FONT_PATH)
const glyphs = {}

for (const char of CHARS) {
  const glyph = font.charToGlyph(char)
  const path2d = glyph.getPath(0, 0, font.unitsPerEm)
  const bb = glyph.getBoundingBox()

  glyphs[char] = {
    ha: Math.round(glyph.advanceWidth),
    x_min: Math.round(bb.x1),
    x_max: Math.round(bb.x2),
    o: pathToThree(path2d.commands),
  }
}

const result = {
  glyphs,
  familyName: font.names.fontFamily?.en ?? 'BowlbyOneSC',
  ascender: Math.round(font.ascender),
  descender: Math.round(font.descender),
  underlinePosition: Math.round(font.tables.post?.underlinePosition ?? -100),
  underlineThickness: Math.round(font.tables.post?.underlineThickness ?? 50),
  boundingBox: {
    yMin: Math.round(font.tables.head.yMin),
    xMin: Math.round(font.tables.head.xMin),
    yMax: Math.round(font.tables.head.yMax),
    xMax: Math.round(font.tables.head.xMax),
  },
  resolution: font.unitsPerEm,
  original_font_information: font.names,
}

fs.writeFileSync(OUT_PATH, JSON.stringify(result))
console.log(`Written ${OUT_PATH}`)
