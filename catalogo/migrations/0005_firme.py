# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0004_remove_loved_productos'),
    ]

    operations = [
        migrations.CreateModel(
            name='Firme',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('modelo', models.CharField(max_length=100)),
                ('color', models.ForeignKey(to='catalogo.Color')),
                ('talla', models.ForeignKey(to='catalogo.Talla')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
