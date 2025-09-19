import nodemailer from "nodemailer";

// Configuration du transporteur email
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Fonction pour envoyer l'email de vérification
export const sendVerificationEmail = async (email, nom, verificationToken) => {
  try {
    const transporter = createTransporter();

    // TEMPORAIRE : Lien direct vers l'API jusqu'à création du frontend
    const verificationUrl = `http://localhost:5000/api/auth/verify-email/${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Vérification de votre compte Progfit",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Bienvenue sur Progfit, ${nom} !</h2>
          
          <p>Merci de vous être inscrit sur notre plateforme de fitness.</p>
          
          <p>Pour finaliser votre inscription, veuillez cliquer sur le lien ci-dessous pour vérifier votre adresse email :</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Vérifier mon email
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :<br>
            <a href="${verificationUrl}">${verificationUrl}</a>
          </p>
          
          <p style="color: #666; font-size: 14px;">
            Ce lien expire dans 30 minutes.
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="color: #666; font-size: 12px;">
            Si vous n'avez pas créé de compte sur Progfit, ignorez cet email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email de vérification envoyé à ${email}`);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return false;
  }
};

// Fonction pour générer un token de vérification
export const generateVerificationToken = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36)
  );
};

// Fonction pour générer la page HTML de vérification d'email
export const generateVerificationSuccessPage = (user, jwtToken) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Email vérifié - Progfit</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
        .container { background: white; padding: 40px; border-radius: 10px; max-width: 500px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .success { color: #28a745; font-size: 24px; margin-bottom: 20px; }
        .info { color: #666; margin-bottom: 30px; }
        .token { background: #f8f9fa; padding: 15px; border-radius: 5px; word-break: break-all; font-family: monospace; font-size: 12px; }
        .btn { background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
        .btn:hover { background: #0056b3; }
        .dev-section { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="success">✅ Email vérifié avec succès !</h1>
        <p class="info">Votre compte <strong>${
          user.email
        }</strong> est maintenant actif.</p>
        <p><strong>Nom :</strong> ${user.nom}</p>
        <p><strong>Niveau :</strong> ${user.niveau}</p>
        <p><strong>Objectifs :</strong> ${
          user.objectifs.join(", ") || "Aucun (à définir)"
        }</p>
        
        
        
        <p class="info">Vous pouvez maintenant vous connecter à votre compte et commencer votre parcours fitness !</p>
        <a href="${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/app.html#/login" class="btn">
          Se connecter à Progfit
        </a>
        <p style="margin-top: 20px; color: #999; font-size: 14px;">
          Si le bouton ne fonctionne pas, vous pouvez fermer cette page et vous rendre sur l'application.
        </p>
      </div>
    </body>
    </html>
  `;
};

// Fonction complète pour gérer la vérification email d'un utilisateur
export const handleEmailVerification = async (user) => {
  try {
    // 1. Générer le token de vérification
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    // 2. Mettre à jour l'utilisateur avec les tokens
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await user.save();

    // 3. Envoyer l'email de vérification
    const emailSent = await sendVerificationEmail(
      user.email,
      user.nom,
      verificationToken
    );

    return {
      success: emailSent,
      verificationToken: emailSent ? verificationToken : null,
    };
  } catch (error) {
    console.error("Erreur lors de la gestion de vérification email:", error);
    return {
      success: false,
      verificationToken: null,
    };
  }
};

// Fonction pour envoyer l'email de réinitialisation de mot de passe
export const sendPasswordResetEmail = async (email, nom, resetToken) => {
  try {
    const transporter = createTransporter();

    // Lien vers l'API pour réinitialiser le mot de passe
    const resetUrl = `${
      process.env.CLIENT_URL || "http://localhost:5173"
    }/app.html#/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Réinitialisation de votre mot de passe - Progfit",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc3545;">Réinitialisation de mot de passe</h2>
          
          <p>Bonjour ${nom},</p>
          
          <p>Vous avez demandé à réinitialiser votre mot de passe pour votre compte Progfit.</p>
          
          <p>Pour créer un nouveau mot de passe, cliquez sur le lien ci-dessous :</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Réinitialiser mon mot de passe
            </a>
          </div>
          
      
          
          <p style="color: #dc3545; font-size: 14px; font-weight: bold;">
            ⚠️ Ce lien expire dans 30 minutes pour votre sécurité.
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="color: #666; font-size: 12px;">
            <strong>Vous n'avez pas demandé cette réinitialisation ?</strong><br>
            Ignorez cet email, votre mot de passe restera inchangé.
          </p>
          
          <p style="color: #666; font-size: 12px;">
            Pour votre sécurité, ne partagez jamais ce lien avec personne.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email de réinitialisation envoyé à ${email}`);
    return true;
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de réinitialisation:",
      error
    );
    return false;
  }
};

// Fonction complète pour gérer la réinitialisation de mot de passe
export const handlePasswordResetEmail = async (user, resetToken) => {
  try {
    // Envoyer l'email de réinitialisation
    const emailSent = await sendPasswordResetEmail(
      user.email,
      user.nom,
      resetToken
    );

    return {
      success: emailSent,
      resetToken: emailSent ? resetToken : null,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la gestion de réinitialisation de mot de passe:",
      error
    );
    return {
      success: false,
      resetToken: null,
    };
  }
};
