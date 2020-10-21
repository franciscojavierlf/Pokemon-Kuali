/**
 * Funciones útiles.
 */
export default class Utils {
  /**
   * Arregla una cadena en formato kebab para mostrar en forma normal.
   * Ejemplo: kebab-case -> Kebab Case
   * @param text
   * @param capitalize Capitaliza las letras iniciales.
   */
  public static kebabToNormal(text: string, capitalize = false) {
    const parts = text.split('-');
    // Capitaliza la primera letra de cada palabra
    for (let i = 0; i < parts.length; i += 1) {
      parts[i] = capitalize ? Utils.capitalizeFirst(parts[i]) : parts[i];
    }
    // Regresa la combinación de las partes
    return parts.join(' ');
  }

  /**
   * Capitaliza la primera letra.
   * @param text
   */
  public static capitalizeFirst(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
