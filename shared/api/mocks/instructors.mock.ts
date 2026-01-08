import { CourseDetails } from '@/shared/types/course';

const UPDATED_INSTRUCTORS: Record<
  string,
  {
    id: string;
    fullName: string;
    competencies: string[];
  }[]
> = {
  '1': [
    // React Native курс
    {
      id: '1',
      fullName: 'Алексей Иванов',
      competencies: [
        'Senior Mobile Developer с 8+ лет опыта',
        'Разработал 15+ приложений с суммарно 5 млн загрузок',
        'Технический лидер команды из 6 разработчиков в Яндексе',
        'Спикер конференций React Native EU и MobiConf',
      ],
    },
    {
      id: '2',
      fullName: 'Мария Петрова',
      competencies: [
        'Backend Architect в IT-компании топ-100',
        'Оптимизировала API, снизив время отклика на 60%',
        'Автор 20+ статей на Habr по Node.js',
        'Сертификат AWS Solutions Architect Professional',
      ],
    },
  ],
  '2': [
    // Digital-маркетинг
    {
      id: '3',
      fullName: 'Дмитрий Смирнов',
      competencies: [
        'Руководитель отдела digital-маркетинга крупного e-commerce',
        'Увеличил конверсию на 240% за год через комплексную стратегию',
        'Управлял рекламным бюджетом более 50 млн рублей',
        'Эксперт Яндекс и Google по контекстной рекламе',
      ],
    },
  ],
  '3': [
    // Аналитика данных
    {
      id: '4',
      fullName: 'Елена Козлова',
      competencies: [
        'Lead Data Analyst в финтех-стартапе',
        'Построила систему аналитики, обрабатывающую 10 млн записей в день',
        'Докладчик на конференциях Data Fest и HighLoad++',
        'Автор курса по SQL на Stepik с 25 тыс. студентов',
      ],
    },
    {
      id: '5',
      fullName: 'Игорь Новиков',
      competencies: [
        'Data Scientist с опытом в банковском секторе 6+ лет',
        'Разработал ML-модель скоринга с точностью 94%',
        'Кандидат физико-математических наук',
        'Победитель Kaggle competition (топ-3%)',
      ],
    },
    {
      id: '5.1',
      fullName: 'Анна Виноградова',
      competencies: [
        'BI Developer в международной корпорации',
        'Создала 50+ интерактивных дашбордов для топ-менеджмента',
        'Сертифицированный эксперт Tableau и Power BI',
        'Провела обучение аналитике для 200+ сотрудников',
      ],
    },
  ],
  '4': [
    // UI/UX дизайн
    {
      id: '6',
      fullName: 'Анна Соколова',
      competencies: [
        'Lead UX/UI Designer в IT-компании с международными проектами',
        'Редизайн интерфейса увеличил retention на 35%',
        'Разработала дизайн-систему для продукта с 2 млн пользователей',
        'Призёр Awwwards и CSS Design Awards',
      ],
    },
    {
      id: '6.1',
      fullName: 'Михаил Степанов',
      competencies: [
        'Product Designer с фокусом на UX-исследования',
        'Провёл 100+ глубинных интервью и юзабилити-тестов',
        'Работал над продуктами для СберБанка и Тинькофф',
        'Сертификат Nielsen Norman Group по UX Research',
      ],
    },
  ],
  '5': [
    // Frontend-разработка
    {
      id: '7',
      fullName: 'Сергей Волков',
      competencies: [
        'Senior Frontend Developer с 10+ лет коммерческого опыта',
        'Архитектор фронтенда SaaS-платформы с 50 тыс. активных пользователей',
        'Контрибьютор в open-source проекты: Next.js, Zustand',
        'Технический рецензент книги "Advanced React Patterns"',
      ],
    },
  ],
  '6': [
    // Product Management
    {
      id: '9',
      fullName: 'Павел Кузнецов',
      competencies: [
        'Head of Product в стартапе с оценкой $50M',
        'Вывел 3 продукта от идеи до product-market fit',
        'Увеличил выручку продукта с $100K до $3M за 2 года',
        'Спикер конференций ProductSense и Mind The Product',
      ],
    },
    {
      id: '9.1',
      fullName: 'Ольга Соловьева',
      competencies: [
        'Senior Product Manager в EdTech-компании',
        'Построила продуктовую аналитику с нуля для 5 продуктов',
        'Сертификат Product Management от Reforge',
        'Ментор в акселераторе GenerationS',
      ],
    },
    {
      id: '9.2',
      fullName: 'Артём Никитин',
      competencies: [
        'Product Owner в крупной e-commerce платформе',
        'Руководил разработкой функционала с 1M+ DAU',
        'Эксперт по Agile/Scrum, Certified Scrum Product Owner',
        'Внедрил data-driven подход в продуктовую разработку',
      ],
    },
  ],
  '7': [
    // Python backend
    {
      id: '10',
      fullName: 'Андрей Лебедев',
      competencies: [
        'Backend Team Lead с 12+ лет опыта на Python',
        'Спроектировал микросервисную архитектуру для highload (10K RPS)',
        'Оптимизировал базу данных, сократив расходы на инфраструктуру на 40%',
        'Сертификат Python Institute PCPP и AWS',
      ],
    },
    {
      id: '10.1',
      fullName: 'Виктор Громов',
      competencies: [
        'Senior Backend Developer и DevOps-практик',
        'Настроил CI/CD для команды из 20 разработчиков',
        'Докладчик на PyCon Russia и HighLoad++',
        'Автор популярного Telegram-канала о Python (15K подписчиков)',
      ],
    },
  ],
  '8': [
    // Финансовая аналитика
    {
      id: '11',
      fullName: 'Виктория Белова',
      competencies: [
        'Финансовый директор (CFO) в технологической компании',
        'Провела оценку 50+ инвестиционных проектов на сумму $100M+',
        'MBA в финансах, сертификат CFA Level III',
        'Преподаватель финансового моделирования в ВШЭ',
      ],
    },
  ],
  '9': [
    // Machine Learning
    {
      id: '12',
      fullName: 'Дмитрий Орлов',
      competencies: [
        'Lead ML Engineer в AI-лаборатории',
        'Разработал нейросетевую модель с 96% accuracy для компьютерного зрения',
        'Публикации в международных конференциях (CVPR, NeurIPS)',
        'Кандидат технических наук, лектор на Deep Learning School',
      ],
    },
    {
      id: '12.1',
      fullName: 'Ксения Макарова',
      competencies: [
        'ML Engineer с опытом в NLP и Recommendation Systems',
        'Внедрила рекомендательную систему, увеличившую engagement на 45%',
        'Kaggle Grandmaster (топ-200 в мире)',
        'Автор open-source библиотеки по предобработке текстов',
      ],
    },
  ],
  '10': [
    // Fullstack JavaScript
    {
      id: '13',
      fullName: 'Александр Федоров',
      competencies: [
        'Fullstack Technical Lead с 11+ лет разработки',
        'Руководил разработкой платформы с нуля до 100K пользователей',
        'Построил команду из 15 разработчиков с нуля',
        'Спикер на HolyJS и Node.js Moscow Meetup',
      ],
    },
  ],
  '11': [
    // SMM
    {
      id: '15',
      fullName: 'Анастасия Киселева',
      competencies: [
        'Head of SMM в digital-агентстве с портфелем 30+ клиентов',
        'Вырастила комьюнити от 0 до 500K подписчиков за год',
        'Запустила 200+ рекламных кампаний с ROMI выше 300%',
        'Топ-10 SMM-специалистов по версии Sostav.ru',
      ],
    },
    {
      id: '15.1',
      fullName: 'Денис Ковалев',
      competencies: [
        'Performance-маркетолог с фокусом на таргетированную рекламу',
        'Управлял бюджетами 20+ млн рублей в VK Ads и MyTarget',
        'Снизил стоимость лида на 55% через оптимизацию кампаний',
        'Сертифицированный специалист VK Ads и Яндекс.Директ',
      ],
    },
  ],
  '12': [
    // Motion-дизайн
    {
      id: '16',
      fullName: 'Никита Сергеев',
      competencies: [
        'Motion Designer с 8+ лет опыта в рекламе и кино',
        'Создал motion-графику для роликов брендов Samsung, Nike',
        'Работы набрали 50M+ просмотров на YouTube',
        'Победитель фестиваля Promobot в категории Motion Design',
      ],
    },
  ],
  '13': [
    // Тестирование ПО
    {
      id: '17',
      fullName: 'Ирина Васильева',
      competencies: [
        'QA Lead с опытом ручного и автоматизированного тестирования',
        'Построила отдел QA с нуля (команда из 12 тестировщиков)',
        'Внедрила автотесты, сократившие время регресса на 70%',
        'Сертификат ISTQB Advanced Level Test Automation Engineer',
      ],
    },
    {
      id: '17.1',
      fullName: 'Алексей Борисов',
      competencies: [
        'Senior QA Automation Engineer',
        'Разработал фреймворк для автотестирования на Selenium + Python',
        'Покрыл автотестами 85% функциональности продукта',
        'Докладчик на конференциях SQA Days и Heisenbug',
      ],
    },
    {
      id: '17.2',
      fullName: 'Марина Захарова',
      competencies: [
        'Performance & Security Tester',
        'Провела нагрузочное тестирование для систем с нагрузкой до 50K RPS',
        'Выявила критические уязвимости в 10+ продуктах',
        'Сертификаты по JMeter, LoadRunner и OWASP',
      ],
    },
  ],
  '14': [
    // Кибербезопасность
    {
      id: '18',
      fullName: 'Максим Зайцев',
      competencies: [
        'Cybersecurity Consultant и этичный хакер',
        'Провёл пентесты для 40+ компаний из финтеха и госсектора',
        'Выявил и закрыл уязвимости, предотвратив потери на $5M+',
        'Сертификаты CEH, OSCP, CISSP',
      ],
    },
  ],
  '15': [
    // Контент-менеджмент
    {
      id: '19',
      fullName: 'Татьяна Лаврова',
      competencies: [
        'Контент-директор digital-агентства полного цикла',
        'Разработала контент-стратегии для 50+ брендов',
        'Тексты привели к росту органического трафика на 180%',
        'Автор книги "SEO-копирайтинг: от теории к практике"',
      ],
    },
  ],
  '16': [
    // GameDev Unity
    {
      id: '20',
      fullName: 'Владимир Краснов',
      competencies: [
        'Unity Game Developer с портфелио из 8 выпущенных игр',
        'Игры скачали более 3 млн раз в App Store и Google Play',
        'Технический директор indie-студии с оборотом $500K/год',
        'Спикер на конференциях DevGAMM и White Nights',
      ],
    },
  ],
  '17': [
    // Бизнес-аналитика
    {
      id: '22',
      fullName: 'Константин Медведев',
      competencies: [
        'Head of Business Intelligence в ритейл-компании',
        'Построил систему BI-отчётности для 500+ пользователей',
        'Разработал 100+ дашбордов в Power BI для C-level',
        'Сертификаты Microsoft Certified Power BI Data Analyst',
      ],
    },
    {
      id: '22.1',
      fullName: 'Светлана Егорова',
      competencies: [
        'Business Analyst с 7+ лет опыта в IT и банкинге',
        'Провела реинжиниринг 15 бизнес-процессов, снизив издержки на 30%',
        'Сертификат CBAP (Certified Business Analysis Professional)',
        'Преподаватель курса бизнес-анализа в Нетологии',
      ],
    },
  ],
  '18': [
    // DevOps
    {
      id: '23',
      fullName: 'Артем Григорьев',
      competencies: [
        'DevOps Team Lead в highload-проекте с 20M пользователей',
        'Автоматизировал инфраструктуру, сократив время деплоя с 2 часов до 10 минут',
        'Построил Kubernetes-кластер на 100+ нод',
        'Сертификаты CKA (Certified Kubernetes Administrator) и AWS DevOps Professional',
      ],
    },
    {
      id: '23.1',
      fullName: 'Евгений Павлов',
      competencies: [
        'Senior DevOps Engineer и Site Reliability Engineer',
        'Обеспечил uptime 99.99% для критичных сервисов',
        'Внедрил мониторинг и alerting на Prometheus + Grafana',
        'Докладчик на HighLoad++ и DevOps Moscow Meetup',
      ],
    },
  ],
  '19': [
    // 3D-моделирование
    {
      id: '24',
      fullName: 'Дарья Иванова',
      competencies: [
        '3D Artist с 9+ лет опыта в геймдеве и архвизе',
        'Создала 3D-ассеты для 12 игр, включая AAA-проекты',
        'Портфолио с проектами для Unity Asset Store (1000+ продаж)',
        'Работы публиковались на ArtStation (топ-1% по просмотрам)',
      ],
    },
    {
      id: '24.1',
      fullName: 'Роман Белов',
      competencies: [
        'Lead 3D Modeler в рекламном агентстве',
        'Разработал 3D-модели для ТВ-рекламы федеральных брендов',
        'Эксперт по Blender, ZBrush и Substance Painter',
        'Ментор на курсах CG Spectrum и CGMA',
      ],
    },
  ],
  '20': [
    // HR
    {
      id: '25',
      fullName: 'Светлана Попова',
      competencies: [
        'HR Director в IT-компании с штатом 300+ сотрудников',
        'Снизила текучесть кадров с 25% до 8% за год',
        'Построила систему оценки и развития персонала с нуля',
        'Сертификаты SHRM-CP и ICF-сертифицированный коуч',
      ],
    },
  ],
};

// Функция для обновления курсов
export const updateCoursesWithInstructors = (courses: CourseDetails[]): CourseDetails[] => {
  return courses.map((course) => ({
    ...course,
    instructors: UPDATED_INSTRUCTORS[course.id] || course.instructors,
  }));
};

// Применяем обновление
export const MOCK_COURSES = updateCoursesWithInstructors([
  // Вставить сюда весь существующий массив MOCK_COURSES
  // со всеми 20 курсами БЕЗ изменения блоков instructors
]);
