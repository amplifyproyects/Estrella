# Bitácora de Trabajo con IA — Claude Code

**Candidato(a):** Cesar Garzon
**Proyecto:** Prueba Técnica Full Stack — Educación Estrella
**Herramienta principal:** Claude Code (CLI)

---

## 1. Cómo usaste Claude Code (Contexto general)
Explica brevemente cómo integraste Claude Code en tu flujo de trabajo de NestJS y React.

* **Metodología:** Dividí el desarrollo en fases (Backend, Frontend, Integración S3, Despliegue) para mantener el contexto del modelo limpio.
* **Prompts clave de arquitectura:**
  * *"Crea un módulo en NestJS para solicitudes de crédito con DTOs de validación con class-validator..."*
  * *"Genera un servicio de AWS S3 en NestJS que use `@aws-sdk/s3-request-presigner` para subir videos de hasta 200MB..."*

---

## 2. Puntos Críticos y Ajustes del Desarrollador (Donde la IA no bastó)
Esta es la parte más importante. Detalla 2 o 3 casos donde la propuesta inicial de Claude Code falló o no era óptima y cómo la corregiste.

### Caso 1: Estrategia de subida de video de 200 MB
* **Propuesta inicial de la IA:** Claude sugirió recibir el archivo de video completo mediante `Multer` en el backend NestJS y luego retransmitirlo a S3.
* **Problema identificado:** Esta aproximación consume demasiada memoria RAM en el backend (potencial *Out of Memory* en la capa Free Tier) y satura el ancho de banda del servidor. Además, introducía latencia innecesaria para el usuario.
* **Mi corrección/decisión:** Rechacé la propuesta y le instruí implementar el patrón **Presigned URLs**. El backend ahora solo genera una URL firmada por 5 minutos y el cliente sube el archivo `.mp4`/`.webm` directamente a S3 con seguimiento de progreso con Axios (`onUploadProgress`).

### Caso 2: Configuración de CORS y S3 Request Presigner
* **Propuesta inicial de la IA:** Usar el SDK v2 de AWS (`aws-sdk`) que está obsoleto.
* **Problema identificado:** Incompatibilidad con las dependencias modernas del proyecto y TypeScript.
* **Mi corrección/decisión:** Corregí las importaciones para forzar el uso de `@aws-sdk/client-s3` (SDK v3) y definí explícitamente los encabezados permitidos en el `PutObjectCommand` para evitar bloqueos por políticas de CORS en el navegador durante el `PUT` directo.

---

## 3. Decisiones Descartadas o Modificadas
Menciona decisiones de la IA que rechazaste por temas de alcance, tiempo o costos en AWS.

* **Cognito vs JWT Propio:** Claude sugirió configurar AWS Cognito. Lo descarté para evitar complejidad innecesaria en la gestión de políticas e IAM dentro del plazo de 32 horas, optando por una implementación limpia con `@nestjs/jwt` y `bcrypt`.
* **Procesamiento de video:** La IA propuso un flujo asíncrono con S3 Events y Lambda para validar los metadatos del video post-subida. Lo descarté por quedar explícitamente fuera del alcance de la prueba.

---

## 4. Reflexión y Aprendizaje
Un párrafo breve sobre cómo potenció tu productividad usar Claude Code.

* **Impacto en velocidad:** Agilizó la creación de boilerplate en NestJS y componentes de React con Tailwind CSS.
* **Conclusión:** El soporte de la IA fue clave para acelerar la maquetación y tipado, pero la toma de decisiones de arquitectura, optimización de infraestructura y manejo de limitaciones de hardware siguieron dependiendo 100% de mi criterio técnico.


