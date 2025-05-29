# Stage 1:Build the React app

FROM node:lts-alpine AS build
WORKDIR /app

# Enable Corepack (required for Yarn 4+)
RUN corepack enable
RUN corepack prepare yarn@4.6.0 --activate

# Copy package.json and yarn.lock before installing dependencies
# Copy config and Yarn dependencies
COPY package.json yarn.lock .yarnrc.yml ./

COPY .yarn/ .yarn/

# Install dependencies using Yarn 4
RUN yarn install --immutable

COPY . .

# Build the React app
RUN yarn build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

# Add custom Nginx config template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Use envsubst to substitute environment variables and start nginx
CMD ["sh", "-c", "envsubst '$$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]