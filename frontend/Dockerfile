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

# Test commit comment

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Add custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]