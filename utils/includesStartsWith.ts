export default function includesStartsWith(tab: string[], str: string) {
  for (let i = 0; i < tab.length; i++) {
    if (str.startsWith(tab[i])) return true;
  }
  return false;
}
