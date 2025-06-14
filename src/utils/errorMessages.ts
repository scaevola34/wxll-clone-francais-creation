
export const getErrorMessage = (error: any): string => {
  // Messages d'erreur Supabase traduits
  if (error?.message) {
    const message = error.message.toLowerCase();
    
    // Erreurs d'authentification
    if (message.includes('invalid login credentials')) {
      return 'Email ou mot de passe incorrect. Veuillez vérifier vos informations.';
    }
    if (message.includes('email not confirmed')) {
      return 'Veuillez confirmer votre email avant de vous connecter.';
    }
    if (message.includes('user already registered')) {
      return 'Un compte existe déjà avec cette adresse email.';
    }
    if (message.includes('weak password')) {
      return 'Le mot de passe doit contenir au moins 8 caractères.';
    }
    
    // Erreurs de base de données
    if (message.includes('duplicate key')) {
      return 'Cette information existe déjà dans notre système.';
    }
    if (message.includes('foreign key')) {
      return 'Impossible de supprimer cet élément car il est lié à d\'autres données.';
    }
    if (message.includes('not null violation')) {
      return 'Veuillez remplir tous les champs obligatoires.';
    }
    if (message.includes('check constraint')) {
      return 'Les données saisies ne respectent pas les règles de validation.';
    }
    
    // Erreurs de connexion
    if (message.includes('network')) {
      return 'Problème de connexion. Veuillez vérifier votre internet.';
    }
    if (message.includes('timeout')) {
      return 'La requête a pris trop de temps. Veuillez réessayer.';
    }
    
    // Erreurs RLS/permissions
    if (message.includes('policy')) {
      return 'Vous n\'avez pas les permissions pour effectuer cette action.';
    }
    if (message.includes('unauthorized') || message.includes('forbidden')) {
      return 'Accès non autorisé. Veuillez vous connecter.';
    }
  }
  
  // Message générique pour les erreurs inconnues
  return 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
};

export const validateEmail = (email: string): string | null => {
  if (!email) return 'L\'email est requis';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Veuillez saisir un email valide';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Le mot de passe est requis';
  if (password.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
  if (!/(?=.*[a-z])/.test(password)) return 'Le mot de passe doit contenir au moins une minuscule';
  if (!/(?=.*[A-Z])/.test(password)) return 'Le mot de passe doit contenir au moins une majuscule';
  if (!/(?=.*\d)/.test(password)) return 'Le mot de passe doit contenir au moins un chiffre';
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value?.trim()) return `${fieldName} est requis`;
  return null;
};
