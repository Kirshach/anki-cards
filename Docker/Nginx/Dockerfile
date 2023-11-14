FROM nginx:latest

COPY ./entrypoint.sh /entrypoint.sh
COPY ./Docker/Nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
RUN chmod +x /entrypoint.sh

EXPOSE 80 443
ENTRYPOINT ["/entrypoint.sh"]
