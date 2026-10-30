const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const componentsCss = fs.readFileSync(path.join(rootDir, 'assets/css/components.css'), 'utf8');
const baseCss = fs.readFileSync(path.join(rootDir, 'assets/css/base.css'), 'utf8');
const variablesCss = fs.readFileSync(path.join(rootDir, 'assets/css/variables.css'), 'utf8');

console.log('--- Checking Responsiveness & Proportions ---');

// 1. Max Page Width: 1440px
const hasMaxPageWidth = variablesCss.includes('--container-max-width: 1440px;');
console.log('1. Max Page Width 1440px:', hasMaxPageWidth);

// 2. Padding breakpoints
const hasPaddingMobile = baseCss.includes('padding-left: 20px') || baseCss.includes('padding-left: 16px');
const hasPaddingTablet = baseCss.includes('padding-left: 32px');
const hasPaddingDesktop = baseCss.includes('padding-left: 48px');
const hasPaddingWide = baseCss.includes('padding-left: 64px');
console.log('2. Standardized Padding System:', { hasPaddingMobile, hasPaddingTablet, hasPaddingDesktop, hasPaddingWide });

// 3. Brand text wrapping prevention
const hasNoWrapTitle = componentsCss.includes('.brand-title') && componentsCss.includes('white-space: nowrap;');
const hasNoWrapSubtitle = componentsCss.includes('.brand-subtitle') && componentsCss.includes('white-space: nowrap;');
console.log('3. Brand text nowrap prevention:', { hasNoWrapTitle, hasNoWrapSubtitle });

// 4. View Policy CTA Button proportions
const hasBtnHeight = componentsCss.includes('height: 40px') || componentsCss.includes('height: 42px') || componentsCss.includes('height: 48px');
const hasBtnNoWrap = componentsCss.includes('.nav-cta-btn') && componentsCss.includes('white-space: nowrap;');
const hasBtnRadius = componentsCss.includes('.nav-cta-btn') && componentsCss.includes('border-radius: var(--radius-md);');
console.log('4. View Policy CTA proportions:', { hasBtnHeight, hasBtnNoWrap, hasBtnRadius });

// 5. Hamburger Menu proportions
const hasMenuSize = componentsCss.includes('.menu-toggle-btn') && componentsCss.includes('width: 42px;') && componentsCss.includes('height: 42px;');
console.log('5. Hamburger Menu proportions:', { hasMenuSize });

// 6. Search Bar proportions
const hasSearchHeight = componentsCss.includes('.policy-search-input') && componentsCss.includes('height: 50px;');
const hasSearchMaxW = componentsCss.includes('max-width: 1100px;');
console.log('6. Search Bar proportions:', { hasSearchHeight, hasSearchMaxW });

// 7. Floating Scroll-to-Top position
const hasBackToTopRight = componentsCss.includes('.back-to-top-btn') && componentsCss.includes('right: 2rem;');
const hasBackToTopDimensions = componentsCss.includes('width: 46px;') && componentsCss.includes('height: 46px;');
console.log('7. Scroll-to-Top Button bottom-right:', { hasBackToTopRight, hasBackToTopDimensions });

// 8. Hero proportions
const hasHeroMaxW = componentsCss.includes('max-width: 1200px;');
const hasHeroClamp = componentsCss.includes('font-size: clamp(2rem, 3.8vw, 2.85rem);');
const hasShieldSize = componentsCss.includes('width: 220px;') && componentsCss.includes('height: 220px;');
console.log('8. Hero Section Proportions:', { hasHeroMaxW, hasHeroClamp, hasShieldSize });

if (
  hasMaxPageWidth &&
  hasPaddingMobile &&
  hasPaddingTablet &&
  hasPaddingDesktop &&
  hasPaddingWide &&
  hasNoWrapTitle &&
  hasNoWrapSubtitle &&
  hasBtnHeight &&
  hasBtnNoWrap &&
  hasBtnRadius &&
  hasMenuSize &&
  hasSearchHeight &&
  hasSearchMaxW &&
  hasBackToTopRight &&
  hasBackToTopDimensions &&
  hasHeroMaxW &&
  hasHeroClamp &&
  hasShieldSize
) {
  console.log('\n>>> ALL RESPONSIVE & PROPORTION TESTS PASSED! <<<');
} else {
  console.error('\n>>> SOME TESTS FAILED <<<');
  process.exit(1);
}

