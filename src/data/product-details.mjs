import { bi } from './content.mjs';

// Descriptions explain proposed modules; the project proposal defines delivery scope.
export const productDetails = {
 'school-management': [
  bi('Keep admission details, student profiles and class placement together, with the fields your institution needs.', 'ভর্তি তথ্য, শিক্ষার্থীর প্রোফাইল ও শ্রেণিবিন্যাস আপনার প্রতিষ্ঠানের প্রয়োজনীয় ঘরসহ এক জায়গায় রাখুন।'),
  bi('Record class attendance and organise timetables so teachers and administrators work from the same schedule.', 'শ্রেণির উপস্থিতি লিখুন ও রুটিন সাজান, যাতে শিক্ষক ও প্রশাসন একই সময়সূচি অনুসরণ করতে পারেন।'),
  bi('Set up fee categories, record collections and receipts, and identify outstanding dues for follow-up.', 'ফি-এর ধরন নির্ধারণ, আদায় ও রসিদ সংরক্ষণ এবং বকেয়া শনাক্ত করে যোগাযোগের ব্যবস্থা রাখুন।'),
  bi('Define assessment structures, enter marks and prepare report cards using your agreed grading rules.', 'পরীক্ষার কাঠামো ঠিক করুন, নম্বর লিখুন ও নির্ধারিত গ্রেডিং নিয়মে রিপোর্ট কার্ড প্রস্তুত করুন।'),
  bi('Give parents and teachers access to the information relevant to them, such as notices, progress and class updates.', 'অভিভাবক ও শিক্ষককে তাঁদের প্রয়োজনীয় নোটিশ, অগ্রগতি ও ক্লাসের আপডেট দেখার সুযোগ দিন।'),
  bi('Separate administrative, teaching and accounts access, with reports for the people responsible for each area.', 'প্রশাসন, শিক্ষকতা ও হিসাবের অ্যাকসেস আলাদা রাখুন এবং দায়িত্ব অনুযায়ী রিপোর্ট দিন।')
 ],
 edtech: [
  bi('Arrange learning material into courses and lessons, with a structure learners can follow at their own pace.', 'কোর্স ও লেসনে শেখার উপকরণ সাজান, যাতে শিক্ষার্থী নিজের গতিতে ধারাবাহিকভাবে এগোতে পারে।'),
  bi('Connect your selected live-class provider and organise session links and schedules inside the learning journey.', 'নির্বাচিত লাইভ ক্লাস সেবার সঙ্গে যুক্ত করে কোর্সের মধ্যেই সেশন লিংক ও সময়সূচি সাজান।'),
  bi('Create assessments, collect submissions and review learner work according to the evaluation flow you choose.', 'মূল্যায়নের প্রক্রিয়া অনুযায়ী পরীক্ষা তৈরি, জমা নেওয়া ও শিক্ষার্থীর কাজ পর্যালোচনা করুন।'),
  bi('Manage course access and enrolments, with a payment provider integrated where included in your scope.', 'কোর্সে ভর্তি ও অ্যাকসেস পরিচালনা করুন; কাজের পরিধিতে থাকলে পেমেন্ট সেবাও যুক্ত করুন।'),
  bi('Track lesson completion and define the conditions under which a learner receives a course certificate.', 'লেসন শেষ করার অগ্রগতি দেখুন এবং কোন শর্তে কোর্স সনদ দেওয়া হবে তা নির্ধারণ করুন।'),
  bi('Provide a place for course questions and relevant updates, with moderation and notification rules you approve.', 'অনুমোদিত মডারেশন ও নোটিফিকেশন নিয়মে কোর্সের প্রশ্ন ও প্রয়োজনীয় আপডেটের জায়গা রাখুন।')
 ],
 healthcare: [
  bi('Book visits, manage daily queues and make appointment status visible to the staff who coordinate patient flow.', 'ভিজিট বুকিং, দৈনিক সিরিয়াল ও অ্যাপয়েন্টমেন্টের অবস্থা সংশ্লিষ্ট কর্মীদের জন্য এক জায়গায় রাখুন।'),
  bi('Organise patient details and previous visits with access limited to authorised roles.', 'অনুমোদিত দায়িত্বের মধ্যে অ্যাকসেস সীমিত রেখে রোগীর তথ্য ও আগের ভিজিট সাজান।'),
  bi('Maintain consultation hours and availability so reception staff can offer suitable appointment slots.', 'চিকিৎসকের সময় ও উপস্থিতি রাখুন, যাতে রিসেপশন উপযুক্ত অ্যাপয়েন্টমেন্ট দিতে পারে।'),
  bi('Record charges, payments and receipts against visits, with a clear view of outstanding balances.', 'ভিজিট অনুযায়ী চার্জ, পেমেন্ট ও রসিদ রাখুন এবং বকেয়ার পরিষ্কার হিসাব দেখুন।'),
  bi('Attach reports and documents to the appropriate records, with controlled access and an agreed retention policy.', 'নির্ধারিত সংরক্ষণ নীতি ও নিয়ন্ত্রিত অ্যাকসেসসহ সংশ্লিষ্ট রেকর্ডে রিপোর্ট ও নথি যুক্ত করুন।'),
  bi('Define what each staff role may view or change and which actions should be recorded for review.', 'কোন কর্মী কী দেখতে বা বদলাতে পারবেন এবং কোন কাজ পর্যালোচনার জন্য লগ হবে, ঠিক করুন।')
 ],
 ecommerce: [
  bi('Publish products with categories, images, options and variants that reflect how you actually sell.', 'আপনার বিক্রির ধরন অনুযায়ী ক্যাটাগরি, ছবি, অপশন ও ভ্যারিয়েন্টসহ পণ্য প্রকাশ করুন।'),
  bi('Let customers review a basket, provide delivery details and complete the payment flow agreed for your store.', 'গ্রাহককে কার্ট দেখা, ডেলিভারির তথ্য দেওয়া ও নির্ধারিত পেমেন্ট প্রক্রিয়া সম্পন্ন করার সুযোগ দিন।'),
  bi('Track stock changes and flag low availability so the team can plan replenishment.', 'স্টকের পরিবর্তন দেখুন ও কমে এলে শনাক্ত করুন, যাতে টিম পুনরায় পণ্য আনার পরিকল্পনা করতে পারে।'),
  bi('Follow each order from confirmation through packing, dispatch and the delivery updates included in your setup.', 'অর্ডার নিশ্চিত হওয়া থেকে প্যাকিং, পাঠানো ও সেটআপে অন্তর্ভুক্ত ডেলিভারি আপডেট অনুসরণ করুন।'),
  bi('Set clear rules for offers and coupons, including eligibility, validity and usage limits.', 'অফার ও কুপনের যোগ্যতা, মেয়াদ ও ব্যবহারের সীমাসহ পরিষ্কার নিয়ম নির্ধারণ করুন।'),
  bi('Provide order history for customers and useful sales views for the people running the store.', 'গ্রাহককে আগের অর্ডার দেখান এবং দোকান পরিচালনাকারীদের প্রয়োজনীয় বিক্রির রিপোর্ট দিন।')
 ],
 'business-erp': [
  bi('Keep supplier details and purchasing records connected, making it easier to follow orders and payments.', 'সাপ্লায়ারের তথ্য ও ক্রয়ের হিসাব যুক্ত রাখুন, যাতে অর্ডার ও পেমেন্ট অনুসরণ সহজ হয়।'),
  bi('Record receipts, stock adjustments and transfers between the locations included in your operation.', 'আপনার কার্যক্রমে থাকা লোকেশনগুলোর পণ্য গ্রহণ, স্টক সংশোধন ও স্থানান্তর রেকর্ড করুন।'),
  bi('Prepare sales records and invoices, then track collections against the amounts due.', 'বিক্রির রেকর্ড ও ইনভয়েস তৈরি করে পাওনার বিপরীতে আদায় অনুসরণ করুন।'),
  bi('Categorise business expenses and view recorded cash movement for management review.', 'ব্যবসার খরচ শ্রেণিবিন্যাস করুন ও ব্যবস্থাপনার পর্যালোচনার জন্য নথিভুক্ত নগদ লেনদেন দেখুন।'),
  bi('Give branches and departments appropriate access without exposing every business record to every user.', 'সব তথ্য সব ব্যবহারকারীকে না দেখিয়ে শাখা ও বিভাগকে প্রয়োজন অনুযায়ী অ্যাকসেস দিন।'),
  bi('Build agreed summary reports and exports so managers can review activity outside the day-to-day screens.', 'নির্ধারিত সারসংক্ষেপ রিপোর্ট ও এক্সপোর্ট তৈরি করুন, যাতে ব্যবস্থাপক সামগ্রিক কার্যক্রম দেখতে পারেন।')
 ],
 crm: [
  bi('Bring incoming enquiries into one place and assign each lead to the person responsible for the next step.', 'আসা অনুসন্ধান এক জায়গায় এনে পরবর্তী কাজের দায়িত্বপ্রাপ্ত ব্যক্তিকে প্রতিটি লিড দিন।'),
  bi('Define your sales stages and move opportunities through a pipeline the team can review together.', 'বিক্রির ধাপ নির্ধারণ করে সুযোগগুলো এমন পাইপলাইনে রাখুন, যা পুরো টিম পর্যালোচনা করতে পারে।'),
  bi('Schedule follow-ups and make pending tasks visible so promising conversations do not disappear in a chat history.', 'ফলোআপের সময় ঠিক করুন ও বাকি কাজ দৃশ্যমান রাখুন, যাতে সম্ভাবনাময় আলোচনা চ্যাটে হারিয়ে না যায়।'),
  bi('Keep notes, interactions and deal history together for a more informed customer conversation.', 'নোট, যোগাযোগ ও ডিলের ইতিহাস একসঙ্গে রাখুন, যাতে গ্রাহকের সঙ্গে তথ্য জেনে কথা বলা যায়।'),
  bi('Track proposal status and review sales activity using the reports agreed for your process.', 'প্রস্তাবের অবস্থা অনুসরণ করুন এবং আপনার প্রক্রিয়া অনুযায়ী নির্ধারিত রিপোর্টে বিক্রির কার্যক্রম দেখুন।'),
  bi('Control ownership and visibility by role, team or assignment according to your operating model.', 'আপনার পরিচালনার ধরন অনুযায়ী দায়িত্ব, টিম বা অ্যাসাইনমেন্টভিত্তিক তথ্য দেখার সুযোগ নির্ধারণ করুন।')
 ],
 restaurant: [
  bi('Organise menu categories, item options and add-ons with pricing that staff can apply consistently.', 'মেনুর ক্যাটাগরি, অপশন ও বাড়তি আইটেমের মূল্য সাজান, যাতে কর্মীরা একই নিয়মে ব্যবহার করতে পারেন।'),
  bi('Capture dine-in and takeaway orders with the details your front-of-house team needs.', 'সার্ভিস টিমের প্রয়োজনীয় তথ্যসহ টেবিল ও টেকঅ্যাওয়ে অর্ডার গ্রহণ করুন।'),
  bi('Send order details to a kitchen view and keep preparation status visible to the relevant staff.', 'রান্নাঘরের স্ক্রিনে অর্ডারের তথ্য দিন ও প্রস্তুতির অবস্থা সংশ্লিষ্ট কর্মীদের দেখান।'),
  bi('Prepare bills, record payment methods and issue receipts through the agreed checkout setup.', 'নির্ধারিত চেকআউট ব্যবস্থা দিয়ে বিল তৈরি, পেমেন্টের ধরন রেকর্ড ও রসিদ দিন।'),
  bi('Record ingredient stock and adjustments; recipe-based deductions can be scoped for your menu.', 'উপকরণের স্টক ও পরিবর্তন রাখুন; আপনার মেনু অনুযায়ী রেসিপিভিত্তিক স্টক কমানোর ব্যবস্থা পরিকল্পনা করা যায়।'),
  bi('Review shift activity and sales totals to support daily reconciliation and operating decisions.', 'দৈনিক হিসাব মেলানো ও পরিচালনার সিদ্ধান্তের জন্য শিফটের কাজ ও মোট বিক্রি পর্যালোচনা করুন।')
 ],
 'hr-payroll': [
  bi('Keep employee profiles and agreed documents in an organised directory with appropriate access controls.', 'প্রয়োজনীয় অ্যাকসেস নিয়ন্ত্রণসহ গোছানো ডিরেক্টরিতে কর্মীদের প্রোফাইল ও নির্ধারিত নথি রাখুন।'),
  bi('Maintain working schedules and attendance records, with device integrations scoped separately when needed.', 'কাজের সময়সূচি ও উপস্থিতি রাখুন; প্রয়োজন হলে ডিভাইস ইন্টিগ্রেশন আলাদা করে পরিকল্পনা করুন।'),
  bi('Let employees submit leave requests and route them to the right approver using your policy.', 'কর্মীদের ছুটির আবেদন গ্রহণ করে প্রতিষ্ঠানের নীতি অনুযায়ী যথাযথ অনুমোদনকারীর কাছে পাঠান।'),
  bi('Prepare payroll inputs and payslips using agreed rules, with human review before payments are processed.', 'নির্ধারিত নিয়মে বেতনের তথ্য ও পে-স্লিপ প্রস্তুত করুন; পেমেন্টের আগে দায়িত্বপ্রাপ্ত ব্যক্তি যাচাই করবেন।'),
  bi('Give employees a place to view their information, request changes and access the records you make available.', 'কর্মীদের নিজস্ব তথ্য দেখা, সংশোধনের আবেদন ও অনুমোদিত রেকর্ড পাওয়ার জায়গা দিন।'),
  bi('Provide useful HR summaries while keeping personal and payroll information limited to authorised people.', 'ব্যক্তিগত ও বেতনের তথ্য অনুমোদিত ব্যক্তির মধ্যে সীমিত রেখে প্রয়োজনীয় HR সারসংক্ষেপ দিন।')
 ]
};
