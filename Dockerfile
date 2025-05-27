FROM php:8.3-apache

# Gerekli paketleri kur ve PHP uzantılarını yükle
RUN apt-get update && apt-get install -y \
    libzip-dev unzip git curl sqlite3 libsqlite3-dev libonig-dev libxml2-dev zip \
    && docker-php-ext-install pdo pdo_sqlite zip \
    && apt-get clean

# Çalışma dizinini belirle
WORKDIR /var/www/html

# Composer'ı resmi composer imajından kopyala
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Proje dosyalarını kopyala
COPY . .

# İzinleri ayarla
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Apache konfigürasyonunda AllowOverride ayarını yap (htaccess için)
RUN echo "<Directory /var/www/html/public>\n    AllowOverride All\n</Directory>" >> /etc/apache2/apache2.conf

# DocumentRoot'u public dizinine yönlendir
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# mod_rewrite modülünü aktif et
RUN a2enmod rewrite

# Apache ServerName ayarını yap (hata önlemek için)
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Composer ile Laravel bağımlılıklarını kur ve config cache oluştur
RUN composer install --no-dev --optimize-autoloader && php artisan config:cache

# Apache 80 portunu expose et
EXPOSE 80

# Apache'yi foreground modda başlat
CMD ["apache2-foreground"]
