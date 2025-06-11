import React, { useState, useEffect } from 'react'
import { useProfile } from '@/hooks/useProfile'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { Palette, MapPin, Phone, Mail, User as UserIcon, FileText } from 'lucide-react'

export const ArtistDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const { profile, loading, error, updateProfile } = useProfile(user)
  const [formData, setFormData] = useState({
    nom_complet: '',
    email: '',
    telephone: '',
    localisation: '',
    style_artistique: '',
    biographie: ''
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Récupérer l'utilisateur connecté au chargement
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    // Pré-remplir automatiquement le formulaire avec les données du profil
    if (profile) {
      setFormData({
        nom_complet: profile.nom_complet || '',
        email: profile.email || '', // Email pré-rempli depuis l'inscription
        telephone: profile.telephone || '',
        localisation: profile.localisation || '',
        style_artistique: profile.style_artistique || '',
        biographie: profile.biographie || ''
      })
    }
  }, [profile])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      await updateProfile(formData)
      toast({
        title: "✅ Profil WXLLSPACE mis à jour",
        description: "Vos informations d'artiste ont été sauvegardées avec succès sur la marketplace.",
      })
    } catch (error) {
      toast({
        title: "❌ Erreur WXLLSPACE",
        description: "Une erreur est survenue lors de la sauvegarde de votre profil artiste.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
          <p className="text-lg font-medium text-gray-700">Chargement de votre profil WXLLSPACE...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-red-700 mb-2">Erreur WXLLSPACE</h2>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header WXLLSPACE */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            WXLLSPACE
          </h1>
          <p className="text-lg text-gray-600">Marketplace Street Art - Profil Artiste</p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <UserIcon className="h-8 w-8" />
              Mon Profil d'Artiste WXLLSPACE
            </CardTitle>
            <p className="text-purple-100">Gérez vos informations sur la marketplace street art</p>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="nom_complet" className="text-lg font-semibold flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-purple-600" />
                    Nom d'artiste complet
                  </Label>
                  <Input
                    id="nom_complet"
                    type="text"
                    value={formData.nom_complet}
                    onChange={(e) => handleInputChange('nom_complet', e.target.value)}
                    placeholder="Votre nom d'artiste sur WXLLSPACE"
                    className="h-12 text-lg border-2 focus:border-purple-500 transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-lg font-semibold flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    Email WXLLSPACE
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="votre@email.com"
                    className="h-12 text-lg bg-gray-50 border-2 cursor-not-allowed"
                    readOnly
                  />
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    🔒 Email utilisé lors de votre inscription WXLLSPACE (non modifiable)
                  </p>
                </div>
              </div>

              {/* Contact et localisation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="telephone" className="text-lg font-semibold flex items-center gap-2">
                    <Phone className="h-5 w-5 text-green-600" />
                    Téléphone
                  </Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    placeholder="+33 1 23 45 67 89"
                    className="h-12 text-lg border-2 focus:border-green-500 transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="localisation" className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    Localisation
                  </Label>
                  <Input
                    id="localisation"
                    type="text"
                    value={formData.localisation}
                    onChange={(e) => handleInputChange('localisation', e.target.value)}
                    placeholder="Paris, Lyon, Marseille..."
                    className="h-12 text-lg border-2 focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              {/* Style artistique */}
              <div className="space-y-3">
                <Label htmlFor="style_artistique" className="text-lg font-semibold flex items-center gap-2">
                  <Palette className="h-5 w-5 text-orange-600" />
                  Style artistique WXLLSPACE
                </Label>
                <Input
                  id="style_artistique"
                  type="text"
                  value={formData.style_artistique}
                  onChange={(e) => handleInputChange('style_artistique', e.target.value)}
                  placeholder="Graffiti, Pochoir, Muralisme, Art urbain, Collage..."
                  className="h-12 text-lg border-2 focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Biographie */}
              <div className="space-y-3">
                <Label htmlFor="biographie" className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  Biographie d'artiste
                </Label>
                <Textarea
                  id="biographie"
                  value={formData.biographie}
                  onChange={(e) => handleInputChange('biographie', e.target.value)}
                  placeholder="Parlez-nous de votre parcours artistique, vos influences, vos œuvres marquantes sur WXLLSPACE..."
                  rows={6}
                  className="text-lg border-2 focus:border-indigo-500 transition-colors resize-none"
                />
                <p className="text-sm text-gray-500">
                  Cette biographie sera visible sur votre profil public WXLLSPACE
                </p>
              </div>

              {/* Bouton de sauvegarde */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      Sauvegarde en cours...
                    </>
                  ) : (
                    <>
                      💾 Sauvegarder mon profil WXLLSPACE
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>© 2025 WXLLSPACE - Marketplace Street Art Français</p>
        </div>
      </div>
    </div>
  )
}
