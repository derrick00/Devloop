from django.shortcuts import render
from django.http import HttpResponse


projectlist = [
    {
        'id': '1',
        'title': 'Ecomerce website',
        'description': 'Fully functional ecomerce website'
    },
            {
        'id': '2',
        'title': 'Ecomerce website',
        'description': 'Fully functional ecomerce website'
    },
            {
        'id': '3',
        'title': 'Ecomerce website',
        'description': 'Fully functional ecomerce website'
    }
]

def projects(request):
    context ={'projects':projectlist}
    return render(request, 'projects.html', context)

def project(request, pk):
    return render(request, 'single-project.html')