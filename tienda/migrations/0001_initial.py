# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SliderHome',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(max_length=120, null=True, blank=True)),
                ('activo', models.BooleanField(default=True)),
                ('estilos', models.CharField(max_length=120, null=True, blank=True)),
                ('link', models.CharField(max_length=120, null=True, blank=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('imagen', models.ImageField(upload_to=b'slider/home/')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
