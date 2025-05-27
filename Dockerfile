FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    libzip-dev unzip git curl sqlite3 libsqlite3-dev libonig-dev libxml2-dev zip \
    && docker-php-ext-install pdo pdo_sqlite zip \
    && apt-get clean

WORKDIR /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

RUN sed -i '/<Directory \/var\/www\/html\/public>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf || \
    echo "<Directory /var/www/html/public>\nAllowOverride All\n</Directory>" >> /etc/apache2/apache2.conf


RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf


RUN composer install --no-dev --optimize-autoloader \
    && php artisan config:cache \


EXPOSE 80

CMD ["apache2-foreground"]

