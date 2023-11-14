#!/bin/bash
set -e

# Подставляем переменные окружения в шаблон конфигурации
envsubst < /etc/nginx/conf.d/nginx.conf > /etc/nginx/conf.d/default.conf
chmod +x /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
