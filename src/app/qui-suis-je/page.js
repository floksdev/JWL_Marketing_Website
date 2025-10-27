import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionAlterne from "@/components/reusable/SectionAlterne";

export default function Whoami() {
  return (
    <main className="min-h-screen text-neutral-900">
        {/* HERO */}
        <Hero/>
        <SectionAlterne
            id="qui-je-suis"
            title="Qui je suis ?"
            level={1}
            imageSrc="https://www.dropbox.com/scl/fi/kqbi2o0jz5n3r5iyw9ql5/1-jodie-lapaillerie-jwl-marketing.jpeg?rlkey=zcax7jxyfdadoxa30gypd3gd2&st=vbu4lgy2&raw=1"
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
            id="titre"
            title="Titre..."
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/nvlca0a073m5jbto2g065/2-communication-digitale-jwl-marketing.png?rlkey=swxk52vdsom9edtoroioeqt1g&st=10savq6x&raw=1"
            imageAlt="Ciblage marketing"
            imageSide="right"
            starPreset="none"
            Circle={false}
            >
            <p>
            Il y a trois ans, tout a basculé. Mon poste de commerciale chez IAC a sauté pendant le grand
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
            id="titre"
            title="Titre..."
            level={2}
            imageSrc="https://www.dropbox.com/scl/fi/2ao27qpe54gole0or7bjk/3-aix-en-provence-marketing-digital-jodie-lapaillerie-jwl-marketing.jpg?rlkey=zf1ntjezye90bon4wg2okil1f&st=jfqxy8po&raw=1"
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
