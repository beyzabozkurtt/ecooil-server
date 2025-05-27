# Laravel için resmi PHP imajını kullanıyoruz
FROM php:8.2-apache

# Gerekli sistem paketlerini yükle
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    curl \
    sqlite3 \
    && docker-php-ext-install zip pdo pdo_sqlite

# Composer kurulumu
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Apache için Laravel public dizinini ayarla
WORKDIR /var/www/html

# Laravel dosyalarını kopyala
COPY . .

# Laravel için gerekli izinleri ver
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Laravel yapılandırma ve önbellek işlemleri
RUN composer install --no-dev --optimize-autoloader \
    && php artisan config:cache \
    && php artisan storage:link || true

EXPOSE 80

CMD ["apache2-foreground"]
