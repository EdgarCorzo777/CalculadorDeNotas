try:
    cntNotas = int(input("Ingrese la cantidad de notas que va digitar: "))
    sumNota = 0

    for i in range(1, cntNotas+1):
        nota = float(input("Ingrese su nota: "))
        sumNota += nota
        promedio = sumNota/i
    
    print(f"El promedio de su nota es: {promedio:.2f} ")

except ValueError:
    print("Error: Solo se permite ingresar valores numericos.")