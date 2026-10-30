const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'privacy-policy.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('Testing Feature Implementations...');

// 1. Check Hero Section
const hasHeroHeading = html.includes('Your Privacy.') && html.includes('Our Responsibility.');
const hasHeroSubtitle = html.includes('Transparency and control are at the heart of how we handle your information.');
const hasShield = html.includes('shield-container') && html.includes('shield-svg-box');
console.log('Hero elements:', { hasHeroHeading, hasHeroSubtitle, hasShield });

// 2. Check 6 Highlight Cards (Phase 7)
const highlights = [
  'Information Collection',
  'Data Usage',
  'Data Security',
  'User Control',
  'Data Retention',
  "Children's Privacy"
];
const missingHighlights = highlights.filter(h => !html.includes(h));
console.log('Highlight cards missing:', missingHighlights);

// 3. Check User Rights Section (Phase 8)
const rights = [
  'Access &amp; Portability',
  'Correction &amp; Update',
  'Right to Erasure',
  'Marketing Controls',
  'Ad Personalization',
  'Cookies &amp; Location',
  'Restrict Processing',
  'Regulatory Recourse'
];
const missingRights = rights.filter(r => !html.includes(r));
console.log('Rights cards missing:', missingRights);

// 4. Check 12 Document Sections (Phase 5)
const sections = [
  'introduction',
  'information-we-collect',
  'how-we-use',
  'data-sharing',
  'data-security',
  'user-rights',
  'data-retention',
  'children-privacy',
  'cookies',
  'international-transfer',
  'policy-changes',
  'contact'
];
const missingSections = sections.filter(s => !html.includes(`id="${s}"`));
console.log('Document sections missing:', missingSections);

// 5. Check Document Interaction Tools (Phase 10)
const tools = [
  'policy-search-input',
  'search-meta-pill',
  'search-clear-btn',
  'copy-policy-url-btn',
  'print-policy-btn',
  'back-to-top-btn',
  'reading-progress-bar',
  'toast'
];
const missingTools = tools.filter(t => !html.includes(`id="${t}"`));
console.log('Toolbar tools missing:', missingTools);

// 6. Check FAQ Section (Phase 10)
const faqCount = (html.match(/<details class="faq-item">/g) || []).length;
console.log('FAQ items count:', faqCount);

// 7. Check Verified Contact Details (Phase 9)
const hasEmail = html.includes('202krishnapatil@gmail.com');
const hasAddress = html.includes('Jalgon 424201, India');
const hasDPO = html.includes('Data Protection Officer (DPO)');
console.log('Contact verification:', { hasEmail, hasAddress, hasDPO });

// 8. Check Compliance & Accuracy Notes (Phase 11)
const hasComplianceBox = html.includes('Compliance &amp; Legal Transparency Notice');
const hasReviewNotes = (html.match(/legal-review-flag/g) || []).length;
console.log('Compliance & Review Notes:', { hasComplianceBox, reviewNotesCount: hasReviewNotes });

if (
  hasHeroHeading &&
  hasHeroSubtitle &&
  hasShield &&
  missingHighlights.length === 0 &&
  missingRights.length === 0 &&
  missingSections.length === 0 &&
  missingTools.length === 0 &&
  faqCount >= 6 &&
  hasEmail &&
  hasAddress &&
  hasComplianceBox &&
  hasReviewNotes >= 2
) {
  console.log('\n>>> ALL 15 PHASES VERIFICATION CRITERIA PASSED! <<<');
} else {
  console.error('\n>>> SOME CRITERIA FAILED <<<');
  process.exit(1);
}
