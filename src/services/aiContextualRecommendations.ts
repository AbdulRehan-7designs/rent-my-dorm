
// AI Contextual Recommendations for Campus-Specific Needs
export interface CampusContext {
  campusName: string;
  currentSeason: 'summer' | 'winter' | 'monsoon' | 'spring';
  upcomingEvents: string[];
  examPeriod: boolean;
  festivalSeason: boolean;
}

export interface TrendingData {
  mostRentedItems: string[];
  emergingNeeds: string[];
  seasonalDemand: string[];
}

export class AIContextualRecommendations {
  // Generate campus-specific trending recommendations
  static getCampusTrendingItems(context: CampusContext, trendingData: TrendingData): string[] {
    const recommendations: string[] = [];
    
    // Seasonal recommendations
    switch (context.currentSeason) {
      case 'summer':
        recommendations.push(
          'Air Coolers', 'Portable Fans', 'Cold Water Bottles',
          'Summer Bedsheets', 'Cooling Mats', 'Refrigerator'
        );
        break;
      case 'monsoon':
        recommendations.push(
          'Umbrellas', 'Raincoats', 'Room Heaters',
          'Waterproof Bags', 'Dehumidifiers', 'Quick-dry Towels'
        );
        break;
      case 'winter':
        recommendations.push(
          'Room Heaters', 'Blankets', 'Hot Water Bags',
          'Winter Clothes Iron', 'Warm Lighting', 'Coffee Makers'
        );
        break;
    }
    
    // Exam period recommendations
    if (context.examPeriod) {
      recommendations.push(
        'Study Lamps', 'Comfortable Chairs', 'Noise-Cancelling Headphones',
        'Coffee Makers', 'Energy Drinks Refrigerator', 'Stress Relief Items',
        'Reference Books', 'Calculators', 'Stationery Sets'
      );
    }
    
    // Festival season recommendations
    if (context.festivalSeason) {
      recommendations.push(
        'Ethnic Wear', 'Cameras for Memories', 'Decoration Items',
        'Sound Systems', 'Festive Lighting', 'Party Games',
        'Traditional Jewelry', 'Festival Sweets Storage'
      );
    }
    
    // Event-based recommendations
    context.upcomingEvents.forEach(event => {
      const eventLower = event.toLowerCase();
      
      if (eventLower.includes('sports') || eventLower.includes('tournament')) {
        recommendations.push('Sports Equipment', 'Energy Drinks', 'Sports Shoes', 'Fitness Trackers');
      }
      
      if (eventLower.includes('cultural') || eventLower.includes('fest')) {
        recommendations.push('Costumes', 'Makeup Kits', 'Musical Instruments', 'Stage Props');
      }
      
      if (eventLower.includes('tech') || eventLower.includes('hackathon')) {
        recommendations.push('Laptops', 'External Monitors', 'Portable Chargers', 'Networking Equipment');
      }
    });
    
    // Add trending items
    recommendations.push(...trendingData.mostRentedItems);
    recommendations.push(...trendingData.emergingNeeds);
    
    return [...new Set(recommendations)]; // Remove duplicates
  }
  
  // Proactive recommendations based on student behavior patterns
  static getProactiveRecommendations(studentProfile: any, campusData: any): string[] {
    const recommendations: string[] = [];
    
    // Time-based patterns
    const currentHour = new Date().getHours();
    
    if (currentHour >= 22 || currentHour <= 6) {
      recommendations.push(
        'Study Lamps for Night Study',
        'Coffee/Tea Makers',
        'Comfortable Study Chairs',
        'Blue Light Glasses'
      );
    }
    
    // Course-based proactive suggestions
    if (studentProfile.courses) {
      studentProfile.courses.forEach((course: string) => {
        const courseLower = course.toLowerCase();
        
        if (courseLower.includes('lab') || courseLower.includes('practical')) {
          recommendations.push('Lab Coats', 'Safety Equipment', 'Lab Notebooks');
        }
        
        if (courseLower.includes('presentation') || courseLower.includes('seminar')) {
          recommendations.push('Presentation Clickers', 'Portable Projectors', 'Formal Wear');
        }
      });
    }
    
    // Weather-based suggestions
    const weather = campusData.currentWeather;
    if (weather === 'hot') {
      recommendations.push('Cooling Solutions', 'Hydration Items', 'Light Clothing');
    } else if (weather === 'rainy') {
      recommendations.push('Rain Protection', 'Indoor Entertainment', 'Warm Drinks Setup');
    }
    
    return recommendations;
  }
  
  // Generate personalized insights
  static generatePersonalizedInsights(studentId: string, rentalHistory: any[], preferences: string[]): string[] {
    const insights: string[] = [];
    
    // Rental pattern analysis
    if (rentalHistory.length > 0) {
      const recentRentals = rentalHistory.slice(-5);
      const categories = recentRentals.map(r => r.category);
      const mostCommon = this.getMostCommonCategory(categories);
      
      if (mostCommon) {
        insights.push(`You frequently rent ${mostCommon} items. Consider exploring related categories!`);
      }
      
      // Seasonal pattern detection
      const seasonalPattern = this.detectSeasonalPattern(rentalHistory);
      if (seasonalPattern) {
        insights.push(seasonalPattern);
      }
    }
    
    // Preference-based insights
    preferences.forEach(pref => {
      if (pref === 'eco-friendly') {
        insights.push('Great choice! Renting reduces waste and supports sustainability.');
      }
      if (pref === 'budget-conscious') {
        insights.push('Smart spending! Renting saves money compared to buying items you rarely use.');
      }
    });
    
    return insights;
  }
  
  private static getMostCommonCategory(categories: string[]): string | null {
    const frequency = categories.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const maxCount = Math.max(...Object.values(frequency));
    const mostCommon = Object.keys(frequency).find(key => frequency[key] === maxCount);
    
    return mostCommon || null;
  }
  
  private static detectSeasonalPattern(history: any[]): string | null {
    // Simple seasonal pattern detection
    const summerRentals = history.filter(h => {
      const month = new Date(h.date).getMonth();
      return month >= 3 && month <= 6; // April to July
    });
    
    if (summerRentals.length > history.length * 0.6) {
      return 'You tend to rent more items during summer months. Consider planning ahead for cooling solutions!';
    }
    
    return null;
  }
}
