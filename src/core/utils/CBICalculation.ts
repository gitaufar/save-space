// utils/CBICalculation.ts

export interface CBIAnswers {
  [questionIndex: number]: number;
}

export interface CBIScores {
  personalBurnout: number;
  workBurnout: number;
  clientBurnout: number;
  summary: number;
}

export interface CBIInterpretation {
  personalLevel: string;
  workLevel: string;
  clientLevel: string;
  overallLevel: string;
}

/**
 * Copenhagen Burnout Inventory Calculation Utility
 * Based on: https://embrace-autism.com/copenhagen-burnout-inventory/
 */
export class CBICalculation {
  
  /**
   * Calculate CBI scores from answers
   * Questions 0-5: Personal Burnout (First set scoring)
   * Questions 6-12: Work-related Burnout (Mixed scoring)
   * Questions 13-18: Client-related Burnout (Mixed scoring)
   */
  static calculateScores(answers: CBIAnswers): CBIScores {
    const personalBurnout = this.calculatePersonalBurnout(answers);
    const workBurnout = this.calculateWorkBurnout(answers);
    const clientBurnout = this.calculateClientBurnout(answers);
    const summary = (personalBurnout + workBurnout + clientBurnout) / 3;

    return {
      personalBurnout: Math.round(personalBurnout),
      workBurnout: Math.round(workBurnout),
      clientBurnout: Math.round(clientBurnout),
      summary: Math.round(summary)
    };
  }

  /**
   * Personal Burnout Subscale (Questions 0-5)
   * Uses "First set" scoring: Always=100, Often=75, Sometimes=50, Seldom=25, Never=0
   */
  private static calculatePersonalBurnout(answers: CBIAnswers): number {
    const personalQuestions = [0, 1, 2, 3, 4, 5];
    const scores = personalQuestions.map(index => this.getFirstSetScore(answers[index]));
    return this.calculateAverage(scores);
  }

  /**
   * Work-related Burnout Subscale (Questions 6-12)
   * Q6-Q8: Second set scoring
   * Q9-Q11: First set scoring  
   * Q12: First set scoring (REVERSE scored)
   */
  private static calculateWorkBurnout(answers: CBIAnswers): number {
    const scores = [
      this.getSecondSetScore(answers[6]),  // Q7: "Apakah pekerjaan Anda terasa melelahkan secara emosional?"
      this.getFirstSetScore(answers[7]),   // Q8: "Apakah Anda merasa kelelahan karena pekerjaan Anda?"
      this.getFirstSetScore(answers[8]),   // Q9: "Apakah pekerjaan Anda membuat Anda frustrasi?"
      this.getSecondSetScore(answers[9]),  // Q10: "Apakah Anda merasa terkuras di akhir hari kerja?"
      this.getSecondSetScore(answers[10]), // Q11: "Apakah Anda merasa lelah di pagi hari saat memikirkan hari kerja berikutnya?"
      this.getSecondSetScore(answers[11]), // Q12: "Apakah setiap jam kerja terasa melelahkan bagi Anda?"
      this.getFirstSetScoreReverse(answers[12]) // Q13: "Apakah Anda masih memiliki cukup energi untuk keluarga dan teman di waktu luang?" (REVERSE)
    ];
    return this.calculateAverage(scores);
  }

  /**
   * Client-related Burnout Subscale (Questions 13-18)
   * Q13-Q16: Second set scoring
   * Q17-Q18: First set scoring
   */
  private static calculateClientBurnout(answers: CBIAnswers): number {
    const scores = [
      this.getSecondSetScore(answers[13]), // Q14: "Apakah Anda merasa sulit untuk bekerja dengan klien?"
      this.getSecondSetScore(answers[14]), // Q15: "Apakah bekerja dengan klien menguras energi Anda?"
      this.getSecondSetScore(answers[15]), // Q16: "Apakah Anda merasa frustrasi saat bekerja dengan klien?"
      this.getSecondSetScore(answers[16]), // Q17: "Apakah Anda merasa memberi lebih banyak daripada yang Anda terima saat bekerja dengan klien?"
      this.getFirstSetScore(answers[17]),  // Q18: "Apakah Anda merasa lelah bekerja dengan klien?"
      this.getFirstSetScore(answers[18])   // Q19: "Apakah Anda kadang bertanya-tanya berapa lama lagi Anda sanggup terus bekerja dengan klien?"
    ];
    return this.calculateAverage(scores);
  }

  /**
   * First set scoring: Always=100, Often=75, Sometimes=50, Seldom=25, Never=0
   */
  private static getFirstSetScore(answerValue: number): number {
    const scoreMap = {
      0: 100, // Selalu
      1: 75,  // Sering
      2: 50,  // Kadang-kadang
      3: 25,  // Jarang
      4: 0    // Tidak Pernah
    };
    return scoreMap[answerValue as keyof typeof scoreMap] ?? 0;
  }

  /**
   * Second set scoring: To a very high degree=100, To a high degree=75, Somewhat=50, To a low degree=25, To a very low degree=0
   */
  private static getSecondSetScore(answerValue: number): number {
    const scoreMap = {
      0: 100, // Sangat tinggi
      1: 75,  // Tinggi
      2: 50,  // Agak
      3: 25,  // Rendah
      4: 0    // Sangat rendah
    };
    return scoreMap[answerValue as keyof typeof scoreMap] ?? 0;
  }

  /**
   * First set scoring with reverse logic (for energy question)
   */
  private static getFirstSetScoreReverse(answerValue: number): number {
    const scoreMap = {
      0: 0,   // Selalu (punya energi) = rendah burnout
      1: 25,  // Sering 
      2: 50,  // Kadang-kadang
      3: 75,  // Jarang (tidak punya energi) = tinggi burnout
      4: 100  // Tidak Pernah
    };
    return scoreMap[answerValue as keyof typeof scoreMap] ?? 0;
  }

  /**
   * Calculate average of scores array
   */
  private static calculateAverage(scores: number[]): number {
    const validScores = scores.filter(score => score !== undefined && score !== null);
    if (validScores.length === 0) return 0;
    
    const sum = validScores.reduce((acc, score) => acc + score, 0);
    return sum / validScores.length;
  }

  /**
   * Get interpretation based on CBI scores
   */
  static getInterpretation(scores: CBIScores): CBIInterpretation {
    return {
      personalLevel: this.interpretScore(scores.personalBurnout),
      workLevel: this.interpretScore(scores.workBurnout),
      clientLevel: this.interpretScore(scores.clientBurnout),
      overallLevel: this.interpretScore(scores.summary)
    };
  }

  /**
   * Interpret individual score based on CBI thresholds
   */
  private static interpretScore(score: number): string {
    if (score >= 100) return 'Burnout Parah';
    if (score >= 75) return 'Burnout Tinggi';
    if (score >= 50) return 'Burnout Sedang';
    return 'Normal';
  }

  /**
   * Validate that all required questions are answered
   */
  static validateAnswers(answers: CBIAnswers): { isValid: boolean; missingQuestions: number[] } {
    const requiredQuestions = Array.from({ length: 19 }, (_, i) => i);
    const missingQuestions = requiredQuestions.filter(q => answers[q] === undefined || answers[q] === null);
    
    return {
      isValid: missingQuestions.length === 0,
      missingQuestions
    };
  }
}