## Plan: Corregir renderizado Markdown en respuestas de IA

TL;DR: El problema ocurre porque el componente de mensajes muestra `message.content` como texto plano. La solución es renderizar las respuestas de Gemini con un renderer Markdown en `MessageBubble.tsx`, manteniendo el texto normal para el usuario.

**Steps**

1. Añadir una dependencia de Markdown compatible con React Native, como `react-native-markdown-display`.
2. Modificar `src/features/chat/presentation/components/MessageBubble.tsx` para renderizar el contenido de los mensajes del rol `assistant` usando el renderer Markdown en lugar de un `Text` plano.
   - Usar `Text` normal solo para mensajes `user`.
   - Configurar estilos básicos de Markdown para que coincidan con el diseño actual.
3. Revisar `src/features/chat/data/datasources/GeminiDataSource.ts` para asegurar que la respuesta de Gemini se devuelve como texto sin escapes adicionales.
   - Mantener `result.response.text()` si la respuesta ya viene en formato Markdown.
   - No transformar ni escapar los caracteres Markdown antes de guardarlos en `Message.content`.
4. Si ya existe un proveedor o hook de mensajería, verificar que no aplica `escape`, `replace` o formateo extra en `useChat.ts` o `SendMessageUseCase.ts`.
5. Probar con una solicitud de ejemplo que devuelva Markdown: negritas, cursivas, listas y bloques de código.
   - Verificar que aparezcan estilos de texto formateado en la UI.
   - Confirmar que los caracteres `**` ya no se muestran como texto literal en mensajes de Gemini.

**Relevant files**

- `src/features/chat/presentation/components/MessageBubble.tsx` — cambio principal de renderizado.
- `src/features/chat/data/datasources/GeminiDataSource.ts` — validación del texto de respuesta.
- `src/features/chat/presentation/hooks/useChat.ts` — comprobar que no hay transformación adicional.

**Verification**

1. Instalar la dependencia y ejecutar `npm install` o `yarn install`.
2. Ejecutar la app y enviar un prompt que solicite formato Markdown (por ejemplo, "Escribe una lista con **negritas** y _cursivas_").
3. Confirmar que el contenido de respuesta se muestra renderizado, sin `**` en la burbuja de chat.

**Decisions**

- Use un renderer Markdown en el componente de presentación, no en la capa de datos.
- No cambiar el modelo de datos de mensajes; solo cambiar la forma de renderizarlos.

**Further Considerations**

1. Si se prefiere evitar dependencias, se puede evaluar un parser Markdown ligero manual en lugar de `react-native-markdown-display`.
2. Si la app necesita soporte web, elegir una librería que funcione en Expo web también.
