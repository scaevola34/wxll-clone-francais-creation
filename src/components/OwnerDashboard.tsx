
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
import { Building, MapPin, Phone, Mail, User as UserIcon, FileText, Globe, Instagram, Clock, Camera } from 'lucide-react'
import ImageUpload from '@/components/ui/ImageUpload'

export const OwnerDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const { profile, loading, error, updateProfile } = useProfile(user)
  const [formData, setFormData] = useState({
    nom_complet: '',
    email: '',
    telephone: '',
    localisation: '',
    style_artistique: '',
    biographie: '',
    instagram_handle: '',
    website: '',
    experience_years: 0,
    profile_image_url: ''
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
        email: profile.email || '',
        telephone: profile.telephone || '',
        localisation: profile.localisation || '',
        style_artistique: profile.style_artistique || '',
        biographie: profile.biographie || '',
        instagram_handle: profile.instagram_handle || '',
        website: profile.website || '',
        experience_years: profile.experience_years || 0,
        profile_image_url: profile.profile_image_url || ''
      })
    }
  }, [profile])

  const handleInputChange = (field: string, value: string | number) => {
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
        description: "Vos informations de propriétaire ont été sauvegardées avec succès sur la marketplace.",
      })
    } catch (error) {
      toast({
        title: "❌ Erreur WXLLSPACE",
        description: "Une erreur est survenue lors de la sauvegarde de votre profil propriétaire.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateProfileImage = async (imageUrl: string) => {
    try {
      await updateProfile({ ...formData, profile_image_url: imageUrl })
      setFormData(prev => ({ ...prev, profile_image_url: imageUrl }))
      toast({
        title: "✅ Photo de profil mise à jour",
        description: "Votre photo de profil a été mise à jour.",
      })
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors de la mise à jour de votre photo.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header WXLLSPACE */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            WXLLSPACE
          </h1>
          <p className="text-lg text-gray-600">Marketplace Street Art - Profil Propriétaire</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Photo de profil sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Camera className="h-6 w-6 text-green-600" />
                  Photo de profil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  currentImageUrl={formData.profile_image_url}
                  onImageUploaded={updateProfileImage}
                  className="flex flex-col items-center"
                />
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <Building className="h-8 w-8" />
                  Mon Profil de Propriétaire WXLLSPACE
                </CardTitle>
                <p className="text-green-100">Gérez vos informations sur la marketplace street art</p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Informations personnelles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="nom_complet" className="text-lg font-semibold flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-green-600" />
                        Nom complet
                      </Label>
                      <Input
                        id="nom_complet"
                        type="text"
                        value={formData.nom_complet}
                        onChange={(e) => handleInputChange('nom_complet', e.target.value)}
                        placeholder="Votre nom complet"
                        className="h-12 text-lg border-2 focus:border-green-500 transition-colors"
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
                        className="h-12 text-lg bg-gray-100 border-2 cursor-not-allowed"
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

                  {/* Social et experience */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="instagram_handle" className="text-lg font-semibold flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-pink-600" />
                        Instagram
                      </Label>
                      <Input
                        id="instagram_handle"
                        type="text"
                        value={formData.instagram_handle}
                        onChange={(e) => handleInputChange('instagram_handle', e.target.value)}
                        placeholder="@votre_instagram"
                        className="h-12 text-lg border-2 focus:border-pink-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="website" className="text-lg font-semibold flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-600" />
                        Site web
                      </Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://votre-site.com"
                        className="h-12 text-lg border-2 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="experience_years" className="text-lg font-semibold flex items-center gap-2">
                        <Clock className="h-5 w-5 text-indigo-600" />
                        Années d'expérience
                      </Label>
                      <Input
                        id="experience_years"
                        type="number"
                        min="0"
                        value={formData.experience_years}
                        onChange={(e) => handleInputChange('experience_years', parseInt(e.target.value) || 0)}
                        placeholder="5"
                        className="h-12 text-lg border-2 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Biographie */}
                  <div className="space-y-3">
                    <Label htmlFor="biographie" className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5 text-indigo-600" />
                      Présentation
                    </Label>
                    <Textarea
                      id="biographie"
                      value={formData.biographie}
                      onChange={(e) => handleInputChange('biographie', e.target.value)}
                      placeholder="Présentez-vous : votre entreprise, vos projets, pourquoi vous souhaitez collaborer avec des artistes..."
                      rows={6}
                      className="text-lg border-2 focus:border-indigo-500 transition-colors resize-none"
                    />
                    <p className="text-sm text-gray-500">
                      Cette présentation sera visible sur votre profil public WXLLSPACE
                    </p>
                  </div>

                  {/* Bouton de sauvegarde */}
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>© 2025 WXLLSPACE - Marketplace Street Art Français</p>
        </div>
      </div>
    </div>
  )
}
