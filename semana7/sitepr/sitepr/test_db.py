import os
import django
from django.utils import timezone
from django.db.models.functions import ExtractYear

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sitepr.settings")
django.setup()

from votacao.models import Questao, Opcao  # Alterado para nomes mais intuitivos

def all_questoes():
    questoes = Questao.objects.all()  # Buscar todas as questões
    return questoes
    
def comeca_com():
    questoes = Questao.objects.filter(questao_texto__startswith='Gostas de')
    return questoes

def votos_superiores_a_dois():
    questoes = comeca_com()
    for questao in questoes:#No caso de ser mais do que 1 apesar de agr nao ter.
        for opcao in questao.opcao_set.all():
            if opcao.votos > 2:
                print(f"Opcao: {opcao.opcao_texto} | Votos: {opcao.votos}")

def questoes_ultimos_tres_anos():
    questoes = Questao.objects.annotate(pub_year=ExtractYear('pub_data')).filter(pub_year__gt=(timezone.now().year - 3))
    for questao in questoes:
        print(f"Questao: {questao.questao_texto} | Data: {questao.pub_data}")

def numero_de_votos():
    questoes = all_questoes()
    votos=0
    for questao in questoes:
        for opcao in questao.opcao_set.all():
            votos += opcao.votos
    print(f"Numero de votos na bd: {votos}")

def opcoes_com_mais_votos():
    questoes = all_questoes()
    for questao in questoes:
        opcao_escolhida=Opcao()
        for opcao in questao.opcao_set.all():
            if(opcao.votos > opcao_escolhida.votos):
                opcao_escolhida = opcao
        print(f"Questao: {questao.questao_texto} | Opcao: {opcao_escolhida.opcao_texto}")

print("\n")
print("Alinea A) Mostrar uma lista com o texto de todas as questoes em BD.")
questoesA = all_questoes()
for questao in questoesA:
    print(f"Questao: {questao.questao_texto}")
print("\n")

print("Alinea B) Mostrar as opcoes da questao em que o texto comeca com \"Gostas de...\".")
questoesB = comeca_com()
for questao in questoesB:
    print(f"Opcoes da questao-> {questao}: {list(questao.opcao_set.all())}")
print("\n")

print("Alinea C) Mostrar as opcoes com numero de votos superior a 2 da questao em que o texto comeca com \"Gostas de...\".")
votos_superiores_a_dois()
print("\n")

print("Alinea D) Mostrar uma lista das questoes publicadas nos ultimos 3 anos.")
questoes_ultimos_tres_anos()
print("\n")

print("Alinea E) Calcular e mostrar o numero total de votos que estao registados na base de dados.")
numero_de_votos()
print("\n")

print("Alinea F) Percorrer todas as questoes da DB e, para cada uma, mostrar o texto da questao e o da opcao que tiver mais votos.")
opcoes_com_mais_votos()
print("\n")


