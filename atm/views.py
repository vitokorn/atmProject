from django.http import JsonResponse
from django.shortcuts import render
from copy import copy


def release(request):
    return render(request, 'cash_release.html')


def count_banknotes(request):
    print(request.GET)
    total_sum = request.GET.get('total_sum')
    if total_sum is None:
        return JsonResponse({'error':'total sum is empty'})
    else:
        total_sum = int(total_sum)
    initial_sum = copy(total_sum)
    banknotes = [100, 50, 20, 10, 5, 2, 1]
    issued_banknotes = []
    for banknote in banknotes:
        count = 0
        while total_sum >= banknote:
            total_sum -= banknote
            count += 1
        if count > 0:
            issued_banknotes.append(f'{banknote} x {count}')
    response = f'Запрошенная сумма {initial_sum} | Выданы следующие банкноты {issued_banknotes}'
    if initial_sum < 1:
        response = f'Введена некорректная сумма'
    return JsonResponse({'data': response})
