
export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'vendor' | 'admin';
  college: string;
  avatar: string;
  trustScore: number;
  level: number;
  points: number;
  verified: boolean;
  joinedDate: string;
}

export interface MockItem {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  owner: MockUser;
  rating: number;
  reviews: number;
  location: string;
  availability: 'available' | 'rented' | 'maintenance';
  tags: string[];
  images: string[];
  aiRecommended?: boolean;
  trending?: boolean;
  featured?: boolean;
  urgentNeed?: boolean;
}

export interface MockAnnouncement {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'celebration';
  emoji: string;
  timestamp: string;
  urgent?: boolean;
}

// Abdul Rehan - Your multi-role user profile
export const abdulRehanProfiles: Record<string, MockUser> = {
  student: {
    id: 'abdul-student',
    name: 'Abdul Rehan',
    email: 'abdul.rehan@student.edu',
    role: 'student',
    college: 'IIT Delhi',
    avatar: 'AR',
    trustScore: 950,
    level: 8,
    points: 2450,
    verified: true,
    joinedDate: '2023-08-15'
  },
  vendor: {
    id: 'abdul-vendor',
    name: 'Abdul Rehan',
    email: 'abdul.rehan@vendor.business',
    role: 'vendor',
    college: 'IIT Delhi - Campus Entrepreneur',
    avatar: 'AR',
    trustScore: 985,
    level: 12,
    points: 5670,
    verified: true,
    joinedDate: '2023-06-10'
  },
  admin: {
    id: 'abdul-admin',
    name: 'Abdul Rehan',
    email: 'abdul.rehan@admin.rentmydorm.com',
    role: 'admin',
    college: 'RentMyDorm HQ',
    avatar: 'AR',
    trustScore: 1000,
    level: 15,
    points: 9999,
    verified: true,
    joinedDate: '2023-01-01'
  }
};

export const mockUsers: MockUser[] = [
  ...Object.values(abdulRehanProfiles),
  {
    id: 'user1',
    name: 'Priya Sharma',
    email: 'priya.sharma@iitb.ac.in',
    role: 'student',
    college: 'IIT Bombay',
    avatar: 'PS',
    trustScore: 780,
    level: 5,
    points: 1250,
    verified: true,
    joinedDate: '2023-09-20'
  },
  {
    id: 'user2',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@ventures.co',
    role: 'vendor',
    college: 'BITS Pilani - Local Entrepreneur',
    avatar: 'RK',
    trustScore: 890,
    level: 9,
    points: 3400,
    verified: true,
    joinedDate: '2023-07-15'
  },
  {
    id: 'user3',
    name: 'Dr. Anjali Verma',
    email: 'anjali.verma@admin.edu',
    role: 'admin',
    college: 'VIT Vellore',
    avatar: 'AV',
    trustScore: 950,
    level: 12,
    points: 6780,
    verified: true,
    joinedDate: '2023-03-01'
  }
];

export const mockItems: MockItem[] = [
  {
    id: 'item1',
    title: '🤖 AI-Powered Gaming Laptop',
    description: 'High-performance laptop with RTX 4080, perfect for AI development and gaming. Recommended by our AI for CS students.',
    price: '₹1,200/day',
    category: 'Electronics',
    owner: abdulRehanProfiles.vendor,
    rating: 4.9,
    reviews: 47,
    location: 'IIT Delhi - 0.5km',
    availability: 'available',
    tags: ['🔥 Trending', '🤖 AI Pick', '⚡ High Performance', '🎮 Gaming'],
    images: ['/placeholder.svg'],
    aiRecommended: true,
    trending: true,
    featured: true
  },
  {
    id: 'item2',
    title: '📚 Complete Engineering Books Set',
    description: 'All major engineering textbooks including CLRS, Cormen algorithms book. AI suggests this for your Data Structures course!',
    price: '₹150/week',
    category: 'Books',
    owner: mockUsers[1],
    rating: 4.8,
    reviews: 23,
    location: 'IIT Bombay - 1.2km',
    availability: 'available',
    tags: ['🤖 AI Recommended', '📖 Study Essential', '🎓 Academic'],
    images: ['/placeholder.svg'],
    aiRecommended: true,
    urgentNeed: true
  },
  {
    id: 'item3',
    title: '🌊 Smart Air Cooler - Summer Essential',
    description: 'Energy-efficient smart cooler with IoT controls. Trending due to summer heat wave! Campus entrepreneurs special.',
    price: '₹200/day',
    category: 'Appliances',
    owner: mockUsers[2],
    rating: 4.7,
    reviews: 89,
    location: 'BITS Pilani - 0.8km',
    availability: 'available',
    tags: ['🔥 Trending', '🌡️ Summer Must', '💨 Cooling', '🏠 Local Vendor'],
    images: ['/placeholder.svg'],
    trending: true,
    featured: true
  },
  {
    id: 'item4',
    title: '🎯 Professional DSLR Camera',
    description: 'Canon EOS R5 with multiple lenses. Perfect for photography enthusiasts and content creators.',
    price: '₹800/day',
    category: 'Photography',
    owner: abdulRehanProfiles.student,
    rating: 4.9,
    reviews: 34,
    location: 'IIT Delhi - 0.3km',
    availability: 'rented',
    tags: ['📸 Pro Grade', '🎬 Content Creation', '⭐ Premium'],
    images: ['/placeholder.svg']
  },
  {
    id: 'item5',
    title: '🎮 PlayStation 5 Console',
    description: 'Latest PS5 with popular games included. AI detected high demand in your area!',
    price: '₹500/day',
    category: 'Gaming',
    owner: mockUsers[1],
    rating: 4.8,
    reviews: 67,
    location: 'VIT Vellore - 1.5km',
    availability: 'available',
    tags: ['🔥 High Demand', '🎮 Gaming', '🤖 AI Spotted Trend'],
    images: ['/placeholder.svg'],
    aiRecommended: true,
    trending: true
  }
];

export const mockAnnouncements: MockAnnouncement[] = [
  {
    id: 'ann1',
    title: '🎉 Welcome Abdul Rehan!',
    message: 'Campus entrepreneur extraordinaire just joined! Check out his premium gaming setup rentals.',
    type: 'celebration',
    emoji: '🎊',
    timestamp: '2 minutes ago',
    urgent: false
  },
  {
    id: 'ann2',
    title: '🔥 Summer Surge Alert!',
    message: 'Cooling appliances demand up 300%! List your ACs and coolers now for premium earnings.',
    type: 'warning',
    emoji: '🌡️',
    timestamp: '15 minutes ago',
    urgent: true
  },
  {
    id: 'ann3',
    title: '🤖 AI Just Got Smarter!',
    message: 'Our recommendation engine now predicts your needs 94% better! Try the new AI Recommendations feature.',
    type: 'info',
    emoji: '🧠',
    timestamp: '1 hour ago',
    urgent: false
  },
  {
    id: 'ann4',
    title: '💰 Local Vendors Program Live!',
    message: 'Campus entrepreneurs can now join as verified local vendors! Apply today and start earning.',
    type: 'success',
    emoji: '🏪',
    timestamp: '3 hours ago',
    urgent: false
  },
  {
    id: 'ann5',
    title: '⚡ Flash Rental Weekend!',
    message: 'This weekend only: 25% off all electronics rentals! Perfect for project submissions.',
    type: 'celebration',
    emoji: '⚡',
    timestamp: '6 hours ago',
    urgent: true
  }
];

export const mockTrendingCategories = [
  { name: '🔥 Electronics', count: 234, trend: '+45%', emoji: '💻' },
  { name: '🌊 Cooling Solutions', count: 156, trend: '+89%', emoji: '❄️' },
  { name: '📚 Study Materials', count: 89, trend: '+23%', emoji: '📖' },
  { name: '🎮 Gaming Gear', count: 67, trend: '+67%', emoji: '🎯' },
  { name: '📸 Photography', count: 45, trend: '+12%', emoji: '📷' }
];

export const mockStats = {
  totalUsers: 15420,
  activeRentals: 3456,
  campusPartners: 89,
  localVendors: 234,
  aiRecommendations: 12890,
  sustainabilityScore: 94
};

// Utility functions
export const getRandomAnnouncement = (): MockAnnouncement => {
  return mockAnnouncements[Math.floor(Math.random() * mockAnnouncements.length)];
};

export const getTrendingItems = (): MockItem[] => {
  return mockItems.filter(item => item.trending || item.aiRecommended);
};

export const getItemsByCategory = (category: string): MockItem[] => {
  return mockItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
};

export const getAIRecommendedItems = (): MockItem[] => {
  return mockItems.filter(item => item.aiRecommended);
};

export const getUserByRole = (role: 'student' | 'vendor' | 'admin'): MockUser => {
  return abdulRehanProfiles[role];
};
