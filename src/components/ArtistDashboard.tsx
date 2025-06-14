
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
import { Palette, MapPin, Globe, Instagram, User as UserIcon, FileText, Camera, Plus, Edit } from 'lucide-react'
import ImageUpload from '@/components/ui/ImageUpload'

interface ArtistProject {
  id: string
  title: string
  location?: string
  description?: string
  image_url?: string
  year?: number
}

export const ArtistDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const { profile, loading, error, updateProfile } = useProfile(user)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    style: '',
    website: '',
    instagram_handle: '',
    experience_years: 0,
    profile_image_url: ''
  })
  const [saving, setSaving] = useState(false)
  const [projects, setProjects] = useState<ArtistProject[]>([])
  const [showAddProject, setShowAddProject] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    location: '',
    description: '',
    image_url: '',
    year: new Date().getFullYear()
  })

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
    if (user) {
      fetchArtistData()
      fetchProjects()
    }
  }, [user])

  const fetchArtistData = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error

      if (data) {
        setFormData({
          name: data.name || '',
          email: data.contact_email || user.email || '',
          bio: data.bio || '',
          location: data.location || '',
          style: data.style || '',
          website: data.website || '',
          instagram_handle: data.instagram_handle || '',
          experience_years: data.experience_years || 0,
          profile_image_url: data.profile_image_url || ''
        })
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données artiste:', error)
    }
  }

  const fetchProjects = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('artist_projects')
        .select('*')
        .eq('artist_id', user.id)
        .order('year', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error)
    }
  }

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
      
      const { error } = await supabase
        .from('artists')
        .upsert({
          id: user?.id,
          name: formData.name,
          contact_email: formData.email,
          bio: formData.bio,
          location: formData.location,
          style: formData.style,
          website: formData.website,
          instagram_handle: formData.instagram_handle,
          experience_years: formData.experience_years,
          profile_image_url: formData.profile_image_url
        })

      if (error) throw error

      toast({
        title: "✅ Profil artiste mis à jour",
        description: "Vos informations ont été sauvegardées avec succès.",
      })
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleAddProject = async () => {
    try {
      const { error } = await supabase
        .from('artist_projects')
        .insert([{
          artist_id: user?.id,
          title: newProject.title,
          location: newProject.location,
          description: newProject.description,
          image_url: newProject.image_url,
          year: newProject.year
        }])

      if (error) throw error

      toast({
        title: "✅ Projet ajouté",
        description: "Votre projet a été ajouté avec succès.",
      })

      setNewProject({
        title: '',
        location: '',
        description: '',
        image_url: '',
        year: new Date().getFullYear()
      })
      setShowAddProject(false)
      fetchProjects()
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors de l'ajout du projet.",
        variant: "destructive",
      })
    }
  }

  const updateProfileImage = async (imageUrl: string) => {
    try {
      const { error } = await supabase
        .from('artists')
        .update({ profile_image_url: imageUrl })
        .eq('id', user?.id)

      if (error) throw error

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
          <p className="text-lg font-medium text-gray-700">Chargement de votre profil artiste...</p>
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
            <h2 className="text-xl font-bold text-red-700 mb-2">Erreur</h2>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            WXLLSPACE
          </h1>
          <p className="text-lg text-gray-600">Dashboard Artiste - Marketplace Street Art</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Photo de profil sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Camera className="h-6 w-6 text-purple-600" />
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
          <div className="lg:col-span-3 space-y-8">
            {/* Profil Section */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <Palette className="h-8 w-8" />
                  Mon Profil Artiste WXLLSPACE
                </CardTitle>
                <p className="text-purple-100">Gérez vos informations sur la marketplace street art</p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Informations personnelles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-lg font-semibold flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-purple-600" />
                        Nom d'artiste
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Votre nom d'artiste"
                        className="h-12 text-lg border-2 focus:border-purple-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-lg font-semibold flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-pink-600" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-12 text-lg border-2 focus:border-pink-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Localisation et style */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="location" className="text-lg font-semibold flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-red-600" />
                        Localisation
                      </Label>
                      <Input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Paris, Lyon, Marseille..."
                        className="h-12 text-lg border-2 focus:border-red-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="style" className="text-lg font-semibold flex items-center gap-2">
                        <Palette className="h-5 w-5 text-orange-600" />
                        Style artistique
                      </Label>
                      <Input
                        id="style"
                        type="text"
                        value={formData.style}
                        onChange={(e) => handleInputChange('style', e.target.value)}
                        placeholder="Street art, Graffiti, Muralisme..."
                        className="h-12 text-lg border-2 focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Réseaux sociaux et expérience */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        placeholder="https://mon-site.com"
                        className="h-12 text-lg border-2 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="instagram" className="text-lg font-semibold flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-pink-600" />
                        Instagram
                      </Label>
                      <Input
                        id="instagram"
                        type="text"
                        value={formData.instagram_handle}
                        onChange={(e) => handleInputChange('instagram_handle', e.target.value)}
                        placeholder="@mon_compte"
                        className="h-12 text-lg border-2 focus:border-pink-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="experience" className="text-lg font-semibold flex items-center gap-2">
                        <Palette className="h-5 w-5 text-green-600" />
                        Expérience (années)
                      </Label>
                      <Input
                        id="experience"
                        type="number"
                        value={formData.experience_years}
                        onChange={(e) => handleInputChange('experience_years', parseInt(e.target.value) || 0)}
                        className="h-12 text-lg border-2 focus:border-green-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Biographie */}
                  <div className="space-y-3">
                    <Label htmlFor="bio" className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5 text-indigo-600" />
                      Biographie
                    </Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Présentez-vous : votre parcours, votre style, vos inspirations..."
                      rows={6}
                      className="text-lg border-2 focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Bouton de sauvegarde */}
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          Sauvegarde en cours...
                        </>
                      ) : (
                        <>
                          💾 Sauvegarder mon profil
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Portfolio Section */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Palette className="h-8 w-8" />
                    Mon Portfolio
                  </CardTitle>
                  <Button
                    onClick={() => setShowAddProject(true)}
                    className="bg-white text-purple-600 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un projet
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                {/* Add Project Form */}
                {showAddProject && (
                  <Card className="mb-6 border-2 border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Ajouter un nouveau projet</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="project_title">Titre du projet</Label>
                          <Input
                            id="project_title"
                            value={newProject.title}
                            onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Nom de votre œuvre"
                          />
                        </div>
                        <div>
                          <Label htmlFor="project_location">Lieu</Label>
                          <Input
                            id="project_location"
                            value={newProject.location}
                            onChange={(e) => setNewProject(prev => ({ ...prev, location: e.target.value }))}
                            placeholder="Paris, Lyon..."
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="project_year">Année</Label>
                        <Input
                          id="project_year"
                          type="number"
                          value={newProject.year}
                          onChange={(e) => setNewProject(prev => ({ ...prev, year: parseInt(e.target.value) || new Date().getFullYear() }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="project_description">Description</Label>
                        <Textarea
                          id="project_description"
                          value={newProject.description}
                          onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Décrivez votre projet, la technique utilisée, l'inspiration..."
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label>Photo du projet</Label>
                        <ImageUpload
                          currentImageUrl={newProject.image_url}
                          onImageUploaded={(url) => setNewProject(prev => ({ ...prev, image_url: url }))}
                          bucketName="artist-projects"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddProject} disabled={!newProject.title}>
                          Ajouter le projet
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddProject(false)}>
                          Annuler
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Projects Grid */}
                {projects.length === 0 && !showAddProject && (
                  <div className="text-center py-12">
                    <Palette className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">Aucun projet dans votre portfolio</h3>
                    <p className="text-gray-400 mb-4">Ajoutez vos premières œuvres pour attirer des clients.</p>
                    <Button onClick={() => setShowAddProject(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter votre premier projet
                    </Button>
                  </div>
                )}

                {projects.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        {project.image_url && (
                          <div className="aspect-square bg-gray-100">
                            <img
                              src={project.image_url}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                          {project.location && (
                            <p className="text-sm text-gray-600 mb-1">📍 {project.location}</p>
                          )}
                          {project.year && (
                            <p className="text-sm text-gray-600 mb-2">📅 {project.year}</p>
                          )}
                          {project.description && (
                            <p className="text-sm text-gray-700 line-clamp-3">{project.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
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
