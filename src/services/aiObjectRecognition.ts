
// AI Object Recognition and Name Suggestion Service
export interface ObjectRecognitionResult {
  primaryName: string;
  commonNames: string[];
  category: string;
  confidence: number;
  studentContext: string[];
}

export class AIObjectRecognition {
  // Object name suggestions for common dorm items
  static suggestNames(objectDescription: string): ObjectRecognitionResult {
    const description = objectDescription.toLowerCase();
    
    // Cooling devices
    if (description.includes('fan') && (description.includes('water') || description.includes('cool'))) {
      return {
        primaryName: 'Personal Air Cooler',
        commonNames: ['Desert Cooler', 'Room Cooler', 'Water Cooler'],
        category: 'cooling',
        confidence: 92,
        studentContext: ['Summer essential', 'Dorm room comfort', 'Energy efficient']
      };
    }
    
    if (description.includes('fan') && !description.includes('water')) {
      return {
        primaryName: 'Table Fan',
        commonNames: ['Desk Fan', 'Personal Fan', 'Study Fan'],
        category: 'cooling',
        confidence: 88,
        studentContext: ['Study companion', 'Portable cooling', 'Low power consumption']
      };
    }
    
    // Electronic devices
    if (description.includes('calculator') && description.includes('scientific')) {
      return {
        primaryName: 'Scientific Calculator',
        commonNames: ['Graphing Calculator', 'Engineering Calculator', 'Advanced Calculator'],
        category: 'electronics',
        confidence: 95,
        studentContext: ['Exam essential', 'Mathematics tool', 'Engineering must-have']
      };
    }
    
    // Books
    if (description.includes('book') && description.includes('algorithm')) {
      return {
        primaryName: 'Algorithms Textbook',
        commonNames: ['CLRS Book', 'Data Structures Book', 'Programming Guide'],
        category: 'books',
        confidence: 90,
        studentContext: ['CS essential', 'Exam preparation', 'Reference material']
      };
    }
    
    // Furniture
    if (description.includes('chair') && (description.includes('study') || description.includes('ergonomic'))) {
      return {
        primaryName: 'Study Chair',
        commonNames: ['Ergonomic Chair', 'Office Chair', 'Desk Chair'],
        category: 'furniture',
        confidence: 87,
        studentContext: ['Comfort essential', 'Long study sessions', 'Back support']
      };
    }
    
    // Default fallback
    return {
      primaryName: 'Unknown Item',
      commonNames: ['General Item', 'Student Essential', 'Dorm Item'],
      category: 'general',
      confidence: 60,
      studentContext: ['Student utility', 'Campus essential', 'Rental item']
    };
  }
  
  // Enhanced object recognition with Indian context
  static recognizeIndianStudentItem(imageDescription: string): ObjectRecognitionResult {
    const desc = imageDescription.toLowerCase();
    
    // Indian specific items
    const indianItems = [
      {
        keywords: ['bajaj', 'air cooler', 'desert cooler'],
        result: {
          primaryName: 'Bajaj Air Cooler',
          commonNames: ['Desert Cooler', 'Room Cooler', 'Personal Cooler'],
          category: 'cooling',
          confidence: 94,
          studentContext: ['Summer survival', 'Indian brand', 'Hostel friendly']
        }
      },
      {
        keywords: ['induction', 'cooktop', 'cooking'],
        result: {
          primaryName: 'Induction Cooktop',
          commonNames: ['Induction Stove', 'Electric Cooktop', 'Portable Stove'],
          category: 'kitchen',
          confidence: 91,
          studentContext: ['Hostel cooking', 'Mess alternative', 'Quick meals']
        }
      },
      {
        keywords: ['mattress', 'foam', 'sleeping'],
        result: {
          primaryName: 'Foam Mattress',
          commonNames: ['Single Mattress', 'Hostel Mattress', 'Sleeping Mat'],
          category: 'furniture',
          confidence: 89,
          studentContext: ['Comfort upgrade', 'Hostel essential', 'Better sleep']
        }
      }
    ];
    
    for (const item of indianItems) {
      if (item.keywords.some(keyword => desc.includes(keyword))) {
        return item.result;
      }
    }
    
    return this.suggestNames(imageDescription);
  }
}
