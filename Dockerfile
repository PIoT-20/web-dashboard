# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . /app

RUN yarn build


# ---- Production stage ----
FROM nginx:alpine

# remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
