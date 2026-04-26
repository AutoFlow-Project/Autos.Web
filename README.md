# Autos.Web — Frontend MVC (.NET 10)

Aplicación web desarrollada con ASP.NET Core MVC (.NET 10) que consume la API `Autos.Api` para la gestión de vehículos.

El frontend está completamente separado del backend y se comunica exclusivamente mediante HTTP.

---

## Tecnologías Utilizadas

- .NET 10 (ASP.NET Core MVC)
- Bulma CSS (No se utiliza Bootstrap)
- jQuery
- AJAX
- Arquitectura desacoplada (HttpClient + API REST)

---

## Requisitos Previos

- .NET 10 SDK
- Visual Studio 2022/2026 o `dotnet CLI`
- El backend `Autos.Api` debe estar ejecutándose

---

# Configuración

## 1️⃣ Configurar la URL de la API

Abrir el archivo: appsettings.json


Configurar la URL base de la API:

"ApiSettings": {
  "BaseUrl": "http://localhost:5001/"
}

NOTA: La API debe estar ejecutándose antes de iniciar el frontend.
