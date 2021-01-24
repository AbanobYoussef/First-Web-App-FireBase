const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafa(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().Name;
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);

    cafeList.appendChild(li);
}

function Load() {
    db.collection('Cafa').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            renderCafa(doc);
        });
    });
}
Load();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Cafa').add({
        Name: form.name.value,
        city: form.city.value
    });
    form.name.value = '';
    form.city.value = '';
    cafeList.innerHTML = '';
    Load();
});