# Instrucciones: Rediseño de interfaz con Figma MCP

## Referencia de diseño

**Enlace de Figma:**
https://www.figma.com/design/rsfflAnCpVxpQLLymQQCwz/WhatsApp-UI-Clone-%E2%80%93-Modern-Chat-App-UI-Kit--Figma---Community-?node-id=0-1&t=kmfZ1yevBYyd3lZI-1
## Objetivo

Mejorar la interfaz visual de la aplicación móvil de salas de chat, utilizando el diseño de Figma proporcionado como referencia.

La aplicación debe inspirarse en la experiencia de usuario de WhatsApp para las conversaciones y en Discord para la organización y exploración de comunidades y salas.

## Herramientas

- Figma MCP: inspeccionar el diseño, componentes, estilos y estructura.
- Plugin oficial de Figma: aprovechar sus capacidades y herramientas disponibles.
- Claude Code: analizar e implementar las mejoras en el proyecto.

## Instrucciones de trabajo

### 1. Analizar el diseño de Figma

Antes de modificar el código:

- Inspeccionar las pantallas disponibles mediante Figma MCP.
- Identificar la paleta de colores.
- Analizar tipografías, tamaños, pesos y jerarquías visuales.
- Identificar componentes reutilizables.
- Analizar márgenes, espaciados, bordes, sombras y radios.
- Identificar patrones de navegación y distribución.
- Revisar los estados de los componentes: activo, inactivo, seleccionado, cargando y vacío.

No inventar elementos que contradigan el lenguaje visual de la referencia.

### 2. Adaptar el diseño a la aplicación

Aplicar el lenguaje visual de Figma a las siguientes pantallas:

- **Inicio:** listado de salas de chat, actividad reciente y acceso a conversaciones.
- **Explorar:** búsqueda, categorías y descubrimiento de salas.
- **Sala de chat:** mensajes, burbujas, avatares, hora y campo de escritura.
- **Crear sala:** formulario para crear comunidades o salas de conversación.
- **Perfil:** información del usuario y configuración.

### 3. Criterios de diseño

- Utilizar WhatsApp como referencia para la experiencia de mensajería.
- Utilizar Discord como referencia para la organización de salas.
- Mantener una identidad visual propia.
- Evitar interfaces genéricas compuestas únicamente por tarjetas.
- Mantener consistencia entre todas las pantallas.
- Priorizar una interfaz moderna, limpia y funcional.
- Incorporar microinteracciones y animaciones cuando aporten valor.
- Adaptar correctamente los diseños a dispositivos móviles.

### 4. Implementación técnica

Respetar las tecnologías y arquitectura existentes en el proyecto:

- React Native.
- Expo.
- TypeScript.

Reglas:

- No modificar la lógica de negocio para realizar cambios exclusivamente visuales.
- No reemplazar funcionalidades existentes.
- Reutilizar componentes cuando sea conveniente.
- Mantener separación de responsabilidades.
- Evitar dependencias innecesarias.
- No introducir librerías incompatibles con Expo.
- Mantener los tipos de TypeScript.
- Respetar la navegación y los estados actuales de la aplicación.

### 5. Proceso de implementación

Trabajar en este orden:

1. Inspeccionar la estructura actual del proyecto.
2. Analizar el diseño mediante Figma MCP.
3. Comparar las pantallas existentes con las referencias.
4. Identificar las mejoras necesarias.
5. Definir los componentes y estilos reutilizables.
6. Implementar las mejoras progresivamente.
7. Verificar que las funcionalidades existentes sigan funcionando.
8. Comprobar la consistencia visual entre pantallas.

## Restricciones importantes

- No comenzar a programar antes de analizar Figma.
- No realizar una reconstrucción completa si la interfaz actual puede mejorarse incrementalmente.
- No utilizar imágenes o recursos de marca de WhatsApp como identidad de la aplicación.
- No copiar literalmente la interfaz de otra aplicación.
- No inventar pantallas o funcionalidades que no correspondan al alcance del proyecto.
- No sacrificar usabilidad por estética.

## Resultado esperado

Una aplicación móvil visualmente moderna y consistente, con una experiencia de mensajería familiar, una organización de salas inspirada en comunidades y una identidad visual propia.

El resultado debe estar implementado directamente en el proyecto existente, no limitarse a una propuesta visual o prototipo de Figma.