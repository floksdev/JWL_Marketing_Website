import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionAlterne from "@/components/reusable/SectionAlterne";
import SectionPourquoiIndependant from "@/components/marketing-digital/SectionPourquoiIndependant";
import PacksPolaroidSection from "@/components/reusable/PacksPolaroidSection";

const packs = [
  { title: "Pack visible",  href: "/produits/social-visible",  quote: "“Rédigez, optimiser, briller en ligne”.", src: "https://www.dropbox.com/scl/fi/6sc6cxwukjaqz6wfxw6f0/1-redaction-web-jwl-marketing.png?rlkey=q4vnd1vmvrajvr7fido3f6hi4&st=o4tev2jp&raw=1" },
  { title: "Pack connecté", href: "/produits/social-connecte", quote: "“Engagez votre audience et créez du lien”.", src: "https://www.dropbox.com/scl/fi/3q0msqug01bdmgtk5vqu9/2-communication-marketing-jwl.png?rlkey=frz0zs91pldl8ux4dxqgk2p7j&st=hriyl005&raw=1" },
  { title: "Pack Premium",  href: "/produits/social-premium",  quote: "“Soyez vus, et marquez les esprits”.",   src: "https://www.dropbox.com/scl/fi/b5veodejnz5p1kpsf5ud5/3-social-media-jwl-marketing.png?rlkey=00e49zy3q1y98ypm7ywpsz62f&st=fcomanpo&raw=1" },
];

const singlePack = [
  { title: "Pack Refonte Web",  href: "/produits/refonte-web", src: "https://www.dropbox.com/scl/fi/1nk5fc2g85ayggmn62wy0/8-arborescence-web-seo-jwl-marketin.png?rlkey=q6i5l0828azec6po9awgywzo4&st=b7gjqmab&raw=1" },
];

const brandingPacks = [
    { title: "Logo Essentiel",  href: "/produits/logo-essentiel",  quote: "“Votre identité en toute simplicité”.", src: "https://www.dropbox.com/scl/fi/918t4ai9k57cank4xquqx/1.png?rlkey=3k4c7fykbmkz13p1mzrsck8pc&st=admub9gx&raw=1" },
    { title: "Logo Impact",  href: "/produits/logo-impact",  quote: "“Pour marquer les esprits”.", src: "https://www.dropbox.com/scl/fi/aaw9ncadrota3nb8pd9b4/2.png?rlkey=3vlmamvjc7hz1frv91azf2n3l&st=tlzf43cx&raw=1" },
    { title: "Logo Excellence",  href: "/produits/logo-excellence",  quote: "“Votre image sublimée avec élégance”.", src: "https://www.dropbox.com/scl/fi/z1gqqujjqnv5tz4ldwfay/3.png?rlkey=rm3m002yxet5b9j836cox31o0&st=yfiox803&raw=1" },
];

const AuditPacks = [
    { title: "Starter Seo",  href: "/produits/starter-seo",  quote: "“Commencez à être vu”.", src: "https://www.dropbox.com/scl/fi/8xhmtic94z389orbgkxe4/1-referencement-naturel-starter-seo-jwl-marketing.png?rlkey=n40qkbmifpn04ajddxkh2ir7d&st=bkd1iaqg&raw=1" },
    { title: "Booster Seo",  href: "/produits/booster-seo",  quote: "“Votre présence est plus vivante que jamais”.", src: "https://www.dropbox.com/scl/fi/v979kyi8ugzos05yw88xk/2-referencement-naturel-booster-seo-jwl-marketing.png?rlkey=9q00fj9obw424n9is3cpphxv3&st=tga03sqr&raw=1" },
    { title: "Seo Local",  href: "/produits/seo-local",  quote: "“Dominez votre quartier”.", src: "https://www.dropbox.com/scl/fi/mi15vn60zj25xhngn1tcv/3-referencement-seo-local-jwl-marketing.png?rlkey=uvtts0e5z1l85xr4ywlcthsst&st=m4vni93m&dl=0" },
];


const GMBPack = [
    { title: "Google My Business",  href: "/produits/gmb",  src: "https://www.dropbox.com/scl/fi/fp44mgf0106v8hby8s598/google-gmb-jwl-marketing.png?rlkey=92f5j101g36sv99budili4774&st=hmsbasuv&raw=1" },
];

const DevCompacks = [
    { title: "Pack Décollage",  href: "/produits/pack-decollage",  quote: "“Plus de contrats, plus de résultats”.", src: "https://www.dropbox.com/scl/fi/v3c8yoh6xy1sk9eb9sjwd/developpement-commercial-b2b-wl-marketing-paca.png?rlkey=74sl37c8pl3rwu1y94vl4t2rb&st=dxu63fji&raw=1" },
    { title: "Pack Salon",  href: "/produits/pack-salon",  quote: "“Là où vos clients vous attendent, soyez présents”.", src: "https://www.dropbox.com/scl/fi/mwpuicoycjdwz1coz4bkv/developpement-commercial-b2b-salon-aix-marseille.png?rlkey=bs5iqkfn37tkq6j357ari9fmq&st=fioa40z5&raw=1" },
    { title: "Pack Formation",  href: "/produits/pack-formation",  quote: "“Développez vos talents, transformez vos compétences”.", src: "https://www.dropbox.com/scl/fi/zsmqeq23j5ij613f5wx2g/formation-aix-marseille-adulte-jwl-marketing.png?rlkey=oqh6lbiw4mq1erswmpa9qe8iy&st=l25zso8s&raw=1" },
];



export default function MarketingDigital() {
  return (
    <main className="min-h-screen text-neutral-900">

        <Header/>

        <Hero/>

        <SectionAlterne
            id="marketing-digital"
            title="Le marketing digital, c’est quoi ?"
            level={1}
            imageSrc="https://dl.dropboxusercontent.com/scl/fi/5yrx5ued7z3x6j5bq655n/1-marketing-digital-cest-quoi-jwl-marketing.png?rlkey=v1nfarlxn5ktnr7n7f4cu8qo8&raw=1"
            imageAlt="Jodie qui réfléchit"
            imageSide="right"
            stars={[
                { style: { top: -24, right: -12 }, size: 130 },             
                { style: { bottom: -32, right: -48 }, size: 72, color: "#D6B26E" },
                { style: { top: 40, left: -50 }, size: 40, color: "#EBD9AE" , className: "-z-10" },
            ]}
            >
            <p>En tant que consultante en marketing digital, je vous accompagne pour transformer votre
                stratégie en résultats concrets. Ainsi, vous générez du trafic qualifié, convertissez vos
                prospects et fidélisez vos clients sans toucher au code de votre site internet.<br/><br/>
                Pour cela, je définis vos cibles, sélectionne les canaux adaptés et crée des actions marketing
                concrètes : campagnes social media, e-mailing ciblé, contenus SEO optimisés, marketing
                automation… chaque levier renforce vos performances et améliore votre taux de conversion.<br/><br/>
                De plus, je collabore avec vos spécialistes techniques ou développeur de stratégie marketing
                pour que chaque action soit intégrée. Grâce à Google Analytics et des indicateurs fiables, vous
                savez toujours ce qui fonctionne et comment améliorer vos campagnes.<br/><br/>
                En résumé, ma mission consiste à transformer votre marketing digital en moteur stratégique,
                qui attire, engage et fidélise vos clients tout en renforçant votre image de marque et votre
                notoriété digitale.
            </p>
        </SectionAlterne>
        <SectionPourquoiIndependant/>

        <SectionAlterne
            id="cibles"
            title="Comment définir les cibles en marketing digital ?"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/pki4k4bo35plh23vsczft/2-marketing-digital-cibles-jwl-marketing.png?rlkey=pgc31s8uh0jdcsw7c0ktmj0lz&st=y8rlvjzo&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="right"
            starPreset="leftHero"
            >
            <p>
                D’abord, définir vos cibles est la première étape cruciale dans toute stratégie marketing digitale. Il s’agit de segmenter précisément votre audience pour adapter votre communication à leurs besoins spécifiques et maximiser l’efficacité de votre stratégie web. Ainsi, le ciblage peut se faire selon plusieurs critères : démographiques, géographiques, comportementaux ou psychographiques.
                <br/><br/>
                Cette segmentation optimise chaque action marketing en permettant de personnaliser les messages, choisir les canaux de communication appropriés et allouer efficacement le budget publicitaire. En comprenant les attentes et les comportements de vos cibles, vous pouvez créer des campagnes plus pertinentes qui résonnent avec votre audience, augmentant ainsi le taux de conversion et la fidélisation client.
                <br/><br/>
                Cependant, sans identité visuelle forte et cohérente, même la meilleure stratégie de ciblage peut perdre de son impact. Une image de marque bien définie renforce la reconnaissance et la confiance auprès de vos cibles, facilitant l’engagement et la conversion. En résumé, une définition claire des cibles combinée à une identité visuelle solide est essentielle pour réussir dans le marketing digital.
            </p>
        </SectionAlterne>

        <SectionAlterne
            id="logo"
            title="Créer un logo efficace pour renforcer votre image de marque"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/3y3ixj3le7f4upaaoh9i0/3-referencement-seo-site-web-marketing-jwl-marketing.png?rlkey=tu3eez02iw1cwjtksjrbqsqto&st=csjkbr0s&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="left"
            starPreset="leftHero"
            >
            <p>
                Imaginez un logo qui ne se contente pas d’être joli : il raconte votre histoire dès le premier regard. Chaque
                ligne, chaque couleur et chaque symbole est pensé pour refléter vos valeurs et l’identité visuelle unique de
                votre entreprise.
                <br/><br/>
                Je m’inspire de votre parcours, de vos ambitions et de votre univers pour que votre logo devienne un
                véritable atout stratégique de branding, capable d’
                accrocher vos clients et de renforcer votre image de
                marque. Grâce à ma tablette de création digitale, je peux faire des retouches précises, explorer différentes
                versions et ajuster chaque détail pour qu
                ’il corresponde parfaitement à vos besoins. Votre logo sera utilisable
                partout : sur votre site Internet, vos campagnes e-commerce, vos landing pages, vos newsletters ou vos
                supports imprimés. Il devient ainsi un levier concret pour votre stratégie marketing digitale et votre
                branding, accrocheur et mémorable.
                <br/><br/>
                Chaque création est livrée dans tous les formats essentiels : PNG, SVG, PDF, EPS… Cela vous permet de
                l’utiliser librement pour le web, le print et toutes vos actions marketing.
                En intégrant le SEO et le webmarketing dès la création, votre logo participe à une stratégie efficace de
                branding, en cohérence avec vos campagnes AdWords, mailing, e-marketing et autres leviers webmarketing.
                Il devient un élément pratique et concret de votre identité visuelle, en lien avec votre transformation
                digitale et vos objectifs de visibilité et d’
                engagement.
                <br/><br/>
                Enfin, chaque prestation inclut les droits d’
                auteur, vous garantissant une utilisation libre et exclusive. Le
                prix valorise donc la créativité, le sur-mesure et votre identité unique.
                <br/><br/>
                Et si vous souhaitez aller plus loin, vous pouvez <Link href="/contact" className="text-amber-500 font-bold underline decoration-amber-500 underline-offset-2">cliquer ici</Link> pour demander un devis ou contacter mes
                services pour créer des objets publicitaires en relation avec votre logo ou préparer vos supports pour les
                salons. Avec ce logo, vous n
                ’
                avez pas seulement un dessin : vous obtenez un véritable outil marketing et de
                branding, pensé pour séduire, engager et transformer vos prospects en clients fidèles.
            </p>
        </SectionAlterne>

        <PacksPolaroidSection iconSrc={"/assets/notfound.jpg"} title={"Identité visuelle et Branding"} packs={brandingPacks}/>

        <SectionAlterne
            id="stratégie"
            title="La stratégie aux multiples canaux"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/4bbuk5tdmbhjdkvccy9vj/4-marketing-digital-strat-gies-canaux-jwl-marketing.png?rlkey=1ve08qn19pl355aye499jfl4g&st=dsqfgf2b&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="left"
            starPreset="leftHero"
            >
            <p>
                Pour commencer, dans une stratégie de marketing digital efficace, choisir les bons canaux est
                fondamental pour atteindre vos segments cibles et générer un retour sur investissement optimal. En
                effet, chaque canal possède des spécificités pour booster la relation client et amplifier la visibilité de
                votre marque. On parle ici des canaux classiques : social media (Facebook, LinkedIn, Instagram), e-
                mailing, SEO, SEA, marketing d’influence.
                <br/><br/>
                L’objectif consiste à créer un mix de canaux pertinents qui dialoguent entre eux pour maximiser
                l’impact et développer votre marketing sur internet. Par exemple, un ciblage précis sur les réseaux
                sociaux, couplé à une campagne e-mailing calibrée, génère un trafic qualifié vers votre site internet et
                renforce la relation client. Ainsi, cette communication coordonnée permet de fidéliser les clients
                existants tout en attirant de nouveaux prospects et en améliorant votre stratégie marketing globale.
                <br/><br/>
                En outre, le marketing automatique libère du temps en automatisant relances et segmentation des
                contacts, offrant une solution performante pour un marketing B2B et B2C efficace. Pour conclure,
                suivre vos performances via Google Analytics permet d’
                ajuster la stratégie et de rester ultra
                compétitif. Enfin, intégrer ces canaux dans une stratégie digitale complète garantit une cohérence
                parfaite et maximise votre impact sur vos prospects et clients, tout en affinant votre stratégie et en
                utilisant des outils marketing efficaces.
            </p>
        </SectionAlterne>

        <SectionAlterne
            id="marketing-digital"
            title="Quels médias choisir pour une stratégie marketing efficace ?"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/574gjli68hqclyo0uwor9/5-developpement-commercial-b2b-wl-marketing.png?rlkey=e765gpje2uafc8ik78krea0m8&st=cfff5glf&raw=1"
            imageAlt="Jodie qui réfléchit"
            imageSide="right"
            stars={[
                { style: { top: -24, right: -12 }, size: 130 },             
                { style: { bottom: -32, right: -48 }, size: 72, color: "#D6B26E" },
                { style: { top: 40, left: -50 }, size: 40, color: "#EBD9AE" , className: "-z-10" },
            ]}
            >
            <p>Tout d’abord, le choix des médias complète la sélection des canaux et constitue un levier
                essentiel de votre marketing digital.
                <br/><br/>
                Le média est le support par lequel passe votre communication : blogs, vidéos, podcasts,
                newsletters ou publicités en ligne. Utiliser les bons médias vous permet de toucher
                efficacement votre cible tout en renforçant votre image de marque et en appliquant une
                véritable stratégie marketing. Par exemple, le content marketing vidéo capte l’attention
                sur les réseaux sociaux et améliore l’expérience client, tandis que les podcasts séduisent
                une audience engagée, souvent en recherche d’
                expertise.
                <br/><br/>
                La newsletter reste un outil puissant du mailing pour entretenir la relation et lancer des
                campagnes promotionnelles ciblées. Chaque média demande une adaptation du message et
                du format pour rester pertinent et impactant. Ainsi, diversifier votre présence digitale
                renforce la cohérence et la visibilité de votre stratégie marketing digitale. En combinant
                plusieurs médias, vous augmentez vos chances de générer du trafic qualifié, capter de
                nouveaux clients et fidéliser votre audience.
                <br/><br/>
                Enfin, le média est le porte-voix de votre marketing digital et de votre stratégie de
                contenu, à manier avec soin pour maximiser la performance de vos campagnes et atteindre
                vos objectifs marketing, tout en améliorant votre e-réputation et votre visibilité en ligne.
            </p>
        </SectionAlterne>

        <PacksPolaroidSection iconSrc="/assets/notfound.jpg" title="Social Média" packs={packs}/>

        <SectionAlterne
            id="refonteweb"
            title="Refonte web et création d’arborescence:
            Structurez votre présence en ligne avec JWL
            Marketing"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/cf4mydhx9cj0ruyt2sh06/6-refonte-siteweb-jwl-marketing-aix-en-provence.png?rlkey=m8zdn5fel9dtbzb475c2y3s5x&st=a5otikyc&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="right"
            starPreset="rightHero"
            >
            <p>
                Chaque site web mérite une structure pensée et efficace. Ensuite, optimisez votre arborescence pour
                guider vos visiteurs et améliorer l’expérience utilisateur. JWL Marketing propose un pack de
                refonte web complet, centré sur la création d’
                arborescence, avec ou sans intégration SEO selon vos
                besoins.
                <br/><br/>
                Par conséquent, définissez vos objectifs marketing et identifiez vos cibles pour construire un plan
                cohérent et stratégique. Puis, organisez vos pages de manière logique afin que les visiteurs accèdent
                rapidement à l’information essentielle et que les moteurs de recherche reconnaissent la pertinence
                de votre contenu.
                <br/><br/>
                De plus, exploitez mes créations d’images IA pour enrichir visuellement vos pages et capter
                l’attention de vos prospects. Ainsi, chaque section reflète votre image de marque, votre stratégie
                marketing digitale et vos actions marketing ciblées, maximisant vos chances de générer du trafic
                qualifié et améliorer sa stratégie globale. En intégrant social media, marketing automation, content
                marketing et e-mailing, vous offrez une expérience client complète et fluide.
                <br/><br/>
                En conclusion, JWL Marketing transforme votre site web en véritable outil marketing capable
                d’attirer des clients, fidéliser votre audience et optimiser votre retour sur investissement, tout en
                permettant de mettre en place votre stratégie et de construire une stratégie digitale efficace.
                N’hésitez plus, <Link href={"/constact"} className="text-amber-500 font-bold underline decoration-amber-500 underline-offset-2">contactez moi</Link>, j’ai aussi un collaborateur qui peut vous aider à le créer.
            </p>
        </SectionAlterne>

        <SectionAlterne
            id="créationsite"
            title="Créez un site performant et attractif avec JWL Marketing"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/1d91seibm8je1ky7cttmn/7-ia-jwl-marketing.png?rlkey=7nn9e74cd19h8wsoomlksjbz9&st=qgsa9ya9&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="left"
            starPreset="leftHero"
            >
            <p>
                D’abord, visualisez votre futur site web comme un levier puissant de marketing digital et e-
                commerce. Ensuite, mettez en œuvre une arborescence claire, pensée pour les segments de votre
                audience et les parcours clients. Ainsi, facilitez l’
                accès à vos produits ou services tout en renforçant
                votre image de marque.
                <br/><br/>
                Par conséquent, adaptez la création visuelle grâce à des images IA personnalisées pour capter
                l’attention et générer un engagement optimal.
                <br/><br/>
                Ensuite, considérez la pertinence de chaque page et sa contribution à votre stratégie marketing
                globale : mix, canaux, médias et actions marketing deviennent des outils concrets pour atteindre vos
                objectifs. De plus, exploitez les mots-clés stratégiques pour améliorer la visibilité même si un SEO
                complet nécessite un accompagnement sur devis.
                <br/><br/>
                Enfin, optimisez le parcours client et les interactions pour transformer chaque visiteur en prospect
                ou client fidèle. Par ailleurs, JWL Marketing guide l’intégration des fondamentaux du marketing
                digital B2B, du webmarketing et de la communication digitale.
                <br/><br/>
                En conclusion, après avoir posé les bases solides de votre arborescence et de votre visuel, la suite
                logique consiste à travailler le SEO géolocalisé et la rédaction web pour rendre votre site
                esthétique, fonctionnel et performant et réussir sa stratégie digitale sur internet.
            </p>
        </SectionAlterne>

        <PacksPolaroidSection  packs={singlePack}/>

        <SectionAlterne
            id="visibilité"
            title="Comment améliorer votre visibilité en ligne ?"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/io0udvls71ts6lzzlqa92/9-seo-referencement-jwl-marketing.png?rlkey=26gsli85ed5c1ea9kzsaspzt2&st=5rwayj3r&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="left"
            starPreset="leftHero"
            >
            <p>
                Le référencement naturel classique (SEO) repose toujours sur des piliers solides : en effet, des
                mots-clés judicieusement placés dans vos titres (H1, H2…), une métadescription optimisée, une
                arborescence claire, des liens internes cohérents et une vitesse de chargement rapide forment la
                base indispensable pour que Google indexe et classe correctement votre site.
                <br/><br/>
                Cependant, avec l’émergence du GEO (Generative Experience Optimization), les règles
                évoluent légèrement. Concrètement, le GEO peut être considéré comme une version augmentée
                et personnalisée du SEO : les fondations restent les mêmes, mais l’IA s’appuie sur elles pour
                formuler des réponses directes aux questions que se posent les internautes.
                <br/><br/>
                Ainsi, il devient nécessaire de penser autrement : il ne suffit plus de placer des mots-clés, mais il
                faut se demander : « Quelles questions mes prospects vont-ils poser à une IA ? » et y répondre
                de manière claire et structurée sur votre site. Pour cela, certaines adaptations s’imposent :
                reformuler vos H2 en question naturelles, enrichir le contenu avec définitions, données
                chiffrées, exemples concrets, tableaux synthétiques, et intégrer des blocs FAQ pertinents.
                <br/><br/>
                En outre, si votre contenu se limite à un bavardage sans valeur, il ne franchira jamais la porte
                des moteurs… ni celle des IA. À l’inverse, un contenu structuré, riche et orienté réponse devient
                non seulement visible, mais aussi pertinent et citable par les moteurs nouvelle génération.
                <br/><br/>
                En résumé, le GEO ne remplace pas le SEO : il l’amplifie et le personnalise, obligeant les
                créateurs de contenu à allier structure technique, qualité d’information et anticipation des
                questions utilisateurs. Cette démarche permet de générer un trafic qualifié, d’
                améliorer la visibilité locale et digitale, et de positionner votre site comme une référence crédible et
                consultable par les IA.
            </p>
        </SectionAlterne>

        <SectionAlterne
            id="chatgptougeo"
            title="Le référencement à travers chat GPT ou GEO"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/5bh5kj6n4wsv87wuudx9p/10-seo-geo-referencement-jwm-marketing.png?rlkey=py872eqfop19yf8gbp8y03z6r&st=afn712wn&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="right"
            starPreset="rightHero"
            >
            <p>
                Pour commencer, pour que votre stratégie digitale soit réellement proposée par l’IA, il est essentiel
                d’aller au-delà du SEO classique. En effet, le GEO (Generative Experience Optimization) consiste
                à anticiper les questions que vos clients posent à une IA et à y répondre de manière claire,
                structurée et pratique directement sur votre site. Ainsi, vos titres doivent être formulés en
                questions naturelles, vos contenus bien organisés, et vos textes enrichis de données concrètes et de
                preuves de votre expertise.
                <br/><br/>
                De plus, le GEO représente une évolution du SEO traditionnel, car il prend en compte la manière
                dont les moteurs de recherche à base d’IA, tels que Google SGE, Bing Copilot ou ChatGPT,
                présentent les résultats. Alors que le SEO classique repose sur les mots-clés et la structure
                technique de vos pages (H1, H2, métadescriptions, maillage interne, vitesse de chargement…), le
                GEO demande un pas supplémentaire : penser comme un utilisateur qui pose une question à une
                IA.
                <br/><br/>
                Concrètement, cela implique plusieurs actions concrètes :</p>

                <ul className="mt-3 list-disc pl-6 space-y-2 marker:text-amber-600">
                <li>
                    <strong>Transformer vos titres en questions naturelles</strong>, par exemple :
                    « Quelle action marketing adopter pour générer des résultats concrets ? ».
                </li>
                <li>
                    <strong>Structurer vos réponses</strong> avec un résumé court au début, puis un développement détaillé pour approfondir le sujet.
                </li>
                <li>
                    <strong>Enrichir le contenu avec des éléments factuels</strong>, tels que des chiffres, des définitions claires, des tableaux ou des schémas, afin de donner de la matière aux IA et d’améliorer votre crédibilité.
                </li>
                <li>
                    <strong>Mettre en avant votre expertise humaine</strong>, en mentionnant votre nom, vos expériences et des exemples concrets de cas clients.
                </li>
                </ul>

                <p className="mt-4">
                Enfin, pour résumer, le GEO ne remplace pas le SEO, mais il l’amplifie et le personnalise. Il vous
                oblige à passer d’un contenu catalogue de mots-clés à un guide pratique qui répond directement
                aux questions de vos prospects. Ainsi, votre site devient non seulement visible pour les moteurs
                classiques, mais également pertinent, consultable et citable par les IA nouvelle génération.
                </p>
        </SectionAlterne>

        <PacksPolaroidSection iconSrc="/assets/notfound.jpg" title="Audit SEO et Rédaction Web" packs={AuditPacks}/>
        
        <SectionAlterne
            id="actionmarketing"
            title="Quelles actions marketing adopter pour générer des résultats ?"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/e7qssr8zvna0gq5lwd8ys/11-marketing-digital-r-sultats-jwl-marketing.png?rlkey=arms7gg1p74bbykh7hy7pzq2q&st=vedo2ams&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="right"
            starPreset="rightHero"
            >
            <p>
                Alors, tout d’abord, il faut savoir une chose : la stratégie marketing ne se limite pas à de grandes
                idées, elle se traduit par des actions concrètes et efficaces. Concrètement, chaque initiative que tu
                mets en place sert à atteindre tes objectifs : générer du trafic, convertir des prospects ou fidéliser
                tes clients.
                <br/><br/>
                Par exemple, tu peux lancer des campagnes sur les réseaux sociaux, envoyer des e-mails ciblés, créer
                des contenus optimisés SEO, ou encore automatiser certaines tâches avec le marketing automation.
                <br/><br/>
                Ensuite, chaque action doit être planifiée dans un plan marketing clair, avec des indicateurs précis
                pour suivre ce qui fonctionne et ajuster ce qui doit l’être.
                Par exemple, pour une campagne sur les réseaux sociaux, il ne suffit pas de poster du contenu : il
                faut cibler ton audience, créer des posts accrocheurs et analyser les interactions pour maximiser
                l’engagement.
                <br/><br/>
                De plus, la fidélisation passe par la personnalisation : tu utilises les données de tes clients pour
                envoyer le bon message, au bon moment, et renforcer leur confiance. Ainsi, chaque action doit
                toujours être alignée avec l’image de marque et créer une expérience client fluide et cohérente, qui
                te différencie clairement de la concurrence.
                <br/><br/>
                En résumé, les actions marketing, c’est l’art de donner vie à ta stratégie digitale au quotidien.
                Chaque post, chaque e-mail, chaque campagne contribue à créer de la valeur pour ton client, à
                générer des résultats concrets et à positionner ton entreprise comme une référence crédible et
                attractive dans ton secteur.
                <br/><br/>
                Alors, prêt·e à passer à l’action et à transformer ta stratégie en résultats ?
            </p>
        </SectionAlterne>

        <SectionAlterne
            id="optimiserprésence"
            title="Optimiser votre présence en ligne avec Google My Business et le SEO ?"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/5pv8259bon2rc2inecsbr/12-google-gmb-jwl-marketing.png?rlkey=wroymj8xjsx58zlly1yn6nk9k&st=6jnab1n3&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="left"
            starPreset="leftHero"
            >
            <p>
                Tout d’abord, atteindre votre cible reste la base du marketing digital, et pour cela, rien ne vaut
                une stratégie clairement définie qui intègre à la fois les moteurs de recherche et les médias sociaux.
                En effet, le référencement naturel (SEO) agit comme un moteur puissant pour générer du trafic
                qualifié, tandis que le marketing payant via Google Ads permet de booster rapidement votre
                visibilité. De plus, la gestion proactive de votre page Google My Business devient un levier
                incontournable : elle assure une présence locale optimisée, améliore le référencement
                géographique et influence directement la décision de vos prospects lorsqu
                ’ils recherchent vos
                services en ligne.
                <br/><br/>
                Ensuite, pour constituer une stratégie gagnante, il est essentiel de maîtriser le mix marketing, en
                combinant marketing traditionnel, mobile et digital. Le parcours d’
                achat de votre client potentiel
                doit rester au cœur de cette démarche : chaque point de contact, que ce soit via le community
                management, la création de contenu ou les campagnes de retargeting, contribue à bâtir sa
                notoriété et à renforcer son engagement.
                <br/><br/>
                Par ailleurs, créer des stratégies efficaces nécessite une expertise solide, capable d’intégrer à la fois
                les leviers payants et organiques, ainsi que des méthodes comme l’Inbound Marketing, qui
                privilégient la relation client sur le long terme. L’
                affiliation, les collaborations avec des
                influenceurs et la gestion optimisée de Google My Business viennent compléter ces efforts, en
                amplifiant la portée des campagnes et en réduisant les risques d’irréputation en ligne.
                <br/><br/>
                Enfin, en résumé, bâtir sa stratégie digitale, c’est associer un référencement performant, une
                présence active sur les réseaux sociaux, une communication adaptée au comportement du client
                et une gestion efficace de vos informations locales via Google My Business. Ce cocktail malin
                permet non seulement de générer du trafic qualifié et de convertir des prospects, mais aussi de
                fidéliser sur le long terme et d’
                assurer une visibilité durable, tant sur les moteurs classiques que
                dans l’écosystème IA/GEO.
            </p>
        </SectionAlterne>

        <PacksPolaroidSection iconSrc="/assets/notfound.jpg" title="Google My Business" packs={GMBPack}/>

        <SectionAlterne
            id="marketingautomation"
            title="Marketing automation : pourquoi et comment l’utiliser pour votre entreprise ?"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/vk8zfyma8nlm47d1konuq/13-communication-web-digital-jwl-marketing.png?rlkey=avwlpqh3dtulu8vican40lb66&st=t5wj7a5a&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="left"
            starPreset="leftHero"
            >
            <p>
                Le marketing automatique ou marketing automation, c’est l’allié indispensable
                pour gagner en efficacité et en réactivité dans ta stratégie digitale. Il permet
                d’automatiser les tâches répétitives comme les campagnes d’e-mailing, les
                relances, la segmentation des contacts, ou encore le lead nurturing. Cette
                automatisation libère du temps et garantit une personnalisation accrue, en
                envoyant le bon message, au bon moment, à la bonne cible.
                <br/><br/>
                Le marketing automation améliore ainsi la relation client et favorise la
                fidélisation, tout en optimisant le retour sur investissement. Couplé à un CRM
                bien paramétré, il facilite le suivi des prospects et clients, et rend plus lisible la
                performance des campagnes. Intégré dans un plan marketing global, il joue un
                rôle clé dans la conversion et la montée en gamme des clients.
                De plus, il permet d’analyser les comportements pour affiner le ciblage et
                anticiper les besoins.
                <br/><br/>
                En bref, le marketing automatique est un levier puissant pour développer une
                stratégie de marketing digital performante, qui combine humanité et technologie
                pour un résultat gagnant.
            </p>
        </SectionAlterne>

        <SectionAlterne
            id="externaliser"
            title="Pourquoi externaliser votre développement commercial ?"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/wg84klcwsravz3nc64q4z/14-marketing-digital-d-veloppement-commercial-jwl-marketing.png?rlkey=u3azykt02oje2ectk8tdymdkd&st=5lo7gg4u&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="right"
            starPreset="rightHero"
            >
            <p>
               Le développement commercial externalisé est devenu un levier incontournable pour les entreprises
                B2B souhaitant optimiser leur croissance tout en maximisant l’
                efficacité de leurs équipes. Grâce à
                mes 10 années d’
                expérience, dont 4 années passées auprès du groupe américain IAC à gérer la
                prospection, le closing et le commerce par mailing, je sais comment transformer une base de
                prospects en opportunités concrètes.
                <br/><br/>
                Les entreprises font appel à un téléprospecteur indépendant pour trois raisons majeures :
                <br/>
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 marker:text-amber-600">
                <li>
                    Concentrer leurs commerciaux sur le closing : la prospection est souvent chronophage et
                    complexe, et les commerciaux préfèrent se focaliser sur la signature des contrats plutôt que sur
                    la recherche de prospects.
                </li>
                <li>
                    Tester la prospection externalisée avant un recrutement interne : cela permet d’évaluer la
                    pertinence des campagnes et la qualité des leads avant d’investir dans un recrutement à temps
                    plein.
                </li>
                <li>
                    Obtenir davantage de rendez-vous commerciaux : pour développer leur chiffre d’affaires et
                    sécuriser de nouveaux clients, les entreprises ont besoin de flux de rendez-vous qualifiés
                    réguliers.
                </li>
            </ul>

            <p className="mt-4">
                Couplé au marketing automation, le développement commercial externalisé devient encore plus
                puissant : il permet de synchroniser la prospection téléphonique avec les campagnes d’
                e-mailing
                automatisées, d’
                optimiser le suivi des leads et de garantir que chaque contact reçoit le bon message
                au bon moment. Ensemble, ces leviers améliorent la conversion, augmentent la fidélisation et
                renforcent la performance commerciale globale.
                En bref, externaliser la prospection avec un expert expérimenté, soutenu par des outils de
                marketing automation, c’est allier stratégie, efficacité et résultats mesurables pour faire passer
                votre business B2B au niveau supérieur.
            </p>
        </SectionAlterne>

        <PacksPolaroidSection iconSrc="/assets/notfound.jpg" title="Développement commercial" packs={DevCompacks}/>

        <Footer/>
    </main>
  );
}
