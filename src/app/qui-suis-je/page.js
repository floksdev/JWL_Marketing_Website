import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionAlterne from "@/components/reusable/SectionAlterne";

export const metadata = {
  title: "Qui suis-je — JWL Marketing",
  description: "Découvrez le parcours de Jodie, consultante marketing digital et SEO local basée à Aix-en-Provence.",
};

export default function Whoami() {
  return (
    <main className="min-h-screen text-neutral-900">
        {/* HERO */}
        <Hero/>
        <SectionAlterne
            id="qui-je-suis"
            title="Qui suis-je ?"
            level={1}
            imageSrc="https://www.dropbox.com/scl/fi/k3qtse3n5pla210ga942n/Jodie-lapaillerie-consultante-seo-jwl-marketing-13.png?rlkey=3x4samfsmt9ynx4yt5qj4owsy&st=nrfyb1g1&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="left"
            starPreset="none"
            Circle={false}
            >
            <p>
                Je m’appelle Jodie, née en 1989, génération Y : oui, j’
                ai survécu aux tamagotchis, aux premiers textos,
                et aux CD qu
                ’il fallait graver pour écouter sa musique. Je vis à Aix-en-Provence depuis plus de 20 ans,
                au milieu des calissons, des marchés colorés et des petites entreprises locales qui font battre le cœur de la ville.
                J’ai exploré 95 % des différents métiers du développement commercial, en plus du marketing, ces dix dernières
                années.Du management à l’
                administratif, de la gestion des équipes au rôle de chef de projet ou de chargée
                d’
                affaires…
                <br/><br/>
                Bref, j’
                ai touché à tout, de la plus petite à la plus grande des entreprises.
                J’
                ai même travaillé pendant près de 4 ans auprès du groupe IAC, dont le site est basé aux États-Unis, et j’
                en suis
                sortie avec de solides bases en coaching, développement personnel et fixation d’objectifs commerciaux, grâce à
                l’
                accompagnement de coachs basés sur la méthode dite
                “
                américaine
                ”
                .
                <br/><br/>
                Cependant, les années suivantes j’ai vu le marketing et le commercial séparés. Résultat ?
                Le commercial rame, le marketing fait joli… mais ça ne sert à rien.
                <br/><br/>
                Avec JWL Marketing, j’ai décidé de casser ce schéma : humaine, locale, pragmatique.
                Et j’
                applique la règle d’Alexandre Astier : je ne travaille pas avec des gens avec qui je n’aurais pas envie de déjeuner.
            </p>
        </SectionAlterne>

         <SectionAlterne
            id="nouveau-chapitre"
            title="Nouveau chapitre, nouvelle énergie"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/q6kz76vk3cxep45iw9iys/jodie-lapaillerie-jwl-marketing-aix-en-provence-paca.png?rlkey=571jrd7tio3tl8b6xomxb0enw&st=h01ggkx3&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="right"
            starPreset="none"
            Circle={false}
            >
            <p>
            Il y a quelques années, tout a basculé. Mon poste de commerciale chez IAC a sauté pendant le grand
            ménage Covid : licenciement économique, services fermés les uns après les autres. Sur le
            moment, j’
            ai encaissé en mode pilote automatique, mais en coulisses ça moulinait. Trois ans à
            ruminer, à me former, à refaire le match, un café toujours à la main sur une terrasse d’Aix, à
            observer les va-et-vient des marchés et à me demander comment transformer tout ce bagage en
            quelque chose qui me ressemble.
            <br/><br/>
            Passionnée, engagée et communicative : j’avais ces atouts, mais aussi des failles qui m
            ’
            ont forgée.
            Je me souviens de mes débuts, incapable de convaincre certains seniors parce que ma voix, trop
            douce, presque enfantine, ne leur inspirait pas confiance. J’ai appris à compenser autrement :
            écouter plus, négocier mieux, poser les bonnes questions.
            <br/><br/>
            Et c
            ’
            est dans ce jeu de négociation que j’
            ai découvert ma zone de génie : créer du lien, trouver le
            point d’accord, faire basculer la balance sans jamais forcer.
            </p>
        </SectionAlterne>
        
        <SectionAlterne
            id="collaboration"
            title="Parce qu’on ne collabore pas par hasard"
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/soy8yubupf6qf8i6855nw/unnamed.jpg?rlkey=c5bkh70eslt8yudelj6mo5tej&st=k0ii1vzk&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="left"
            starPreset="none"
            Circle={false}
            >
            <p>
                Le feeling est essentiel. Sélectionner mes clients, c’est aussi me donner la liberté de dire non.
                <br/><br/>
                Mes tarifs ? Justes. Parce que vous ne payez pas 30 minutes de travail… vous payez 10 ans
                d’
                expérience, de terrain,
                de réussites et de galères condensés dans chaque projet.
                <br/><br/>
                Ce que j’
                adore ? Aider les artisans, commerçants et petites entreprises locales à être visibles,
                crédibles et mémorables, avec des outils concrets et une image qui leur ressemble.
                <br/><br/>
                Je propose aussi des conseils et des formations payantes, et je suis actuellement en cours de
                certification RNCP, pour délivrer des formations certifiantes et Qualiopi à l’avenir.
            </p>
        </SectionAlterne>
    </main>
  );
}
