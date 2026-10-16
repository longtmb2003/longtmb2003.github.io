// @ts-check

const VI_TRANSLATIONS = {
  "Experience":"Kinh nghiệm",
  "Skills":"Kỹ năng",
  "Hire Me":"Kết nối",
  "Open to new opportunities":"Sẵn sàng cho cơ hội mới",
  "Backend Java Developer":"Lập trình viên Backend Java",
  "I build":"Tôi xây dựng",
  "for large-scale government platforms: authentication and security, event-driven integrations with Kafka and gRPC, and Oracle performance tuning, from schema design to deployment on Kubernetes.":"cho các nền tảng quy mô lớn: xác thực và bảo mật, tích hợp hướng sự kiện với Kafka và gRPC, tối ưu Oracle từ thiết kế schema đến triển khai Kubernetes.",
  "Auth & Security":"Xác thực & Bảo mật",
  "Event-Driven Systems":"Hệ thống hướng sự kiện",
  "Data & Performance":"Dữ liệu & Hiệu năng",
  "OTP login with AES-GCM-encrypted codes, lockout and resend throttling, JWT, and per-group access policies and session timeouts enforced over gRPC.":"Đăng nhập OTP mã hóa AES-GCM, giới hạn khóa và gửi lại, JWT cùng chính sách truy cập và thời hạn phiên theo nhóm được thực thi qua gRPC.",
  "gRPC-to-Kafka pipelines linking command, support and field systems, and Kafka batch jobs coordinated with Redis locks.":"Pipeline gRPC đến Kafka kết nối hệ thống chỉ huy, hỗ trợ và hiện trường; các Kafka batch job được điều phối bằng Redis lock.",
  "Oracle tuning from execution plans, Flyway schema migrations, and REST/gRPC APIs across Oracle, MongoDB and Elasticsearch.":"Tối ưu Oracle từ execution plan, migration schema bằng Flyway và API REST/gRPC trên Oracle, MongoDB cùng Elasticsearch.",
  "Problem":"Bài toán",
  "Solution":"Giải pháp",
  "Key decisions":"Quyết định chính",
  "Incident-Event Pipeline":"Pipeline sự kiện sự cố",
  "Organisation-Tree Query Tuning":"Tối ưu truy vấn cây tổ chức",
  "OTP Login & Access Policies":"Đăng nhập OTP & Chính sách truy cập",
  "Backup & Restore Engine":"Bộ máy sao lưu & Khôi phục",
  "Multi-Level RBAC & Incident Operations":"RBAC đa cấp & Điều hành sự cố",
  "Citizen Enforcement Services":"Dịch vụ xử lý vi phạm công dân",
  "Public-Safety Command Platform":"Nền tảng chỉ huy an ninh công cộng",
  "Enterprise Notification Platform":"Nền tảng thông báo doanh nghiệp",
  "Smart-Camera Traffic Enforcement":"Xử lý vi phạm qua camera thông minh",
  "Professional tools grouped by the role they play in production systems.":"Các công cụ chuyên môn được nhóm theo vai trò trong hệ thống production.",
  "GTEL OTS · Ho Chi Minh City · Intern Sep–Dec 2024, full-time from Jan 2025":"GTEL OTS · TP. Hồ Chí Minh · Thực tập 09–12/2024, chính thức từ 01/2025",
  "Spring Boot microservices for three government platforms: public-safety command (Nov 2024 – now), enterprise notification (Jan 2026 – now) and smart-camera traffic enforcement (Sep 2024 – Feb 2025). Maintained shared gRPC/Feign contracts used by 10+ services, authored 120+ Flyway migrations, and added JUnit 5/Spock tests and OpenAPI documentation. Also resolved React/TypeScript UI defects across the project frontends, including typography, sizing and layout.":"Phát triển microservice Spring Boot cho ba nền tảng chính phủ: chỉ huy an ninh công cộng, thông báo doanh nghiệp và xử lý vi phạm qua camera thông minh. Duy trì contract gRPC/Feign dùng chung cho hơn 10 service, xây dựng hơn 120 Flyway migration, bổ sung kiểm thử JUnit 5/Spock và tài liệu OpenAPI; đồng thời xử lý lỗi giao diện React/TypeScript.",
  "✓ Achieved Jul 5, 2026":"✓ Đạt ngày 05/07/2026",
  "Desktop App Developer":"Lập trình viên ứng dụng Desktop",
  "Windows desktop applications with C# and WinUI, focused on file security tools and media downloaders.":"Ứng dụng Windows bằng C# và WinUI, tập trung vào công cụ bảo mật tệp và tải nội dung đa phương tiện.",
  "B.Eng Information Technology":"Kỹ sư Công nghệ Thông tin",
  "HCMC Open University · Grade: Good":"ĐH Mở TP.HCM · Xếp loại: Khá",
  "About":"Giới thiệu",
  "Achievements":"Thành tựu",
  "Ever wondered what's going on inside my head?":"Bạn có tò mò trong đầu tôi có gì không?",
  "Security":"Bảo mật",
  "Close ×":"Đóng ×",
  "Backend dev in Saigon":"Dev backend ở Sài Gòn",
  "Kafka pipeline builder":"Thợ xây pipeline Kafka",
  "Oracle query tuner":"Thợ tối ưu query Oracle",
  "Started with C# & WinUI":"Khởi đầu với C# & WinUI",
  "Go & Vue on the side":"Go & Vue lúc rảnh",
  "Now studying AWS SAA":"Đang học AWS SAA",
  "And digital marketing":"Và cả digital marketing",
  "Recognition":"Ghi nhận",
  "Currently learning":"Đang học",
  "Capabilities":"Năng lực",
  "SQL (Advanced) · HackerRank":"SQL (Nâng cao) · HackerRank",
  "Academic Excellence Scholarship":"Học bổng Khuyến khích học tập",
  "B.Eng IT · Good":"Kỹ sư CNTT · Khá",
  "Spring Boot microservices":"Microservice Spring Boot",
  "Event-driven integration":"Tích hợp hướng sự kiện",
  "Auth & security":"Xác thực & bảo mật",
  "Oracle performance tuning":"Tối ưu hiệu năng Oracle",
  "Daily craft":"Nghề hằng ngày",
  "Modern Java with Spring Boot is my main craft: domain modelling, persistence, security and service integration for large government platforms.":"Java hiện đại với Spring Boot là nghề chính của tôi: mô hình hoá domain, lưu trữ, bảo mật và tích hợp dịch vụ cho các nền tảng quy mô lớn.",
  "Event pipelines":"Pipeline sự kiện",
  "I build gRPC-to-Kafka pipelines with isolated consumer groups, so command, support and field systems process the same event stream independently.":"Tôi xây pipeline gRPC sang Kafka với các consumer group độc lập để hệ thống chỉ huy, hỗ trợ và hiện trường cùng xử lý một luồng sự kiện.",
  "Oracle tuning":"Tối ưu Oracle",
  "Performance":"Hiệu năng",
  "I read execution plans, reshape queries and manage schemas across relational and document stores until the slow query is no longer slow.":"Tôi đọc execution plan, viết lại query và quản lý schema trên cả CSDL quan hệ lẫn document cho đến khi query chậm hết chậm.",
  "Just started · 2026":"Mới bắt đầu · 2026",
  "I have just started preparing for the AWS Certified Solutions Architect – Associate, to design the cloud side of the systems I build.":"Tôi vừa bắt đầu ôn chứng chỉ AWS Certified Solutions Architect – Associate để thiết kế phần cloud cho những hệ thống mình xây dựng.",
  "A new path outside engineering: I have just started learning digital marketing to understand how products reach and grow their users.":"Một con đường mới ngoài kỹ thuật: tôi vừa bắt đầu học digital marketing để hiểu sản phẩm tiếp cận và phát triển người dùng ra sao.",
  "HackerRank · Jul 2026":"HackerRank · 07/2026",
  "Certified in advanced SQL on HackerRank in July 2026, the same skill I use every day when tuning production queries.":"Đạt chứng chỉ SQL nâng cao trên HackerRank vào tháng 7/2026, kỹ năng tôi dùng mỗi ngày khi tối ưu query production.",
  "Scholarship":"Học bổng",
  "HCMC Open University · Jan 2025":"ĐH Mở TP.HCM · 01/2025",
  "I received an Academic Excellence Scholarship in January 2025 while finishing my B.Eng in Information Technology.":"Tôi nhận Học bổng Khuyến khích học tập vào tháng 1/2025 khi đang hoàn thành chương trình Kỹ sư CNTT.",
  "Auth & access":"Xác thực & phân quyền",
  "Encrypted OTP flows, lockout and resend throttling, JWT and per-group access policies: guarding the entrance is my favourite part of backend work.":"OTP mã hoá, khoá tài khoản và giới hạn gửi lại, JWT và chính sách truy cập theo nhóm: canh giữ cửa ngõ là phần tôi thích nhất trong backend.",
  "Where it began":"Nơi bắt đầu",
  "My first practical chapter was building Windows desktop apps with C# and WinUI: file-security tools and media downloaders.":"Chương thực chiến đầu tiên là xây ứng dụng desktop Windows bằng C# và WinUI: công cụ bảo mật file và tải media.",
  "◆ Unlocked":"◆ Đã mở khoá",
  "SQL (Advanced)":"SQL (Nâng cao)",
  "HackerRank · Certification":"HackerRank · Chứng chỉ",
  "Advanced SQL: joins, window functions and query design.":"SQL nâng cao: join, window function và thiết kế truy vấn.",
  "HCMC Open University":"ĐH Mở TP.HCM",
  "Awarded for academic results during my B.Eng in Information Technology.":"Trao cho kết quả học tập trong chương trình Kỹ sư CNTT.",
  "✓ Awarded Jan 2025":"✓ Nhận 01/2025",
  "Four years of software engineering foundations, 2021 — 2025.":"Bốn năm nền tảng kỹ thuật phần mềm, 2021 — 2025.",
  "✓ Graduated Sep 2025":"✓ Tốt nghiệp 09/2025",
  "Designing resilient, secure and cost-aware architectures on AWS.":"Thiết kế kiến trúc bền vững, bảo mật và tối ưu chi phí trên AWS.",
  "◷ Just started":"◷ Mới bắt đầu",
  "Self-study · New path":"Tự học · Hướng đi mới",
  "How products reach users: content, SEO, ads and analytics.":"Cách sản phẩm đến với người dùng: nội dung, SEO, quảng cáo và phân tích.",
  "Backend Java Developer · Ho Chi Minh City":"Lập trình viên Backend Java · TP. Hồ Chí Minh",
  "Click my head ↑":"Bấm vào đầu tôi ↑",
  "Numbers":"Con số",
  "2+ years experience":"2+ năm kinh nghiệm",
  "1M+ records migrated":"1M+ bản ghi đã migrate",
  "120+ Flyway migrations":"120+ Flyway migration",
  "~300× faster query":"Query nhanh hơn ~300×",
  "Work":"Dự án",
  "Selected":"Những dự án",
  "work":"tiêu biểu",
  "Real systems shown as architecture diagrams, because product screenshots are confidential.":"Hệ thống thật được trình bày bằng sơ đồ kiến trúc, vì ảnh chụp sản phẩm là thông tin bảo mật.",
  "01 · What I do":"01 · Tôi làm gì",
  "02 · What I do":"02 · Tôi làm gì",
  "03 · What I do":"03 · Tôi làm gì",
  "Read the case study":"Đọc case study",
  "Achieve":"Thành",
  "ments":"tựu",
  "Experi":"Kinh",
  "ence":"nghiệm",
  "Tool":"Bộ",
  "box":"công cụ",
  "Certifications and recognition I have earned, and the ones I am working on right now.":"Những chứng chỉ, ghi nhận tôi đã đạt và những mục tiêu đang theo đuổi.",
  "◇ In progress":"◇ Đang thực hiện",
  "Where I have worked and studied.":"Nơi tôi đã làm việc và học tập.",
  "Got a backend problem?":"Có bài toán backend cần giải?",
  "Let's":"Cùng",
  "talk ↗":"trò chuyện ↗",
  "Open to Backend Java roles and systems where engineering quality matters.":"Sẵn sàng cho vị trí Backend Java và những hệ thống coi trọng chất lượng kỹ thuật.",
  "© 2026 Long Tran · Ho Chi Minh City":"© 2026 Long Tran · TP. Hồ Chí Minh",
  "Back to top ↑":"Lên đầu trang ↑",
  "Impact":"Kết quả",
  "Diagnosis":"Chẩn đoán",
  "Scope":"Phạm vi",
  "What I did":"Tôi đã làm",
  "Data":"Dữ liệu",
  "Sep 2024 — now":"09/2024 — nay",
  "Messaging & APIs":"Messaging & API",
  "DevOps & Testing":"DevOps & Kiểm thử",
  "Also: React/TypeScript (UI fixes on project frontends), Go and Vue 3 (personal projects), C#.":"Ngoài ra: React/TypeScript (sửa UI cho frontend dự án), Go và Vue 3 (dự án cá nhân), C#.",
  "Audio: Off 🔈":"Âm thanh: Tắt 🔈",
  "Audio: On 🔊":"Âm thanh: Bật 🔊",
  "Working in Saigon":"Đang làm việc tại Sài Gòn",
  "Open to opportunities":"Sẵn sàng nhận dự án",
  "For inquiries:":"Liên hệ:",
  "Click to unlock ↓":"Bấm để mở nắp đầu ↓",
  "CLICK MY HEAD ↓":"BẤM VÀO ĐẦU TÔI ĐỂ MỞ ↓",
  "Click my head to toggle · Click any memory to read":"Bấm vào đầu để đóng/mở · Bấm vào từng ký ức để xem",
  "BACKEND CRAFTSMAN":"THỢ XÂY BACKEND",
  "SPRING BOOT & KAFKA TAMER":"THUẦN HÓA SPRING BOOT & KAFKA",
  "ORACLE QUERY WHISPERER (~300X FASTER)":"BẬC THẦY TỐI ƯU ORACLE (~300X)",
  "CLUTCHING IN VALORANT, CS:GO & LOL":"CLUTCH TRONG VALORANT, CS:GO & LOL",
  "MISSION-CRITICAL CITIZEN PLATFORMS":"HỆ THỐNG TRỌNG YẾU CHO CÔNG DÂN",
  "HACKERRANK SQL ADVANCED CERTIFIED":"CHỨNG CHỈ SQL NÂNG CAO HACKERRANK",
  "NOW DIVING INTO AWS SAA & MARKETING":"ĐANG CHINH PHỤC AWS SAA & MARKETING",
  "COFFEE-DRIVEN ARCHITECT...":"KIẾN TRÚC SƯ CHẠY BẰNG CÀ PHÊ...",
  "BUILDING HIGH-THROUGHPUT, FAULT-TOLERANT DISTRIBUTED SYSTEMS WITH CLARITY, INTENTION, ARCHITECTURAL RIGOR AND COLLABORATING WITH PASSIONATE ENGINEERS AROUND THE WORLD SINCE 2023.":"XÂY DỰNG CÁC HỆ THỐNG PHÂN TÁN CHỊU TẢI CAO, BỀN VỮNG VỚI TƯ DUY KIẾN TRÚC CHUẨN MỰC VÀ ĐỒNG HÀNH CÙNG CÁC KỸ SƯ NHIỆT HUYẾT TỪ NĂM 2023.",
  "Shipped for & Trusted by:":"Đã triển khai & Đồng hành cùng:",
  "Daily Craft · Core Engine":"Nghề cốt lõi · Engine chính",
  "Event Pipelines · High Throughput":"Pipeline sự kiện · Tải cao",
  "Deep Database Optimization":"Tối ưu sâu cơ sở dữ liệu",
  "Zero-Trust Security · Authentication":"Bảo mật Zero-Trust · Xác thực",
  "Cloud & DevOps · SAA-C03":"Cloud & DevOps · SAA-C03",
  "Competitive gaming":"Game chiến thuật & đồng đội",
  "LoL, Valorant & CS:GO 🎮":"LoL, Valorant & CS:GO 🎮",
  "LoL, Valorant & CS:GO":"LoL, Valorant & CS:GO",
  "SQL (Advanced) Certified":"Chứng chỉ SQL (Nâng cao)",
  "Academic Excellence Scholarship":"Học bổng Khuyến khích học tập",
  "New Path · Product Empathy":"Ngã rẽ mới · Thấu cảm sản phẩm",
  "Digital Marketing & Growth":"Digital Marketing & Tăng trưởng",
  "Where It Began: C# & WinUI":"Nơi bắt đầu: C# & WinUI",
  "Next story →":"Kỷ niệm kế →",
  "‹ Previous":"‹ Kỷ niệm trước",
  "Drag me around":"Kéo thả thẻ bài tự do",
  "Years experience":"Năm kinh nghiệm",
  "Records migrated":"Bản ghi đã migrate",
  "Query speedup":"Tăng tốc truy vấn",
  "Download CV ↓":"Tải CV ↓",
  "Download CV":"Tải CV"
};

class LanguageSwitcherComponent {
  constructor() {
    this.buttons = [...document.querySelectorAll('[data-language]')];
    this.reverse = Object.fromEntries(Object.entries(VI_TRANSLATIONS).map(([en, vi]) => [vi, en]));
    this.language = this.readLanguage();
  }

  readLanguage() {
    const requested = new URLSearchParams(location.search).get('lang');
    if (requested === 'vi' || requested === 'en') return requested;
    try { return localStorage.getItem('long-language') === 'vi' ? 'vi' : 'en'; }
    catch (_) { return 'en'; }
  }

  mount() {
    this.buttons.forEach(button => button.addEventListener('click', () => this.setLanguage(button.dataset.language === 'vi' ? 'vi' : 'en')));
    this.observer = new MutationObserver(records => records.forEach(record => {
      if (record.type === 'characterData') this.translateNode(/** @type {Text} */ (record.target));
      record.addedNodes.forEach(node => this.translateTree(node));
    }));
    this.observer.observe(document.body, { subtree:true, childList:true, characterData:true });
    this.setLanguage(this.language, false);
  }

  /** @param {'vi'|'en'} language @param {boolean} announce */
  setLanguage(language, announce = true) {
    this.language = language;
    document.documentElement.lang = language;
    document.title = language === 'vi' ? 'Long Tran — Lập trình viên Backend Java' : 'Long Tran — Backend Java Developer';
    this.buttons.forEach(button => {
      const active = button.dataset.language === language;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const switcher = document.querySelector('.language-switcher');
    switcher?.setAttribute('aria-label', language === 'vi' ? 'Chọn ngôn ngữ' : 'Language selection');
    this.translateTree(document.body);
    try { localStorage.setItem('long-language', language); } catch (_) { /* storage unavailable */ }
    if (announce) dispatchEvent(new CustomEvent('language:change', { detail:{ language } }));
  }

  /** @param {Node} root */
  translateTree(root) {
    if (root.nodeType === Node.TEXT_NODE) return this.translateNode(/** @type {Text} */ (root));
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) this.translateNode(/** @type {Text} */ (walker.currentNode));
  }

  /** @param {Text} node */
  translateNode(node) {
    const value = node.nodeValue ?? '';
    const text = value.trim();
    if (!text) return;
    const translated = (this.language === 'vi' ? VI_TRANSLATIONS[text] : this.reverse[text]);
    if (translated) node.nodeValue = value.replace(text, translated);
  }
}

new LanguageSwitcherComponent().mount();
