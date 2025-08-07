export default function PostOnWago() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comment publier une WeakAura sur Wago.io</h2>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Étapes pour publier votre WeakAura</h3>

        <ol className="list-decimal pl-6 space-y-3">
          <li>
            Connectez-vous à votre compte sur{" "}
            <a href="https://wago.io" className="text-primary underline">
              wago.io
            </a>{" "}
            ou créez-en un si vous n'en avez pas.
          </li>
          <li>
            Cliquez sur le bouton <span className="bg-secondary px-2 py-1 rounded">Publier</span> dans la barre de
            navigation.
          </li>
          <li>
            Sélectionnez <span className="font-semibold">WeakAuras</span> dans les options de publication.
          </li>
          <li>
            Dans World of Warcraft, ouvrez l'interface WeakAuras avec <span className="font-mono">/wa</span>.
          </li>
          <li>
            Sélectionnez l'aura que vous souhaitez partager et cliquez sur{" "}
            <span className="font-semibold">Exporter vers chaîne</span>.
          </li>
          <li>Copiez la chaîne générée et collez-la dans le champ prévu sur Wago.io.</li>
        </ol>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Ajouter une description et des images</h3>

        <div className="space-y-3">
          <h4 className="font-semibold">Description efficace :</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Donnez un titre clair et descriptif à votre WeakAura.</li>
            <li>Expliquez précisément ce que fait votre WeakAura et comment elle fonctionne.</li>
            <li>Mentionnez les classes, spécialisations ou situations pour lesquelles elle est conçue.</li>
            <li>Incluez des instructions d'installation ou de configuration si nécessaire.</li>
            <li>Ajoutez des tags pertinents pour améliorer la visibilité de votre publication.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Ajouter des images :</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Prenez des captures d'écran de votre WeakAura en action (utilisez la touche{" "}
              <span className="font-mono">Impr. écran ou window + shift + s</span>).
            </li>
            <li>
              Cliquez sur <span className="font-semibold">Ajouter une image</span> dans l'interface de publication.
            </li>
            <li>Téléchargez vos captures d'écran ou utilisez l'outil de capture intégré.</li>
            <li>Assurez-vous que vos images montrent clairement l'apparence et le fonctionnement de votre WeakAura.</li>
            <li>Vous pouvez également ajouter une vidéo démonstrative en incluant un lien YouTube.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
