const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafa(doc) { // as a for loop
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().Name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Cafa').doc(id).delete();
    });
}

/*db.collection('Cafa').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafa(doc);
    });
});*/


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.name.value != '' && form.city.value != '') {
        db.collection('Cafa').add({
            Name: form.name.value,
            city: form.city.value
        });
        form.name.value = '';
        form.city.value = '';
    }
});


//real time listener

db.collection('Cafa').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderCafa(change.doc);
        } else if (change.type == 'removed') {
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });

});