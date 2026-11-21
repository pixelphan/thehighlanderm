const photos = [
  ['The cabin at dusk', 'A timber cabin and meadow at dusk'],
  ['Inside the cabin', 'A freestanding tub beside the bedroom'],
  ['The living room', 'The view of the mountains from the cabin sofa'],
  ['The farm & mountains', 'An aerial view of the cabin and the Mission Mountains'],
  ['The Finnish sauna', 'Guests in the private sauna overlooking the fields']
];
const dialog = document.querySelector('dialog');
const large = document.querySelector('#large');
let active = 0;
function showPhoto(index) {
  active = (index + photos.length) % photos.length;
  large.src = 'assets/view-' + (active + 1) + '.jpg';
  large.alt = photos[active][1];
  document.querySelector('#caption').textContent = photos[active][0] + ' · ' + (active + 1) + ' / ' + photos.length;
}
function openPhoto(index) {
  showPhoto(index);
  dialog.showModal();
}
document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => openPhoto(Number(button.dataset.photo) - 1));
});
document.querySelector('.allphotos').addEventListener('click', event => {
  event.preventDefault();
  openPhoto(0);
});
document.querySelector('.close').addEventListener('click', () => dialog.close());
document.querySelector('#prev').addEventListener('click', () => showPhoto(active - 1));
document.querySelector('#next').addEventListener('click', () => showPhoto(active + 1));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showPhoto(active - 1);
  if (event.key === 'ArrowRight') showPhoto(active + 1);
});
const arrival = document.querySelector('[name=check_in]');
const departure = document.querySelector('[name=check_out]');
const today = new Date();
const localDay = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
arrival.min = localDay;
if (arrival.value < localDay) arrival.value = localDay;
function syncDeparture() {
  if (!arrival.valueAsDate) return;
  const nextDay = arrival.valueAsDate;
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  departure.min = nextDay.toISOString().slice(0, 10);
  if (departure.value < departure.min) departure.value = departure.min;
}
arrival.addEventListener('input', syncDeparture);
syncDeparture();
