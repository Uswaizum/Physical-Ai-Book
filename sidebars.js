/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  textbookSidebar: [
    {
      type: 'category',
      label: 'Physical AI & Humanoid Robotics',
      items: [
        'intro',
        {
          type: 'category',
          label: 'Chapter 1: Fundamentals of Physical AI',
          items: [
            'chapter-1-fundamentals/index',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 2: Robotics Design and Humanoid Systems',
          items: [
            'chapter-2-robotics-design/index',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 3: Physical AI Algorithms and Methods',
          items: [
            'chapter-3-physical-ai/index',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 4: Control Systems for Humanoid Robots',
          items: [
            'chapter-4-control-systems/index',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 5: Machine Learning for Physical Systems',
          items: [
            'chapter-5-machine-learning/index',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 6: Applications and Case Studies',
          items: [
            'chapter-6-applications/index',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 7: Advanced Topics and Future Directions',
          items: [
            'chapter-7-advanced-topics/index',
          ],
        },
        {
          type: 'category',
          label: 'Module 1: Introduction to Physical AI',
          items: [
            'module-1/chapter-1/introduction-to-physical-ai',
            'module-1/chapter-2/embodied-cognition',
          ],
        },
        {
          type: 'category',
          label: 'Module 2: Humanoid Robot Design',
          items: [
            'module-2/chapter-1/humanoid-robot-design',
          ],
        },
      ],
    },
  ],
};
