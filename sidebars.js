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
      label: 'Foundations',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Paradigms and fundamental principles',
          link: {
            type: 'doc',
            id: 'software-architecture/foundations/paradigms-and-fundamental-principles/index',
          },
          collapsed: true,
          items: [
            'software-architecture/foundations/paradigms-and-fundamental-principles/object-oriented-programming-oop',
            'software-architecture/foundations/paradigms-and-fundamental-principles/functional-programming',
            'software-architecture/foundations/paradigms-and-fundamental-principles/reactive-programming',
            'software-architecture/foundations/paradigms-and-fundamental-principles/hybrid-paradigms',
          ],
        },
        {
          type: 'category',
          label: 'Data Structures',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'software-architecture/foundations/data-structures/index',
          },
          items: [
            {
              type: 'category',
              label: 'linear',
              link: {
                type: 'doc',
                id: 'software-architecture/foundations/data-structures/linear/index',
              },
              collapsed: true,
              items: [
                'software-architecture/foundations/data-structures/linear/array',
                'software-architecture/foundations/data-structures/linear/array-list',
                'software-architecture/foundations/data-structures/linear/linked-list',
                'software-architecture/foundations/data-structures/linear/stack',
                'software-architecture/foundations/data-structures/linear/queue',
                'software-architecture/foundations/data-structures/linear/deque',
              ],
            },
            {
              type: 'category',
              label: 'non-linear',
              link: {
                type: 'doc',
                id: 'software-architecture/foundations/data-structures/non-linear/index',
              },
              collapsed: true,
              items: [
                'software-architecture/foundations/data-structures/non-linear/binary-tree',
                'software-architecture/foundations/data-structures/non-linear/binary-search-tree',
                'software-architecture/foundations/data-structures/non-linear/AVL-tree',
                'software-architecture/foundations/data-structures/non-linear/red-black-trees',
                'software-architecture/foundations/data-structures/non-linear/b-trees',
                'software-architecture/foundations/data-structures/non-linear/tries',
                'software-architecture/foundations/data-structures/non-linear/heaps',
                'software-architecture/foundations/data-structures/non-linear/graph-adjacency-list',
                'software-architecture/foundations/data-structures/non-linear/graph-adjacency-matrix',
                'software-architecture/foundations/data-structures/non-linear/graph-traversal-bfs-dfs',
                'software-architecture/foundations/data-structures/non-linear/graph-dijkstra',
                'software-architecture/foundations/data-structures/non-linear/graph-bellman-ford',
                'software-architecture/foundations/data-structures/non-linear/graph-kruskal',
                'software-architecture/foundations/data-structures/non-linear/graph-prim',
                'software-architecture/foundations/data-structures/non-linear/graph-topological-sort',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'algorithms-and-complexity-analysis',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'software-architecture/foundations/algorithms-and-complexity-analysis/index',
          },
          items: [
            {
              type: 'category',
              label: 'complexity-analysis',
              link: {
                type: 'doc',
                id: 'software-architecture/foundations/algorithms-and-complexity-analysis/complexity-analysis/index',
              },
              collapsed: true,
              items: [
                'software-architecture/foundations/algorithms-and-complexity-analysis/complexity-analysis/big-o-notation',
                'software-architecture/foundations/algorithms-and-complexity-analysis/complexity-analysis/amortized-complexity',
                'software-architecture/foundations/algorithms-and-complexity-analysis/complexity-analysis/space-complexity',
                'software-architecture/foundations/algorithms-and-complexity-analysis/complexity-analysis/time-complexity',
              ],
            },
            {
              type: 'category',
              label: 'advanced-algorithms',
              link: {
                type: 'doc',
                id: 'software-architecture/foundations/algorithms-and-complexity-analysis/advanced-algorithms/index',
              },
              collapsed: true,
              items: [
                'software-architecture/foundations/algorithms-and-complexity-analysis/advanced-algorithms/divide-and-conquer',
                'software-architecture/foundations/algorithms-and-complexity-analysis/advanced-algorithms/dynamic-programming',
                'software-architecture/foundations/algorithms-and-complexity-analysis/advanced-algorithms/greedy-algorithms',
                'software-architecture/foundations/algorithms-and-complexity-analysis/advanced-algorithms/backtracking',
                'software-architecture/foundations/algorithms-and-complexity-analysis/advanced-algorithms/branch-and-bound',
              ],
            },
            {
              type: 'category',
              label: 'sorting',
              link: {
                type: 'doc',
                id: 'software-architecture/foundations/algorithms-and-complexity-analysis/sorting/index',
              },
              collapsed: true,
              items: [
                'software-architecture/foundations/algorithms-and-complexity-analysis/sorting/bubble-sort',
                'software-architecture/foundations/algorithms-and-complexity-analysis/sorting/selection-sort',
                'software-architecture/foundations/algorithms-and-complexity-analysis/sorting/insertion-sort',
                'software-architecture/foundations/algorithms-and-complexity-analysis/sorting/merge-sort',
                'software-architecture/foundations/algorithms-and-complexity-analysis/sorting/quick-sort',
                'software-architecture/foundations/algorithms-and-complexity-analysis/sorting/heap-sort',
                'software-architecture/foundations/algorithms-and-complexity-analysis/sorting/radix-sort',
                'software-architecture/foundations/algorithms-and-complexity-analysis/sorting/counting-sort',
                // 'software-architecture/algorithms/sorting/bucket-sort',
              ],
            },
            {
              type: 'category',
              label: 'searching',
              link: {
                type: 'doc',
                id: 'software-architecture/foundations/algorithms-and-complexity-analysis/searching/index',
              },
              collapsed: true,
              items: [
                'software-architecture/foundations/algorithms-and-complexity-analysis/searching/linear-search',
                'software-architecture/foundations/algorithms-and-complexity-analysis/searching/binary-search',
                'software-architecture/foundations/algorithms-and-complexity-analysis/searching/binary-search-tree',
                // 'software-architecture/algorithms/searching/jump-search',
                'software-architecture/foundations/algorithms-and-complexity-analysis/searching/interpolation-search',
                'software-architecture/foundations/algorithms-and-complexity-analysis/searching/exponential-search',
                // 'software-architecture/algorithms/searching/ternary-search',
                'software-architecture/foundations/algorithms-and-complexity-analysis/searching/fibonacci-search',
                // 'software-architecture/algorithms/searching/hash-search',
              ],
            },
          ],
        }
      ],
    },
    {
      type: 'category',
      label: 'Databases',
      link: {
        type: 'doc',
        id: 'software-architecture/databases/index',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Relational Databases',
          link: {
            type: 'doc',
            id: 'software-architecture/databases/relational-db/index',
          },
          collapsed: true,
          items: [
            'software-architecture/databases/relational-db/sql',
            'software-architecture/databases/relational-db/desing-and-normalization',
            'software-architecture/databases/relational-db/acid-transactions',
            'software-architecture/databases/relational-db/indexing-and-optimization'
          ],
        },
        {
          type: 'category',
          label: 'Non-Relational Databases',
          link: {
            type: 'doc',
            id: 'software-architecture/databases/non-relational-db/index',
          },
          collapsed: true,
          items: [
            'software-architecture/databases/non-relational-db/mongoDb',
            'software-architecture/databases/non-relational-db/dynamoDb',
            'software-architecture/databases/non-relational-db/couchDb',
            'software-architecture/databases/non-relational-db/couchBase'
          ],
        },
        {
          type: 'category',
          label: 'Caching Databases',
          link: {
            type: 'doc',
            id: 'software-architecture/databases/caching-db/index',
          },
          collapsed: true,
          items: [
            'software-architecture/databases/caching-db/redis',
            'software-architecture/databases/caching-db/memcached',
            'software-architecture/databases/caching-db/dragonflyDb',
          ],
        },
        {
          type: 'category',
          label: 'Graph Databases',
          link: {
            type: 'doc',
            id: 'software-architecture/databases/graph-db/index',
          },
          collapsed: true,
          items: [
            'software-architecture/databases/graph-db/neo4j',
            'software-architecture/databases/graph-db/amazon-neptune',
            'software-architecture/databases/graph-db/janus-graph',
            'software-architecture/databases/graph-db/orientDb',
          ],
        },
        {
          type: 'category',
          label: 'Time Series Databases',
          link: {
            type: 'doc',
            id: 'software-architecture/databases/time-series-db/index',
          },
          collapsed: true,
          items: [
            'software-architecture/databases/time-series-db/influxdb',
            'software-architecture/databases/time-series-db/timescaleDb',
            'software-architecture/databases/time-series-db/prometheus',
            'software-architecture/databases/time-series-db/graphite',
            'software-architecture/databases/time-series-db/opentsdb',
            'software-architecture/databases/time-series-db/amazon-timestream',
          ],
        },
        {
          type: 'category',
          label: 'Vector Databases',
          link: {
            type: 'doc',
            id: 'software-architecture/databases/vector-db/index',
          },
          collapsed: true,
          items: [
            'software-architecture/databases/vector-db/pinecone',
            // 'software-architecture/databases/vector-db/weaviate',
            // 'software-architecture/databases/vector-db/milvus',
            // 'software-architecture/databases/vector-db/qdrant',
            // 'software-architecture/databases/vector-db/chroma',
          ],
        },
        {
          type: 'category',
          label: 'In-Memory Databases',
          link: {
            type: 'doc',
            id: 'software-architecture/databases/in-memory-db/index',
          },
          collapsed: true,
          items: [
            'software-architecture/databases/caching-db/redis',
            // 'software-architecture/databases/in-memory-db/memcached',
            // 'software-architecture/databases/in-memory-db/amazon-elasticache',
          ],
        },
        {
          type: 'category',
          label: 'Distributed Databases',
          link: {
            type: 'doc',
            id: 'software-architecture/databases/distributed-db/index',
          },
          collapsed: true,
          items: [
            'software-architecture/databases/distributed-db/cassandra',
            // 'software-architecture/databases/distributed-db/cockroachdb',
            // 'software-architecture/databases/distributed-db/yugabyte-db',
            // 'software-architecture/databases/distributed-db/google-spanner',
          ],
        },
        {
          type: 'category',
          label: 'Tabular Databases',
          link: {
            type: 'doc',
            id: 'software-architecture/databases/tabular-db/index',
          },
          collapsed: true,
          items: [

            'software-architecture/databases/tabular-db/cassandra',
            // 'software-architecture/databases/tabular-db/cockroachdb',
            // 'software-architecture/databases/tabular-db/yugabyte-db',
            // 'software-architecture/databases/tabular-db/google-spanner',
          ],
        },
        {
          type: 'category',
          label: 'Multi-Model Databases',
          link: {
            type: 'doc',
            id: 'software-architecture/databases/multi-model-db/index',
          },
          collapsed: true,
          items: [
            'software-architecture/databases/multi-model-db/orientDb',
            // 'software-architecture/databases/multi-model-db/cockroachdb',
            // 'software-architecture/databases/multi-model-db/yugabyte-db',
            // 'software-architecture/databases/multi-model-db/google-spanner',
          ],
        }
      ],
    },
    {
      type: 'category',
      label: 'Design Patterns',
      link: {
        type: 'doc',
        id: 'software-architecture/design-patterns/index',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Creational Patterns',
          link: {
            type: 'doc',
            id: 'software-architecture/design-patterns/creational-patterns/index',
          },
          collapsed: true,
          items: [
            'software-architecture/design-patterns/creational-patterns/singleton',
            'software-architecture/design-patterns/creational-patterns/factory-method',
            'software-architecture/design-patterns/creational-patterns/abstract-factory',
            'software-architecture/design-patterns/creational-patterns/builder',
            'software-architecture/design-patterns/creational-patterns/prototype'
          ],
        },
        {
          type: 'category',
          label: 'Structural Patterns',
          link: {
            type: 'doc',
            id: 'software-architecture/design-patterns/structural-patterns/index',
          },
          collapsed: true,
          items: [
            'software-architecture/design-patterns/structural-patterns/adapter',
            'software-architecture/design-patterns/structural-patterns/bridge',
            'software-architecture/design-patterns/structural-patterns/composite',
            'software-architecture/design-patterns/structural-patterns/decorator',
            'software-architecture/design-patterns/structural-patterns/facade',
            'software-architecture/design-patterns/structural-patterns/proxy',
            'software-architecture/design-patterns/structural-patterns/flyweight'
          ],
        },
        {
          type: 'category',
          label: 'Behavioral Patterns',
          link: {
            type: 'doc',
            id: 'software-architecture/design-patterns/behavioral-patterns/index',
          },
          collapsed: true,
          items: [
            'software-architecture/design-patterns/behavioral-patterns/chain-of-responsibility',
            'software-architecture/design-patterns/behavioral-patterns/command',
            'software-architecture/design-patterns/behavioral-patterns/interpreter',
            'software-architecture/design-patterns/behavioral-patterns/iterator',
            'software-architecture/design-patterns/behavioral-patterns/mediator',
            'software-architecture/design-patterns/behavioral-patterns/memento',
            'software-architecture/design-patterns/behavioral-patterns/observer',
            'software-architecture/design-patterns/behavioral-patterns/state',
            'software-architecture/design-patterns/behavioral-patterns/strategy',
            'software-architecture/design-patterns/behavioral-patterns/template-method',
            'software-architecture/design-patterns/behavioral-patterns/visitor',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Modeling & Boundaries',
      collapsed: true,
      items: [
        'software-architecture/domain-driven-design',
        'software-architecture/api-integration',
      ],
    },
    {
      type: 'category',
      label: 'Data & Scale',
      collapsed: true,
      items: [
        'software-architecture/data-consistency',
        'software-architecture/scalability-reliability',
      ],
    },
    {
      type: 'category',
      label: 'Security & Operations',
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
  ]
};

module.exports = sidebars;
