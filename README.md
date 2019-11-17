# Populairy - Pop-up Event Organizer

> This app is at the beginning and constantly a work-in-progress.

🍿🥒🍅🥕🥮🍕🍰🥤🥢🥣🍱🌮🥐🥂📚🍵

**Populairy** is a pop-up event organizer to reduce the underlying work of pop-ups.

## Background

Pop-ups became very popular worldwide since a few years and are an effective way for event hosts to save costs and to grow their networks and outreach. Pop-ups are enabled as a selling point within an existing event and/or space. While self-made professionals rely on a regular income for them and their famillies pop-ups are also a great way for initiatives/groups to collaborate in order to raise awareness and donations for a good cause.

When runnning a pop-up usually event hosts face challenges on:

- Venue Search => send inquiries, ask friends and partners, book venues
- Equipment / Products => build partnerships with suppliers to rent, buy or organize equipment, etc.
- Logistics => plan staff, delivery and pick-up
- Networking => research, handle feedback, outreach
- Marketing => word-of-mouth, social media, mailing lists, kitchen table

### Event types:

Examples

- Barber Shop
- Book Store
- Drinks
- Flash Tattoo
- Food
- Massage
- Tarot Reading
- Misc

## Features

- [ ] Event calendar
- [ ] Checklist
- [ ] Addressbook
- [ ] Emailing
- [ ] Newsletter
- [ ] Solidarity pot (Buy 2 and donate 1)

## Roadmap

- [Barber Shop](docs/BARBERSHOP.md)

## Getting started

1. Select the week you want to setup, e.g. `week-4` and change into that directory.

```shell
$ cd week-4/
```

2. Install all npm packages

```shell
$ npm install
```

2. Copy `env.SAMPLE` and rename it to `.env` and make sure the `.env` file is listed in `.gitignore`.

```shell
$ cp env.SAMPLE .env
```

3. Start up the server:

```shell
# from the root in dev mode with nodemon
$ npm run dev

# Dependent on your .env configs for NODE_ENV
$ npm start
```

4. Use prettier to format your code:

```shell
$ npm run format

# Prettify .pug files
$ ./node_modules/.bin/prettier --write "**/*.pug"
```