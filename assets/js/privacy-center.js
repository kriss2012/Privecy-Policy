/**
 * Kiri Store - Privacy & Trust Center
 * Interactive Engine: Scrollspy, Search & Highlight, Navigation, Copy Actions, Print, Toast
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DOM REFERENCES
  // ==========================================================================
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('reading-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  // Mobile Nav Drawer
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Mobile TOC Drawer
  const mobileTocToggleBtn = document.getElementById('mobile-toc-toggle-btn');
  const mobileTocDrawer = document.getElementById('mobile-toc-drawer');
  const mobileTocCloseBtn = document.getElementById('mobile-toc-close-btn');
  const mobileTocBackdrop = document.getElementById('mobile-toc-backdrop');
  const mobileTocCurrentLabel = document.getElementById('mobile-toc-current-label');
  const mobileTocLinks = document.querySelectorAll('.mobile-toc-link');

  // Table of Contents & Sections
  const tocLinks = document.querySelectorAll('.toc-link');
  const policySections = document.querySelectorAll('.policy-section');

  // Search System
  const searchInput = document.getElementById('policy-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const searchMetaPill = document.getElementById('search-meta-pill');
  const searchPrevBtn = document.getElementById('search-prev-btn');
  const searchNextBtn = document.getElementById('search-next-btn');

  // Action Buttons
  const copyPolicyUrlBtn = document.getElementById('copy-policy-url-btn');
  const printPolicyBtn = document.getElementById('print-policy-btn');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const anchorCopyBtns = document.querySelectorAll('.anchor-copy-btn');

  let toastTimeout = null;
  let searchMatches = [];
  let currentMatchIndex = -1;

  // ==========================================================================
  // 2. TOAST NOTIFICATION UTILITY
  // ==========================================================================
  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Copy to clipboard helper
  function copyTextToClipboard(text, successMessage) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage);
      }).catch(() => {
        fallbackCopyText(text, successMessage);
      });
    } else {
      fallbackCopyText(text, successMessage);
    }
  }

  function fallbackCopyText(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMessage);
    } catch (err) {
      showToast('Could not copy automatically. Link: ' + text);
    }
    document.body.removeChild(textArea);
  }


  // ==========================================================================
  // 3. READING PROGRESS & HEADER SHADOW
  // ==========================================================================
  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Reading progress calculation
    if (progressBar && docHeight > 0) {
      const scrollPercent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      progressBar.style.width = scrollPercent + '%';
    }

    // Sticky header shadow
    if (header) {
      if (scrollTop > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  // ==========================================================================
  // 4. SCROLLSPY / ACTIVE SECTION TRACKER
  // ==========================================================================
  function setupScrollspy() {
    if (!policySections.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          updateActiveTocLink(currentId);
        }
      });
    }, observerOptions);

    policySections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  function updateActiveTocLink(activeId) {
    tocLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === '#' + activeId) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'true');
        
        // Update mobile TOC current label if present
        if (mobileTocCurrentLabel) {
          const linkText = link.querySelector('span:last-child');
          if (linkText) {
            mobileTocCurrentLabel.textContent = linkText.textContent.trim();
          }
        }
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    mobileTocLinks.forEach((mLink) => {
      const href = mLink.getAttribute('href');
      if (href === '#' + activeId) {
        mLink.classList.add('active');
      } else {
        mLink.classList.remove('active');
      }
    });
  }

  setupScrollspy();


  // ==========================================================================
  // 5. MOBILE DRAWER NAVIGATION
  // ==========================================================================
  function openMobileNav() {
    if (mobileNavBackdrop) {
      mobileNavBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMobileNav() {
    if (mobileNavBackdrop) {
      mobileNavBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', openMobileNav);
  }
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMobileNav);
  }
  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', (e) => {
      if (e.target === mobileNavBackdrop) {
        closeMobileNav();
      }
    });
  }
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });


  // ==========================================================================
  // 6. MOBILE TABLE OF CONTENTS DRAWER
  // ==========================================================================
  function openMobileToc() {
    if (mobileTocBackdrop) {
      mobileTocBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (mobileTocToggleBtn) mobileTocToggleBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMobileToc() {
    if (mobileTocBackdrop) {
      mobileTocBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (mobileTocToggleBtn) mobileTocToggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileTocToggleBtn) {
    mobileTocToggleBtn.addEventListener('click', openMobileToc);
  }
  if (mobileTocCloseBtn) {
    mobileTocCloseBtn.addEventListener('click', closeMobileToc);
  }
  if (mobileTocBackdrop) {
    mobileTocBackdrop.addEventListener('click', (e) => {
      if (e.target === mobileTocBackdrop) {
        closeMobileToc();
      }
    });
  }
  mobileTocLinks.forEach((link) => {
    link.addEventListener('click', closeMobileToc);
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      closeMobileToc();
      clearSearch();
    }
  });


  // ==========================================================================
  // 7. LIVE POLICY SEARCH & HIGHLIGHT
  // ==========================================================================
  function removeSearchHighlights() {
    const highlights = document.querySelectorAll('mark.search-highlight');
    highlights.forEach((mark) => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
    searchMatches = [];
    currentMatchIndex = -1;
  }

  function highlightTermInNode(node, regex) {
    if (node.nodeType === Node.TEXT_NODE) {
      const matches = node.textContent.match(regex);
      if (matches && node.parentNode && !['SCRIPT', 'STYLE', 'BUTTON', 'SVG', 'MARK'].includes(node.parentNode.tagName)) {
        const frag = document.createDocumentFragment();
        let lastIdx = 0;
        let text = node.textContent;
        let match;

        while ((match = regex.exec(text)) !== null) {
          const matchedText = match[0];
          const matchStart = match.index;

          if (matchStart > lastIdx) {
            frag.appendChild(document.createTextNode(text.substring(lastIdx, matchStart)));
          }

          const mark = document.createElement('mark');
          mark.className = 'search-highlight';
          mark.textContent = matchedText;
          frag.appendChild(mark);
          searchMatches.push(mark);

          lastIdx = matchStart + matchedText.length;
        }

        if (lastIdx < text.length) {
          frag.appendChild(document.createTextNode(text.substring(lastIdx)));
        }

        node.parentNode.replaceChild(frag, node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE && !['SCRIPT', 'STYLE', 'BUTTON', 'SVG'].includes(node.tagName)) {
      Array.from(node.childNodes).forEach((child) => highlightTermInNode(child, regex));
    }
  }

  function executeSearch(query) {
    removeSearchHighlights();

    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      if (searchMetaPill) searchMetaPill.style.display = 'none';
      if (searchClearBtn) searchClearBtn.style.display = 'none';
      if (searchPrevBtn) searchPrevBtn.style.display = 'none';
      if (searchNextBtn) searchNextBtn.style.display = 'none';
      return;
    }

    if (searchClearBtn) searchClearBtn.style.display = 'flex';

    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');

    const contentContainer = document.querySelector('.policy-content-article');
    if (contentContainer) {
      highlightTermInNode(contentContainer, regex);
    }

    if (searchMetaPill) {
      searchMetaPill.style.display = 'inline-block';
      if (searchMatches.length > 0) {
        searchMetaPill.textContent = `${searchMatches.length} match${searchMatches.length > 1 ? 'es' : ''}`;
        if (searchPrevBtn) searchPrevBtn.style.display = 'inline-flex';
        if (searchNextBtn) searchNextBtn.style.display = 'inline-flex';
        // Jump to first match
        goToMatch(0);
      } else {
        searchMetaPill.textContent = 'No matches';
        if (searchPrevBtn) searchPrevBtn.style.display = 'none';
        if (searchNextBtn) searchNextBtn.style.display = 'none';
      }
    }
  }

  function goToMatch(index) {
    if (!searchMatches.length) return;
    if (currentMatchIndex >= 0 && searchMatches[currentMatchIndex]) {
      searchMatches[currentMatchIndex].classList.remove('active-match');
    }

    currentMatchIndex = (index + searchMatches.length) % searchMatches.length;
    const target = searchMatches[currentMatchIndex];
    if (target) {
      target.classList.add('active-match');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (searchMetaPill) {
        searchMetaPill.textContent = `${currentMatchIndex + 1} / ${searchMatches.length}`;
      }
    }
  }

  function clearSearch() {
    if (searchInput) {
      searchInput.value = '';
    }
    removeSearchHighlights();
    if (searchMetaPill) searchMetaPill.style.display = 'none';
    if (searchClearBtn) searchClearBtn.style.display = 'none';
    if (searchPrevBtn) searchPrevBtn.style.display = 'none';
    if (searchNextBtn) searchNextBtn.style.display = 'none';
  }

  let searchDebounceTimer = null;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        executeSearch(e.target.value);
      }, 250);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) {
          goToMatch(currentMatchIndex - 1);
        } else {
          goToMatch(currentMatchIndex + 1);
        }
      }
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', clearSearch);
  }
  if (searchPrevBtn) {
    searchPrevBtn.addEventListener('click', () => goToMatch(currentMatchIndex - 1));
  }
  if (searchNextBtn) {
    searchNextBtn.addEventListener('click', () => goToMatch(currentMatchIndex + 1));
  }


  // ==========================================================================
  // 8. INTERACTIVE ACTION HANDLERS
  // ==========================================================================

  // Copy Section Anchor Links
  anchorCopyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = btn.getAttribute('data-target-id');
      const targetUrl = `${window.location.origin}${window.location.pathname}#${sectionId}`;
      copyTextToClipboard(targetUrl, `Section link copied! (#${sectionId})`);
    });
  });

  // Copy Policy URL
  if (copyPolicyUrlBtn) {
    copyPolicyUrlBtn.addEventListener('click', () => {
      copyTextToClipboard(window.location.href, 'Privacy Policy URL copied to clipboard!');
    });
  }

  // Copy Privacy Email
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyTextToClipboard('202krishnapatil@gmail.com', 'Privacy email copied: 202krishnapatil@gmail.com');
    });
  }

  // Print Policy / PDF Export
  if (printPolicyBtn) {
    printPolicyBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Back to Top Smooth Scroll
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

})();
