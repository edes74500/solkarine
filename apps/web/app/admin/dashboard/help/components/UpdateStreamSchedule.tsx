export default function UpdateStreamSchedule() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Horaires de stream sur le site</h2>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Comment fonctionnent les horaires de stream</h3>

        <div className="space-y-3">
          <p>
            Les horaires de stream affichés sur le site sont directement liés à votre calendrier Twitch et sont mis à
            jour automatiquement toutes les 24 heures.
          </p>

          <h4 className="font-semibold">Points importants :</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Les modifications effectuées sur votre calendrier Twitch seront reflétées sur le site dans un délai
              maximum de 24 heures.
            </li>
            <li>Le système convertit automatiquement les horaires de la timezone de Twitch vers l'heure française.</li>
            <li>Les jours de la semaine sont également traduits en français pour une meilleure lisibilité.</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">En cas de problème</h3>

        <div className="space-y-3">
          <p>Si vous rencontrez des problèmes avec l'affichage des horaires de stream sur le site :</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Vérifiez d'abord que votre calendrier Twitch est correctement configuré et à jour.</li>
            <li>Attendez au moins 24 heures pour que les modifications soient synchronisées.</li>
            <li>
              Si le problème persiste, n'hésitez pas à contacter le développeur web sur Discord pour obtenir de l'aide.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
