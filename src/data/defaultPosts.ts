/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Post, UserProfile } from '../types';

export const DEFAULT_PROFILE: UserProfile = {
  name: "Alara Thorne",
  role: "Lead Editor & Storyteller",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  bio: "Exploring the intersections of culture, futuristic technology, and modern society. Writing from a cozy micro-studio in London.",
  socials: {
    twitter: "https://twitter.com",
    github: "https://github.com",
    globe: "https://example.com"
  }
};

export const DEFAULT_POSTS: Post[] = [
  {
    id: "tech-future-ai",
    title: "The Silent Architecture of Non-Visual Computing Interfaces",
    summary: "As screen fatigue reaches a modern peak, we analyze the micro-interactions behind ambient computer models that speak through acoustics, heat, and structural vibration.",
    content: `<p>We have reached the zenith of the glowing rectangle. For two decades, our relationship with digital assistance has been mediated by a glass sheet, but the wind is beginning to blow in an entirely different direction. The next revolution in user interface design will not be high-refresh-rate OLED panels, but the silent, physical spaces surrounding us.</p>
    <p>Imagine walking into a room where the actual physical wall hums lightly to indicate a notification, or where your key fob becomes warm to denote a high-priority work item. This is the realm of ambient, non-visual haptic engines. Major design studios are already prototyping device arrays that don't steal your visual attention; they converse through natural auditory fields and tactile transitions.</p>
    <h2>Understanding Ambient Cues</h2>
    <p>Acoustic projection is the first major pillar. Rather than high-pitch system rings, modern hardware harnesses localized directional audio, creating acoustic zones where alerts are heard only by the targeted recipient as a soft mechanical murmur, resembling dry autumn leaves shuffling. It leverages our innate human ability to process background spatial cues without triggering stress responses.</p>
    <p>Furthermore, structural thermal transitions are making rapid progress. A smart mug that cools down slightly when a schedule item is cancelled, or a pen that pulses with a micro-magneto gyro, provides feedback on the periphery of our consciousness. Our brain parses these cues effortlessly, keeping our main cognitive cycles free for creative work.</p>
    <h2>The Role of AI Models</h2>
    <p>This paradigm shift is fully powered by on-device intelligence. When computers can understand context natively rather than requiring user pointer inputs, the need for complex graphical tables drops by eighty percent. The system acts on predictions, delivering physical state adjustments only when necessary. The glass screen becomes a secondary debugger, rather than the primary window to human experience.</p>`,
    category: "home",
    date: "Jun 18, 2026",
    author: "Alara Thorne",
    authorEmail: "alara@chronicle.com",
    authorRole: "Lead Editor",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&auto=format&fit=crop&q=80",
    readTime: 5,
    isFeatured: true,
    likes: 342,
    views: 1204,
    tags: ["Interface Design", "Hardware", "Human Factors", "Ambient Tech"],
    comments: [
      {
        id: "c1",
        author: "Devon Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
        content: "This is beautiful. The screen fatigue is incredibly real. I love compiling in an editor but I dread my idle notification cycle.",
        date: "Jun 19, 2026"
      },
      {
        id: "c2",
        author: "Marcus Vance",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
        content: "Reminds me of Calm Technology. Truly excellent summary of how haptics can redefine notification fatigue.",
        date: "Jun 20, 2026"
      }
    ]
  },
  {
    id: "culture-retro-vinyl",
    title: "Why Concrete Brutalism and Vinyl Records Keep Rescuing a Disconnected Generation",
    summary: "An editorial on the return of heavy physical mediums in an era of ephemeral software, reviewing how physical friction is becoming the ultimate luxury.",
    content: `<p>There is a strange, shared comfort in heavy things. Step into any modern design studio or apartment in New York and Berlin, and you will find an identical pairing: raw cast concrete coffee tables, brutalist modular structures, and a spinning record player playing analog vinyl.</p>
    <p>This is not a simple hipster trend; it is a defensive reaction against the weightless nature of modern cloud software. When everything we create, consume, and exchange lives on someone else's server, we begin to feel thin, almost spectral. We crave friction. We need objects that can fall, chip, catch dust, and resist our commands.</p>
    <h2>Letting Art Accrue Scar Tissue</h2>
    <p>Digital music files never gather scratches. They do not warp in the sun or wear out after a hundred plays. But it is precisely this lack of degradation that robs digital media of its history. An MP3 has no memory of the birthday party where it was dropped, nor does it carry the scent of paper sleeves. A vinyl record, however, becomes a personal archive. Each crackle is a physical memory, written in real time into the vinyl grooving.</p>
    <p>This love for physical degradation mirrors our architectural love for concrete. Brutalism doesn't hide its scars. The wood-grain impressions of the casting molds remain baked into the massive gray facades. It is an honest architecture—solid, monolithic, and deeply anchored to the ground.</p>
    <h2>Designing for Materiality</h2>
    <p>For designers, the lesson is clear: we must inject meaningful friction back into our user journeys. We must replace the effortless, mindless tap with deliberate physical actions. The return of vinyl and brutalism reminds us that the human spirit lives not in the polished or the optimized, but in the stubborn weight of physical reality.</p>`,
    category: "culture",
    date: "Jun 15, 2026",
    author: "Alara Thorne",
    authorRole: "Lead Editor",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1484755560695-a4c748721c85?w=800&auto=format&fit=crop&q=80",
    readTime: 4,
    likes: 189,
    views: 742,
    tags: ["Brutalisim", "Analog", "Materiality", "Sociology"],
    comments: [
      {
        id: "c3",
        author: "Sophia El-Amin",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
        content: "Material friction is the ultimate premium interface. Playing a physical record forces a 20-minute flow of undivided attention.",
        date: "Jun 16, 2026"
      }
    ]
  },
  {
    id: "news-independent-press",
    title: "The Silent War Over local Gazette Archives",
    summary: "Why local municipal news vaults should be declared critical public infrastructure before property developer conglomerates erase a century of printed local history.",
    content: `<p>In an age dominated by global digital headlines, the quietest crisis of journalism is taking place in basement archives of local municipal libraries. For decades, community gazettes and small-town independent newspapers have served as the only reliable recorders of regional life. But as corporate holding firms purchase crumbling storage facilities, massive historical vaults are being digitalized and walled behind immense paywalls or simply disposed of.</p>
    <p>This is not merely about old obituaries. Underneath those columns are the records of municipal land zoning battles, environmental audits, historical tax layouts, and town board meetings that shape modern legal land disputes today.</p>
    <h2>Who Controls Local History?</h2>
    <p>When a real estate venture buys a city-block warehouse containing a local newspaper's archives, they are purchasing more than paper. They are buying the records of any environmental complaints filed against the land, historical complaints of industrial runoffs, and toxic chemicals buried half a century ago. By restricting access to these archives, corporate entities can wipe clean the historical memory of our community spaces.</p>
    <p>Journalism advocates are calling for state-level emergency funding. 'We must treat local print archives as water lines or electrical systems,' notes Alara Thorne. 'They are basic civic infrastructure. If you leave historic memory to private interest, it will be optimized to maximize returns.'</p>`,
    category: "newspaper",
    date: "Jun 10, 2026",
    author: "Alara Thorne",
    authorRole: "Investigative Journalist",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80",
    readTime: 6,
    likes: 271,
    views: 915,
    tags: ["Civic Duty", "Community Journals", "Archival Rights", "Land Use"],
    comments: []
  },
  {
    id: "sports-ultra-running",
    title: "The Philosophy of the Void: Training Safely for Ultra-Marathons",
    summary: "As high-altitude trail running gains mass global appeal, we trace how silence and extreme fatigue can unlock deep states of flow, accompanied by safety tips.",
    content: `<p>What happens to the human mind when it is forced to move forward for twenty consecutive hours? Modern sports science can tell us about glucose depletion and lactic curves, but it has very little to share about the psychological dissolution that occurs in the quiet mountain passes after midnight.</p>
    <p>Ultra-running has exploded from a localized fringe pursuit into a major lifestyle pillar. For many, it acts as a grueling secular pilgrimage. In a culture saturated with constant visual triggers and notifications, the immense physical void of a mountain peak provides the only form of absolute, pure silence left on earth.</p>
    <h2>Primal Focus and Breath Dynamics</h2>
    <p>Moving continuously over rough, technical mountain terrain demands total engagement from our sensory systems. You cannot contemplate your tax returns or reply to a text while landing your heel on a muddy limestone edge. A single split-second distraction yields a broken clavicle. This absolute requirement for total spatial concentration creates an immediate, highly deep state of flow.</p>
    <p>As the daylight fades, the trail shrinks to the narrow circle cast by your headlamp. The world is reduced to a constant sequence of breath rhythms and foot placements. It is here that ultra-runners describe 'the void'—a peaceful, meditative state where the boundary between self and soil melts into rhythmic exertion.</p>
    <h2>Essential Guidelines for Training Safely</h2>
    <ul>
      <li><strong>Structured Aerobic Engine:</strong> Eighty percent of all trail miles should be completed at an easy, conversable pace to build mitochondrial density.</li>
      <li><strong>Consistent Fueling Hydration:</strong> Consume small, frequent amounts of carbohydrates (200-300 calories per hour) coupled with balanced electrolytes to prevent hyponatremia.</li>
      <li><strong>Active Environmental awareness:</strong> Always pack emergency insulation and share your live running course maps with friends before entering wilderness trails.</li>
    </ul>`,
    category: "sports",
    date: "May 28, 2026",
    author: "Liam Sterling",
    authorRole: "Sports Contributor",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=80",
    readTime: 4,
    likes: 154,
    views: 612,
    tags: ["Ultra Marathon", "Athleticism", "Zen Flow", "Endurance"],
    comments: [
      {
        id: "c4",
        author: "Carla Higgins",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80",
        content: "Beautifully captured! Running my first 50k this October, and the mental component is indeed 100% of the game.",
        date: "May 30, 2026"
      }
    ]
  },
  {
    id: "tech-sustainable-hardware",
    title: "Designing Electronics to Decandence: The Repairability Manifesto",
    summary: "As raw metal mining resources thin, we review modern design frameworks that treat electronics as organic components designed to be dismantled, repaired, and returned to earth.",
    content: `<p>We are drown under a tidal wave of unrepairable gadgets. Sealed enclosures, non-replaceable batteries, and proprietary screws have turned valuable computing units into single-use plastics. But a growing team of engineers is pushing back, crafting a future where electronic systems are designed for natural teardown.</p>
    <p>Inspired by modular structure guidelines, these hardware designers build electronics with open internal schemas, easily removable solder points, and biological casing components. If a screen breaks, it can be unclipped with standard magnets and replaced in under sixty seconds.</p>
    <h2>Dismantling the Monolith</h2>
    <p>A modular laptop shouldn't be bulkier than its proprietary competitor. True engineering craft lies in high-density layout configurations that fit together with standard pin structures. We must reject the notion that absolute water-tight sealing requires permanent industrial glues. By using innovative compressible gaskets and high-tolerance mechanical clamps, we can deliver durable waterproofing without sacrificing repairability.</p>
    <p>Moreover, local materials can replace carbon-intensive plastics. Hemp-resin casings and ocean-plastic brackets can wrap circuitry elegantly while remaining biodegradable or fully recyclable at end-of-life.</p>`,
    category: "technology",
    date: "May 14, 2026",
    author: "Alara Thorne",
    authorRole: "Lead Editor",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    readTime: 5,
    likes: 412,
    views: 1589,
    tags: ["Green Hardware", "Electronics", "Modularity", "Consumer Rights"],
    comments: []
  },
  {
    id: "culture-cinema-slow",
    title: "The Resurgence of 'Slow Cinema' in a Sub-Second Culture",
    summary: "How filmmakers like Apichatpong Weerasethakul are teaching us to inspect stillness and look beyond immediate visual clickbaits, reviving cultural patience in an impatient world.",
    content: `<p>We live inside a continuous highlight reel. Social feeds serve twenty-second clips of cooking videos, political debates, and dramatic accidents in a frantic race for our cortisol levels. In this hyper-stimulated media landscape, the deliberate slow pacing of artistic cinema is acting as a necessary clinical antidote.</p>
    <p>Slow cinema doesn't hurry. Its camera shots often linger for minutes on end on a single rustling canopy, light tracking across a hallway floor, or a kitchen table after a meal. At first, this feels torturous to our dopamine-depleted neural networks. But if you sit through those minutes, something profound happens: your internal clock aligns with the rhythm of the screen, and you begin to notice the rich, microsecond details of the physical world.</p>
    <h2>Learning to See Again</h2>
    <p>When a film scene is held for five minutes, the viewer's eye is freed from the tyranny of character dialogue or narrative action. You begin to inspect the texture of the plaster walls, the subtle shadow gradients, the sound of wind outside the double-glazed panes. It transforms from passive viewing into active investigation.</p>
    <p>This is not boredom; it is deep cultural presence. Slow cinema reminds us that history is not just made of massive explosions or dramatic confrontations. It is written in the long stretches of quiet waiting, in the mundane chores of daily life, and in the unspoken pauses between sentences. It restores our patience, preparing our hearts to appreciate the actual world waiting outside the theater doors.</p>`,
    category: "culture",
    date: "Apr 22, 2026",
    author: "Liam Sterling",
    authorRole: "Cinema Advocate",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    readTime: 6,
    likes: 220,
    views: 814,
    tags: ["Philosophy", "Film Art", "Cinema", "Patience"],
    comments: [
      {
        id: "c5",
        author: "Devon Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
        content: "Yes! There is a sacred quality to sitting in a dark theater without checking your phone. It feels like entering a sanctuary.",
        date: "Apr 23, 2026"
      }
    ]
  }
];
