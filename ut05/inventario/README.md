# Inventario de equipos de red del aula (UT 5 · Fase 5)

| Fichero | Qué es |
|---|---|
| `inventario.xml` | Seis equipos: router, switch, punto de acceso, dos servidores e impresora |
| `inventario.xsd` | Esquema: `xs:pattern` para el id, la IPv4 y la MAC, `xs:date` para la compra y `xs:unique` para id, IP y MAC |
| `inventario.json` | Los mismos datos en JSON |

Validación:

```
xmllint --noout --schema inventario.xsd inventario.xml
```

## Comparativa breve

| Aspecto | XML + XSD | JSON |
|---|---|---|
| Tamaño (formateado) | 2140 bytes | 2061 bytes |
| Validación | El XSD comprueba el formato de IP y MAC, las fechas y que nada se repita | Necesita un JSON Schema aparte |
| Lectura desde programas | Hace falta un analizador XML | `JSON.parse()` o `json.load()` directamente |

## ¿Qué formato usaría para la herramienta de monitorización?

**JSON.** Las herramientas de monitorización actuales (Zabbix, Grafana, Prometheus y sus API) trabajan con JSON, es más ligero y se lee con una sola línea de código. XML lo dejaría para el archivo «oficial» del inventario, donde interesa validar cada IP y MAC con el esquema antes de aceptar un cambio.
