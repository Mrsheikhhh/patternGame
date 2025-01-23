const levels = [
  {
    category: "Easy",
    questions: [
      {
        level: "Easy",
        id:1,
        question: "In how many ways can 4 people sit around a round table?",
        constraints: [],
        options: ["6 ways", "24 ways", "120 ways", "12 ways"],
        output: "6 ways",
        solution: "Factorial formula for circular arrangements: (n-1)!",
        explanation: "For circular arrangements, we fix one person in a position and arrange the others. So, the number of arrangements is (n-1)!."
      },
      {
        level: "Easy",
        id:2,
        question: "In how many ways can 5 people sit around a round table?",
        constraints: [],
        options: ["24 ways", "120 ways", "720 ways", "6 ways"],
        output: "24 ways",
        solution: "Factorial formula for circular arrangements: (n-1)!",
        explanation: "For 5 people sitting around a round table, the formula for circular arrangements is (5-1)! = 4! = 24."
      },
      {
        level: "Easy",
        id:3,
        question: "In how many ways can 6 people be arranged such that there is no restriction?",
        constraints: [],
        options: ["720 ways", "120 ways", "6 ways", "24 ways"],
        output: "720 ways",
        solution: "Straight factorial: n!",
        explanation: "For unrestricted arrangements, the total number of permutations is simply 6! = 720."
      },
      {
        level: "Easy",
        question: "How many permutations are there of the word 'APPLE'?",
        constraints: [],
        id:4,
        options: ["60", "120", "240", "30"],
        output: "60",
        solution: "Divide total permutations by the factorial of repeated letters: 5!/2!",
        explanation: "The total number of permutations is 5! = 120, but we need to divide by the factorial of repeated letters (2! for two 'P's), giving 5!/2! = 60."
      },
      {
        level: "Easy",
        id:5,
        question: "In how many ways can 3 people be arranged in a row?",
        constraints: [],
        options: ["6 ways", "3 ways", "9 ways", "12 ways"],
        output: "6 ways",
        solution: "Simple factorial: 3!",
        explanation: "The number of ways to arrange 3 people in a row is 3!, which equals 6."
      },
    ],
  },
  {
    category: "Medium",
    questions: [
      {
        level: "Medium",
        question: "In how many ways can 4 people be arranged around a round table such that A always sits next to B?",
        constraints: ["A next to B"],
        options: ["12 ways", "24 ways", "6 ways", "120 ways"],
        output: "12 ways",
        solution: "Treat A and B as a single block, so total permutations = 3! * 2!",
        explanation: "Treat A and B as a single block, reducing the problem to arranging 3 units (A+B block and 2 other people). Then, A and B can be arranged in 2 ways within the block, leading to a total of 3! * 2! = 12."
      },
      {
        level: "Medium",
        question: "In how many ways can 5 people be seated such that A is always at the head of the table?",
        constraints: ["A at head of table"],
        options: ["24 ways", "120 ways", "12 ways", "720 ways"],
        output: "24 ways",
        solution: "Fix A in one position and arrange the rest: (n-1)!",
        explanation: "Since A is fixed at the head of the table, we only need to arrange the remaining 4 people, which is (4!) = 24 ways."
      },
      {
        level: "Medium",
        question: "In how many ways can 6 people be seated if B and C cannot sit next to each other?",
        constraints: ["B not next to C"],
        options: ["480 ways", "600 ways", "720 ways", "360 ways"],
        output: "480 ways",
        solution: "Find total arrangements (5!) and subtract invalid ones.",
        explanation: "First, calculate the total number of arrangements for 6 people, which is 6!. Then, subtract the invalid cases where B and C are seated together (treat B and C as a block). This gives us 6! - 5! = 480 ways."
      },
      {
        level: "Medium",
        question: "How many permutations of 'BANANA' exist where no two A's are adjacent?",
        constraints: ["No adjacent A's"],
        options: ["Dynamic", "720 ways", "60 ways", "120 ways"],
        output: "Dynamic",
        solution: "Use gap filling between other letters to space A's correctly.",
        explanation: "To ensure no two A's are adjacent, we can first arrange the remaining letters (B, N, N, A) and then place the A's in the gaps between these letters."
      },
      {
        level: "Medium",
        question: "How many ways can a group of 6 people be split into two teams of 3?",
        constraints: ["Teams of equal size"],
        options: ["20 ways", "15 ways", "30 ways", "10 ways"],
        output: "20 ways",
        solution: "Use combinations: C(6,3)/2!",
        explanation: "The number of ways to split 6 people into two teams of 3 is given by the combination C(6, 3). However, we divide by 2! to account for the fact that the teams are unordered."
      },
    ],
  },
  {
    category: "Hard",
  
   questions : [
      {
        level: "Hard",
        id: '1',
        question: "Arrange A, B, C, D, E, F such that A sits next to B, C sits next to D, and E is not next to F.",
        inputs: ["A", "B", "C", "D", "E", "F","G","H"],
        constraints: [
          "A next to B",
          "C next to D",
          "E not next to F",
        ],
        output: ["A", "B", "C", "D", "E", "F","G","H"], // Example: One valid solution, can be dynamic
        solution: ["A", "B", "C", "D", "E", "F","G","H"], // Same as output for validation
        explanation: "This is a complex problem involving multiple constraints. We must account for the adjacency of A and B, C and D, and ensure that E and F are not adjacent."
      },
      {
        level: "Hard",
        id: '2',
        question: "Arrange A, B, C, D, E, F, G such that A sits next to B and C, D is opposite F, and G is not next to E.",
        inputs: ["A", "B", "C", "D", "E", "F", "G"],
        constraints: [
          "A next to B",
          "A next to C",
          "D opposite F",
          "G not next to E",
        ],
        output: ["A", "B", "C", "G", "E", "F", "D"], // Example: One valid solution, can be dynamic
        solution: ["A", "B", "C", "G", "E", "F", "D"], // Same as output for validation
        explanation: "This problem requires satisfying multiple conditions, such as A being adjacent to both B and C, D being opposite F, and G not being adjacent to E. A dynamic approach is needed to find the correct arrangement."
      },
    ]
    
  },
 {
      category: "Group",
      questions: [
        {
          level: "Medium",
          id: 1,
          question: "Divide 9 people (A, B, C, D, E, F, G, H, I) into 3 groups such that A and B are in the same group, and C and D are not in the same group.",
          inputs: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
          constraints: [
            "A and B in the same group",
            "C and D not in the same group",
          ],
          options: ["Dynamic"], // Options are dynamic because this is a grouping question
          output: {
            group1: ["A", "B", "E"],
            group2: ["C", "F", "G"],
            group3: ["D", "H", "I"],
          },
          solution: {
            group1: ["A", "B", "E"],
            group2: ["C", "F", "G"],
            group3: ["D", "H", "I"],
          },
          explanation: "A and B must be in the same group, so we place them together in Group 1. To satisfy the condition that C and D are not in the same group, we place C in Group 2 and D in Group 3. The remaining people are distributed to balance the groups.",
        },
        {
          level: "Hard",
          id: 2,
          question: "Divide 9 people (A, B, C, D, E, F, G, H, I) into 3 groups such that E is in a different group from both F and G, and H and I must be in the same group.",
          inputs: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
          constraints: [
            "E not in the same group as F and G",
            "H and I in the same group",
          ],
          options: ["Dynamic"],
          output: {
            group1: ["E", "A", "B"],
            group2: ["F", "G", "C"],
            group3: ["H", "I", "D"],
          },
          solution: {
            group1: ["E", "A", "B"],
            group2: ["F", "G", "C"],
            group3: ["H", "I", "D"],
          },
          explanation: "E must be in a group separate from both F and G, so we place E in Group 1 and F and G in Group 2. H and I must be in the same group, so we place them together in Group 3. The remaining people are distributed to balance the groups.",
        },
        {
          level: "Hard",
          id: 3,
          question: "Divide 9 people (A, B, C, D, E, F, G, H, I) into 3 groups such that A, B, and C are all in different groups, and D and E must be together.",
          inputs: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
          constraints: [
            "A, B, C in different groups",
            "D and E in the same group",
          ],
          options: ["Dynamic"],
          output: {
            group1: ["A", "D", "E"],
            group2: ["B", "F", "G"],
            group3: ["C", "H", "I"],
          },
          solution: {
            group1: ["A", "D", "E"],
            group2: ["B", "F", "G"],
            group3: ["C", "H", "I"],
          },
          explanation: "A, B, and C must be in different groups, so we place them in Groups 1, 2, and 3, respectively. D and E must be in the same group, so we place them together in Group 1. The remaining people are distributed to balance the groups.",
        },
      ],
    }
   

  

  
];

export default levels;
