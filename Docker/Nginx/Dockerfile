FROM nginx:1.25.3

# COPY ./Docker/Nginx/templates/nginx.conf.template /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["/bin/sh" , "-c" , "envsubst < templates/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
# CMD ["nginx", "-g", "daemon off;"]