/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Interactive hard-skill and soft-skill radar charts
   */
  const radarCharts = document.querySelectorAll('[data-radar-type]');
  const radarData = {
    hard: [
      {
        title: 'Office Tools',
        value: 90,
        detail: 'Pemanfaatan aplikasi perkantoran untuk administrasi, pengolahan data, dan pelaporan.',
        details: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Pengolahan laporan dan data']
      },
      {
        title: 'Design Tools',
        value: 95,
        detail: 'Penggunaan tools desain untuk menyusun materi visual dan dokumentasi kerja.',
        details: ['Penyusunan materi visual', 'Pengolahan gambar', 'Dokumentasi presentasi', 'Layout informasi kerja']
      },
      {
        title: 'Networking Tools',
        value: 85,
        detail: 'Tools pendukung untuk pengelolaan jaringan dan troubleshooting konektivitas.',
        details: ['Network diagnostics', 'Konfigurasi konektivitas', 'Monitoring jaringan', 'Troubleshooting jaringan']
      },
      {
        title: 'Programming Tools',
        value: 80,
        detail: 'Pemanfaatan tools pemrograman untuk otomasi dan peningkatan efisiensi proses kerja.',
        details: ['VBA Scripting', 'Virtual Assistant', 'Otomasi entri data', 'Peningkatan efisiensi proses']
      },
      {
        title: 'ERP Tools',
        value: 80,
        detail: 'Pemahaman sistem ERP untuk mendukung alur data dan proses operasional.',
        details: ['SAP S/4HANA', 'Alur entri data ERP', 'Validasi data operasional', 'Pemahaman proses bisnis']
      }
    ],
    soft: [
      {
        title: 'Communication Skills',
        value: 98,
        detail: 'Kemampuan menyampaikan informasi dengan jelas dan membangun koordinasi lintas fungsi.',
        details: ['Komunikasi lintas fungsi', 'Penyampaian informasi', 'Komunikasi publik', 'Membangun hubungan profesional']
      },
      {
        title: 'Problem Solving & Thinking',
        value: 95,
        detail: 'Kemampuan menganalisis masalah dan menentukan solusi yang tepat dalam operasional.',
        details: ['Analisis akar masalah', 'Berpikir kritis', 'Pengambilan keputusan', 'Evaluasi solusi']
      },
      {
        title: 'Teamwork & Interpersonal',
        value: 95,
        detail: 'Kemampuan bekerja sama, membangun kepercayaan, dan menjaga hubungan profesional.',
        details: ['Kolaborasi lintas fungsi', 'Koordinasi tim', 'Membangun kepercayaan', 'Pelayanan profesional']
      },
      {
        title: 'Time & Self Management',
        value: 90,
        detail: 'Kemampuan mengatur prioritas, waktu, tanggung jawab, dan fokus penyelesaian pekerjaan.',
        details: ['Penentuan prioritas', 'Manajemen waktu', 'Disiplin kerja', 'Penyelesaian target']
      },
      {
        title: 'Adaptability',
        value: 92,
        detail: 'Kemampuan beradaptasi terhadap perubahan teknologi, proses, dan kebutuhan operasional.',
        details: ['Adaptasi teknologi', 'Pembelajaran berkelanjutan', 'Fleksibilitas kerja', 'Continuous improvement']
      }
    ]
  };

  radarCharts.forEach((chart) => {
    const type = chart.dataset.radarType;
    const data = radarData[type];
    const center = 210;
    const radius = 150;
    const chartData = data.map((item, index) => ({
      ...item,
      angle: -Math.PI / 2 + (Math.PI * 2 * index / data.length)
    }));
    const gridGroup = chart.querySelector('.radar-grid-group');
    const axisGroup = chart.querySelector('.radar-axis-group');
    const labelGroup = chart.querySelector('.radar-label-group');
    const pointsGroup = chart.querySelector('.radar-points-group');
    const area = chart.querySelector('[data-radar-area]');
    const tooltip = chart.querySelector('[data-radar-tooltip]');

    function pointAt(distance, angle) {
      return {
        x: center + Math.cos(angle) * distance,
        y: center + Math.sin(angle) * distance
      };
    }

    function polygonPoints(distance) {
      return chartData.map(item => {
        const point = pointAt(distance, item.angle);
        return `${point.x},${point.y}`;
      }).join(' ');
    }

    [0.25, 0.5, 0.75, 1].forEach((level, index) => {
      const grid = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      grid.setAttribute('class', `radar-grid${index === 3 ? ' radar-grid-outer' : ''}`);
      grid.setAttribute('points', polygonPoints(radius * level));
      gridGroup.appendChild(grid);
    });

    chartData.forEach((item, index) => {
      const end = pointAt(radius, item.angle);
      const axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      axis.setAttribute('class', 'radar-axis');
      axis.setAttribute('x1', center);
      axis.setAttribute('y1', center);
      axis.setAttribute('x2', end.x);
      axis.setAttribute('y2', end.y);
      axisGroup.appendChild(axis);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      const labelSlots = [
        { x: 210, y: 38, anchor: 'middle' },
        { x: 366, y: 216, anchor: 'end' },
        { x: 300, y: 382, anchor: 'middle' },
        { x: 120, y: 382, anchor: 'middle' },
        { x: 54, y: 216, anchor: 'start' }
      ];
      const labelPoint = labelSlots[index] || { x: 210, y: 38, anchor: 'middle' };
      label.setAttribute('class', 'radar-label');
      label.setAttribute('x', labelPoint.x);
      label.setAttribute('y', labelPoint.y);
      label.setAttribute('text-anchor', labelPoint.anchor);
      label.setAttribute('dominant-baseline', 'middle');
      label.textContent = item.title;
      labelGroup.appendChild(label);
    });

    area.setAttribute('points', chartData.map(item => {
      const point = pointAt(radius * item.value / 100, item.angle);
      return `${point.x},${point.y}`;
    }).join(' '));

    chartData.forEach((item, index) => {
      const point = pointAt(radius * item.value / 100, item.angle);
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('class', 'radar-point');
      circle.setAttribute('cx', point.x);
      circle.setAttribute('cy', point.y);
      circle.setAttribute('r', 6);
      circle.setAttribute('tabindex', '0');
      circle.setAttribute('role', 'button');
      circle.setAttribute('aria-label', `${item.title} ${item.value}%`);
      pointsGroup.appendChild(circle);

      function showTooltip() {
        pointsGroup.querySelectorAll('.radar-point').forEach(pointElement => pointElement.classList.remove('is-active'));
        circle.classList.add('is-active');
        tooltip.innerHTML = `<strong>${item.title}</strong><span>${item.value}%</span><small>${item.detail}</small><ul>${item.details.map(detail => `<li>${detail}</li>`).join('')}</ul>`;
        tooltip.classList.add('is-visible');
      }

      function hideTooltip() {
        if (!circle.hasAttribute('data-locked')) {
          circle.classList.remove('is-active');
          tooltip.classList.remove('is-visible');
        }
      }

      circle.addEventListener('mouseenter', showTooltip);
      circle.addEventListener('mouseleave', hideTooltip);
      circle.addEventListener('focus', showTooltip);
      circle.addEventListener('blur', hideTooltip);
      circle.addEventListener('click', () => {
        const locked = circle.hasAttribute('data-locked');
        pointsGroup.querySelectorAll('.radar-point').forEach(pointElement => pointElement.removeAttribute('data-locked'));
        if (!locked) circle.setAttribute('data-locked', 'true');
        showTooltip();
        if (locked) hideTooltip();
      });
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();