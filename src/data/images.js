const images = [
    {
        id: "1-1",
        src: '/images/image1.jpg',
        title: 'A bloom in the eye of the storm',
        description_1: "Dans l'œil du cyclone, là où tout semble sombrer dans le chaos, une fleur fragile mais résiliente s'épanouit. Son éclat contraste avec la fureur des éléments, défiant vents et pluies déchaînées. Elle incarne la beauté au milieu du tumulte, la force tranquille face à l’adversité. Ses pétales vibrent sous les assauts du vent, mais elle demeure, enracinée dans l’instant, symbole d’un espoir indomptable.",
        description_2: "Dans cette danse entre destruction et renouveau, elle rappelle que même au cœur des tempêtes les plus violentes, la vie trouve toujours un chemin. Un hommage à la persévérance et à la lumière qui existe même dans les moments les plus sombres."
    },
    {
        id: "1-2",
        src: '/images/image2.jpg',
        title: 'Image 2',
        description_1: "Dans l'œil du cyclone, là où tout semble sombrer dans le chaos, une fleur fragile mais résiliente s'épanouit. Son éclat contraste avec la fureur des éléments, défiant vents et pluies déchaînées. Elle incarne la beauté au milieu du tumulte, la force tranquille face à l’adversité. Ses pétales vibrent sous les assauts du vent, mais elle demeure, enracinée dans l’instant, symbole d’un espoir indomptable.",
        description_2: "Dans cette danse entre destruction et renouveau, elle rappelle que même au cœur des tempêtes les plus violentes, la vie trouve toujours un chemin. Un hommage à la persévérance et à la lumière qui existe même dans les moments les plus sombres."
    },
    {
        id: "1-3",
        src: '/images/image3.jpg',
        title: 'Image 3',
        description_1: "Dans l'œil du cyclone, là où tout semble sombrer dans le chaos, une fleur fragile mais résiliente s'épanouit. Son éclat contraste avec la fureur des éléments, défiant vents et pluies déchaînées. Elle incarne la beauté au milieu du tumulte, la force tranquille face à l’adversité. Ses pétales vibrent sous les assauts du vent, mais elle demeure, enracinée dans l’instant, symbole d’un espoir indomptable.",
        description_2: "Dans cette danse entre destruction et renouveau, elle rappelle que même au cœur des tempêtes les plus violentes, la vie trouve toujours un chemin. Un hommage à la persévérance et à la lumière qui existe même dans les moments les plus sombres."
    },
    {
        id: "1-4",
        src: '/images/image4.jpg',
        title: 'Image 44',
        description_1: "Dans l'œil du cyclone, là où tout semble sombrer dans le chaos, une fleur fragile mais résiliente s'épanouit. Son éclat contraste avec la fureur des éléments, défiant vents et pluies déchaînées. Elle incarne la beauté au milieu du tumulte, la force tranquille face à l’adversité. Ses pétales vibrent sous les assauts du vent, mais elle demeure, enracinée dans l’instant, symbole d’un espoir indomptable.",
        description_2: "Dans cette danse entre destruction et renouveau, elle rappelle que même au cœur des tempêtes les plus violentes, la vie trouve toujours un chemin. Un hommage à la persévérance et à la lumière qui existe même dans les moments les plus sombres."
    },
    {
        id: "2-1",
        src: '/images/image5.jpg',
        title: 'Image 4',
        description_1: "Dans l'œil du cyclone, là où tout semble sombrer dans le chaos, une fleur fragile mais résiliente s'épanouit. Son éclat contraste avec la fureur des éléments, défiant vents et pluies déchaînées. Elle incarne la beauté au milieu du tumulte, la force tranquille face à l’adversité. Ses pétales vibrent sous les assauts du vent, mais elle demeure, enracinée dans l’instant, symbole d’un espoir indomptable.",
        description_2: "Dans cette danse entre destruction et renouveau, elle rappelle que même au cœur des tempêtes les plus violentes, la vie trouve toujours un chemin. Un hommage à la persévérance et à la lumière qui existe même dans les moments les plus sombres."
    },
    {
        id: "2-2",
        src: '/images/image6.jpg',
        title: 'Image 5',
        description_1: "Dans l'œil du cyclone, là où tout semble sombrer dans le chaos, une fleur fragile mais résiliente s'épanouit. Son éclat contraste avec la fureur des éléments, défiant vents et pluies déchaînées. Elle incarne la beauté au milieu du tumulte, la force tranquille face à l’adversité. Ses pétales vibrent sous les assauts du vent, mais elle demeure, enracinée dans l’instant, symbole d’un espoir indomptable.",
        description_2: "Dans cette danse entre destruction et renouveau, elle rappelle que même au cœur des tempêtes les plus violentes, la vie trouve toujours un chemin. Un hommage à la persévérance et à la lumière qui existe même dans les moments les plus sombres."
    },
    {
        id: "2-3",
        src: '/images/image7.jpg',
        title: 'Image 6',
        description_1: "Dans l'œil du cyclone, là où tout semble sombrer dans le chaos, une fleur fragile mais résiliente s'épanouit. Son éclat contraste avec la fureur des éléments, défiant vents et pluies déchaînées. Elle incarne la beauté au milieu du tumulte, la force tranquille face à l’adversité. Ses pétales vibrent sous les assauts du vent, mais elle demeure, enracinée dans l’instant, symbole d’un espoir indomptable.",
        description_2: "Dans cette danse entre destruction et renouveau, elle rappelle que même au cœur des tempêtes les plus violentes, la vie trouve toujours un chemin. Un hommage à la persévérance et à la lumière qui existe même dans les moments les plus sombres."
    },
    {
        id: "3-1",
        src: '/images/image1.jpg',
        title: 'Image 7',
        description_1: "Dans l'œil du cyclone, là où tout semble sombrer dans le chaos, une fleur fragile mais résiliente s'épanouit. Son éclat contraste avec la fureur des éléments, défiant vents et pluies déchaînées. Elle incarne la beauté au milieu du tumulte, la force tranquille face à l’adversité. Ses pétales vibrent sous les assauts du vent, mais elle demeure, enracinée dans l’instant, symbole d’un espoir indomptable.",
        description_2: "Dans cette danse entre destruction et renouveau, elle rappelle que même au cœur des tempêtes les plus violentes, la vie trouve toujours un chemin. Un hommage à la persévérance et à la lumière qui existe même dans les moments les plus sombres."
    },
    {
        id: "3-2",
        src: '/images/image1.jpg',
        title: 'Image 8',
        description_1: "Dans l'œil du cyclone, là où tout semble sombrer dans le chaos, une fleur fragile mais résiliente s'épanouit. Son éclat contraste avec la fureur des éléments, défiant vents et pluies déchaînées. Elle incarne la beauté au milieu du tumulte, la force tranquille face à l’adversité. Ses pétales vibrent sous les assauts du vent, mais elle demeure, enracinée dans l’instant, symbole d’un espoir indomptable.",
        description_2: "Dans cette danse entre destruction et renouveau, elle rappelle que même au cœur des tempêtes les plus violentes, la vie trouve toujours un chemin. Un hommage à la persévérance et à la lumière qui existe même dans les moments les plus sombres."
    },
    {
        id: "3-3",
        src: '/images/image1.jpg',
        title: 'Image 9',
        description_1: "Dans l'œil du cyclone, là où tout semble sombrer dans le chaos, une fleur fragile mais résiliente s'épanouit. Son éclat contraste avec la fureur des éléments, défiant vents et pluies déchaînées. Elle incarne la beauté au milieu du tumulte, la force tranquille face à l’adversité. Ses pétales vibrent sous les assauts du vent, mais elle demeure, enracinée dans l’instant, symbole d’un espoir indomptable.",
        description_2: "Dans cette danse entre destruction et renouveau, elle rappelle que même au cœur des tempêtes les plus violentes, la vie trouve toujours un chemin. Un hommage à la persévérance et à la lumière qui existe même dans les moments les plus sombres."
    },
]

export default images;