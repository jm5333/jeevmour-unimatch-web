/**
 * FICTIONAL demo profiles. None of these people exist.
 * They are used only by the clearly labelled product demo and are never
 * mixed with real user data.
 */
export type Mode = "dating" | "friendship" | "mentorship";

export const modes: { id: Mode; label: string; blurb: string }[] = [
  { id: "dating", label: "Dating", blurb: "Romantic connections with students at your school." },
  { id: "friendship", label: "Friendship", blurb: "People who share your interests and your schedule." },
  { id: "mentorship", label: "Mentorship", blurb: "Guidance from students a few steps ahead of you." },
];

export type DemoProfile = {
  id: string;
  mode: Mode;
  name: string;
  age: number;
  program: string;
  /** Background tone for the illustrated demo photo */
  tone: "coral" | "lavender" | "ivory" | "plum";
  interests: string[];
  prompts: { q: string; a: string }[];
  /**
   * Optional, self-written. Disclosure is always voluntary in UniMatch;
   * these show what it can look like when someone chooses to share.
   */
  sharedByThem?: string;
  /** Whether this fictional person "likes back" in the demo. */
  likesBack: boolean;
};

export const demoUniversity = "Demo University";

export const demoProfiles: DemoProfile[] = [
  // Dating
  {
    id: "maya",
    mode: "dating",
    name: "Maya",
    age: 21,
    program: "Product Design, junior",
    tone: "coral",
    interests: ["Film photography", "Climbing gym", "Bubble tea"],
    prompts: [
      { q: "My ideal study date", a: "Library window seat, one shared playlist, snack breaks every 45 minutes." },
      { q: "I'm looking for", a: "Someone who makes plans and actually keeps them." },
    ],
    likesBack: false,
  },
  {
    id: "andre",
    mode: "dating",
    name: "Andre",
    age: 22,
    program: "Mechanical Engineering, senior",
    tone: "lavender",
    interests: ["Adaptive basketball", "Jazz records", "Cooking for friends"],
    prompts: [
      { q: "A perfect first date", a: "Ramen, then a long argument about the best album of all time." },
      { q: "You should know", a: "I'm competitive at board games and very gracious when I win." },
    ],
    sharedByThem: "I use a wheelchair. Happy to answer questions, and I already know the accessible places to eat.",
    likesBack: true,
  },
  {
    id: "leah",
    mode: "dating",
    name: "Leah",
    age: 20,
    program: "Psychology, sophomore",
    tone: "ivory",
    interests: ["ASL poetry", "Thrift runs", "Horror movies"],
    prompts: [
      { q: "Let's", a: "Catch a captioned late-night horror movie and judge every bad decision." },
      { q: "Green flag", a: "You're curious and you ask instead of assuming." },
    ],
    sharedByThem: "I'm Deaf. ASL is my first language and texting works great.",
    likesBack: true,
  },
  {
    id: "sam",
    mode: "dating",
    name: "Sam",
    age: 23,
    program: "Computer Science, grad student",
    tone: "plum",
    interests: ["Indie games", "Run club", "Sunday markets"],
    prompts: [
      { q: "Two truths and a lie", a: "I've run a half marathon, I've never had coffee, I own 40 plants." },
      { q: "Best way to ask me out", a: "Send me a song and tell me why." },
    ],
    likesBack: false,
  },
  // Friendship
  {
    id: "jordan",
    mode: "friendship",
    name: "Jordan",
    age: 19,
    program: "Business, first year",
    tone: "lavender",
    interests: ["Lifting", "Board games", "New to the city"],
    prompts: [
      { q: "Looking for", a: "A gym buddy who won't let me skip leg day." },
      { q: "Ask me about", a: "The board game café I'm trying to visit every weekend." },
    ],
    likesBack: true,
  },
  {
    id: "priya",
    mode: "friendship",
    name: "Priya",
    age: 21,
    program: "Nursing, junior",
    tone: "coral",
    interests: ["Baking", "K-dramas", "Pickleball"],
    prompts: [
      { q: "My kind of hangout", a: "I bake, you bring the show, we pretend we'll study after." },
      { q: "I'm hoping to find", a: "A small crew for weekend plans that aren't parties." },
    ],
    likesBack: true,
  },
  {
    id: "theo",
    mode: "friendship",
    name: "Theo",
    age: 20,
    program: "Music Industry, sophomore",
    tone: "ivory",
    interests: ["Guitar", "Open mics", "Late-night diners"],
    prompts: [
      { q: "Let's", a: "Start a band that only plays one show." },
      { q: "Quietly proud of", a: "Learning to cook one really good pasta." },
    ],
    likesBack: false,
  },
  // Mentorship
  {
    id: "nadia",
    mode: "mentorship",
    name: "Nadia",
    age: 24,
    program: "MS Data Science",
    tone: "plum",
    interests: ["Co-op and internships", "Resume reviews", "Grad school applications"],
    prompts: [
      { q: "I can help with", a: "Landing your first co-op and not burning out during it." },
      { q: "Best time to reach me", a: "Weekday evenings. I answer every message within a few days." },
    ],
    likesBack: true,
  },
  {
    id: "marcus",
    mode: "mentorship",
    name: "Marcus",
    age: 22,
    program: "Civil Engineering, senior",
    tone: "lavender",
    interests: ["Undergraduate research", "First-gen students", "Study systems"],
    prompts: [
      { q: "Ask me about", a: "Getting into a research lab before your junior year." },
      { q: "Something I wish I knew sooner", a: "Office hours are for everyone, not only people who are struggling." },
    ],
    likesBack: true,
  },
];

export const icebreakers: Record<Mode, string[]> = {
  dating: [
    "What's the most underrated spot on campus for a first date?",
    "You get one class to drop with zero consequences. Which one?",
    "Rate your study playlist honestly, 1 to 10.",
  ],
  friendship: [
    "What's your go-to order when you need a break from studying?",
    "Weekend plan: museum, park, or doing absolutely nothing?",
    "Which club have you been meaning to try?",
  ],
  mentorship: [
    "What do you wish someone told you in your first year?",
    "How did you find your first internship or co-op?",
    "What's one class you'd recommend outside your major?",
  ],
};
