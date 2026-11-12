# BookIn

Aplikacja inspirowana modelem rezerwacji online (np. Booksy). Pozwala właścicielowi lokalu skonfigurować usługi i godziny pracy, a klientom — umawiać wizyty przez publiczną stronę rezerwacji.

## Demo

http://bookin.owliedev.pl/

## Opis po polsku

BookIn to projekt edukacyjny / portfolio: panel właściciela (React + Redux) oraz API w Node.js z MongoDB. Po zalogowaniu możesz dodać lokal, ustawić grafik i katalog usług, a następnie osadzić link do strony rezerwacji na swojej witrynie. System sprawdza dostępne terminy z uwzględnieniem istniejących rezerwacji i godzin otwarcia. Po złożeniu rezerwacji wysyłane są powiadomienia e-mail (konfiguracja SMTP po stronie serwera).

### Kroki dla właściciela

1. Utwórz konto i zaloguj się.
2. Dodaj lokal (np. salon fryzjerski) i wybierz go z listy.
3. W konfiguracji ustaw godziny pracy oraz usługi.
4. Skopiuj link z zakładki **API / LINKS** i umieść go na stronie (przycisk, baner itp.).

Klient korzysta z publicznej strony rezerwacji bez logowania do panelu.

## English

This project is modeled on online booking platforms such as Booksy.

The application lets customers book an appointment for a given service. Business owners manage places, working hours, and services; clients use a dedicated booking page that respects availability and business hours. Confirmation e-mails are sent when SMTP is configured on the server.

### Usage (owner)

1. Create your profile.
2. Add your place and select it from the list.
3. Configure working hours and your service catalog.
4. Copy the booking page link from the **API / LINKS** tab and embed it on your website.

## Struktura repozytorium

| Katalog | Opis |
|---------|------|
| `client/` | Frontend React (Create React App), Redux, Sass, Axios |
| `server/` | API Express, MongoDB, JWT, Nodemailer |

## Technologie

**Klient:** React, Redux, Sass, Axios, FullCalendar (kalendarz rezerwacji)

**Serwer:** Node.js, Express, MongoDB (Mongoose), JSON Web Token, Nodemailer (`dotenv` — zmienne w pliku `.env` w `server/`)

## Uruchomienie lokalne (skrót)

1. MongoDB oraz plik `server/.env` (port, `DB_URL`, `SECRET_PHRASE`, SMTP itd.).
2. W `server/`: `npm install` → start aplikacji Express (np. `node app.js`).
3. W `client/`: skopiuj `config.js` według wzorca z repozytorium (plik jest w `.gitignore`), `npm install` → `npm start`.

## Uwagi

- Projekt demonstracyjny — nie jest gotowym produktem SaaS.
- Konfiguracja klienta (`client/src/config.js`) i sekrety serwera nie powinny trafiać do repozytorium.

## Autor

Wojciech Sowiński — [owliedev.pl](https://owliedev.pl/)
