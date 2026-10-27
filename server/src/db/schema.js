import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// --- Tabelas de Autenticação (Better Auth) ---
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

// --- Tabelas do Projeto de Viagens ---
export const packages = pgTable(
  'packages',
  {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    price: text('price').notNull(),
    image: text('image').notNull(),
    category: text('category').notNull(),
    duration: text('duration').notNull(),
    featured: boolean('featured').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex('packages_slug_idx').on(table.slug),
  }),
);

export const packageImages = pgTable('package_images', {
  id: serial('id').primaryKey(),
  packageId: integer('package_id')
    .notNull()
    .references(() => packages.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  quote: text('quote').notNull(),
  image: text('image').notNull(),
  destination: text('destination').notNull(),
});

// ==========================================
// ORDERS TABLE / TABELA DE ENCOMENDAS
// ==========================================
// Stores high-level information about each purchase transaction.
// Armazena informações gerais sobre cada transação de compra.
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(), // Identificador único incremental da encomenda
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }), // Relacionamento com o utilizador autenticado
  stripeCheckoutSessionId: text('stripe_checkout_session_id').notNull().unique(), // ID da sessão do Stripe Checkout para evitar registros duplicados
  status: text('status').notNull().default('pending'), // Estado do pagamento ('pending', 'paid', 'failed')
  totalAmount: integer('total_amount').notNull(), // Valor total da compra em cêntimos (ex: 15000 = $150.00)
  createdAt: timestamp('created_at').defaultNow().notNull(), // Data e hora de criação do pedido
});

// ==========================================
// ORDER ITEMS TABLE / TABELA DE ITENS DA ENCOMENDA
// ==========================================
// Stores individual items/packages included in a specific order.
// Armazena os itens/pacotes de viagem comprados em cada encomenda.
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(), // Identificador único do item da encomenda
  orderId: integer('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }), // Chave estrangeira ligando à tabela de encomendas
  packageId: integer('package_id')
    .notNull()
    .references(() => packages.id, { onDelete: 'cascade' }), // Chave estrangeira ligando ao pacote de viagem adquirido
  quantity: integer('quantity').notNull().default(1), // Quantidade adquirida do pacote
  price: integer('price').notNull(), // Preço unitário em cêntimos gravado no momento da compra (evita alterações retroativas)
  createdAt: timestamp('created_at').defaultNow().notNull(), // Data de registo do item
});