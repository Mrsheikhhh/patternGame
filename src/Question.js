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
    category: "Hard",
  
   questions : [
      {
        level: "Hard",
        id: '1',
        question: "Arrange according to given constraints",
        inputs: ["A", "B", "C", "D", "E", "F","G","H"],
        constraints: [
          "A must sit next to B",
          "C cannot sit next to D",
          "E must sit between F and G",
          "H cannot sit next to A or B",

        ],
        output: ["A", "B", "E", "F", "G", "C", "D", "H"], // Example
        solution: ["A", "B", "E", "F", "G", "C", "D", "H"], // Example

        explanation: "This is a complex problem involving multiple constraints. We must account for the adjacency of A and B, C and D, and ensure that E and F are not adjacent."
      },
      {
        "level": "Medium",
        "id": "3",
        "question": "Arrange according to given constraints",
        "inputs": ["A", "B", "C", "D", "E", "F", "G", "H"],
        "constraints": [
          "A and B must sit together",
          "C must not be adjacent to D",
          "E must be in the last position",
          "F must be next to G"
        ],
        "output": ["A", "B", "F", "G", "D", "C", "H", "E"],
        "solution": ["A", "B", "F", "G", "D", "C", "H", "E"],
        "explanation": "We start by placing A and B together as required. Next, F must be next to G, so we place them together. Since C must not be adjacent to D, we ensure that they are separated by placing D before C. Finally, E must be in the last position. Arranging everything while following these rules gives us ['A', 'B', 'F', 'G', 'D', 'C', 'H', 'E']."
      },
      {
        "level": "Hard",
        "id": "3",
        "question": "Arrange according to given constraints",
        "inputs": ["A", "B", "C", "D", "E", "F", "G", "H"],
        "constraints": [
          "C and D must sit together",
          "A cannot be next to E",
          "B must be in the first position",
          "G must be in the last position"
        ],
        "output": ["B", "A", "C", "D", "F", "E", "H", "G"],
        "solution": ["B", "A", "C", "D", "F", "E", "H", "G"],
        "explanation": "We begin by placing B at the first position as required. C and D must be together, so we position them next to each other. A cannot be next to E, so we ensure a gap between them by placing F between D and E. Finally, G must be at the last position. This arrangement satisfies all constraints: ['B', 'A', 'C', 'D', 'F', 'E', 'H', 'G']."
      }
      
      
    ]
    
  },
  {
    category: "Group",
    questions: [
      
      {
        "level": "Medium",
        "id": 1,
        "question": "Divide 9 people (A, B, C, D, E, F, G, H, I) into 3 groups satisfying the constraints and decide their seating order in each group.",
        "inputs": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
        "constraints": [
          "A and B must be in the same group",
          "D should be in Group 2",
          "H should be in Group 3",
          "F and G cannot be in the same group",
          "C should not be in Group 1",
          "A must be seated before B in their group",
          "E must be the last in Group 1",
          "F must be seated before C in Group 2",
          "I must be seated before H in Group 3"
        ],
        "output": {
          "group1": ["A", "B", "E"],
          "group2": ["D", "F", "C"],
          "group3": ["I", "H", "G"]
        },
        "solution": {
          "group1": ["A", "B", "E"],
          "group2": ["D", "F", "C"],
          "group3": ["I", "H", "G"]
        },
        "explanation": "A is placed before B in Group 1, with E as the last. D is placed in Group 2, and F is seated before C. I is seated before H in Group 3, ensuring all constraints are met."
      },
      
      
      
      {
        "level": "Medium",
        "id": 3,
        "question": "Divide 9 people (A, B, C, D, E, F, G, H, I) into 3 groups satisfying the constraints and decide their seating order in each group.",
        "inputs": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
        "constraints": [
          "E and F must be in the same group",
          "B should be in Group 2",
          "C and D cannot be in the same group",
          "A should be in Group 1",
          "H should not be in Group 3",
          "A must be seated before G in Group 1",
          "E must be the first in Group 2",
          "D must be seated before H in Group 3",
          "B must be seated before F in Group 2"
        ],
        "output": {
          "group1": ["A", "G", "C"],
          "group2": ["E", "B", "F"],
          "group3": ["D", "H", "I"]
        },
        "solution": {
          "group1": ["A", "G", "C"],
          "group2": ["E", "B", "F"],
          "group3": ["D", "H", "I"]
        },
        "explanation": "A is placed before G in Group 1. E is the first in Group 2, and B is seated before F. D is seated before H in Group 3, ensuring all constraints are met."
      }
     
    ],
  },

    
   

  

  
];

export default levels;
