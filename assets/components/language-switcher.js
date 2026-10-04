// @ts-check

const VI_TRANSLATIONS = {
  'The developer\'s cultivation realm':'Tiên cảnh của một lập trình viên',
  'Path of the Backend Cultivator':'Con đường tu luyện Backend',
  'Enter an interactive mountain realm and uncover my story, skills and production systems one chapter at a time.':'Bước vào tiên sơn tương tác và khám phá câu chuyện, kỹ năng cùng những hệ thống production của tôi qua từng chương.',
  'Play · Enter realm':'Bắt đầu · Nhập cảnh',
  'Soundless journey · progress is remembered':'Hành trình tĩnh lặng · tiến độ được ghi nhớ',
  'Realm Map':'Bản đồ tiên cảnh', 'Projects':'Dự án', 'Experience':'Kinh nghiệm', 'Skills':'Kỹ năng', 'Hire Me':'Kết nối',
  'Open to new opportunities':'Sẵn sàng cho cơ hội mới',
  'Backend Java Developer':'Lập trình viên Backend Java', 'Spring Boot Engineer':'Kỹ sư Spring Boot', 'Kafka · gRPC Integrator':'Tích hợp Kafka · gRPC',
  'I build':'Tôi xây dựng',
  'for large-scale government platforms: authentication and security, event-driven integrations with Kafka and gRPC, and Oracle performance tuning, from schema design to deployment on Kubernetes.':'cho các nền tảng quy mô lớn: xác thực và bảo mật, tích hợp hướng sự kiện với Kafka và gRPC, tối ưu Oracle từ thiết kế schema đến triển khai Kubernetes.',
  'Contact Me':'Liên hệ', 'View Projects':'Xem dự án', 'Years Experience':'Năm kinh nghiệm', 'Records Migrated':'Bản ghi đã migrate', 'Flyway Migrations':'Flyway migration',
  'Cultivation Realm':'Tiên cảnh tu luyện', 'Choose a':'Chọn một', 'mountain.':'ngọn núi.', 'Awaken a':'Đánh thức một', 'realm.':'bí cảnh.',
  'Each summit opens a different part of my journey. Hover to inspect a realm, then select it to travel there.':'Mỗi đỉnh núi mở ra một phần hành trình. Di chuột để quan sát, sau đó chọn để tiến vào bí cảnh.',
  'Six paths orbit one story. Read the celestial atlas, then open a realm to uncover its chapters.':'Sáu con đường xoay quanh một câu chuyện. Hãy đọc thiên đồ rồi mở từng bí cảnh để khám phá các chương.',
  'Celestial navigator':'La bàn thiên đồ', 'Six paths await':'Sáu con đường đang chờ',
  'Focus a seal to read its path, then enter to reveal the first chapter.':'Hướng vào một pháp ấn để đọc con đường, sau đó tiến vào và mở chương đầu tiên.',
  'Celestial Atlas · 06':'Thiên đồ · 06', 'Portfolio coordinates':'Tọa độ portfolio', 'Path synchronization active':'Linh mạch đang đồng bộ',
  'Unseal the':'Khai mở', 'immortal map.':'tiên đồ.',
  'Follow the spirit veins across six sacred peaks. Every seal opens a chapter of my cultivation journey.':'Theo linh mạch qua sáu ngọn thánh sơn. Mỗi pháp ấn mở ra một chương trong hành trình tu luyện của tôi.',
  'Immortal Sect Map · 06':'Tiên môn đồ · 06', 'Spirit-vein record':'Linh mạch ký', 'Six seals awaiting':'Lục ấn chờ khai',
  'Sect chronicle':'Tiên môn ký', 'The mountain gates await':'Sơn môn đang chờ',
  'Focus a jade seal to read its destiny, then enter the peak to begin cultivating.':'Hướng vào ngọc ấn để xem thiên mệnh, sau đó nhập sơn và bắt đầu tu luyện.',
  'Realm navigator':'La bàn tiên cảnh', 'Begin your journey':'Bắt đầu hành trình', 'Select a glowing mountain to reveal the path hidden within.':'Chọn một ngọn núi phát sáng để mở lối đi đang ẩn giấu.',
  'Foundation Peak':'Trúc Cơ Phong', 'Forge Summit':'Luyện Khí Phong', 'Scripture Peak':'Tàng Kinh Phong', 'Journey Ridge':'Hành Trình Lĩnh', 'Hidden Peak':'Ẩn Phong', 'Ascension Gate':'Phi Thăng Môn',
  'The three backend disciplines at the foundation of my work.':'Ba năng lực Backend tạo nên nền tảng chuyên môn của tôi.',
  'Production systems, architecture decisions and measurable engineering impact.':'Hệ thống production, quyết định kiến trúc và hiệu quả kỹ thuật có thể đo lường.',
  'Languages, frameworks, data stores and infrastructure in my technical arsenal.':'Ngôn ngữ, framework, kho dữ liệu và hạ tầng trong hành trang kỹ thuật của tôi.',
  'Work experience, certifications and the milestones behind my growth.':'Kinh nghiệm, chứng chỉ và các cột mốc trong hành trình phát triển của tôi.',
  'Side paths, experiments and technologies I explore beyond the main road.':'Những lối rẽ, thử nghiệm và công nghệ tôi khám phá ngoài con đường chính.',
  'Open the final gate to contact me and start a new collaboration.':'Mở cánh cổng cuối để liên hệ và bắt đầu một hành trình hợp tác mới.',
  'What I Do':'Năng lực', 'Experiments':'Thử nghiệm', 'Contact':'Liên hệ',
  'Backend systems,':'Hệ thống Backend,', 'done properly.':'được xây đúng cách.',
  'Three areas I work in every day, on large-scale platforms that serve organisations and citizens.':'Ba lĩnh vực tôi làm việc mỗi ngày trên các nền tảng quy mô lớn phục vụ tổ chức và người dân.',
  'Auth & Security':'Xác thực & Bảo mật', 'Event-Driven Systems':'Hệ thống hướng sự kiện', 'Data & Performance':'Dữ liệu & Hiệu năng',
  'OTP login with AES-GCM-encrypted codes, lockout and resend throttling, JWT, and per-group access policies and session timeouts enforced over gRPC.':'Đăng nhập OTP mã hóa AES-GCM, giới hạn khóa và gửi lại, JWT cùng chính sách truy cập và thời hạn phiên theo nhóm được thực thi qua gRPC.',
  'gRPC-to-Kafka pipelines linking command, support and field systems, and Kafka batch jobs coordinated with Redis locks.':'Pipeline gRPC đến Kafka kết nối hệ thống chỉ huy, hỗ trợ và hiện trường; các Kafka batch job được điều phối bằng Redis lock.',
  'Oracle tuning from execution plans, Flyway schema migrations, and REST/gRPC APIs across Oracle, MongoDB and Elasticsearch.':'Tối ưu Oracle từ execution plan, migration schema bằng Flyway và API REST/gRPC trên Oracle, MongoDB cùng Elasticsearch.',
  'Forge Summit · Projects':'Luyện Khí Phong · Dự án', 'Production':'Các tạo tác', 'artifacts.':'production.',
  'Real systems presented as engineering artifacts and formation-like architecture diagrams because product screenshots are confidential.':'Các hệ thống thực tế được trình bày như tạo tác kỹ thuật và sơ đồ kiến trúc dạng pháp trận vì ảnh sản phẩm cần được bảo mật.',
  'Inspect artifact':'Khám phá tạo tác', 'Problem':'Bài toán', 'Solution':'Giải pháp', 'Key decisions':'Quyết định chính', 'Result':'Kết quả',
  'Incident-Event Pipeline':'Pipeline sự kiện sự cố', 'Organisation-Tree Query Tuning':'Tối ưu truy vấn cây tổ chức',
  'OTP Login & Access Policies':'Đăng nhập OTP & Chính sách truy cập', 'Backup & Restore Engine':'Bộ máy sao lưu & Khôi phục',
  'Multi-Level RBAC & Incident Operations':'RBAC đa cấp & Điều hành sự cố', 'Citizen Enforcement Services':'Dịch vụ xử lý vi phạm công dân',
  'Public-Safety Command Platform':'Nền tảng chỉ huy an ninh công cộng', 'Enterprise Notification Platform':'Nền tảng thông báo doanh nghiệp',
  'Smart-Camera Traffic Enforcement':'Xử lý vi phạm qua camera thông minh',
  'Scripture Peak · Skills':'Tàng Kinh Phong · Kỹ năng', 'Cultivated':'Các kỹ thuật', 'techniques.':'đã tu luyện.',
  'Professional tools grouped by the role they play in production systems.':'Các công cụ chuyên môn được nhóm theo vai trò trong hệ thống production.',
  'Journey Ridge · Experience':'Hành Trình Lĩnh · Kinh nghiệm', 'Cultivation':'Nhật ký', 'log.':'tu luyện.',
  'GTEL OTS · Ho Chi Minh City · Intern Sep–Dec 2024, full-time from Jan 2025':'GTEL OTS · TP. Hồ Chí Minh · Thực tập 09–12/2024, chính thức từ 01/2025',
  'Spring Boot microservices for three government platforms: public-safety command (Nov 2024 – now), enterprise notification (Jan 2026 – now) and smart-camera traffic enforcement (Sep 2024 – Feb 2025). Maintained shared gRPC/Feign contracts used by 10+ services, authored 120+ Flyway migrations, and added JUnit 5/Spock tests and OpenAPI documentation. Also resolved React/TypeScript UI defects across the project frontends, including typography, sizing and layout.':'Phát triển microservice Spring Boot cho ba nền tảng chính phủ: chỉ huy an ninh công cộng, thông báo doanh nghiệp và xử lý vi phạm qua camera thông minh. Duy trì contract gRPC/Feign dùng chung cho hơn 10 service, xây dựng hơn 120 Flyway migration, bổ sung kiểm thử JUnit 5/Spock và tài liệu OpenAPI; đồng thời xử lý lỗi giao diện React/TypeScript.',
  'Certification':'Chứng chỉ', '✓ Achieved Jul 5, 2026':'✓ Đạt ngày 05/07/2026', 'Desktop App Developer':'Lập trình viên ứng dụng Desktop',
  'Windows desktop applications with C# and WinUI, focused on file security tools and media downloaders.':'Ứng dụng Windows bằng C# và WinUI, tập trung vào công cụ bảo mật tệp và tải nội dung đa phương tiện.',
  'B.Eng Information Technology':'Kỹ sư Công nghệ Thông tin', 'HCMC Open University · Grade: Good':'Đại học Mở TP.HCM · Xếp loại: Khá',
  '🏆 Academic Excellence Scholarship — Jan 2025':'🏆 Học bổng Khuyến khích học tập — 01/2025',
  'Ascension Gate · Transmission':'Phi Thăng Môn · Truyền tin', 'Ready to enter the':'Sẵn sàng bước vào', 'next realm?':'cảnh giới tiếp theo?',
  'Let\'s build something reliable and worth cultivating. Open to Backend Java roles and systems where engineering quality matters.':'Hãy cùng xây dựng một sản phẩm đáng tin cậy và đáng đầu tư lâu dài. Tôi sẵn sàng với các vị trí Backend Java và hệ thống đề cao chất lượng kỹ thuật.',
  'Send a Transmission':'Gửi lời nhắn',
  'Current path':'Hành trình hiện tại', 'Chapter':'Chương', 'Previous clue':'Manh mối trước', 'Continue journey':'Tiếp tục hành trình', 'Return to realm map':'Trở về bản đồ',
  'Use ← → to explore · Progress is remembered on this device':'Dùng ← → để khám phá · Tiến độ được lưu trên thiết bị này',
  'Realm details':'Chi tiết bí cảnh', 'Trailhead':'Khởi hành', 'Qi Gathering':'Luyện Khí', 'Foundation':'Trúc Cơ', 'Core Formation':'Kim Đan', 'Realm mastered':'Viên Mãn',
  'Realm status':'Trạng thái cảnh giới', '◉ Realm status':'◉ Trạng thái cảnh giới', 'Currently exploring':'Đang khám phá', 'Currently cultivating':'Đang tu luyện',
  'Qi Gathering · I':'Luyện Khí · I', 'Foundation · II':'Trúc Cơ · II',
  'Golden Core · III':'Kim Đan · III', 'Nascent Soul · IV':'Nguyên Anh · IV',
  'Realm Mastered · V':'Viên Mãn · V',
  'Distributed Systems':'Hệ thống phân tán',
  'Paths beyond the main road':'Những lối đi ngoài chính đạo',
  'A quieter summit for side explorations that broaden how I understand complete software products.':'Một đỉnh núi tĩnh lặng dành cho những thử nghiệm giúp tôi hiểu sản phẩm phần mềm toàn diện hơn.',
  'Learning beyond the primary stack':'Học hỏi ngoài công nghệ chủ lực',
  'Java is my professional core, but I use personal experiments to explore other ways of designing services and developer experiences.':'Java là năng lực chuyên môn cốt lõi, nhưng tôi dùng các thử nghiệm cá nhân để khám phá thêm cách thiết kế dịch vụ và trải nghiệm lập trình viên.',
  'Side path':'Lối rẽ', 'Interface perspective':'Góc nhìn giao diện', 'Open laboratory':'Phòng thử nghiệm mở',
  'Continue journey →':'Tiếp tục hành trình →', '← Previous clue':'← Manh mối trước', 'Return to realm map ✓':'Trở về bản đồ ✓',
  'Backend foundations':'Nền tảng Backend',
  'Follow the trail to discover how I turn complex requirements into dependable systems.':'Theo dấu hành trình để khám phá cách tôi biến yêu cầu phức tạp thành hệ thống đáng tin cậy.',
  'A builder behind the interface':'Người xây dựng phía sau giao diện',
  'I am Long Tran, a Backend Java Developer in Ho Chi Minh City. I enjoy the invisible engineering that makes products secure, responsive and reliable when real users depend on them.':'Tôi là Long Tran, lập trình viên Backend Java tại TP. Hồ Chí Minh. Tôi yêu thích phần kỹ thuật phía sau giúp sản phẩm bảo mật, phản hồi nhanh và đáng tin cậy với người dùng thực tế.',
  'Guard the entrance':'Bảo vệ lối vào',
  'My security work includes encrypted OTP flows, lockout and resend throttling, JWT authentication and organisation-aware access policies.':'Công việc bảo mật của tôi gồm luồng OTP mã hóa, khóa và giới hạn gửi lại, xác thực JWT cùng chính sách truy cập theo tổ chức.',
  'Let events find their path':'Để sự kiện tự tìm đường',
  'I build gRPC-to-Kafka pipelines with isolated consumers, resilient batch processing and Redis-backed coordination so services can evolve independently.':'Tôi xây dựng pipeline gRPC đến Kafka với consumer độc lập, batch có khả năng phục hồi và điều phối bằng Redis để các service phát triển riêng biệt.',
  'Make data move lightly':'Giúp dữ liệu vận hành nhẹ nhàng',
  'I inspect execution plans, reshape queries and manage schemas across relational and document stores. One organisation-tree query fell from roughly 120 seconds to 0.4 seconds.':'Tôi phân tích execution plan, tối ưu truy vấn và quản lý schema trên cả cơ sở dữ liệu quan hệ lẫn document. Một truy vấn cây tổ chức đã giảm từ khoảng 120 giây xuống 0,4 giây.',
  'Systems forged in production':'Các hệ thống được tôi luyện trong production',
  'Each chamber reveals a real engineering problem, the approach I took and its outcome.':'Mỗi chương hé lộ một bài toán kỹ thuật thực tế, cách tôi xử lý và kết quả đạt được.',
  'Production is where ideas are tested':'Production là nơi ý tưởng được kiểm chứng',
  'My selected work comes from public-safety, enterprise notification and traffic-enforcement platforms. The details focus on architecture because the product interfaces are confidential.':'Các dự án tiêu biểu đến từ nền tảng an ninh công cộng, thông báo doanh nghiệp và xử lý vi phạm giao thông. Nội dung tập trung vào kiến trúc vì giao diện sản phẩm cần bảo mật.',
  'Incident-event pipeline':'Pipeline sự kiện sự cố',
  'A gRPC intake feeds Kafka consumer groups so command, support and field systems process the same event stream while scaling independently.':'Một đầu vào gRPC cung cấp dữ liệu cho các Kafka consumer group, giúp hệ thống chỉ huy, hỗ trợ và hiện trường xử lý cùng luồng sự kiện nhưng mở rộng độc lập.',
  'OTP and runtime policies':'OTP và chính sách runtime',
  'Encrypted OTP codes, runtime security rules, lockout controls and group-level session policies protect different organisations without hard-coding their behaviour.':'OTP mã hóa, quy tắc bảo mật runtime, kiểm soát khóa và chính sách session theo nhóm bảo vệ nhiều tổ chức mà không hard-code hành vi.',
  'Backup and restore engine':'Bộ máy sao lưu và khôi phục',
  'Cross-store encrypted backups run as Kafka batches with Redis locks, retry policies and MinIO archives. The flow is designed to recover cleanly after partial failure.':'Sao lưu mã hóa đa kho dữ liệu chạy theo Kafka batch với Redis lock, retry policy và lưu trữ MinIO; luồng được thiết kế để phục hồi sạch sau lỗi một phần.',
  'City-scale integration':'Tích hợp quy mô thành phố',
  'Penalty, licence-plate and payment services connect through shared contracts to a smart-camera network, while permission scopes follow central, province and district levels.':'Các dịch vụ xử phạt, biển số và thanh toán kết nối qua contract dùng chung với mạng camera thông minh; quyền truy cập tuân theo cấp trung ương, tỉnh và quận huyện.',
  'Technical scriptures':'Kinh thư kỹ thuật',
  'Open one scroll at a time to see the tools I use across the whole delivery path.':'Mở từng cuộn kinh để xem các công cụ tôi sử dụng trên toàn bộ hành trình phát triển.',
  'Java and Spring':'Java và Spring',
  'My main craft is modern Java with Spring Boot, from domain modelling and persistence to authentication and service integration.':'Năng lực cốt lõi của tôi là Java hiện đại với Spring Boot, từ mô hình domain và persistence đến xác thực và tích hợp service.',
  'Messaging and APIs':'Messaging và API',
  'I connect services through asynchronous events and strongly defined contracts, choosing the style that fits the reliability and latency requirements.':'Tôi kết nối service qua sự kiện bất đồng bộ và contract rõ ràng, lựa chọn cách thức phù hợp với yêu cầu độ tin cậy và độ trễ.',
  'Data systems':'Hệ thống dữ liệu',
  'I work across transactional, document, cache, search and object-storage systems rather than forcing every problem into one database.':'Tôi làm việc với hệ thống transaction, document, cache, search và object storage thay vì ép mọi bài toán vào một cơ sở dữ liệu.',
  'DevOps and testing':'DevOps và kiểm thử',
  'Repeatable migrations, automated tests and container delivery help the code remain trustworthy after it leaves my machine.':'Migration lặp lại được, kiểm thử tự động và triển khai container giúp mã nguồn vẫn đáng tin cậy sau khi rời máy phát triển.',
  'The path behind the craft':'Hành trình phía sau chuyên môn',
  'Walk through the milestones that shaped how I approach software engineering today.':'Khám phá những cột mốc đã định hình cách tôi tiếp cận kỹ nghệ phần mềm hôm nay.',
  'Learning the foundations':'Học những nền tảng đầu tiên',
  'I earned a B.Eng in Information Technology from HCMC Open University with a Good classification and received an Academic Excellence Scholarship in January 2025.':'Tôi tốt nghiệp Kỹ sư Công nghệ Thông tin tại Đại học Mở TP.HCM loại Khá và nhận Học bổng Khuyến khích học tập vào tháng 01/2025.',
  'The first practical chapter':'Chương thực hành đầu tiên',
  'At IO STREAM I built Windows desktop applications with C# and WinUI, focusing on file-security tools and media utilities.':'Tại IO STREAM, tôi phát triển ứng dụng Windows bằng C# và WinUI, tập trung vào công cụ bảo mật tệp và tiện ích đa phương tiện.',
  'At GTEL OTS I work on Spring Boot microservices for public-safety command, notification and traffic-enforcement platforms, moving from intern to full-time engineer in January 2025.':'Tại GTEL OTS, tôi phát triển microservice Spring Boot cho các nền tảng chỉ huy an ninh, thông báo và xử lý vi phạm giao thông; từ thực tập sinh trở thành kỹ sư chính thức vào tháng 01/2025.',
  'Learning never stops':'Học tập không bao giờ dừng lại',
  'Understanding the other side':'Hiểu góc nhìn phía bên kia',
  'Fixing React and TypeScript interfaces taught me to see how API choices, loading states and error contracts affect the people using a system.':'Việc sửa giao diện React và TypeScript giúp tôi hiểu lựa chọn API, trạng thái tải và quy ước lỗi ảnh hưởng thế nào đến người dùng hệ thống.',
  'Small experiments, practical lessons':'Thử nghiệm nhỏ, bài học thực tế',
  'This realm stays intentionally open: a place to test focused ideas, compare approaches and carry useful lessons back into production backend work.':'Bí cảnh này luôn rộng mở để thử nghiệm ý tưởng, so sánh cách tiếp cận và mang những bài học hữu ích trở lại công việc Backend production.',
  'Open a new path':'Mở một con đường mới',
  'The final gate is an invitation to build something dependable together.':'Cánh cổng cuối là lời mời cùng nhau xây dựng một sản phẩm đáng tin cậy.',
  'The work I am seeking':'Công việc tôi đang tìm kiếm',
  'I am open to Backend Java roles and collaborations where reliability, security and thoughtful system design genuinely matter.':'Tôi sẵn sàng với vị trí Backend Java và các cơ hội hợp tác coi trọng độ tin cậy, bảo mật cùng thiết kế hệ thống có chiều sâu.',
  'Clear paths, steady progress':'Con đường rõ ràng, tiến bộ vững chắc',
  'I value direct communication, measurable outcomes and engineering decisions that remain understandable to the next person maintaining the system.':'Tôi coi trọng giao tiếp thẳng thắn, kết quả đo lường được và quyết định kỹ thuật dễ hiểu với người tiếp quản hệ thống.',
  'Choose a way to connect':'Chọn một cách để kết nối',
  'Send a message through whichever path is most convenient. I will be happy to learn about your team and the problem you are solving.':'Hãy gửi lời nhắn qua kênh thuận tiện nhất. Tôi rất sẵn lòng tìm hiểu về đội ngũ và bài toán bạn đang giải quyết.'
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
    const translated = (this.language === 'vi' ? VI_TRANSLATIONS[text] : this.reverse[text]) ?? this.translatePattern(text);
    if (translated) node.nodeValue = value.replace(text, translated);
  }

  /** @param {string} text */
  translatePattern(text) {
    const chapter = this.language === 'vi'
      ? text.match(/^Chapter (\d+) \/ (\d+)$/)
      : text.match(/^Chương (\d+) \/ (\d+)$/);
    if (chapter) return `${this.language === 'vi' ? 'Chương' : 'Chapter'} ${chapter[1]} / ${chapter[2]}`;

    const activity = this.language === 'vi'
      ? text.match(/^Currently exploring · (.+)$/)
      : text.match(/^Đang khám phá · (.+)$/);
    if (activity) {
      const place = this.language === 'vi' ? (VI_TRANSLATIONS[activity[1]] ?? activity[1]) : (this.reverse[activity[1]] ?? activity[1]);
      return `${this.language === 'vi' ? 'Đang khám phá' : 'Currently exploring'} · ${place}`;
    }

    const cultivating = this.language === 'vi'
      ? text.match(/^Currently cultivating · (.+)$/)
      : text.match(/^Đang tu luyện · (.+)$/);
    if (cultivating) {
      const subject = this.language === 'vi' ? (VI_TRANSLATIONS[cultivating[1]] ?? cultivating[1]) : (this.reverse[cultivating[1]] ?? cultivating[1]);
      return `${this.language === 'vi' ? 'Đang tu luyện' : 'Currently cultivating'} · ${subject}`;
    }

    if (this.language === 'vi' && /^Artifact No\. \d+/.test(text)) {
      return text.replace('Artifact No.', 'Tạo tác số').replace('Featured', 'Tiêu biểu');
    }
    if (this.language === 'en' && /^Tạo tác số \d+/.test(text)) {
      return text.replace('Tạo tác số', 'Artifact No.').replace('Tiêu biểu', 'Featured');
    }
    if (this.language === 'vi' && / clues discovered\.$/.test(text)) return text.replace(' clues discovered.', ' manh mối đã khám phá.');
    if (this.language === 'en' && / manh mối đã khám phá\.$/.test(text)) return text.replace(' manh mối đã khám phá.', ' clues discovered.');
    return null;
  }
}

new LanguageSwitcherComponent().mount();
