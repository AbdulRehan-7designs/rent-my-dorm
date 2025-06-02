
// AI Item Matching Service for Community Wishlist
export interface WishlistRequest {
  id: string;
  title: string;
  description: string;
  urgency: 'urgent' | 'moderate' | 'flexible';
  maxBudget?: number;
  requiredBy?: Date;
  studentId: string;
}

export interface AvailableItem {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  vendorId: string;
  tags: string[];
}

export interface MatchResult {
  item: AvailableItem;
  relevanceScore: number;
  matchReasons: string[];
  concerns: string[];
}

export class AIItemMatching {
  // Semantic matching for wishlist requests
  static matchRequestToItems(request: WishlistRequest, availableItems: AvailableItem[]): MatchResult[] {
    const matches: MatchResult[] = [];
    
    for (const item of availableItems) {
      const matchResult = this.calculateMatch(request, item);
      if (matchResult.relevanceScore > 30) { // Only include relevant matches
        matches.push(matchResult);
      }
    }
    
    // Sort by relevance score (highest first)
    return matches.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
  
  private static calculateMatch(request: WishlistRequest, item: AvailableItem): MatchResult {
    let score = 0;
    const reasons: string[] = [];
    const concerns: string[] = [];
    
    const requestLower = (request.title + ' ' + request.description).toLowerCase();
    const itemLower = (item.title + ' ' + item.description).toLowerCase();
    
    // Exact title match (highest weight)
    if (this.normalizeTitle(item.title).includes(this.normalizeTitle(request.title))) {
      score += 50;
      reasons.push('Exact title match found');
    }
    
    // Keyword matching
    const requestKeywords = this.extractKeywords(requestLower);
    const itemKeywords = this.extractKeywords(itemLower);
    
    const commonKeywords = requestKeywords.filter(kw => itemKeywords.includes(kw));
    score += commonKeywords.length * 10;
    
    if (commonKeywords.length > 0) {
      reasons.push(`Matching keywords: ${commonKeywords.join(', ')}`);
    }
    
    // Specific matching logic for common student requests
    score += this.getSpecificMatchScore(requestLower, itemLower, reasons, concerns);
    
    // Budget considerations
    if (request.maxBudget && item.price > request.maxBudget) {
      score -= 15;
      concerns.push(`Price (₹${item.price}) exceeds budget (₹${request.maxBudget})`);
    }
    
    // Urgency bonus for highly relevant matches
    if (request.urgency === 'urgent' && score > 60) {
      score += 10;
      reasons.push('High relevance for urgent request');
    }
    
    return {
      item,
      relevanceScore: Math.min(100, Math.max(0, score)),
      matchReasons: reasons,
      concerns
    };
  }
  
  private static getSpecificMatchScore(request: string, item: string, reasons: string[], concerns: string[]): number {
    let score = 0;
    
    // Algorithm book matching logic
    if (request.includes('algorithms') && request.includes('clrs')) {
      if (item.includes('clrs') || item.includes('cormen')) {
        score += 40;
        reasons.push('CLRS book specifically requested and found');
      } else if (item.includes('algorithms') && item.includes('thomas')) {
        score += 25;
        reasons.push('Related algorithms book by same author (Cormen)');
      } else if (item.includes('algorithms')) {
        score += 15;
        reasons.push('General algorithms book match');
      }
      
      if (request.includes('3rd edition') && item.includes('older edition')) {
        score -= 10;
        concerns.push('Older edition may not match current syllabus');
      }
    }
    
    // Electronics matching
    if (request.includes('calculator') && request.includes('scientific')) {
      if (item.includes('calculator') && (item.includes('scientific') || item.includes('graphing'))) {
        score += 35;
        reasons.push('Scientific calculator type match');
      }
    }
    
    // Cooling devices
    if (request.includes('cooler') || request.includes('cooling')) {
      if (item.includes('cooler') || item.includes('ac') || item.includes('fan')) {
        score += 30;
        reasons.push('Cooling device category match');
      }
    }
    
    // Study materials
    if (request.includes('study') || request.includes('exam')) {
      if (item.includes('study') || item.includes('reference') || item.includes('exam')) {
        score += 20;
        reasons.push('Study material relevance');
      }
    }
    
    return score;
  }
  
  private static extractKeywords(text: string): string[] {
    // Remove common words and extract meaningful keywords
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word))
      .filter((word, index, arr) => arr.indexOf(word) === index); // Remove duplicates
  }
  
  private static normalizeTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  // Generate smart search suggestions based on request
  static generateSearchSuggestions(request: string): string[] {
    const suggestions: string[] = [];
    const requestLower = request.toLowerCase();
    
    // Extract main concepts and suggest related terms
    if (requestLower.includes('algorithm')) {
      suggestions.push('data structures', 'programming books', 'computer science', 'coding reference');
    }
    
    if (requestLower.includes('calculator')) {
      suggestions.push('scientific calculator', 'graphing calculator', 'mathematics tools', 'engineering calculator');
    }
    
    if (requestLower.includes('cool') || requestLower.includes('fan')) {
      suggestions.push('air cooler', 'table fan', 'room cooling', 'summer essentials');
    }
    
    if (requestLower.includes('study') || requestLower.includes('exam')) {
      suggestions.push('reference books', 'study materials', 'exam preparation', 'textbooks');
    }
    
    return suggestions;
  }
}
