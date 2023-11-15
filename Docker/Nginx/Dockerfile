FROM nginx:1.25.3

COPY ./Docker/Nginx/templates/nginx.conf.template /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]