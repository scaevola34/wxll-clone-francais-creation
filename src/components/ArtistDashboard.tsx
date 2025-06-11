import React, { useState, useEffect } from 'react'
import { useProfile } from '@/hooks/useProfile'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

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
    // Récupérer l'utilisateur connecté
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
    // Pré-remplir le formulaire avec les données du profil
    if (profile) {
      setFormData({
        nom_complet: profile.nom_complet || '',
        email: profile.email || '',
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
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Erreur: {error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Mon Profil d'Artiste</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nom_complet">Nom complet</Label>
              <Input
                id="nom_complet"
                type="text"
                value={formData.nom_complet}
                onChange={(e) => handleInputChange('nom_complet', e.target.value)}
                placeholder="Votre nom complet"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="votre@email.com"
                className="bg-gray-50"
                readOnly
              />
              <p className="text-sm text-gray-500">
                Email utilisé lors de l'inscription (non modifiable)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                type="tel"
                value={formData.telephone}
                onChange={(e) => handleInputChange('telephone', e.target.value)}
                placeholder="+33 1 23 45 67 89"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="localisation">Localisation</Label>
              <Input
                id="localisation"
                type="text"
                value={formData.localisation}
                onChange={(e) => handleInputChange('localisation', e.target.value)}
                placeholder="Paris, France"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style_artistique">Style artistique</Label>
              <Input
                id="style_artistique"
                type="text"
                value={formData.style_artistique}
                onChange={(e) => handleInputChange('style_artistique', e.target.value)}
                placeholder="Graffiti, Pochoir, Muralisme..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="biographie">Biographie</Label>
              <Textarea
                id="biographie"
                value={formData.biographie}
                onChange={(e) => handleInputChange('biographie', e.target.value)}
                placeholder="Parlez-nous de votre parcours artistique..."
                rows={4}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={saving}
            >
              {saving ? 'Sauvegarde...' : 'Sauvegarder le profil'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
