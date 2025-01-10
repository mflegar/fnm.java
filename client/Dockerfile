FROM nginx:mainline-alpine-slim AS github-actions-web

COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY dist /usr/share/nginx/html

EXPOSE 80/tcp
