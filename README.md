# DictatorshipCity Web

A dark 3D survival simulator set in a dictatorial city, inspired by Half-Life 2 and Vladik Brutal+.

## About

You awaken in a grim, gray city under the iron fist of a brutal dictatorship. Your goal is simple: survive in a system designed to crush you, with complete freedom of action and moral choice. Will you work the dangerous factory jobs for meager pay? Will you join the oppressive patrol forces for security? Or will you join the resistance and fight for change?

Every choice matters. Every action has consequences. Welcome to Dictatorship City.

## Features

### 🏙️ Open World City
- Procedurally generated city (~60x60 blocks) with unique layout each playthrough
- Diverse architecture: residential blocks, factories, patrol barracks, prison, secret resistance bases
- Impenetrable city walls - escaping is nearly impossible
- Dynamic day/night cycle and weather system
- Atmospheric fog and lighting

### 🎮 Survival Mechanics
- **Hunger** - Must eat regularly (food costs money or can be stolen)
- **Health** - Decreases from combat, cold, disease
- **Fatigue** - Requires rest and sleep in shelter
- **Money** - Primary currency for survival (food, rent, bribes)

### 💼 Ways to Earn Money
- **Factory Work** - Hard labor, low pay, high accident risk
- **Patrol Duty** - Join state forces, follow orders, stable income (lose morality)
- **Black Market** - Trade illegal goods, smuggling
- **Theft** - Steal food, money, goods (risk of arrest)
- **Resistance** - Help underground organization (dangerous but can change the system)
- **Odd Jobs** - Cleaning, delivery, helping NPCs

### ⚖️ Morality & Consequences
- **Player Morality** - Tracked based on actions (-100 to +100 scale)
- **Faction Reputation** - Government, Resistance, Criminal underworld
- **Detection System** - Getting caught has serious consequences

### 👮 Control & Repression
- **Patrol Units** - Walk the city, check documents, can arrest you
- **Prison System** - Survive harsh conditions, forced labor, psychological pressure
- **Escape Option** - Risk everything to break out
- **Wanted Status** - Become an enemy of the state

### 👥 NPC Interaction
- 100+ procedurally generated NPCs with unique names, appearances, and personalities
- Simple AI behaviors (patrol routes, work schedules, daily routines)
- Branching dialogue system with quests, jobs, and trading
- Relationship tracking (friendship, hostility, neutrality)

### 📜 Quests & Story
- **Main Story** - Uncover the city's dark history and the rise of the dictatorship
- **Side Quests** - From NPCs, morality-dependent
- **Faction Quests** - Government patrol or resistance missions
- **8+ Different Endings** - Based on moral choices and achievements

## Controls

- **W/A/S/D** or **Arrow Keys** - Movement
- **Mouse** - Camera control (first-person)
- **E** - Interact with NPCs and objects
- **I** - Inventory (coming soon)
- **ESC** - Pause / Unlock mouse
- **Click** - Lock mouse pointer for gameplay

## Technical Stack

- **Three.js** - 3D rendering and WebGL
- **Vite** - Build tool and development server
- **Vanilla JavaScript (ES6 Modules)** - Game logic
- **IndexedDB** - Save game data locally
- **Pointer Lock API** - FPS-style mouse controls

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd dictatorship-city-web
npm install
```

### Running the Game

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The game will be available at `http://localhost:5173`

## Game Systems

### Core Systems
- **RenderSystem** - Three.js scene management, lighting, fog effects
- **CityGenerator** - Procedural city generation with seed-based randomization
- **GameState** - Player stats tracking (health, hunger, money, morality)
- **NpcSystem** - NPC generation and AI behavior
- **DialogueSystem** - Interactive dialogue with branching choices
- **TimeSystem** - Day/night cycle (1 minute real time = 1 hour game time)
- **SaveSystem** - Local storage save/load functionality
- **QuestSystem** - Quest tracking and completion
- **AudioSystem** - Sound management (placeholder)

### Project Structure

```
src/
├── main.js              # Entry point
├── Game.js              # Main game controller
├── systems/             # Core game systems
│   ├── RenderSystem.js
│   ├── CityGenerator.js
│   ├── GameState.js
│   ├── NpcSystem.js
│   ├── DialogueSystem.js
│   ├── TimeSystem.js
│   ├── SaveSystem.js
│   ├── QuestSystem.js
│   └── AudioSystem.js
├── entities/            # Game entities
│   ├── Player.js
│   └── NPC.js
├── ui/                  # UI components
│   └── HUD.js
└── utils/               # Utilities
    ├── Constants.js
    └── Random.js
```

## Gameplay Tips

1. **Prioritize Food** - Your hunger depletes constantly. Without food, you'll die
2. **Earn Money** - Factory work pays $5 per shift but costs 10 hunger
3. **Save Frequently** - Game auto-saves every 30 seconds, but manual saves are recommended
4. **Explore Carefully** - The city is dangerous and patrols are everywhere
5. **Moral Choices Matter** - Your actions affect your morality score and available endings
6. **Build Reputation** - Different factions offer different opportunities

## Achievements & Endings

### Ways to Die
- **Starvation** - Let your hunger reach 0
- **Execution** - Get caught by patrols as a wanted criminal

### Ways to Win
- **Escape** - Save $100 to bribe the guards (current: money >= $100)
- **Loyalist** - Join the government forces (future update)
- **Revolution** - Overthrow the dictatorship (future update)
- **Criminal Empire** - Rule the underworld (future update)

## MVP Status

✅ **COMPLETE**: All core MVP features implemented
- Procedural city generation with multiple building types
- Survival mechanics (health, hunger, money)
- NPC interaction and dialogue system  
- Patrol system and basic law enforcement
- Save/load system
- Multiple endings (death, escape)
- Atmospheric 3D graphics and lighting
- Full UI/HUD implementation

## Future Enhancements

- Enhanced NPC AI with daily schedules
- Inventory system and item management
- Combat system and weapons
- Expanded quest lines and story content
- Prison escape mechanics
- More building interiors to explore
- Advanced weather and seasonal effects
- Sound design and atmospheric audio
- Mobile device support

## License

This is a personal project created for educational purposes.

## Credits

Inspired by:
- Half-Life 2 (Valve)
- Vladik Brutal+
- Papers, Please (Lucas Pope)
- Disco Elysium (ZA/UM)

Built with:
- Three.js
- Vite
- Vanilla JavaScript
