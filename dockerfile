FROM node:20.12.2 AS build
WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.5-alpine AS production
COPY --from=build /src/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]