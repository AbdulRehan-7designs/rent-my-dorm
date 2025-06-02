
// AI-Powered Smart Recommendations Engine
export interface StudentProfile {
  courses: string[];
  examDates?: Date[];
  rentalHistory: string[];
  campus: string;
  year: number;
  preferences: string[];
}

export interface RecommendationContext {
  timeContext: 'exam-period' | 'festival' | 'summer' | 'monsoon' | 'regular';
  urgency: 'urgent' | 'planned' | 'casual';
  budget: 'low' | 'medium' | 'high';
}

export class AIRecommendationEngine {
  // Subject-based recommendations
  static getSubjectBasedRecommendations(courses: string[], examWeeks: number): string[] {
    const recommendations: string[] = [];
    
    courses.forEach(course => {
      const lowerCourse = course.toLowerCase();
      
      if (lowerCourse.includes('data structures') || lowerCourse.includes('algorithms')) {
        recommendations.push(
          'Programming Books (CLRS, Cormen)',
          'Whiteboard for Algorithm Practice',
          'Scientific Calculator',
          'Laptop Stand for Long Coding Sessions',
          'External Monitor for Dual Screen Setup'
        );
      }
      
      if (lowerCourse.includes('linear algebra') || lowerCourse.includes('mathematics')) {
        recommendations.push(
          'Mathematical Reference Books',
          'Graphing Calculator',
          'Study Lamp for Late Night Sessions',
          'Comfortable Study Chair',
          'Mathematical Instruments Set'
        );
      }
      
      if (lowerCourse.includes('physics') || lowerCourse.includes('engineering')) {
        recommendations.push(
          'Scientific Calculator',
          'Physics Lab Manual',
          'Digital Multimeter',
          'Oscilloscope (Basic)',
          'Lab Notebook and Instruments'
        );
      }
      
      if (lowerCourse.includes('chemistry')) {
        recommendations.push(
          'Chemistry Reference Books',
          'Lab Safety Equipment',
          'Molecular Model Kit',
          'Lab Coat and Goggles',
          'Digital pH Meter'
        );
      }
    });
    
    // Exam period specific items
    if (examWeeks <= 4) {
      recommendations.push(
        'Air Cooler/Fan for Comfort',
        'Desk Organizer',
        'Coffee Maker for All-nighters',
        'Noise Cancelling Headphones',
        'Power Bank for Extended Study'
      );
    }
    
    return [...new Set(recommendations)]; // Remove duplicates
  }
  
  // Cross-selling recommendations based on rental history
  static getCrossSellRecommendations(frequentRentals: string[]): string[] {
    const crossSellMap: Record<string, string[]> = {
      'gaming consoles': [
        'Gaming Chairs',
        'External Controllers',
        'Gaming Headsets',
        'Large Screen Monitors',
        'Gaming Keyboards'
      ],
      'board games': [
        'Card Games Collection',
        'Puzzle Sets',
        'Party Games',
        'Strategy Games',
        'Game Night Snacks Organizer'
      ],
      'study materials': [
        'Study Lamps',
        'Ergonomic Chairs',
        'Whiteboards',
        'Reference Books',
        'Note-taking Tablets'
      ],
      'electronics': [
        'Power Banks',
        'Cable Organizers',
        'Laptop Stands',
        'External Hard Drives',
        'Tech Cleaning Kits'
      ]
    };
    
    const recommendations: string[] = [];
    
    frequentRentals.forEach(rental => {
      const category = this.categorizeItem(rental);
      if (crossSellMap[category]) {
        recommendations.push(...crossSellMap[category]);
      }
    });
    
    return [...new Set(recommendations)];
  }
  
  // Contextual recommendations based on season/events
  static getContextualRecommendations(context: RecommendationContext, campus: string): string[] {
    const contextualItems: Record<string, string[]> = {
      'exam-period': [
        'Study Lamps', 'Air Coolers', 'Coffee Makers', 
        'Comfortable Chairs', 'Noise Cancelling Headphones'
      ],
      'summer': [
        'Air Coolers', 'Portable Fans', 'Refrigerators',
        'Summer Clothes Iron', 'Cooling Mats'
      ],
      'monsoon': [
        'Umbrellas', 'Room Heaters', 'Dehumidifiers',
        'Waterproof Bags', 'Quick Dry Clothes'
      ],
      'festival': [
        'Ethnic Wear', 'Decoration Items', 'Cameras',
        'Sound Systems', 'Lighting Equipment'
      ]
    };
    
    return contextualItems[context.timeContext] || [];
  }
  
  private static categorizeItem(item: string): string {
    const itemLower = item.toLowerCase();
    
    if (itemLower.includes('game') || itemLower.includes('console') || itemLower.includes('playstation')) {
      return 'gaming consoles';
    }
    if (itemLower.includes('board') || itemLower.includes('card') || itemLower.includes('puzzle')) {
      return 'board games';
    }
    if (itemLower.includes('book') || itemLower.includes('notes') || itemLower.includes('study')) {
      return 'study materials';
    }
    if (itemLower.includes('laptop') || itemLower.includes('phone') || itemLower.includes('electronic')) {
      return 'electronics';
    }
    
    return 'general';
  }
}
