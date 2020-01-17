# Readme
Orginalkode: https://github.com/tastejs/todomvc/tree/gh-pages/examples/backbone

## Oppgradere til ES6 med parcel
- `npm install parcel-bundler -g`
- `parcel app.js` så bygges filen til `dist/app.js`, og den må inkluderes i html-filen.
- Den filen skal funke som før, men kode av type: `var app = app || {};` må erstattes med: `var app = window.app || {};`. Dette gjelder alle filer som inkluderes med parcel.
- Filer kan da importes i app.js som `import './view/app-view'`, og man kan fjerne script-tagen i index.html.
- Man kan flytte en og en fil av gangen over til `app.js`, og appen vil likvel funke. 
- Alle filer som lastes inn som en del av `app.js` vil ha tilgang til full es6-funksjonalitet. Og man kan gradvis konvertere deler av appen til feks Typescript eller React