import { db } from './index.js';
import { packages, testimonials } from './schema.js';
import { sql } from 'drizzle-orm';

async function seedDatabase() {
  try {
    console.log("A limpar e a atualizar a base de dados sem duplicações...");

    // 1. Limpar testemunhos antigos para evitar duplicações visuais
    await db.delete(testimonials);

    // 2. Inserir ou atualizar pacotes de viagem
    await db.insert(packages).values([
      {
        title: "Paris Romantic Getaway",
        slug: "paris-romantic-getaway",
        description: "Experience the City of Love with an exclusive 5-day package including luxury hotel stay, guided tours of the Louvre and Eiffel Tower, and a romantic Seine river dinner cruise.",
        price: 1299,
        image: "http://localhost:5000/uploads/eiffel-tower.avif",
        category: "Europe",
        duration: "5 Days"
      },
      {
        title: "Bali Tropical Paradise",
        slug: "bali-tropical-paradise",
        description: "Discover the ultimate tropical escape in Bali. Enjoy pristine beaches, ancient temples, traditional spa treatments, and lush jungle villa accommodations.",
        price: 999,
        image: "http://localhost:5000/uploads/bali-beach.avif",
        category: "Asia",
        duration: "7 Days"
      },
      {
        title: "Swiss Alps Ski Adventure",
        slug: "swiss-alps-ski-adventure",
        description: "Hit the world-class slopes of Zermatt in the Swiss Alps. Enjoy cozy chalet stays, ski passes included, professional instruction, and breathtaking mountain views.",
        price: 1899,
        image: "http://localhost:5000/uploads/swiss.avif",
        category: "Europe",
        duration: "6 Days"
      },
      {
        title: "Tokyo Cultural Journey",
        slug: "tokyo-cultural-journey",
        description: "Immerse yourself in the vibrant culture of Tokyo. Explore historic temples, modern districts, world-class culinary spots, and traditional tea ceremonies.",
        price: 1599,
        image: "http://localhost:5000/uploads/Tokyo.jpg",
        category: "Asia",
        duration: "8 Days"
      },
      {
        title: "Rio de Janeiro Vibrant Experience",
        slug: "rio-de-janeiro-vibrant-experience",
        description: "Explore the marvelous city with visits to Christ the Redeemer, Sugarloaf Mountain, and vibrant beach days at Copacabana and Ipanema.",
        price: 1399,
        image: "http://localhost:5000/uploads/rio.jpg",
        category: "South America",
        duration: "6 Days"
      },
      {
        title: "Sydney Harbour Discovery",
        slug: "sydney-harbour-discovery",
        description: "Discover iconic landmarks like the Sydney Opera House and Harbour Bridge, enjoy coastal walks from Bondi to Coogee, and experience world-class dining.",
        price: 1799,
        image: "http://localhost:5000/uploads/sydney.jpg",
        category: "Oceania",
        duration: "7 Days"
      }
    ]).onConflictDoUpdate({
      target: packages.slug,
      set: {
        image: sql`excluded.image`,
        category: sql`excluded.category`,
        price: sql`excluded.price`,
        description: sql`excluded.description`,
        duration: sql`excluded.duration`
      }
    });

    // 3. Inserir exatamente os 4 testemunhos limpos e corretos
    await db.insert(testimonials).values([
      {
        name: "João Silva",
        quote: "Amazing experience! The trip to Rio was perfectly organized and unforgettable.",
        destination: "Rio de Janeiro Vibrant Experience",
        image: "http://localhost:5000/uploads/joaosilva.jpg",
        role: "Traveler"
      },
      {
        name: "Sarah Jones",
        quote: "Wanderlust helped me plan the dream Paris getaway. Absolutely flawless service!",
        destination: "Paris Romantic Getaway",
        image: "http://localhost:5000/uploads/sarahJones.avif",
        role: "Adventure Enthusiast"
      },
      {
        name: "Michael Chen",
        quote: "The Tokyo cultural journey opened my eyes to an incredible world. Highly recommend!",
        destination: "Tokyo Cultural Journey",
        image: "http://localhost:5000/uploads/michaelChen.avif",
        role: "Photographer"
      },
      {
        name: "Sofia Martins",
        quote: "Swiss Alps ski adventure was breathtaking. Everything ran smoothly from start to finish.",
        destination: "Swiss Alps Ski Adventure",
        image: "http://localhost:5000/uploads/sofiamartins.jpg",
        role: "Ski Enthusiast"
      }
    ]);

    console.log("Base de dados limpa e semeada com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao semear a base de dados:", error);
    process.exit(1);
  }
}

seedDatabase();