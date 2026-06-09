require("dotenv/config");

const prisma = require("../src/prisma/prisma");

async function main() {
    console.log("Iniciando el vaciado de tablas...");
    await prisma.favorite.deleteMany();
    await prisma.boardgameTranslation.deleteMany();
    await prisma.user.deleteMany();
    await prisma.boardgame.deleteMany();

    // Reiniciar los contadores autoincrementales de todo
    await prisma.$executeRaw`ALTER SEQUENCE "boardgame_id_seq" RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE "boardgameTranslation_id_seq" RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE "user_id_seq" RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE "favorite_id_seq" RESTART WITH 1;`;

    console.log("Cargando juegos y traducciones de forma integrada...");

    // Agrupamos las traducciones pertenecientes a cada boardgameId
    const gamesToSeed = [

        {
            imageURL: "https://upload.wikimedia.org/wikipedia/en/a/a3/Catan-2015-boxart.jpg",
            translations: [
                {
                    "name": "Catan",
                    "description": "Players attempt to dominate the island of Catan by building settlements, cities, and roads.",
                    "category": ["Strategy", "Negotiation"],
                    "language": "eng"
                },
                {
                    "name": "Catán",
                    "description": "Los jugadores intentan dominar la isla de Catán construyendo poblados, ciudades y carreteras.",
                    "category": ["Estrategia", "Negociación"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-carcassonne-2000-2018413384.jpg",
            translations: [
                {
                    "name": "Carcassonne",
                    "description": "A tile-placement game where players create a medieval landscape.",
                    "category": ["Strategy", "Tile Placement"],
                    "language": "eng"
                },
                {
                    "name": "Carcassonne",
                    "description": "Un juego de colocación de losetas en el que los jugadores crean un paisaje medieval.",
                    "category": ["Estrategia", "Colocación de losetas"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://upload.wikimedia.org/wikipedia/en/3/36/Pandemic_game.jpg",
            translations: [
                {
                    "name": "Pandemic",
                    "description": "Cooperative game where players must stop the spread of four diseases.",
                    "category": ["Cooperative", "Strategy"],
                    "language": "eng"
                },
                {
                    "name": "Pandemic",
                    "description": "Juego cooperativo en el que los jugadores deben detener la propagación de cuatro enfermedades.",
                    "category": ["Cooperativo", "Estrategia"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-ticket-to-ride-10th-anniversary-1860531305.jpg",
            translations: [
                {
                    "name": "Ticket to Ride",
                    "description": "Players collect train car cards to claim railway routes across the map.",
                    "category": ["Family", "Trains"],
                    "language": "eng"
                },
                {
                    "name": "¡Aventureros al Tren!",
                    "description": "Los jugadores coleccionan cartas de vagones para reclamar rutas ferroviarias en el mapa.",
                    "category": ["Familiar", "Trenes"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-7-wonders-2010-1239154903.jpg",
            translations: [
                {
                    "name": "7 Wonders",
                    "description": "Lead one of the seven great cities of the ancient world through three ages.",
                    "category": ["Strategy", "Card Drafting"],
                    "language": "eng"
                },
                {
                    "name": "7 Wonders",
                    "description": "Lidera una de las siete grandes ciudades del mundo antiguo a lo largo de tres eras.",
                    "category": ["Estrategia", "Selección de cartas"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-dixit-2008-1968557103.jpg",
            translations: [
                {
                    "name": "Dixit",
                    "description": "A game of deduction and creativity based on surreal illustrations.",
                    "category": ["Party", "Deduction"],
                    "language": "eng"
                },
                {
                    "name": "Dixit",
                    "description": "Un juego de deducción y creatividad basado en ilustraciones surrealistas.",
                    "category": ["Fiesta", "Deducción"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-terraforming-mars-2016-1937017209.jpg",
            translations: [
                {
                    "name": "Terraforming Mars",
                    "description": "Corporations compete to make the planet Mars habitable.",
                    "category": ["Strategy", "Science Fiction"],
                    "language": "eng"
                },
                {
                    "name": "Terraforming Mars",
                    "description": "Las corporaciones compiten para hacer habitable el planeta Marte.",
                    "category": ["Estrategia", "Ciencia Ficción"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-azul-2017-648813713.jpg",
            translations: [
                {
                    "name": "Azul",
                    "description": "Strategically place tiles to decorate the Royal Palace of Evora.",
                    "category": ["Abstract", "Strategy"],
                    "language": "eng"
                },
                {
                    "name": "Azul",
                    "description": "Coloca losetas estratégicamente para decorar el Palacio Real de Évora.",
                    "category": ["Abstracto", "Estrategia"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-wingspan-2019-1650699375.jpg",
            translations: [
                {
                    "name": "Wingspan",
                    "description": "Attract the best birds to your wildlife preserve to earn points.",
                    "category": ["Strategy", "Nature"],
                    "language": "eng"
                },
                {
                    "name": "Wingspan",
                    "description": "Atrae a las mejores aves a tu reserva natural para ganar puntos.",
                    "category": ["Estrategia", "Naturaleza"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-gloomhaven-807419437.jpg",
            translations: [
                {
                    "name": "Gloomhaven",
                    "description": "Tactical combat in an evolving, dark fantasy world.",
                    "category": ["Adventure", "Cooperative"],
                    "language": "eng"
                },
                {
                    "name": "Gloomhaven",
                    "description": "Combate táctico en un mundo de fantasía oscura en constante evolución.",
                    "category": ["Aventura", "Cooperativo"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-codigo-secreto-2015-177051438.jpg",
            translations: [
                {
                    "name": "Código Secreto",
                    "description": "Guess your team's secret keywords using one-word clues.",
                    "category": ["Party", "Deduction"],
                    "language": "eng"
                },
                {
                    "name": "Código Secreto",
                    "description": "Adivina las palabras clave secretas de tu equipo usando pistas de una sola palabra.",
                    "category": ["Fiesta", "Deducción"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-splendor-2014-1394061054.jpg",
            translations: [
                {
                    "name": "Splendor",
                    "description": "Renaissance merchants buy gem mines and transportation.",
                    "category": ["Strategy", "Family"],
                    "language": "eng"
                },
                {
                    "name": "Splendor",
                    "description": "Comerciantes del Renacimiento compran minas de gemas y medios de transporte.",
                    "category": ["Estrategia", "Familiar"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-exploding-kittens-2015-1690100030.jpg",
            translations: [
                {
                    "name": "Exploding Kittens",
                    "description": "A kitty-powered version of Russian roulette with lots of strategy and humor.",
                    "category": ["Cards", "Party"],
                    "language": "eng"
                },
                {
                    "name": "Exploding Kittens",
                    "description": "Una versión de la ruleta rusa impulsada por gatitos, con mucha estrategia y humor.",
                    "category": ["Cartas", "Fiesta"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-sushi-go-2013-100155002.jpg",
            translations: [
                {
                    "name": "Sushi Go!",
                    "description": "Fast-paced card game where you try to eat the best sushi meal.",
                    "category": ["Cards", "Family"],
                    "language": "eng"
                },
                {
                    "name": "Sushi Go!",
                    "description": "Juego de cartas rápido en el que intentas comer el mejor menú de sushi.",
                    "category": ["Cartas", "Familiar"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-root-28852051.jpg",
            translations: [
                {
                    "name": "Root",
                    "description": "An asymmetric war game where different factions fight for control of the forest.",
                    "category": ["War", "Asymmetric"],
                    "language": "eng"
                },
                {
                    "name": "Root",
                    "description": "Un juego de guerra asimétrico donde diferentes facciones luchan por el control del bosque.",
                    "category": ["Guerra", "Asimétrico"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-everdell-2018-115410558.jpg",
            translations: [
                {
                    "name": "Everdell",
                    "description": "Build a city of forest creatures in this beautiful worker-placement game.",
                    "category": ["Strategy", "Fantasy"],
                    "language": "eng"
                },
                {
                    "name": "Everdell",
                    "description": "Construye una ciudad de criaturas del bosque en este hermoso juego de colocación de trabajadores.",
                    "category": ["Estrategia", "Fantasía"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-scrabble-1948-305148094.jpg",
            translations: [
                {
                    "name": "Scrabble",
                    "description": "The classic game of forming words on a grid board.",
                    "category": ["Words", "Family"],
                    "language": "eng"
                },
                {
                    "name": "Scrabble",
                    "description": "El clásico juego de formar palabras en un tablero cuadriculado.",
                    "category": ["Palabras", "Familiar"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-monopoly-1935-1652185284.jpg",
            translations: [
                {
                    "name": "Monopoly",
                    "description": "Buy properties and collect rents to bankrupt your opponents.",
                    "category": ["Economics", "Family"],
                    "language": "eng"
                },
                {
                    "name": "Monopoly",
                    "description": "Compra propiedades y cobra alquileres para llevar a la bancarrota a tus oponentes.",
                    "category": ["Economía", "Familiar"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-cluedo-1949-816295747.jpg",
            translations: [
                {
                    "name": "Clue",
                    "description": "Solve a murder mystery in this classic deduction game.",
                    "category": ["Deduction", "Mystery"],
                    "language": "eng"
                },
                {
                    "name": "Cluedo",
                    "description": "Resuelve un misterio de asesinato en este clásico juego de duducción.",
                    "category": ["Deducción", "Misterio"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-risk-1959-920342532.jpg",
            translations: [
                {
                    "name": "Risk",
                    "description": "The game of world domination through military strategy.",
                    "category": ["War", "Strategy"],
                    "language": "eng"
                },
                {
                    "name": "Risk",
                    "description": "El juego de la dominación mundial a través de la estrategia militar.",
                    "category": ["Guerra", "Estrategia"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-the-crew-journey-to-the-ends-of-the-earth-577767383.jpg",
            translations: [
                {
                    "name": "The Crew",
                    "description": "Cooperative trick-taking game where players must complete space missions.",
                    "category": ["Cooperative", "Cards"],
                    "language": "eng"
                },
                {
                    "name": "La Tripulación",
                    "description": "Juego cooperativo de bazas donde los jugadores deben completar misiones espaciales.",
                    "category": ["Cooperativo", "Cartas"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-patchwork-2014-600963853.jpg",
            translations: [
                {
                    "name": "Patchwork",
                    "description": "Two players compete to create the most aesthetic patchwork quilt.",
                    "category": ["Abstract", "2 Players"],
                    "language": "eng"
                },
                {
                    "name": "Patchwork",
                    "description": "Dos jugadores compiten por crear la colcha de retazos más estética.",
                    "category": ["Abstracto", "2 Jugadores"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-dune-imperium-2020-44438137.jpg",
            translations: [
                {
                    "name": "Dune: Imperium",
                    "description": "Strategy and intrigue in the Dune universe.",
                    "category": ["Strategy", "Science Fiction"],
                    "language": "eng"
                },
                {
                    "name": "Dune: Imperium",
                    "description": "Estrategia e intriga en el universo de Dune.",
                    "category": ["Estrategia", "Ciencia Ficción"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-blood-rage-2015-1585192372.jpg",
            translations: [
                {
                    "name": "Blood Rage",
                    "description": "Vikings fight, pillage, and die gloriously.",
                    "category": ["Strategy", "Mythology"],
                    "language": "eng"
                },
                {
                    "name": "Blood Rage",
                    "description": "Vikingos luchan, saquean y mueren gloriosamente.",
                    "category": ["Estrategia", "Mitología"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-spirit-island-2017-1662472067.jpg",
            translations: [
                {
                    "name": "Spirit Island",
                    "description": "Powerful spirits defend their island from colonizers.",
                    "category": ["Cooperative", "Strategy"],
                    "language": "eng"
                },
                {
                    "name": "Spirit Island",
                    "description": "Poderosos espíritus defienden su isla de los colonizadores.",
                    "category": ["Cooperativo", "Estrategia"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-micromacro-crime-city-2020-187571505.jpg",
            translations: [
                {
                    "name": "MicroMacro",
                    "description": "Solve crimes by observing a giant map.",
                    "category": ["Deduction", "Observation"],
                    "language": "eng"
                },
                {
                    "name": "MicroMacro",
                    "description": "Resuelve crímenes observando un mapa gigante.",
                    "category": ["Deducción", "Observación"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://cdn.shopify.com/s/files/1/0287/0634/0912/files/Tournament_Chess_Set_Combo_-_Pieces_In_Ebonised_Boxwood_With_Board_480x480.webp?v=1700029474",
            translations: [
                {
                    "name": "Chess",
                    "description": "The quintessential strategy game.",
                    "category": ["Abstract", "Strategy"],
                    "language": "eng"
                },
                {
                    "name": "Ajedrez",
                    "description": "El juego de estrategia por excelencia.",
                    "category": ["Abstracto", "Estrategia"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-the-mind-2018-1830185927.jpg",
            translations: [
                {
                    "name": "The Mind",
                    "description": "Play cards in ascending order without speaking.",
                    "category": ["Cooperative", "Cards"],
                    "language": "eng"
                },
                {
                    "name": "The Mind",
                    "description": "Juega cartas en orden ascendente sin hablar.",
                    "category": ["Cooperativo", "Cartas"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-unstable-unicorns-2017-1759429841.jpg",
            translations: [
                {
                    "name": "Unstable Unicorns",
                    "description": "Build an army of magical unicorns.",
                    "category": ["Cards", "Party"],
                    "language": "eng"
                },
                {
                    "name": "Unstable Unicorns",
                    "description": "Construye un ejército de unicornios mágicos.",
                    "category": ["Cartas", "Fiesta"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-king-of-tokyo-2011-2047015766.jpg",
            translations: [
                {
                    "name": "King of Tokyo",
                    "description": "Giant monsters fight for control of the city.",
                    "category": ["Dice", "Fighting"],
                    "language": "eng"
                },
                {
                    "name": "King of Tokyo",
                    "description": "Monstruos gigantes luchan por el control de la ciudad.",
                    "category": ["Dados", "Lucha"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-love-letter-2019-1502542230.jpg",
            translations: [
                {
                    "name": "Love Letter",
                    "description": "Deliver your love letter to the princess.",
                    "category": ["Cards", "Deduction"],
                    "language": "eng"
                },
                {
                    "name": "Love Letter",
                    "description": "Entrega tu carta de amor a la princesa.",
                    "category": ["Cartas", "Deducción"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-7-wonders-duel-2015-2026006073.jpg",
            translations: [
                {
                    "name": "7 Wonders Duel",
                    "description": "Specific version for two players.",
                    "category": ["Strategy", "2 Players"],
                    "language": "eng"
                },
                {
                    "name": "7 Wonders Duel",
                    "description": "Versión específica para dos jugadores.",
                    "category": ["Estrategia", "2 Jugadores"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-dominion-1271463203.jpg",
            translations: [
                {
                    "name": "Dominion",
                    "description": "The original deck-building game.",
                    "category": ["Strategy", "Cards"],
                    "language": "eng"
                },
                {
                    "name": "Dominion",
                    "description": "El juego original de construcción de mazos.",
                    "category": ["Estrategia", "Cartas"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-mice-and-mystics-de-ratones-y-magia-2012-448120259.jpg",
            translations: [
                {
                    "name": "Mice and Mystics",
                    "description": "Narrative adventure of brave mice.",
                    "category": ["Adventure", "Narrative"],
                    "language": "eng"
                },
                {
                    "name": "De Ratones y Magia",
                    "description": "Aventura narrativa de valientes ratones.",
                    "category": ["Aventura", "Narrativo"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-scythe-2016-371929213.jpg",
            translations: [
                {
                    "name": "Scythe",
                    "description": "Strategy in an alternative 1920s Europe.",
                    "category": ["Strategy", "Steampunk"],
                    "language": "eng"
                },
                {
                    "name": "Scythe",
                    "description": "Estrategia en una Europa alternativa de los años 1920.",
                    "category": ["Estrategia", "Steampunk"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-zombicide-2012-1672365355.jpg",
            translations: [
                {
                    "name": "Zombicide",
                    "description": "Survive the hordes of undead.",
                    "category": ["Cooperative", "Zombies"],
                    "language": "eng"
                },
                {
                    "name": "Zombicide",
                    "description": "Sobrevive a las hordas de muertos vivientes.",
                    "category": ["Cooperativo", "Zombis"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-jungle-speed-1997-1371614292.jpg",
            translations: [
                {
                    "name": "Jungle Speed",
                    "description": "Visual speed and reflexes of steel.",
                    "category": ["Dexterity", "Party"],
                    "language": "eng"
                },
                {
                    "name": "Jungle Speed",
                    "description": "Velocidad visual y reflejos de acero.",
                    "category": ["Destreza", "Fiesta"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-dobble-clasico-2009-661368681.jpg",
            translations: [
                {
                    "name": "Dobble",
                    "description": "Find the matching symbol before anyone else.",
                    "category": ["Observation", "Family"],
                    "language": "eng"
                },
                {
                    "name": "Dobble",
                    "description": "Encuentra el símbolo idéntico antes que nadie.",
                    "category": ["Observación", "Familiar"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-betrayal-at-house-on-the-hill-2004-1659019961.jpg",
            translations: [
                {
                    "name": "Betrayal at House on the Hill",
                    "description": "Horror and betrayal in a haunted mansion.",
                    "category": ["Horror", "Traitor"],
                    "language": "eng"
                },
                {
                    "name": "Betrayal at House on the Hill",
                    "description": "Terror y traición en una mansión embrujada.",
                    "category": ["Terror", "Traidor"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-sagrada-2017-1938552712.jpg",
            translations: [
                {
                    "name": "Sagrada",
                    "description": "Design beautiful stained glass windows with dice.",
                    "category": ["Abstract", "Dice"],
                    "language": "eng"
                },
                {
                    "name": "Sagrada",
                    "description": "Diseña hermosas vidrieras utilizando dados.",
                    "category": ["Abstracto", "Dados"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-small-world-2009-1577214725.jpg",
            translations: [
                {
                    "name": "Small World",
                    "description": "Fantastic civilizations fight for territory.",
                    "category": ["Strategy", "Fantasy"],
                    "language": "eng"
                },
                {
                    "name": "Small World",
                    "description": "Civilizaciones fantásticas luchan por el territorio.",
                    "category": ["Estrategia", "Fantasía"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-terra-mystica-450291530.jpg",
            translations: [
                {
                    "name": "Terra Mystica",
                    "description": "Territorial expansion and resource management.",
                    "category": ["Strategy", "Fantasy"],
                    "language": "eng"
                },
                {
                    "name": "Terra Mystica",
                    "description": "Expansión territorial y gestión de recursos.",
                    "category": ["Estrategia", "Fantasía"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-disney-villainous-2018-1998883649.jpg",
            translations: [
                {
                    "name": "Villainous",
                    "description": "Be the most successful Disney villain.",
                    "category": ["Strategy", "Disney"],
                    "language": "eng"
                },
                {
                    "name": "Villainous",
                    "description": "Conviértete en el villano de Disney más exitoso.",
                    "category": ["Estrategia", "Disney"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-gloomhaven-fauces-del-leon-2020-1113855840.jpg",
            translations: [
                {
                    "name": "Jaws of the Lion",
                    "description": "Perfect introduction to the Gloomhaven universe.",
                    "category": ["Adventure", "Tactical Combat"],
                    "language": "eng"
                },
                {
                    "name": "Gloomhaven: Fauces del León",
                    "description": "Introducción perfecta al universo de Gloomhaven.",
                    "category": ["Aventura", "Combate táctico"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-bang-2002-1174505671.jpg",
            translations: [
                {
                    "name": "Bang!",
                    "description": "Card duel in the wild west.",
                    "category": ["Hidden Roles", "Wild West"],
                    "language": "eng"
                },
                {
                    "name": "¡Bang!",
                    "description": "Duelo de cartas en el salvaje oeste.",
                    "category": ["Roles ocultos", "Salvaje Oeste"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-arkham horror-2005-936457287.jpg",
            translations: [
                {
                    "name": "Arkham Horror",
                    "description": "Fight against cosmic horrors in Arkham.",
                    "category": ["Horror", "Lovecraft"],
                    "language": "eng"
                },
                {
                    "name": "Arkham Horror",
                    "description": "Lucha contra horrores cósmicos en Arkham.",
                    "category": ["Terror", "Lovecraft"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-scotland-yard-sherlock-holmes-edition-143547049.jpg",
            translations: [
                {
                    "name": "Sherlock Holmes",
                    "description": "Consulting detective in Victorian London.",
                    "category": ["Deduction", "Narrative"],
                    "language": "eng"
                },
                {
                    "name": "Sherlock Holmes",
                    "description": "Detective consultor en el Londres victoriano.",
                    "category": ["Deducción", "Narrativo"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-trivial-pursuit-1981-944947724.jpg",
            translations: [
                {
                    "name": "Trivial Pursuit",
                    "description": "The classic question and answer game.",
                    "category": ["Knowledge", "Family"],
                    "language": "eng"
                },
                {
                    "name": "Trivial Pursuit",
                    "description": "El clásico juego de preguntas y respuestas.",
                    "category": ["Conocimiento", "Familiar"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-cartografos-2019-849424652.jpg",
            translations: [
                {
                    "name": "Cartographers",
                    "description": "Draw the map of the kingdom according to royal edicts.",
                    "category": ["Writing", "Strategy"],
                    "language": "eng"
                },
                {
                    "name": "Cartógrafos",
                    "description": "Dibuja el mapa del reino de acuerdo con los edictos reales.",
                    "category": ["Escritura", "Estrategia"],
                    "language": "es"
                }
            ]
        },
        {
            imageURL: "https://www.ludonauta.es/files/ludico/juegos-mesas/juego-mesa-hanabi-2010-22673695.jpg",
            translations: [
                {
                    "name": "Hanabi",
                    "description": "Cooperative card fireworks.",
                    "category": ["Cooperative", "Deduction"],
                    "language": "eng"
                },
                {
                    "name": "Hanabi",
                    "description": "Fuegos artificiales cooperativos con cartas.",
                    "category": ["Cooperativo", "Deducción"],
                    "language": "es"
                }
            ]
        }

    ];

    // Recorremos el array e insertamos usando la potencia de los "nested writes" de Prisma
    for (const game of gamesToSeed) {
        await prisma.boardgame.create({
            data: {
                imageURL: game.imageURL,
                boardgameTranslations: {
                    create: game.translations
                }
            }
        });
    }

    console.log("Creando usuarios de prueba...");
    await prisma.user.createMany({
        data: [
            {username: "Linda"},
            {username: "Andrea"},
            {username: "Ramiro"}
        ]
    });

    const testUser = await prisma.user.findUnique({
        where: {
            username: "Linda"
        }
    });

    if (!testUser) {
        throw new Error("No se pudo crear el usuario Linda.");
    }

    console.log("Agregando juegos favoritos iniciales para el usuario...");
    await prisma.favorite.createMany({
        data: [
            { userId: testUser.id, boardgameId: 1 }, // Catan
            { userId: testUser.id, boardgameId: 2 }, // Carcassonne
            { userId: testUser.id, boardgameId: 3 }  // Pandemic
        ]
    });

    console.log("Seed ejecutado correctamente. ¡Tablas cargadas con favoritos!");
}



main()
    .catch((error) => {
        console.error("Error ejecutando el seed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });