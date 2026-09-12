/* ============================================================
   SITE DATA LAYER
   Single source of truth for all editable content on the site.

   Public pages read this (via content-loader.js) to render
   content. The Admin Panel writes to this to make live edits.

   Storage: browser localStorage, under the key SITE_DATA_KEY.
   ============================================================ */

const SITE_DATA_KEY = 'avinash_site_data_v1';
const SITE_AUTH_KEY = 'avinash_admin_auth_v1';
const SITE_SESSION_KEY = 'avinash_admin_session_v1';


const DEFAULT_SITE_DATA = {

  theme: 'charcoal-orange',

  /* ==========================================================
     SITE / CONTACT
     ========================================================== */

  site: {
    email: 'avinashvishwakarma163@gmail.com',
    whatsapp: '',
    linkedin: 'https://linkedin.com/',
    github: 'https://github.com/',
    leetcode: 'https://leetcode.com/'
  },


  /* ==========================================================
     IMAGES
     ========================================================== */

  images: {
    profile: 'assets/img/Profile Pic.jpeg'
  },


  /* ==========================================================
     HOME
     ========================================================== */

  home: {

    eyebrow: 'CSE Student · Aspiring Software Developer',

    role: 'Software Developer in the making — Web, Python & AI',

    tagline: 'Building ideas into practical digital solutions.',

    stats: [
      {
        value: 8.52,
        decimals: 2,
        suffix: 'CGPA',
        label: 'Current academic CGPA'
      },
      {
        value: 10,
        decimals: 0,
        suffix: '+',
        label: 'Projects completed'
      },
      {
        value: 2,
        decimals: 0,
        suffix: 'nd Yr',
        label: 'CSE undergraduate'
      },
      {
        value: 6,
        decimals: 0,
        suffix: '+',
        label: 'Technical skills in active growth'
      }
    ],

    /*
     * Featured project images
     * Exact filenames from assets/img/projects/
     */

    featured: [

      {
        title: 'Fee Receipt & Tracking System',
        tag: 'Web App',
        glyph: 'FR',
        image: 'assets/img/projects/fees-management.webp'
      },

      {
        title: 'Automated Attendance Monitoring System',
        tag: 'Automation',
        glyph: 'AM',
        image: 'assets/img/projects/Automated Attendance System - A Complete Guide for HR Professionals.webp'
      },

      {
        title: 'Legal Awareness for Common Citizens',
        tag: 'Social Impact',
        glyph: 'LA',
        image: 'assets/img/projects/Legal-Awareness-Campaigns-780x470.webp'
      },

      {
        title: 'AI-Based Fake Identity & Document Screening',
        tag: 'AI / Security',
        glyph: 'AI',
        image: 'assets/img/projects/Fake Identity.webp'
      },

      {
        title: 'Resume Builder',
        tag: 'Web App',
        glyph: 'RB',
        image: 'assets/img/projects/Resume Builder.webp'
      },

      {
        title: 'Other software & AI projects',
        tag: 'More work',
        glyph: '+',
        image: 'assets/img/projects/ai-project-management-software-tools-cover-0ed50-7311-4d8c-ae97-b2e1217af593.webp'
      }

    ]

  },


  /* ==========================================================
     ABOUT
     ========================================================== */

  about: {

    eyebrow: 'About me',

    heading: 'The story behind the code',

    intro: "A bit about how I got into software development, and where I'm headed next.",

    paragraphs: [

      "I'm Avinash Vishwakarma, a Computer Science and Engineering student with a strong interest in technology, programming, and software development. I started my journey by learning programming fundamentals and gradually explored C, Python, Java, HTML, CSS, Data Structures & Algorithms, and Artificial Intelligence.",

      'Over time, I became more interested in building practical projects that solve real-world problems, and started working on academic, personal, and innovation-focused projects.',

      "I enjoy exploring new technologies, solving problems, and continuously improving my technical skills. My mission is to become a skilled software developer and use technology to build useful, innovative, and impactful digital solutions."

    ],

    highlight:
      "I don't just learn technology theoretically — I try to turn what I learn into practical projects and solutions."

  },


  /* ==========================================================
     SERVICES
     ========================================================== */

  services: {

    eyebrow: 'What I do',

    heading: 'Areas I work in',

    intro:
      "These aren't paid services with price tags — they're the technical areas I actively build in and keep improving at.",

    items: [

      {
        id: 'svc-1',
        title: 'Web Development',
        description:
          'Building responsive and modern websites using HTML, CSS, JavaScript, and other web technologies to create clean and user-friendly digital experiences.',
        label: 'Current Focus',
        price: '',
        icon: 'web'
      },

      {
        id: 'svc-2',
        title: 'Python Development',
        description:
          'Developing beginner-to-intermediate Python applications, automation tools, utilities, and practical software solutions.',
        label: 'Intermediate',
        price: '',
        icon: 'python'
      },

      {
        id: 'svc-3',
        title: 'AI & Machine Learning Projects',
        description:
          'Building practical AI-focused projects and prototypes that explore artificial intelligence, automation, document analysis, and intelligent decision-making.',
        label: 'Learning & Development',
        price: '',
        icon: 'ai'
      },

      {
        id: 'svc-4',
        title: 'Programming & DSA Solutions',
        description:
          'Implementing programming solutions using C, Java, Python, and Data Structures & Algorithms, with a focus on logical thinking and problem solving.',
        label: 'Intermediate',
        price: '',
        icon: 'dsa'
      }

    ]

  },


  /* ==========================================================
     ACHIEVEMENTS
     ========================================================== */

  achievements: {

    eyebrow: 'Recognition',

    heading: 'Awards & Achievements',

    intro:
      "A record of the milestones, participation, and recognition I've earned so far along the way.",

    items: [

      {
        id: 'ach-1',
        title: 'Smart India Hackathon 2026 — Project Participation',
        year: '2026',
        by: "Smart India Hackathon / Ministry of Education's Innovation Cell",
        why:
          'Worked on an AI-based solution for the AI-Based Fake Identity & Document Screening System, focusing on using technology to address real-world identity and document fraud challenges.'
      },

      {
        id: 'ach-2',
        title: 'Amrita Devi Foundation — Internship & Social Impact Work',
        year: '2026',
        by: 'Amrita Devi Foundation, in collaboration with NIET',
        why:
          'Completed an internship involving digital outreach, awareness activities, content creation, and social-impact initiatives, gaining practical experience beyond the classroom.'
      },

      {
        id: 'ach-3',
        title: 'Academic Achievement — 8.52 CGPA',
        year: '2026',
        by: 'NIET',
        why:
          'Maintained an 8.52 CGPA during my Computer Science and Engineering journey, demonstrating consistent academic performance while developing technical skills and working on projects.'
      }

    ]

  },


  /* ==========================================================
     CERTIFICATIONS
     ========================================================== */

  certifications: {

    eyebrow: 'Certifications',

    heading: 'Courses & Certifications',

    intro:
      'Certificates earned through self-paced learning and structured courses.',

    items: [

      {
        id: 'cert-1',
        title: 'Certificate Title',
        issuer: 'Issued by Organization Name',
        date: '2026',
        link: '',
        description: '',
        pdf: '',
        pdfName: ''
      }

    ]

  },


  /* ==========================================================
     FULL PROJECT PORTFOLIO
     ========================================================== */

  projects: {

    eyebrow: 'Full portfolio',

    heading: "Projects I've built and shipped",

    intro:
      'Academic builds, personal experiments, and team projects — spanning web apps, AI tools, and core software fundamentals.',

    items: [

      {
        id: 'proj-1',
        category: 'ai',
        categoryLabel: 'AI & Machine Learning',
        glyph: 'AI',
        title: 'AI-Based Fake Identity & Document Screening System',
        desc:
          'A screening tool that analyzes uploaded identity documents to flag inconsistencies and signs of tampering, built to support faster, more reliable verification.',
        tags:
          'Python, Machine Learning, OpenCV, Image Processing',
        image: 'assets/img/projects/Fake Identity.webp'
      },

      {
        id: 'proj-2',
        category: 'ai',
        categoryLabel: 'AI & Machine Learning',
        glyph: 'AM',
        title: 'Automated Attendance Monitoring System',
        desc:
          'A face-recognition based attendance system that identifies students from a live camera feed and logs attendance automatically, cutting manual roll-call time.',
        tags:
          'Python, OpenCV, Face Recognition, SQLite',
        image:
          'assets/img/projects/Automated Attendance System - A Complete Guide for HR Professionals.webp'
      },

      {
        id: 'proj-3',
        category: 'ai',
        categoryLabel: 'AI & Machine Learning',
        glyph: 'HD',
        title: 'Handwritten Digit Recognition',
        desc:
          'A machine learning model trained on the MNIST dataset to classify handwritten digits, built to explore neural networks and image classification fundamentals.',
        tags:
          'Python, TensorFlow, Neural Networks, MNIST',
        image: ''
      },

      {
        id: 'proj-4',
        category: 'web',
        categoryLabel: 'Web Development',
        glyph: 'FR',
        title: 'Fee Receipt & Tracking System',
        desc:
          'A web application for colleges to generate fee receipts, track student payment history, and monitor pending dues from a single dashboard.',
        tags:
          'HTML, CSS, JavaScript, Flask',
        image:
          'assets/img/projects/fees-management.webp'
      },

      {
        id: 'proj-5',
        category: 'web',
        categoryLabel: 'Web Development',
        glyph: 'RB',
        title: 'Resume Builder',
        desc:
          'A browser-based tool that lets users fill in their details and instantly generate a clean, downloadable resume from multiple layout templates.',
        tags:
          'HTML, CSS, JavaScript',
        image:
          'assets/img/projects/Resume Builder.webp'
      },

      {
        id: 'proj-6',
        category: 'web',
        categoryLabel: 'Web Development',
        glyph: 'EM',
        title: 'College Event Management Portal',
        desc:
          'A portal for students to browse upcoming college events, register with one click, and for organizers to manage registrations and announcements.',
        tags:
          'HTML, CSS, JavaScript, Flask, SQLite',
        image:
          'assets/img/projects/ai-project-management-software-tools-cover-0ed50-7311-4d8c-ae97-b2e1217af593.webp'
      },

      {
        id: 'proj-7',
        category: 'other',
        categoryLabel: 'Other Projects',
        glyph: 'LA',
        title: 'Legal Awareness for Common Citizens',
        desc:
          'A social-impact initiative and companion resource that breaks down everyday legal rights and procedures into plain, accessible language for common citizens.',
        tags:
          'Research, Content Design, Public Outreach',
        image:
          'assets/img/projects/Legal-Awareness-Campaigns-780x470.webp'
      },

      {
        id: 'proj-8',
        category: 'other',
        categoryLabel: 'Other Projects',
        glyph: 'PV',
        title: 'Pathfinding Algorithm Visualizer',
        desc:
          "An interactive grid-based visualizer that shows how algorithms like Dijkstra's and A* search for the shortest path step by step.",
        tags:
          'Java, Data Structures & Algorithms, Swing',
        image: ''
      },

      {
        id: 'proj-9',
        category: 'other',
        categoryLabel: 'Other Projects',
        glyph: 'LM',
        title: 'Library Management System',
        desc:
          'A desktop application for managing book inventory, member records, and issue or return transactions in a college library setting.',
        tags:
          'Java, OOP, MySQL',
        image:
          'assets/img/projects/Digital-Library-Management-System.webp'
      }

    ]

  },


  /* ==========================================================
     CONTACT
     ========================================================== */

  contact: {

    eyebrow: 'Get in touch',

    heading: "Let's start a conversation",

    intro:
      "Open to collaborations, project discussions, technical opportunities, internships, or software development work — reach out and I'll get back to you."

  }

};


/* ============================================================
   DEEP MERGE
   ============================================================ */

function siteDataDeepMerge(base, override) {

  if (Array.isArray(base)) {
    return Array.isArray(override) ? override : base;
  }

  if (typeof base === 'object' && base !== null) {

    const result = { ...base };

    if (typeof override === 'object' && override !== null) {

      Object.keys(override).forEach(key => {

        result[key] = key in base
          ? siteDataDeepMerge(base[key], override[key])
          : override[key];

      });

    }

    return result;
  }

  return override !== undefined
    ? override
    : base;
}


/* ============================================================
   IMAGE FALLBACKS
   ------------------------------------------------------------
   This fixes old localStorage data where image fields were
   saved as empty strings.
   ============================================================ */

function applyImageFallbacks(data) {

  /* ---------- Profile image ---------- */

  if (
    !data.images ||
    !data.images.profile ||
    data.images.profile === 'assets/img/profile-placeholder.svg'
  ) {

    data.images = data.images || {};

    data.images.profile =
      'assets/img/Profile Pic.jpeg';

  }


  /* ---------- Featured project images ---------- */

  const featuredImages = [

    'assets/img/projects/fees-management.webp',

    'assets/img/projects/Automated Attendance System - A Complete Guide for HR Professionals.webp',

    'assets/img/projects/Legal-Awareness-Campaigns-780x470.webp',

    'assets/img/projects/Fake Identity.webp',

    'assets/img/projects/Resume Builder.webp',

    'assets/img/projects/ai-project-management-software-tools-cover-0ed50-7311-4d8c-ae97-b2e1217af593.webp'

  ];


  if (
    data.home &&
    Array.isArray(data.home.featured)
  ) {

    data.home.featured.forEach((project, index) => {

      if (
        project &&
        (!project.image || project.image.trim() === '') &&
        featuredImages[index]
      ) {

        project.image = featuredImages[index];

      }

    });

  }


  /* ---------- Full project images ---------- */

  const projectImages = {

    'proj-1':
      'assets/img/projects/Fake Identity.webp',

    'proj-2':
      'assets/img/projects/Automated Attendance System - A Complete Guide for HR Professionals.webp',

    'proj-3':
      '',

    'proj-4':
      'assets/img/projects/fees-management.webp',

    'proj-5':
      'assets/img/projects/Resume Builder.webp',

    'proj-6':
      'assets/img/projects/ai-project-management-software-tools-cover-0ed50-7311-4d8c-ae97-b2e1217af593.webp',

    'proj-7':
      'assets/img/projects/Legal-Awareness-Campaigns-780x470.webp',

    'proj-8':
      '',

    'proj-9':
      'assets/img/projects/Digital-Library-Management-System.webp'

  };


  if (
    data.projects &&
    Array.isArray(data.projects.items)
  ) {

    data.projects.items.forEach(project => {

      if (!project) return;

      const fallback =
        projectImages[project.id];

      if (
        fallback &&
        (!project.image ||
         project.image.trim() === '')
      ) {

        project.image = fallback;

      }

    });

  }


  return data;
}


/* ============================================================
   GET SITE DATA
   ============================================================ */

function getSiteData() {

  try {

    const raw =
      localStorage.getItem(SITE_DATA_KEY);

    if (!raw) {

      return applyImageFallbacks(
        JSON.parse(
          JSON.stringify(DEFAULT_SITE_DATA)
        )
      );

    }


    const saved =
      JSON.parse(raw);


    const merged =
      siteDataDeepMerge(
        DEFAULT_SITE_DATA,
        saved
      );


    return applyImageFallbacks(merged);


  } catch (e) {

    console.warn(
      'Site data could not be read, using defaults.',
      e
    );


    return applyImageFallbacks(
      JSON.parse(
        JSON.stringify(DEFAULT_SITE_DATA)
      )
    );

  }

}


/* ============================================================
   SAVE SITE DATA
   ============================================================ */

function saveSiteData(data) {

  try {

    localStorage.setItem(
      SITE_DATA_KEY,
      JSON.stringify(data)
    );

    return true;

  } catch (e) {

    console.error(
      'Site data could not be saved.',
      e
    );

    return false;

  }

}


/* ============================================================
   RESET SITE DATA
   ============================================================ */

function resetSiteData() {

  localStorage.removeItem(
    SITE_DATA_KEY
  );

}


/* ============================================================
   IMAGE HELPER
   Resize + compress before storing
   ============================================================ */

function fileToCompressedDataURL(
  file,
  maxDimension,
  quality
) {

  maxDimension =
    maxDimension || 900;

  quality =
    quality || 0.78;


  return new Promise(
    (resolve, reject) => {

      if (
        !file ||
        !file.type.startsWith('image/')
      ) {

        reject(
          new Error(
            'Please choose an image file.'
          )
        );

        return;
      }


      const reader =
        new FileReader();


      reader.onerror = () => {

        reject(
          new Error(
            'Could not read that file.'
          )
        );

      };


      reader.onload = () => {

        const img =
          new Image();


        img.onerror = () => {

          reject(
            new Error(
              'Could not load that image.'
            )
          );

        };


        img.onload = () => {

          let width =
            img.width;

          let height =
            img.height;


          if (
            width > maxDimension ||
            height > maxDimension
          ) {

            if (width > height) {

              height =
                Math.round(
                  height *
                  (maxDimension / width)
                );

              width =
                maxDimension;

            } else {

              width =
                Math.round(
                  width *
                  (maxDimension / height)
                );

              height =
                maxDimension;

            }

          }


          const canvas =
            document.createElement(
              'canvas'
            );


          canvas.width =
            width;

          canvas.height =
            height;


          const ctx =
            canvas.getContext(
              '2d'
            );


          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );


          const isPng =
            file.type === 'image/png' &&
            file.size < 200000;


          const dataUrl =
            isPng

              ? canvas.toDataURL(
                  'image/png'
                )

              : canvas.toDataURL(
                  'image/jpeg',
                  quality
                );


          resolve(dataUrl);

        };


        img.src =
          reader.result;

      };


      reader.readAsDataURL(file);

    }
  );

}


/* ============================================================
   FILE HELPER
   Read files such as PDFs as base64 data URLs
   ============================================================ */

const MAX_CERT_PDF_BYTES =
  4 * 1024 * 1024;


function fileToDataURL(
  file,
  acceptType,
  maxBytes
) {

  return new Promise(
    (resolve, reject) => {

      if (!file) {

        reject(
          new Error(
            'Please choose a file.'
          )
        );

        return;
      }


      if (
        acceptType &&
        file.type !== acceptType
      ) {

        reject(
          new Error(
            `Please choose a ${acceptType} file.`
          )
        );

        return;
      }


      if (
        maxBytes &&
        file.size > maxBytes
      ) {

        reject(
          new Error(
            `That file is too large (max ${Math.round(
              maxBytes / (1024 * 1024)
            )}MB).`
          )
        );

        return;
      }


      const reader =
        new FileReader();


      reader.onerror = () => {

        reject(
          new Error(
            'Could not read that file.'
          )
        );

      };


      reader.onload = () => {

        resolve(
          reader.result
        );

      };


      reader.readAsDataURL(file);

    }
  );

}