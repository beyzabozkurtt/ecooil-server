FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    curl \
    sqlite3 \
    libsqlite3-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    && docker-php-ext-install pdo pdo_sqlite zip \
    && apt-get clean

WORKDIR /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

RUN composer install --no-dev --optimize-autoloader \
    && php artisan config:cache \
    && php artisan migrate --force || true

EXPOSE 80

CMD ["apache2-foreground"]
