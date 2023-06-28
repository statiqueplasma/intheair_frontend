import { Accordion } from "react-bootstrap";
import { useState } from "react";
import Faq2 from "./Faq2";
import Footer from "./Footer";
import img4 from "./img/4.jpg";
import Navbare from "./Navbare";
import "./Faq.css";

function Faq() {
    const [faqs, setfaqs] = useState([
        {
            question: <>À quoi sert la plateforme Intheair ?</>,
            answer: (
                <>
                    En choisissant Intheair Saas, vous bénéficiez d'une
                    plateforme de pointe pour le stockage, la visualisation et
                    le téléchargement de vos données aériennes. C’est notre clé
                    pour vous offrir une expérience client inégalée, avec des
                    livrables soigneusement traités et présentés de manière
                    organisée et esthétique via un tableau de bord sécurisé
                    dédié à vos projets. Nos rapports synthétiques munies de
                    visualisation graphique vous offrent une vue claire et
                    concise des données collectées, vous permettant de prendre
                    des décisions éclairées en un clin d'œil.<br></br>
                    <br></br>
                    De plus, vous avez la possibilité de télécharger, archiver
                    et consulter vos livrables à tout moment, pour une
                    flexibilité totale.<br></br>
                    <br></br>
                    Personnalisez également vos rapports en utilisant nos
                    filtres pour répondre à vos besoins spécifiques. Avec
                    Intheair Saas, vous avez accès à bien plus qu'une simple
                    solution de visualisation de données, nous sommes votre
                    partenaire de confiance pour maximiser la valeur de vos
                    données aériennes et optimiser vos prises de décision
                </>
            ),

            open: true,
        },
        {
            question: <>Quelles sont vos zones d’interventions?</>,
            answer: (
                <>
                    Grâce à notre vaste réseau de télépilotes agréés répartis
                    dans toute la France, nous sommes en mesure d'intervenir
                    efficacement sur tous vos projets, où que vous soyez. Nos
                    télépilotes sont hautement qualifiés et performants. Ils
                    disposent d'un large éventail de capteurs et de drones de
                    pointe pour répondre à tous vos besoins. Que vous ayez
                    besoin de levées topographiques, de modélisations 3D,
                    d'inspections d'infrastructures, ou d'autres prestations,
                    notre réseau de télépilotes expérimentés est prêt à relever
                    tous les défis. Nous intervenons également en Espagne et
                    bientôt au Maroc.
                </>
            ),
            open: false,
        },
        {
            question: <>Les technologies que vous utilisez ?</>,
            answer: (
                <>
                    Nous utilisons une gamme complète de technologies de pointe
                    pour répondre à vos besoins spécifiques. Nos prestations
                    sont réalisées en utilisant des drones de dernière
                    génération, ainsi que des technologies de télédétection
                    telles que le LIDAR et les satellites. De plus, nous
                    disposons de différents types de capteurs, tels que le RGB,
                    Lidar, Thermographique, Multispectral, pour répondre aux
                    exigences spécifiques de chaque projet. Nous utilisons
                    également des technologies avancées telles que le RTK
                    (Real-Time Kinematic), le GPC (Positionnement par Centimètre
                    Géodésique) et les récepteurs GNSS (Système Mondial de
                    Navigation par Satellites) pour garantir une précision et
                    une fiabilité maximales dans nos prestations. Notre approche
                    technologique est constamment mise à jour pour rester à la
                    pointe des avancées du secteur et offrir à nos clients des
                    solutions innovantes et performantes pour leurs projets.
                </>
            ),
            open: false,
        },

        {
            question: (
                <>Quels sont les types de livrables que vous fournissez ?</>
            ),
            answer: (
                <>
                    En plus des données brutes nous vous fournissons des
                    livrables fruits d'un traitement minutieux par des logiciels
                    CAO/DAO de pointe, ce qui nous permet de vous fournir des
                    résultats hautement précis et exploitables. Nous pouvons
                    vous proposer une large gamme de livrables, tels que des
                    plans topographiques détaillés, des images thermographiques
                    pour l'analyse des infrastructures, des modélisations 3D
                    réalistes et bien d'autres encore.. Notre engagement envers
                    la qualité et l'innovation ajoute en complément de ces
                    livrables des rapports synthétiques précis et esthétiques
                    pour vous permettre d'obtenir une vision globale de vos
                    données, de prendre des décisions éclairées et de
                    communiquer facilement avec vos parties prenantes.
                </>
            ),
            open: false,
        },
        {
            question: (
                <>
                    Quelles sont les options de tarification que vous proposez
                    pour vos services?
                </>
            ),
            answer: (
                <>
                    Nos tarifs sont personnalisés en fonction du type du projet,
                    de sa zone d’intervention, de sa complexité ainsi que des
                    exigences spécifiques de chaque mission. Nous comprenons que
                    chaque dossier est unique et nécessite une approche sur
                    mesure pour garantir la meilleure qualité de service. C'est
                    pourquoi nous évaluons attentivement les besoins de chaque
                    client et établissons des tarifs en conséquence, afin de
                    fournir une solution adaptée à leurs attentes et à leur
                    budget.
                </>
            ),
            open: false,
        },
        {
            question: (
                <>
                    Quelles sont les mesures prises pour garantir la sécurité
                    des données de vos clients?
                </>
            ),
            answer: (
                <>
                    Nous utilisons une infrastructure hybride et évoluée qui
                    nous permet de garantir la disponibilité et la sécurité des
                    données de nos clients, même en cas de coupures ou de
                    menaces externes. *<br></br>
                    <br></br>
                    Nous mettons en place des mesures de redondance, de
                    sauvegarde et de reprise après sinistre pour assurer la
                    continuité des opérations et protéger les données contre
                    toute interruption ou perte indésirable. Notre approche
                    proactive en matière de sécurité nous permet de rester à la
                    pointe des meilleures pratiques de l'industrie et de
                    garantir la confidentialité, l'intégrité et la disponibilité
                    des données de nos clients à tout moment.<br></br>
                    <br></br>
                    Au-delà de notre infrastructure, notre plateforme elle-même
                    est conçue avec des fonctionnalités de sécurité avancées
                    pour protéger les données de nos clients. Nous utilisons des
                    protocoles de chiffrement pour sécuriser les données en
                    transit et au repos, ainsi que des contrôles d'accès stricts
                    pour limiter l'accès aux données uniquement aux utilisateurs
                    autorisés.
                </>
            ),
            open: false,
        },
        {
            question: <>Quelle est la précision des données fournies?</>,
            answer: (
                <>
                    La précision des données fournies par Intheair répond aux
                    besoins de tous nos clients en offrant une marge d'erreur de
                    moins de 5 centimètres pour tous nos livrables. Dans
                    certains cas, nous pouvons même atteindre une précision
                    allant jusqu'à 2 centimètres.<br></br>
                    <br></br>
                    De plus, nous sommes constamment en train d'adopter de
                    nouvelles pratiques et technologies pour améliorer de
                    manière continue notre précision et ainsi garantir des
                    résultats de haute qualité à nos clients.
                </>
            ),
            open: false,
        },
        {
            question: <>Comment puis-je commander vos services?</>,
            answer: (
                <>
                    Pour utiliser nos services, vous pouvez facilement passer
                    par notre plateforme. Vous avez la possibilité de demander
                    un devis en remplissant un formulaire dédié, ou en
                    contactant directement nos commerciaux pour discuter de vos
                    besoins spécifiques et obtenir un devis personnalisé.
                    <br></br>
                    <br></br>
                    Notre équipe commerciale se fera un plaisir de vous assister
                    dans le processus de commande et de vous fournir toutes les
                    informations nécessaires pour bénéficier de nos services.
                </>
            ),
            open: false,
        },
        {
            question: (
                <>
                    Quelles sont les différences entre la captation RGB et
                    Lidar?
                </>
            ),
            answer: (
                <>
                    La captation RGB (Red, Green, Blue) se base sur la capture
                    d'images visibles à partir de capteurs qui enregistrent la
                    lumière réfléchie par la surface terrestre dans les bandes
                    de couleurs rouge, verte et bleue. Elle est généralement
                    utilisée pour des projets qui nécessitent une visualisation
                    en couleurs réelles de la surface terrestre ce qui permet de
                    distinguer les objets et les caractéristiques du paysage de
                    manière visuelle.<br></br>
                    <br></br>
                    Elle peut être adaptée pour des projets tels que la
                    surveillance environnementale, l'agriculture de précision,
                    la gestion des ressources naturelles, la cartographie
                    urbaine et la visualisation de l'aménagement du territoire.
                    <br></br>
                    <br></br>
                    Le Lidar quant à lui, est une technologie de mesure qui
                    utilise des lasers pour mesurer la distance entre un capteur
                    et la surface terrestre. Le Lidar génère des nuages de
                    points tridimensionnels qui contiennent des informations
                    précises sur la topographie du terrain , la hauteur des
                    objets, la végétation et d'autres caractéristiques du
                    paysage. Le Lidar est capable de collecter des données avec
                    une grande précision en termes de distance, ce qui en fait
                    une technique particulièrement adaptée pour des projets
                    nécessitant des données tridimensionnelles précises tels que
                    la modélisation 3D, la cartographie de haute résolution,
                    l'ingénierie civile, la gestion des ressources forestières,
                    la gestion des risques naturels et la planification urbaine.
                </>
            ),
            open: false,
        },
        {
            question: (
                <>
                    Quels avantages pourraient découler de l'utilisation d'un
                    drone dans le contexte de la topographie et de l'arpentage,
                    par rapport à l'utilisation des relevés terrestres plus
                    traditionnels :
                </>
            ),
            answer: (
                <>
                    L'utilisation d'un drone offre plusieurs avantages:<br></br>
                    <br></br>- Rapidité : Les drones peuvent couvrir de grandes
                    surfaces pour collecter des données topographiques,
                    contrairement aux relevés terrestres.<br></br>
                    <br></br>
                    Nous sommes en mesure de capturer et de traiter rapidement
                    les données aériennes pour vos projets de topographie et
                    cartographie. Cela nous permet de vous fournir des résultats
                    rapidement, vous permettant ainsi de gagner du temps dans
                    vos projets.<br></br>
                    <br></br>- Coûts réduits : L'utilisation de drones réduit
                    les coûts globaux d'arpentage et de topographie. Nous
                    proposons par conséquent, des tarifs compétitifs et
                    personnalisés en fonction du type de projet, de la zone
                    d'étude, de la complexité du projet et des exigences du
                    projet. Nous nous efforçons de vous offrir un excellent
                    rapport qualité-prix pour tous nos services.<br></br>
                    <br></br>- Accessibilité des zones difficiles d'accès : Les
                    drones peuvent accéder à des zones difficiles d'accès ou
                    dangereuses, ce qui permet de collecter des données dans des
                    endroits où l'accès peut être limité avec des moyens
                    traditionnels.<br></br>
                    <br></br>- Sécurité accrue : Les drones réduisent les
                    risques pour les opérateurs en évitant les dangers
                    potentiels sur le terrain.<br></br>
                    <br></br>- Flexibilité et polyvalence : Les drones peuvent
                    être utilisés pour une grande variété d’applications
                    topographiques.<br></br>
                    <br></br>
                    Au-delà des avantages de la technologie drone, Intheair
                    dispose également d’un service client de qualité: Notre
                    équipe est disponible pour répondre à vos questions, vous
                    aider dans le processus de commande et vous fournir un
                    support technique si nécessaire.<br></br>
                    <br></br>
                    Nous nous engageons à vous garantir un service de qualité et
                    une expérience positive notamment à travers notre plateforme
                    de visualisation de données évolutive qui vous permet
                    d'accéder facilement à vos données en ligne, à tout moment
                    et de n'importe où.<br></br>
                    <br></br>
                    Vous pouvez les visualiser, les partager avec vos clients et
                    collaborateurs, et prendre des décisions éclairées en
                    fonction des informations et rapports synthétiques fournis
                </>
            ),
            open: false,
        },
    ]);
    const toggleFAQ = (index) => {
        setfaqs(
            faqs.map((faq, i) => {
                if (i === index) {
                    faq.open = !faq.open;
                } else {
                    faq.open = false;
                }

                return faq;
            })
        );
    };

    return (
        <>
            <Navbare />
            <div className="Faq">
                <p className="titre">
                    Questions <span style={{ color: "#674CC0" }}>&</span>{" "}
                    Réponses.
                </p>

                <div className="faqs">
                    {faqs.map((faq, i) => (
                        <Faq2 faq={faq} index={i} toggleFAQ={toggleFAQ} />
                    ))}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Faq;
