export function mountGitHubEditUrl(app: string, path: string) {
  const editUrl = `https://github.com/LuanRoger/docs/blob/main/content${app}/docs/${path}`;

  return editUrl;
}
