// Helpers para leer la colección de Perspectivas (Content Collections).
// Reemplaza al antiguo perspectivas-preview.ts.
//
// Las páginas y la landing nunca leen directamente getCollection() — siempre
// pasan por estos helpers, que aplican filtros estándar:
//  - excluir drafts (en producción)
//  - excluir artículos cuya brand no está publicada
//  - ordenar por fecha descendente

import { getCollection, type CollectionEntry } from 'astro:content';
import { isPublishedPractice } from './brands';

export type PostEntry = CollectionEntry<'perspectivas'>;

/** Brand de un post: una práctica LGO o el paraguas 'grupo'. */
export const isPublishablePost = (post: PostEntry): boolean => {
  if (post.data.draft) return false;
  if (post.data.brand === 'grupo') return true;
  return isPublishedPractice(post.data.brand);
};

/** Todos los posts publicables, ordenados por fecha desc. */
export async function allPosts(): Promise<PostEntry[]> {
  const posts = await getCollection('perspectivas');
  return posts
    .filter(isPublishablePost)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Los N más recientes (para landing y sub-marcas). */
export async function recentPosts(limit = 3): Promise<PostEntry[]> {
  return (await allPosts()).slice(0, limit);
}

/** Posts de una sub-marca específica. */
export async function postsByBrand(
  brand: PostEntry['data']['brand']
): Promise<PostEntry[]> {
  return (await allPosts()).filter((p) => p.data.brand === brand);
}

/** Posts relacionados: misma brand, excluyendo el propio, hasta N. */
export async function relatedPosts(post: PostEntry, limit = 2): Promise<PostEntry[]> {
  return (await postsByBrand(post.data.brand))
    .filter((p) => p.id !== post.id)
    .slice(0, limit);
}

/** Label legible de la sub-marca origen del post. */
export const brandLabel = (brand: PostEntry['data']['brand']): string => {
  switch (brand) {
    case 'abogados':   return 'LGO Abogados';
    case 'contadores': return 'LGO Contadores';
    case 'tecnologia': return 'LGO Tecnología';
    case 'marketing':  return 'LGO Marketing';
    case 'grupo':      return 'Grupo LGO';
  }
};
