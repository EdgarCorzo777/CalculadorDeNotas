# 📊 Calculadora de Promedio de Notas

Programa sencillo en Python que permite calcular el promedio de un conjunto de notas ingresadas por el usuario.

## 📋 Descripción

El programa solicita al usuario la cantidad de notas que desea ingresar, luego pide cada nota de forma individual y finalmente muestra el promedio calculado con dos decimales de precisión.

## 🚀 Requisitos

- Python 3.x

## ▶️ Uso

1. Ejecuta el script desde la terminal:

bash
python app.py

2. Ingresa la cantidad de notas que deseas promediar:

Ingrese la cantidad de notas que va digitar: 3

3. Ingresa cada nota cuando se te solicite:

Ingrese su nota: 4.5
Ingrese su nota: 3.8
Ingrese su nota: 5.0

4. El programa mostrará el promedio:

El promedio de su nota es: 4.43

## ⚙️ Funcionamiento

- El programa solicita la *cantidad de notas* a ingresar.
- Itera por cada nota acumulando la suma.
- Calcula el *promedio progresivo* en cada iteración.
- Muestra el resultado final *redondeado a 2 decimales*.

## 🛡️ Manejo de Errores

El programa incluye manejo de excepciones para entradas inválidas. Si el usuario ingresa un valor no numérico, se mostrará el siguiente mensaje:

Error: Solo se permite ingresar valores numericos.

## 📁 Estructura del Código

app.py
│
├── Entrada: cantidad de notas (entero)
├── Bucle: ingreso y acumulación de notas (flotante)
└── Salida: promedio formateado a 2 decimales

## 👤 Autor

Edgar Corzo

## 📄 Licencia

Este proyecto es de libre uso con fines educativos.