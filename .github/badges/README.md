# 🧪 Status Badges

Este directorio contiene archivos para mostrar el estado de validación del APK.

Los badges se actualizan automáticamente con cada ejecución del pipeline de testing.

## 📊 Estados Disponibles

### APK Status Badge
- ✅ **Valid**: APK pasó todas las validaciones
- ❌ **Invalid**: APK falló validaciones críticas  
- ⚠️ **Warning**: APK funcional pero con advertencias
- 🔄 **Testing**: Validación en progreso

### Size Badge  
- Muestra el tamaño actual del APK
- Se actualiza automáticamente

### Last Validated Badge
- Timestamp de la última validación exitosa
- Formato UTC para consistencia

## 🔄 Actualización Automática

Los badges se actualizan automáticamente por los workflows:
- `quick-validation.yml` → Actualiza estado básico
- `apk-testing.yml` → Actualiza estado completo
- `docker-testing.yml` → Actualiza estado Docker

---

*Generado automáticamente por GitHub Actions*