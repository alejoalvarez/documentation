/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  // ===== AI ENGINEER SIDEBAR =====
  engineerSidebar: [
    {
      type: 'doc',
      id: 'ai-engineer/index',
      label: '🤖 Introduction',
    },
    {
      type: 'category',
      label: 'Phase 1 — Fundamentals',
      collapsed: true,
      items: [
        'ai-engineer/python-avanzado',
        'ai-engineer/matematicas-ml',
        'ai-engineer/data-engineering',
        'ai-engineer/software-engineering',
      ],
    },
    {
      type: 'category',
      label: 'Phase 2 — Machine Learning',
      collapsed: true,
      items: [
        'ai-engineer/ml-clasico',
        'ai-engineer/deep-learning',
        'ai-engineer/evaluacion-metricas',
        'ai-engineer/feature-engineering',
      ],
    },
    {
      type: 'category',
      label: 'Phase 3 — LLMs & GenAI',
      collapsed: true,
      items: [
        'ai-engineer/llms-transformers',
        'ai-engineer/rag-embeddings',
        'ai-engineer/prompt-engineering',
        'ai-engineer/ai-agents',
        'ai-engineer/fine-tuning-peft',
        'ai-engineer/multimodal-ai',
      ],
    },
    {
      type: 'category',
      label: 'Phase 4 — MLOps',
      collapsed: true,
      items: [
        'ai-engineer/model-serving',
        'ai-engineer/ml-pipelines',
        'ai-engineer/monitoring',
        'ai-engineer/cloud-containers',
      ],
    },
    {
      type: 'category',
      label: 'Phase 5 — Specialization',
      collapsed: true,
      items: [
        'ai-engineer/ai-safety',
        'ai-engineer/llm-evaluation',
      ],
    },
  ],

  // ===== AI ARCHITECT SIDEBAR =====
  architectSidebar: [
    {
      type: 'doc',
      id: 'ai-architect/index',
      label: '🏗️ Introduction',
    },
    {
      type: 'category',
      label: 'Architecture Fundamentals',
      collapsed: true,
      items: [
        'ai-architect/clean-architecture',
        'ai-architect/arquitectura-software',
        'ai-architect/cloud-architecture',
        'ai-architect/sistemas-distribuidos',
        'ai-architect/security-architecture',
      ],
    },
    {
      type: 'category',
      label: 'Phase 2 — AI/ML for Architects',
      collapsed: true,
      items: [
        'ai-architect/comprension-modelos',
        'ai-architect/data-architecture',
        'ai-architect/mlops-platform',
      ],
    },
    {
      type: 'category',
      label: 'Phase 3 — LLM Systems',
      collapsed: true,
      items: [
        'ai-architect/rag-architecture',
        'ai-architect/multi-agent-systems',
        'ai-architect/llm-gateway',
        'ai-architect/vector-databases',
        'ai-architect/model-selection',
        'ai-architect/streaming-architectures',
      ],
    },
    {
      type: 'category',
      label: 'Phase 4 — GPU Infrastructure',
      collapsed: true,
      items: [
        'ai-architect/gpu-infrastructure',
        'ai-architect/inference-optimization',
        'ai-architect/scalability-design',
      ],
    },
    {
      type: 'category',
      label: 'Phase 5 — Governance & Leadership',
      collapsed: true,
      items: [
        'ai-architect/ai-governance',
        'ai-architect/ai-security',
        'ai-architect/finops-ai',
        'ai-architect/technical-leadership',
      ],
    },
  ],

  // ===== SOFTWARE ARCHITECTURE SIDEBAR =====
  softwareArchitectureSidebar: [
    {
      type: 'doc',
      id: 'software-architecture/index',
      label: '🧱 Introduction',
    },
    {
      type: 'category',
      label: 'Phase 1 — Foundations',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Paradigms and fundamental principles',
          collapsed: true,
          items: [
            'software-architecture/paradigms-and-fundamental-principles/object-oriented-programming-oop',
            'software-architecture/paradigms-and-fundamental-principles/functional-programming',
            'software-architecture/paradigms-and-fundamental-principles/reactive-programming',
            'software-architecture/paradigms-and-fundamental-principles/hybrid-paradigms',
          ],
        },
        {
          type: 'category',
          label: 'Data Structures',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'software-architecture/data-structures/index',
          },
          items: [
            {
              type: 'category',
              label: 'linear',
              collapsed: true,
              items: [
                'software-architecture/data-structures/linear/array',
                'software-architecture/data-structures/linear/array-list',
                'software-architecture/data-structures/linear/linked-list',
                'software-architecture/data-structures/linear/stack',
                'software-architecture/data-structures/linear/queue',
                'software-architecture/data-structures/linear/deque',
              ],
            },
            {
              type: 'category',
              label: 'non-linear',
              collapsed: true,
              items: [
                'software-architecture/data-structures/non-linear/binary-tree',
                'software-architecture/data-structures/non-linear/binary-search-tree',
                'software-architecture/data-structures/non-linear/AVL-tree',
                'software-architecture/data-structures/non-linear/red-black-trees',
                'software-architecture/data-structures/non-linear/b-trees',
                'software-architecture/data-structures/non-linear/tries',
                'software-architecture/data-structures/non-linear/heaps',
                'software-architecture/data-structures/non-linear/graph-adjacency-list',
                'software-architecture/data-structures/non-linear/graph-adjacency-matrix',
                'software-architecture/data-structures/non-linear/graph-traversal-bfs-dfs',
                'software-architecture/data-structures/non-linear/graph-dijkstra',
                'software-architecture/data-structures/non-linear/graph-bellman-ford',
                'software-architecture/data-structures/non-linear/graph-kruskal',
                'software-architecture/data-structures/non-linear/graph-prim',
                'software-architecture/data-structures/non-linear/graph-topological-sort',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'algorithms',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'software-architecture/algorithms/index',
          },
          items: [
            {
              type: 'category',
              label: 'sorting',
              collapsed: true,
              items: [
                'software-architecture/algorithms/sorting/bubble-sort',
                // 'software-architecture/algorithms/sorting/selection-sort',
                // 'software-architecture/algorithms/sorting/insertion-sort',
                // 'software-architecture/algorithms/sorting/merge-sort',
                // 'software-architecture/algorithms/sorting/quick-sort',
                // 'software-architecture/algorithms/sorting/heap-sort',
                // 'software-architecture/algorithms/sorting/radix-sort',
                // 'software-architecture/algorithms/sorting/counting-sort',
                // 'software-architecture/algorithms/sorting/bucket-sort',
              ],
            },
            // {
            //   type: 'category',
            //   label: 'searching',
            //   collapsed: true,
            //   items: [
            //     // 'software-architecture/algorithms/searching/linear-search',
            //     // 'software-architecture/algorithms/searching/binary-search',
            //     // 'software-architecture/algorithms/searching/jump-search',
            //     // 'software-architecture/algorithms/searching/interpolation-search',
            //     // 'software-architecture/algorithms/searching/exponential-search',
            //     // 'software-architecture/algorithms/searching/ternary-search',
            //     // 'software-architecture/algorithms/searching/fibonacci-search',
            //     // 'software-architecture/algorithms/searching/hash-search',
            //   ],
            // },
          ],
        },
        'software-architecture/system-design-principles',
        'software-architecture/architectural-patterns',
      ],
    },
    {
      type: 'category',
      label: 'Phase 2 — Modeling & Boundaries',
      collapsed: true,
      items: [
        'software-architecture/domain-driven-design',
        'software-architecture/api-integration',
      ],
    },
    {
      type: 'category',
      label: 'Phase 3 — Data & Scale',
      collapsed: true,
      items: [
        'software-architecture/data-consistency',
        'software-architecture/scalability-reliability',
      ],
    },
    {
      type: 'category',
      label: 'Phase 4 — Security & Operations',
      collapsed: true,
      items: [
        'software-architecture/security-resilience',
        'software-architecture/delivery-governance',
        'software-architecture/references',
      ],
    },
  ],

  // ===== REFERENCES SIDEBAR =====
  referencesSidebar: [
    {
      type: 'category',
      label: '📚 References',
      collapsed: true,
      items: [
        'referencias/tools-stack',
        'referencias/fuentes',
      ],
    },
  ],
  references2Sidebar: [
    {
      type: 'category',
      label: '📚 Projects',
      collapsed: true,
      items: [
        'referencias2/tools-stack2',
        'referencias2/fuentes2',
      ],
    },
  ],
};

module.exports = sidebars;
