# Stage 1: Build the Node.js app
FROM node:lts-alpine AS build

# Install system packages needed for native modules (like bcrypt)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Enable Corepack (required for Yarn 4+)
RUN corepack enable
RUN corepack prepare yarn@4.6.0 --activate

# Copy package files and Yarn configuration
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ .yarn/

# Install dependencies using Yarn 4
RUN yarn install --immutable

# Copy the rest of the app
COPY . .

# Build Node.js app
RUN yarn build

# Stage 2: Production runtime
FROM node:lts-alpine AS production

# Install system packages for runtime and health checks
RUN apk add --no-cache dumb-init curl

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# Enable Corepack for production
RUN corepack enable
RUN corepack prepare yarn@4.6.0 --activate

# Copy package files and install only production dependencies
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ .yarn/

# Install production dependencies only
RUN yarn install --immutable --production && yarn cache clean --all

# Copy built application from build stage
COPY --from=build --chown=nextjs:nodejs /app/dist ./dist

# Switch to non-root user
USER nextjs

# Port will be provided by ECS task definition
CMD ["dumb-init", "node", "dist/app.js"]