from database.models import Database
from django.shortcuts import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def forms(request):
    if request.method == 'POST':

        body = json.loads(request.body)
        col1 = body.get('col1')
        col2 = body.get('col2')
        col3 = body.get('col3')
        # print(col1)
        dbData = Database(col1=col1, col2=col2, col3=col3)
        dbData.save()
        return HttpResponse(json.dumps({'message': 'Form submitted successfully'}), content_type='application/json')
    elif request.method == 'GET':
        data = Database.objects.all()

        alldata = [{'col1': person.col1, 'col2': person.col2,
                    'col3': person.col3, 'id': person.id} for person in data]

        return HttpResponse(json.dumps({'message': 'Form submitted successfully', 'data': alldata}), content_type='application/json')


@csrf_exempt
def deleteForm(request):
    if request.method == 'POST':

        body = json.loads(request.body)
        id = body.get('id')
        user = Database.objects.get(id=id)
        user.delete()
        return HttpResponse(json.dumps({'message': 'successfully deleted'}))
