import LegalSection from "../../components/Legals/LegalSection.tsx";
import HeaderNameArrow from "../../components/Header/HeaderNameArrow.tsx";

export default function RGPDPage() {
  return (
    <>
      <HeaderNameArrow name={"RGPD"} />
      <div className="flex flex-col px-4 py-8">
        <div>
          <div className="flex flex-col gap-12 my-20">
            <LegalSection
              title="01. Collecte des données"
              content="Nous collectons les informations que vous nous fournissez lors de la création de votre profil : nom, prénom, adresse e-mail, numéro de téléphone et localisation. Ces données sont nécessaires au bon fonctionnement de la mise en relation entre clients et prestataires."
            />
            <LegalSection
              title="02. Utilisation"
              content="Vos données servent exclusivement à vous identifier sur la plateforme et à permettre aux autres utilisateurs de vous contacter dans le cadre des missions proposées. Nous ne revendons jamais vos données à des tiers."
            />
            <LegalSection
              title="03. Conservation"
              content="Vos données sont conservées tant que votre compte est actif. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression que vous pouvez exercer depuis votre profil."
            />
          </div>
        </div>
      </div>
    </>
  );
}
