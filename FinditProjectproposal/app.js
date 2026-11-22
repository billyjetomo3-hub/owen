
    /* ==========================================================================
       FINDIT CAMPUS LOST & FOUND MANAGEMENT SYSTEM — CORE APPLICATION ENGINE
       ========================================================================== */
    (function () {
      "use strict";

      /* ------------------------------------------------------------------------
         1. SVG ARTWORK & AVATAR GENERATORS (SELF-CONTAINED DATA URIS)
         ------------------------------------------------------------------------ */
      function svgToDataUri(svgString) {
        return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgString.trim());
      }

      function generateAvatar(initials, bgHex) {
        return svgToDataUri(`
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
            <rect width="80" height="80" rx="40" fill="${bgHex}"/>
            <text x="40" y="47" font-family="Inter,Arial,sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" text-anchor="middle">${initials}</text>
          </svg>
        `);
      }

      const ITEM_ARTWORK = {
        backpack: svgToDataUri(`
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
            <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#E8F0FE"/><stop offset="100%" stop-color="#DBEAFE"/></linearGradient></defs>
            <rect width="400" height="260" fill="url(#g1)"/>
            <path d="M172 64 C172 44, 228 44, 228 64" fill="none" stroke="#1E293B" stroke-width="10" stroke-linecap="round"/>
            <rect x="135" y="64" width="130" height="150" rx="34" fill="#1E293B"/>
            <rect x="152" y="128" width="96" height="68" rx="16" fill="#334155"/>
            <line x1="158" y1="145" x2="242" y2="145" stroke="#94A3B8" stroke-width="3" stroke-dasharray="6 4"/>
            <rect x="188" y="92" width="24" height="10" rx="4" fill="#2563EB"/>
          </svg>
        `),
        idcard: svgToDataUri(`
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
            <rect width="400" height="260" fill="#EFF6FF"/>
            <rect x="105" y="55" width="190" height="150" rx="14" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3"/>
            <rect x="105" y="55" width="190" height="32" rx="10" fill="#2563EB"/>
            <circle cx="152" cy="130" r="24" fill="#DBEAFE"/>
            <circle cx="152" cy="123" r="9" fill="#2563EB"/>
            <path d="M136 146 C136 136, 168 136, 168 146" fill="#2563EB"/>
            <rect x="190" y="110" width="84" height="10" rx="5" fill="#1E293B"/>
            <rect x="190" y="128" width="64" height="8" rx="4" fill="#94A3B8"/>
            <rect x="190" y="144" width="74" height="8" rx="4" fill="#CBD5E1"/>
            <rect x="125" y="174" width="150" height="14" rx="3" fill="#E2E8F0"/>
          </svg>
        `),
        earbuds: svgToDataUri(`
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
            <rect width="400" height="260" fill="#ECFDF5"/>
            <rect x="140" y="68" width="120" height="124" rx="36" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="4"/>
            <line x1="140" y1="115" x2="260" y2="115" stroke="#E2E8F0" stroke-width="3"/>
            <circle cx="200" cy="144" r="5" fill="#299B73"/>
            <circle cx="176" cy="96" r="11" fill="#E2E8F0"/>
            <circle cx="224" cy="96" r="11" fill="#E2E8F0"/>
          </svg>
        `),
        laptop: svgToDataUri(`
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
            <rect width="400" height="260" fill="#F1F5F9"/>
            <rect x="115" y="56" width="170" height="114" rx="10" fill="#1E293B"/>
            <rect x="125" y="66" width="150" height="92" rx="4" fill="#3B82F6"/>
            <path d="M92 170 L308 170 L322 188 L78 188 Z" fill="#94A3B8"/>
            <rect x="176" y="175" width="48" height="5" rx="2.5" fill="#64748B"/>
          </svg>
        `),
        book: svgToDataUri(`
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
            <rect width="400" height="260" fill="#FEF3C7"/>
            <rect x="132" y="48" width="136" height="164" rx="10" fill="#2563EB"/>
            <rect x="148" y="48" width="120" height="164" rx="8" fill="#3B82F6"/>
            <rect x="168" y="76" width="80" height="36" rx="6" fill="#FFFFFF"/>
            <line x1="176" y1="90" x2="238" y2="90" stroke="#2563EB" stroke-width="4" stroke-linecap="round"/>
            <line x1="176" y1="101" x2="220" y2="101" stroke="#93C5FD" stroke-width="4" stroke-linecap="round"/>
            <rect x="132" y="192" width="136" height="14" rx="4" fill="#F8FAFC"/>
          </svg>
        `),
        keys: svgToDataUri(`
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
            <rect width="400" height="260" fill="#F3E8FF"/>
            <circle cx="170" cy="110" r="28" fill="none" stroke="#64748B" stroke-width="8"/>
            <rect x="192" y="104" width="86" height="12" rx="5" fill="#64748B"/>
            <rect x="244" y="116" width="10" height="16" rx="2" fill="#64748B"/>
            <rect x="262" y="116" width="10" height="20" rx="2" fill="#64748B"/>
            <rect x="122" y="132" width="54" height="26" rx="13" fill="#2563EB" transform="rotate(-28 149 145)"/>
          </svg>
        `),
        flask: svgToDataUri(`
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
            <rect width="400" height="260" fill="#E0F2FE"/>
            <rect x="178" y="44" width="44" height="22" rx="6" fill="#1E293B"/>
            <rect x="166" y="66" width="68" height="146" rx="22" fill="#299B73"/>
            <rect x="166" y="112" width="68" height="24" fill="#34D399"/>
          </svg>
        `),
        notice: svgToDataUri(`
          <svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120">
            <rect width="160" height="120" rx="14" fill="#E8F0FE"/>
            <rect x="34" y="24" width="92" height="72" rx="10" fill="#FFFFFF" stroke="#BFDBFE" stroke-width="3"/>
            <line x1="48" y1="44" x2="112" y2="44" stroke="#2563EB" stroke-width="5" stroke-linecap="round"/>
            <line x1="48" y1="60" x2="98" y2="60" stroke="#93C5FD" stroke-width="5" stroke-linecap="round"/>
            <line x1="48" y1="76" x2="84" y2="76" stroke="#CBD5E1" stroke-width="5" stroke-linecap="round"/>
          </svg>
        `)
      };

      const CATEGORY_DEFAULT_ART = {
        "Identification Cards": ITEM_ARTWORK.idcard,
        "Bags": ITEM_ARTWORK.backpack,
        "Electronics": ITEM_ARTWORK.earbuds,
        "Books": ITEM_ARTWORK.book,
        "Accessories": ITEM_ARTWORK.keys,
        "Others": ITEM_ARTWORK.flask
      };

      const CATEGORIES = [
        { name: "Identification Cards", color: "#2563EB" },
        { name: "Bags", color: "#299B73" },
        { name: "Electronics", color: "#F59E0B" },
        { name: "Books", color: "#8B5CF6" },
        { name: "Accessories", color: "#EC4899" },
        { name: "Others", color: "#06B6D4" }
      ];

      const CAMPUS_LOCATIONS = [
        "Main Library — 2nd Floor",
        "Computer Laboratory B",
        "Student Cafeteria & Commons",
        "Science & Engineering Hall",
        "University Gymnasium",
        "Admin & Registrar Building",
        "North Quad & Study Lawn",
        "Campus Auditorium"
      ];

      /* ------------------------------------------------------------------------
         2. LOCALSTORAGE KEYS & INITIAL SEED DATA
         ------------------------------------------------------------------------ */
      const STORAGE_KEYS = {
        ITEMS: "findit_items",
        CLAIMS: "findit_claims",
        ANNOUNCEMENTS: "findit_announcements",
        SCHEDULES: "findit_schedules",
        NOTIFICATIONS: "findit_notifications",
        ACTIVITIES: "findit_activities",
        USERS: "findit_users",
        SESSION: "findit_session"
      };

      const TODAY = new Date();
      function formatDateISO(dateObj) {
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, "0");
        const d = String(dateObj.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
      }

      function addDaysISO(offset) {
        const d = new Date(TODAY);
        d.setDate(d.getDate() + offset);
        return formatDateISO(d);
      }

      const SEED_USERS = [
        {
          id: "usr_student_1",
          name: "Mark Averous",
          email: "mark.averous@campus.edu",
          studentId: "2024-08412",
          role: "Student",
          department: "Computer Science",
          phone: "+1 (555) 234-8891",
          avatar: generateAvatar("MA", "#2563EB"),
          status: "Active"
        },
        {
          id: "usr_admin_1",
          name: "Dr. Elena Vance",
          email: "elena.vance@campus.edu",
          studentId: "STAFF-102",
          role: "Administrator",
          department: "Student Affairs & Security",
          phone: "+1 (555) 234-0100",
          avatar: generateAvatar("EV", "#299B73"),
          status: "Active"
        },
        {
          id: "usr_student_2",
          name: "Sophia Chen",
          email: "sophia.chen@campus.edu",
          studentId: "2023-05194",
          role: "Student",
          department: "Architecture",
          phone: "+1 (555) 234-7721",
          avatar: generateAvatar("SC", "#7C3AED"),
          status: "Active"
        },
        {
          id: "usr_staff_3",
          name: "Prof. Marcus Reid",
          email: "m.reid@campus.edu",
          studentId: "FAC-408",
          role: "Staff",
          department: "Library Services",
          phone: "+1 (555) 234-4410",
          avatar: generateAvatar("MR", "#F59E0B"),
          status: "Active"
        }
      ];

      const SEED_ITEMS = [
        {
          id: "ITM-1001",
          name: "Matte Black NorthFace Backpack",
          type: "Lost",
          status: "Lost",
          category: "Bags",
          location: "Main Library — 2nd Floor",
          date: addDaysISO(0),
          timeAgo: "2 minutes ago",
          description: "Matte black 24L commuter backpack with a silver carabiner on the top handle and an astrophysics notebook inside.",
          image: ITEM_ARTWORK.backpack,
          reporterId: "usr_student_1",
          reporterName: "Mark Averous",
          reporterAvatar: generateAvatar("MA", "#2563EB")
        },
        {
          id: "ITM-1002",
          name: "University Student ID Card (Sophia C.)",
          type: "Found",
          status: "Found",
          category: "Identification Cards",
          location: "Computer Laboratory B",
          date: addDaysISO(0),
          timeAgo: "15 minutes ago",
          description: "Laminated campus ID card found beside Workstation #14 in Lab B, attached to a navy blue lanyard.",
          image: ITEM_ARTWORK.idcard,
          reporterId: "usr_staff_3",
          reporterName: "Prof. Marcus Reid",
          reporterAvatar: generateAvatar("MR", "#F59E0B")
        },
        {
          id: "ITM-1003",
          name: "White Wireless Earbuds Charging Case",
          type: "Found",
          status: "Found",
          category: "Electronics",
          location: "Student Cafeteria & Commons",
          date: addDaysISO(0),
          timeAgo: "1 hour ago",
          description: "Glossy white wireless earbuds inside charging case with a small green silicone protective skin.",
          image: ITEM_ARTWORK.earbuds,
          reporterId: "usr_student_2",
          reporterName: "Sophia Chen",
          reporterAvatar: generateAvatar("SC", "#7C3AED")
        },
        {
          id: "ITM-1004",
          name: "Silver 14-inch Ultrabook Laptop",
          type: "Found",
          status: "Found",
          category: "Electronics",
          location: "Science & Engineering Hall",
          date: addDaysISO(-1),
          timeAgo: "3 hours ago",
          description: "Aluminum chassis laptop left in Lecture Room 302 after the afternoon seminar. Turned in to security desk.",
          image: ITEM_ARTWORK.laptop,
          reporterId: "usr_admin_1",
          reporterName: "Dr. Elena Vance",
          reporterAvatar: generateAvatar("EV", "#299B73")
        },
        {
          id: "ITM-1005",
          name: "Calculus & Linear Algebra Hardcover",
          type: "Lost",
          status: "Lost",
          category: "Books",
          location: "North Quad & Study Lawn",
          date: addDaysISO(-2),
          timeAgo: "1 day ago",
          description: "Blue hardcover textbook with yellow sticky tabs on chapters 4 through 7 and handwritten name inside front cover.",
          image: ITEM_ARTWORK.book,
          reporterId: "usr_student_2",
          reporterName: "Sophia Chen",
          reporterAvatar: generateAvatar("SC", "#7C3AED")
        },
        {
          id: "ITM-1006",
          name: "Dormitory Keychain & Blue Fob",
          type: "Returned",
          status: "Returned",
          category: "Accessories",
          location: "University Gymnasium",
          date: addDaysISO(-3),
          timeAgo: "2 days ago",
          description: "Set of three brass keys with a royal blue RFID dorm access tag.",
          image: ITEM_ARTWORK.keys,
          reporterId: "usr_student_1",
          reporterName: "Mark Averous",
          reporterAvatar: generateAvatar("MA", "#2563EB")
        },
        {
          id: "ITM-1007",
          name: "Emerald Insulated Stainless Flask",
          type: "Returned",
          status: "Returned",
          category: "Others",
          location: "Campus Auditorium",
          date: addDaysISO(-4),
          timeAgo: "3 days ago",
          description: "750ml emerald green insulated water bottle with matte black screw cap.",
          image: ITEM_ARTWORK.flask,
          reporterId: "usr_staff_3",
          reporterName: "Prof. Marcus Reid",
          reporterAvatar: generateAvatar("MR", "#F59E0B")
        },
        {
          id: "ITM-1008",
          name: "Faculty Library Access Badge",
          type: "Lost",
          status: "Lost",
          category: "Identification Cards",
          location: "Admin & Registrar Building",
          date: addDaysISO(-5),
          timeAgo: "4 days ago",
          description: "White proximity access card in a clear vertical badge holder.",
          image: ITEM_ARTWORK.idcard,
          reporterId: "usr_staff_3",
          reporterName: "Prof. Marcus Reid",
          reporterAvatar: generateAvatar("MR", "#F59E0B")
        },
        {
          id: "ITM-1009",
          name: "Canvas Messenger Bag (Navy)",
          type: "Found",
          status: "Found",
          category: "Bags",
          location: "Main Library — 2nd Floor",
          date: addDaysISO(-6),
          timeAgo: "5 days ago",
          description: "Navy canvas shoulder bag containing geometry drafting rulers and sketchbook.",
          image: ITEM_ARTWORK.backpack,
          reporterId: "usr_admin_1",
          reporterName: "Dr. Elena Vance",
          reporterAvatar: generateAvatar("EV", "#299B73")
        }
      ];

      const SEED_CLAIMS = [
        {
          id: "CLM-401",
          itemId: "ITM-1003",
          itemName: "White Wireless Earbuds Charging Case",
          itemImage: ITEM_ARTWORK.earbuds,
          claimantId: "usr_student_1",
          claimantName: "Mark Averous",
          claimantStudentId: "2024-08412",
          claimantEmail: "mark.averous@campus.edu",
          proofDescription: "The charging case has a mint-green silicone sleeve with a tiny scratch near the USB-C port, and the Bluetooth device name is 'Mark's Buds Pro'.",
          submittedDate: addDaysISO(0),
          status: "Pending",
          adminNote: ""
        },
        {
          id: "CLM-402",
          itemId: "ITM-1004",
          itemName: "Silver 14-inch Ultrabook Laptop",
          itemImage: ITEM_ARTWORK.laptop,
          claimantId: "usr_student_2",
          claimantName: "Sophia Chen",
          claimantStudentId: "2023-05194",
          claimantEmail: "sophia.chen@campus.edu",
          proofDescription: "Serial number ends in 98K4, lock screen wallpaper is an architectural blueprint of the Golden Gate Bridge.",
          submittedDate: addDaysISO(-1),
          status: "Pending",
          adminNote: ""
        },
        {
          id: "CLM-403",
          itemId: "ITM-1006",
          itemName: "Dormitory Keychain & Blue Fob",
          itemImage: ITEM_ARTWORK.keys,
          claimantId: "usr_student_1",
          claimantName: "Mark Averous",
          claimantStudentId: "2024-08412",
          claimantEmail: "mark.averous@campus.edu",
          proofDescription: "RFID tag serial #B-904 matched at the Student Housing front desk.",
          submittedDate: addDaysISO(-3),
          status: "Approved",
          adminNote: "Verified at Lost & Found Office Window 2."
        }
      ];

      const SEED_ANNOUNCEMENTS = [
        {
          id: "ANN-01",
          title: "Unclaimed Items Reminder — End of Month Review",
          summary: "Items held in the campus repository for over 45 days will be cataloged for semester charity donation.",
          content: "All students and faculty members are encouraged to browse the FindIt registry for misplaced electronics, ID cards, and personal belongings. Unclaimed items held past 45 days are transferred to the Student Welfare Donation Drive after final verification.",
          date: addDaysISO(0),
          author: "Dr. Elena Vance",
          views: 342,
          thumbnail: ITEM_ARTWORK.notice
        },
        {
          id: "ANN-02",
          title: "Lost and Found Office Extended Schedule",
          summary: "Main Student Center Desk #2 is now open Monday through Friday from 8:30 AM to 6:00 PM.",
          content: "To better accommodate evening laboratory students, the FindIt Physical Verification Desk at the Student Union Ground Floor now operates until 6:00 PM on weekdays. Bring your physical or digital Student ID for claim pickup.",
          date: addDaysISO(-1),
          author: "Campus Security Office",
          views: 289,
          thumbnail: ITEM_ARTWORK.idcard
        },
        {
          id: "ANN-03",
          title: "Important Campus Lost Item Guidelines",
          summary: "Please include distinctive serial markers or unique stickers when filing a lost property report.",
          content: "When reporting lost electronics, bags, or textbooks, avoid posting confidential passwords publicly. Instead, describe exterior markings so administrators can accurately verify ownership claims.",
          date: addDaysISO(-3),
          author: "Dr. Elena Vance",
          views: 418,
          thumbnail: ITEM_ARTWORK.backpack
        },
        {
          id: "ANN-04",
          title: "Claiming Procedures & Two-Step Verification",
          summary: "Submit an online ownership claim first, then visit the Verification Center upon approval.",
          content: "Once you locate your belonging on FindIt, click 'Claim This Item' and provide proof of ownership. An administrator will review your submission within 24 hours and send an instant pickup notification.",
          date: addDaysISO(-5),
          author: "Student Affairs",
          views: 512,
          thumbnail: ITEM_ARTWORK.earbuds
        },
        {
          id: "ANN-05",
          title: "Found Items Available for Collection (Library Batch)",
          summary: "14 calculators, water bottles, and ID badges turned in from the Main Library are ready for pickup.",
          content: "Library staff have transferred last week's study hall findings to the central FindIt database. Filter by 'Main Library — 2nd Floor' in Browse Items to inspect recent entries.",
          date: addDaysISO(-7),
          author: "Prof. Marcus Reid",
          views: 604,
          thumbnail: ITEM_ARTWORK.book
        }
      ];

      const SEED_SCHEDULES = [
        {
          id: "SCH-01",
          title: "Lost and Found Office Hours",
          time: "9:00 AM – 11:00 AM",
          date: addDaysISO(0),
          location: "Student Union Desk #2",
          category: "Office Hours",
          color: "blue"
        },
        {
          id: "SCH-02",
          title: "Item Claim Verification",
          time: "1:00 PM – 3:00 PM",
          date: addDaysISO(0),
          location: "Verification Room 104",
          category: "Verification",
          color: "green"
        },
        {
          id: "SCH-03",
          title: "Unclaimed Items Inspection",
          time: "4:00 PM – 5:00 PM",
          date: addDaysISO(1),
          location: "Central Repository Vault",
          category: "Audit",
          color: "amber"
        },
        {
          id: "SCH-04",
          title: "Library Batch Intake & Cataloging",
          time: "10:30 AM – 12:00 PM",
          date: addDaysISO(3),
          location: "Main Library Lobby",
          category: "Intake",
          color: "blue"
        }
      ];

      const SEED_NOTIFICATIONS = [
        {
          id: "NTF-01",
          title: "Claim Under Review",
          message: "Your ownership claim for 'White Wireless Earbuds Charging Case' is awaiting admin verification.",
          time: "12 mins ago",
          read: false,
          targetRole: "Student",
          type: "info"
        },
        {
          id: "NTF-02",
          title: "Possible Match Found",
          message: "A new Found report in Main Library may match your 'Matte Black NorthFace Backpack'.",
          time: "45 mins ago",
          read: false,
          targetRole: "Student",
          type: "success"
        },
        {
          id: "NTF-03",
          title: "New Claim Submitted (CLM-401)",
          message: "Mark Averous submitted ownership proof for White Wireless Earbuds Charging Case.",
          time: "12 mins ago",
          read: false,
          targetRole: "Administrator",
          type: "warning"
        },
        {
          id: "NTF-04",
          title: "Urgent Laptop Claim (CLM-402)",
          message: "Sophia Chen requested verification for Silver 14-inch Ultrabook Laptop.",
          time: "2 hours ago",
          read: false,
          targetRole: "Administrator",
          type: "info"
        }
      ];

      const SEED_ACTIVITIES = [
        {
          id: "ACT-01",
          title: "New lost item reported",
          description: "Matte Black NorthFace Backpack reported at Main Library.",
          actor: "Mark Averous",
          time: "2 mins ago",
          color: "#EF4444",
          bg: "#FEE2E2"
        },
        {
          id: "ACT-02",
          title: "Found item submitted",
          description: "University Student ID Card logged from Computer Lab B.",
          actor: "Prof. Marcus Reid",
          time: "15 mins ago",
          color: "#2563EB",
          bg: "#E8F0FE"
        },
        {
          id: "ACT-03",
          title: "Claim submitted for verification",
          description: "Claim CLM-401 opened for White Wireless Earbuds.",
          actor: "Mark Averous",
          time: "28 mins ago",
          color: "#F59E0B",
          bg: "#FEF3C7"
        },
        {
          id: "ACT-04",
          title: "Claim approved & item returned",
          description: "Dormitory Keychain & Blue Fob returned to owner.",
          actor: "Dr. Elena Vance",
          time: "2 days ago",
          color: "#299B73",
          bg: "#E6F6F0"
        },
        {
          id: "ACT-05",
          title: "New campus announcement published",
          description: "Unclaimed Items Reminder posted to Notice Board.",
          actor: "Dr. Elena Vance",
          time: "3 days ago",
          color: "#7C3AED",
          bg: "#EDE9FE"
        }
      ];

      /* ------------------------------------------------------------------------
         3. STORAGE HELPERS & STATE MANAGEMENT
         ------------------------------------------------------------------------ */
      function readStore(key, fallback) {
        try {
          const raw = localStorage.getItem(key);
          if (!raw) {
            localStorage.setItem(key, JSON.stringify(fallback));
            return JSON.parse(JSON.stringify(fallback));
          }
          return JSON.parse(raw);
        } catch (err) {
          console.warn("LocalStorage read fallback:", key, err);
          return JSON.parse(JSON.stringify(fallback));
        }
      }

      function writeStore(key, data) {
        try {
          localStorage.setItem(key, JSON.stringify(data));
        } catch (err) {
          showToast("Storage quota warning: unable to persist large image.", "warning");
        }
      }

      function initializeStorageIfNeeded() {
        readStore(STORAGE_KEYS.USERS, SEED_USERS);
        readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
        readStore(STORAGE_KEYS.CLAIMS, SEED_CLAIMS);
        readStore(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
        readStore(STORAGE_KEYS.SCHEDULES, SEED_SCHEDULES);
        readStore(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
        readStore(STORAGE_KEYS.ACTIVITIES, SEED_ACTIVITIES);
        readStore(STORAGE_KEYS.SESSION, {
          activeRole: "Student",
          activeUserId: "usr_student_1"
        });
      }

      const appState = {
        currentPage: "dashboard",
        browseFilters: {
          search: "",
          status: "All",
          category: "All",
          location: "All",
          date: ""
        },
        adminTableFilters: {
          search: "",
          category: "All",
          page: 1,
          perPage: 6
        },
        perfPeriod: "7d",
        recPeriod: "7d",
        calYear: TODAY.getFullYear(),
        calMonth: TODAY.getMonth(),
        selectedCalDate: null // null means show all upcoming schedules
      };

      function getSession() {
        return readStore(STORAGE_KEYS.SESSION, { activeRole: "Student", activeUserId: "usr_student_1" });
      }

      function getCurrentUser() {
        const session = getSession();
        const users = readStore(STORAGE_KEYS.USERS, SEED_USERS);
        return users.find(u => u.id === session.activeUserId) || users[0];
      }

      function isAdminMode() {
        return getSession().activeRole === "Administrator";
      }

      function logActivity(title, description, color = "#2563EB", bg = "#E8F0FE") {
        const user = getCurrentUser();
        const activities = readStore(STORAGE_KEYS.ACTIVITIES, SEED_ACTIVITIES);
        activities.unshift({
          id: "ACT-" + Date.now(),
          title,
          description,
          actor: user.name,
          time: "Just now",
          color,
          bg
        });
        writeStore(STORAGE_KEYS.ACTIVITIES, activities.slice(0, 25));
      }

      function pushNotification(title, message, targetRole = "All", type = "info") {
        const notifs = readStore(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
        notifs.unshift({
          id: "NTF-" + Date.now(),
          title,
          message,
          time: "Just now",
          read: false,
          targetRole,
          type
        });
        writeStore(STORAGE_KEYS.NOTIFICATIONS, notifs.slice(0, 30));
      }

      /* ------------------------------------------------------------------------
         4. TOAST & MODAL UTILITIES
         ------------------------------------------------------------------------ */
      function showToast(message, variant = "info") {
        const container = document.getElementById("toastContainer");
        const toast = document.createElement("div");
        toast.className = `toast ${variant}`;
        toast.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>${escapeHtml(message)}</span>
        `;
        container.appendChild(toast);
        setTimeout(() => {
          toast.style.opacity = "0";
          toast.style.transform = "translateY(8px)";
          toast.style.transition = "all 0.2s ease";
          setTimeout(() => toast.remove(), 220);
        }, 3200);
      }

      function openModal(title, bodyHtml, footerHtml = "") {
        document.getElementById("appModalTitle").textContent = title;
        document.getElementById("appModalBody").innerHTML = bodyHtml;
        const footerEl = document.getElementById("appModalFooter");
        if (footerHtml) {
          footerEl.innerHTML = footerHtml;
          footerEl.style.display = "flex";
        } else {
          footerEl.innerHTML = "";
          footerEl.style.display = "none";
        }
        document.getElementById("appModalBackdrop").classList.add("open");
      }

      function closeModal() {
        document.getElementById("appModalBackdrop").classList.remove("open");
      }

      function escapeHtml(str) {
        if (str === null || str === undefined) return "";
        return String(str)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      }

      /* ------------------------------------------------------------------------
         5. NAVIGATION CONFIGURATION (STUDENT VS ADMINISTRATOR)
         ------------------------------------------------------------------------ */
      const ICONS = {
        dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
        browse: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        lost: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
        found: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
        reports: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
        claims: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
        bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
        megaphone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
        user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
        help: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
        layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
        shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        returned: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>`,
        users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
        logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`
      };

      function getNavStructure() {
        const notifs = readStore(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
        const claims = readStore(STORAGE_KEYS.CLAIMS, SEED_CLAIMS);
        const role = getSession().activeRole;
        const unreadCount = notifs.filter(n => !n.read && (n.targetRole === "All" || n.targetRole === role)).length;
        const pendingClaimsCount = claims.filter(c => c.status === "Pending").length;

        if (role === "Administrator") {
          return [
            {
              title: "OVERVIEW",
              items: [
                { id: "dashboard", label: "Dashboard", icon: ICONS.dashboard }
              ]
            },
            {
              title: "MANAGEMENT",
              items: [
                { id: "admin-all-items", label: "All Items", icon: ICONS.layers },
                { id: "admin-lost-reports", label: "Lost Reports", icon: ICONS.lost },
                { id: "admin-found-reports", label: "Found Reports", icon: ICONS.found },
                { id: "admin-claims", label: "Claims", icon: ICONS.claims },
                { id: "verification-center", label: "Verification Center", icon: ICONS.shield, badge: pendingClaimsCount, badgeClass: "amber" },
                { id: "admin-returned", label: "Returned Items", icon: ICONS.returned }
              ]
            },
            {
              title: "COMMUNITY",
              items: [
                { id: "announcements", label: "Announcements", icon: ICONS.megaphone },
                { id: "manage-users", label: "Manage Users", icon: ICONS.users }
              ]
            },
            {
              title: "ANALYTICS",
              items: [
                { id: "reports-analytics", label: "Reports & Analytics", icon: ICONS.chart }
              ]
            },
            {
              title: "ACCOUNT",
              items: [
                { id: "settings", label: "Settings", icon: ICONS.settings },
                { id: "switch-student", label: "Switch to Student", icon: ICONS.logout }
              ]
            }
          ];
        }

        return [
          {
            title: "OVERVIEW",
            items: [
              { id: "dashboard", label: "Dashboard", icon: ICONS.dashboard }
            ]
          },
          {
            title: "ITEM MANAGEMENT",
            items: [
              { id: "browse-items", label: "Browse Items", icon: ICONS.browse },
              { id: "report-lost", label: "Report Lost", icon: ICONS.lost },
              { id: "report-found", label: "Report Found", icon: ICONS.found },
              { id: "my-reports", label: "My Reports", icon: ICONS.reports },
              { id: "my-claims", label: "My Claims", icon: ICONS.claims }
            ]
          },
          {
            title: "COMMUNITY",
            items: [
              { id: "notifications", label: "Notifications", icon: ICONS.bell, badge: unreadCount },
              { id: "announcements", label: "Announcements", icon: ICONS.megaphone }
            ]
          },
          {
            title: "ACCOUNT",
            items: [
              { id: "account", label: "Account", icon: ICONS.user },
              { id: "help", label: "Help", icon: ICONS.help },
              { id: "settings", label: "Settings", icon: ICONS.settings }
            ]
          }
        ];
      }

      /* ------------------------------------------------------------------------
         6. SHELL & SIDEBAR RENDERING
         ------------------------------------------------------------------------ */
      function renderSidebarAndHeader() {
        const user = getCurrentUser();
        const admin = isAdminMode();

        document.getElementById("sidebarAvatar").src = user.avatar;
        document.getElementById("sidebarUserName").textContent = user.name;
        document.getElementById("sidebarUserRole").textContent = admin ? "Administrator" : user.role;

        document.getElementById("switchStudentBtn").classList.toggle("active-role", !admin);
        document.getElementById("switchAdminBtn").classList.toggle("active-role", admin);

        const quickDot = document.getElementById("quickRoleDot");
        quickDot.classList.toggle("admin", admin);
        document.getElementById("quickRoleLabel").textContent = admin ? "Admin View" : "Student View";

        const dateStr = TODAY.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric"
        });
        document.getElementById("headerDateBadge").textContent = dateStr;

        // Render Navigation
        const navContainer = document.getElementById("sidebarNav");
        const groups = getNavStructure();
        navContainer.innerHTML = groups.map(group => `
          <div class="nav-group">
            <div class="nav-group-title">${group.title}</div>
            ${group.items.map(item => `
              <button class="nav-item ${appState.currentPage === item.id ? "active" : ""}" data-nav="${item.id}" type="button">
                <span class="nav-item-left">
                  ${item.icon}
                  <span>${item.label}</span>
                </span>
                ${item.badge ? `<span class="nav-badge ${item.badgeClass || ""}">${item.badge}</span>` : ""}
              </button>
            `).join("")}
          </div>
        `).join("");

        // Unread Bell Indicator & Popover
        const notifs = readStore(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
        const role = getSession().activeRole;
        const roleNotifs = notifs.filter(n => n.targetRole === "All" || n.targetRole === role);
        const unread = roleNotifs.filter(n => !n.read);

        document.getElementById("headerUnreadDot").style.display = unread.length > 0 ? "block" : "none";
        const popList = document.getElementById("notifPopoverList");
        if (roleNotifs.length === 0) {
          popList.innerHTML = `<div style="padding:18px; text-align:center; color:var(--text-muted);">No notifications yet.</div>`;
        } else {
          popList.innerHTML = roleNotifs.slice(0, 5).map(n => `
            <div class="notif-pop-item ${n.read ? "" : "unread"}" data-read-notif="${n.id}">
              <div style="width:8px; height:8px; border-radius:50%; background:${n.read ? "#CBD5E1" : "#2563EB"}; margin-top:5px; flex-shrink:0;"></div>
              <div style="flex:1; min-width:0;">
                <div style="font-size:11.5px; font-weight:600; color:var(--text-primary);">${escapeHtml(n.title)}</div>
                <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">${escapeHtml(n.message)}</div>
                <div style="font-size:10px; color:var(--text-muted); margin-top:3px;">${escapeHtml(n.time)}</div>
              </div>
            </div>
          `).join("");
        }

        // Expand workspace on wide management tables
        const widePages = ["admin-all-items", "admin-lost-reports", "admin-found-reports", "admin-claims", "admin-returned", "manage-users"];
        document.getElementById("appShell").classList.toggle("wide-mode", widePages.includes(appState.currentPage));
      }

      function navigateTo(pageId) {
        if (pageId === "switch-student") {
          switchRole("Student");
          return;
        }
        appState.currentPage = pageId;
        appState.adminTableFilters.page = 1;
        closeMobileSidebar();
        document.getElementById("notifPopover").classList.remove("open");
        renderApp();
      }

      function switchRole(targetRole) {
        const session = {
          activeRole: targetRole,
          activeUserId: targetRole === "Administrator" ? "usr_admin_1" : "usr_student_1"
        };
        writeStore(STORAGE_KEYS.SESSION, session);
        appState.currentPage = "dashboard";
        document.getElementById("profileDropdown").classList.remove("open");
        showToast(`Switched to ${targetRole} Workspace`, "info");
        renderApp();
      }

      /* ------------------------------------------------------------------------
         7. RIGHT INFORMATION PANEL (CALENDAR, SCHEDULE, TIMELINE)
         ------------------------------------------------------------------------ */
      function renderRightPanel() {
        const schedules = readStore(STORAGE_KEYS.SCHEDULES, SEED_SCHEDULES);
        const activities = readStore(STORAGE_KEYS.ACTIVITIES, SEED_ACTIVITIES);
        const admin = isAdminMode();

        // 1. Calendar
        const year = appState.calYear;
        const month = appState.calMonth;
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthName = new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });

        document.getElementById("calMonthLabel").textContent = monthName;
        const todayISO = formatDateISO(TODAY);
        document.getElementById("selectedDateText").textContent = appState.selectedCalDate || "All Upcoming";

        const eventDates = new Set(schedules.map(s => s.date));
        let calHtml = "";
        for (let i = 0; i < firstDay; i++) {
          calHtml += `<div class="cal-day empty"></div>`;
        }
        for (let day = 1; day <= daysInMonth; day++) {
          const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isToday = iso === todayISO;
          const isSelected = appState.selectedCalDate === iso;
          const hasEvent = eventDates.has(iso);
          calHtml += `
            <button type="button" class="cal-day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}" data-cal-date="${iso}">
              <span>${day}</span>
              ${hasEvent ? `<span class="cal-event-dot"></span>` : ""}
            </button>
          `;
        }
        document.getElementById("calDaysGrid").innerHTML = calHtml;

        // 2. Upcoming Schedule
        document.getElementById("addScheduleBtn").style.display = admin ? "inline-flex" : "none";
        document.getElementById("clearDateFilterBtn").style.display = appState.selectedCalDate ? "inline-flex" : "none";

        const filteredSchedules = appState.selectedCalDate
          ? schedules.filter(s => s.date === appState.selectedCalDate)
          : schedules.slice(0, 4);

        const schedEl = document.getElementById("upcomingScheduleList");
        if (filteredSchedules.length === 0) {
          schedEl.innerHTML = `<div style="padding:12px; border:1px dashed var(--border-color); border-radius:10px; text-align:center; color:var(--text-muted); font-size:11px;">No scheduled sessions on this date.</div>`;
        } else {
          schedEl.innerHTML = filteredSchedules.map(s => `
            <div class="schedule-card ${escapeHtml(s.color || "blue")}">
              <div class="schedule-time">
                <span>${escapeHtml(s.time)}</span>
                <span class="badge badge-neutral" style="font-size:9.5px; padding:1px 6px;">${escapeHtml(s.category)}</span>
              </div>
              <div class="schedule-title">${escapeHtml(s.title)}</div>
              <div class="schedule-meta">
                <span>${escapeHtml(s.location)} &middot; ${escapeHtml(s.date)}</span>
                ${admin ? `
                  <span style="display:inline-flex; gap:5px;">
                    <button type="button" class="card-link" data-edit-sched="${s.id}" style="font-size:10px;">Edit</button>
                    <button type="button" style="color:var(--rose); font-size:10px;" data-del-sched="${s.id}">Del</button>
                  </span>
                ` : ""}
              </div>
            </div>
          `).join("");
        }

        // 3. Recent Activities Vertical Timeline
        document.getElementById("rightTimelineList").innerHTML = activities.slice(0, 5).map(act => `
          <div class="timeline-item">
            <div class="timeline-node" style="background:${act.bg}; color:${act.color};">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="4"/></svg>
            </div>
            <div class="timeline-content">
              <div class="timeline-text"><strong>${escapeHtml(act.actor)}</strong> — ${escapeHtml(act.title.toLowerCase())}</div>
              <div class="timeline-sub">${escapeHtml(act.time)}</div>
            </div>
          </div>
        `).join("");
      }

      /* ------------------------------------------------------------------------
         8. MAIN DASHBOARD VIEW (KPI CARDS, SVG CHARTS, LOWER PANELS, NOTICE BOARD)
         ------------------------------------------------------------------------ */
      function renderDashboardView() {
        const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
        const announcements = readStore(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
        const activities = readStore(STORAGE_KEYS.ACTIVITIES, SEED_ACTIVITIES);
        const admin = isAdminMode();

        document.getElementById("pageHeaderTitle").textContent = admin ? "Admin Dashboard" : "Dashboard";
        document.getElementById("pageHeaderGreeting").textContent = admin
          ? "Campus Lost & Found command center, verification queue, and analytics."
          : "Welcome back! Here's what's happening in your campus community.";

        const totalCount = items.length;
        const lostCount = items.filter(i => i.status === "Lost").length;
        const foundCount = items.filter(i => i.status === "Found").length;
        const returnedCount = items.filter(i => i.status === "Returned").length;

        const container = document.getElementById("mainViewContainer");
        container.innerHTML = `
          <!-- 4 HORIZONTAL KPI STAT CARDS -->
          <section class="kpi-grid">
            <div class="kpi-card" data-kpi-nav="${admin ? "admin-all-items" : "browse-items"}" data-kpi-filter="All">
              <div class="kpi-info">
                <div class="kpi-label">Total Items</div>
                <div class="kpi-value" data-count-target="${totalCount}">0</div>
                <div class="kpi-trend" style="color:var(--primary-blue);">All campus records</div>
              </div>
              <div class="kpi-right">
                <div class="kpi-icon-box">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#929292" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>

            <div class="kpi-card" data-kpi-nav="${admin ? "admin-lost-reports" : "browse-items"}" data-kpi-filter="Lost">
              <div class="kpi-info">
                <div class="kpi-label">Lost Items</div>
                <div class="kpi-value" data-count-target="${lostCount}">0</div>
                <div class="kpi-trend" style="color:var(--rose);">Active searches</div>
              </div>
              <div class="kpi-right">
                <div class="kpi-icon-box rose">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#929292" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>

            <div class="kpi-card" data-kpi-nav="${admin ? "admin-found-reports" : "browse-items"}" data-kpi-filter="Found">
              <div class="kpi-info">
                <div class="kpi-label">Found Items</div>
                <div class="kpi-value" data-count-target="${foundCount}">0</div>
                <div class="kpi-trend" style="color:var(--amber);">Awaiting recovery</div>
              </div>
              <div class="kpi-right">
                <div class="kpi-icon-box amber">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#929292" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>

            <div class="kpi-card" data-kpi-nav="${admin ? "admin-returned" : "browse-items"}" data-kpi-filter="Returned">
              <div class="kpi-info">
                <div class="kpi-label">Returned Items</div>
                <div class="kpi-value" data-count-target="${returnedCount}">0</div>
                <div class="kpi-trend" style="color:var(--secondary-green);">Verified &amp; closed</div>
              </div>
              <div class="kpi-right">
                <div class="kpi-icon-box green">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#929292" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>
          </section>

          <!-- CENTER ANALYTICS (2 SIDE-BY-SIDE CARDS) -->
          <section class="analytics-grid">
            <div class="card">
              <div class="card-header">
                <div>
                  <h3 class="card-title">Lost &amp; Found Performance</h3>
                  <div class="chart-legend-inline" style="margin-top:4px; margin-bottom:0;">
                    <span><i class="legend-dot" style="background:#EF4444;"></i>Lost</span>
                    <span><i class="legend-dot" style="background:#2563EB;"></i>Found</span>
                    <span><i class="legend-dot" style="background:#299B73;"></i>Returned</span>
                  </div>
                </div>
                <select class="select-mini" id="perfPeriodSelect" aria-label="Performance Period">
                  <option value="7d" ${appState.perfPeriod === "7d" ? "selected" : ""}>Last 7 Days</option>
                  <option value="30d" ${appState.perfPeriod === "30d" ? "selected" : ""}>Last 30 Days</option>
                  <option value="6m" ${appState.perfPeriod === "6m" ? "selected" : ""}>Last 6 Months</option>
                  <option value="1y" ${appState.perfPeriod === "1y" ? "selected" : ""}>Last Year</option>
                </select>
              </div>
              <div class="svg-chart-wrap" id="lineChartContainer"></div>
            </div>

            <div class="card">
              <div class="card-header">
                <div>
                  <h3 class="card-title">Recovery Overview</h3>
                  <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Status volume comparison</div>
                </div>
                <select class="select-mini" id="recPeriodSelect" aria-label="Recovery Period">
                  <option value="7d" ${appState.recPeriod === "7d" ? "selected" : ""}>Last 7 Days</option>
                  <option value="30d" ${appState.recPeriod === "30d" ? "selected" : ""}>Last 30 Days</option>
                  <option value="6m" ${appState.recPeriod === "6m" ? "selected" : ""}>Last 6 Months</option>
                  <option value="1y" ${appState.recPeriod === "1y" ? "selected" : ""}>Last Year</option>
                </select>
              </div>
              <div class="svg-chart-wrap" id="barChartContainer"></div>
            </div>
          </section>

          <!-- LOWER 3-COLUMN PANELS -->
          <section class="lower-grid">
            <!-- Card 1: Recent Reports -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Recent Reports</h3>
                <button class="card-link" data-nav="${admin ? "admin-all-items" : "browse-items"}" type="button">View All</button>
              </div>
              <div>
                ${items.slice(0, 4).map(item => `
                  <div class="recent-report-item" data-view-item="${item.id}">
                    <img class="report-thumb" src="${item.image}" alt="${escapeHtml(item.name)}" />
                    <div class="report-item-body">
                      <div class="report-item-title">${escapeHtml(item.name)}</div>
                      <div class="report-item-sub">
                        <span style="color:${item.status === "Lost" ? "#EF4444" : item.status === "Returned" ? "#299B73" : "#2563EB"}; font-weight:600;">${escapeHtml(item.status)}</span>
                        &middot; ${escapeHtml(item.location.split("—")[0].trim())}
                      </div>
                    </div>
                    <div class="report-item-time">${escapeHtml(item.timeAgo)}</div>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Card 2: Item Categories Donut -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Item Categories</h3>
                <span style="font-size:11px; color:var(--text-muted);">${totalCount} Total</span>
              </div>
              <div class="donut-container" id="donutChartContainer"></div>
            </div>

            <!-- Card 3: Recent Activity -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Recent Activity</h3>
                <button class="card-link" data-nav="notifications" type="button">Updates</button>
              </div>
              <div>
                ${activities.slice(0, 4).map(act => `
                  <div class="activity-mini-row">
                    <div class="activity-badge-icon" style="background:${act.bg}; color:${act.color};">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    </div>
                    <div style="flex:1; min-width:0;">
                      <div style="font-size:11.5px; font-weight:600; color:var(--text-primary);">${escapeHtml(act.title)}</div>
                      <div style="font-size:10.5px; color:var(--text-secondary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(act.description)}</div>
                      <div style="font-size:10px; color:var(--text-muted); margin-top:1px;">${escapeHtml(act.time)}</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </section>

          <!-- WIDE BOTTOM CARD: CAMPUS NOTICE BOARD -->
          <section class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">Campus Notice Board</h3>
                <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Official Lost &amp; Found bulletins, schedules, and recovery guidelines</div>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <button class="card-link" data-nav="announcements" type="button">All Notices</button>
                ${admin ? `
                  <button class="btn btn-primary btn-sm" id="dashAddNoticeBtn" type="button">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    New Notice
                  </button>
                ` : ""}
              </div>
            </div>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Announcement</th>
                    <th>Date</th>
                    <th>Published By</th>
                    <th>Views</th>
                    <th style="text-align:right;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${announcements.slice(0, 5).map(ann => `
                    <tr>
                      <td>
                        <div class="notice-title-cell">
                          <img class="notice-thumb" src="${ann.thumbnail}" alt="" />
                          <div style="min-width:0;">
                            <div style="font-weight:600; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:260px;">${escapeHtml(ann.title)}</div>
                            <div style="font-size:11px; color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:260px;">${escapeHtml(ann.summary)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="white-space:nowrap; color:var(--text-secondary);">${escapeHtml(ann.date)}</td>
                      <td style="white-space:nowrap; font-weight:500;">${escapeHtml(ann.author)}</td>
                      <td style="white-space:nowrap; color:var(--text-secondary);">${ann.views}</td>
                      <td style="text-align:right; white-space:nowrap;">
                        <button class="btn btn-outline btn-sm" data-read-notice="${ann.id}" type="button">Read</button>
                        ${admin ? `
                          <button class="btn btn-outline btn-sm" data-edit-notice="${ann.id}" type="button">Edit</button>
                          <button class="btn btn-danger btn-sm" data-del-notice="${ann.id}" type="button">Del</button>
                        ` : ""}
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </section>
        `;

        animateKpiCounters();
        renderLineChart(items);
        renderBarChart(items);
        renderDonutChart(items);
      }

      function animateKpiCounters() {
        document.querySelectorAll("[data-count-target]").forEach(el => {
          const target = parseInt(el.getAttribute("data-count-target"), 10) || 0;
          const duration = 450;
          const start = performance.now();
          function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }

      /* ------------------------------------------------------------------------
         9. CUSTOM VANILLA JS + SVG CHARTS (NO EXTERNAL LIBRARIES)
         ------------------------------------------------------------------------ */
      function buildPeriodSeries(items, period) {
        const lostTotal = items.filter(i => i.status === "Lost").length;
        const foundTotal = items.filter(i => i.status === "Found").length;
        const returnedTotal = items.filter(i => i.status === "Returned").length;

        if (period === "7d") {
          return {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            lost: [2, 3, 1, 4, 2, 1, Math.max(1, lostTotal)],
            found: [3, 4, 3, 5, 4, 2, Math.max(1, foundTotal)],
            returned: [1, 2, 2, 3, 3, 2, Math.max(1, returnedTotal)]
          };
        }
        if (period === "30d") {
          return {
            labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
            lost: [7, 9, 6, lostTotal + 4],
            found: [10, 12, 9, foundTotal + 6],
            returned: [6, 8, 7, returnedTotal + 5]
          };
        }
        if (period === "6m") {
          return {
            labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
            lost: [14, 11, 18, 22, 17, lostTotal + 9],
            found: [19, 15, 24, 29, 23, foundTotal + 12],
            returned: [12, 10, 17, 21, 18, returnedTotal + 10]
          };
        }
        return {
          labels: ["Q1", "Q2", "Q3", "Q4"],
          lost: [42, 48, 55, lostTotal + 36],
          found: [58, 64, 72, foundTotal + 48],
          returned: [45, 52, 61, returnedTotal + 41]
        };
      }

      function renderLineChart(items) {
        const host = document.getElementById("lineChartContainer");
        if (!host) return;
        const series = buildPeriodSeries(items, appState.perfPeriod);
        const w = 440, h = 180;
        const padL = 28, padR = 14, padT = 14, padB = 26;
        const plotW = w - padL - padR;
        const plotH = h - padT - padB;

        const allVals = [...series.lost, ...series.found, ...series.returned];
        const maxVal = Math.max(...allVals, 5);
        const stepX = plotW / Math.max(series.labels.length - 1, 1);

        function coords(arr) {
          return arr.map((v, idx) => ({
            x: padL + idx * stepX,
            y: padT + plotH - (v / maxVal) * plotH,
            val: v,
            label: series.labels[idx]
          }));
        }

        function smoothPath(pts) {
          if (pts.length === 0) return "";
          let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
          for (let i = 0; i < pts.length - 1; i++) {
            const cX = (pts[i].x + pts[i + 1].x) / 2;
            d += ` C ${cX.toFixed(1)} ${pts[i].y.toFixed(1)}, ${cX.toFixed(1)} ${pts[i + 1].y.toFixed(1)}, ${pts[i + 1].x.toFixed(1)} ${pts[i + 1].y.toFixed(1)}`;
          }
          return d;
        }

        const pLost = coords(series.lost);
        const pFound = coords(series.found);
        const pRet = coords(series.returned);

        const gridLines = [0, 0.5, 1].map(ratio => {
          const y = padT + plotH - ratio * plotH;
          const val = Math.round(ratio * maxVal);
          return `
            <line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="#EEEEF2" stroke-dasharray="3 3"/>
            <text x="${padL - 6}" y="${y + 3}" font-size="9.5" fill="#929292" text-anchor="end">${val}</text>
          `;
        }).join("");

        const xLabels = series.labels.map((lbl, idx) => `
          <text x="${padL + idx * stepX}" y="${h - 6}" font-size="10" fill="#929292" text-anchor="middle">${lbl}</text>
        `).join("");

        const hoverZones = series.labels.map((lbl, idx) => {
          const cx = padL + idx * stepX;
          return `
            <g class="chart-hover-col" data-idx="${idx}" style="cursor:pointer;">
              <line x1="${cx}" y1="${padT}" x2="${cx}" y2="${padT + plotH}" stroke="#2563EB" stroke-opacity="0" stroke-width="1.5" class="hover-guide"/>
              <circle cx="${pLost[idx].x}" cy="${pLost[idx].y}" r="3.5" fill="#EF4444" stroke="#FFFFFF" stroke-width="1.5"/>
              <circle cx="${pFound[idx].x}" cy="${pFound[idx].y}" r="3.5" fill="#2563EB" stroke="#FFFFFF" stroke-width="1.5"/>
              <circle cx="${pRet[idx].x}" cy="${pRet[idx].y}" r="3.5" fill="#299B73" stroke="#FFFFFF" stroke-width="1.5"/>
              <rect x="${cx - stepX / 2}" y="${padT}" width="${stepX}" height="${plotH}" fill="transparent"/>
            </g>
          `;
        }).join("");

        host.innerHTML = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none">
            <defs>
              <linearGradient id="foundAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#2563EB" stop-opacity="0.16"/>
                <stop offset="100%" stop-color="#2563EB" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            ${gridLines}
            ${xLabels}
            <path d="${smoothPath(pFound)} L ${pFound[pFound.length - 1].x} ${padT + plotH} L ${pFound[0].x} ${padT + plotH} Z" fill="url(#foundAreaGrad)"/>
            <path d="${smoothPath(pLost)}" fill="none" stroke="#EF4444" stroke-width="2.2" stroke-linecap="round"/>
            <path d="${smoothPath(pFound)}" fill="none" stroke="#2563EB" stroke-width="2.4" stroke-linecap="round"/>
            <path d="${smoothPath(pRet)}" fill="none" stroke="#299B73" stroke-width="2.2" stroke-linecap="round"/>
            ${hoverZones}
          </svg>
          <div class="chart-tooltip" id="lineChartTooltip"></div>
        `;

        const tooltip = document.getElementById("lineChartTooltip");
        host.querySelectorAll(".chart-hover-col").forEach(col => {
          col.addEventListener("mouseenter", () => {
            const idx = parseInt(col.getAttribute("data-idx"), 10);
            col.querySelector(".hover-guide").setAttribute("stroke-opacity", "0.35");
            const pct = ((padL + idx * stepX) / w) * 100;
            tooltip.style.left = `${Math.min(Math.max(pct, 16), 84)}%`;
            tooltip.style.top = "38%";
            tooltip.innerHTML = `
              <div style="font-weight:700; margin-bottom:2px;">${series.labels[idx]}</div>
              <div>Lost: <strong>${series.lost[idx]}</strong> &middot; Found: <strong>${series.found[idx]}</strong> &middot; Returned: <strong>${series.returned[idx]}</strong></div>
            `;
            tooltip.style.opacity = "1";
          });
          col.addEventListener("mouseleave", () => {
            col.querySelector(".hover-guide").setAttribute("stroke-opacity", "0");
            tooltip.style.opacity = "0";
          });
        });
      }

      function renderBarChart(items) {
        const host = document.getElementById("barChartContainer");
        if (!host) return;
        const multiplier = appState.recPeriod === "7d" ? 1 : appState.recPeriod === "30d" ? 3 : appState.recPeriod === "6m" ? 8 : 16;

        const bars = [
          { label: "Lost Items", value: items.filter(i => i.status === "Lost").length * multiplier, color: "#EF4444" },
          { label: "Found Items", value: items.filter(i => i.status === "Found").length * multiplier, color: "#2563EB" },
          { label: "Returned", value: items.filter(i => i.status === "Returned").length * multiplier, color: "#299B73" }
        ];

        const w = 340, h = 180;
        const padL = 28, padR = 16, padT = 18, padB = 28;
        const plotW = w - padL - padR;
        const plotH = h - padT - padB;
        const maxVal = Math.max(...bars.map(b => b.value), 5);
        const slotW = plotW / bars.length;
        const barW = 42;

        const gridLines = [0, 0.5, 1].map(r => {
          const y = padT + plotH - r * plotH;
          return `
            <line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="#EEEEF2" stroke-dasharray="3 3"/>
            <text x="${padL - 6}" y="${y + 3}" font-size="9.5" fill="#929292" text-anchor="end">${Math.round(r * maxVal)}</text>
          `;
        }).join("");

        const barEls = bars.map((b, idx) => {
          const barH = Math.max((b.value / maxVal) * plotH, 6);
          const x = padL + idx * slotW + (slotW - barW) / 2;
          const y = padT + plotH - barH;
          return `
            <g class="bar-hover-group" data-label="${b.label}" data-val="${b.value}" style="cursor:pointer;">
              <rect x="${x}" y="${padT}" width="${barW}" height="${plotH}" rx="8" fill="#F3F5F9"/>
              <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="8" fill="${b.color}"/>
              <text x="${x + barW / 2}" y="${y - 5}" font-size="10.5" font-weight="700" fill="#171717" text-anchor="middle">${b.value}</text>
              <text x="${x + barW / 2}" y="${h - 8}" font-size="10" font-weight="500" fill="#6B7280" text-anchor="middle">${b.label}</text>
            </g>
          `;
        }).join("");

        host.innerHTML = `
          <svg viewBox="0 0 ${w} ${h}" width="100%" height="100%">
            ${gridLines}
            ${barEls}
          </svg>
          <div class="chart-tooltip" id="barChartTooltip"></div>
        `;

        const tooltip = document.getElementById("barChartTooltip");
        host.querySelectorAll(".bar-hover-group").forEach((g, idx) => {
          g.addEventListener("mouseenter", () => {
            tooltip.style.left = `${22 + idx * 28}%`;
            tooltip.style.top = "32%";
            tooltip.innerHTML = `<strong>${g.getAttribute("data-label")}</strong>: ${g.getAttribute("data-val")} items`;
            tooltip.style.opacity = "1";
          });
          g.addEventListener("mouseleave", () => {
            tooltip.style.opacity = "0";
          });
        });
      }

      function renderDonutChart(items) {
        const host = document.getElementById("donutChartContainer");
        if (!host) return;
        const total = items.length || 1;
        const counts = CATEGORIES.map(cat => ({
          ...cat,
          count: items.filter(i => i.category === cat.name).length
        }));

        const radius = 44;
        const circumference = 2 * Math.PI * radius;
        let offset = 0;

        const segments = counts.map(c => {
          const sliceLen = (c.count / total) * circumference;
          const seg = `
            <circle cx="60" cy="60" r="${radius}" fill="transparent"
              stroke="${c.color}" stroke-width="14"
              stroke-dasharray="${sliceLen.toFixed(2)} ${circumference.toFixed(2)}"
              stroke-dashoffset="${(-offset).toFixed(2)}"
              transform="rotate(-90 60 60)" />
          `;
          offset += sliceLen;
          return seg;
        }).join("");

        host.innerHTML = `
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="${radius}" fill="transparent" stroke="#F1F5F9" stroke-width="14"/>
            ${segments}
            <text x="60" y="57" font-size="18" font-weight="700" fill="#171717" text-anchor="middle">${items.length}</text>
            <text x="60" y="71" font-size="9.5" font-weight="500" fill="#929292" text-anchor="middle">Items</text>
          </svg>
          <div class="donut-legend-grid">
            ${counts.map(c => `
              <div class="donut-legend-row">
                <span class="donut-legend-left">
                  <span class="legend-dot" style="background:${c.color}; flex-shrink:0;"></span>
                  <span class="donut-legend-name">${escapeHtml(c.name.replace("Identification Cards", "ID Cards"))}</span>
                </span>
                <strong style="color:var(--text-primary);">${c.count}</strong>
              </div>
            `).join("")}
          </div>
        `;
      }

      /* ------------------------------------------------------------------------
         10. SUB-PAGES: BROWSE ITEMS, REPORT FORMS, MY REPORTS, MY CLAIMS
         ------------------------------------------------------------------------ */
      function renderBrowseItemsView() {
        document.getElementById("pageHeaderTitle").textContent = "Browse Campus Items";
        document.getElementById("pageHeaderGreeting").textContent = "Search verified campus lost & found records or submit an ownership claim.";

        const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
        const f = appState.browseFilters;

        const filtered = items.filter(item => {
          const matchStatus = f.status === "All" || item.status === f.status;
          const matchCat = f.category === "All" || item.category === f.category;
          const matchLoc = f.location === "All" || item.location === f.location;
          const matchDate = !f.date || item.date === f.date;
          const q = f.search.trim().toLowerCase();
          const matchSearch = !q ||
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.location.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q);
          return matchStatus && matchCat && matchLoc && matchDate && matchSearch;
        });

        const container = document.getElementById("mainViewContainer");
        container.innerHTML = `
          <div class="filter-toolbar">
            <div class="search-input-box">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input class="input-control" id="browseSearchInput" type="search" placeholder="Search by item name, ID, location, or description..." value="${escapeHtml(f.search)}" />
            </div>

            <select class="select-control" id="browseCatSelect" style="width:auto; min-width:140px;">
              <option value="All">All Categories</option>
              ${CATEGORIES.map(c => `<option value="${c.name}" ${f.category === c.name ? "selected" : ""}>${c.name}</option>`).join("")}
            </select>

            <select class="select-control" id="browseLocSelect" style="width:auto; min-width:155px;">
              <option value="All">All Locations</option>
              ${CAMPUS_LOCATIONS.map(loc => `<option value="${loc}" ${f.location === loc ? "selected" : ""}>${loc}</option>`).join("")}
            </select>

            <input class="input-control" id="browseDateInput" type="date" style="width:auto;" value="${escapeHtml(f.date)}" />
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
            <div class="pill-tabs">
              ${["All", "Lost", "Found", "Returned"].map(st => `
                <button type="button" class="pill-tab ${f.status === st ? "active" : ""}" data-browse-status="${st}">${st}</button>
              `).join("")}
            </div>
            <div style="font-size:11.5px; color:var(--text-secondary);">Showing <strong>${filtered.length}</strong> of ${items.length} items</div>
          </div>

          ${filtered.length === 0 ? `
            <div class="card" style="padding:36px; text-align:center;">
              <div style="font-size:14px; font-weight:700; margin-bottom:4px;">No matching items found</div>
              <div style="color:var(--text-muted); margin-bottom:14px;">Try clearing your search filters or report a missing belonging.</div>
              <button class="btn btn-outline btn-sm" id="resetBrowseFiltersBtn" type="button">Reset Filters</button>
            </div>
          ` : `
            <div class="items-grid-3">
              ${filtered.map(item => `
                <article class="item-card">
                  <div class="item-card-img-wrap">
                    <img src="${item.image}" alt="${escapeHtml(item.name)}" />
                    <span class="badge ${item.status === "Lost" ? "badge-lost" : item.status === "Returned" ? "badge-returned" : "badge-found"} item-card-badge">${escapeHtml(item.status)}</span>
                  </div>
                  <div class="item-card-body">
                    <div style="font-size:10.5px; font-weight:600; color:var(--primary-blue);">${escapeHtml(item.category)} &middot; ${escapeHtml(item.id)}</div>
                    <h4 class="item-card-title">${escapeHtml(item.name)}</h4>
                    <div class="item-card-meta">
                      <span>Location: ${escapeHtml(item.location)}</span>
                      <span>Date: ${escapeHtml(item.date)} (${escapeHtml(item.timeAgo)})</span>
                    </div>
                  </div>
                  <div class="item-card-footer">
                    <button class="btn btn-outline btn-sm" data-view-item="${item.id}" type="button">View Details</button>
                    ${item.status !== "Returned" ? `
                      <button class="btn btn-primary btn-sm" data-claim-item="${item.id}" type="button">
                        ${item.status === "Found" ? "Claim Item" : "I Found This"}
                      </button>
                    ` : `<span style="font-size:11px; color:var(--secondary-green); font-weight:600;">Returned</span>`}
                  </div>
                </article>
              `).join("")}
            </div>
          `}
        `;
      }

      function renderReportFormView(reportType) {
        const isLost = reportType === "Lost";
        document.getElementById("pageHeaderTitle").textContent = isLost ? "Report Lost Item" : "Report Found Item";
        document.getElementById("pageHeaderGreeting").textContent = isLost
          ? "Provide accurate details so the campus community and security team can help locate your item."
          : "Log a found belonging into the FindIt registry to reunite it with its owner.";

        const container = document.getElementById("mainViewContainer");
        container.innerHTML = `
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">${isLost ? "Lost Property Submission Form" : "Found Property Submission Form"}</h3>
              <span class="badge ${isLost ? "badge-lost" : "badge-found"}">${reportType} Report</span>
            </div>

            <form id="itemReportForm" data-report-type="${reportType}" class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="repItemName">Item Name *</label>
                <input class="input-control" id="repItemName" required placeholder="e.g., Blue HydroFlask, Graphing Calculator, Student ID" />
              </div>

              <div class="form-group">
                <label class="form-label" for="repCategory">Category *</label>
                <select class="select-control" id="repCategory" required>
                  ${CATEGORIES.map(c => `<option value="${c.name}">${c.name}</option>`).join("")}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="repLocation">Campus Location *</label>
                <select class="select-control" id="repLocation" required>
                  ${CAMPUS_LOCATIONS.map(loc => `<option value="${loc}">${loc}</option>`).join("")}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="repDate">Date ${isLost ? "Lost" : "Found"} *</label>
                <input class="input-control" id="repDate" type="date" required value="${formatDateISO(TODAY)}" />
              </div>

              <div class="form-group full">
                <label class="form-label" for="repDesc">Detailed Description &amp; Identifying Features *</label>
                <textarea class="textarea-control" id="repDesc" rows="3" required placeholder="Describe brand, color, serial numbers, stickers, or contents..."></textarea>
              </div>

              <div class="form-group full">
                <label class="form-label">Item Photograph (Upload or Choose Sample Preset)</label>
                <div class="dropzone" id="reportDropzone">
                  <input type="file" id="repFileInput" accept="image/*" style="display:none;" />
                  <div id="repImagePreviewBox">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="1.8" style="margin-bottom:4px;"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <div style="font-weight:600; color:var(--text-primary);">Click to upload photo or drag &amp; drop</div>
                    <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">PNG, JPG, or SVG &middot; Or leave blank for automatic category illustration</div>
                  </div>
                </div>
              </div>

              <div class="form-group full" style="flex-direction:row; justify-content:flex-end; gap:10px; margin-top:4px;">
                <button class="btn btn-outline" data-nav="dashboard" type="button">Cancel</button>
                <button class="btn btn-primary" type="submit">Submit ${reportType} Report</button>
              </div>
            </form>
          </div>
        `;

        // Drag & drop + FileReader handler
        const dropzone = document.getElementById("reportDropzone");
        const fileInput = document.getElementById("repFileInput");
        dropzone.dataset.imageData = "";

        function handleSelectedFile(file) {
          if (!file || !file.type.startsWith("image/")) return;
          const reader = new FileReader();
          reader.onload = e => {
            dropzone.dataset.imageData = e.target.result;
            document.getElementById("repImagePreviewBox").innerHTML = `
              <img src="${e.target.result}" alt="Preview" style="max-height:130px; border-radius:8px; margin-bottom:6px; border:1px solid var(--border-color);" />
              <div style="font-size:11px; color:var(--secondary-green); font-weight:600;">Image ready (${escapeHtml(file.name)})</div>
            `;
          };
          reader.readAsDataURL(file);
        }

        dropzone.addEventListener("click", () => fileInput.click());
        fileInput.addEventListener("change", e => handleSelectedFile(e.target.files[0]));
        dropzone.addEventListener("dragover", e => { e.preventDefault(); dropzone.classList.add("dragover"); });
        dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
        dropzone.addEventListener("drop", e => {
          e.preventDefault();
          dropzone.classList.remove("dragover");
          handleSelectedFile(e.dataTransfer.files[0]);
        });
      }

      function renderMyReportsView() {
        const user = getCurrentUser();
        const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
        const myItems = items.filter(i => i.reporterId === user.id);

        document.getElementById("pageHeaderTitle").textContent = "My Reports";
        document.getElementById("pageHeaderGreeting").textContent = `Manage lost and found items submitted by ${user.name}.`;

        document.getElementById("mainViewContainer").innerHTML = `
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Submitted Reports (${myItems.length})</h3>
              <div style="display:flex; gap:8px;">
                <button class="btn btn-outline btn-sm" data-nav="report-lost" type="button">+ Report Lost</button>
                <button class="btn btn-primary btn-sm" data-nav="report-found" type="button">+ Report Found</button>
              </div>
            </div>
            ${myItems.length === 0 ? `
              <div style="padding:28px; text-align:center; color:var(--text-muted);">You have not submitted any reports yet.</div>
            ` : `
              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Category</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th style="text-align:right;">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${myItems.map(item => `
                      <tr>
                        <td>
                          <div class="notice-title-cell">
                            <img class="report-thumb" src="${item.image}" alt="" />
                            <div>
                              <div style="font-weight:600;">${escapeHtml(item.name)}</div>
                              <div style="font-size:10.5px; color:var(--text-muted);">${escapeHtml(item.id)}</div>
                            </div>
                          </div>
                        </td>
                        <td>${escapeHtml(item.category)}</td>
                        <td>${escapeHtml(item.location)}</td>
                        <td>${escapeHtml(item.date)}</td>
                        <td><span class="badge ${item.status === "Lost" ? "badge-lost" : item.status === "Returned" ? "badge-returned" : "badge-found"}">${escapeHtml(item.status)}</span></td>
                        <td style="text-align:right; white-space:nowrap;">
                          <button class="btn btn-outline btn-sm" data-view-item="${item.id}" type="button">View</button>
                          ${item.status !== "Returned" ? `<button class="btn btn-green btn-sm" data-mark-returned="${item.id}" type="button">Mark Returned</button>` : ""}
                          <button class="btn btn-danger btn-sm" data-delete-item="${item.id}" type="button">Delete</button>
                        </td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        `;
      }

      function renderMyClaimsView() {
        const user = getCurrentUser();
        const claims = readStore(STORAGE_KEYS.CLAIMS, SEED_CLAIMS);
        const myClaims = claims.filter(c => c.claimantId === user.id);

        document.getElementById("pageHeaderTitle").textContent = "My Claims";
        document.getElementById("pageHeaderGreeting").textContent = "Track ownership verification status and administrator responses.";

        document.getElementById("mainViewContainer").innerHTML = `
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Ownership Claims (${myClaims.length})</h3>
              <button class="btn btn-primary btn-sm" data-nav="browse-items" type="button">Browse Found Items</button>
            </div>
            ${myClaims.length === 0 ? `
              <div style="padding:28px; text-align:center; color:var(--text-muted);">No claims submitted yet.</div>
            ` : `
              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Claim ID</th>
                      <th>Item</th>
                      <th>Ownership Proof</th>
                      <th>Submitted</th>
                      <th>Status</th>
                      <th style="text-align:right;">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${myClaims.map(c => `
                      <tr>
                        <td style="font-weight:600;">${escapeHtml(c.id)}</td>
                        <td>
                          <div class="notice-title-cell">
                            <img class="report-thumb" src="${c.itemImage}" alt="" />
                            <div>
                              <div style="font-weight:600;">${escapeHtml(c.itemName)}</div>
                              ${c.adminNote ? `<div style="font-size:10.5px; color:var(--primary-blue);">Note: ${escapeHtml(c.adminNote)}</div>` : ""}
                            </div>
                          </div>
                        </td>
                        <td style="max-width:240px; color:var(--text-secondary);">${escapeHtml(c.proofDescription)}</td>
                        <td>${escapeHtml(c.submittedDate)}</td>
                        <td><span class="badge ${c.status === "Approved" ? "badge-approved" : c.status === "Rejected" ? "badge-rejected" : c.status === "Info Requested" ? "badge-info" : "badge-pending"}">${escapeHtml(c.status)}</span></td>
                        <td style="text-align:right;">
                          <button class="btn btn-outline btn-sm" data-view-item="${c.itemId}" type="button">Item</button>
                        </td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        `;
      }

      /* ------------------------------------------------------------------------
         11. COMMUNITY & ACCOUNT VIEWS (NOTIFICATIONS, ANNOUNCEMENTS, ACCOUNT, HELP, SETTINGS)
         ------------------------------------------------------------------------ */
      function renderNotificationsView() {
        const role = getSession().activeRole;
        const notifs = readStore(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS)
          .filter(n => n.targetRole === "All" || n.targetRole === role);

        document.getElementById("pageHeaderTitle").textContent = "Notifications";
        document.getElementById("pageHeaderGreeting").textContent = "Real-time alerts on item matches, claim approvals, and campus updates.";

        document.getElementById("mainViewContainer").innerHTML = `
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Activity Alerts (${notifs.length})</h3>
              <button class="btn btn-outline btn-sm" id="viewMarkAllReadBtn" type="button">Mark All as Read</button>
            </div>
            <div>
              ${notifs.map(n => `
                <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:12px; border-radius:10px; border:1px solid var(--border-color); margin-bottom:8px; background:${n.read ? "#FFFFFF" : "#F4F8FF"};">
                  <div style="display:flex; gap:10px;">
                    <span style="width:9px; height:9px; border-radius:50%; background:${n.read ? "#CBD5E1" : "#2563EB"}; margin-top:5px; flex-shrink:0;"></span>
                    <div>
                      <div style="font-weight:600; font-size:12.5px;">${escapeHtml(n.title)}</div>
                      <div style="color:var(--text-secondary); font-size:12px; margin-top:2px;">${escapeHtml(n.message)}</div>
                      <div style="color:var(--text-muted); font-size:10.5px; margin-top:4px;">${escapeHtml(n.time)}</div>
                    </div>
                  </div>
                  ${!n.read ? `<button class="btn btn-outline btn-sm" data-read-notif="${n.id}" type="button">Mark Read</button>` : `<span class="badge badge-neutral">Read</span>`}
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }

      function renderAnnouncementsView() {
        const announcements = readStore(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
        const admin = isAdminMode();

        document.getElementById("pageHeaderTitle").textContent = "Campus Announcements";
        document.getElementById("pageHeaderGreeting").textContent = "Official notices from the FindIt Lost & Found Management Office.";

        document.getElementById("mainViewContainer").innerHTML = `
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">All Campus Bulletins (${announcements.length})</h3>
              ${admin ? `<button class="btn btn-primary btn-sm" id="dashAddNoticeBtn" type="button">+ Publish Announcement</button>` : ""}
            </div>
            <div style="display:flex; flex-direction:column; gap:12px;">
              ${announcements.map(ann => `
                <div style="display:flex; align-items:center; justify-content:space-between; gap:14px; padding:14px; border:1px solid var(--border-color); border-radius:12px; flex-wrap:wrap;">
                  <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:240px;">
                    <img src="${ann.thumbnail}" alt="" style="width:56px; height:44px; border-radius:8px; object-fit:cover; border:1px solid var(--border-color);" />
                    <div>
                      <div style="font-size:13.5px; font-weight:700;">${escapeHtml(ann.title)}</div>
                      <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">${escapeHtml(ann.summary)}</div>
                      <div style="font-size:10.5px; color:var(--text-muted); margin-top:4px;">Posted ${escapeHtml(ann.date)} by <strong>${escapeHtml(ann.author)}</strong> &middot; ${ann.views} views</div>
                    </div>
                  </div>
                  <div style="display:flex; gap:6px;">
                    <button class="btn btn-outline btn-sm" data-read-notice="${ann.id}" type="button">Read Full Details</button>
                    ${admin ? `
                      <button class="btn btn-outline btn-sm" data-edit-notice="${ann.id}" type="button">Edit</button>
                      <button class="btn btn-danger btn-sm" data-del-notice="${ann.id}" type="button">Delete</button>
                    ` : ""}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }

      function renderAccountView() {
        const user = getCurrentUser();
        document.getElementById("pageHeaderTitle").textContent = "Account Profile";
        document.getElementById("pageHeaderGreeting").textContent = "Manage your campus contact details for rapid lost-item recovery.";

        document.getElementById("mainViewContainer").innerHTML = `
          <div class="card">
            <div style="display:flex; align-items:center; gap:14px; padding-bottom:14px; border-bottom:1px solid var(--border-color); margin-bottom:14px;">
              <img src="${user.avatar}" alt="${escapeHtml(user.name)}" style="width:58px; height:58px; border-radius:50%;" />
              <div>
                <h3 style="font-size:16px; font-weight:700;">${escapeHtml(user.name)}</h3>
                <div style="color:var(--text-secondary); font-size:12px;">${escapeHtml(user.role)} &middot; ${escapeHtml(user.department)}</div>
                <span class="badge badge-approved" style="margin-top:4px;">Verified Campus ID: ${escapeHtml(user.studentId)}</span>
              </div>
            </div>
            <form id="accountProfileForm" class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input class="input-control" id="accName" value="${escapeHtml(user.name)}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Campus Email</label>
                <input class="input-control" id="accEmail" type="email" value="${escapeHtml(user.email)}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Department / College</label>
                <input class="input-control" id="accDept" value="${escapeHtml(user.department)}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Contact Phone</label>
                <input class="input-control" id="accPhone" value="${escapeHtml(user.phone)}" required />
              </div>
              <div class="form-group full" style="flex-direction:row; justify-content:flex-end;">
                <button class="btn btn-primary" type="submit">Save Profile Changes</button>
              </div>
            </form>
          </div>
        `;
      }

      function renderHelpView() {
        document.getElementById("pageHeaderTitle").textContent = "Help Center & Campus Guidelines";
        document.getElementById("pageHeaderGreeting").textContent = "Everything you need to know about reporting, claiming, and verifying items.";

        document.getElementById("mainViewContainer").innerHTML = `
          <div class="card">
            <h3 class="card-title" style="margin-bottom:10px;">How FindIt Works</h3>
            <div style="display:flex; flex-direction:column; gap:10px;">
              <div style="padding:12px; background:#F8FAFC; border-radius:10px; border:1px solid var(--border-color);">
                <strong>1. Reporting a Lost Belonging</strong>
                <p style="color:var(--text-secondary); margin-top:3px;">Navigate to <em>Report Lost</em>, select the category and last known campus building, and describe distinguishing features.</p>
              </div>
              <div style="padding:12px; background:#F8FAFC; border-radius:10px; border:1px solid var(--border-color);">
                <strong>2. Claiming a Found Item</strong>
                <p style="color:var(--text-secondary); margin-top:3px;">Open <em>Browse Items</em>, locate your item, click <em>Claim Item</em>, and submit proof of ownership (serial number, lock screen, contents).</p>
              </div>
              <div style="padding:12px; background:#F8FAFC; border-radius:10px; border:1px solid var(--border-color);">
                <strong>3. Physical Pickup &amp; Verification</strong>
                <p style="color:var(--text-secondary); margin-top:3px;">Once approved by an Administrator in the Verification Center, visit Student Union Desk #2 with your Student ID.</p>
              </div>
            </div>
          </div>
        `;
      }

      function renderSettingsView() {
        document.getElementById("pageHeaderTitle").textContent = "System Settings";
        document.getElementById("pageHeaderGreeting").textContent = "Configure notifications, role workspace, and local demonstration data.";

        document.getElementById("mainViewContainer").innerHTML = `
          <div class="card">
            <h3 class="card-title" style="margin-bottom:12px;">Preferences &amp; Data Management</h3>
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div style="display:flex; align-items:center; justify-content:space-between; padding:12px; border:1px solid var(--border-color); border-radius:10px;">
                <div>
                  <div style="font-weight:600;">Instant Match Notifications</div>
                  <div style="font-size:11.5px; color:var(--text-muted);">Receive alerts when new items match your reported category.</div>
                </div>
                <input type="checkbox" checked style="width:16px; height:16px; accent-color:#2563EB;" />
              </div>

              <div style="display:flex; align-items:center; justify-content:space-between; padding:12px; border:1px solid var(--border-color); border-radius:10px; flex-wrap:wrap; gap:10px;">
                <div>
                  <div style="font-weight:600;">Reset Demo Database</div>
                  <div style="font-size:11.5px; color:var(--text-muted);">Restore original sample items, claims, announcements, and schedules in LocalStorage.</div>
                </div>
                <button class="btn btn-danger btn-sm" id="resetDemoDataBtn" type="button">Reset LocalStorage Data</button>
              </div>
            </div>
          </div>
        `;
      }

      /* ------------------------------------------------------------------------
         12. ADMINISTRATOR SUB-PAGES (TABLES, VERIFICATION CENTER, USERS, ANALYTICS)
         ------------------------------------------------------------------------ */
      function renderAdminItemsTable(filterMode) {
        const titles = {
          all: ["All Campus Items", "Complete inventory of registered lost, found, and returned belongings."],
          lost: ["Lost Reports Management", "Active lost item reports awaiting campus recovery."],
          found: ["Found Reports Management", "Found belongings cataloged in the campus repository."],
          returned: ["Returned Items Archive", "Successfully verified and returned campus belongings."]
        };
        const [title, sub] = titles[filterMode];
        document.getElementById("pageHeaderTitle").textContent = title;
        document.getElementById("pageHeaderGreeting").textContent = sub;

        let items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
        if (filterMode === "lost") items = items.filter(i => i.status === "Lost");
        if (filterMode === "found") items = items.filter(i => i.status === "Found");
        if (filterMode === "returned") items = items.filter(i => i.status === "Returned");

        const tf = appState.adminTableFilters;
        const filtered = items.filter(i => {
          const matchCat = tf.category === "All" || i.category === tf.category;
          const q = tf.search.trim().toLowerCase();
          const matchQ = !q || i.name.toLowerCase().includes(q) || i.id.toLowerCase().includes(q) || i.reporterName.toLowerCase().includes(q);
          return matchCat && matchQ;
        });

        const totalPages = Math.max(1, Math.ceil(filtered.length / tf.perPage));
        const page = Math.min(tf.page, totalPages);
        const pageSlice = filtered.slice((page - 1) * tf.perPage, page * tf.perPage);

        document.getElementById("mainViewContainer").innerHTML = `
          <div class="card">
            <div class="card-header" style="flex-wrap:wrap;">
              <div style="display:flex; gap:8px; flex:1; min-width:240px;">
                <input class="input-control" id="adminTableSearch" placeholder="Search ID, item, or reporter..." value="${escapeHtml(tf.search)}" style="max-width:280px;" />
                <select class="select-control" id="adminTableCat" style="max-width:170px;">
                  <option value="All">All Categories</option>
                  ${CATEGORIES.map(c => `<option value="${c.name}" ${tf.category === c.name ? "selected" : ""}>${c.name}</option>`).join("")}
                </select>
              </div>
              <div style="display:flex; gap:8px;">
                <button class="btn btn-outline btn-sm" data-nav="report-lost" type="button">+ Add Lost</button>
                <button class="btn btn-primary btn-sm" data-nav="report-found" type="button">+ Add Found</button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Reporter</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th style="text-align:right;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${pageSlice.length === 0 ? `<tr><td colspan="8" style="text-align:center; padding:24px; color:var(--text-muted);">No records found.</td></tr>` : pageSlice.map(item => `
                    <tr>
                      <td style="font-weight:600;">${escapeHtml(item.id)}</td>
                      <td>
                        <div class="notice-title-cell">
                          <img class="report-thumb" src="${item.image}" alt="" />
                          <span style="font-weight:600;">${escapeHtml(item.name)}</span>
                        </div>
                      </td>
                      <td>${escapeHtml(item.category)}</td>
                      <td>${escapeHtml(item.location)}</td>
                      <td>
                        <div style="display:flex; align-items:center; gap:6px;">
                          <img src="${item.reporterAvatar}" alt="" style="width:22px; height:22px; border-radius:50%;" />
                          <span>${escapeHtml(item.reporterName)}</span>
                        </div>
                      </td>
                      <td style="white-space:nowrap;">${escapeHtml(item.date)}</td>
                      <td><span class="badge ${item.status === "Lost" ? "badge-lost" : item.status === "Returned" ? "badge-returned" : "badge-found"}">${escapeHtml(item.status)}</span></td>
                      <td style="text-align:right; white-space:nowrap;">
                        <button class="btn btn-outline btn-sm" data-view-item="${item.id}" type="button">Details</button>
                        ${item.status !== "Returned" ? `<button class="btn btn-green btn-sm" data-mark-returned="${item.id}" type="button">Return</button>` : ""}
                        <button class="btn btn-danger btn-sm" data-delete-item="${item.id}" type="button">Delete</button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>

            <div style="display:flex; align-items:center; justify-content:space-between; margin-top:12px; font-size:11.5px; color:var(--text-secondary);">
              <span>Page <strong>${page}</strong> of <strong>${totalPages}</strong> (${filtered.length} records)</span>
              <div style="display:flex; gap:6px;">
                <button class="btn btn-outline btn-sm" id="adminPrevPage" ${page <= 1 ? "disabled" : ""} type="button">Prev</button>
                <button class="btn btn-outline btn-sm" id="adminNextPage" ${page >= totalPages ? "disabled" : ""} type="button">Next</button>
              </div>
            </div>
          </div>
        `;
      }

      function renderAdminClaimsTable() {
        document.getElementById("pageHeaderTitle").textContent = "Claims Management";
        document.getElementById("pageHeaderGreeting").textContent = "Audit all student and staff ownership claims across campus.";

        const claims = readStore(STORAGE_KEYS.CLAIMS, SEED_CLAIMS);
        document.getElementById("mainViewContainer").innerHTML = `
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">All Ownership Claims (${claims.length})</h3>
              <button class="btn btn-primary btn-sm" data-nav="verification-center" type="button">Open Verification Center</button>
            </div>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Claim ID</th>
                    <th>Item</th>
                    <th>Claimant</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th style="text-align:right;">Quick Review</th>
                  </tr>
                </thead>
                <tbody>
                  ${claims.map(c => `
                    <tr>
                      <td style="font-weight:600;">${escapeHtml(c.id)}</td>
                      <td>
                        <div class="notice-title-cell">
                          <img class="report-thumb" src="${c.itemImage}" alt="" />
                          <span style="font-weight:600;">${escapeHtml(c.itemName)}</span>
                        </div>
                      </td>
                      <td>${escapeHtml(c.claimantName)} <span style="color:var(--text-muted);">(${escapeHtml(c.claimantStudentId)})</span></td>
                      <td>${escapeHtml(c.submittedDate)}</td>
                      <td><span class="badge ${c.status === "Approved" ? "badge-approved" : c.status === "Rejected" ? "badge-rejected" : c.status === "Info Requested" ? "badge-info" : "badge-pending"}">${escapeHtml(c.status)}</span></td>
                      <td style="text-align:right; white-space:nowrap;">
                        ${c.status === "Pending" || c.status === "Info Requested" ? `
                          <button class="btn btn-green btn-sm" data-verify-action="Approved" data-claim-id="${c.id}" type="button">Approve</button>
                          <button class="btn btn-danger btn-sm" data-verify-action="Rejected" data-claim-id="${c.id}" type="button">Reject</button>
                        ` : `<button class="btn btn-outline btn-sm" data-nav="verification-center" type="button">Review</button>`}
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      function renderVerificationCenter() {
        document.getElementById("pageHeaderTitle").textContent = "Verification Center";
        document.getElementById("pageHeaderGreeting").textContent = "Inspect ownership proof, verify claimant credentials, and authorize item release.";

        const claims = readStore(STORAGE_KEYS.CLAIMS, SEED_CLAIMS);
        const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);

        document.getElementById("mainViewContainer").innerHTML = `
          <div class="verify-grid">
            ${claims.map(c => {
              const item = items.find(i => i.id === c.itemId) || {};
              return `
                <div class="verify-card">
                  <div style="display:flex; align-items:center; justify-content:space-between;">
                    <span style="font-weight:700; color:var(--primary-blue);">${escapeHtml(c.id)} &middot; ${escapeHtml(c.itemId)}</span>
                    <span class="badge ${c.status === "Approved" ? "badge-approved" : c.status === "Rejected" ? "badge-rejected" : c.status === "Info Requested" ? "badge-info" : "badge-pending"}">${escapeHtml(c.status)}</span>
                  </div>

                  <div style="display:flex; gap:12px; align-items:center; background:#F8FAFC; padding:10px; border-radius:10px; border:1px solid var(--border-color);">
                    <img src="${c.itemImage}" alt="" style="width:68px; height:54px; border-radius:8px; object-fit:cover;" />
                    <div>
                      <div style="font-weight:700; font-size:13px;">${escapeHtml(c.itemName)}</div>
                      <div style="font-size:11px; color:var(--text-secondary);">Location: ${escapeHtml(item.location || "Campus Repository")}</div>
                      <div style="font-size:11px; color:var(--text-muted);">Item Desc: ${escapeHtml(item.description || "")}</div>
                    </div>
                  </div>

                  <div style="font-size:12px;">
                    <div style="font-weight:600; margin-bottom:3px;">Claimant: ${escapeHtml(c.claimantName)} (${escapeHtml(c.claimantStudentId)})</div>
                    <div style="color:var(--text-muted); font-size:11px; margin-bottom:6px;">${escapeHtml(c.claimantEmail)} &middot; Submitted ${escapeHtml(c.submittedDate)}</div>
                    <div style="padding:10px; background:#FFFBEB; border:1px solid #FDE68A; border-radius:8px; color:#78350F;">
                      <strong>Ownership Proof:</strong> "${escapeHtml(c.proofDescription)}"
                    </div>
                    ${c.adminNote ? `<div style="margin-top:6px; font-size:11px; color:var(--primary-blue);"><strong>Admin Note:</strong> ${escapeHtml(c.adminNote)}</div>` : ""}
                  </div>

                  <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:auto; padding-top:8px; border-top:1px solid var(--border-color);">
                    <button class="btn btn-green btn-sm" data-verify-action="Approved" data-claim-id="${c.id}" type="button">Approve &amp; Mark Returned</button>
                    <button class="btn btn-danger btn-sm" data-verify-action="Rejected" data-claim-id="${c.id}" type="button">Reject Claim</button>
                    <button class="btn btn-outline btn-sm" data-verify-action="Info Requested" data-claim-id="${c.id}" type="button">Request More Info</button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        `;
      }

      function renderManageUsersView() {
        document.getElementById("pageHeaderTitle").textContent = "Manage Campus Users";
        document.getElementById("pageHeaderGreeting").textContent = "Directory of registered students, faculty members, and Lost & Found administrators.";

        const users = readStore(STORAGE_KEYS.USERS, SEED_USERS);
        const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);

        document.getElementById("mainViewContainer").innerHTML = `
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Registered Accounts (${users.length})</h3>
            </div>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Campus ID</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Reports</th>
                    <th>Status</th>
                    <th style="text-align:right;">Role Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${users.map(u => {
                    const count = items.filter(i => i.reporterId === u.id).length;
                    return `
                      <tr>
                        <td>
                          <div style="display:flex; align-items:center; gap:9px;">
                            <img src="${u.avatar}" alt="" style="width:30px; height:30px; border-radius:50%;" />
                            <div>
                              <div style="font-weight:600;">${escapeHtml(u.name)}</div>
                              <div style="font-size:10.5px; color:var(--text-muted);">${escapeHtml(u.email)}</div>
                            </div>
                          </div>
                        </td>
                        <td>${escapeHtml(u.studentId)}</td>
                        <td>${escapeHtml(u.department)}</td>
                        <td><span class="badge ${u.role === "Administrator" ? "badge-found" : "badge-neutral"}">${escapeHtml(u.role)}</span></td>
                        <td><strong>${count}</strong></td>
                        <td><span class="badge badge-approved">${escapeHtml(u.status)}</span></td>
                        <td style="text-align:right;">
                          <button class="btn btn-outline btn-sm" data-toggle-user-role="${u.id}" type="button">
                            ${u.role === "Administrator" ? "Set Student" : "Promote Admin"}
                          </button>
                        </td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      function renderReportsAnalyticsView() {
        document.getElementById("pageHeaderTitle").textContent = "Reports & Analytics";
        document.getElementById("pageHeaderGreeting").textContent = "Recovery performance metrics, category distributions, and campus hotspot breakdown.";

        const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
        const total = items.length || 1;
        const returned = items.filter(i => i.status === "Returned").length;
        const recoveryRate = Math.round((returned / total) * 100);

        const locCounts = CAMPUS_LOCATIONS.map(loc => ({
          loc,
          count: items.filter(i => i.location === loc).length
        })).sort((a, b) => b.count - a.count);

        document.getElementById("mainViewContainer").innerHTML = `
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-info">
                <div class="kpi-label">Recovery Rate</div>
                <div class="kpi-value" style="color:var(--secondary-green);">${recoveryRate}%</div>
                <div class="kpi-trend" style="color:var(--text-muted);">${returned} of ${items.length} returned</div>
              </div>
              <div class="kpi-icon-box green">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
              </div>
            </div>
            <div class="kpi-card">
              <div class="kpi-info">
                <div class="kpi-label">Avg Turnaround</div>
                <div class="kpi-value">18.4h</div>
                <div class="kpi-trend" style="color:var(--primary-blue);">Claim verification time</div>
              </div>
              <div class="kpi-icon-box">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
            </div>
            <div class="kpi-card">
              <div class="kpi-info">
                <div class="kpi-label">Top Hotspot</div>
                <div class="kpi-value" style="font-size:15px;">Main Library</div>
                <div class="kpi-trend" style="color:var(--amber);">Highest report volume</div>
              </div>
              <div class="kpi-icon-box amber">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
            </div>
            <div class="kpi-card">
              <div class="kpi-info">
                <div class="kpi-label">Active Claims</div>
                <div class="kpi-value">${readStore(STORAGE_KEYS.CLAIMS, SEED_CLAIMS).filter(c => c.status === "Pending").length}</div>
                <div class="kpi-trend" style="color:var(--rose);">Pending review</div>
              </div>
              <div class="kpi-icon-box rose">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
            </div>
          </div>

          <div class="analytics-grid">
            <div class="card">
              <div class="card-header"><h3 class="card-title">Reports by Campus Location</h3></div>
              <div style="display:flex; flex-direction:column; gap:10px;">
                ${locCounts.map(row => {
                  const pct = Math.round((row.count / total) * 100);
                  return `
                    <div>
                      <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-bottom:4px;">
                        <span style="font-weight:500;">${escapeHtml(row.loc)}</span>
                        <strong>${row.count} (${pct}%)</strong>
                      </div>
                      <div style="height:7px; background:#F1F5F9; border-radius:99px; overflow:hidden;">
                        <div style="height:100%; width:${pct}%; background:var(--primary-blue); border-radius:99px;"></div>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>

            <div class="card">
              <div class="card-header"><h3 class="card-title">Category Distribution</h3></div>
              <div class="donut-container" id="analyticsDonutHost"></div>
            </div>
          </div>
        `;

        // Render donut inside analytics host
        const tempHost = document.getElementById("analyticsDonutHost");
        const counts = CATEGORIES.map(cat => ({ ...cat, count: items.filter(i => i.category === cat.name).length }));
        const r = 46, circ = 2 * Math.PI * r;
        let off = 0;
        const segs = counts.map(c => {
          const len = (c.count / total) * circ;
          const s = `<circle cx="65" cy="65" r="${r}" fill="transparent" stroke="${c.color}" stroke-width="15" stroke-dasharray="${len.toFixed(2)} ${circ.toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 65 65)"/>`;
          off += len;
          return s;
        }).join("");
        tempHost.innerHTML = `
          <svg width="130" height="130" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r="${r}" fill="transparent" stroke="#F1F5F9" stroke-width="15"/>
            ${segs}
            <text x="65" y="62" font-size="18" font-weight="700" fill="#171717" text-anchor="middle">${items.length}</text>
            <text x="65" y="76" font-size="10" fill="#929292" text-anchor="middle">Total Items</text>
          </svg>
          <div class="donut-legend-grid">
            ${counts.map(c => `
              <div class="donut-legend-row">
                <span class="donut-legend-left"><span class="legend-dot" style="background:${c.color};"></span><span>${escapeHtml(c.name)}</span></span>
                <strong>${c.count}</strong>
              </div>
            `).join("")}
          </div>
        `;
      }

      /* ------------------------------------------------------------------------
         13. INTERACTIVE MODALS (ITEM DETAILS, SUBMIT CLAIM, NOTICE CRUD, SCHEDULE CRUD)
         ------------------------------------------------------------------------ */
      function openItemDetailModal(itemId) {
        const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
        const item = items.find(i => i.id === itemId);
        if (!item) return;

        openModal(
          `${item.name} (${item.id})`,
          `
            <img src="${item.image}" alt="${escapeHtml(item.name)}" style="width:100%; height:190px; object-fit:cover; border-radius:10px; border:1px solid var(--border-color);" />
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
              <span class="badge ${item.status === "Lost" ? "badge-lost" : item.status === "Returned" ? "badge-returned" : "badge-found"}">${escapeHtml(item.status)}</span>
              <span style="font-size:11.5px; color:var(--text-muted);">Category: <strong>${escapeHtml(item.category)}</strong> &middot; Date: <strong>${escapeHtml(item.date)}</strong></span>
            </div>
            <div style="font-size:12.5px; color:var(--text-primary); line-height:1.5;">${escapeHtml(item.description)}</div>
            <div style="padding:10px 12px; background:#F8FAFC; border-radius:9px; border:1px solid var(--border-color); font-size:11.5px;">
              <div><strong>Campus Location:</strong> ${escapeHtml(item.location)}</div>
              <div style="margin-top:3px;"><strong>Reported By:</strong> ${escapeHtml(item.reporterName)} (${escapeHtml(item.timeAgo)})</div>
            </div>
          `,
          `
            <button class="btn btn-outline btn-sm" id="modalCloseFooterBtn" type="button">Close</button>
            ${item.status !== "Returned" ? `<button class="btn btn-primary btn-sm" data-claim-item="${item.id}" type="button">${item.status === "Found" ? "Claim This Item" : "Report Found Match"}</button>` : ""}
          `
        );
      }

      function openClaimSubmissionModal(itemId) {
        const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
        const item = items.find(i => i.id === itemId);
        if (!item) return;
        const user = getCurrentUser();

        openModal(
          item.status === "Found" ? `Claim Ownership — ${item.name}` : `Report Found Match — ${item.name}`,
          `
            <div style="display:flex; gap:10px; align-items:center; background:#F8FAFC; padding:10px; border-radius:10px; border:1px solid var(--border-color);">
              <img src="${item.image}" alt="" style="width:54px; height:44px; border-radius:7px; object-fit:cover;" />
              <div>
                <div style="font-weight:700;">${escapeHtml(item.name)}</div>
                <div style="font-size:11px; color:var(--text-secondary);">${escapeHtml(item.location)} &middot; ${escapeHtml(item.id)}</div>
              </div>
            </div>
            <form id="submitClaimModalForm" data-item-id="${item.id}" style="display:flex; flex-direction:column; gap:10px;">
              <div class="form-group">
                <label class="form-label">Claimant Name &amp; Campus ID</label>
                <input class="input-control" value="${escapeHtml(user.name)} (${escapeHtml(user.studentId)})" readonly style="background:#F9FAFB;" />
              </div>
              <div class="form-group">
                <label class="form-label" for="claimProofInput">Proof of Ownership / Verification Details *</label>
                <textarea class="textarea-control" id="claimProofInput" rows="3" required placeholder="Describe unique markings, contents inside, serial number, or lock screen wallpaper..."></textarea>
              </div>
            </form>
          `,
          `
            <button class="btn btn-outline btn-sm" id="modalCloseFooterBtn" type="button">Cancel</button>
            <button class="btn btn-primary btn-sm" type="submit" form="submitClaimModalForm">Submit Verification Claim</button>
          `
        );
      }

      function openNoticeModal(noticeId) {
        const announcements = readStore(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
        const idx = announcements.findIndex(a => a.id === noticeId);
        if (idx === -1) return;
        announcements[idx].views += 1;
        writeStore(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
        const ann = announcements[idx];

        openModal(
          ann.title,
          `
            <div style="font-size:11px; color:var(--text-muted);">Published on <strong>${escapeHtml(ann.date)}</strong> by <strong>${escapeHtml(ann.author)}</strong> &middot; ${ann.views} views</div>
            <div style="font-size:13px; line-height:1.6; color:var(--text-primary);">${escapeHtml(ann.content)}</div>
          `,
          `<button class="btn btn-primary btn-sm" id="modalCloseFooterBtn" type="button">Done</button>`
        );
        if (appState.currentPage === "dashboard" || appState.currentPage === "announcements") {
          renderMainView();
        }
      }

      function openNoticeEditorModal(editId = null) {
        const announcements = readStore(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
        const existing = editId ? announcements.find(a => a.id === editId) : null;

        openModal(
          existing ? "Edit Campus Announcement" : "Publish New Announcement",
          `
            <form id="noticeEditorForm" data-edit-id="${editId || ""}" style="display:flex; flex-direction:column; gap:10px;">
              <div class="form-group">
                <label class="form-label" for="annTitleInput">Announcement Title *</label>
                <input class="input-control" id="annTitleInput" required value="${escapeHtml(existing ? existing.title : "")}" placeholder="e.g., Holiday Office Hours Update" />
              </div>
              <div class="form-group">
                <label class="form-label" for="annSummaryInput">Short Summary *</label>
                <input class="input-control" id="annSummaryInput" required value="${escapeHtml(existing ? existing.summary : "")}" placeholder="One-line overview for the Notice Board table" />
              </div>
              <div class="form-group">
                <label class="form-label" for="annContentInput">Full Bulletin Details *</label>
                <textarea class="textarea-control" id="annContentInput" rows="4" required placeholder="Complete details for students and staff...">${escapeHtml(existing ? existing.content : "")}</textarea>
              </div>
            </form>
          `,
          `
            <button class="btn btn-outline btn-sm" id="modalCloseFooterBtn" type="button">Cancel</button>
            <button class="btn btn-primary btn-sm" type="submit" form="noticeEditorForm">${existing ? "Save Changes" : "Publish Announcement"}</button>
          `
        );
      }

      function openScheduleEditorModal(editId = null) {
        const schedules = readStore(STORAGE_KEYS.SCHEDULES, SEED_SCHEDULES);
        const existing = editId ? schedules.find(s => s.id === editId) : null;

        openModal(
          existing ? "Edit Schedule Session" : "Add Campus Schedule Session",
          `
            <form id="scheduleEditorForm" data-edit-id="${editId || ""}" style="display:flex; flex-direction:column; gap:10px;">
              <div class="form-group">
                <label class="form-label" for="schedTitleInput">Session Title *</label>
                <input class="input-control" id="schedTitleInput" required value="${escapeHtml(existing ? existing.title : "")}" placeholder="e.g., Claim Verification Desk" />
              </div>
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="schedDateInput">Date *</label>
                  <input class="input-control" id="schedDateInput" type="date" required value="${escapeHtml(existing ? existing.date : (appState.selectedCalDate || formatDateISO(TODAY)))}" />
                </div>
                <div class="form-group">
                  <label class="form-label" for="schedTimeInput">Time Window *</label>
                  <input class="input-control" id="schedTimeInput" required value="${escapeHtml(existing ? existing.time : "10:00 AM – 12:00 PM")}" />
                </div>
              </div>
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="schedLocInput">Location *</label>
                  <input class="input-control" id="schedLocInput" required value="${escapeHtml(existing ? existing.location : "Student Union Desk #2")}" />
                </div>
                <div class="form-group">
                  <label class="form-label" for="schedCatInput">Badge Category</label>
                  <select class="select-control" id="schedCatInput">
                    <option value="Office Hours" ${existing && existing.category === "Office Hours" ? "selected" : ""}>Office Hours</option>
                    <option value="Verification" ${existing && existing.category === "Verification" ? "selected" : ""}>Verification</option>
                    <option value="Audit" ${existing && existing.category === "Audit" ? "selected" : ""}>Audit</option>
                    <option value="Intake" ${existing && existing.category === "Intake" ? "selected" : ""}>Intake</option>
                  </select>
                </div>
              </div>
            </form>
          `,
          `
            <button class="btn btn-outline btn-sm" id="modalCloseFooterBtn" type="button">Cancel</button>
            <button class="btn btn-primary btn-sm" type="submit" form="scheduleEditorForm">${existing ? "Save Session" : "Add to Calendar"}</button>
          `
        );
      }

      /* ------------------------------------------------------------------------
         14. MASTER RENDER DISPATCHER & EVENT DELEGATION
         ------------------------------------------------------------------------ */
      function renderMainView() {
        const page = appState.currentPage;
        if (page === "dashboard") renderDashboardView();
        else if (page === "browse-items") renderBrowseItemsView();
        else if (page === "report-lost") renderReportFormView("Lost");
        else if (page === "report-found") renderReportFormView("Found");
        else if (page === "my-reports") renderMyReportsView();
        else if (page === "my-claims") renderMyClaimsView();
        else if (page === "notifications") renderNotificationsView();
        else if (page === "announcements") renderAnnouncementsView();
        else if (page === "account") renderAccountView();
        else if (page === "help") renderHelpView();
        else if (page === "settings") renderSettingsView();
        else if (page === "admin-all-items") renderAdminItemsTable("all");
        else if (page === "admin-lost-reports") renderAdminItemsTable("lost");
        else if (page === "admin-found-reports") renderAdminItemsTable("found");
        else if (page === "admin-returned") renderAdminItemsTable("returned");
        else if (page === "admin-claims") renderAdminClaimsTable();
        else if (page === "verification-center") renderVerificationCenter();
        else if (page === "manage-users") renderManageUsersView();
        else if (page === "reports-analytics") renderReportsAnalyticsView();
        else renderDashboardView();
      }

      function renderApp() {
        renderSidebarAndHeader();
        renderMainView();
        renderRightPanel();
      }

      function closeMobileSidebar() {
        document.getElementById("leftSidebar").classList.remove("mobile-open");
        document.getElementById("sidebarOverlay").classList.remove("open");
      }

      function attachEventListeners() {
        // Profile dropdown toggle
        document.getElementById("profileTrigger").addEventListener("click", e => {
          e.stopPropagation();
          document.getElementById("profileDropdown").classList.toggle("open");
          document.getElementById("notifPopover").classList.remove("open");
        });

        document.getElementById("switchStudentBtn").addEventListener("click", () => switchRole("Student"));
        document.getElementById("switchAdminBtn").addEventListener("click", () => switchRole("Administrator"));
        document.getElementById("quickRoleToggle").addEventListener("click", () => {
          switchRole(isAdminMode() ? "Student" : "Administrator");
        });

        // Header buttons
        document.getElementById("headerSearchBtn").addEventListener("click", () => {
          navigateTo(isAdminMode() ? "admin-all-items" : "browse-items");
        });
        document.getElementById("headerHelpBtn").addEventListener("click", () => navigateTo("help"));
        document.getElementById("headerNotifBtn").addEventListener("click", e => {
          e.stopPropagation();
          document.getElementById("notifPopover").classList.toggle("open");
          document.getElementById("profileDropdown").classList.remove("open");
        });

        document.getElementById("popoverMarkAllRead").addEventListener("click", () => {
          const notifs = readStore(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS).map(n => ({ ...n, read: true }));
          writeStore(STORAGE_KEYS.NOTIFICATIONS, notifs);
          renderApp();
          showToast("All notifications marked as read", "info");
        });

        // Mobile sidebar drawer
        document.getElementById("mobileMenuBtn").addEventListener("click", () => {
          document.getElementById("leftSidebar").classList.add("mobile-open");
          document.getElementById("sidebarOverlay").classList.add("open");
        });
        document.getElementById("sidebarOverlay").addEventListener("click", closeMobileSidebar);

        // Calendar navigation
        document.getElementById("calPrevBtn").addEventListener("click", () => {
          appState.calMonth--;
          if (appState.calMonth < 0) { appState.calMonth = 11; appState.calYear--; }
          renderRightPanel();
        });
        document.getElementById("calNextBtn").addEventListener("click", () => {
          appState.calMonth++;
          if (appState.calMonth > 11) { appState.calMonth = 0; appState.calYear++; }
          renderRightPanel();
        });
        document.getElementById("clearDateFilterBtn").addEventListener("click", () => {
          appState.selectedCalDate = null;
          renderRightPanel();
        });
        document.getElementById("addScheduleBtn").addEventListener("click", () => openScheduleEditorModal(null));

        // Modal close
        document.getElementById("appModalCloseBtn").addEventListener("click", closeModal);
        document.getElementById("appModalBackdrop").addEventListener("click", e => {
          if (e.target.id === "appModalBackdrop") closeModal();
        });

        // Global outside click for dropdowns
        document.addEventListener("click", e => {
          if (!e.target.closest("#profileWrapper")) {
            document.getElementById("profileDropdown").classList.remove("open");
          }
          if (!e.target.closest("#headerNotifBtn") && !e.target.closest("#notifPopover")) {
            document.getElementById("notifPopover").classList.remove("open");
          }
        });

        // Delegated Click Events across entire app
        document.body.addEventListener("click", e => {
          const navBtn = e.target.closest("[data-nav]");
          if (navBtn) {
            navigateTo(navBtn.getAttribute("data-nav"));
            return;
          }

          if (e.target.id === "modalCloseFooterBtn") {
            closeModal();
            return;
          }

          // KPI card click with filter
          const kpiCard = e.target.closest("[data-kpi-nav]");
          if (kpiCard) {
            const target = kpiCard.getAttribute("data-kpi-nav");
            const filter = kpiCard.getAttribute("data-kpi-filter");
            if (target === "browse-items") appState.browseFilters.status = filter;
            navigateTo(target);
            return;
          }

          // Calendar day click
          const calDay = e.target.closest("[data-cal-date]");
          if (calDay) {
            const d = calDay.getAttribute("data-cal-date");
            appState.selectedCalDate = appState.selectedCalDate === d ? null : d;
            renderRightPanel();
            return;
          }

          // Schedule Edit / Delete
          const editSched = e.target.closest("[data-edit-sched]");
          if (editSched) {
            openScheduleEditorModal(editSched.getAttribute("data-edit-sched"));
            return;
          }
          const delSched = e.target.closest("[data-del-sched]");
          if (delSched) {
            const id = delSched.getAttribute("data-del-sched");
            const updated = readStore(STORAGE_KEYS.SCHEDULES, SEED_SCHEDULES).filter(s => s.id !== id);
            writeStore(STORAGE_KEYS.SCHEDULES, updated);
            renderRightPanel();
            showToast("Schedule session removed", "info");
            return;
          }

          // View Item Details
          const viewItemBtn = e.target.closest("[data-view-item]");
          if (viewItemBtn) {
            openItemDetailModal(viewItemBtn.getAttribute("data-view-item"));
            return;
          }

          // Claim Item
          const claimBtn = e.target.closest("[data-claim-item]");
          if (claimBtn) {
            openClaimSubmissionModal(claimBtn.getAttribute("data-claim-item"));
            return;
          }

          // Mark Item Returned
          const retBtn = e.target.closest("[data-mark-returned]");
          if (retBtn) {
            const id = retBtn.getAttribute("data-mark-returned");
            const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
            const target = items.find(i => i.id === id);
            if (target) {
              target.status = "Returned";
              writeStore(STORAGE_KEYS.ITEMS, items);
              logActivity("Item marked as returned", `${target.name} (${target.id}) was returned to owner.`, "#299B73", "#E6F6F0");
              showToast(`${target.name} marked as Returned`, "success");
              renderApp();
            }
            return;
          }

          // Delete Item
          const delItemBtn = e.target.closest("[data-delete-item]");
          if (delItemBtn) {
            const id = delItemBtn.getAttribute("data-delete-item");
            const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
            const removed = items.find(i => i.id === id);
            writeStore(STORAGE_KEYS.ITEMS, items.filter(i => i.id !== id));
            if (removed) logActivity("Item record removed", `${removed.name} (${id}) removed from registry.`, "#EF4444", "#FEE2E2");
            showToast("Item record deleted", "info");
            renderApp();
            return;
          }

          // Verification Center Approve / Reject / Info Requested
          const verifyBtn = e.target.closest("[data-verify-action]");
          if (verifyBtn) {
            const action = verifyBtn.getAttribute("data-verify-action");
            const claimId = verifyBtn.getAttribute("data-claim-id");
            const claims = readStore(STORAGE_KEYS.CLAIMS, SEED_CLAIMS);
            const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
            const claim = claims.find(c => c.id === claimId);
            if (claim) {
              claim.status = action;
              claim.adminNote = action === "Approved"
                ? "Ownership verified. Ready for pickup at Student Union Desk #2."
                : action === "Rejected"
                  ? "Submitted details did not match item records."
                  : "Please bring purchase receipt or secondary photo ID to Desk #2.";
              writeStore(STORAGE_KEYS.CLAIMS, claims);

              if (action === "Approved") {
                const itm = items.find(i => i.id === claim.itemId);
                if (itm) {
                  itm.status = "Returned";
                  writeStore(STORAGE_KEYS.ITEMS, items);
                }
                logActivity("Claim approved & item returned", `${claim.claimantName}'s claim (${claim.id}) approved.`, "#299B73", "#E6F6F0");
                pushNotification("Claim Approved!", `Your claim for ${claim.itemName} was approved. Visit Desk #2 for pickup.`, "Student", "success");
                showToast(`Claim ${claim.id} approved & item marked Returned`, "success");
              } else if (action === "Rejected") {
                logActivity("Claim rejected", `Claim ${claim.id} for ${claim.itemName} was declined.`, "#EF4444", "#FEE2E2");
                pushNotification("Claim Update", `Your claim ${claim.id} for ${claim.itemName} was declined.`, "Student", "warning");
                showToast(`Claim ${claim.id} rejected`, "warning");
              } else {
                logActivity("Additional info requested", `Requested more proof for claim ${claim.id}.`, "#7C3AED", "#EDE9FE");
                pushNotification("More Info Needed", `Admin requested extra verification details for ${claim.itemName}.`, "Student", "info");
                showToast(`Requested additional info for ${claim.id}`, "info");
              }
              renderApp();
            }
            return;
          }

          // Notice Board Actions
          const readNotice = e.target.closest("[data-read-notice]");
          if (readNotice) {
            openNoticeModal(readNotice.getAttribute("data-read-notice"));
            return;
          }
          if (e.target.closest("#dashAddNoticeBtn")) {
            openNoticeEditorModal(null);
            return;
          }
          const editNotice = e.target.closest("[data-edit-notice]");
          if (editNotice) {
            openNoticeEditorModal(editNotice.getAttribute("data-edit-notice"));
            return;
          }
          const delNotice = e.target.closest("[data-del-notice]");
          if (delNotice) {
            const id = delNotice.getAttribute("data-del-notice");
            writeStore(STORAGE_KEYS.ANNOUNCEMENTS, readStore(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS).filter(a => a.id !== id));
            showToast("Announcement deleted", "info");
            renderApp();
            return;
          }

          // Browse Status Pill Tabs
          const statusTab = e.target.closest("[data-browse-status]");
          if (statusTab) {
            appState.browseFilters.status = statusTab.getAttribute("data-browse-status");
            renderBrowseItemsView();
            return;
          }
          if (e.target.id === "resetBrowseFiltersBtn") {
            appState.browseFilters = { search: "", status: "All", category: "All", location: "All", date: "" };
            renderBrowseItemsView();
            return;
          }

          // Notification mark read
          const readNotif = e.target.closest("[data-read-notif]");
          if (readNotif) {
            const id = readNotif.getAttribute("data-read-notif");
            const list = readStore(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
            const target = list.find(n => n.id === id);
            if (target) { target.read = true; writeStore(STORAGE_KEYS.NOTIFICATIONS, list); renderApp(); }
            return;
          }
          if (e.target.id === "viewMarkAllReadBtn") {
            const list = readStore(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS).map(n => ({ ...n, read: true }));
            writeStore(STORAGE_KEYS.NOTIFICATIONS, list);
            renderApp();
            showToast("All notifications marked read", "info");
            return;
          }

          // Admin Table Pagination
          if (e.target.id === "adminPrevPage") {
            appState.adminTableFilters.page = Math.max(1, appState.adminTableFilters.page - 1);
            renderMainView();
            return;
          }
          if (e.target.id === "adminNextPage") {
            appState.adminTableFilters.page += 1;
            renderMainView();
            return;
          }

          // Manage Users Role Toggle
          const roleToggle = e.target.closest("[data-toggle-user-role]");
          if (roleToggle) {
            const uid = roleToggle.getAttribute("data-toggle-user-role");
            const users = readStore(STORAGE_KEYS.USERS, SEED_USERS);
            const u = users.find(x => x.id === uid);
            if (u) {
              u.role = u.role === "Administrator" ? "Student" : "Administrator";
              writeStore(STORAGE_KEYS.USERS, users);
              renderManageUsersView();
              showToast(`Updated ${u.name} to ${u.role}`, "success");
            }
            return;
          }

          // Reset Demo Data
          if (e.target.id === "resetDemoDataBtn") {
            Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
            initializeStorageIfNeeded();
            appState.currentPage = "dashboard";
            renderApp();
            showToast("Demo database restored to initial state", "success");
            return;
          }

          // Right panel footer links
          const infoModalBtn = e.target.closest("[data-info-modal]");
          if (infoModalBtn) {
            const key = infoModalBtn.getAttribute("data-info-modal");
            const infoCopy = {
              privacy: ["Privacy Policy", "FindIt Campus Lost & Found stores report and verification records strictly for campus property recovery. Student contact details are visible only to authorized Student Affairs administrators."],
              guidelines: ["Campus Lost & Found Guidelines", "Turn in high-value electronics, wallets, and ID cards immediately to Student Union Desk #2 or Campus Security. Do not publicly disclose confidential serial keys."],
              help: ["Help Center", "Need assistance verifying an ownership claim? Visit Student Union Desk #2 (Mon–Fri, 8:30 AM – 6:00 PM) or email findit@campus.edu."],
              contact: ["Contact Lost & Found Office", "Location: Student Union Ground Floor, Desk #2 · Phone: +1 (555) 234-0100 · Email: findit@campus.edu"]
            };
            const [t, body] = infoCopy[key];
            openModal(t, `<p style="line-height:1.6;">${body}</p>`, `<button class="btn btn-primary btn-sm" id="modalCloseFooterBtn" type="button">Close</button>`);
          }
        });

        // Delegated Change & Input Events (Charts, Filters)
        document.body.addEventListener("change", e => {
          if (e.target.id === "perfPeriodSelect") {
            appState.perfPeriod = e.target.value;
            renderLineChart(readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS));
          } else if (e.target.id === "recPeriodSelect") {
            appState.recPeriod = e.target.value;
            renderBarChart(readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS));
          } else if (e.target.id === "browseCatSelect") {
            appState.browseFilters.category = e.target.value;
            renderBrowseItemsView();
          } else if (e.target.id === "browseLocSelect") {
            appState.browseFilters.location = e.target.value;
            renderBrowseItemsView();
          } else if (e.target.id === "browseDateInput") {
            appState.browseFilters.date = e.target.value;
            renderBrowseItemsView();
          } else if (e.target.id === "adminTableCat") {
            appState.adminTableFilters.category = e.target.value;
            appState.adminTableFilters.page = 1;
            renderMainView();
          }
        });

        document.body.addEventListener("input", e => {
          if (e.target.id === "browseSearchInput") {
            appState.browseFilters.search = e.target.value;
            const pos = e.target.selectionStart;
            renderBrowseItemsView();
            const el = document.getElementById("browseSearchInput");
            if (el) { el.focus(); el.setSelectionRange(pos, pos); }
          } else if (e.target.id === "adminTableSearch") {
            appState.adminTableFilters.search = e.target.value;
            appState.adminTableFilters.page = 1;
            const pos = e.target.selectionStart;
            renderMainView();
            const el = document.getElementById("adminTableSearch");
            if (el) { el.focus(); el.setSelectionRange(pos, pos); }
          }
        });

        // Delegated Form Submissions
        document.body.addEventListener("submit", e => {
          e.preventDefault();

          // 1. Report Lost / Found Submission
          if (e.target.id === "itemReportForm") {
            const reportType = e.target.getAttribute("data-report-type");
            const name = document.getElementById("repItemName").value.trim();
            const category = document.getElementById("repCategory").value;
            const location = document.getElementById("repLocation").value;
            const date = document.getElementById("repDate").value;
            const description = document.getElementById("repDesc").value.trim();
            const customImg = document.getElementById("reportDropzone").dataset.imageData;

            const user = getCurrentUser();
            const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
            const newId = "ITM-" + (1000 + items.length + Math.floor(Math.random() * 90));

            items.unshift({
              id: newId,
              name,
              type: reportType,
              status: reportType,
              category,
              location,
              date,
              timeAgo: "Just now",
              description,
              image: customImg || CATEGORY_DEFAULT_ART[category] || ITEM_ARTWORK.backpack,
              reporterId: user.id,
              reporterName: user.name,
              reporterAvatar: user.avatar
            });

            writeStore(STORAGE_KEYS.ITEMS, items);
            logActivity(
              `New ${reportType.toLowerCase()} item reported`,
              `${name} reported at ${location}.`,
              reportType === "Lost" ? "#EF4444" : "#2563EB",
              reportType === "Lost" ? "#FEE2E2" : "#E8F0FE"
            );
            pushNotification(
              `New ${reportType} Report (${newId})`,
              `${name} in ${category} was logged at ${location}.`,
              "All",
              reportType === "Lost" ? "warning" : "info"
            );

            showToast(`${reportType} item report (${newId}) submitted!`, "success");
            navigateTo(isAdminMode() ? "admin-all-items" : "my-reports");
            return;
          }

          // 2. Claim Submission Modal
          if (e.target.id === "submitClaimModalForm") {
            const itemId = e.target.getAttribute("data-item-id");
            const proof = document.getElementById("claimProofInput").value.trim();
            const items = readStore(STORAGE_KEYS.ITEMS, SEED_ITEMS);
            const item = items.find(i => i.id === itemId);
            const user = getCurrentUser();
            if (!item || !proof) return;

            const claims = readStore(STORAGE_KEYS.CLAIMS, SEED_CLAIMS);
            const claimId = "CLM-" + (400 + claims.length + 1);
            claims.unshift({
              id: claimId,
              itemId: item.id,
              itemName: item.name,
              itemImage: item.image,
              claimantId: user.id,
              claimantName: user.name,
              claimantStudentId: user.studentId,
              claimantEmail: user.email,
              proofDescription: proof,
              submittedDate: formatDateISO(TODAY),
              status: "Pending",
              adminNote: ""
            });

            writeStore(STORAGE_KEYS.CLAIMS, claims);
            logActivity("New claim submitted", `${user.name} submitted claim ${claimId} for ${item.name}.`, "#F59E0B", "#FEF3C7");
            pushNotification(`New Claim (${claimId})`, `${user.name} claimed ${item.name}. Review in Verification Center.`, "Administrator", "warning");

            closeModal();
            showToast(`Verification claim ${claimId} submitted!`, "success");
            renderApp();
            return;
          }

          // 3. Notice Board Add/Edit Form
          if (e.target.id === "noticeEditorForm") {
            const editId = e.target.getAttribute("data-edit-id");
            const title = document.getElementById("annTitleInput").value.trim();
            const summary = document.getElementById("annSummaryInput").value.trim();
            const content = document.getElementById("annContentInput").value.trim();
            const announcements = readStore(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
            const user = getCurrentUser();

            if (editId) {
              const target = announcements.find(a => a.id === editId);
              if (target) {
                target.title = title;
                target.summary = summary;
                target.content = content;
              }
              showToast("Announcement updated", "success");
            } else {
              announcements.unshift({
                id: "ANN-" + Date.now(),
                title,
                summary,
                content,
                date: formatDateISO(TODAY),
                author: user.name,
                views: 1,
                thumbnail: ITEM_ARTWORK.notice
              });
              logActivity("New campus announcement published", title, "#7C3AED", "#EDE9FE");
              pushNotification("Campus Notice", title, "Student", "info");
              showToast("Announcement published to Notice Board", "success");
            }

            writeStore(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
            closeModal();
            renderApp();
            return;
          }

          // 4. Schedule Add/Edit Form
          if (e.target.id === "scheduleEditorForm") {
            const editId = e.target.getAttribute("data-edit-id");
            const title = document.getElementById("schedTitleInput").value.trim();
            const date = document.getElementById("schedDateInput").value;
            const time = document.getElementById("schedTimeInput").value.trim();
            const location = document.getElementById("schedLocInput").value.trim();
            const category = document.getElementById("schedCatInput").value;
            const colorMap = { "Office Hours": "blue", "Verification": "green", "Audit": "amber", "Intake": "blue" };

            const schedules = readStore(STORAGE_KEYS.SCHEDULES, SEED_SCHEDULES);
            if (editId) {
              const target = schedules.find(s => s.id === editId);
              if (target) {
                Object.assign(target, { title, date, time, location, category, color: colorMap[category] || "blue" });
              }
              showToast("Schedule updated", "success");
            } else {
              schedules.unshift({
                id: "SCH-" + Date.now(),
                title,
                date,
                time,
                location,
                category,
                color: colorMap[category] || "blue"
              });
              showToast("Schedule event added to Campus Calendar", "success");
            }

            writeStore(STORAGE_KEYS.SCHEDULES, schedules);
            closeModal();
            renderRightPanel();
            return;
          }

          // 5. Account Profile Save
          if (e.target.id === "accountProfileForm") {
            const users = readStore(STORAGE_KEYS.USERS, SEED_USERS);
            const current = getCurrentUser();
            const target = users.find(u => u.id === current.id);
            if (target) {
              target.name = document.getElementById("accName").value.trim();
              target.email = document.getElementById("accEmail").value.trim();
              target.department = document.getElementById("accDept").value.trim();
              target.phone = document.getElementById("accPhone").value.trim();
              writeStore(STORAGE_KEYS.USERS, users);
              renderApp();
              showToast("Account profile saved", "success");
            }
          }
        });
      }

      /* ------------------------------------------------------------------------
         15. INITIALIZE APPLICATION ON DOM READY
         ------------------------------------------------------------------------ */
      window.addEventListener("DOMContentLoaded", () => {
        initializeStorageIfNeeded();
        attachEventListeners();
        renderApp();
      });
    })();
  