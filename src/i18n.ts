import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "close": "Close",
      "logout": "Logout",
      "nav": {
        "home": "Home",
        "dashboard": "Dashboard",
        "members": "Members",
        "financials": "Financials",
        "notices": "Notices",
        "support": "Support",
        "about": "About",
        "contact": "Contact",
        "login": "Login",
        "logout": "Logout",
        "apply": "Apply",
        "dev_console": "Dev Console"
      },
      "common": {
        "loading": "Loading...",
        "error": "Error",
        "save": "Save",
        "cancel": "Cancel",
        "delete": "Delete",
        "edit": "Edit",
        "search": "Search",
        "actions": "Actions",
        "status": "Status",
        "date": "Date",
        "amount": "Amount",
        "member": "Member",
        "success": "Success",
        "warning": "Warning",
        "info": "Info",
        "view_all": "View All",
        "details": "Details",
        "contact_us": "Contact Us",
        "quick_links": "Quick Links",
        "back_to_home": "Back to Home",
        "back_to_dashboard": "Back to Dashboard",
        "back": "Back"
      },
      "home": {
        "hero_title": "Shomiti",
        "hero_subtitle": "Unity is strength. Stay connected for all our activities, transparent financial reports, and important notices. We move forward together.",
        "get_started": "Become a Member",
        "apply_now": "Apply Now",
        "learn_more": "Learn More",
        "cta_title": "Ready to Join Us?",
        "cta_subtitle": "Start your journey towards financial security today. Join our community and grow together.",
        "urgent_announcement": "Urgent Announcement",
        "urgent_announcement_text": "The monthly meeting scheduled for October 15, 2024, has been postponed due to unavoidable reasons. The next date will be announced soon.",
        "recent_notices": "Recent Notices",
        "member_list": "Member List",
        "financial_reports": "Financial Reports",
        "contact_phone": "+880 1234 567890",
        "contact_address": "Motijheel, Dhaka-1000"
      },
      "about": {
        "title": "About Us",
        "subtitle": "A promise to move forward together. We are committed to the development of our members and social welfare.",
        "intro_badge": "Introduction",
        "motto": "Unity is strength, development is the goal",
        "association_intro": "Association Introduction",
        "registered_members": "Registered Members",
        "mission": "Mission",
        "vision": "Vision",
        "objectives": "Core Objectives",
        "objectives_subtitle": "Our main areas of service are discussed below",
        "savings_growth": "Savings Growth",
        "savings_desc": "Building a habit of regular savings among members and ensuring the security of their deposits.",
        "education_support": "Education Support",
        "education_support_desc": "Arranging scholarships and special merit awards for the children of members.",
        "medical_welfare": "Medical Welfare",
        "medical_welfare_desc": "Providing grants from emergency funds for sick members and operating health counseling centers."
      },
      "members": {
        "title": "Member List",
        "breadcrumb_dashboard": "Dashboard",
        "breadcrumb_members": "Members",
        "search_placeholder": "Search members...",
        "add_new": "Add New Member",
        "all_members": "All Members",
        "active": "Active",
        "inactive": "Inactive",
        "pending": "Pending",
        "filter_by_role": "Filter by Role",
        "table": {
          "member": "Member",
          "id": "Member ID",
          "role": "Role/Designation",
          "joined_date": "Joined Date",
          "status": "Status",
          "actions": "Actions"
        },
        "pagination": {
          "showing": "Showing",
          "to": "to",
          "of": "of",
          "members": "members"
        },
        "modal": {
          "title": "New Member Registration",
          "subtitle": "Fill in the member information correctly",
          "photo_label": "Member Photo",
          "upload_btn": "Upload Photo",
          "upload_hint": "JPG, PNG max 2MB",
          "full_name": "Full Name (Bengali)",
          "member_id": "Member ID",
          "role": "Role / Designation",
          "select_role": "Select Role",
          "joined_date": "Joined Date",
          "mobile": "Mobile Number",
          "address": "Current Address",
          "address_placeholder": "Village, Post Office, Upazila...",
          "name_placeholder": "e.g., Kamrul Islam",
          "id_placeholder": "e.g., MB-2024-001",
          "mobile_placeholder": "01XXXXXXXXX"
        },
        "no_members_found": "No members found",
        "roles": {
          "president": "President",
          "secretary": "Secretary",
          "general_secretary": "General Secretary",
          "treasurer": "Treasurer",
          "general_member": "General Member"
        }
      },
      "notices": {
        "title": "Official Notice Board",
        "subtitle": "Find all important notices and announcements of the association here.",
        "search_placeholder": "Search notices...",
        "categories": {
          "all": "All",
          "general": "General",
          "meeting": "Meeting",
          "financial": "Financial",
          "urgent": "Urgent",
          "membership": "Membership",
          "info": "Info"
        },
        "sort": {
          "new": "Newest",
          "old": "Oldest"
        },
        "no_notices": "No notices found",
        "download_title": "Download File",
        "view_details": "View Details"
      },
      "contact": {
        "title": "Support & Contact",
        "subtitle": "Members can use the form below to report any needs or problems. Our team is ready to answer your queries quickly.",
        "form_title": "Send us a message",
        "label_name": "Name",
        "placeholder_name": "Enter your full name",
        "label_email": "Email",
        "placeholder_email": "example@email.com",
        "label_subject": "Subject",
        "subject_options": {
          "report": "Report Problem",
          "query": "Ask Question",
          "request": "Correction Request",
          "others": "Others"
        },
        "label_message": "Message",
        "placeholder_message": "Write your message here...",
        "send_btn": "Send Message",
        "sending_btn": "Sending...",
        "info_title": "Contact Information",
        "address_label": "Address",
        "address_value": "Level 4, Shapla Bhaban, Motijheel Commercial Area, Dhaka-1000",
        "phone_label": "Phone Number",
        "email_label": "Email",
        "google_maps": "View on Google Maps",
        "faq_title": "General Inquiries",
        "faq_desc": "Check the answers to common questions you may have from here.",
        "forms_title": "Forms & Downloads",
        "forms_desc": "Download necessary application forms and other documents.",
        "rules_title": "Association Rules",
        "rules_desc": "Learn more about association membership and terms of service.",
        "success_msg": "Your message has been sent successfully. We will contact you soon.",
        "error_msg": "Sorry, could not send message. Please try again.",
        "fatal_error_msg": "An error occurred. Please try again later."
      },
      "login": {
        "title": "Admin Login",
        "subtitle": "Admin Login",
        "label_username": "Admin ID / Username",
        "placeholder_username": "Admin ID / Username",
        "label_password": "Password",
        "placeholder_password": "Password",
        "forgot_password": "Forgot Password?",
        "remember_me": "Remember on this device",
        "login_btn": "Login",
        "support_text": "Need help?",
        "contact_support": "Contact support team",
        "invalid_credentials": "Invalid credentials! Try admin/admin"
      },
      "financial": {
        "title": "Financial Management",
        "search_placeholder": "Search member...",
        "admin_user": "Admin User",
        "super_admin": "Super Admin",
        "stats": {
          "total_collection": "Total Collection",
          "this_month": "This Month's Collection",
          "due_amount": "Due Amount",
          "total_members": "Total Members",
          "growth": "growth (from last month)",
          "target_reached": "of target achieved",
          "members_due": "members due",
          "new_members": "new (this month)"
        },
        "table": {
          "title": "Transaction Records",
          "add_new": "Add New Record",
          "member_name": "Member Name",
          "id": "ID",
          "amount": "Amount",
          "date": "Date",
          "receipt_no": "Receipt No",
          "actions": "Actions",
          "view_receipt": "View Receipt",
          "edit": "Edit/Correct"
        },
        "pagination": {
          "total_transactions": "Total Transactions",
          "prev": "Previous",
          "next": "Next"
        },
        "form": {
          "title": "Add New Payment Information",
          "name_id_label": "Search Member Name / ID",
          "name_id_placeholder": "Enter member name or ID...",
          "amount_label": "Amount (৳)",
          "amount_placeholder": "0.00",
          "date_label": "Date",
          "receipt_no_label": "Receipt Number",
          "receipt_no_placeholder": "e.g., RX-1234",
          "description_label": "Description",
          "description_placeholder": "e.g. Monthly Subscription",
          "upload_label": "Upload Receipt Image",
          "upload_hint": "JPG, PNG or PDF (Max 5MB)",
          "no_image": "No image",
          "reset_btn": "Reset",
          "save_btn": "Save Record"
        },
        "footer_copyright": "© 2024 Somiti Management System. All rights reserved."
      },
      "content_mgmt": {
        "title": "Website Content Management",
        "subtitle": "Update and change all information of your association's website from here.",
        "header_title": "Somiti System",
        "view_website": "View Website",
        "search_placeholder": "Search...",
        "sections": {
          "hero": "Homepage Hero / Welcome Message",
          "about": "About Us",
          "mission": "Our Mission",
          "vision": "Our Vision",
          "objectives": "Core Objectives"
        },
        "labels": {
          "hero_title": "Main Heading",
          "hero_subtitle": "Sub-heading Content",
          "about_text": "About Text",
          "mission_text": "Mission Text",
          "vision_text": "Vision Text",
          "objectives_add": "Add New",
          "save_title": "Save Title",
          "save_subtitle": "Save Sub-title",
          "save_btn": "Save",
          "save_list": "Save List",
          "reset_btn": "Reset",
          "saved_msg": "Saved successfully!"
        }
      },
      "support": {
        "title": "Support Management",
        "search_placeholder": "Search messages...",
        "stats": {
          "total": "Total Messages",
          "new": "New Issues",
          "resolved": "Resolved",
          "pending": "Pending"
        },
        "tabs": {
          "all": "All",
          "new": "New",
          "pending": "Pending",
          "resolved": "Resolved"
        },
        "table": {
          "name_email": "Name/Email",
          "subject": "Subject",
          "date": "Date",
          "status": "Status",
          "action": "Action",
          "details": "Details",
          "loading": "Loading...",
          "no_data": "No messages found."
        },
        "modal": {
          "title": "Message Details",
          "sender": "Sender",
          "date": "Date",
          "subject": "Subject",
          "message": "Message",
          "update_status": "Update Status:",
          "close": "Close"
        },
        "status": {
          "new": "New",
          "pending": "Pending",
          "resolved": "Resolved"
        }
      },
      "transparency": {
        "title": "Financials & Transparency",
        "subtitle": "We believe in complete transparency. Here you can find the real-time financial status of our association. Every penny is accounted for and used for the welfare of our members.",
        "total_funds": "Total Funds",
        "paid_members": "Paid Members",
        "due_amount": "Due Amount",
        "allocation": "Fund Allocation",
        "collection_status": "Monthly Collection Status",
        "commitment_title": "Our Commitment to Transparency",
        "commitment_text": "Every transaction in our system is digitally recorded and timestamped. We use a non-deletable ledger system, meaning once a record is entered, it remains in the system forever. This ensures that no financial data can be manipulated or hidden. Members can request a detailed audit report at any time from the association office."
      },
      "ledger": {
        "title": "Transaction Ledger",
        "breadcrumb": {
          "dashboard": "Dashboard",
          "transactions": "Transactions"
        },
        "search_placeholder": "Search...",
        "new_transaction": "New Transaction",
        "stats": {
          "monthly_collection": "Monthly Collection",
          "collection_trend": "Increased by 12%",
          "due_collection": "Due Collection",
          "due_members": "Due from 8 members",
          "active_members": "Active Members",
          "new_members": "3 new added last month",
          "paid_members": "Paid Members",
          "due_members_count": "Due Members",
          "paid_desc": "Members who paid this month",
          "due_desc": "Members with pending dues"
        },
        "overview": {
          "title": "Financial Overview",
          "total_funds": "Total Association Funds",
          "reserve": "Reserve Capital"
        },
        "status": {
          "title": "Collection Status",
          "paid": "Paid",
          "due": "Due",
          "goal": "Our goal is 100% collection by the 15th of every month. Please ensure your dues are cleared on time to avoid late fees."
        },
        "filters": {
          "search_member": "Search by member name or ID",
          "filter": "Filter",
          "export": "Export"
        },
        "table": {
          "member_name": "Member Name",
          "member_id": "ID",
          "amount": "Amount (৳)",
          "date": "Date",
          "receipt_no": "Receipt No",
          "file": "File",
          "view": "View",
          "loading": "Loading...",
          "no_data": "No transactions found",
          "showing_entries": "Showing {{count}} entries"
        },
        "policy": {
          "title": "Warning & Policy:",
          "text": "For the sake of honesty and transparency, no record in this system can be permanently deleted. Any errors can only be updated through a 'Correction', and a history (Logs) of each correction will be preserved."
        }
      },
      "dashboard": {
        "title": "Dashboard",
        "welcome": "Welcome back, Admin",
        "total_members": "Total Members",
        "total_savings": "Total Savings",
        "pending_requests": "Pending Requests",
        "overview": "Dashboard Overview",
        "summary": "Brief summary of today's activities",
        "new_notice": "New Notice",
        "add_member": "Add Member",
        "active_notices": "Active Notices",
        "total_funds": "Total Funds Collected",
        "new_messages": "New Support Messages",
        "recent_transactions": "Recent Financial Transactions",
        "view_all": "View All",
        "table": {
          "member_name": "Member Name",
          "description": "Description",
          "date": "Date",
          "amount": "Amount"
        },
        "quick_actions": "Quick Actions",
        "actions": {
          "new_payment": "New Payment Record",
          "send_sms": "Send SMS",
          "download_report": "Download Report"
        },
        "system_update": {
          "title": "System Update",
          "text": "System maintenance will be performed on October 30th at 12 AM. Database backup will be taken during this time.",
          "learn_more": "Learn More"
        },
        "units": {
          "members": "Members",
          "items": "Items"
        }
      },
      "notice_mgmt": {
        "title": "Notice Management",
        "global_search": "Global search...",
        "admin_user": "Admin User",
        "announcements": "Announcements",
        "manage_broadcast": "Manage and broadcast official updates to all somiti members.",
        "create_new": "Create New Notice",
        "filter_placeholder": "Filter by title or keywords...",
        "status": {
          "all": "All Status",
          "published": "Published",
          "draft": "Draft",
          "archived": "Archived"
        },
        "table": {
          "title": "Notice Title",
          "date": "Date Posted",
          "status": "Status",
          "actions": "Actions",
          "loading": "Loading notices...",
          "no_data": "No notices found."
        },
        "pagination": {
          "showing": "Showing {{count}} of {{total}} notices",
          "previous": "Previous",
          "next": "Next"
        },
        "modal": {
          "create_title": "Create New Notice",
          "edit_title": "Edit Notice",
          "label_title": "Notice Title",
          "label_type": "Notice Type",
          "label_status": "Status",
          "label_date": "Date",
          "label_content": "Content",
          "placeholder_title": "Enter title...",
          "placeholder_content": "Enter notice details...",
          "btn_cancel": "Cancel",
          "btn_save": "Save Notice"
        },
        "type": {
          "general": "General",
          "urgent": "Urgent",
          "financial": "Financial",
          "meeting": "Meeting"
        },
        "delete_confirm": "Are you sure you want to delete this notice?"
      },
      "dev": {
        "title": "DEV CONSOLE",
        "god_mode": "God Mode Active",
        "exit": "Exit God Mode",
        "warning": {
          "title": "System Override Mode Active",
          "text": "Caution: Direct database manipulation bypasses all business logic and validation rules. Standard immutable constraints are disabled."
        },
        "stats": {
          "raw_transactions": "Raw Transactions",
          "throughput": "API Throughput",
          "locked_records": "Locked Records",
          "trash": "Trash Retention"
        },
        "system_state": {
          "title": "Global System State",
          "subtitle": "Control site-wide accessibility and key configuration variables",
          "maintenance": {
            "title": "Emergency Maintenance Mode",
            "text": "Stops all user incoming requests"
          },
          "ssl": {
            "title": "Strict SSL Enforcement",
            "text": "Reject non-HTTPS encrypted traffic"
          },
          "api_override": "Master API Endpoint Override",
          "notification_payload": "Global Notification Payload (JSON)",
          "commit": "Commit Global Changes"
        },
        "terminal": {
          "title": "SQL Command Terminal",
          "placeholder": "Enter SQL query (e.g., SELECT * FROM members)...",
          "execute": "Execute Query",
          "logs": "System Logs",
          "waiting": "Waiting for input..."
        },
        "editor": {
          "title": "Record Editor",
          "no_record": "No record selected for editing.",
          "save": "Save Changes",
          "delete": "Delete Record",
          "reset": "Reset to Original"
        },
        "inspector": {
          "title": "Database Object Inspector",
          "subtitle": "Edit any entity in the system. Use caution, no rollbacks possible from this view.",
          "new_row": "New Row",
          "metadata": "Metadata View",
          "raw_json": "Raw JSON Document",
          "save": "Save Changes",
          "drop": "Drop Record",
          "object_id": "Object ID",
          "schema": "Schema"
        },
        "recovery": {
          "title": "Deleted Assets",
          "view_history": "View Full Archive History"
        },
        "financial": {
          "title": "Financial Reconciliation Override",
          "force": "Force Reconcile",
          "manual": "Manual Credit"
        },
        "footer": {
          "title": "SOMITI MANAGEMENT SYSTEM | INTERNAL DEVELOPER INTERFACE v4.0.2-STABLE",
          "auth": "ACCESS AUTHORIZED VIA HIDDEN DEBUG KEY 0x88FE21"
        }
      },
      "admin": {
        "sidebar": {
          "title": "Somiti Management",
          "subtitle": "Admin Panel",
          "admin_name": "Abdur Rahman",
          "admin_role": "Chief Administrator",
          "menu": {
            "dashboard": "Dashboard",
            "members": "Members",
            "savings": "Savings",
            "notices": "Notices",
            "support": "Support",
            "content": "Website Content",
            "settings": "Settings"
          }
        }
      }
    }
  },
  bn: {
    translation: {
      "close": "বন্ধ করুন",
      "logout": "লগআউট",
      "nav": {
        "home": "হোম",
        "dashboard": "ড্যাশবোর্ড",
        "members": "সদস্যবৃন্দ",
        "financials": "আর্থিক",
        "notices": "নোটিশ",
        "support": "সাপোর্ট",
        "about": "সম্পর্কে",
        "contact": "যোগাযোগ",
        "login": "লগইন",
        "logout": "লগআউট",
        "apply": "আবেদন",
        "dev_console": "ডেভ কনসোল"
      },
      "common": {
        "loading": "লোড হচ্ছে...",
        "error": "ত্রুটি",
        "save": "সংরক্ষণ করুন",
        "cancel": "বাতিল করুন",
        "delete": "মুছে ফেলুন",
        "edit": "সম্পাদনা",
        "search": "অনুসন্ধান",
        "actions": "কার্যক্রম",
        "status": "অবস্থা",
        "date": "তারিখ",
        "amount": "পরিমাণ",
        "member": "সদস্য",
        "success": "সফল",
        "warning": "সতর্কতা",
        "info": "তথ্য",
        "view_all": "সব দেখুন",
        "details": "বিস্তারিত",
        "contact_us": "যোগাযোগ করুন",
        "quick_links": "দ্রুত লিঙ্ক",
        "back_to_home": "হোমে ফিরে যান",
        "back_to_dashboard": "ড্যাশবোর্ডে ফিরে যান",
        "back": "পিছনে"
      },
      "home": {
        "hero_title": "শমিতি",
        "hero_subtitle": "একতাই বল, একতাই শক্তি। আমাদের সকল কার্যক্রম, স্বচ্ছ আর্থিক প্রতিবেদন এবং গুরুত্বপূর্ণ নোটিশের জন্য এখানে যুক্ত থাকুন। আমরা একসঙ্গে এগিয়ে চলি।",
        "get_started": "সদস্য হন",
        "apply_now": "আবেদন করুন",
        "learn_more": "বিস্তারিত",
        "cta_title": "আমাদের সাথে যুক্ত হতে চান?",
        "cta_subtitle": "আজই আপনার আর্থিক নিরাপত্তার যাত্রা শুরু করুন। আমাদের সম্প্রদায়ে যোগ দিন এবং একসাথে এগিয়ে চলুন।",
        "urgent_announcement": "জরুরি ঘোষণা",
        "urgent_announcement_text": "আগামী ১৫ অক্টোবর ২০২৪ তারিখের মাসিক সভা অনিবার্য কারণে স্থগিত করা হয়েছে। পরবর্তী তারিখ শীঘ্রই জানানো হবে।",
        "recent_notices": "সাম্প্রতিক নোটিশসমূহ",
        "member_list": "সদস্য তালিকা",
        "financial_reports": "আর্থিক প্রতিবেদন",
        "contact_phone": "+৮৮০ ১২৩৪ ৫৬৭৮৯০",
        "contact_address": "মতিঝিল, ঢাকা-১০০০"
      },
      "about": {
        "title": "আমাদের সম্পর্কে",
        "subtitle": "ঐক্যবদ্ধভাবে এগিয়ে চলার প্রতিশ্রুতি। আমরা আমাদের সদস্যদের উন্নয়ন এবং সামাজিক কল্যাণে প্রতিশ্রুতিবদ্ধ।",
        "intro_badge": "পরিচিতি",
        "motto": "একতাই বল, উন্নয়নই লক্ষ্য",
        "association_intro": "সমিতির পরিচিতি",
        "registered_members": "নিবন্ধিত সদস্য",
        "mission": "লক্ষ্য (Mission)",
        "vision": "ভবিষ্যৎ পরিকল্পনা (Vision)",
        "objectives": "সমিতির মূল উদ্দেশ্য",
        "objectives_subtitle": "আমাদের সেবার মূল ক্ষেত্রসমূহ নিচে আলোচনা করা হলো",
        "savings_growth": "সঞ্চয় বৃদ্ধি",
        "savings_desc": "সদস্যদের মধ্যে নিয়মিত সঞ্চয়ের অভ্যাস গড়ে তোলা এবং তাদের আমানতের নিরাপত্তা নিশ্চিত করা।",
        "education_support": "শিক্ষা সহায়তা",
        "education_support_desc": "সদস্যদের সন্তানদের জন্য শিক্ষা বৃত্তি এবং বিশেষ মেধা পুরস্কারের ব্যবস্থা করা।",
        "medical_welfare": "চিকিৎসা কল্যাণ",
        "medical_welfare_desc": "অসুস্থ সদস্যদের জন্য জরুরি তহবিল থেকে অনুদান এবং স্বাস্থ্য পরামর্শ কেন্দ্র পরিচালনা।"
      },
      "members": {
        "title": "সদস্য তালিকা",
        "breadcrumb_dashboard": "ড্যাশবোর্ড",
        "breadcrumb_members": "সদস্যগণ",
        "search_placeholder": "সদস্য খুঁজুন...",
        "add_new": "নতুন সদস্য যোগ করুন",
        "all_members": "সকল সদস্য",
        "active": "সক্রিয়",
        "inactive": "নিষ্ক্রিয়",
        "pending": "মুলতুবি",
        "filter_by_role": "রোল অনুযায়ী",
        "table": {
          "member": "সদস্য",
          "id": "সদস্য আইডি",
          "role": "রোল/পদবী",
          "joined_date": "যোগদানের তারিখ",
          "status": "অবস্থা",
          "actions": "অ্যাকশন"
        },
        "pagination": {
          "showing": "দেখাচ্ছে",
          "to": "থেকে",
          "of": "মোট",
          "members": "জন সদস্য"
        },
        "modal": {
          "title": "নতুন সদস্য নিবন্ধন",
          "subtitle": "সদস্যের তথ্যগুলো সঠিকভাবে পূরণ করুন",
          "photo_label": "সদস্যের ছবি",
          "upload_btn": "ছবি আপলোড করুন",
          "upload_hint": "JPG, PNG সর্বোচ্চ ২ মেগাবাইট",
          "full_name": "পূর্ণ নাম (বাংলায়)",
          "member_id": "সদস্য আইডি",
          "role": "রোল / পদবী",
          "select_role": "নির্বাচন করুন",
          "joined_date": "যোগদানের তারিখ",
          "mobile": "মোবাইল নম্বর",
          "address": "বর্তমান ঠিকানা",
          "address_placeholder": "গ্রাম, ডাকঘর, উপজেলা...",
          "name_placeholder": "উদা: কামরুল ইসলাম",
          "id_placeholder": "উদা: MB-2024-001",
          "mobile_placeholder": "০১XXXXXXXXX"
        },
        "no_members_found": "কোনো সদস্য পাওয়া যায়নি",
        "roles": {
          "president": "সভাপতি",
          "secretary": "সম্পাদক",
          "general_secretary": "সাধারণ সম্পাদক",
          "treasurer": "কোষাধ্যক্ষ",
          "general_member": "সাধারণ সদস্য"
        }
      },
      "notices": {
        "title": "অফিসিয়াল নোটিশ বোর্ড",
        "subtitle": "সমিতির সকল গুরুত্বপূর্ণ নোটিশ এবং ঘোষণা এখানে খুঁজে পাবেন।",
        "search_placeholder": "নোটিশ খুঁজুন...",
        "categories": {
          "all": "সকল",
          "general": "সাধারণ",
          "meeting": "সভা",
          "financial": "আর্থিক",
          "urgent": "জরুরি",
          "membership": "সদস্যপদ",
          "info": "তথ্য"
        },
        "sort": {
          "new": "নতুন",
          "old": "পুরাতন"
        },
        "no_notices": "কোনো নোটিশ পাওয়া যায়নি",
        "download_title": "ডাউনলোড ফাইল",
        "view_details": "বিস্তারিত দেখুন"
      },
      "contact": {
        "title": "সহায়তা ও যোগাযোগ",
        "subtitle": "সদস্যরা যেকোনো প্রয়োজনে বা সমস্যার কথা জানাতে নিচের ফর্মটি ব্যবহার করতে পারেন। আমাদের টিম দ্রুত আপনার জিজ্ঞাসার উত্তর দিতে প্রস্তুত।",
        "form_title": "আমাদের বার্তা পাঠান",
        "label_name": "নাম",
        "placeholder_name": "আপনার পূর্ণ নাম লিখুন",
        "label_email": "ইমেইল",
        "placeholder_email": "example@email.com",
        "label_subject": "বিষয়",
        "subject_options": {
          "report": "সমস্যা জানান",
          "query": "প্রশ্ন জিজ্ঞাসা",
          "request": "সংশোধন অনুরোধ",
          "others": "অন্যান্য"
        },
        "label_message": "বার্তা",
        "placeholder_message": "আপনার বার্তা এখানে লিখুন...",
        "send_btn": "বার্তা পাঠান",
        "sending_btn": "পাঠানো হচ্ছে...",
        "info_title": "যোগাযোগের তথ্য",
        "address_label": "ঠিকানা",
        "address_value": "লেভেল ৪, শাপলা ভবন, মতিঝিল বাণিজ্যিক এলাকা, ঢাকা-১০০০",
        "phone_label": "ফোন নম্বর",
        "email_label": "ইমেইল",
        "google_maps": "গুগল ম্যাপে দেখুন",
        "faq_title": "সাধারণ জিজ্ঞাসা",
        "faq_desc": "আপনার মনে থাকা সাধারণ প্রশ্নের উত্তরগুলো এখান থেকে দেখে নিন।",
        "forms_title": "ফরম ও ডাউনলোড",
        "forms_desc": "প্রয়োজনীয় আবেদন ফরম এবং অন্যান্য নথিপত্র ডাউনলোড করুন।",
        "rules_title": "সমিতির নিয়মাবলী",
        "rules_desc": "সমিতির সদস্যপদ এবং সেবার শর্তাবলী সম্পর্কে বিস্তারিত জানুন।",
        "success_msg": "আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
        "error_msg": "দুঃখিত, বার্তা পাঠানো সম্ভব হয়নি। আবার চেষ্টা করুন।",
        "fatal_error_msg": "একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পরে চেষ্টা করুন।"
      },
      "login": {
        "title": "অ্যাডমিন লগইন",
        "subtitle": "অ্যাডমিন লগইন",
        "label_username": "অ্যাডমিন আইডি / ইউজারনেম",
        "placeholder_username": "Admin ID / Username",
        "label_password": "পাসওয়ার্ড",
        "placeholder_password": "Password",
        "forgot_password": "পাসওয়ার্ড ভুলে গেছেন?",
        "remember_me": "এই ডিভাইসে মনে রাখুন",
        "login_btn": "লগইন করুন",
        "support_text": "সহায়তার প্রয়োজন?",
        "contact_support": "সাপোর্ট টিমের সাথে যোগাযোগ করুন",
        "invalid_credentials": "ভুল তথ্য! admin/admin চেষ্টা করুন"
      },
      "financial": {
        "title": "আর্থিক ব্যবস্থাপনা",
        "search_placeholder": "সদস্য খুঁজুন...",
        "admin_user": "অ্যাডমিন ইউজার",
        "super_admin": "সুপার অ্যাডমিন",
        "stats": {
          "total_collection": "মোট সংগ্রহ",
          "this_month": "এই মাসের সংগ্রহ",
          "due_amount": "বকেয়া পরিমাণ",
          "total_members": "সদস্য সংখ্যা",
          "growth": "বৃদ্ধি (গত মাস থেকে)",
          "target_reached": "লক্ষ্যমাত্রার অর্জিত",
          "members_due": "জন সদস্য বাকি",
          "new_members": "জন নতুন (এই মাসে)"
        },
        "table": {
          "title": "লেনদেনের রেকর্ড",
          "add_new": "নতুন রেকর্ড যোগ করুন",
          "member_name": "সদস্যের নাম",
          "id": "আইডি",
          "amount": "পরিমাণ",
          "date": "তারিখ",
          "receipt_no": "রশিদ নং",
          "actions": "অ্যাকশন",
          "view_receipt": "রশিদ দেখুন",
          "edit": "এডিট/সংশোধন"
        },
        "pagination": {
          "total_transactions": "মোট লেনদেন",
          "prev": "পূর্ববর্তী",
          "next": "পরবর্তী"
        },
        "form": {
          "title": "নতুন পেমেন্ট তথ্য যোগ করুন",
          "name_id_label": "সদস্যের নাম / আইডি খুঁজুন",
          "name_id_placeholder": "সদস্যের নাম বা আইডি লিখুন...",
          "amount_label": "টাকার পরিমাণ (৳)",
          "amount_placeholder": "০.০০",
          "date_label": "তারিখ",
          "receipt_no_label": "রশিদ নাম্বার",
          "receipt_no_placeholder": "যেমন: RX-1234",
          "description_label": "বিবরণ",
          "description_placeholder": "উদা: মাসিক সঞ্চয়",
          "upload_label": "রশিদের ছবি আপলোড করুন",
          "upload_hint": "JPG, PNG বা PDF (সর্বোচ্চ ৫ মেগাবাইট)",
          "no_image": "কোনো ছবি নেই",
          "reset_btn": "রিসেট করুন",
          "save_btn": "রেকর্ড সংরক্ষণ করুন"
        },
        "footer_copyright": "© ২০২৪ সমিতি ম্যানেজমেন্ট সিস্টেম। সর্বস্বত্ব সংরক্ষিত।"
      },
      "content_mgmt": {
        "title": "ওয়েবসাইট কন্টেন্ট ম্যানেজমেন্ট",
        "subtitle": "আপনার সমিতির ওয়েবসাইটের সকল তথ্য এখান থেকে আপডেট ও পরিবর্তন করুন।",
        "header_title": "সমিতি সিস্টেম",
        "view_website": "ওয়েবসাইট দেখুন",
        "search_placeholder": "অনুসন্ধান করুন...",
        "sections": {
          "hero": "হোমপেজ হিরো / স্বাগতম বার্তা",
          "about": "আমাদের সম্পর্কে",
          "mission": "আমাদের লক্ষ্য",
          "vision": "আমাদের ভিশন",
          "objectives": "প্রধান উদ্দেশ্যসমূহ"
        },
        "labels": {
          "hero_title": "মূল শিরোনাম (Main Heading)",
          "hero_subtitle": "উপ-শিরোনাম (Sub-heading Content)",
          "about_text": "আমাদের সম্পর্কে টেক্সট",
          "mission_text": "মিশন টেক্সট",
          "vision_text": "ভিশন টেক্সট",
          "objectives_add": "নতুন যোগ করুন",
          "save_title": "শিরোনাম সংরক্ষণ",
          "save_subtitle": "উপ-শিরোনাম সংরক্ষণ",
          "save_btn": "সংরক্ষণ করুন",
          "save_list": "তালিকা সংরক্ষণ করুন",
          "reset_btn": "রিসেট করুন",
          "saved_msg": "সংরক্ষণ করা হয়েছে!"
        }
      },
      "support": {
        "title": "সাপোর্ট ম্যানেজমেন্ট",
        "search_placeholder": "অনুসন্ধান করুন...",
        "stats": {
          "total": "মোট মেসেজ",
          "new": "নতুন ইস্যু",
          "resolved": "সমাধানকৃত",
          "pending": "অপেক্ষমান"
        },
        "tabs": {
          "all": "সব",
          "new": "নতুন",
          "pending": "অপেক্ষমান",
          "resolved": "সমাধানকৃত"
        },
        "table": {
          "name_email": "নাম/ইমেইল",
          "subject": "বিষয়",
          "date": "তারিখ",
          "status": "স্ট্যাটাস",
          "action": "অ্যাকশন",
          "details": "বিস্তারিত",
          "loading": "লোড হচ্ছে...",
          "no_data": "কোনো মেসেজ পাওয়া যায়নি।"
        },
        "modal": {
          "title": "মেসেজ ডিটেইলস",
          "sender": "প্রেরক",
          "date": "তারিখ",
          "subject": "বিষয়",
          "message": "মেসেজ",
          "update_status": "স্ট্যাটাস আপডেট করুন:",
          "close": "বন্ধ করুন"
        },
        "status": {
          "new": "নতুন",
          "pending": "অপেক্ষমান",
          "resolved": "সমাধানকৃত"
        }
      },
      "transparency": {
        "title": "আর্থিক ও স্বচ্ছতা",
        "subtitle": "আমরা পূর্ণ স্বচ্ছতায় বিশ্বাস করি। এখানে আপনি আমাদের সমিতির রিয়েল-টাইম আর্থিক অবস্থা খুঁজে পেতে পারেন। প্রতিটি পয়সা হিসাব করা হয় এবং আমাদের সদস্যদের কল্যাণে ব্যবহার করা হয়।",
        "total_funds": "মোট তহবিল",
        "paid_members": "পরিশোধিত সদস্য",
        "due_amount": "বকেয়া পরিমাণ",
        "allocation": "তহবিল বরাদ্দ",
        "collection_status": "মাসিক আদায়ের অবস্থা",
        "commitment_title": "স্বচ্ছতার প্রতি আমাদের প্রতিশ্রুতি",
        "commitment_text": "আমাদের সিস্টেমের প্রতিটি লেনদেন ডিজিটালভাবে রেকর্ড করা এবং টাইমস্ট্যাম্প করা হয়। আমরা একটি নন-ডিলিটেবল লেজার সিস্টেম ব্যবহার করি, যার অর্থ একবার রেকর্ড এন্ট্রি করা হলে তা চিরতরে সিস্টেমে থেকে যায়। এটি নিশ্চিত করে যে কোনো আর্থিক তথ্য ম্যানিপুলেট বা লুকানো যাবে না। সদস্যরা যেকোনো সময় সমিতির অফিস থেকে বিস্তারিত অডিট রিপোর্ট অনুরোধ করতে পারেন।"
      },
      "ledger": {
        "title": "লেনদেনের খাতা",
        "breadcrumb": {
          "dashboard": "ড্যাশবোর্ড",
          "transactions": "লেনদেনসমূহ"
        },
        "search_placeholder": "খুঁজুন...",
        "new_transaction": "নতুন লেনদেন",
        "stats": {
          "monthly_collection": "এই মাসে মোট সংগ্রহ",
          "collection_trend": "১২% বৃদ্ধি পেয়েছে",
          "due_collection": "বকেয়া সংগ্রহ",
          "due_members": "৮ জন সদস্যের বকেয়া",
          "active_members": "সক্রিয় সদস্য",
          "new_members": "গত মাসে ৩ জন নতুন যুক্ত",
          "paid_members": "পরিশোধিত সদস্য",
          "due_members_count": "বকেয়া সদস্য",
          "paid_desc": "এই মাসে পরিশোধ করেছেন",
          "due_desc": "যাদের বকেয়া রয়েছে"
        },
        "overview": {
          "title": "আর্থিক সারসংক্ষেপ",
          "total_funds": "সমিতির মোট তহবিল",
          "reserve": "সংরক্ষিত মূলধন"
        },
        "status": {
          "title": "আদায়ের অবস্থা",
          "paid": "পরিশোধিত",
          "due": "বকেয়া",
          "goal": "আমাদের লক্ষ্য প্রতি মাসের ১৫ তারিখের মধ্যে ১০০% আদায় নিশ্চিত করা। জরিমানা এড়াতে সময়মতো বকেয়া পরিশোধ করুন।"
        },
        "filters": {
          "search_member": "সদস্যের নাম বা আইডি দিয়ে খুঁজুন",
          "filter": "ফিল্টার",
          "export": "এক্সপোর্ট"
        },
        "table": {
          "member_name": "সদস্যের নাম",
          "member_id": "আইডি",
          "amount": "পরিমাণ (৳)",
          "date": "তারিখ",
          "receipt_no": "রসিদ নম্বর",
          "file": "ফাইল",
          "view": "দেখুন",
          "loading": "লোড হচ্ছে...",
          "no_data": "কোনো লেনদেন পাওয়া যায়নি",
          "showing_entries": "মোট ১০৪টি রেকর্ডের মধ্যে {{count}}টি প্রদর্শিত হচ্ছে"
        },
        "policy": {
          "title": "সতর্কতা ও নীতিমালা:",
          "text": "সততা এবং স্বচ্ছতার স্বার্থে এই সিস্টেমের কোনো রেকর্ড চিরতরে ডিলিট করা সম্ভব নয়। কোনো ভুল হলে তা কেবল 'Correction' বা সংশোধনীর মাধ্যমে আপডেট করা যাবে এবং প্রতিটি সংশোধনের ইতিহাস (Logs) সংরক্ষিত থাকবে।"
        }
      },
      "dashboard": {
        "title": "ড্যাশবোর্ড",
        "welcome": "স্বাগতম, অ্যাডমিন",
        "total_members": "মোট সদস্য",
        "total_savings": "মোট সঞ্চয়",
        "pending_requests": "পেন্ডিং রিকোয়েস্ট",
        "overview": "ড্যাশবোর্ড ওভারভিউ",
        "summary": "আজকের কার্যক্রমের সংক্ষিপ্ত বিবরণ",
        "new_notice": "নতুন নোটিশ",
        "add_member": "সদস্য যোগ করুন",
        "active_notices": "সক্রিয় নোটিশ",
        "total_funds": "মোট সংগৃহীত তহবিল",
        "new_messages": "নতুন সাপোর্ট মেসেজ",
        "recent_transactions": "সাম্প্রতিক আর্থিক লেনদেন",
        "view_all": "সব দেখুন",
        "table": {
          "member_name": "সদস্যের নাম",
          "description": "বিবরণ",
          "date": "তারিখ",
          "amount": "পরিমাণ"
        },
        "quick_actions": "দ্রুত অ্যাকশন",
        "actions": {
          "new_payment": "নতুন পেমেন্ট রেকর্ড",
          "send_sms": "এসএমএস পাঠান",
          "download_report": "রিপোর্ট ডাউনলোড করুন"
        },
        "system_update": {
          "title": "সিস্টেম আপডেট",
          "text": "আগামী ৩০ অক্টোবর রাত ১২টায় সিস্টেম মেইনটেইনেন্স করা হবে। এ সময় ডাটাবেজ ব্যাকআপ নেয়া হবে।",
          "learn_more": "বিস্তারিত জানুন"
        },
        "units": {
          "members": "জন",
          "items": "টি"
        }
      },
      "notice_mgmt": {
        "title": "নোটিশ ম্যানেজমেন্ট",
        "global_search": "অনুসন্ধান করুন...",
        "admin_user": "অ্যাডমিন ইউজার",
        "announcements": "ঘোষণাসমূহ",
        "manage_broadcast": "সমিতির সকল সদস্যদের জন্য অফিসিয়াল আপডেট এবং নোটিশ এখান থেকে ম্যানেজ করুন।",
        "create_new": "নতুন নোটিশ তৈরি করুন",
        "filter_placeholder": "শিরোনাম বা কিওয়ার্ড দিয়ে খুঁজুন...",
        "status": {
          "all": "সব স্ট্যাটাস",
          "published": "প্রকাশিত",
          "draft": "ড্রাফট",
          "archived": "আর্কাইভ"
        },
        "table": {
          "title": "নোটিশ শিরোনাম",
          "date": "প্রকাশের তারিখ",
          "status": "স্ট্যাটাস",
          "actions": "অ্যাকশন",
          "loading": "নোটিশ লোড হচ্ছে...",
          "no_data": "কোনো নোটিশ পাওয়া যায়নি।"
        },
        "pagination": {
          "showing": "মোট {{total}}টি নোটিশের মধ্যে {{count}}টি প্রদর্শিত হচ্ছে",
          "previous": "পূর্ববর্তী",
          "next": "পরবর্তী"
        },
        "modal": {
          "create_title": "নতুন নোটিশ তৈরি করুন",
          "edit_title": "নোটিশ সম্পাদনা করুন",
          "label_title": "নোটিশ শিরোনাম",
          "label_type": "নোটিশের ধরন",
          "label_status": "স্ট্যাটাস",
          "label_date": "তারিখ",
          "label_content": "মূল বিষয়বস্তু",
          "placeholder_title": "শিরোনাম লিখুন...",
          "placeholder_content": "নোটিশের বিস্তারিত এখানে লিখুন...",
          "btn_cancel": "বাতিল করুন",
          "btn_save": "নোটিশ সংরক্ষণ করুন"
        },
        "type": {
          "general": "সাধারণ",
          "urgent": "জরুরি",
          "financial": "আর্থিক",
          "meeting": "সভা"
        },
        "delete_confirm": "আপনি কি নিশ্চিতভাবে এই নোটিশটি ডিলিট করতে চান?"
      },
      "dev": {
        "title": "ডেভ কনসোল",
        "god_mode": "গড মোড সক্রিয়",
        "exit": "গড মোড থেকে বের হন",
        "warning": {
          "title": "সিস্টেম ওভাররাইড মোড সক্রিয়",
          "text": "সতর্কতা: সরাসরি ডাটাবেজ ম্যানিপুলেশন সমস্ত বিজনেস লজিক এবং ভ্যালিডেশন রুলকে বাইপাস করে। স্ট্যান্ডার্ড ইমিউটেবল কনস্ট্রেইন্টগুলি নিষ্ক্রিয় করা হয়েছে।"
        },
        "stats": {
          "raw_transactions": "র ট্রানজ্যাকশন",
          "throughput": "এপিআই থ্রুপুট",
          "locked_records": "লক করা রেকর্ড",
          "trash": "ট্র্যাশ রিটেনশন"
        },
        "system_state": {
          "title": "গ্লোবাল সিস্টেম স্টেট",
          "subtitle": "সাইট-ব্যাপী অ্যাক্সেসযোগ্যতা এবং মূল কনফিগারেশন ভেরিয়েবল নিয়ন্ত্রণ করুন",
          "maintenance": {
            "title": "জরুরি মেইনটেইনেন্স মোড",
            "text": "ব্যবহারকারীদের সকল ইনকামিং রিকোয়েস্ট বন্ধ করে দেয়"
          },
          "ssl": {
            "title": "কঠোর SSL এনফোর্সমেন্ট",
            "text": "নন-HTTPS এনক্রিপ্টেড ট্রাফিক প্রত্যাখ্যান করুন"
          },
          "api_override": "মাস্টার API এন্ডপয়েন্ট ওভাররাইড",
          "notification_payload": "গ্লোবাল নোটিফিকেশন পেলোড (JSON)",
          "commit": "গ্লোবাল পরিবর্তন কার্যকর করুন"
        },
        "terminal": {
          "title": "SQL কমান্ড টার্মিনাল",
          "placeholder": "SQL কুয়েরি লিখুন (যেমন, SELECT * FROM members)...",
          "execute": "কুয়েরি চালান",
          "logs": "সিস্টেম লগ",
          "waiting": "ইনপুটের জন্য অপেক্ষা করা হচ্ছে..."
        },
        "editor": {
          "title": "রেকর্ড এডিটর",
          "no_record": "এডিট করার জন্য কোনো রেকর্ড সিলেক্ট করা হয়নি।",
          "save": "পরিবর্তন সংরক্ষণ করুন",
          "delete": "রেকর্ড মুছে ফেলুন",
          "reset": "আগের অবস্থায় ফিরুন"
        },
        "inspector": {
          "title": "ডাটাবেজ অবজেক্ট ইন্সপেক্টর",
          "subtitle": "সিস্টেমের যেকোনো এনটিটি এডিট করুন। সতর্ক থাকুন, এই ভিউ থেকে কোনো রোলব্যাক সম্ভব নয়।",
          "new_row": "নতুন রো",
          "metadata": "মেটাডাটা ভিউ",
          "raw_json": "র JSON ডকুমেন্ট",
          "save": "পরিবর্তন সংরক্ষণ করুন",
          "drop": "রেকর্ড ড্রপ করুন",
          "object_id": "অবজেক্ট আইডি",
          "schema": "স্কিমা"
        },
        "recovery": {
          "title": "মুছে ফেলা অ্যাসেট",
          "view_history": "সম্পূর্ণ আর্কাইভ ইতিহাস দেখুন"
        },
        "financial": {
          "title": "আর্থিক পুনর্মিলন ওভাররাইড",
          "force": "ফোর্স রিকনসাইল",
          "manual": "ম্যানুয়াল ক্রেডিট"
        },
        "footer": {
          "title": "সমিতি ম্যানেজমেন্ট সিস্টেম | ইন্টারনাল ডেভেলপার ইন্টারফেস v4.0.2-STABLE",
          "auth": "হিডেন ডিবাগ কি 0x88FE21 এর মাধ্যমে অ্যাক্সেস অনুমোদিত"
        }
      },
      "admin": {
        "sidebar": {
          "title": "সমিতি ম্যানেজমেন্ট",
          "subtitle": "অ্যাডমিন প্যানেল",
          "admin_name": "আব্দুর রহমান",
          "admin_role": "প্রধান প্রশাসক",
          "menu": {
            "dashboard": "ড্যাশবোর্ড",
            "members": "সদস্যবৃন্দ",
            "savings": "সঞ্চয়",
            "notices": "নোটিশ",
            "support": "সাপোর্ট",
            "content": "ওয়েবসাইট কন্টেন্ট",
            "settings": "সেটিংস"
          }
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'bn',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
