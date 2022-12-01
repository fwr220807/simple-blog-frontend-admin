import settings from '@/config/default/settings.config'

const title = settings.title || 'Simple Blog Admin'

export const getPageTitle = (pageTitle: string | undefined) => {
  if (pageTitle)
    return `${pageTitle} - ${title}`
  return `${title}`
}
