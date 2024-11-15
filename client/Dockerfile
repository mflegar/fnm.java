FROM nginx:mainline-alpine-slim

EXPOSE 80/tcp

COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY dist /usr/share/nginx/html
