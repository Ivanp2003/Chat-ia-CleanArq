## Plan: Implementar reconocimiento de voz para dictar mensajes

TL;DR: Añadir un botón de micrófono en la interfaz de chat que permita dictar mensajes usando `react-native-voice`. El reconocimiento de voz convertirá el audio en texto y lo insertará en el campo de entrada.

**Nota importante**: `expo-speech` es para texto a voz (leer texto en voz alta), no para voz a texto (dictado). Para reconocimiento de voz usaremos `react-native-voice`, que es la librería estándar en React Native.

**Steps**
1. Instalar la dependencia `react-native-voice` y su plugin de configuración para Expo.
   ```bash
   npm install react-native-voice
   npm install @react-native-voice/voice@expo
   ```
2. Configurar el plugin en `app.json` para agregar los permisos necesarios en iOS y Android.
3. Crear un hook personalizado `useVoiceRecognition.ts` en `src/features/chat/presentation/hooks/` que:
   - Inicialice y configure `react-native-voice`
   - Maneje los eventos: `onSpeechStart`, `onSpeechEnd`, `onSpeechResults`, `onSpeechError`
   - Proporcione funciones: `startListening`, `stopListening`, `destroy`
   - Maneje el estado: `isListening`, `recognizedText`, `error`
4. Modificar `ChatScreen.tsx` para:
   - Importar y usar el hook `useVoiceRecognition`
   - Añadir un botón de micrófono junto al campo de entrada
   - Mostrar indicador visual cuando esté escuchando
   - Insertar el texto reconocido en el campo de entrada
   - Manejar errores de reconocimiento de voz
5. Añadir iconos de micrófono usando `@expo/vector-icons` (ya instalado):
   - Icono de micrófono normal para iniciar
   - Icono de micrófono animado o con color diferente cuando está escuchando
   - Icono de stop para detener
6. Configurar permisos en `app.json`:
   - Android: `RECORD_AUDIO`, `WRITE_EXTERNAL_STORAGE` (si es necesario)
   - iOS: `NSMicrophoneUsageDescription` con mensaje explicativo
7. Probar la funcionalidad:
   - Presionar el botón de micrófono
   - Hablar un mensaje
   - Verificar que el texto aparece en el campo de entrada
   - Enviar el mensaje dictado

**Relevant files**
- `app.json` — configuración de plugins y permisos
- `src/features/chat/presentation/hooks/useVoiceRecognition.ts` — nuevo hook para reconocimiento de voz
- `src/features/chat/presentation/screens/ChatScreen.tsx` — integración del botón de micrófono
- `package.json` — dependencias

**Verification**
1. Instalar dependencias y ejecutar `npx expo prebuild --clean` para aplicar configuraciones nativas
2. Ejecutar la app en dispositivo físico (el reconocimiento de voz no funciona en simulador en algunos casos)
3. Presionar el botón de micrófono y conceder permisos de micrófono
4. Dictar un mensaje y verificar que el texto aparece correctamente
5. Enviar el mensaje dictado y confirmar que funciona como un mensaje normal

**Decisions**
- Usar `react-native-voice` con el wrapper de Expo `@react-native-voice/voice@expo` para compatibilidad
- Implementar como hook personalizado siguiendo el patrón arquitectónico existente
- Mostrar feedback visual claro cuando está escuchando (color, animación, indicador)
- Permitir detener manualmente el reconocimiento antes de que termine automáticamente

**Further Considerations**
1. El reconocimiento de voz requiere permisos de micrófono que deben ser solicitados en tiempo de ejecución
2. En iOS, el reconocimiento de voz usa APIs nativas que requieren dispositivo físico
3. Considerar añadir soporte para múltiples idiomas (configurable en el hook)
4. Si la app necesita reconocimiento de voz offline, considerar librerías alternativas o servicios específicos
5. Manejar casos donde el reconocimiento devuelve texto vacío o con errores

**Iconos a usar**
- `Ionicons.mic` — micrófono normal
- `Ionicons.mic-circle` — micrófono activo/escuchando
- `Ionicons.close-circle` — detener reconocimiento
