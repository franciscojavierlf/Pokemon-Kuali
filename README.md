# Pokémon Companion

Una página web hecha en Vue.js que accede a la API de https://pokeapi.co para obtener información acerca de los pokémon.

Montado en https://pokemon-kuali.herokuapp.com/.

Cabe recalcar que este proyecto fue para una entrevista de trabajo, por lo que hubo un mayor esfuerzo en poder mostrar bien la información en un corto tiempo. Por esto mismo, hay ciertas cosas que se hubieran realizado con gusto pero que por el tiempo no se pudo. Por ejemplo, es muy importante que una página web no sea tan dependiente de una API, porque al momento de que esta cambia o deja de funcionar, debe ser posible cambiarse a otra sin tanto problema. Por ello, hubiera sido mejor declarar varios datos de manera estática en el código (como stats, tipos de pokémon, etc), pero dado a que se le quiso dar la funcionalidad de ser multilenguaje, traducir cada uno iba a llevar demasiado tiempo. Ésta es la razón por la que se tomó la libertad de no hacerlo tan robusto; es un simple ejercicio para mostrar los conocimientos que se tienen en programación.

Puesto que la API fue hecha por gente externa a Nintendo, tiene ciertas carencias que se reflejan en el resultado. Es muy complicado obtener nombres en diferentes idiomas y tampoco hay consistencia, pues hay algunos nombres traducidos y otros no. Igualmente es necesario cargar toda la información del pokémon sólo para obtener el nombre traducido, lo que dificulta aún más el trabajo y hace muy tardado las llamadas. Por ello, a veces se muestran nombres en inglés solamente.

Se intentó implementar por completo la traducción de la página en distintos idiomas, pero no pudo ser del todo posible. Al querer poner los movimientos que un pokémon puede aprender, la única manera de ponerlos en el idioma correspondiente era hacer una llamada a la API por cada movimiento, que por pokémon son aproximadamente 100. Esto alenta demasiado la página, por lo que al final se omitió.

Definitivamente lo mejor hubiera sido descargar la información pertinente de la API y tenerla guardada localmente para que su acceso sea más sencillo y mucho más rápido. Incluso hubiera convenido descargar la información y acomodarla de acuerdo a nuestras necesidades, pero debido a los objetivos de este ejercicio, al final se optó por hacer las menores llamadas posibles a la API, sacrificando con ello tiempos de carga más elevados.
