# Encontrator - README

> Desarrollo realizado por **Miguel Gómez Casado** (a.k.a. CrazyJaeger)

[ToC]

## Concepción de la idea

Este proyecto surge al iniciar el desarrollo de una campaña de Dragones y Mazmorras pensada para jugadores de nivel 5. Debido al incremento de nivel que han ido experimentando los jugadores con el tiempo, se ha llegado un punto donde encuentros secundarios (por ejemplo, contra bandidos) pueden ser difíciles de gestionar con papel y lápiz debido a la cantidad de personajes involucrados (tanto jugadores como no jugadores).

Aprovechando que ya manejo la mayor parte del contenido de mis campañas desde mi iPad y que tengo la experiencia de haber generado una aplicación web sencilla en GitHub con anterioridad, surge la idea de crear una herramienta informática que me permitiese ayudar a generar las hojas de los personajes no jugadores para incluirlos rápidamente en mi módulo y, principalmente, para permitirme simular encuentros de forma que pueda controlar con mayor facilidad los turnos y acciones realizables por cada PNJ sin necesidad de tener que saltar de una página a otra como hacía hasta ahora.

## Tecnología utilizada

Esta herramienta se trata de una aplicación Web sencilla que hace uso de **HTML** para maquetación de las pantallas, **CSS** para estilos y diseño, y **JavaScript** para la implementación dinámica de funcionalidad. Para facilitar en la creación de pantallas accesibles, especialmente considerando que uno de los principales casos de uso se diseña para ser usado desde un dispositivo móvil tipo tableta, se hace uso de la biblioteca software **Bootstrap (v5.0.2)**.

Para publicación en la web, dado que es una herramienta de uso personal o, como mucho, acotado a un número muy restringido de personas, se emplea la propia herramienta de ***GitHub Pages*** proporcionada por GitHub y, por lo tanto, se emplea **GIT** como sistema de control de versiones. También se empleará **GitHub** como herramienta de tiques y gestión de incidencias ante errores que se detecten en la aplicación.

Por último, para realizar la programación del aplicativo, se utiliza el IDE ***Visual Studio Code*** (con los plugins correspondientes para desarrollo HTML, JS, JSON y CSS). Para la generación de documentación, se emplea el editor de texto ***Typhora***, permitiendo la generación de documentación ligera en formato *MarkDown*.

## Notas de versión

Pueden revisarse las notas de versión, incluyendo los principales desarrollos realizados, consultando el documento [Changelog](Changelog.md).

## Casos de uso principales

### Creación de una criatura

Este caso de uso consiste en facilitar la generación de hojas de personaje para PNJs que vayan a participar en un encuentro o combate, de forma que sea sencillo tanto generar la hoja para incluirla en el módulo de la campaña, como generar la información necesaria para que el simulador de encuentros sea capaz de interpretar correctamente los datos para su visualización y cálculos.

Para ello, se ha diseñado un formulario dinámico que permite ir rellenando diferentes aspectos de la criatura cuya hoja queramos crear. Una vez finalizado, podemos generar el documento en formato *MarkDown* (para ser incluido en el módulo de la campaña) o en formato *JSON* (para ser leído e interpretado por el simulador de encuentros).

### Simulador de encuentros

Este es el caso de uso principal de la aplicación. Se trata de un sistema para simular encuentros guardados previamente en *JSON* que permitan de forma sencilla visualizar el orden de acción de los diferentes combatientes del encuentro así como poder acceder de forma rápida a las hojas de personaje de los PNJs sin tener que salir de la pantalla. Todo esto se diseña con la idea de verlo en una pantalla vertical de un dispositivo móvil tipo tableta.

Adicionalmente, este caso de uso incluye, en primer lugar, un sistema de tirada de iniciativa que calcula automáticamente la iniciativa de los PNJs y permite introducir manualmente las tiradas de los PJs, un sistema de desempate para poder recolocar el orden de los combatientes en caso de empate, una calculadora que dinámicamente resta o suma PGs a los PNJs, un sistema de colores que indica cuando un PNJ se encuentra gravemente herido o ha muerto, y finalmente, un botón que permite eliminar del encuentro a criaturas que ya no participen.