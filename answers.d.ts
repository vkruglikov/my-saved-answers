export type Answer = {
  id: string;
  type: 'article' | 'photo';
  /**
   * The text that will be inserted in the inline mode query.
   * If not set, it will be generated from the answer ID
   */
  inlineQuery?: string;
  thumb?: string;
  /**
   * Hidden from WebApp
   */
  hidden?: boolean;
  title: string;
  tags: string[];
  description?: string;
  message: {
    /**
     * photoUrl use to for `photo` type
     */
    photoUrl?: string;
    /**
     * photoUrl use to for `article` type
     */
    text?: string;
  };
};

export type Answers = Answer[];

export declare const answers: Answers;

/**
 * Filtered answers based on “hidden” details are stored here
 */
export declare const visibleAnswers: Answers;
