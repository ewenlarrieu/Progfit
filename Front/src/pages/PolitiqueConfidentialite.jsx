import React from 'react'
import { Link } from 'react-router-dom'

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#E22807] mb-4">
              Politique de Confidentialité
            </h1>
          </div>

         
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              ProgFit s'engage à protéger votre vie privée et vos données personnelles. Cette politique 
              de confidentialité explique comment nous collectons, utilisons, stockons et protégeons 
              vos informations personnelles conformément au Règlement Général sur la Protection des 
              Données (RGPD).
            </p>
          </section>

       
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Responsable du traitement</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>ProgFit</strong><br />
                Responsable : Ewen Larrieu<br />
                Contact : contact@progfit.com<br />
                
              </p>
            </div>
          </section>

        
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Données personnelles collectées</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">3.1 Données d'identification</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Nom d'utilisateur (pseudo)</li>
                  <li>Adresse e-mail</li>
                  <li>Mot de passe (chiffré)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">3.2 Données de profil fitness</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Niveau de fitness (débutant, intermédiaire, avancé)</li>
                  <li>Objectifs sportifs (perte de poids, prise de masse, etc.)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">3.3 Données d'activité</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Programmes d'entraînement suivis</li>
                  <li>Séances d'entraînement terminées</li>
                  <li>Progression et statistiques</li>
                 
                </ul>
              </div>

            
            </div>
          </section>

   
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Finalités du traitement</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <p className="text-gray-600">
                  <strong>Fourniture du service :</strong> Gérer votre compte, personnaliser votre expérience fitness
                </p>
              </div>
              <div className="flex items-start">
                <p className="text-gray-600">
                  <strong>Suivi de progression :</strong> Enregistrer et analyser vos performances sportives
                </p>
              </div>
              <div className="flex items-start">
                <p className="text-gray-600">
                  <strong>Communication :</strong> Envoi d'emails de vérification et de réinitialisation
                </p>
              </div>
              <div className="flex items-start">
                <p className="text-gray-600">
                  <strong>Sécurité :</strong> Authentification et protection contre les accès non autorisés
                </p>
              </div>
            </div>
          </section>

        
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Base légale du traitement</h2>
            <div >
              <p className="text-gray-700">
                Le traitement de vos données personnelles est basé sur :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li><strong>Votre consentement</strong> pour l'inscription et l'utilisation du service</li>
                <li><strong>L'exécution du contrat</strong> pour la fourniture des services ProgFit</li>
                <li><strong>Nos intérêts légitimes</strong> pour la sécurité et l'amélioration du service</li>
              </ul>
            </div>
          </section>

    
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Conservation des données</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Type de données
                    </th>
                  
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Données de compte</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Jusqu'à suppression du compte</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Données d'entraînement</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Jusqu'à suppression du compte</td>
                  </tr>
                
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Vos droits RGPD</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Droit d'accès</h3>
                <p className="text-green-700 text-sm">
                  Accédez à toutes vos données personnelles stockées
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Droit de rectification</h3>
                <p className="text-blue-700 text-sm">
                  Modifiez vos informations personnelles incorrectes
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Droit à l'effacement</h3>
                <p className="text-red-700 text-sm">
                  Supprimez définitivement votre compte et vos données
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Droit à la portabilité</h3>
                <p className="text-purple-700 text-sm">
                  Exportez vos données dans un format lisible
                </p>
              </div>
            </div>
          </section>

  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Sécurité des données</h2>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-3">
                Nous mettons en place des mesures de sécurité appropriées :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Chiffrement des mots de passe avec bcrypt</li>
                <li>Authentification par tokens JWT sécurisés</li>
                <li>Validation stricte des données entrantes</li>
                <li>Protection CORS activée</li>
                <li>Nettoyage automatique des tokens expirés</li>
              </ul>
            </div>
          </section>

 

     
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Cookies et technologies similaires</h2>
            <p className="text-gray-600 mb-4">
              Notre application utilise uniquement les cookies et stockage local suivants :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>Token JWT</strong> : Stocké localement pour maintenir votre session</li>
              <li><strong>Préférences utilisateur</strong> : Stockage local des paramètres d'interface</li>
            </ul>
          </section>

          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Modifications de la politique</h2>
            <p className="text-gray-600">
              Cette politique peut être mise à jour. Les modifications importantes vous seront 
              notifiées par email. La date de dernière mise à jour est indiquée en haut de cette page.
            </p>
          </section>

          
          <div className="border-t pt-8 mt-8">
            <div className="flex gap-4 justify-center items-center">
         
              
                <Link 
                  to="/login" 
                  className="bg-[#E22807] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c41e06] transition-colors"
                >
                  Se connecter
                </Link>
                  <Link 
                  to="/register" 
                  className="bg-[#E22807] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c41e06] transition-colors"
                >
                  S'inscrire
                </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}