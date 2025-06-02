
// AI Listing Assistant for Price Suggestions and Descriptions
export interface PricingFactors {
  itemCondition: 'new' | 'excellent' | 'good' | 'fair' | 'poor';
  brandValue: 'premium' | 'mid-range' | 'budget';
  campusLocation: string;
  demandLevel: 'high' | 'medium' | 'low';
  seasonality: 'peak' | 'normal' | 'off-peak';
  itemAge: number; // in years
}

export interface PriceSuggestion {
  suggestedPrice: number;
  priceRange: { min: number; max: number };
  reasoning: string[];
  marketComparison: string;
}

export class AIListingAssistant {
  // Price suggestion logic for Indian college market
  static suggestPrice(itemName: string, factors: PricingFactors): PriceSuggestion {
    const baseRates = this.getBasePriceRates(itemName);
    let adjustedPrice = baseRates.base;
    const reasoning: string[] = [];
    
    // Condition adjustment
    const conditionMultipliers = {
      'new': 1.0,
      'excellent': 0.85,
      'good': 0.70,
      'fair': 0.55,
      'poor': 0.40
    };
    adjustedPrice *= conditionMultipliers[factors.itemCondition];
    reasoning.push(`Condition (${factors.itemCondition}): ${Math.round(conditionMultipliers[factors.itemCondition] * 100)}% of base rate`);
    
    // Brand value adjustment
    const brandMultipliers = {
      'premium': 1.3,
      'mid-range': 1.0,
      'budget': 0.8
    };
    adjustedPrice *= brandMultipliers[factors.brandValue];
    reasoning.push(`Brand value (${factors.brandValue}): ${Math.round(brandMultipliers[factors.brandValue] * 100)}% adjustment`);
    
    // Demand adjustment
    const demandMultipliers = {
      'high': 1.2,
      'medium': 1.0,
      'low': 0.85
    };
    adjustedPrice *= demandMultipliers[factors.demandLevel];
    reasoning.push(`Market demand (${factors.demandLevel}): ${Math.round(demandMultipliers[factors.demandLevel] * 100)}% adjustment`);
    
    // Seasonality adjustment
    const seasonMultipliers = {
      'peak': 1.25,
      'normal': 1.0,
      'off-peak': 0.8
    };
    adjustedPrice *= seasonMultipliers[factors.seasonality];
    reasoning.push(`Seasonal demand (${factors.seasonality}): ${Math.round(seasonMultipliers[factors.seasonality] * 100)}% adjustment`);
    
    // Age depreciation
    const ageDepreciation = Math.max(0.6, 1 - (factors.itemAge * 0.1));
    adjustedPrice *= ageDepreciation;
    reasoning.push(`Age depreciation (${factors.itemAge} years): ${Math.round(ageDepreciation * 100)}% value retention`);
    
    const finalPrice = Math.round(adjustedPrice);
    const priceRange = {
      min: Math.round(finalPrice * 0.8),
      max: Math.round(finalPrice * 1.2)
    };
    
    return {
      suggestedPrice: finalPrice,
      priceRange,
      reasoning,
      marketComparison: `Similar items in ${factors.campusLocation} rent for ₹${priceRange.min}-${priceRange.max}/day`
    };
  }
  
  // Generate appealing descriptions for listings
  static generateDescription(itemName: string, condition: string, features: string[], targetBenefit: string): string {
    const templates = this.getDescriptionTemplates(itemName);
    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    let description = selectedTemplate
      .replace('{condition}', condition)
      .replace('{targetBenefit}', targetBenefit);
    
    // Add features
    if (features.length > 0) {
      description += `\n\n✨ Key Features:\n${features.map(f => `• ${f}`).join('\n')}`;
    }
    
    // Add student-specific benefits
    description += '\n\n🎓 Perfect for students who value convenience and affordability!';
    description += '\n💡 Rent smart, save money, help the environment!';
    
    return description;
  }
  
  private static getBasePriceRates(itemName: string): { base: number; category: string } {
    const itemLower = itemName.toLowerCase();
    
    // Electronics
    if (itemLower.includes('laptop') || itemLower.includes('computer')) return { base: 800, category: 'electronics' };
    if (itemLower.includes('phone') || itemLower.includes('mobile')) return { base: 300, category: 'electronics' };
    if (itemLower.includes('calculator')) return { base: 50, category: 'electronics' };
    if (itemLower.includes('camera')) return { base: 600, category: 'electronics' };
    
    // Cooling devices
    if (itemLower.includes('cooler') || itemLower.includes('ac')) return { base: 200, category: 'cooling' };
    if (itemLower.includes('fan')) return { base: 80, category: 'cooling' };
    
    // Books
    if (itemLower.includes('book') || itemLower.includes('textbook')) return { base: 60, category: 'books' };
    
    // Furniture
    if (itemLower.includes('chair') || itemLower.includes('table')) return { base: 150, category: 'furniture' };
    if (itemLower.includes('mattress') || itemLower.includes('bed')) return { base: 120, category: 'furniture' };
    
    // Kitchen
    if (itemLower.includes('induction') || itemLower.includes('cooktop')) return { base: 100, category: 'kitchen' };
    
    return { base: 100, category: 'general' };
  }
  
  private static getDescriptionTemplates(itemName: string): string[] {
    const itemLower = itemName.toLowerCase();
    
    if (itemLower.includes('cooler')) {
      return [
        'Beat the heat with this reliable {condition} air cooler! {targetBenefit} Compact design perfect for dorm rooms.',
        'Stay cool and comfortable during those intense study sessions! This {condition} cooler offers excellent cooling performance.',
        'Perfect cooling solution for students! This {condition} air cooler is energy-efficient and hostel-friendly.'
      ];
    }
    
    if (itemLower.includes('book') || itemLower.includes('textbook')) {
      return [
        'Get ahead in your studies with this {condition} textbook! {targetBenefit} All important topics covered clearly.',
        'Essential reading material in {condition} condition. {targetBenefit} Perfect for exam preparation.',
        'Comprehensive study resource in {condition} state. {targetBenefit} Make your learning journey easier!'
      ];
    }
    
    if (itemLower.includes('calculator')) {
      return [
        'Ace your calculations with this {condition} scientific calculator! {targetBenefit} All functions working perfectly.',
        'Essential tool for engineering and math students! This {condition} calculator will be your study companion.',
        'Reliable calculation partner in {condition} condition. {targetBenefit} Perfect for exams and assignments.'
      ];
    }
    
    // Default templates
    return [
      'Quality {condition} item perfect for student needs! {targetBenefit} Great value for money.',
      'Excellent {condition} condition item ready for use! {targetBenefit} Ideal for busy students.',
      'Reliable and well-maintained {condition} item! {targetBenefit} Perfect addition to your dorm setup.'
    ];
  }
}
