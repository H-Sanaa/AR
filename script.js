
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = 'clk';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
                // decomment the following and add coordinates:
                lat: 35.5778469,
                lng:-5.3843427,
            },
        },
    ];
}

var models = [
    {
        url: './assets/old_airplane/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Air plane',
        rotation: '0 180 0',
    },
    {
        url: './assets/swat_operator/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Swat ',
    },
    // {
    //     url: './assets/dragonite/scene.gltf',
    //     scale: '0.08 0.08 0.08',
    //     rotation: '0 180 0',
    //     info: 'Dragonite, Lv. 99, HP 150/150',
    // },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
