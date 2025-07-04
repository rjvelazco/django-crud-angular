from django.shortcuts import render
from rest_framework import viewsets
from drf_spectacular.utils import extend_schema
from .serializer import TaskSerializer
from .models import Task

# Create your views here.
@extend_schema(
    tags=['Tasks'],
    description='Complete CRUD operations for managing tasks',
    summary='Task Management API'
)
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()