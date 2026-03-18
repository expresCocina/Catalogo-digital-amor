import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://salmastore.com'
  
  // URL base
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Solo como ejemplo de sitemap dinámico para productos
    const { data: products } = await supabase
      .from('products')
      .select('id, updated_at')
      .eq('status', 'active')

    if (products) {
      const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
        url: `${baseUrl}/?product=${p.id}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
      routes.push(...productUrls)
    }
  } catch (err) {
    // Si falla la DB en build time silenciosamente devolvemos solo la ruta base
  }

  return routes
}
