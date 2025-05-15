import { Conversation } from '../types/types';

export const mockConversations: Conversation[] = [
  {
    id: 1001,
    title: 'Help with online shopping',
    timestamp: Date.now() - 86400000, // 1 day ago
    isLabeled: true,
    messages: [
      {
        role: 'user',
        content: 'I need help finding a good laptop for graphic design work.',
        timestamp: Date.now() - 86400000 - 1200000,
      },
      {
        role: 'assistant',
        content: 'I\'d be happy to help you find a suitable laptop for graphic design. Could you tell me your budget range and any specific requirements you have (like screen size, weight, battery life)?',
        timestamp: Date.now() - 86400000 - 1150000,
      },
      {
        role: 'user',
        content: 'My budget is around $1500. I need something with a good screen for color accuracy and at least 16GB RAM.',
        timestamp: Date.now() - 86400000 - 1100000,
      },
      {
        role: 'assistant',
        content: 'Based on your budget and requirements, here are some options I recommend:\n\n1. MacBook Pro 13" (M1) - Great color accuracy, excellent performance, and battery life\n2. Dell XPS 15 - Beautiful display with good color accuracy and powerful specs\n3. ASUS ProArt StudioBook - Specifically designed for creative professionals\n\nAll of these options offer at least 16GB RAM and excellent displays for graphic design work. The MacBook has the best battery life, while the Dell and ASUS offer larger screens. Would you like more specific details about any of these?',
        timestamp: Date.now() - 86400000 - 1050000,
      },
      {
        role: 'user',
        content: 'The MacBook Pro sounds good. Does it have good GPU performance for rendering?',
        timestamp: Date.now() - 86400000 - 1000000,
      },
      {
        role: 'assistant',
        content: 'The M1 MacBook Pro has integrated graphics that perform surprisingly well for rendering tasks. It outperforms many discrete GPUs in similar price ranges. According to benchmarks, it handles applications like Adobe Photoshop, Illustrator, and InDesign very smoothly. \n\nHowever, if your workflow includes heavy 3D rendering or very complex video editing, you might benefit from a system with a dedicated GPU like the Dell XPS 15 with NVIDIA graphics. \n\nFor most 2D graphic design work and moderate rendering tasks, the M1 MacBook Pro should be more than sufficient and offers excellent battery life as a bonus.',
        timestamp: Date.now() - 86400000 - 950000,
      }
    ],
    evaluation: {
      relevance: 4.5,
      accuracy: 4.0,
      helpfulness: 4.5,
      clarity: 5.0,
      safety: 5.0,
      overall: 4.5,
      comments: 'The assistant provided helpful laptop recommendations based on the user\'s budget and needs. Explanations about GPU performance were accurate and detailed. Good follow-up questions to clarify requirements.',
    }
  },
  {
    id: 1002,
    title: 'Troubleshooting Wi-Fi connection',
    timestamp: Date.now() - 43200000, // 12 hours ago
    isLabeled: false,
    messages: [
      {
        role: 'user',
        content: 'My Wi-Fi keeps disconnecting every few minutes. How can I fix this?',
        timestamp: Date.now() - 43200000 - 600000,
      },
      {
        role: 'assistant',
        content: 'I\'m sorry to hear you\'re having Wi-Fi connectivity issues. Let\'s troubleshoot this step by step:\n\n1. First, try restarting your router and modem - unplug them for about 30 seconds, then plug them back in\n2. Make sure your device is within good range of your router\n3. Check if other devices are also experiencing the same issue\n\nCould you let me know if you\'ve tried any of these steps already, and whether other devices in your home are also having connection problems?',
        timestamp: Date.now() - 43200000 - 550000,
      },
      {
        role: 'user',
        content: 'I\'ve restarted the router already. It seems to be only affecting my laptop, my phone works fine.',
        timestamp: Date.now() - 43200000 - 500000,
      },
      {
        role: 'assistant',
        content: `Since the issue is specific to your laptop, let's focus on troubleshooting that device:

1. Update your Wi-Fi driver:
   - For Windows: Go to Device Manager > Network adapters > right-click your Wi-Fi adapter > Update driver
   - For Mac: Apply any available system updates through System Preferences

2. Check for interference - try changing your router's channel in its settings

3. Forget the Wi-Fi network and reconnect:
   - Windows: Settings > Network & Internet > Wi-Fi > Manage known networks
   - Mac: System Preferences > Network > Advanced > Wi-Fi tab

4. Check if power management is turning off your Wi-Fi to save battery:
   - Windows: Device Manager > Network adapters > Properties > Power Management > Uncheck "Allow the computer to turn off this device to save power"

Let me know which of these steps you'd like to try first, or if you've already attempted any of them.`,
        timestamp: Date.now() - 43200000 - 450000,
      }
    ]
  },
  {
    id: 1003,
    title: 'Recipe recommendations',
    timestamp: Date.now() - 172800000, // 2 days ago
    isLabeled: true,
    messages: [
      {
        role: 'user',
        content: 'I want to cook something special for dinner tonight but I only have chicken, bell peppers, and some basic spices.',
        timestamp: Date.now() - 172800000 - 1800000,
      },
      {
        role: 'assistant',
        content: 'You can make a delicious chicken fajita stir-fry with those ingredients! Here\'s a simple recipe:\n\nIngredients:\n- Chicken breasts, sliced into strips\n- Bell peppers, sliced\n- Onion (if you have it, but not essential)\n- Basic spices: salt, pepper, garlic powder, cumin, paprika\n- Oil for cooking\n\nInstructions:\n1. Heat oil in a pan over medium-high heat\n2. Season chicken with salt, pepper, garlic powder, cumin, and paprika\n3. Cook chicken until no longer pink, about 5-7 minutes\n4. Add sliced bell peppers (and onion if available)\n5. Cook until vegetables are tender-crisp, about 5 minutes\n6. Adjust seasoning to taste\n\nServe with rice if you have it, or just enjoy as is! Would you like me to suggest any variations based on other ingredients you might have?',
        timestamp: Date.now() - 172800000 - 1750000,
      },
      {
        role: 'user',
        content: 'That sounds good! I actually have some rice and lime too. Would that work well with it?',
        timestamp: Date.now() - 172800000 - 1700000,
      },
      {
        role: 'assistant',
        content: 'Perfect! Rice and lime will elevate your chicken fajita stir-fry beautifully!\n\nHere\'s how to incorporate them:\n\n1. For the rice: Cook according to package instructions. For extra flavor, add a small pinch of salt and a squeeze of lime juice to the cooking water.\n\n2. For the lime: After your chicken and peppers are cooked, squeeze fresh lime juice over the entire dish just before serving. This adds a bright, fresh flavor that\'s characteristic of fajitas.\n\n3. If you have any cilantro hiding in your refrigerator, a sprinkle of chopped cilantro with the lime would make it even more delicious.\n\nServe the chicken and peppers over the rice, finish with lime juice, and enjoy your complete meal! This combination gives you a restaurant-quality dish with minimal ingredients.',
        timestamp: Date.now() - 172800000 - 1650000,
      }
    ],
    evaluation: {
      relevance: 5.0,
      accuracy: 5.0,
      helpfulness: 5.0,
      clarity: 4.5,
      safety: 5.0,
      overall: 5.0,
      comments: 'Excellent response that worked with the user\'s limited ingredients. Provided a complete recipe with clear instructions. Follow-up suggestion with lime and rice preparation was very helpful and enhanced the original idea.',
    }
  },
  {
    id: 1004,
    title: 'Help with math homework',
    timestamp: Date.now() - 21600000, // 6 hours ago
    isLabeled: false,
    messages: [
      {
        role: 'user',
        content: 'I need help solving this equation: 3x + 7 = 22',
        timestamp: Date.now() - 21600000 - 300000,
      },
      {
        role: 'assistant',
        content: 'I\'d be happy to help you solve this equation! Let\'s work through it step by step.\n\nEquation: 3x + 7 = 22\n\nStep 1: Subtract 7 from both sides to isolate the term with x.\n3x + 7 - 7 = 22 - 7\n3x = 15\n\nStep 2: Divide both sides by 3 to solve for x.\n3x ÷ 3 = 15 ÷ 3\nx = 5\n\nStep 3: Let\'s verify our answer by substituting x = 5 back into the original equation.\n3(5) + 7 = 22\n15 + 7 = 22\n22 = 22 ✓\n\nTherefore, x = 5 is the solution to the equation 3x + 7 = 22.\n\nIs there anything else about this problem you\'d like me to explain?',
        timestamp: Date.now() - 21600000 - 250000,
      },
      {
        role: 'user',
        content: 'Thanks! Can you help me with another one? 2(x - 4) = 16',
        timestamp: Date.now() - 21600000 - 200000,
      },
      {
        role: 'assistant',
        content: 'I\'d be happy to help you solve this equation too! Let\'s work through it step by step.\n\nEquation: 2(x - 4) = 16\n\nStep 1: Distribute the 2 to the terms inside the parentheses.\n2(x - 4) = 16\n2x - 8 = 16\n\nStep 2: Add 8 to both sides to isolate the term with x.\n2x - 8 + 8 = 16 + 8\n2x = 24\n\nStep 3: Divide both sides by 2 to solve for x.\n2x ÷ 2 = 24 ÷ 2\nx = 12\n\nStep 4: Let\'s verify our answer by substituting x = 12 back into the original equation.\n2(12 - 4) = 16\n2(8) = 16\n16 = 16 ✓\n\nTherefore, x = 12 is the solution to the equation 2(x - 4) = 16.\n\nIs there anything else you\'d like help with?',
        timestamp: Date.now() - 21600000 - 150000,
      }
    ]
  },
  {
    id: 1005,
    title: 'Travel recommendations for Japan',
    timestamp: Date.now() - 604800000, // 1 week ago
    isLabeled: true,
    messages: [
      {
        role: 'user',
        content: 'I\'m planning a trip to Japan for 10 days. What cities should I visit and what are some must-see attractions?',
        timestamp: Date.now() - 604800000 - 3600000,
      },
      {
        role: 'assistant',
        content: 'A 10-day trip to Japan sounds fantastic! Here\'s a recommended itinerary covering key cities and attractions:\n\n**Tokyo (3-4 days):**\n- Shinjuku and Shibuya for modern Tokyo and shopping\n- Asakusa and Senso-ji Temple for traditional culture\n- Meiji Shrine and Yoyogi Park\n- Akihabara for electronics and anime culture\n- Tokyo Skytree or Tokyo Tower for city views\n- Imperial Palace gardens\n\n**Kyoto (3 days):**\n- Fushimi Inari Shrine with its thousands of torii gates\n- Kinkaku-ji (Golden Pavilion)\n- Arashiyama Bamboo Grove\n- Gion district for geisha spotting\n- Kiyomizu-dera Temple\n\n**Osaka (1-2 days):**\n- Osaka Castle\n- Dotonbori for amazing street food\n- Kuromon Market\n\n**Day trips options:**\n- Nara (from Kyoto) - See the friendly deer and big Buddha at Todai-ji\n- Hiroshima and Miyajima Island (can be done in a long day with the bullet train)\n- Hakone or Nikko (from Tokyo) for natural scenery\n\nTravel tip: Get a Japan Rail Pass if you\'ll be moving between cities, and use IC cards (Suica/Pasmo) for local transportation.\n\nWould you like more specific recommendations based on your interests (history, food, nature, etc.)?',
        timestamp: Date.now() - 604800000 - 3550000,
      },
      {
        role: 'user',
        content: 'I\'m really interested in food experiences and traditional culture. Any specific recommendations for those?',
        timestamp: Date.now() - 604800000 - 3500000,
      },
      {
        role: 'assistant',
        content: 'Absolutely! Japan is perfect for food lovers and those interested in traditional culture. Here are specialized recommendations:\n\n**Food Experiences:**\n\n1. **Tokyo:**\n   - Tsukiji Outer Market: Despite the inner market moving, the outer market is still fantastic for fresh sushi breakfast and food stalls\n   - Department store basement food halls (depachika) like in Isetan or Takashimaya\n   - Ramen Street in Tokyo Station\n   - Izakaya hopping in Shinjuku\'s Memory Lane (Omoide Yokocho)\n   - Themed cafes in Harajuku\n\n2. **Kyoto:**\n   - Nishiki Market - "Kyoto\'s Kitchen" with over 100 food stalls\n   - Kaiseki (traditional multi-course) dining\n   - Traditional tea ceremony experiences\n   - Yudofu (tofu hot pot) in Arashiyama\n\n3. **Osaka:**\n   - Dotonbori for street food - try takoyaki, okonomiyaki and kushikatsu\n   - Kuromon Ichiba Market for fresh seafood\n\n**Traditional Cultural Experiences:**\n\n1. **Tokyo:**\n   - Sumo wrestling tournament (if your timing aligns) or visit a morning practice\n   - Kabuki performance at Kabuki-za (they offer single-act tickets with English headsets)\n   - Stay in a ryokan (traditional inn)\n   - Take a Japanese cooking class\n\n2. **Kyoto:**\n   - Gion Corner for traditional performance arts\n   - Rent a kimono for a day while exploring temples\n   - Participate in a tea ceremony at Camellia tea ceremony or one of the temples\n   - Book a maiko (apprentice geisha) dinner experience\n   - Visit Arashiyama Bamboo Grove early morning to avoid crowds\n   - Philosopher\'s Path walking tour\n\n3. **Special Cultural Experiences:**\n   - Temple stay (Shukubo) at Mount Koya\n   - Onsen (hot spring) experience in Hakone\n   - Washi paper making or pottery workshops\n   - Sake brewery tour and tasting in Nada district (Kobe) or Fushimi district (Kyoto)\n\nFor the best experience, try to make reservations for special dining or cultural activities in advance, especially for high-end restaurants and popular cultural experiences. Would you like specific restaurant recommendations or booking resources?',
        timestamp: Date.now() - 604800000 - 3450000,
      }
    ],
    evaluation: {
      relevance: 5.0,
      accuracy: 4.5,
      helpfulness: 5.0,
      clarity: 5.0,
      safety: 5.0,
      overall: 5.0,
      comments: 'The assistant provided excellent, detailed recommendations tailored perfectly to the user\'s interests in food and traditional culture. Information was well-organized and specific. Minor accuracy issue: Tsukiji Inner Market has moved to Toyosu, but explanation was accurate.',
    }
  }
];